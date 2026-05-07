import { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage.ts';

const SLIDE_WIDTH = 1920;
const SLIDE_HEIGHT = 1080;

interface PresentationFrameProps {
  children: ReactNode;
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  isDrawing: boolean;
  fadeStartTime: number | null;
}

export function PresentationFrame({ children }: PresentationFrameProps) {
  const [scale, setScale] = useState(1);
  const [showToolbar, setShowToolbar] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHoveringToolbar, setIsHoveringToolbar] = useState(false);
  const [isLaserActive, setIsLaserActive] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const mouseRef = useRef<Point | null>(null);

  useEffect(() => {
    const recalculate = () => {
      const scaleX = window.innerWidth / SLIDE_WIDTH;
      const scaleY = window.innerHeight / SLIDE_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    recalculate();
    window.addEventListener('resize', recalculate);
    return () => window.removeEventListener('resize', recalculate);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80 || isHoveringToolbar) {
        setShowToolbar(true);
        clearTimeout(timer);
        
        if (!isHoveringToolbar) {
          timer = setTimeout(() => {
            setShowToolbar(false);
          }, 2500);
        }
      } else {
        setShowToolbar(false);
        clearTimeout(timer);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [isHoveringToolbar]);

  // Handle hotkeys (L for Laser, F for Fullscreen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'l' || e.key === 'L') {
        setIsLaserActive(prev => !prev);
      }
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Animation render loop for canvas drawing
  useEffect(() => {
    if (!isLaserActive) {
      strokesRef.current = [];
      mouseRef.current = null;
      return;
    }

    let animationFrameId: number;

    const drawStroke = (ctx: CanvasRenderingContext2D, points: Point[], opacity: number) => {
      if (points.length === 0) return;
      
      ctx.beginPath();
      ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Neon laser glow shadow
      ctx.shadowColor = `rgba(239, 68, 68, ${opacity * 0.8})`;
      ctx.shadowBlur = 12;

      if (points.length === 1) {
        ctx.arc(points[0].x, points[0].y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 68, 68, ${opacity})`;
        ctx.fill();
      } else {
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
    };

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const now = performance.now();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw and update strokes
      const currentStrokes = strokesRef.current;
      const activeStrokes: Stroke[] = [];

      for (const stroke of currentStrokes) {
        let opacity = 1;
        if (!stroke.isDrawing && stroke.fadeStartTime !== null) {
          const elapsed = now - stroke.fadeStartTime;
          opacity = Math.max(0, 1 - elapsed / 1000); // 1-second fade out
        }

        if (opacity > 0) {
          drawStroke(ctx, stroke.points, opacity);
          activeStrokes.push(stroke);
        }
      }

      strokesRef.current = activeStrokes;

      // 2. Draw current laser pointer dot
      const mouse = mouseRef.current;
      if (mouse) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 1, mouse.x, mouse.y, 14);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.15, 'rgba(239, 68, 68, 1)');
        gradient.addColorStop(0.55, 'rgba(239, 68, 68, 0.4)');
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLaserActive]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newStroke: Stroke = {
      points: [{ x, y }],
      isDrawing: true,
      fadeStartTime: null,
    };

    strokesRef.current.push(newStroke);
    mouseRef.current = { x, y };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current = { x, y };

    const currentStrokes = strokesRef.current;
    if (currentStrokes.length > 0) {
      const lastStroke = currentStrokes[currentStrokes.length - 1];
      if (lastStroke.isDrawing) {
        lastStroke.points.push({ x, y });
      }
    }
  };

  const handleMouseUp = () => {
    const currentStrokes = strokesRef.current;
    if (currentStrokes.length > 0) {
      const lastStroke = currentStrokes[currentStrokes.length - 1];
      if (lastStroke.isDrawing) {
        lastStroke.isDrawing = false;
        lastStroke.fadeStartTime = performance.now();
      }
    }
  };

  const handleMouseLeaveCanvas = () => {
    mouseRef.current = null;
    handleMouseUp();
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: SLIDE_WIDTH,
          height: SLIDE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {children}
      </div>

      {isLaserActive && (
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeaveCanvas}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9990,
            background: 'transparent',
            cursor: 'none',
            pointerEvents: 'auto',
          }}
        />
      )}

      <AnimatePresence>
        {showToolbar && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            onMouseEnter={() => setIsHoveringToolbar(true)}
            onMouseLeave={() => setIsHoveringToolbar(false)}
            style={{
              position: 'fixed',
              top: '24px',
              right: '24px',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px',
              borderRadius: '999px',
              background: 'rgba(17, 24, 39, 0.78)',
              backdropFilter: 'blur(16px) saturate(180%)',
              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
              userSelect: 'none',
            }}
          >
            {/* Language Toggle Button */}
            <motion.button
              onClick={toggleLanguage}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '999px',
                background: language === 'en' ? 'rgba(124, 58, 237, 0.25)' : 'transparent',
                border: language === 'en' ? '1px solid rgba(124, 58, 237, 0.4)' : '1px solid transparent',
                color: language === 'en' ? '#a78bfa' : '#fff',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'system-ui, sans-serif',
                outline: 'none',
                transition: 'background 0.2s, border-color 0.2s, color 0.2s',
              }}
              whileHover={{
                background: language === 'en' ? 'rgba(124, 58, 237, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              }}
              whileTap={{ scale: 0.97 }}
              aria-label="Toggle language"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
              </svg>
              <span>{language === 'en' ? 'English' : 'TH + EN'}</span>
            </motion.button>

            {/* Divider */}
            <div style={{ width: '1px', height: '20px', background: 'rgba(255, 255, 255, 0.15)', margin: '0 4px' }} />

            {/* Laser Pointer Button */}
            <motion.button
              onClick={() => setIsLaserActive(prev => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '999px',
                background: isLaserActive ? 'rgba(239, 68, 68, 0.25)' : 'transparent',
                border: isLaserActive ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid transparent',
                color: isLaserActive ? '#ef4444' : '#fff',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'system-ui, sans-serif',
                outline: 'none',
                transition: 'background 0.2s, border-color 0.2s, color 0.2s',
              }}
              whileHover={{
                background: isLaserActive ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
              <span>{isLaserActive ? 'Laser On' : 'Laser Pointer'}</span>
            </motion.button>

            {/* Divider */}
            <div style={{ width: '1px', height: '20px', background: 'rgba(255, 255, 255, 0.15)', margin: '0 4px' }} />

            {/* Fullscreen Button */}
            <motion.button
              onClick={toggleFullscreen}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '999px',
                background: 'transparent',
                border: '1px solid transparent',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'system-ui, sans-serif',
                outline: 'none',
                transition: 'background 0.2s',
              }}
              whileHover={{
                background: 'rgba(255, 255, 255, 0.1)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              {isFullscreen ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h4V6M8 10l-5-5M4 14h4v4M8 14l-5 5M20 10h-4V6M16 10l5-5M20 14h-4v4M16 14l5 5"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
              )}
              <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

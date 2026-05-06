import {
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { motion } from "framer-motion";

// motion.create accepts any tag string at runtime via its internal Proxy
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MotionLinearGradient = motion.create("linearGradient" as any);

function getRelativeCenter(container: HTMLElement, element: HTMLElement) {
  let x = element.offsetWidth / 2;
  let y = element.offsetHeight / 2;
  let current: HTMLElement | null = element;

  while (current && current !== container) {
    x += current.offsetLeft;
    y += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }

  return { x, y };
}

export interface AnimatedBeamProps {
  style?: CSSProperties;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  curvatureX?: number;
  reverse?: boolean;
  reverseY?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  repeat?: number;
  repeatDelay?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  showArrow?: boolean;
  arrowColor?: string;
}

export function AnimatedBeam({
  style,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  curvatureX = 0,
  reverse = false,
  reverseY = false,
  duration = 5,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientOpacity = 1,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  repeat = Infinity,
  repeatDelay = 0,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  showArrow = false,
  arrowColor,
}: AnimatedBeamProps) {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  const [arrowInfo, setArrowInfo] = useState<{
    x: number;
    y: number;
    angle: number;
  } | null>(null);

  const gradientCoordinates = {
    x1: reverse ? ["90%", "-10%"] : ["10%", "110%"],
    x2: reverse ? ["100%", "0%"] : ["0%", "100%"],
    y1: reverseY ? ["90%", "-10%"] : ["10%", "110%"],
    y2: reverseY ? ["100%", "0%"] : ["0%", "100%"],
  };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const container = containerRef.current;
        const from = fromRef.current;
        const to = toRef.current;
        const start = getRelativeCenter(container, from);
        const end = getRelativeCenter(container, to);

        setSvgDimensions({
          width: container.clientWidth,
          height: container.clientHeight,
        });

        const startX = start.x + startXOffset;
        const startY = start.y + startYOffset;
        const endX = end.x + endXOffset;
        const endY = end.y + endYOffset;

        if (curvatureX !== 0) {
          // Cubic bezier for horizontal bending
          const cx = (startX + endX) / 2 + curvatureX;
          const cy1 = startY + (endY - startY) * 0.25;
          const cy2 = startY + (endY - startY) * 0.75;
          setPathD(
            `M ${startX},${startY} C ${cx},${cy1} ${cx},${cy2} ${endX},${endY}`,
          );

          if (showArrow) {
            // Cubic bezier midpoint at t=0.5
            const t = 0.5;
            const mt = 1 - t;
            const mx =
              mt * mt * mt * startX +
              3 * mt * mt * t * cx +
              3 * mt * t * t * cx +
              t * t * t * endX;
            const my =
              mt * mt * mt * startY +
              3 * mt * mt * t * cy1 +
              3 * mt * t * t * cy2 +
              t * t * t * endY;
            // Tangent: derivative of cubic bezier at t=0.5
            const tx =
              3 * mt * mt * (cx - startX) +
              6 * mt * t * (cx - cx) +
              3 * t * t * (endX - cx);
            const ty =
              3 * mt * mt * (cy1 - startY) +
              6 * mt * t * (cy2 - cy1) +
              3 * t * t * (endY - cy2);
            const angle = Math.atan2(ty, tx) * (180 / Math.PI);
            setArrowInfo({ x: mx, y: my, angle });
          }
        } else {
          if (curvature === 0) {
            setPathD(`M ${startX},${startY} L ${endX},${endY}`);
            if (showArrow) {
              const mx = (startX + endX) / 2;
              const my = (startY + endY) / 2;
              const angle =
                Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
              setArrowInfo({ x: mx, y: my, angle });
            }
          } else {
            const controlY = startY - curvature;
            const controlX = (startX + endX) / 2;
            setPathD(
              `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`,
            );

            if (showArrow) {
              // Quadratic bezier midpoint at t=0.5
              const t = 0.5;
              const mt = 1 - t;
              const mx =
                mt * mt * startX + 2 * mt * t * controlX + t * t * endX;
              const my =
                mt * mt * startY + 2 * mt * t * controlY + t * t * endY;
              // Tangent: derivative of quadratic bezier at t=0.5
              const tx =
                2 * mt * (controlX - startX) + 2 * t * (endX - controlX);
              const ty =
                2 * mt * (controlY - startY) + 2 * t * (endY - controlY);
              const angle = Math.atan2(ty, tx) * (180 / Math.PI);
              setArrowInfo({ x: mx, y: my, angle });
            }
          }
        }

        if (!showArrow) setArrowInfo(null);
      }
    };

    const resizeObserver = new ResizeObserver(updatePath);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (fromRef.current) resizeObserver.observe(fromRef.current);
    if (toRef.current) resizeObserver.observe(toRef.current);
    updatePath();

    return () => resizeObserver.disconnect();
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    curvatureX,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
    showArrow,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        ...style,
      }}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      {/* Static background path */}
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        fill="none"
      />
      {/* Animated gradient path */}
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity={gradientOpacity}
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead at midpoint */}
      {showArrow && arrowInfo && (
        <polygon
          points="-5,-4 7,0 -5,4"
          fill={arrowColor ?? gradientStopColor}
          opacity={0.8}
          transform={`translate(${arrowInfo.x},${arrowInfo.y}) rotate(${arrowInfo.angle})`}
        />
      )}
      <defs>
        <MotionLinearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat,
            repeatDelay,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </MotionLinearGradient>
      </defs>
    </svg>
  );
}

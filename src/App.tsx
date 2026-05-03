import { AnimatePresence, motion } from "framer-motion";
import { slides } from "./slides/index.ts";
import { usePresentation } from "./hooks/usePresentation.ts";
import { PresentationFrame, ProgressTracker } from "./components/index.ts";
import { SlideContext } from "./context/SlideContext.tsx";
import { slideSwipeTransition, slideSwipeVariants } from "./lib/motion.ts";

const SECTIONS = [
  { label: "Intro", count: 2 }, // Cover + TOC
  { label: "Problem", count: 5 },
  { label: "Approach", count: 4 },
  { label: "System", count: 6 },
  { label: "Testing", count: 2 },
  { label: "Team", count: 4 },
];

export default function App() {
  const { currentIndex, direction, goTo } = usePresentation(slides.length);
  const CurrentSlide = slides[currentIndex];
  
  const currentSlideNum = currentIndex + 1;
  const isCoverSlide = currentSlideNum === 1;

  return (
    <PresentationFrame>
      {!isCoverSlide && currentSlideNum <= 23 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            top: 48,
            right: 64,
            zIndex: 100,
          }}
        >
          <ProgressTracker 
            sections={SECTIONS} 
            current={currentSlideNum} 
            variant="dots" 
            activeColor="#D946EF"
            baseColor="rgba(0,0,0,0.1)"
            thickness={6} 
            gap={6}
            onDotClick={(slideNum) => goTo(slideNum - 1)}
          />
        </motion.div>
      )}

      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideSwipeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideSwipeTransition}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <SlideContext.Provider value={{ slideNum: currentSlideNum, goTo }}>
            <CurrentSlide />
          </SlideContext.Provider>
        </motion.div>
      </AnimatePresence>
    </PresentationFrame>
  );
}

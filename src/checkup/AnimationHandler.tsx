import { AnimatePresence, motion } from "framer-motion";
import { TPaginate } from "./types";

const variantsX = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};
const variantsY = {
  enter: (direction: number) => {
    console.log();
    return {
      y: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      y: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 9000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export interface IAnimationHandler {
  page: number;
  direction: number;
  canSwipe: {
    forward: boolean;
    backward: boolean;
  };
  paginate: TPaginate;
  axis: "x" | "y";
}

export const AnimationHandler: React.FC<IAnimationHandler> = ({
  children,
  page,
  direction,
  canSwipe,
  paginate,
  axis = "x",
}) => (
  <AnimatePresence initial={false} custom={direction}>
    <motion.div
      key={page}
      custom={direction}
      variants={axis === "x" ? variantsX : variantsY}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        [axis]: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = swipePower(offset[axis], velocity[axis]);

        if (swipe < -swipeConfidenceThreshold && canSwipe.forward) {
          paginate(1);
        } else if (swipe > swipeConfidenceThreshold && canSwipe.backward) {
          paginate(-1);
        }
      }}
      className="qst"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// Animation utilities for the quantum ecosystem

export const nodeVariants = {
  initial: { 
    scale: 0, 
    opacity: 0 
  },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95
  }
};

export const panelVariants = {
  hidden: { 
    opacity: 0, 
    x: 300 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    x: 300,
    transition: {
      duration: 0.2
    }
  }
};

export const connectionVariants = {
  hidden: { 
    pathLength: 0 
  },
  visible: { 
    pathLength: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut"
    }
  }
};

export const pulseAnimation = {
  initial: { 
    scale: 1 
  },
  animate: { 
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const floatAnimation = {
  initial: { 
    y: 0 
  },
  animate: { 
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const rotateAnimation = {
  initial: { 
    rotate: 0 
  },
  animate: { 
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};
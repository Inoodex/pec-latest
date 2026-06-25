export const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
      },
};

export const cardVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
      },
};


export const fadeUp = {
      hidden: { opacity: 0, y: 32 },
      visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                  duration: 0.55,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
            },
      }),
};

export const slideLeft = {
      hidden: { opacity: 0, x: -40 },
      visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      },
};

export const slideRight = {
      hidden: { opacity: 0, x: 40 },
      visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      },
};

export const reasonFadeUp = {
      hidden: { opacity: 0, y: 50 },
      show: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
            },
      }),
};
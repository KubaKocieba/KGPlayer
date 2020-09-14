export const videoDescriptionMotion = {
    rest: { opacity: 0, ease: "easeOut", duration: 0.2, type: "tween" },
    hover: {
        opacity: 1,
        transition: {
            duration: 0.2,
            type: "tween",
            ease: "easeIn"
        }
    }
};

export const videoElementMotion = {
    rest: {
        scale: 1,
        opacity: 0.8
    },
    hover: {
        scale: 1.1,
        opacity: 1,
        transition: { duration: 0.2 },
    }
};

export const videoTitleMotion = {
    rest: {
        scale: 0.9,
        opacity: 0.9
    },
    hover: {
        scale: 1,
        opacity: 1
    }
};

export const playerVariants = {
    open: {
        top: 0,
        left:0,
        opacity: 1,
        transition: { duration: 0.5 }
    },
    closed: {
        top: 0,
        left: '-100%',
        opacity: 0,
        transition: { duration: 1 }
    }
}


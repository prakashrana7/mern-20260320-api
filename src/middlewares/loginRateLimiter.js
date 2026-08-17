import rateLimit from "express-rate-limit";

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        message: "Too many login attempts. Please try again later.",
    },
});

export default loginRateLimiter;
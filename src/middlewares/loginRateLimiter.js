import rateLimit from "express-rate-limit";

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes

    //Maximum attempts for the same email
    limit: 5,

    standardHeaders: true,
    legacyHeaders: false,

    keyGenerator: (req) => {
        const email = req.body?.email?.toLowerCase().trim();

        if (email) {
            return `login-email:${email}`;
        }

        return `login-ip:${req.ip}`;
    },

    message: {
        message: "Too many login attempts. Please try again later.",
    },
});

export default loginRateLimiter;
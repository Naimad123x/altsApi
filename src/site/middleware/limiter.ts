import rateLimit from "express-rate-limit";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15min
  max: 1500,
  standardHeaders: true,
  legacyHeaders: false,
});
export default limiter;
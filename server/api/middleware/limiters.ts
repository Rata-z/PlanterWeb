import { rateLimit } from "express-rate-limit";

export const likeLimiter = rateLimit({
  windowMs: 10 * 1000, //10 seconds
  limit: 5,
  message: { message: "Action Error: Reached action limit. Try again later" },
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
export const addCommentLimiter = rateLimit({
  windowMs: 15 * 1000, //15 seconds
  limit: 3,
  message: { message: "Action Error: Reached action limit. Try again later" },
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
export const editCommentLimiter = rateLimit({
  windowMs: 10 * 1000, //10 seconds
  limit: 2,
  message: { message: "Action Error: Reached action limit. Try again later" },
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
export const getPostLimiter = rateLimit({
  windowMs: 5 * 1000, //5 seconds
  limit: 5,
  message: { message: "Action Error: Reached action limit. Try again later" },
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
export const getPostsLimiter = rateLimit({
  windowMs: 15 * 1000, //15 seconds
  limit: 3,
  message: { message: "Action Error: Reached action limit. Try again later" },
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
export const addPostLimiter = rateLimit({
  windowMs: 60 * 1000, //60 seconds
  limit: 1,
  message: { message: "Action Error: Reached action limit. Try again later" },
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
export const deletePostLimiter = rateLimit({
  windowMs: 10 * 1000, //10 seconds
  limit: 3,
  message: { message: "Action Error: Reached action limit. Try again later" },
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
export const editPostLimiter = rateLimit({
  windowMs: 20 * 1000, //20 seconds
  limit: 1,
  message: { message: "Action Error: Reached action limit. Try again later" },
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
export const deleteCommentLimiter = rateLimit({
  windowMs: 10 * 1000, //20 seconds
  limit: 3,
  message: { message: "Action Error: Reached action limit. Try again later" },
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

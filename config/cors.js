export const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests dengan no origin (mobile apps, Postman, curl, dll)
    if (!origin) return callback(null, true);

    // Get allowed origins dari environment variable
    const allowedOrigins = process.env.CLIENT_URL
      ? process.env.CLIENT_URL.split(",").map((url) => url.trim())
      : ["http://localhost:5173", "http://localhost:3000"];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PATCH", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  maxAge: 86400, // Cache preflight request selama 24 jam (1 day)
};

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { prisma } from "../prisma/client.js";

// ===== Protect Middleware =====
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new Error("Tidak terautentikasi, token tidak ditemukan");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error("Tidak terautentikasi, user tidak ditemukan");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw new Error("Tidak terautentikasi, token tidak valid");
    }
    if (error.name === "TokenExpiredError") {
      throw new Error("Token sudah kadaluarsa");
    }
    throw error;
  }
});

// ===== Role-based Middleware =====
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Error("Akses ditolak, role user tidak sesuai");
    }
    next();
  };
};

export { protect, authorize };

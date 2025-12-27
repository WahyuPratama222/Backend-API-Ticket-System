export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // ===== ZOD VALIDATION ERROR =====
  if (err.name === "ZodError") {
    return res.status(400).json({
      status: "fail",
      message: "Validation error",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // ===== PRISMA UNIQUE CONSTRAINT =====
  if (err.code === "P2002" && err.meta?.target) {
    const field = Array.isArray(err.meta.target)
      ? err.meta.target.join(", ")
      : err.meta.target;

    // ubah nama field dari 'user_email_key' jadi 'email'
    const friendlyField = field.replace(/^user_|_key$/g, "");
    return res.status(400).json({
      status: "fail",
      message: `${friendlyField} sudah digunakan`,
    });
  }

  // ===== CUSTOM NOT FOUND ERROR =====
  if (
    [
      "User tidak ditemukan",
      "Event tidak ditemukan",
      "Booking tidak ditemukan",
      "Ticket tidak ditemukan",
    ].includes(err.message)
  ) {
    return res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }

  // ===== BUSINESS LOGIC / CUSTOM ERRORS =====
  const customErrors = {
    "Bukan pemilik event": 403,
    "Event tidak tersedia": 400,
  };
  if (customErrors[err.message]) {
    return res.status(customErrors[err.message]).json({
      status: "fail",
      message: err.message,
    });
  }

  // ===== Auth / Protect Errors =====
  if (
    err.message === "Tidak terautentikasi, token tidak ditemukan" ||
    err.message === "Tidak terautentikasi, token tidak valid" ||
    err.message === "Tidak terautentikasi, user tidak ditemukan"
  ) {
    return res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }

  // ===== Role-based Errors =====
  if (err.message === "Akses ditolak, role user tidak sesuai") {
    return res.status(403).json({
      status: "fail",
      message: err.message,
    });
  }

  // ===== FALLBACK =====
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};

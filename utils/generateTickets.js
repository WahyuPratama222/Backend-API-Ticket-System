export function generateTicketCode(length = 10) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  // Generate random string
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }

  const timestamp = Date.now().toString().slice(-6);
  const fullCode = code + timestamp;
  return fullCode.match(/.{1,4}/g).join("-");
}

const crypto = require("crypto");

const TOKEN_TTL_SECONDS = 60 * 60 * 2;

const base64UrlEncode = (value) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");

const sign = (data) =>
  crypto
    .createHmac("sha256", process.env.AUTH_SECRET)
    .update(data)
    .digest("base64url");

const createToken = (payload) => {
  const header = base64UrlEncode({ alg: "HS256", typ: "JWT" });
  const body = base64UrlEncode({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  });
  const signature = sign(`${header}.${body}`);

  return `${header}.${body}.${signature}`;
};

const verifyToken = (token) => {
  const parts = token.split(".");

  if (parts.length !== 3) {
    return null;
  }

  const [header, body, signature] = parts;
  const expectedSignature = sign(`${header}.${body}`);

  if (signature.length !== expectedSignature.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));

  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
};

module.exports = { createToken, verifyToken };

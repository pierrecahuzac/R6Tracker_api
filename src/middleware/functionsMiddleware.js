const  generateAndSetAccessToken = (payload, res) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "15m",
  });

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: (process.env.ACCESS_TOKEN_LIFETIME || 900) * 1000,
  });

  return accessToken;
};
export default generateAndSetAccessToken
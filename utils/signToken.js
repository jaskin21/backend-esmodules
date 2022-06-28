import jwt from 'jsonwebtoken';

const signToken = (id, username, email) => {
  // You can add any payload, but `sub`, `iat` are the usual standard
  return jwt.sign({ id, username, email, sub: id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
};

export default signToken;

import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

const comparePassword = (password: string, hash) => {
  return bcrypt.compare(password, hash);
};

const createJWT = (user) => {
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
  return token;
};

export { createJWT, comparePassword, hashPassword };

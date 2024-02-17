import { UnauthenticatedError } from '../errors/index.js';
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new UnauthenticatedError('Authentication Invalid');

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = {
      userId: payload.userid,
      testUser: payload.userid === '64842a8b636194d5e91d1744',
    };
    next();
  } catch (err) {
    throw new UnauthenticatedError('JWT is meesed up');
  }
};

export default auth;

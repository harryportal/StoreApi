import { createJWT } from '../../utils/auth';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

interface User {
  id: string;
  username: string;
}

describe('Test the JWT create function', () => {
  it('should return the payload after decoding the token', () => {
    const payload: User = { id: randomUUID(), username: 'userame' };
    const token = createJWT(payload);
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    expect(decode).toMatchObject(payload);
  });
});

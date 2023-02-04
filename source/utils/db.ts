import { PrismaClient } from '@prisma/client';

// creates and return a reusable prisma client
const prisma = new PrismaClient();

export default prisma;

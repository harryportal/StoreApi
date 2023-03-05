import { Request } from 'express';

export const current_page = (req: Request, type: string) => {
  const pagenumber =  Number(req.query.page) || 1;
  const size = Number(process.env.PAGE_SIZE);
  const page_size = type == "product" ? size : size / 2;
  const skip = (pagenumber - 1) * page_size;
  return [page_size, skip];
}

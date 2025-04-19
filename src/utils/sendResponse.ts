import { Response } from "express";

type ResponseData<T> = {
  statusCode: number;
  success?: boolean;
  message: string;
  data?: T;
};

const sendResponse = <T>(res: Response, data: ResponseData<T>) => {
  res.status(data.statusCode).json({
    success: data.success || true,
    message: data.message,
    data: data.data || null,
  });
};

export default sendResponse;

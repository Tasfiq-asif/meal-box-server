import { JwtPayload } from "jsonwebtoken";
import { TUser } from "../../app/modules/user/user.interface";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        _id?: Types.ObjectId;
        role?: string;
      };
    }
  }
}

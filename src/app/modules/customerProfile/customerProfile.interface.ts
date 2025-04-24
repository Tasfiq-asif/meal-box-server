import { Types } from "mongoose";
import { TUser } from "../user/user.interface";

export interface TCustomerProfile {
  userId: Types.ObjectId | TUser;
  deliveryAddress: string;
  pastOrders: string[];
}

import { model, Schema, Types } from "mongoose";
import { TCustomerProfile } from "./customerProfile.interface";

const customerProfileSchema = new Schema<TCustomerProfile>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    pastOrders: {
      type: [String], // Array of Order IDs
      default: [],
    },
  },
  { timestamps: true }
);

const CustomerProfile = model<TCustomerProfile>(
  "CustomerProfile",
  customerProfileSchema
);

export default CustomerProfile;

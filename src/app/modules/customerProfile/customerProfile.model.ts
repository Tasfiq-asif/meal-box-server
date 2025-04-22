import { model , Schema, Types } from "mongoose";
import { TCustomerProfile } from "./customerProfile.interface";

  
const customerProfileSchema = new Schema<TCustomerProfile>({
    userId: {
      type: Types.ObjectId,
      required: true,
      unique: true,   
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    pastOrders: {
      type: [String],  // Array of Order IDs
      default: [],
    },
    role: {
      type: String,
      enum: ['customer', 'provider'],
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
  });
  
  const CustomerProfile = model<TCustomerProfile>('CustomerProfile', customerProfileSchema);

  export default CustomerProfile;
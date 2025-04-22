import { TCustomerProfile } from "./customerProfile.interface";
import CustomerProfile from "./customerProfile.model";

const profile = async (
  payload: TCustomerProfile
): Promise<TCustomerProfile> => {
  const result = await CustomerProfile.create(payload);

  return result;
};

const getprofile = async (
  customerId: string
): Promise<TCustomerProfile | null> => {
  const result = await CustomerProfile.findOne({
    customerId: customerId,
  }).populate({
    path: "userId",
    select: "name email phone address role", // Include all relevant user fields
  });

  return result ? (result.toObject() as TCustomerProfile) : null;
};

const getProfileByUserId = async (
  userId: string
): Promise<TCustomerProfile | null> => {
  const result = await CustomerProfile.findOne({ userId }).populate({
    path: "userId",
    select: "name email phone address role",
  });

  return result ? (result.toObject() as TCustomerProfile) : null;
};

const getAllProfiles = async (): Promise<TCustomerProfile[]> => {
  const results = await CustomerProfile.find().populate({
    path: "userId",
    select: "name email phone address role",
  });

  return results.map((result) => result.toObject() as TCustomerProfile);
};

export const customerProfileService = {
  profile,
  getprofile,
  getProfileByUserId,
  getAllProfiles,
};

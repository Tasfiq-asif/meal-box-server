import { TCustomerProfile } from "./customerProfile.interface";
import CustomerProfile from "./customerProfile.model";

const updateProfile = async (
  userId: string,
  updateData: Partial<TCustomerProfile>
): Promise<TCustomerProfile | null> => {
  // Ensure we're not trying to update userId which should be immutable
  if (updateData.userId) {
    delete updateData.userId;
  }

  const result = await CustomerProfile.findOneAndUpdate(
    { userId },
    updateData,
    { new: true, runValidators: true }
  ).populate({
    path: "userId",
    select: "name email phone address role",
  });

  return result ? (result.toObject() as TCustomerProfile) : null;
};


const getprofile = async (
  userId: string
): Promise<TCustomerProfile | null> => {
  const result = await CustomerProfile.findOne({
    userId: userId,
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
  updateProfile,
  getprofile,
  getProfileByUserId,
  getAllProfiles,
};

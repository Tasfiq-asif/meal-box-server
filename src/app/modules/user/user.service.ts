import { User, IUser } from "./user.model";
import { TUser, TUserRegistration } from "./user.interface";
import { Response } from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import config from "../../../app/config";
import CustomerProfile from "../customerProfile/customerProfile.model";
import { MealProvider } from "../mealProviderProfile/mealProvider.model";

const register = async (userData: TUserRegistration): Promise<TUser> => {
  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log("Starting user registration with role:", userData.role);

    // Create user first
    const user = await User.create([userData], { session });
    const newUser = user[0];
    console.log("User created successfully with ID:", newUser._id);

    // Create appropriate profile based on user role
    if (userData.role === "customer") {
      console.log("Creating customer profile for user:", newUser._id);
      try {
        // Create customer profile
        const customerProfile = await CustomerProfile.create(
          [
            {
              userId: newUser._id,
              deliveryAddress: userData.address || "Default Address",
              pastOrders: [],
            },
          ],
          { session }
        );
        console.log(
          "Customer profile created successfully:",
          customerProfile[0]._id
        );
      } catch (profileError) {
        console.error("Error creating customer profile:", profileError);
        throw profileError;
      }
    } else if (userData.role === "provider") {
      console.log("Creating provider profile for user:", newUser._id);
      try {
        // Create provider profile
        const providerProfile = await MealProvider.create(
          [
            {
              userId: newUser._id,
              cuisineSpecialties: ["General"],
              pricing: 0, // Default pricing
              experience: "Beginner",
              availability: true,
            },
          ],
          { session }
        );
        console.log(
          "Provider profile created successfully:",
          providerProfile[0]._id
        );
      } catch (profileError) {
        console.error("Error creating provider profile:", profileError);
        throw profileError;
      }
    } else {
      console.warn("Unknown role specified:", userData.role);
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    console.log("Transaction committed successfully");

    return newUser;
  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction failed during registration:", error);
    throw error;
  }
};

const findUserByEmail = async (email: string): Promise<TUser | null> => {
  return await User.findOne({ email }).select("+password");
};

const findUserById = async (id: string): Promise<TUser | null> => {
  return await User.findById(id);
};

const updateUser = async (
  userId: string,
  userData: Partial<TUser>
): Promise<TUser | null> => {
  // Create an updateable object with only the fields we want to allow updating
  const updateData: Partial<TUser> = {};

  // Only copy allowed fields
  if (userData.name) updateData.name = userData.name;
  if (userData.phone) updateData.phone = userData.phone;
  if ("photo" in userData) updateData.photo = userData.photo;

  const result = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new Error("User not found");
  }

  return result;
};

const comparePasswords = async (
  user: TUser,
  candidatePassword: string
): Promise<boolean> => {
  return await (user as IUser).comparePassword(candidatePassword);
};

const sendUserResponse = (
  user: TUser,
  statusCode: number,
  res: Response
): void => {
  // Convert user to plain object if needed
  const userData = (user as any).toJSON ? (user as any).toJSON() : user;

  // Remove password from response
  if (userData.password) delete userData.password;

  // Send response
  res.status(statusCode).json({
    status: "success",
    message: "Operation successful",
    data: userData,
  });
};

const deleteUser = async (id: string) => {
  // Check if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid user ID format");
  }

  try {
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      throw new Error("User not found or already deleted");
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to delete user");
  }
};

const changePassword = async (
  userId: string,
  {
    currentPassword,
    newPassword,
  }: { currentPassword: string; newPassword: string }
) => {
  // Find user with password
  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new Error("User not found");
  }

  // Verify current password
  const isPasswordMatch = await comparePasswords(user, currentPassword);
  if (!isPasswordMatch) {
    throw new Error("Current password is incorrect");
  }

  // Update directly to avoid pre-save hook
  await User.updateOne(
    { _id: userId },
    {
      $set: {
        password: await bcrypt.hash(
          newPassword,
          Number(config.bcrypt_salt_rounds || 10)
        ),
      },
    }
  );

  return { success: true };
};

export const UserService = {
  register,
  findUserByEmail,
  findUserById,
  updateUser,
  comparePasswords,
  sendUserResponse,
  deleteUser,
  changePassword,
};

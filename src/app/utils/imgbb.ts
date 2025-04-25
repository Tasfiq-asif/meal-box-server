import axios from "axios";
import FormData from "form-data";

// Replace with your actual ImgBB API key
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

/**
 * Uploads an image to ImgBB
 * @param imageBuffer - The buffer of the image
 * @param filename - Optional filename
 * @returns The URL of the uploaded image
 */
export const uploadToImgBB = async (
  imageBuffer: Buffer,
  filename?: string
): Promise<string> => {
  if (!IMGBB_API_KEY) {
    throw new Error("ImgBB API key is not configured");
  }

  try {
    const formData = new FormData();
    formData.append("image", imageBuffer, {
      filename: filename || "image.jpg",
    });

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    if (response.data && response.data.data && response.data.data.url) {
      return response.data.data.url;
    } else {
      throw new Error("Failed to upload image to ImgBB");
    }
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error("Failed to upload image to ImgBB");
  }
};

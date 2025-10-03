import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Ensures URLs are HTTPS
});

/**
 * Uploads a file to Cloudinary.
 * @param filePath The path to the file to upload (e.g., from Multer)
 * @param folder Optional: folder name in Cloudinary
 * @returns The Cloudinary URL of the uploaded image.
 */
export const uploadImage = async (filePath: string, folder: string = 'designer-mini-app'): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
    });
    return result.secure_url; // Returns HTTPS URL
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary.');
  }
};

/**
 * Instructions to replace Cloudinary:
 *
 * To replace Cloudinary with another storage provider (e.g., AWS S3, Google Cloud Storage,
 * or even a Telegram Channel for media as we discussed):
 *
 * 1.  **Choose your new provider:** Sign up and configure your bucket/storage.
 * 2.  **Update environment variables:** Add new keys for your chosen provider (e.g., AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY). Remove CLOUDINARY_* keys.
 * 3.  **Modify `uploadImage` function:**
 *     *   Remove the `cloudinary` import and usage.
 *     *   Import and use the SDK for your new provider (e.g., `@aws-sdk/client-s3`).
 *     *   Implement the upload logic using the new provider's API.
 *     *   Ensure the function still returns a public `Promise<string>` (the URL of the uploaded image).
 * 4.  **Update `package.json`:** Add new provider's SDK to `dependencies`, remove `cloudinary`.
 * 5.  **Adjust `backend/src/routes/uploadRoutes.ts` and `backend/src/controllers/uploadController.ts`**
 *     to use the updated `uploadImage` function.
 */
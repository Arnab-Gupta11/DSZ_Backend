import { cloudinary } from '../../config/cloudinary.js';
import { Media } from './media.model.js';
import { AppError } from '../../errors/AppError.js';
export const MediaService = {
  uploadMedia: async (file: Express.Multer.File, folder: string, userId: string) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder }, async (error, result) => {
        if (error) return reject(new AppError(500, 'Upload failed', 'MEDIA_UPLOAD_FAILED'));
        const media = await Media.create({
          publicId: result!.public_id,
          secureUrl: result!.secure_url,
          resourceType: result!.resource_type as 'image' | 'video' | 'raw',
          format: result!.format,
          width: result!.width,
          height: result!.height,
          bytes: result!.bytes,
          folder: result!.folder,
          uploadedBy: userId
        });
        resolve(media);
      }).end(file.buffer);
    });
  },
  getAllMedia: async () => await Media.find().sort('-createdAt'),
  deleteMedia: async (publicId: string) => {
    const media = await Media.findOne({ publicId });
    if (!media) throw new AppError(404, 'Media not found', 'MEDIA_NOT_FOUND');
    await cloudinary.uploader.destroy(publicId);
    await Media.findByIdAndDelete(media._id);
    return media;
  }
};
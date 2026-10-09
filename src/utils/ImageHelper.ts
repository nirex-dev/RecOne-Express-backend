import sharp from "sharp";

export const processImage = async (fileBuffer: Buffer): Promise<Buffer> => {
  return await sharp(fileBuffer)
    .webp({
      quality: 75,
      effort: 6,
    })
    .toBuffer();
};


// import sharp from "sharp";

// export const processImage = async (fileBuffer: any) => {
//   const processedBuffer = await sharp(fileBuffer)
//     .resize(1200, 1200, {
//       fit: "inside",
//     })
//     .webp({ quality: 80 })
//     .toBuffer();

//   return processedBuffer;
// };

import sharp from "sharp";

export const processImage = async (fileBuffer: Buffer): Promise<Buffer> => {
  return await sharp(fileBuffer)
    .webp({
      quality: 75,
      effort: 6,
    })
    .toBuffer();
};

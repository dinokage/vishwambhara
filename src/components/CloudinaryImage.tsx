'use client';

import { CldImage } from 'next-cloudinary';

type CloudinaryImageProps = {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
};

export default function CloudinaryImage({ src, width = 600, height = 400, alt = 'Cloudinary Image' }: CloudinaryImageProps) {
  return (
    <CldImage
      src={src.trim()}
      width={width}
      height={height}
      alt={alt}
      sizes="100vw"
    />
  );
}

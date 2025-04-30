'use client';

import { CldImage } from 'next-cloudinary';

type CloudinaryImageProps = {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  removeBackground?: boolean;
};

export default function CloudinaryImage({ src, width = 200, height = 200, alt = 'Cloudinary Image', removeBackground=false }: CloudinaryImageProps) {
  return (
    <CldImage
      src={src.trim()}
      width={width}
      height={height}
      alt={alt}
      sizes="100vw"
      className='object-contain w-full h-full rounded-lg'
      loading="lazy"
      removeBackground={removeBackground ? true : false}
    />
  );
}

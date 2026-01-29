"use client";

import Image from "next/image";

interface ProfileImageProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
}

export function ProfileImage({ imageUrl, firstName, lastName }: ProfileImageProps) {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
        <Image
          src={imageUrl}
          alt={`${firstName} ${lastName}`}
          fill
          className="rounded-full object-cover border-4 border-primary/20 dark:border-blue-400/20"
          priority
        />
      </div>
    </div>
  );
}
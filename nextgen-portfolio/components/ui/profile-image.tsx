"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";

interface ProfileImageProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
}

export function ProfileImage({
  imageUrl,
  firstName,
  lastName,
}: ProfileImageProps) {
  const [_isHovered, setIsHovered] = useState(false);
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  return (
    <button
      type="button"
      onClick={() => !isSignedIn && openSignIn()}
      className="relative aspect-square rounded-2xl overflow-hidden border-4 border-primary/20 block group cursor-pointer w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Profile Image"
    >
      <Image
        src={imageUrl}
        alt={`${firstName} ${lastName}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority
      />
      {/* Online Status Indicator */}
      <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-background shadow-lg animate-pulse" />
    </button>
  );
}

"use client";
import {useClerk,useUser} from "@clerk/nextjs";
import {MessageCircle, X} from "lucide-react";
import {useState} from "react";
import {useSidebar} from "@/components/ui/sidebar";
import Image from "next/image";

interface ProfileImageProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
}

export function ProfileImage ({
  imageUrl,
  firstName,
  lastName,
}: ProfileImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const {toggleSidebar, open} = useSidebar();
  const {isSignedIn} = useUser();
  const {openSignIn} = useClerk();

  return (
    <button
      type="button"
      onClick={() => (isSignedIn ? toggleSidebar() : openSignIn())}
      className="relative aspect-square rounded-2xl overflow-hidden border-4 border-primary/20 block group cursor-pointer w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Toggle AI Chat Sidebar"
    >
      <Image 
        src={imageUrl}
        alt={`${firstName} ${lastName}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority
      />
      {/* ONLINE Badge */}
    </button>
  );
}
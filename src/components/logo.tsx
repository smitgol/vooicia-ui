import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showWordmark?: boolean
  size?: "sm" | "md"
}

const sizes = {
  sm: { height: 22, width: 27, imageClass: "h-[22px]", wordmarkClass: "text-lg" },
  md: { height: 26, width: 31, imageClass: "h-[26px]", wordmarkClass: "text-xl" },
} as const

export function Logo({ className, showWordmark = true, size = "sm" }: LogoProps) {
  const { height, width, imageClass, wordmarkClass } = sizes[size]

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image
        src="/logo.svg"
        alt="Voycia"
        width={width}
        height={height}
        className={cn("w-auto shrink-0 object-contain", imageClass)}
        priority={size === "sm"}
      />
      {showWordmark && (
        <span className={cn("bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-bold", wordmarkClass)}>
          Voycia
        </span>
      )}
    </Link>
  )
}

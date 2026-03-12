"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { slideInLeftVariants, slideInRightVariants } from "@/lib/animations";

interface SplitSectionProps {
  imageSrc: string;
  imageAlt: string;
  /** 4:3 (default) or '3:2' */
  aspectRatio?: "4:3" | "3:2";
  /** When true, text is on the left and image on the right */
  reversed?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function SplitSection({
  imageSrc,
  imageAlt,
  aspectRatio = "4:3",
  reversed = false,
  className = "",
  children,
}: SplitSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const paddingClass = aspectRatio === "4:3" ? "pb-[75%]" : "pb-[66.67%]";

  const textVariants = reversed ? slideInLeftVariants : slideInRightVariants;
  const imageVariants = reversed ? slideInRightVariants : slideInLeftVariants;

  const imageEl = (
    <motion.div
      variants={imageVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="w-full md:w-1/2 flex-shrink-0"
    >
      <div
        className={`relative w-full ${paddingClass} rounded-2xl overflow-hidden shadow-[0_4px_20px_-6px_rgba(156,96,77,0.12)]`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </motion.div>
  );

  const textEl = (
    <motion.div
      variants={textVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="w-full md:w-1/2"
    >
      {children}
    </motion.div>
  );

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-10 md:gap-14 ${className}`}
    >
      {reversed ? (
        <>
          {textEl}
          {imageEl}
        </>
      ) : (
        <>
          {imageEl}
          {textEl}
        </>
      )}
    </div>
  );
}

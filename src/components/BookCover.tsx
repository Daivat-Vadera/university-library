"use client"
import { cn } from "@/lib/utils";
import BookCoverSvg from "./BookCoverSvg";
import { config } from "@/lib/config";
import { IKImage } from "imagekitio-next";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyle: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}
const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400*600.png",
}: props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyle[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <IKImage
          path={coverImage}
          loading="lazy"
          className="rounded-sm object-fill "
          alt="Book Cover"
          urlEndpoint={config.env.imageKit.urlEndpoint}
          fill
          lqip={{ active: true }}
        />
      </div>
    </div>
  );
};

export default BookCover;

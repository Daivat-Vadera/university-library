"use client";
import BookCover from "../BookCover";
import { useState, useEffect, useRef } from "react";
import { FastAverageColor } from "fast-average-color";

const BookCoverWithDynamicBG = ({
  coverColor,
  coverImage,
}: {
  coverColor: string;
  coverImage: string;
}) => {
  const [color, setColor] = useState("");
  const [lightenedColor, setLightenedColor] = useState("");
  // Function to lighten a HEX color
  const lightenColor = (hex: string, percent: number) => {
    // Remove '#' if present
    hex = hex.replace(/^#/, "");

    // Convert HEX to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Lighten the RGB values
    r = Math.min(255, r + (255 - r) * percent);
    g = Math.min(255, g + (255 - g) * percent);
    b = Math.min(255, b + (255 - b) * percent);

    // Convert RGB back to HEX
    const toHex = (value: number) =>
      Math.round(value).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  useEffect(() => {
    const fac = new FastAverageColor();
    const img = new Image();
    console.log(coverImage);

    img.crossOrigin = "Anonymous"; // Handle CORS if needed
    img.src = "https://ik.imagekit.io/vjhclc3j3/" + coverImage;

    img.onload = () => {
      fac
        .getColorAsync(img)
        .then((result) => {
          const hexColor = result.hex;
          setColor(hexColor);

          // Lighten the color by 20% (you can adjust the percentage)
          const lighterColor = lightenColor(hexColor, 0.7);
          setLightenedColor(lighterColor);
        })
        .catch(console.error);
    };

    return () => {
      img.onload = null; // Cleanup
    };
  }, [coverImage]);
  console.log(color);

  return (
    <div
      style={{ backgroundColor: lightenedColor }}
      className={`flex items-center justify-center py-6 px-16 rounded-2xl`}
    >
      <BookCover coverColor={coverColor} coverImage={coverImage} />
    </div>
  );
};

export default BookCoverWithDynamicBG;

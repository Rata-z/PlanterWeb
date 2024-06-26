"use client";
import React, { useState } from "react";
import Image from "next/image";
import Img from "@/assets/pexels-akilmazumder-1072824.png";
import { url } from "inspector";
interface ImageCardProps {
  body: string;
  image?: string; // `image` is now optional
}

function ImageCard({ body, image }: ImageCardProps) {
  const [detailsVisibility, changeDetailsVisibility] = useState("opacity-0");
  const toggleVisibility = () => {
    const newOpacity =
      detailsVisibility === "opacity-100" ? "opacity-0" : "opacity-100";
    changeDetailsVisibility(newOpacity);
  };
  return (
    <>
      {image !== undefined ? (
        <div
          className="flex size-full overflow-hidden rounded-md shadow-lg"
          style={{
            backgroundImage: image ? `url(${image})` : "none",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => toggleVisibility()}
        >
          <div
            className={`size-full text-ellipsis bg-black bg-opacity-75 p-3 ${detailsVisibility}`}
          >
            <div
              className={
                "prose line-clamp-10 text-left text-card-foreground prose-headings:text-card-foreground sm:line-clamp-7"
              }
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </div>
        </div>
      ) : (
        <div
          className={"size-full overflow-hidden text-ellipsis rounded-md p-3"}
        >
          <div
            className={
              "prose line-clamp-10 text-left text-card-foreground prose-headings:text-card-foreground sm:line-clamp-7"
            }
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      )}
    </>
  );
}

export default ImageCard;

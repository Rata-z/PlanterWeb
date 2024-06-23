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
  const [detailsVisibility, changeDetailsVisibility] = useState("opacity-100");
  const toggleVisibility = () => {
    const newOpacity =
      detailsVisibility === "opacity-100" ? "opacity-0" : "opacity-100";
    changeDetailsVisibility(newOpacity);
  };
  return (
    <>
      {image ? (
        <div
          className="flex size-full overflow-hidden rounded-md"
          style={{
            backgroundImage: image
              ? `url(https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?cs=srgb&dl=pexels-akilmazumder-1072824.jpg&fm=jpg)`
              : "none",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => toggleVisibility()}
        >
          <div
            className={
              "size-full text-ellipsis bg-black bg-opacity-75 p-3 " +
              detailsVisibility
            }
          >
            <div
              className={
                "sm:line-clamp-7 prose line-clamp-10 text-left text-card-foreground prose-headings:text-card-foreground"
              }
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </div>
        </div>
      ) : (
        <div
          className={
            "flex size-full overflow-hidden text-ellipsis rounded-md bg-black bg-opacity-75 p-3 " +
            detailsVisibility
          }
        >
          <div
            className={
              "line-clamp-7 prose text-left text-card-foreground prose-headings:text-card-foreground"
            }
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      )}
    </>
  );
}

export default ImageCard;

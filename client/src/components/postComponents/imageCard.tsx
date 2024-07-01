"use client";
import React, { useState } from "react";
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
            className={`size-full text-ellipsis bg-black bg-opacity-60 p-3 ${detailsVisibility}`}
          >
            <div
              className={
                "text-card-card-foreground prose line-clamp-10 text-left prose-headings:text-card-foreground prose-p:text-card-foreground prose-strong:text-foreground dark:prose-pre:bg-gray-900 sm:line-clamp-7"
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
              "prose line-clamp-10 text-left text-foreground prose-headings:text-foreground sm:line-clamp-7"
            }
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      )}
    </>
  );
}

export default ImageCard;

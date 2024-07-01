import React, { ReactElement } from "react";
import { IconType } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";

function FeatureCard({
  text,
  icon,
  header,
}: {
  text: string;
  header: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex size-56 flex-col items-center justify-center gap-1 rounded-3xl border-t-2 bg-gray-600 p-3 text-card-foreground shadow-2xl">
      <div className="rounded-lg border-3 p-3">{icon}</div>
      <h1 className="pt-2 text-3xl font-bold">{header}</h1>
      <p className="text-center">{text}</p>
    </div>
  );
}

export default FeatureCard;

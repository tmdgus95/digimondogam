"use client";
import React, { useRef, useState, useEffect } from "react";

interface CardProps {
  name: string;
  image: string;
  digimonId: string;
  attributes: string;
  level: string;
}

const DigimonCard: React.FC<CardProps> = ({
  name,
  image,
  digimonId,
  attributes,
  level,
}) => {
  const nameRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (nameRef.current) {
      const isTextTruncated =
        nameRef.current.scrollWidth > nameRef.current.clientWidth;
      setIsTruncated(isTextTruncated);
    }
  }, []);

  const levelClassMap: Record<string, string> = {
    유년기: "bg-level-baby",
    성장기: "bg-level-child",
    성숙기: "bg-level-adult",
    완전체: "bg-level-perfect",
    궁극기: "bg-level-ultimate",
    측정불가: "bg-level-unknown",
  };

  const attributeClassMap: Record<string, string> = {
    백신종: "bg-attribute-vaccine",
    바이러스종: "bg-attribute-virus",
    데이터종: "bg-attribute-data",
    프리종: "bg-attribute-free",
    불명: "bg-attribute-unknown",
  };

  return (
    <div className="flex flex-col items-center rounded-lg border bg-cardBg p-4 shadow-md transition-transform hover:scale-105">
      <div className="mb-4 flex w-full items-center justify-between px-2">
        <p className="text-sm text-gray-500">no. {digimonId}</p>

        <div className="group relative">
          <p
            ref={nameRef}
            className="max-w-[150px] truncate text-lg font-bold text-gray-800"
          >
            {name}
          </p>

          {isTruncated && (
            <div className="absolute bottom-full left-1/2 mb-2 hidden w-auto min-w-full -translate-x-1/2 whitespace-normal rounded bg-gray-800 p-4 text-base text-white shadow-lg group-hover:block">
              {name}
            </div>
          )}
        </div>
      </div>

      <div className="mb-4 flex h-32 w-full items-center justify-center bg-white">
        <img src={image} alt={name} className="h-full w-full object-contain" />
      </div>

      <div className="flex gap-2">
        <span
          className={`${levelClassMap[level]} rounded-full px-2 py-1 text-xs font-bold text-white`}
        >
          {level}
        </span>

        <span
          className={`${
            attributeClassMap[attributes] || "bg-attribute-unknown"
          } rounded-full px-2 py-1 text-xs font-bold text-white`}
        >
          {attributes}
        </span>
      </div>
    </div>
  );
};

export default DigimonCard;

"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images }: any) {
  const primary = images.find((i: any) => i.isPrimary);
  const [selected, setSelected] = useState(primary?.url);

  return (
    <div>
      <div className="bg-[#f5f3ef] rounded-2xl p-10">
        <Image
          src={selected}
          alt="product"
          width={500}
          height={600}
          className="mx-auto"
        />
      </div>

      <div className="flex gap-3 mt-4">
        {images.map((img: any) => (
          <button
            key={img.url}
            onClick={() => setSelected(img.url)}
            className="border rounded-lg p-1 hover:border-black"
          >
            <Image src={img.url} alt="" width={70} height={70} />
          </button>
        ))}
      </div>
    </div>
  );
}
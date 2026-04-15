// src/components/ui/PageTitle.tsx

import Image from "next/image";

type Props = {
  title: string;
};

export default function PageTitle({ title }: Props) {
  return (
    <div
      className="relative w-full overflow-hidden -mt-18.75">
      <Image
        src="/assets/textures/title-texture.png"
        alt=""
        width={1920}
        height={260}
        className="w-full h-100 object-cover object-center block"
        priority
        aria-hidden
      />

      <h1
        className="absolute bottom-3 mb-2 w-full text-center text-white font-display font-black uppercase"
        style={{
          fontSize: "clamp(3rem, 6vw, 8rem)",
          lineHeight: "100px",
          textShadow: "0 2px 20px rgba(0,0,0,0.8)",
        }}>
        {title}
      </h1>
    </div>
  );
}

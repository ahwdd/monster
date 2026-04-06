import Link from "next/link";

type Props = {
  href: string;
  text: string;
  external?: boolean;
};

export default function SkewBtn({ href, text, external }: Props) {
  const inner = (
    <div className="relative bg-black font-medium header-smaller tracking-[2px] pt-2.5 pr-6.25 pb-1.25 pl-6.25 
        border border-[#636363] text-white uppercase transition-all duration-300 ease-[0s] hover:border-accent">
      <div className="skew-x-15 -translate-y-px text-center whitespace-nowrap">
        {text}
      </div>
      {/* corner box */}
      <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#636363] transition-all duration-300 ease-[0s]" />
    </div>
  );

  const anchorClass =
    "inline-block bg-monster pl-[5px] -skew-x-[15deg] cursor-pointer border-none text-white no-underline";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={anchorClass}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={anchorClass}>
      {inner}
    </Link>
  );
}
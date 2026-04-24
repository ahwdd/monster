import React from 'react'
import Link from 'next/link';

export default function OutlinedParaBtn({
  children, onClick, href, withBorder
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  withBorder?: boolean;
}) {
  const content = (
    <span
      className={`relative inline-flex items-center justify-center font-display font-bold uppercase text-white cursor-pointer select-none 
      py-2 pl-5 pr-4.5 -skew-x-12 text-sm tracking-[1.5px] transition-opacity hover:opacity-80
      ${withBorder?'border-y border-e border-[#636363]':''}`}>
      <span className="absolute inset-y-0 inset-s-0 w-1.5 bg-monster" />
      <span className="absolute bottom-0 inset-e-0 w-2.5 h-2.5 bg-[#636363]" />
      <span className="relative z-10 skew-x-12 ps-1.5">
        {children}
      </span>
    </span>
  );
  if (href) return <Link href={href}>{content}</Link>;
  return <button onClick={onClick}>{content}</button>;
}
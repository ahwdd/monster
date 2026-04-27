import Link from 'next/link';
import React from 'react'

export default function SolidParaBtn({ 
  children, onClick, href, className
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string; className?: string;
}) {
  const content = (
    <span
      className={`relative inline-flex items-center justify-center font-display font-bold uppercase text-white cursor-pointer 
      py-1.5 px-5.5 tracking-[1.5px] -skew-x-12 bg-monster select-none transition-opacity hover:opacity-90 txt-large
      ${className}`}>
      <span className="relative z-10 skew-x-12">
        {children}
      </span>
    </span>
  );
  if (href) return <Link href={href}>{content}</Link>;
  return <button onClick={onClick}>{content}</button>;
}
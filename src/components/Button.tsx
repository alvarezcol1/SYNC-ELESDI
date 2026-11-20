import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

type Variant = 'primary' | 'ghost' | 'whatsapp' | 'dark';
type Common = { variant?: Variant; icon?: ReactNode | false; children: ReactNode; className?: string };

function classes(variant: Variant, className?: string) {
  return ['btn', `btn--${variant}`, className].filter(Boolean).join(' ');
}

function Inner({ children, icon }: { children: ReactNode; icon?: ReactNode | false }) {
  return (
    <>
      <span className="btn__label">{children}</span>
      {icon !== false && (
        <span className="btn__icon" aria-hidden="true">
          {icon ?? <ArrowUpRight size={18} strokeWidth={2} />}
        </span>
      )}
    </>
  );
}

export function ButtonLink({ variant = 'primary', icon, children, className, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={classes(variant, className)} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </a>
  );
}

export function Button({ variant = 'primary', icon, children, className, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, className)} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}

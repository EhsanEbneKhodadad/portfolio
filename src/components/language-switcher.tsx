'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { languageNames, locales, localizedPath, translationPath, type Locale } from '@/lib/i18n';

const labels = { en: 'Choose language', fa: 'انتخاب زبان', tr: 'Dil seçin' };

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  return <LanguageDropdown key={pathname} locale={locale} pathname={pathname} />;
}

function LanguageDropdown({ locale, pathname }: { locale: Locale; pathname: string }) {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !container.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);

  return <div className="language-picker" ref={container}
    onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}
    onKeyDown={event => {
      if (event.key === 'Escape' && open) {
        event.stopPropagation();
        setOpen(false);
        button.current?.focus();
      }
    }}>
    <button ref={button} type="button" className="language-toggle" aria-label={labels[locale]}
      aria-expanded={open} aria-controls="language-options" onClick={() => setOpen(!open)}>
      <span className="language-globe" aria-hidden="true">🌐</span>
    </button>
    {open && <div className="language-options" id="language-options">
      {locales.map(target => <Link key={target}
        href={localizedPath(translationPath(pathname) ?? '/', target)}
        hrefLang={target} lang={target} dir={target === 'fa' ? 'rtl' : 'ltr'}
        aria-current={target === locale ? 'true' : undefined} onClick={() => setOpen(false)}>
        <span>{languageNames[target]}</span>
        {target === locale && <span aria-hidden="true">✓</span>}
      </Link>)}
    </div>}
  </div>;
}

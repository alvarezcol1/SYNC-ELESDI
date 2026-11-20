import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

/** Native <dialog> for the Privacy / Terms placeholders (focus handling built in). */
export function LegalDialog({ doc, onClose }: { doc: 'privacy' | 'terms' | null; onClose: () => void }) {
  const { t } = useI18n();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (doc && !d.open) d.showModal();
    if (!doc && d.open) d.close();
  }, [doc]);

  const title = doc === 'terms' ? t.legal.termsTitle : t.legal.privacyTitle;
  return (
    <dialog
      ref={ref}
      className="legal-dialog"
      aria-labelledby="legal-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <div className="legal-dialog__inner">
        <button type="button" className="legal-dialog__close" onClick={onClose} aria-label={t.a11y.close}>
          <X size={20} aria-hidden="true" />
        </button>
        <h2 id="legal-title">{title}</h2>
        <p>{t.legal.placeholder}</p>
      </div>
    </dialog>
  );
}

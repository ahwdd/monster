import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkCircle, IoClose } from "react-icons/io5";

function TermsCheckbox({
  checked,
  onChange,
  locale,
  prefix,
  conditionsWord,
  andWord,
  termsWord,
  modalTitle,
  modalBody,
  modalRulesTitle,
  modalRules,
  modalFooter,
  modalClose,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  locale: string;
  prefix: string;
  conditionsWord: string;
  andWord: string;
  termsWord: string;
  modalTitle: string;
  modalBody: string;
  modalRulesTitle: string;
  modalRules: string[];
  modalFooter: string;
  modalClose: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Checkbox row */}
      <label className="flex items-start gap-3 cursor-pointer group w-fit">
        <div className="relative mt-0.5 shrink-0">
          <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div
            className={`w-5 h-5 border rounded flex items-center justify-center transition-colors duration-200 ${
              checked
                ? "border-transparent"
                : "border-[#272727] bg-[#171717] group-hover:border-[#444]"
            }`}>
            {checked && <IoCheckmarkCircle className="size-4 text-[#6bd41a]" />}
          </div>
        </div>

        <span className="text-sm text-[#b6b6b6] leading-relaxed select-none">
          {prefix}{" "}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            className="text-[#6bd41a] hover:underline">
            {conditionsWord}
          </button>{" "}
          {andWord}{" "}
          <a
            href={`/terms`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6bd41a] hover:underline"
            onClick={(e) => e.stopPropagation()}>
            {termsWord}
          </a>
        </span>
      </label>

      {/* Rules modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="rules-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setOpen(false)}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-md bg-[#0d0d0d] border border-[#272727] p-6"
              onClick={(e) => e.stopPropagation()}>
              {/* Close */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-4 inset-e-4 text-[#555] hover:text-white transition-colors">
                <IoClose className="size-5" />
              </button>

              {/* Content */}
              <p className="text-sm font-display font-bold text-white uppercase tracking-wider mb-2">
                {modalTitle}
              </p>
              <p className="text-sm text-[#ccccd0] leading-relaxed mb-4">
                {modalBody}
              </p>
              <div className="border-t border-[#272727] pt-4">
                <p className="text-sm font-bold text-white mb-2">
                  {modalRulesTitle}
                </p>
                <ol className="list-decimal list-inside space-y-1 text-xs text-[#b6b6b6]">
                  {modalRules.map((rule, i) => (
                    <li key={i}>{rule}</li>
                  ))}
                </ol>
              </div>
              <p className="text-xs text-[#555] mt-3">{modalFooter}</p>

              {/* Dismiss */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-5 w-full h-10 bg-[#171717] border border-[#272727] hover:border-[#444] text-[#ccccd0] text-sm font-display font-bold uppercase tracking-wider transition-colors duration-200">
                {modalClose}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default TermsCheckbox;

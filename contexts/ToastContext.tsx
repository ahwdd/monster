"use client";

// src/contexts/ToastContext.tsx
import { createContext, useContext, ReactNode } from "react";
import { Toaster, toast as hotToast } from "react-hot-toast";

type ToastFn = (message: string) => void;

interface ToastContextType {
  success: ToastFn;
  error:   ToastFn;
  info:    ToastFn;
  dismiss: typeof hotToast.dismiss;
}

const ToastContext = createContext<ToastContextType>({
  success: () => {},
  error:   () => {},
  info:    () => {},
  dismiss: hotToast.dismiss,
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const value: ToastContextType = {
    success: (msg) =>
      hotToast.success(msg, {
        style: {
          background: "#0d0d0d",
          color:      "#fff",
          border:     "1px solid #78be20",
          fontFamily: "var(--font-teko), sans-serif",
          fontSize:   "1rem",
        },
        iconTheme: { primary: "#78be20", secondary: "#000" },
        duration:  4000,
      }),

    error: (msg) =>
      hotToast.error(msg, {
        style: {
          background: "#0d0d0d",
          color:      "#fff",
          border:     "1px solid #dc3545",
          fontFamily: "var(--font-teko), sans-serif",
          fontSize:   "1rem",
        },
        iconTheme: { primary: "#dc3545", secondary: "#000" },
        duration:  5000,
      }),

    info: (msg) =>
      hotToast(msg, {
        style: {
          background: "#0d0d0d",
          color:      "#fff",
          border:     "1px solid #555",
          fontFamily: "var(--font-teko), sans-serif",
          fontSize:   "1rem",
        },
        duration: 4000,
      }),

    dismiss: hotToast.dismiss,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster
        position="top-center"
        containerStyle={{ top: 80 }} // below the fixed header
        toastOptions={{ className: "" }}
      />
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
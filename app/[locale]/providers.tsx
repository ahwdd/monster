"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { ToastProvider } from "@/contexts/ToastContext";

type Props = {
  children:  ReactNode;
  locale:    string;
  messages:  Record<string, any>;
};

export default function Providers({ children, locale, messages }: Props) {
  return (
    <Provider store={store}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </NextIntlClientProvider>
    </Provider>
  );
}
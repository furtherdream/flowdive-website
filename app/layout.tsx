import type { Metadata } from "next";
import { I18nProvider } from "./i18n/context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flowdive — Dive into flow",
  description:
    "무의식적인 사이트 방문을 차단하고 몰입의 가장 깊은 곳으로. Chrome 확장 + 데스크탑 앱.",
  openGraph: {
    title: "Flowdive — Dive into flow",
    description: "무의식적인 사이트 방문을 차단하고 몰입의 가장 깊은 곳으로.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
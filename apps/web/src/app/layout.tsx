import "./global.css";
import { Prompt } from "next/font/google";

const prompt = Prompt({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext", "thai", "vietnamese"],
});

export const metadata = {
  title: "Dup-Detector",
  description: "Identify duplicate files within a specified directory",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={prompt.className}>
      <body>{children}</body>
    </html>
  );
}

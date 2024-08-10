import "./global.css";

export const metadata = {
  title: "Dup-Detector",
  description: "Identify duplicate files within a specified directory",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

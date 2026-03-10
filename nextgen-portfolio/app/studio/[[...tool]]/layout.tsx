import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nextgen Portfolio",
  description: "Content Management System",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import { AuthProvider } from "@/context/AuthContext";
import "../styles/globals.css";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "PresencePulse - Digital Presence Analyzer",
  description: "Monitor and enhance your online presence with PresencePulse.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text font-sans">
      <AuthProvider>
        <Navbar/>
        <main className="min-h-screen flex flex-col flex-grow ">{children}</main>
        <Footer/>
      </AuthProvider>
      </body>
    </html>
  );
}

import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-8 text-center">
      <p className="text-lg">&copy; {new Date().getFullYear()} PresencePulse. All rights reserved.</p>
      <div className="mt-4 flex justify-center gap-6 text-2xl">
        <Link href="#" className="hover:text-accent transition-all"><FaFacebook /></Link>
        <Link href="#" className="hover:text-accent transition-all"><FaTwitter /></Link>
        <Link href="#" className="hover:text-accent transition-all"><FaInstagram /></Link>
        <Link href="#" className="hover:text-accent transition-all"><FaLinkedin /></Link>
      </div>
    </footer>
  );
}

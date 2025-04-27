"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HelpCircle, Menu, ChevronDown } from "lucide-react"; // Import ChevronDown for scroll indicator

export default function Home() {
  const router = useRouter();
  const [showLogo, setShowLogo] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleButton = (role: string) => {
    router.push(`/user-login?role=${role}`);
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-dark-background scroll-smooth global-text-size">
      {/* Blackout screen and logo animation */}
      {showLogo && (
        <div className="fixed inset-0 bg-dark-background z-50 flex items-center justify-center">
          <Image
            src="/logo_darkbg.png"
            alt="FYP Hub Logo"
            width={300}
            height={300}
            className="animate-fade-grow"
          />
        </div>
      )}

      {/* Header */}
      <div className="fixed top-0 w-full z-40 px-8 py-4 flex flex-row justify-between items-center gap-4 lg:gap-[24rem]">
        <div className="flex items-center gap-3">
          <Image src="/logo_darkbg.png" alt="Logo" width={150} height={150} />
        </div>

        {/* Sign In Button and Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <Link href="/admin-login">
            <button className="bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition">
              LogIn
            </button>
          </Link>
          <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-around gap-6 backdrop-blur-lg bg-white/20 border-b border-white/100 text-white px-8 py-4 rounded-2xl lg:flex-grow">
          <button
            onClick={() => scrollToSection("home")}
            className="list-none cursor-pointer hover:underline transition text-light-primary"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="list-none cursor-pointer hover:underline transition text-light-primary"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact-us")}
            className="list-none cursor-pointer hover:underline transition text-light-primary"
          >
            Contact
          </button>
          <button
            onClick={() => scrollToSection("help")}
            className="list-none flex items-center gap-1 cursor-pointer hover:underline transition text-light-primary"
          >
            Help
            <HelpCircle size={18} />
          </button>
        </nav>

        {/* Sign In Button (md and up) */}
        <div className="hidden md:block">
          <Link href="/admin-login">
            <button className="bg-white text-black px-6 py-4 rounded-full shadow-md hover:bg-gray-200 transition">
              LogIn
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden h-screen flex items-center fixed top-[90px] left-0 w-full z-30 rounded-b-2xl backdrop-blur-lg bg-white/20 text-light-primary px-6 py-4 transition-all duration-500 ease-in-out transform ${
          isMobileMenuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className="h-[400px] w-full flex flex-col gap-4 justify-around items-center text-4xl">
          <button
            onClick={() => scrollToSection("home")}
            className="cursor-pointer hover:underline transition"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="cursor-pointer hover:underline transition"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact-us")}
            className="cursor-pointer hover:underline transition"
          >
            Contact
          </button>
          <button
            onClick={() => scrollToSection("help")}
            className="flex items-center gap-1 cursor-pointer hover:underline transition"
          >
            Help
            <HelpCircle size={18} />
          </button>
        </ul>
      </div>

      {/* Main */}
      <main
        id="home"
        className="text-center text-white px-4 flex items-center flex-col justify-center h-screen relative"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome To FYP Portal</h1>
        <h2 className="text-4xl font-bold mb-4">
          Organize. Collaborate. Succeed.
        </h2>
        <p className="text-lg max-w-xl mx-auto mb-6">
          Manage your final year project effortlessly with our centralized hub
          designed for students and supervisors.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            className="bg-dark-background px-6 py-3 rounded-lg border border-white hover:bg-white/30 transition"
            onClick={() => handleButton("student")}
          >
            Get Started as Student
          </button>
          <button
            className="bg-white/20 px-6 py-3 rounded-lg border border-white hover:bg-white/30 transition"
            onClick={() => handleButton("teacher")}
          >
            Get Started as Supervisor
          </button>
        </div>

        {/* Scroll Down Indicator */}
        <a
          href="#about"
          className="absolute bottom-10 animate-bounce text-white"
        >
          <ChevronDown size={40} />
        </a>
      </main>

      {/* About */}
      <section id="about" className="border-t border-white/30">
        <div className="flex flex-col items-center justify-center h-screen text-center text-white px-4 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg max-w-xl text-center mb-6">
            Our platform is designed to streamline the final year project
            management process, making it easier for students and supervisors to
            collaborate and succeed.
          </p>
          <button className="bg-dark-background px-6 py-3 rounded-lg border border-white hover:bg-white/30 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Contact-Us */}
      <section id="contact-us" className="border-t border-white/30">
        <div className="flex flex-col items-center justify-center h-screen text-center text-white px-4 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg max-w-xl text-center mb-6">
            Have questions or feedback? Reach out to us anytime!
          </p>
          <button className="bg-dark-background px-6 py-3 rounded-lg border border-white hover:bg-white/30 transition">
            Get in Touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full text-white text-center py-4 bg-black/40 backdrop-blur-md border-t border-white/30">
        <p>&copy; 2025 FYP Management Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}

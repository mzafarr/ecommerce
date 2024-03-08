"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cart from "../Cart";
import { buttonVariants } from "../ui/button";
import { useEffect, useState } from "react";

const Navbar = () => {
  const currentPath = usePathname();
  const [userId, setUserId] = useState("");
  const links = [
    { href: "/", label: "Home" },
    { href: "/products/laptop", label: "Laptops" },
    { href: "/products/phone", label: "Phones" },
  ];

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout", {
        method: "POST",
      });
      // localStorage.removeItem("userId");
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    // Check for localStorage when component mounts (client-side)
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  return (
    <nav className=" flex items-center gap-8 text-xl justify-between p-4 px-16 bg-gray-100 border-b text-slate-900">
      <Link href={`/`}>
        <h3>TechArena</h3>
      </Link>
      <div className="flex items-center gap-8">
        {links.map((link) => {
          return (
            <Link href={link.href} key={link.href}>
              <span
                className={`${
                  currentPath === link.href
                    ? "text-yellow-500"
                    : "text-white hover:text-yellow-500"
                } transition-colors`}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
        <Cart />
        {userId ? (
          <button onClick={handleSignOut} className={buttonVariants()}>
            Sign Out
          </button>
        ) : (
          <Link href={"/signin"} className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

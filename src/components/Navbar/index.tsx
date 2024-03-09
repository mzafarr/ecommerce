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
    { href: "/products/accessories", label: "Accessories" },
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
    <nav className=" flex items-center gap-8 text-lg justify-between p-4 px-16 border-b shadow bg-gray-800 text-white">
      <Link href={`/`}>
        <h3>TechArena</h3>
      </Link>
      <div className="flex items-center gap-8">
        {links.map((link) => {
          return (
            <Link href={link.href} key={link.href}>
              <span
                // className={`${
                //   currentPath === link.href
                //     ? "text-yellow-500"
                //     : "hover:text-yellow-500"
                // } transition-colors`}
                className="hover:text-gray-300 transition-colors"
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
          <Link href={"/signin"} className={"bg-yellow-500 text-slate-600 p-2.5 px-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

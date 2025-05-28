"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Users, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RootContext, { RootContextType } from "@/app/RootContext";

export function Navbar() {
 const [isOpen, setIsOpen] = useState(false);
 const sessionId = localStorage.getItem("session_id");

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "MOVIES", href: "/movies" },
    { name: "TV SHOWS", href: "/tvshows" },
    { name: "FAVORITES", href: "/favorites" },
  ];

  return (
    <nav className=" py-4 text-white   w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo Section */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" className="flex items-center space-x-2 group text-primary font-semibold">
            SAVANNAMOVIES
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <span className="text-white hover:text-primary font-medium transition-colors relative group">
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                  </span>
                </Link>
              </motion.div>
            ))}
            <div className="flex items-center space-x-3 ml-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
               {sessionId ?  <div>Sign Out</div> : <Button
                  variant="outline"
                  asChild
                  className="rounded-full"
                >
                  <Link href="/login">Sign In</Link>
                </Button>}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={item.href} onClick={() => setIsOpen(false)}>
                    <span className="block px-3 py-1 rounded-md text-base font-medium text-white hover:bg-[#F0E7D8] hover:text-[#4A2C11] transition-colors">
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <div className="pt-2 space-y-3">
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/login">Sign In</Link>
                </Button>
               
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

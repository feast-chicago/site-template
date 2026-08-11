"use client";

import { useBusinessContext } from "@/contexts/business-context";
import { useUser } from "@clerk/nextjs";
import { MapPin, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function Navbar() {
  const { business } = useBusinessContext();
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  // TODO: Turn these variables into configurable settings.
  let linkGap = "gap-5";
  let linksAlignment = "center";

  const {
    is_menu_page_enabled,
    is_online_ordering_enabled,
    is_pos_enabled,
    is_reservations_enabled,
    is_customer_accounts_enabled,
    is_shop_page_enabled,
    is_catering_enabled,
  } = business.settings;
  const { location_type } = business;

  const NavbarLinks = [
    { name: "Home", href: "/", enabled: true },
    { name: "Menu", href: "/menu", enabled: is_menu_page_enabled },
    { name: "Catering", href: "/catering", enabled: is_catering_enabled },
    { name: "Shop", href: "/shop", enabled: is_shop_page_enabled },
  ];

  return (
    <nav className="sticky top-0 z-10 w-dvw">
      <div
        className={`flex ${linksAlignment === "center" ? "justify-between" : "justify-start"} items-center px-10 h-14 ${linkGap} bg-primary text-primary-foreground font-medium`}
      >
        {/* Logo */}
        <span className={linksAlignment === "center" ? "w-1/3" : ""}>
          <Link href="/">{business.name}</Link>
        </span>

        {/* Links */}
        <span
          className={`${linksAlignment === "center" ? "w-1/3 " : ""}flex justify-center ${linkGap}`}
        >
          {NavbarLinks.filter((link) => link.enabled).map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={
                pathname === link.href
                  ? "border-b-2"
                  : "border-b-2 border-transparent"
              }
            >
              {link.name}
            </Link>
          ))}
        </span>

        {/* Buttons */}
        <span
          className={`${linksAlignment === "center" ? "w-1/3" : "ml-auto"} flex justify-end items-center gap-0.5`}
        >
          {location_type === "multi-unit" && (
            <Button variant="link" className="flex items-center text-xs">
              <MapPin />
              <span>Find a location</span>
            </Button>
          )}

          {is_pos_enabled && (
            <div className="flex items-center gap-0.5">
              {is_online_ordering_enabled && (
                // TODO: Make this text customizable.
                <Button className="text-primary-foreground">Order now</Button>
              )}
              {is_reservations_enabled && (
                <Link href="/reserve">Reserve a table</Link>
              )}

              {is_online_ordering_enabled && (
                <Button variant="ghost" size="icon" className="text-white">
                  <ShoppingBag />
                </Button>
              )}
            </div>
          )}

          {is_customer_accounts_enabled &&
            (isSignedIn ? (
              <Link href="/sign-in">Profile</Link>
            ) : (
              <Link href="/sign-in">Sign in / Join</Link>
            ))}
        </span>
      </div>
    </nav>
  );
}

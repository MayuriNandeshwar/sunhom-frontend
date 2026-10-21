"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useSideBar } from "@/context/SidebarContext";
import SidebarWidget from "./SidebarWidget";

/* ✅ TSX ICONS (converted via SVGR) */
import {
  CalenderLine,
  ChevronDown,
  Grid,
  List,
  Page,
  PieChart,
  PlugIn,
  Table,
  BoxCube,
  UserCircle,
  HorizontalDots,
} from "@/icons-tsx";


/* ---------------------------------- */
/* Types                              */
/* ---------------------------------- */

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    name: string;
    path: string;
    pro?: boolean;
    new?: boolean;
  }[];
};

/* ---------------------------------- */
/* Navigation Config                  */
/* ---------------------------------- */

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: <Grid />,
    subItems: [{ name: "Ecommerce", path: "/" }],
  },
  {
    name: "Calendar",
    icon: <CalenderLine />,
    path: "/calendar",
  },
  {
    name: "User Profile",
    icon: <UserCircle />,
    path: "/profile",
  },
  {
    name: "Forms",
    icon: <List />,
    subItems: [{ name: "Form Elements", path: "/form-elements" }],
  },
  {
    name: "Tables",
    icon: <Table />,
    subItems: [{ name: "Basic Tables", path: "/basic-tables" }],
  },
  {
    name: "Pages",
    icon: <Page />,
    subItems: [
      { name: "Blank Page", path: "/blank" },
      { name: "404 Error", path: "/error-404" },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    name: "Charts",
    icon: <PieChart />,
    subItems: [
      { name: "Line Chart", path: "/line-chart" },
      { name: "Bar Chart", path: "/bar-chart" },
    ],
  },
  {
    name: "UI Elements",
    icon: <BoxCube />,
    subItems: [
      { name: "Alerts", path: "/alerts" },
      { name: "Avatar", path: "/avatars" },
      { name: "Badge", path: "/badge" },
      { name: "Buttons", path: "/buttons" },
      { name: "Images", path: "/images" },
      { name: "Videos", path: "/videos" },
    ],
  },
  {
    name: "Authentication",
    icon: <PlugIn />,
    subItems: [
      { name: "Sign In", path: "/signin" },
      { name: "Sign Up", path: "/signup" },
    ],
  },
];

/* ---------------------------------- */
/* Component                          */
/* ---------------------------------- */

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSideBar();
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => path === pathname,
    [pathname]
  );

  /* ---------------------------------- */
  /* Effects                            */
  /* ---------------------------------- */

  useEffect(() => {
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        nav.subItems?.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({ type: menuType as any, index });
          }
        });
      });
    });
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      const el = subMenuRefs.current[key];
      if (el) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: el.scrollHeight,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, type: "main" | "others") => {
    setOpenSubmenu((prev) =>
      prev && prev.index === index && prev.type === type
        ? null
        : { type, index }
    );
  };

  /* ---------------------------------- */
  /* Render Menu                        */
  /* ---------------------------------- */

  const renderMenu = (items: NavItem[], type: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, type)}
              className="menu-item menu-item-inactive"
            >
              {nav.icon}
              {(isExpanded || isHovered || isMobileOpen) && (
                <>
                  <span>{nav.name}</span>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item ${
                  isActive(nav.path)
                    ? "menu-item-active"
                    : "menu-item-inactive"
                }`}
              >
                {nav.icon}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span>{nav.name}</span>
                )}
              </Link>
            )
          )}

          {nav.subItems && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${type}-${index}`] = el;
              }}
              style={{
                height:
                  openSubmenu?.type === type &&
                  openSubmenu.index === index
                    ? subMenuHeight[`${type}-${index}`]
                    : 0,
              }}
              className="overflow-hidden transition-all"
            >
              <ul className="ml-8 mt-2 space-y-1">
                {nav.subItems.map((sub) => (
                  <li key={sub.name}>
                    <Link href={sub.path} className="menu-dropdown-item">
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  /* ---------------------------------- */
  /* JSX                               */
  /* ---------------------------------- */

  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-screen bg-white dark:bg-gray-900 border-r transition-all ${
        isExpanded || isHovered ? "w-[290px]" : "w-[90px]"
      }`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        <Link href="/">
          <Image
            src="/images/logo/logo.svg"
            alt="Logo"
            width={140}
            height={40}
          />
        </Link>
      </div>

      <nav className="px-4">
        <h2 className="mb-3 text-xs uppercase text-gray-400">
          {isExpanded ? "Menu" : <HorizontalDots />}
        </h2>
        {renderMenu(navItems, "main")}

        <h2 className="my-4 text-xs uppercase text-gray-400">
          {isExpanded ? "Others" : <HorizontalDots />}
        </h2>
        {renderMenu(othersItems, "others")}
      </nav>

      {(isExpanded || isHovered) && <SidebarWidget />}
    </aside>
  );
};

export default AppSidebar;

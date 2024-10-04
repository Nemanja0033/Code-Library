"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps, ReactNode, useState } from "react"

export function Nav({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-primary-foreground flex justify-between items-center px-4 lg:relative  sticky top-0 z-10">
    <div className="flex items-center justify-between w-full h-[60px]">
    <a className="self-center font-semibold lg:text-xl" href="/">Code<span className="text-muted-foreground">Commerce</span></a>
      <button
        className="md:hidden focus:outline-none"
        onClick={toggleMenu}
      >
        <span className="block w-6 h-0.5 bg-primary-foreground mb-1"></span>
        <span className="block w-6 h-0.5 bg-primary-foreground mb-1"></span>
        <span className="block w-6 h-0.5 bg-primary-foreground mb-1"></span>
      </button>
      <div className="hidden md:flex flex-grow justify-evenly">
        {children}
      </div>
    </div>
    {isOpen && (
      <div className="md:hidden flex flex-col items-center bg-black text-primary-foreground absolute top-14 left-0 right-0">
        {children}
      </div>
    )}
  </nav>
);
}



export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-background text-foreground"
      )}
    />
  )
}
"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Menu, Newspaper, Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Politics", slug: "politics" },
    { name: "Business", slug: "business" },
    { name: "Technology", slug: "technology" },
    { name: "Science", slug: "science" },
    { name: "Health", slug: "health" },
    { name: "Entertainment", slug: "entertainment" },
    { name: "Sports", slug: "sports" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-6 w-6 text-primary" />
                  <span className="text-lg font-semibold">Rashtra Prabha</span>
                </div>
                <Separator />
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="font-medium hover:text-primary">
                    Home
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 font-medium hover:text-primary">
                      Categories
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px]">
                      {categories.map((category) => (
                        <DropdownMenuItem key={category.slug} asChild>
                          <Link href={`/category/${category.slug}`}>
                            {category.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link href="/about" className="font-medium hover:text-primary">
                    About
                  </Link>
                  <Link href="/create" className="font-medium hover:text-primary">
                    Create
                  </Link>
                </nav>
                <Separator />
                <div className="relative">
                  <Input
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo and desktop nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold hidden sm:inline-block">
              Rashtra Prabha
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                Categories
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.slug} asChild>
                    <Link href={`/category/${category.slug}`}>
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/create"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Create
            </Link>
          </nav>
        </div>

        {/* Search and auth */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Input
              placeholder="Search news..."
              className="w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Subscribe
          </Button>
        </div>
      </div>
    </header>
  );
}
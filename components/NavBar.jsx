'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';
import { Menu, Newspaper, Search } from 'lucide-react';
import { Input } from './ui/input';

export function Navbar() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { name: 'Politics', slug: 'politics' },
    { name: 'Business', slug: 'business' },
    { name: 'Sports', slug: 'sports' },
    { name: 'Travel', slug: 'travel' },
  ];

  const isPrivileged = session?.user?.role === 'admin' || session?.user?.role === 'editor';

useEffect(() => {
    const fetchPdf = async () => {
      const res = await fetch('/api/epaper');
      const data = await res.json();
      if (data?.url) setPdfUrl(data.url);
    };
    fetchPdf();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6">
                <img src="/newslogo.jpg" alt="Logo" className="h-15 w-30" />
                <Separator />
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="font-medium hover:text-primary">Home</Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 font-medium hover:text-primary">
                      Categories
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px]">
                      {categories.map((category) => (
                        <DropdownMenuItem key={category.slug} asChild>
                          <Link href={`/category/${category.slug}`}>{category.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link href="/about" className="font-medium hover:text-primary">About</Link>

                 {pdfUrl && (
        <Link href={pdfUrl} target="_blank" rel="noopener noreferrer">
           E-Paper
          
        </Link>
      )}

                  

                  {isPrivileged && (
                    <Link href="/dashboard/news" className="font-medium hover:text-primary">
                      Dashboard
                    </Link>
                  )}

                  {!session?.user ? (
                    <Link href="/login" className="font-medium hover:text-primary">
                      Login
                    </Link>
                  ) : (
                    <button onClick={() => signOut()} className="font-medium hover:text-primary text-left">
                      Sign Out
                    </button>
                  )}
                </nav>
                <Separator />
                <div className="relative">
                  <Input
                    placeholder="Search news via name or date"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
                    
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={handleSearch}
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
            <img src="/newslogo.jpg" alt="Logo" className="h-10 w-40" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                Categories
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.slug} asChild>
                    <Link href={`/category/${category.slug}`}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>

            

            {isPrivileged && (
              <Link href="/dashboard/news" className="text-sm pr-2 font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Input
              placeholder="Search news via name or date"
              className="w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          {pdfUrl && (
        <Link href={pdfUrl} target="_blank" rel="noopener noreferrer">
          <Button className="hidden md:inline-block">
              Download E-Paper
          </Button>
        </Link>
      )}

          
          {!session?.user ? (
            <Link href="/login" className="hidden md:inline-block text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
          ) : (
            <Button
              onClick={() => signOut()}
              className="hidden md:inline-block text-sm font-medium hover:text-primary transition-colors"
            >
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

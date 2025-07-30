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
import { Input } from './ui/input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Search } from 'lucide-react';

export function Navbar() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [epapers, setEpapers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState('');
  const router = useRouter();

  const isPrivileged = session?.user?.role === 'admin' || session?.user?.role === 'editor';

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

  useEffect(() => {
    const fetchPdf = async () => {
      const res = await fetch('/api/epaper');
      const data = await res.json();
      if (Array.isArray(data)) {
        setEpapers(data);
      }
    };
    fetchPdf();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const matched = epapers.find(
        (paper) => new Date(paper.createdAt).toDateString() === selectedDate.toDateString()
      );
      setSelectedUrl(matched ? matched.url : '');
    }
  }, [selectedDate, epapers]);

  // Convert epaper createdAt strings to Date objects
  const availableDates = epapers.map(paper => new Date(paper.createdAt));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <img src="/newslogo.jpg" alt="Logo" className="h-10 w-40" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">Home</Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium hover:text-primary flex items-center gap-1">
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
            <Link href="/about" className="text-sm font-medium hover:text-primary">About</Link>
            {isPrivileged && (
              <Link href="/dashboard/news" className="text-sm font-medium hover:text-primary">
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        {/* Search + E-paper + Auth */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Input
              placeholder="Search news via name or date"
              className="w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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

          {/* 📅 Calendar-based E-paper download */}
          <div className="relative">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Select E-Paper Date"
              className="border rounded px-2 py-1 text-sm"
              includeDates={availableDates}
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
            {selectedUrl && (
              <Link href={selectedUrl} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="ml-2">Download</Button>
              </Link>
            )}
          </div>

          {/* Auth */}
          {!session?.user ? (
            <Link href="/login" className="text-sm font-medium hover:text-primary hidden md:block">
              Login
            </Link>
          ) : (
            <Button onClick={() => signOut()} className="text-sm hidden md:block">
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

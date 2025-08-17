'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { data: session } = useSession();
  return (
    <header className="min-h-[64px] px-6 flex items-center justify-between bg-gray-100 text-gray-800 shadow-sm">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          <span>{session?.user?.name}</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md z-10 border border-gray-200">
            <div className="px-4 py-2 text-sm text-gray-600">
              {session?.user.email}
            </div>
            <hr className="border-gray-200" />
            <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
              Profile
            </p>
            <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
              Sign out
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

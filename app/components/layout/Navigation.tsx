'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface NavLink {
  label: string;
  href: string;
  dropdown?: NavLink[];
}

export interface NavigationProps {
  links: NavLink[];
  className?: string;
  mobile?: boolean;
  onLinkClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  links,
  className = '',
  mobile = false,
  onLinkClick,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleLinkClick = () => {
    setOpenDropdown(null);
    onLinkClick?.();
  };

  if (mobile) {
    return (
      <nav className={`flex flex-col space-y-2 ${className}`}>
        {links.map((link) => (
          <div key={link.label}>
            {link.dropdown ? (
              <>
                <button
                  onClick={() => handleDropdownToggle(link.label)}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-lg font-medium transition-colors"
                  aria-expanded={openDropdown === link.label}
                >
                  <span className="flex items-center justify-between">
                    {link.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {openDropdown === link.label && (
                  <div className="ml-4 mt-2 space-y-1">
                    {link.dropdown.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600 rounded-lg transition-colors"
                        onClick={handleLinkClick}
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={link.href}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-lg font-medium transition-colors"
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    );
  }

  return (
    <nav className={`flex items-center space-x-1 ${className}`}>
      {links.map((link) => (
        <div key={link.label} className="relative group">
          {link.dropdown ? (
            <>
              <button
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-1"
                aria-haspopup="true"
                aria-expanded={openDropdown === link.label}
                onMouseEnter={() => setOpenDropdown(link.label)}
                onClick={() => handleDropdownToggle(link.label)}
              >
                {link.label}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="py-2">
                  {link.dropdown.map((subLink) => (
                    <Link
                      key={subLink.href}
                      href={subLink.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={handleLinkClick}
                    >
                      {subLink.label}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <Link
              href={link.href}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navigation;

'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { theme } from '@/lib/theme';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: 'Quick Links',
    links: [
      { label: 'About us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Policies', href: '#' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Trust & Safety', href: '#' },
      { label: 'Find a Vet', href: '#' },
      { label: 'Telemedicine', href: '#' },
      { label: 'Gift Cards', href: '#' },
    ],
  },
  {
    title: 'Hosting',
    links: [
      { label: 'List your practice', href: '#' },
      { label: 'Join as a Vet', href: '#' },
      { label: 'Resources', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Safety Information', href: '#' },
      { label: 'Cancellation options', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="w-full px-15 pt-15 pb-6 gap-12 flex flex-col"
      style={{ backgroundColor: theme.colors.background.tertiary }}
    >
      {/* Primary Links Section */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {footerColumns.map((column) => (
            <nav key={column.title} className="flex flex-col">
              <h3 className="text-sm font-semibold mb-4">{column.title}</h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:opacity-80 transition-opacity"
                      style={{ color: theme.colors.text.secondary }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t" style={{ borderColor: theme.colors.border.default }}>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            {/* Logo */}
            <div className="shrink-0">
              <Logo isUrl="/" />
            </div>

            {/* Copyright */}
            <div className="text-sm" style={{ color: theme.colors.text.secondary }}>
              © 2024 BuzzAVet, Inc.
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-sm hover:opacity-80 transition-opacity"
                style={{ color: theme.colors.text.secondary }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm hover:opacity-80 transition-opacity"
                style={{ color: theme.colors.text.secondary }}
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

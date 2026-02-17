'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { theme } from '@/lib/theme';

/**
 * Navigation progress bar component that shows a progress indicator
 * at the top of the page during route transitions.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const prevPathnameRef = useRef<string>(pathname);

  useEffect(() => {
    // Only show progress if pathname actually changed
    if (pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname;

      // Reset and show progress bar
      setProgress(0);
      setIsVisible(true);

      // Start progress animation immediately
      requestAnimationFrame(() => {
        setProgress(30); // Quick start
      });

      // Move to 80% quickly (simulating navigation in progress)
      const progressTimer1 = setTimeout(() => {
        setProgress(80);
      }, 100);

      // Complete to 100% when navigation should be finishing
      const progressTimer2 = setTimeout(() => {
        setProgress(100);
      }, 300);

      // Hide progress bar after completion
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        // Reset after fade out completes
        setTimeout(() => {
          setProgress(0);
        }, 300);
      }, 600);

      return () => {
        clearTimeout(progressTimer1);
        clearTimeout(progressTimer2);
        clearTimeout(hideTimer);
      };
    }
  }, [pathname]);

  // Listen for Link clicks to show progress immediately
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Ignore clicks on elements with data-no-progress
      if (target.closest('[data-no-progress]')) return;
      const link = target.closest('a[href]');

      // Only handle internal Next.js links
      if (link && link.getAttribute('href')?.startsWith('/')) {
        // Don't show for same-page anchors or external links
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http')) {
          setProgress(0);
          setIsVisible(true);

          requestAnimationFrame(() => {
            setProgress(30);
          });
        }
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  if (!isVisible && progress === 0) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed top-0 right-0 left-0 z-9999"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      <div
        className="h-0.75"
        style={{
          backgroundColor: theme.colors.active,
          width: `${progress}%`,
          transition: progress === 0 ? 'none' : 'width 0.2s ease-out',
          boxShadow: `0 0 10px ${theme.colors.active}40`,
        }}
      />
    </div>
  );
}

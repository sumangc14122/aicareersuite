// // src/components/TableOfContents.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { clsx } from "clsx";
// import { List, X, GripVertical } from "lucide-react";

// interface TocItem {
//   id: string;
//   title: string;
//   level: number;
//   icon?: React.ReactNode;
// }

// interface TableOfContentsProps {
//   items: TocItem[];
// }

// export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
//   const [activeId, setActiveId] = useState<string | null>(null);
//   const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
//   // const observerRef = useRef<IntersectionObserver | null>(null);
//   const [isDesktopTocHovered, setIsDesktopTocHovered] = useState(false); // For desktop hover expand

//   // const debounce = <F extends (...args: any[]) => any>(
//   //   func: F,
//   //   waitFor: number,
//   // ) => {
//   //   let timeout: NodeJS.Timeout;
//   //   return (...args: Parameters<F>): Promise<ReturnType<F>> =>
//   //     new Promise((resolve) => {
//   //       if (timeout) clearTimeout(timeout);
//   //       timeout = setTimeout(() => resolve(func(...args)), waitFor);
//   //     });
//   // };

//   // const debounce = <R, F extends (...args: Args) => R, Args extends any[]>(
//   //   func: F,
//   //   waitFor: number,
//   // ) => {
//   //   let timeout: NodeJS.Timeout;
//   //   return (...args: Parameters<F>): Promise<R> =>
//   //     new Promise((resolve) => {
//   //       if (timeout) clearTimeout(timeout);
//   //       timeout = setTimeout(() => resolve(func(...args)), waitFor);
//   //     });
//   // };

//   // const debounce = <R, F extends (...args: Args) => R, Args extends unknown[]>(
//   //   func: F,
//   //   waitFor: number,
//   // ) => {
//   //   let timeout: NodeJS.Timeout;
//   //   return (...args: Parameters<F>): Promise<R> =>
//   //     new Promise((resolve) => {
//   //       if (timeout) clearTimeout(timeout);
//   //       timeout = setTimeout(() => resolve(func(...args)), waitFor);
//   //     });
//   // };

//   const handleScrollOrIntersection = useCallback(() => {
//     if (!items.length) return;

//     let currentActiveId: string | null = null;
//     let smallestTopValue = Infinity;
//     let firstVisibleElementId: string | null = null;

//     items.forEach((item) => {
//       const element = document.getElementById(item.id);
//       if (element) {
//         const rect = element.getBoundingClientRect();

//         // Check if the element is in the viewport at all
//         const elementIsVisible =
//           rect.top < window.innerHeight && rect.bottom >= 0;

//         if (elementIsVisible) {
//           if (firstVisibleElementId === null) {
//             firstVisibleElementId = item.id; // Track the very first visible element
//           }
//           // Consider a section "active" if its top is within the top ~40% of the viewport
//           // and it's the closest to the top within that range.
//           if (
//             rect.top >= -10 &&
//             rect.top < window.innerHeight * 0.4 &&
//             rect.top < smallestTopValue
//           ) {
//             smallestTopValue = rect.top;
//             currentActiveId = item.id;
//           }
//         }
//       }
//     });

//     if (currentActiveId) {
//       setActiveId(currentActiveId);
//     } else if (firstVisibleElementId) {
//       // If no section is "active" by the above criteria, but some are visible,
//       // highlight the topmost visible one.
//       setActiveId(firstVisibleElementId);
//     } else if (window.scrollY === 0 && items.length > 0) {
//       // If at the very top of the page, activate the first item
//       setActiveId(items[0].id);
//     }
//   }, [items]);

//   // const debouncedScrollHandler = useCallback(
//   //   debounce(handleScrollOrIntersection, 50),
//   //   [handleScrollOrIntersection],
//   // );

//   const debouncedScrollHandler = useCallback(() => {
//     const timeoutId = setTimeout(() => {
//       handleScrollOrIntersection();
//     }, 50);

//     return () => clearTimeout(timeoutId);
//   }, [handleScrollOrIntersection]);

//   useEffect(() => {
//     debouncedScrollHandler(); // Initial check
//     window.addEventListener("scroll", debouncedScrollHandler);
//     return () => {
//       window.removeEventListener("scroll", debouncedScrollHandler);
//     };
//   }, [debouncedScrollHandler]);

//   const scrollToId = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     const element = document.getElementById(id);
//     if (element) {
//       const offset = 100; // Fixed offset for sticky header, adjust if needed
//       const elementPosition =
//         element.getBoundingClientRect().top + window.scrollY;
//       const offsetPosition = elementPosition - offset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       });
//       // setActiveId(id); // Let scroll handler update activeId for consistency
//     }
//     if (window.innerWidth < 1024) setIsMobileTocOpen(false);
//   };

//   if (!items || items.length === 0) return null;

//   // const renderTocList = () => (
//   //   <ul className="space-y-1.5">
//   //     {items.map(item => (
//   //       <li key={item.id}>
//   //         <a
//   //           href={`#${item.id}`}
//   //           onClick={(e) => scrollToId(item.id, e)}
//   //           className={clsx(
//   //             "flex items-center py-2 px-3 rounded-lg text-sm font-medium transition-all duration-150 ease-in-out group w-full relative",
//   //             item.level === 2 && "pl-7", // Indentation for level 2
//   //             activeId === item.id
//   //               ? "bg-indigo-100 text-indigo-700 font-semibold shadow-sm"
//   //               : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
//   //           )}
//   //         >
//   //           {activeId === item.id && (
//   //             <span className="absolute left-0 top-1/2 -translate-y-1/2 h-3/4 w-1 bg-indigo-500 rounded-r-full"></span>
//   //           )}
//   //           {item.icon && <span className={clsx("mr-2.5 opacity-70", activeId === item.id ? "text-indigo-600" : "text-gray-500 group-hover:text-indigo-600")}>{React.cloneElement(item.icon as React.ReactElement, { size: 16 })}</span>}
//   //           {item.title}
//   //         </a>
//   //       </li>
//   //     ))}
//   //   </ul>
//   // );

//   const renderTocListItems = (isExpanded: boolean) => (
//     <ul className="space-y-1">
//       {items.map((item) => (
//         <li key={item.id}>
//           <a
//             href={`#${item.id}`}
//             onClick={(e) => scrollToId(item.id, e)}
//             title={item.title} // Show full title on hover even when collapsed
//             className={clsx(
//               "group relative flex w-full items-center overflow-hidden rounded-lg py-2 text-sm font-medium transition-all duration-150 ease-in-out",
//               item.level === 2 &&
//                 (isExpanded ? "pl-10" : "justify-center pl-2"), // Indent level 2 text, center icon if collapsed
//               item.level === 1 && (isExpanded ? "pl-4" : "justify-center pl-2"), // Center L1 icon if collapsed
//               activeId === item.id
//                 ? "bg-indigo-100 font-semibold text-indigo-700"
//                 : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900",
//               !isExpanded && "h-10 w-10 justify-center px-0", // Styles for icon-only state
//             )}
//           >
//             {activeId === item.id && isExpanded && (
//               <span className="absolute left-0 top-1/2 h-3/4 w-1 -translate-y-1/2 rounded-r-full bg-indigo-500"></span>
//             )}
//             {item.icon && (
//               <span
//                 className={clsx(
//                   "flex-shrink-0 transition-all duration-150",
//                   isExpanded ? "mr-2.5 opacity-70" : "mr-0 opacity-80",
//                   activeId === item.id
//                     ? "text-indigo-600"
//                     : "text-gray-500 group-hover:text-indigo-600",
//                 )}
//               >
//                 {React.cloneElement(item.icon as React.ReactElement, {
//                   size: isExpanded ? 18 : 20,
//                 })}
//               </span>
//             )}
//             {isExpanded && <span className="truncate">{item.title}</span>}
//           </a>
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//     <>
//       {/* Mobile ToC Toggle Button */}
//       <button
//         onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
//         className={clsx(
//           "fixed bottom-6 right-6 z-[100] transform rounded-full bg-indigo-600 p-3.5 text-white shadow-xl transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-95 lg:hidden",
//           isMobileTocOpen && "rotate-[225deg] bg-red-500 hover:bg-red-600",
//         )}
//         aria-label={
//           isMobileTocOpen ? "Close Table of Contents" : "Open Table of Contents"
//         }
//         aria-expanded={isMobileTocOpen}
//       >
//         {isMobileTocOpen ? <X size={22} /> : <List size={22} />}
//       </button>

//       {/* Mobile ToC Panel (Overlay) */}
//       {isMobileTocOpen && (
//         <div
//           className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm lg:hidden"
//           onClick={() => setIsMobileTocOpen(false)}
//         />
//       )}
//       <nav
//         aria-label="Table of contents"
//         className={clsx(
//           "fixed bottom-0 left-0 top-0 z-[95] w-72 transform p-6 transition-transform duration-300 ease-in-out lg:hidden",
//           "border-r border-gray-200 bg-white shadow-2xl",
//           "flex flex-col", // For header and scrollable list
//           isMobileTocOpen ? "translate-x-0" : "-translate-x-full",
//         )}
//       >
//         <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
//           <h3 className="text-lg font-semibold text-gray-800">Navigation</h3>
//           <button
//             onClick={() => setIsMobileTocOpen(false)}
//             className="p-1 text-gray-500 hover:text-gray-700"
//           >
//             <X size={20} />
//           </button>
//         </div>
//         {/* <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100 pr-1">
//             {renderTocList()}
//         </div> */}

//         <div className="scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100 flex-grow overflow-y-auto pr-1">
//           {renderTocListItems(true)} {/* Mobile always shows expanded text */}
//         </div>
//       </nav>

//       {/* Desktop ToC Panel (Sticky Sidebar) */}
//       <nav
//         // aria-label="Table of contents"
//         // className={clsx(
//         //     "hidden lg:block fixed z-30",
//         //     "w-60 xl:w-64", // Width of the ToC
//         //     // Position it to the left of the main content (adjust these based on your main content's max-width and margins)
//         //     "top-32", // Distance from top, adjust for sticky header
//         //     "left-4 xl:left-8", // Simple fixed left offset
//         //     "max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-1 rounded-lg border border-gray-200/50 bg-white/70 backdrop-blur-md"

//         // )}
//         aria-label="Desktop Table of contents"
//         onMouseEnter={() => setIsDesktopTocHovered(true)}
//         onMouseLeave={() => setIsDesktopTocHovered(false)}
//         className={clsx(
//           "fixed z-30 hidden lg:block",
//           "left-3 xl:left-5", // Position from left edge
//           "top-1/2 -translate-y-1/2", // Vertically center
//           "transition-all duration-300 ease-in-out", // For width transition
//           isDesktopTocHovered
//             ? "w-64 shadow-2xl xl:w-72"
//             : "w-14 shadow-lg hover:shadow-xl", // Expand width on hover
//           "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[calc(100vh-80px)] overflow-y-auto rounded-xl border border-gray-200/80 bg-white/80 p-2 backdrop-blur-md",
//         )}
//       >
//         {/* <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 pl-2 pt-2">On this page</h3>
//         {renderTocList()}
//       </nav>
//     </> */}
//         {isDesktopTocHovered && (
//           <h3 className="mb-2.5 truncate px-2 pt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
//             On this page
//           </h3>
//         )}
//         {!isDesktopTocHovered && (
//           <div className="mb-2 flex h-6 items-center justify-center">
//             <GripVertical size={20} className="text-gray-400" />
//           </div>
//         )}
//         {renderTocListItems(isDesktopTocHovered)}
//       </nav>
//     </>
//   );
// };

// src/components/TableOfContents.tsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react"; // Added useRef
import { clsx } from "clsx";
import { List, X, GripVertical, LucideProps } from "lucide-react";

interface TocItem {
  id: string;
  title: string;
  level: number;
  icon?: React.ReactElement<LucideProps>;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [isDesktopTocHovered, setIsDesktopTocHovered] = useState(false);

  // Use useRef to store the timeout ID across calls to the debounced handler
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Or for browser environments:
  // const debounceTimeoutRef = useRef<number | null>(null);

  const handleScrollOrIntersection = useCallback(() => {
    // ... (your existing logic for handleScrollOrIntersection)
    if (!items.length) return;

    let currentActiveId: string | null = null;
    let smallestTopValue = Infinity;
    let firstVisibleElementId: string | null = null;

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementIsVisible =
          rect.top < window.innerHeight && rect.bottom >= 0;

        if (elementIsVisible) {
          if (firstVisibleElementId === null) {
            firstVisibleElementId = item.id;
          }
          if (
            rect.top >= -10 &&
            rect.top < window.innerHeight * 0.4 &&
            rect.top < smallestTopValue
          ) {
            smallestTopValue = rect.top;
            currentActiveId = item.id;
          }
        }
      }
    });

    if (currentActiveId) {
      setActiveId(currentActiveId);
    } else if (firstVisibleElementId) {
      setActiveId(firstVisibleElementId);
    } else if (window.scrollY === 0 && items.length > 0) {
      setActiveId(items[0].id);
    }
  }, [items]);

  const debouncedScrollHandler = useCallback(() => {
    // Clear the previous timeout if it exists
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set a new timeout
    debounceTimeoutRef.current = setTimeout(() => {
      handleScrollOrIntersection();
    }, 50); // Adjust debounce delay as needed (e.g., 50-150ms)
  }, [handleScrollOrIntersection]); // Dependency: handleScrollOrIntersection

  useEffect(() => {
    const initialCheckTimeout = setTimeout(handleScrollOrIntersection, 100);

    window.addEventListener("scroll", debouncedScrollHandler);
    window.addEventListener("resize", debouncedScrollHandler);

    return () => {
      clearTimeout(initialCheckTimeout);
      window.removeEventListener("scroll", debouncedScrollHandler);
      window.removeEventListener("resize", debouncedScrollHandler);
      // Clear any pending debounce timeout when the component unmounts
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [debouncedScrollHandler, handleScrollOrIntersection]); // Add handleScrollOrIntersection if it might change and you want to re-evaluate initial check

  // ... (rest of your component: scrollToId, renderTocListItems, JSX)
  const scrollToId = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    if (window.innerWidth < 1024) setIsMobileTocOpen(false);
  };

  if (!items || items.length === 0) return null;

  const renderTocListItems = (isExpanded: boolean) => (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={(e) => scrollToId(item.id, e)}
            title={item.title}
            className={clsx(
              "group relative flex w-full items-center overflow-hidden rounded-lg py-2 text-sm font-medium transition-all duration-150 ease-in-out",
              item.level === 2 &&
                (isExpanded ? "pl-10" : "justify-center pl-2"),
              item.level === 1 && (isExpanded ? "pl-4" : "justify-center pl-2"),
              activeId === item.id
                ? "bg-indigo-100 font-semibold text-indigo-700"
                : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900",
              !isExpanded && "h-10 w-10 justify-center px-0",
            )}
          >
            {activeId === item.id && isExpanded && (
              <span className="absolute left-0 top-1/2 h-3/4 w-1 -translate-y-1/2 rounded-r-full bg-indigo-500"></span>
            )}
            {item.icon && (
              <span
                className={clsx(
                  "flex-shrink-0 transition-all duration-150",
                  isExpanded ? "mr-2.5 opacity-70" : "mr-0 opacity-80",
                  activeId === item.id
                    ? "text-indigo-600"
                    : "text-gray-500 group-hover:text-indigo-600",
                )}
              >
                {React.cloneElement(item.icon, {
                  size: isExpanded ? 18 : 20,
                })}
              </span>
            )}
            {isExpanded && <span className="truncate">{item.title}</span>}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile ToC Toggle Button */}
      <button
        onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
        className={clsx(
          "fixed bottom-6 right-6 z-[100] transform rounded-full bg-indigo-600 p-3.5 text-white shadow-xl transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-95 lg:hidden",
          isMobileTocOpen && "rotate-[225deg] bg-red-500 hover:bg-red-600",
        )}
        aria-label={
          isMobileTocOpen ? "Close Table of Contents" : "Open Table of Contents"
        }
        aria-expanded={isMobileTocOpen}
      >
        {isMobileTocOpen ? <X size={22} /> : <List size={22} />}
      </button>

      {/* Mobile ToC Panel (Overlay) */}
      {isMobileTocOpen && (
        <div
          className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileTocOpen(false)}
        />
      )}
      <nav
        aria-label="Table of contents"
        className={clsx(
          "fixed bottom-0 left-0 top-0 z-[95] w-72 transform p-6 transition-transform duration-300 ease-in-out lg:hidden",
          "border-r border-gray-200 bg-white shadow-2xl",
          "flex flex-col",
          isMobileTocOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
          <h3 className="text-lg font-semibold text-gray-800">Navigation</h3>
          <button
            onClick={() => setIsMobileTocOpen(false)}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <div className="scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100 flex-grow overflow-y-auto pr-1">
          {renderTocListItems(true)}
        </div>
      </nav>

      {/* Desktop ToC Panel (Sticky Sidebar) */}
      <nav
        aria-label="Desktop Table of contents"
        onMouseEnter={() => setIsDesktopTocHovered(true)}
        onMouseLeave={() => setIsDesktopTocHovered(false)}
        className={clsx(
          "fixed z-30 hidden lg:block",
          "left-3 xl:left-5",
          "top-1/2 -translate-y-1/2",
          "transition-all duration-300 ease-in-out",
          isDesktopTocHovered
            ? "w-64 shadow-2xl xl:w-72"
            : "w-14 shadow-lg hover:shadow-xl",
          "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[calc(100vh-80px)] overflow-y-auto rounded-xl border border-gray-200/80 bg-white/80 p-2 backdrop-blur-md",
        )}
      >
        {isDesktopTocHovered && (
          <h3 className="mb-2.5 truncate px-2 pt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
            On this page
          </h3>
        )}
        {!isDesktopTocHovered && (
          <div className="mb-2 flex h-6 items-center justify-center">
            <GripVertical size={20} className="text-gray-400" />
          </div>
        )}
        {renderTocListItems(isDesktopTocHovered)}
      </nav>
    </>
  );
};

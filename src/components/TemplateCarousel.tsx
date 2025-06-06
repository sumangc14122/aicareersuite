// // components/templatecarousel.tsx

// import React, { useRef, useMemo } from "react";
// import { TemplateID } from "./GenericTemplate";
// import { TEMPLATES, TemplateStyle } from "./Templates";

// interface TemplateCarouselProps {
//   selected: TemplateID;
//   onSelect: (id: TemplateID) => void;
// }

// export default function TemplateCarousel({ selected, onSelect }: TemplateCarouselProps) {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scrollLeft = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
//     }
//   };

//   // Ensure unique templates based on id
//   const uniqueTemplates = useMemo(() => {
//     const seen = new Set();
//     return TEMPLATES.filter((t) => {
//       const duplicate = seen.has(t.id);
//       seen.add(t.id);
//       return !duplicate;
//     });
//   }, []);

//   return (
//     <div className="relative bg-gray-100 p-4 rounded-lg border border-gray-200 mb-6">
//       <div className="flex items-center">
//         <button
//           onClick={scrollLeft}
//           className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//           aria-label="Scroll left"
//         >
//           <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <div
//           ref={scrollRef}
//           className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide snap-x snap-mandatory"
//           style={{ scrollBehavior: "smooth" }}
//         >
//           {uniqueTemplates.map((t) => (
//             <div
//               key={t.id}
//               onClick={() => onSelect(t.id)}
//               className={`relative flex-shrink-0 w-36 h-52 border border-gray-200 rounded-lg cursor-pointer overflow-hidden shadow-md transition-all duration-300 snap-center ${
//                 selected === t.id
//                   ? "ring-2 ring-blue-500 scale-105"
//                   : "hover:scale-105 hover:shadow-lg opacity-90 hover:opacity-100"
//               }`}
//             >
//               <img
//                 src={`/thumbnails/${t.id}.png`}
//                 alt={t.name}
//                 className="object-cover w-full h-full"
//                 onError={(e) => {
//                   e.currentTarget.src = "/thumbnails/placeholder.png";
//                 }}
//               />
//               <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-sm font-medium text-center py-2 z-10 overflow-hidden max-h-8">
//                 {t.name}
//               </div>
//             </div>
//           ))}
//         </div>
//         <button
//           onClick={scrollRight}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//           aria-label="Scroll right"
//         >
//           <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }

// components/templatecarousel.tsx

import React, { useRef, useMemo } from "react";
import { TemplateID } from "./GenericTemplate"; //
import { TEMPLATES } from "./Templates"; //
import Image from "next/image";

interface TemplateCarouselProps {
  selected: TemplateID;
  onSelect: (id: TemplateID) => void;
}

export default function TemplateCarousel({
  selected,
  onSelect,
}: TemplateCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.75; // Scroll 75% of visible width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Ensure unique templates based on id
  const uniqueTemplates = useMemo(() => {
    const seen = new Set();
    return TEMPLATES.filter((t) => {
      //
      const duplicate = seen.has(t.id); //
      seen.add(t.id); //
      return !duplicate; //
    });
  }, []);

  return (
    <div className="relative mb-8 rounded-xl border border-gray-200/80 bg-gradient-to-r from-gray-50 to-gray-100 p-4 shadow-lg sm:p-6">
      <div className="relative flex items-center justify-center">
        {" "}
        {/* Centering buttons if space allows or keeping them edge-aligned */}
        <button
          onClick={() => scroll("left")}
          className="group absolute left-0 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-white p-3 shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:-left-4"
          aria-label="Scroll left"
        >
          <svg
            className="h-6 w-6 text-gray-700 transition-colors duration-300 group-hover:text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div
          ref={scrollRef}
          className="scrollbar-hide flex snap-x snap-mandatory space-x-4 overflow-x-auto py-4 sm:space-x-6" //
          style={{ scrollBehavior: "smooth" }}
        >
          {uniqueTemplates.map(
            (
              t, //
            ) => (
              <div
                key={t.id} //
                onClick={() => onSelect(t.id)} //
                className={`group relative h-56 w-40 flex-shrink-0 transform cursor-pointer snap-center overflow-hidden rounded-lg border-2 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl sm:h-60 sm:w-44 ${
                  selected === t.id //
                    ? "scale-105 border-blue-500 shadow-xl ring-2 ring-blue-500 ring-offset-2" //
                    : "border-gray-300 opacity-80 hover:scale-105 hover:border-blue-400 hover:opacity-100" //
                }`}
              >
                <Image
                  src={`/thumbnails/${t.id}.png`} //
                  alt={t.name} //
                  width={800}
                  height={600}
                  className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-110" //
                  onError={(e) => {
                    //
                    e.currentTarget.src = "/thumbnails/placeholder.png"; //
                    e.currentTarget.classList.add("object-center"); // Center placeholder if aspect ratio is different
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 z-10 bg-black bg-opacity-70 py-2.5 text-center text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-sm">
                  {" "}
                  {/* */}
                  {t.name} {/* */}
                </div>
                {selected === t.id && ( //
                  <div className="absolute right-2 top-2 z-10 rounded-full bg-blue-500 p-1.5 text-white shadow-md">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ),
          )}
        </div>
        <button
          onClick={() => scroll("right")}
          className="group absolute right-0 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-white p-3 shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:-right-4"
          aria-label="Scroll right"
        >
          <svg
            className="h-6 w-6 text-gray-700 transition-colors duration-300 group-hover:text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// // "use client";

// // export default function ShareProfileButton() {
// //   const handleShare = async () => {
// //     const url = window.location.href;
// //     try {
// //       if (navigator.share) {
// //         await navigator.share({ title: "My Profile", url });
// //       } else {
// //         await navigator.clipboard.writeText(url);
// //         alert("Profile URL copied to clipboard!");
// //       }
// //     } catch (err) {
// //       console.error("Share failed", err);
// //     }
// //   };

// //   return (
// //     <button
// //       onClick={handleShare}
// //       className="rounded border px-4 py-2 hover:bg-gray-100"
// //     >
// //       Share Profile
// //     </button>
// //   );
// // }

// // src/components/ShareProfileButton.tsx
// import React from "react";

// export interface ShareProfileButtonProps {
//   profileId: string;
//   profileName: string;
// }

// export default function ShareProfileButton({
//   profileId,
//   profileName,
// }: ShareProfileButtonProps) {
//   // ... your existing logic, e.g.:
//   const shareUrl = `${window.location.origin}/profile/${profileId}`;

//   return (
//     <button
//       onClick={() => {
//         navigator.clipboard.writeText(
//           `Check out ${profileName}'s profile: ${shareUrl}`
//         );
//         alert("Profile link copied!");
//       }}
//       className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
//     >
//       Share Profile
//     </button>
//   );
// }

// src/components/ShareProfileButton.tsx
"use client";

import React from "react";

export interface ShareProfileButtonProps {
  /** If provided, we’ll share the profile URL */
  profileId?: string;
  /** If provided, we’ll include the profile owner’s name in the share title */
  profileName?: string;
}

export default function ShareProfileButton({
  profileId,
  profileName,
}: ShareProfileButtonProps) {
  const handleShare = async () => {
    // if a profileId was passed, build that URL, otherwise share current page
    const url = profileId
      ? `${window.location.origin}/profile/${profileId}`
      : window.location.href;

    const title = profileName ? `${profileName}'s Profile` : document.title;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed", err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="rounded border px-4 py-2 hover:bg-gray-100"
    >
      Share Profile
    </button>
  );
}

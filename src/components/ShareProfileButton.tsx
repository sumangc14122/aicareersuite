"use client";

export default function ShareProfileButton() {
  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: "My Profile", url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Profile URL copied to clipboard!");
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

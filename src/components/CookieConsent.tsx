"use client";

import { useEffect, useState } from "react";

const COOKIE_KEY = "chamakk_cookie_consent";

export default function CookieConsent({
  onAccept,
}: {
  onAccept: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    } else if (consent === "accepted") {
      onAccept();
    }
  }, [onAccept]);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    onAccept();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[95%] max-w-3xl -translate-x-1/2 rounded-xl bg-black px-6 py-4 text-white shadow-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed text-white/90">
          We use cookies to improve your experience, analyze website traffic,
          and support our marketing efforts. By continuing to browse or clicking
          “Accept”, you consent to the use of cookies.
        </p>

        <button
          onClick={handleAccept}
          className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition hover:bg-white/90"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

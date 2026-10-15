"use client";

import { useEffect, useRef } from "react";

// GuestPlan reservation widget — exact embed from the client's brief.
// Loads the script (floating widget) and exposes openBookingWidget()/openGiftCardWidget().
declare global {
  interface Window {
    _gstpln?: Record<string, unknown> & {
      openBookingWidget?: () => void;
      openGiftCardWidget?: () => void;
    };
  }
}

export function loadGuestPlan() {
  if (typeof window === "undefined") return;
  if (document.getElementById("gstpln-script")) return;
  window._gstpln = {};
  const s = document.createElement("script");
  s.id = "gstpln-script";
  s.async = true;
  s.src = "https://cdn.guestplan.com/widget.js";
  document.body.appendChild(s);
  window._gstpln.accessKey = "f548c8502651997c5c83d8061da0abd108dc7958";
  window._gstpln.locale = "cs";
  window._gstpln.color = "#CFC28F"; // champagne dle briefu
}

export function openBooking() {
  window._gstpln?.openBookingWidget?.();
}
export function openGiftCard() {
  window._gstpln?.openGiftCardWidget?.();
}

// Mount once to load the widget script (floating widget appears bottom-right).
export default function GuestPlan() {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    loadGuestPlan();
  }, []);
  return null;
}

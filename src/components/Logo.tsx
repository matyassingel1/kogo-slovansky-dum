import Img from "@/components/Img";

// Horizontal lockup built from the REAL brand artwork: K mark + KOGO wordmark.
// gold variant for light backgrounds, white for dark/photo backgrounds.
// `condensed` slightly shrinks it (used once the header sits on the paper plane).
export default function Logo({
  variant = "gold",
  condensed = false,
  className = "",
}: {
  variant?: "gold" | "white";
  condensed?: boolean;
  className?: string;
}) {
  const mark =
    variant === "white"
      ? "/images/brand/logo-mark-white.png"
      : "/images/brand/logo-mark-gold.png";
  const word =
    variant === "white"
      ? "/images/brand/logo-wordmark-white.png"
      : "/images/brand/logo-wordmark-gold.png";
  // On photo backgrounds the white lockup needs a soft shadow to stay legible.
  const shadow =
    variant === "white"
      ? { filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.55))" }
      : undefined;
  return (
    <span
      className={`inline-flex items-center gap-3 md:gap-3.5 transition-all duration-500 ${className}`}
      style={shadow}
    >
      <Img
        src={mark}
        alt="KOGO Slovanský dům"
        width={303}
        height={303}
        priority
        className={`${condensed ? "h-9 w-9" : "h-10 w-10 md:h-12 md:w-12"} shrink-0 transition-all duration-500`}
      />
      <Img
        src={word}
        alt=""
        aria-hidden="true"
        width={639}
        height={379}
        className={`${condensed ? "h-6" : "h-6 md:h-7"} w-auto transition-all duration-500`}
      />
    </span>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/lib/lang";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Popup from "@/components/Popup";
import ScrollToTop from "@/components/ScrollToTop";
import GuestPlan from "@/components/GuestPlan";
import CookieConsent from "@/components/CookieConsent";

const gotham = localFont({
  src: [
    { path: "../fonts/Gotham-Book.otf", weight: "400", style: "normal" },
    { path: "../fonts/Gotham-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/Gotham-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--ff-gotham",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

// Kontejner Google Tag Manageru od klientky (zadání 15. 9. 2026).
const GTM_ID = "GTM-MQJ7VTGG";

export const metadata: Metadata = {
  title: "KOGO Slovanský dům — Středomořská restaurace v centru Prahy",
  description:
    "Ryby, mořské plody a italské řemeslo v srdci Prahy. Vlajková restaurace skupiny KOGO ve Slovanském domě. Rezervujte si stůl.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" className={gotham.variable}>
      <head>
        {/* Bez souhlasu návštěvníka neměříme. Musí běžet dřív než Tag Manager. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent','default',{
  ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied',
  analytics_storage:'denied', functionality_storage:'granted',
  security_storage:'granted', wait_for_update:500
});
try{
  if(localStorage.getItem('kogo-consent')==='all'){
    gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
  }
}catch(e){}`,
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LanguageProvider>
          <SmoothScroll>
            <Banner />
            <Header />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
            <Popup />
            <CookieConsent />
            {/* Rezervační widget GuestPlan — jeho plovoucí tlačítko vpravo dole
                doprovází návštěvníka po celém webu, ne jen na stránce Rezervace. */}
            <GuestPlan />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}

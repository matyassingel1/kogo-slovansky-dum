"use client";

import { useLang } from "@/lib/lang";
import Reveal from "@/components/Reveal";
import OrderForm from "@/components/OrderForm";

export default function Page() {
  const { lang } = useLang();
  const L = (cs: string, en: string) => (lang === "cs" ? cs : en);
  return (
    <section className="section pt-28 md:pt-40">
      <div className="wrap max-w-3xl">
        <Reveal className="mb-12">
          <span className="eyebrow">{L("Objednávka akce", "Event order")}</span>
          <h1 className="display-sm mt-4 mb-5">{L("Objednávkový formulář", "Order form")}</h1>
          <span className="rule-gold mb-7" />
          <p className="lead">
            {L(
              "Potvrďte detaily vaší akce, vyberte menu a způsob platby. Po odeslání vám zašleme potvrzení a pokyny k záloze.",
              "Confirm your event details, choose the menu and payment method. After submitting we send confirmation and deposit instructions."
            )}
          </p>
        </Reveal>
        <OrderForm />
      </div>
    </section>
  );
}

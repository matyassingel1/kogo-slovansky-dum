"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Check, Info } from "lucide-react";
import { useLang, pick } from "@/lib/lang";
import { eventMenus } from "@/data/events";
import { sendForm } from "@/lib/sendForm";

type Pay = "prevod" | "karta" | "misto";

export default function OrderForm() {
  const { lang } = useLang();
  const L = (cs: string, en: string) => (lang === "cs" ? cs : en);

  const [menuType, setMenuType] = useState<"3" | "4">("3");
  const [selected, setSelected] = useState<Record<number, string[]>>({});
  const [base, setBase] = useState({ date: "", time: "", guests: "", name: "", company: "", phone: "", email: "", note: "" });
  const [zaloha, setZaloha] = useState<Pay>("prevod");
  const [doplatek, setDoplatek] = useState<Pay>("prevod");
  const [wantInvoice, setWantInvoice] = useState(false);
  const [sameAsCompany, setSameAsCompany] = useState(false);
  const [invoice, setInvoice] = useState({ name: "", ico: "", dic: "", address: "", email: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const menu = useMemo(() => eventMenus.find((m) => m.courses === Number(menuType))!, [menuType]);

  const toggleDish = (ci: number, dish: string) => {
    setSelected((prev) => {
      const cur = prev[ci] || [];
      if (cur.includes(dish)) return { ...prev, [ci]: cur.filter((x) => x !== dish) };
      if (cur.length >= 4) return prev; // max 4 per course
      return { ...prev, [ci]: [...cur, dish] };
    });
  };

  const payLabel = (p: Pay) =>
    p === "prevod" ? L("Bankovní převod", "Bank transfer") : p === "karta" ? L("Online platba kartou", "Online card") : L("Platba na místě", "On site");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!base.name || !base.email || !base.date) {
      setError(L("Vyplňte prosím jméno, e-mail a termín.", "Please fill in name, e-mail and date."));
      return;
    }
    setError(null);
    setSubmitting(true);
    const menuSummary = menu.sections
      .map((c, i) => `${pick(c.title, lang)}: ${(selected[i] || []).join(" · ") || "—"}`)
      .join("\n");
    await sendForm("Nová objednávka akce — KOGO", {
      Termín: `${base.date} ${base.time}`,
      "Počet hostů": base.guests,
      Jméno: base.name,
      Společnost: base.company,
      Telefon: base.phone,
      "E-mail": base.email,
      Poznámka: base.note,
      Menu: `${menuType}chodové`,
      "Výběr menu": menuSummary,
      "Záloha — způsob": payLabel(zaloha),
      "Doplatek — způsob": payLabel(doplatek),
      Faktura: wantInvoice ? "ano" : "ne",
      "Fakturační jméno": wantInvoice ? invoice.name : "",
      IČO: wantInvoice ? invoice.ico : "",
      DIČ: wantInvoice ? invoice.dic : "",
      "Fakturační adresa": wantInvoice ? invoice.address : "",
      "E-mail pro fakturu": wantInvoice ? invoice.email : "",
    });
    setSubmitting(false);
    setSent(true);
  };

  const field =
    "w-full bg-transparent border-b border-[color:var(--color-line)] py-3 text-[color:var(--color-ink)] placeholder:text-[color:var(--color-muted)] focus:border-[color:var(--color-gold)] outline-none transition-colors";
  const label = "caps text-[0.66rem] text-[color:var(--color-muted)] mb-1 block";
  const legend = "eyebrow";

  if (sent) {
    return (
      <div className="text-center py-14">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[color:var(--color-gold-tint)] text-[color:var(--color-gold)] mb-6">
          <Check size={26} strokeWidth={1.8} />
        </div>
        <h3 className="display-sm mb-3">{L("Objednávka odeslána!", "Order submitted!")}</h3>
        <p className="lead max-w-lg mx-auto">
          {L("Ozveme se vám s potvrzením a pokyny k platbě zálohy.", "We will get back to you with confirmation and deposit payment instructions.")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-14">
      {/* Základ akce */}
      <fieldset>
        <legend className={legend}>{L("Základ akce", "Event basics")}</legend>
        <span className="rule-gold mt-4 mb-8 block" />
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <label className={label}>{L("Termín *", "Date *")}</label>
            <input type="date" className={field} value={base.date} onChange={(e) => setBase({ ...base, date: e.target.value })} />
          </div>
          <div>
            <label className={label}>{L("Čas", "Time")}</label>
            <input type="time" className={field} value={base.time} onChange={(e) => setBase({ ...base, time: e.target.value })} />
          </div>
          <div>
            <label className={label}>{L("Počet hostů", "Guests")}</label>
            <input type="number" min={1} className={field} value={base.guests} onChange={(e) => setBase({ ...base, guests: e.target.value })} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 mt-6">
          <div>
            <label className={label}>{L("Jméno a příjmení *", "Full name *")}</label>
            <input className={field} value={base.name} onChange={(e) => setBase({ ...base, name: e.target.value })} />
          </div>
          <div>
            <label className={label}>{L("Společnost", "Company")}</label>
            <input className={field} value={base.company} onChange={(e) => setBase({ ...base, company: e.target.value })} />
          </div>
          <div>
            <label className={label}>{L("Telefon", "Phone")}</label>
            <input className={field} value={base.phone} onChange={(e) => setBase({ ...base, phone: e.target.value })} />
          </div>
          <div>
            <label className={label}>{L("E-mail *", "E-mail *")}</label>
            <input type="email" className={field} value={base.email} onChange={(e) => setBase({ ...base, email: e.target.value })} />
          </div>
        </div>
        <div className="mt-6">
          <label className={label}>{L("Poznámka", "Note")}</label>
          <textarea rows={2} className={field} value={base.note} onChange={(e) => setBase({ ...base, note: e.target.value })} />
        </div>
      </fieldset>

      {/* Menu */}
      <fieldset>
        <legend className={legend}>{L("Menu", "Menu")}</legend>
        <span className="rule-gold mt-4 mb-6 block" />
        <div className="flex gap-3 mb-8">
          {(["3", "4"] as const).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => { setMenuType(t); setSelected({}); }}
              className={`btn ${menuType === t ? "btn-gold" : "btn-ghost"}`}
            >
              {t}{L("chodové menu", "-course menu")}
            </button>
          ))}
        </div>
        <p className="text-sm text-[color:var(--color-ink-soft)] mb-8">
          {L("Z každého chodu vyberte max. 4 jídla (stačí i méně). Z výběru pak připravíme menu, hosté si zvolí na místě.", "Pick up to 4 dishes per course (fewer is fine). We prepare the menu from your choice; guests select on site.")}
        </p>
        <div className="space-y-9">
          {menu.sections.map((course, ci) => {
            const count = (selected[ci] || []).length;
            return (
              <div key={ci}>
                <div className="flex items-baseline justify-between gap-3 mb-4">
                  <h3 className="title-md">{pick(course.title, lang)}</h3>
                  <span className="caps text-[0.66rem] text-[color:var(--color-muted)]">{count}/4</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  {course.dishes.map((d, di) => {
                    const name = pick({ cs: d.cs, en: d.en }, lang);
                    const on = (selected[ci] || []).includes(name);
                    const disabled = !on && count >= 4;
                    return (
                      <label
                        key={di}
                        className={`flex items-start gap-2.5 text-sm leading-snug cursor-pointer ${disabled ? "opacity-40" : ""}`}
                      >
                        <input
                          type="checkbox"
                          className="mt-1 accent-[color:var(--color-gold)]"
                          checked={on}
                          disabled={disabled}
                          onChange={() => toggleDish(ci, name)}
                        />
                        <span className="text-[color:var(--color-ink-soft)]">{name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Platba */}
      <fieldset>
        <legend className={legend}>{L("Platba", "Payment")}</legend>
        <span className="rule-gold mt-4 mb-6 block" />
        <div className="grid sm:grid-cols-2 gap-8">
          {([[L("Záloha", "Deposit"), zaloha, setZaloha], [L("Doplatek za akci", "Balance"), doplatek, setDoplatek]] as const).map(
            ([title, val, set], k) => (
              <div key={k} className="border border-[color:var(--color-line)] p-6">
                <p className="caps text-[0.72rem] text-[color:var(--color-gold)] mb-4">{title}</p>
                <div className="space-y-3">
                  {(["prevod", "karta", "misto"] as Pay[]).map((p) => (
                    <label key={p} className="flex items-center gap-3 text-sm text-[color:var(--color-ink-soft)] cursor-pointer">
                      <input type="radio" className="accent-[color:var(--color-gold)]" checked={val === p} onChange={() => set(p)} />
                      {payLabel(p)}
                    </label>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
        <p className="flex items-start gap-2 text-[0.78rem] text-[color:var(--color-muted)] mt-4">
          <Info size={15} className="mt-0.5 shrink-0" />
          {L("Platební údaje vám pošleme spolu s potvrzením objednávky — u převodu číslo účtu a variabilní symbol, u karty zabezpečený platební odkaz.", "We send the payment details together with your order confirmation — bank account and reference for a transfer, or a secure payment link for card.")}
        </p>
      </fieldset>

      {/* Fakturace */}
      <fieldset>
        <legend className={legend}>{L("Fakturační údaje", "Invoicing")}</legend>
        <span className="rule-gold mt-4 mb-6 block" />
        <p className="text-sm text-[color:var(--color-ink-soft)] mb-4">{L("Budete požadovat vystavení faktury na firmu?", "Do you require an invoice to a company?")}</p>
        <div className="flex gap-6 mb-2">
          {[[true, L("Ano", "Yes")], [false, L("Ne", "No")]].map(([v, lbl]) => (
            <label key={String(v)} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" className="accent-[color:var(--color-gold)]" checked={wantInvoice === v} onChange={() => setWantInvoice(v as boolean)} />
              {lbl as string}
            </label>
          ))}
        </div>

        {wantInvoice && (
          <div className="mt-6 space-y-6">
            <label className="flex items-center gap-3 text-sm text-[color:var(--color-ink-soft)] cursor-pointer">
              <input
                type="checkbox"
                className="accent-[color:var(--color-gold)]"
                checked={sameAsCompany}
                onChange={(e) => {
                  setSameAsCompany(e.target.checked);
                  if (e.target.checked) setInvoice({ ...invoice, name: base.company });
                }}
              />
              {L("Fakturační údaje jsou stejné jako údaje společnosti", "Invoicing details are the same as company details")}
            </label>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={label}>{L("Fakturační jméno / firma *", "Invoice name / company *")}</label>
                <input className={field} value={invoice.name} onChange={(e) => setInvoice({ ...invoice, name: e.target.value })} />
              </div>
              <div>
                <label className={label}>{L("IČO *", "Company ID *")}</label>
                <input className={field} value={invoice.ico} onChange={(e) => setInvoice({ ...invoice, ico: e.target.value })} />
              </div>
              <div>
                <label className={label}>{L("DIČ", "VAT ID")}</label>
                <input className={field} value={invoice.dic} onChange={(e) => setInvoice({ ...invoice, dic: e.target.value })} />
              </div>
              <div>
                <label className={label}>{L("E-mail pro zaslání faktury *", "E-mail for invoice *")}</label>
                <input type="email" className={field} value={invoice.email} onChange={(e) => setInvoice({ ...invoice, email: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className={label}>{L("Fakturační adresa *", "Invoice address *")}</label>
                <input className={field} value={invoice.address} onChange={(e) => setInvoice({ ...invoice, address: e.target.value })} />
              </div>
            </div>
          </div>
        )}
      </fieldset>

      {error && <p className="text-[0.85rem] text-[color:var(--color-gold-deep)]">{error}</p>}
      <button type="submit" disabled={submitting} className="btn btn-gold">
        {submitting ? L("Odesílám…", "Sending…") : L("Odeslat objednávku", "Submit order")}
      </button>
    </form>
  );
}

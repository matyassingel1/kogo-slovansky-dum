"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";
import { useLang } from "@/lib/lang";
import { sendForm } from "@/lib/sendForm";

const schema = z.object({
  date: z.string().optional(),
  timeFrom: z.string().optional(),
  timeTo: z.string().optional(),
  guests: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  note: z.string().optional(),
  gdpr: z.literal(true),
  marketing: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

export default function EnquiryForm() {
  const { lang } = useLang();
  const L = (cs: string, en: string) => (lang === "cs" ? cs : en);
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (d: FormData) => {
    await sendForm("Nová poptávka akce — KOGO", {
      "Datum akce": d.date,
      "Čas začátku": d.timeFrom,
      "Konec / délka": d.timeTo,
      "Počet osob": d.guests,
      Jméno: d.name,
      "E-mail": d.email,
      Telefon: d.phone,
      Společnost: d.company,
      Poznámka: d.note,
      "Marketingový souhlas": d.marketing ? "ano" : "ne",
    });
    setSent(true);
  };

  const field =
    "w-full bg-transparent border-b border-[color:var(--color-line)] py-3 text-[color:var(--color-ink)] placeholder:text-[color:var(--color-muted)] focus:border-[color:var(--color-gold)] outline-none transition-colors";
  const label = "caps text-[0.66rem] text-[color:var(--color-muted)] mb-1 block";
  const err = "text-[0.72rem] text-[color:var(--color-gold-deep)] mt-1";

  if (sent) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[color:var(--color-gold-tint)] text-[color:var(--color-gold)] mb-6">
          <Check size={26} strokeWidth={1.8} />
        </div>
        <h3 className="display-sm mb-3">{L("Děkujeme za poptávku!", "Thank you for your enquiry!")}</h3>
        <p className="lead max-w-lg mx-auto">
          {L("Ozveme se vám co nejdříve s návrhem řešení vaší akce.", "We will get back to you shortly with a proposal for your event.")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid sm:grid-cols-3 gap-6">
        <div>
          <label className={label}>{L("Datum akce", "Event date")}</label>
          <input type="date" className={field} {...register("date")} />
        </div>
        <div>
          <label className={label}>{L("Čas začátku", "Start time")}</label>
          <input type="time" className={field} {...register("timeFrom")} />
        </div>
        <div>
          <label className={label}>{L("Konec / délka", "End / duration")}</label>
          <input className={field} placeholder={L("např. 22:00 / 4 h", "e.g. 22:00 / 4 h")} {...register("timeTo")} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={label}>{L("Počet osob", "Guests")}</label>
          <input type="number" min={1} className={field} placeholder="20" {...register("guests")} />
        </div>
        <div>
          <label className={label}>{L("Společnost", "Company")}</label>
          <input className={field} {...register("company")} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={label}>{L("Jméno a příjmení *", "Full name *")}</label>
          <input className={field} {...register("name")} />
          {errors.name && <p className={err}>{L("Zadejte prosím jméno", "Please enter your name")}</p>}
        </div>
        <div>
          <label className={label}>{L("E-mail *", "E-mail *")}</label>
          <input type="email" className={field} {...register("email")} />
          {errors.email && <p className={err}>{L("Neplatný e-mail", "Invalid e-mail")}</p>}
        </div>
      </div>

      <div>
        <label className={label}>{L("Telefon", "Phone")}</label>
        <input className={field} placeholder="+420 …" {...register("phone")} />
      </div>

      <div>
        <label className={label}>{L("Poznámka", "Note")}</label>
        <textarea rows={3} className={field} placeholder={L("Typ akce, přání, dotazy…", "Event type, wishes, questions…")} {...register("note")} />
      </div>

      <div className="space-y-3 pt-2">
        <label className="flex items-start gap-3 text-sm text-[color:var(--color-ink-soft)] cursor-pointer">
          <input type="checkbox" className="mt-1 accent-[color:var(--color-gold)]" {...register("gdpr")} />
          <span>{L("Souhlasím se zpracováním osobních údajů pro vyřízení poptávky. *", "I agree to the processing of my personal data to handle this enquiry. *")}</span>
        </label>
        {errors.gdpr && <p className={err}>{L("Bez souhlasu nelze poptávku odeslat.", "Consent is required to submit.")}</p>}
        <label className="flex items-start gap-3 text-sm text-[color:var(--color-ink-soft)] cursor-pointer">
          <input type="checkbox" className="mt-1 accent-[color:var(--color-gold)]" {...register("marketing")} />
          <span>{L("Chci dostávat novinky a nabídky (nepovinné).", "I'd like to receive news and offers (optional).")}</span>
        </label>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn btn-gold w-full sm:w-auto">
        {isSubmitting ? L("Odesílám…", "Sending…") : L("Odeslat poptávku", "Send enquiry")}
      </button>
    </form>
  );
}

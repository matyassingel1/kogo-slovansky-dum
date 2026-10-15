"use client";
import LegalPage from "@/components/LegalPage";
import { legalPages } from "@/data/pages";
export default function Page() {
  return <LegalPage page={legalPages["obchodni-podminky"]} />;
}

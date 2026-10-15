// Lightweight form delivery for the static site (no backend).
// Uses Web3Forms if a public access key is configured; otherwise runs in demo mode
// (validates + shows success) so the UI is fully reviewable before go-live.
// TODO(client): create a Web3Forms access key tied to KOGO's e-mail and set
// NEXT_PUBLIC_WEB3FORMS_KEY, so real notifications reach the restaurant + guest.

export type SendResult = { ok: boolean; demo: boolean };

export async function sendForm(
  subject: string,
  data: Record<string, unknown>
): Promise<SendResult> {
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!key) {
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true, demo: true };
  }
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject,
        from_name: "KOGO Slovanský dům — web",
        ...data,
      }),
    });
    const json = await res.json();
    return { ok: !!json.success, demo: false };
  } catch {
    return { ok: false, demo: false };
  }
}

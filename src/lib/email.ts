export const CONTACT_EMAIL = "king.op.nexus@gmail.com";

export function gmailComposeUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams({ view: "cm", fs: "1", to: CONTACT_EMAIL });
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

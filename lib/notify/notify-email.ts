/** The open-innovation inbox that receives every "Notify Me" submission. */
export const NOTIFY_RECIPIENT = "openinnovation@ntt-startupchallenge.com";

export interface NotifySubscriptionEmail {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}

/**
 * The address passed our validation regex, which forbids whitespace and a
 * second `@` but permits angle brackets. Escape before interpolating so a
 * crafted address cannot inject markup into the internal inbox.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildNotifySubscriptionEmail(opts: {
  email: string;
  submittedAt: Date;
}): NotifySubscriptionEmail {
  const { email, submittedAt } = opts;
  const timestamp = submittedAt.toISOString();
  const safeEmail = escapeHtml(email);

  const text = [
    "New subscriber for the next Open Innovation Program.",
    "",
    `Email:        ${email}`,
    `Submitted at: ${timestamp}`,
    "",
    "Reply to this message to reach the subscriber directly.",
  ].join("\n");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#111827;font-size:14px;line-height:1.6;">
  <p style="margin:0 0 16px;font-size:16px;font-weight:bold;color:#154284;">New "Notify Me" subscriber</p>
  <table style="border-collapse:collapse;">
    <tr>
      <td style="padding:5px 16px 5px 0;color:#6b7280;font-size:13px;">Email</td>
      <td style="padding:5px 0;font-size:13px;font-weight:bold;">${safeEmail}</td>
    </tr>
    <tr>
      <td style="padding:5px 16px 5px 0;color:#6b7280;font-size:13px;">Submitted at</td>
      <td style="padding:5px 0;font-size:13px;">${timestamp}</td>
    </tr>
  </table>
  <p style="margin:16px 0 0;color:#374151;font-size:13px;">Reply to this message to reach the subscriber directly.</p>
</div>`;

  return {
    to: NOTIFY_RECIPIENT,
    replyTo: email,
    subject: `New "Notify Me" subscriber — ${email}`,
    text,
    html,
  };
}

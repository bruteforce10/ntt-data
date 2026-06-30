import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

function buildSubmitPitchUrl(email: string, baseUrl: string) {
  return `${baseUrl}/deck-submission?email=${encodeURIComponent(email)}`;
}

export function buildRegistrationEmail(opts: {
  name: string;
  startupName: string;
  problemStatement: string;
  email: string;
  baseUrl: string;
}) {
  const { name, startupName, problemStatement, email, baseUrl } = opts;
  const submitUrl = buildSubmitPitchUrl(email, baseUrl);

  const statements = problemStatement
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const challengeRows = statements
    .map(
      (s) =>
        `<tr><td style="padding:5px 0;color:#6b7280;font-size:13px;width:160px;">Business Challenge</td><td style="padding:5px 0;font-size:13px;font-weight:bold;color:#111827;">${s}</td></tr>`,
    )
    .join("");

  const multiDeckNote =
    statements.length > 1
      ? `<p style="margin:16px 0;color:#374151;font-size:14px;line-height:1.6;"><strong>Note:</strong> If you have registered for more than one business challenge, please submit a separate pitch deck for each specific challenge.</p>`
      : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#154284;padding:32px 40px;">
            <p style="margin:0;color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:0.5px;">
              Open Innovation Program
            </p>
            <p style="margin:6px 0 0;color:#93c5fd;font-size:13px;">Registration Confirmed</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 16px;color:#111827;font-size:15px;">Dear <strong>${name}</strong>,</p>
            <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">
              Thank you for registering <strong>${startupName}</strong> for the Open Innovation Program! We are excited to have you join this program and look forward to reviewing your innovative solution.
            </p>
            <p style="margin:0 0 12px;color:#111827;font-size:14px;font-weight:bold;">You have registered for the following problem statement(s):</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
              ${challengeRows}
            </table>
            <p style="margin:0 0 24px;color:#374151;font-size:14px;line-height:1.6;">
              Selected startups will get the opportunity to pitch directly to enterprise clients and explore pilot projects during our Open Innovation event in Singapore (Aug 31 – Sep 2, 2026).
            </p>
            <!-- Next Step Section -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7ff;border-radius:8px;margin:0 0 24px;">
              <tr><td style="padding:24px;">
                <p style="margin:0 0 8px;color:#154284;font-size:15px;font-weight:bold;">Your Next Step: Submit Your Pitch Deck</p>
                <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">
                  To move forward, please upload a pitch deck of maximum 8 slides (excluding the cover page). Your deck should cover:
                </p>
                <ol style="margin:0;padding-left:20px;color:#374151;font-size:13px;line-height:1.8;">
                  <li>Executive Summary</li>
                  <li>Startup Overview &amp; Existing Customers</li>
                  <li>Your Understanding of the Business Challenge</li>
                  <li>Proposed Solution &amp; Technology Explanation</li>
                  <li>Business Model &amp; Market Opportunity</li>
                  <li>Competitive Advantage &amp; Team Introduction</li>
                </ol>
              </td></tr>
            </table>
            <!-- Submission Guidelines -->
            <p style="margin:0 0 10px;color:#111827;font-size:14px;font-weight:bold;">Submission Guidelines:</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px;">
              <tr>
                <td style="padding:5px 0;color:#6b7280;font-size:13px;width:160px;">Format</td>
                <td style="padding:5px 0;font-size:13px;color:#111827;">PDF only (Max size: 8 MB)</td>
              </tr>
              <tr>
                <td style="padding:5px 0;color:#6b7280;font-size:13px;">Language</td>
                <td style="padding:5px 0;font-size:13px;color:#111827;">English</td>
              </tr>
              <tr>
                <td style="padding:5px 0;color:#6b7280;font-size:13px;">File Name Format</td>
                <td style="padding:5px 0;font-size:13px;color:#111827;"><strong>StartupName_ChallengeName.pdf</strong></td>
              </tr>
              <tr>
                <td style="padding:5px 0;color:#6b7280;font-size:13px;">Submission Deadline</td>
                <td style="padding:5px 0;font-size:13px;font-weight:bold;color:#e02020;">July 31, 2026</td>
              </tr>
            </table>
            ${multiDeckNote}
            <!-- CTA Button -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
              <tr><td align="center">
                <a href="${submitUrl}" style="display:inline-block;background:#3176E4;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;padding:14px 36px;border-radius:8px;letter-spacing:0.5px;">
                  Submit Pitch Deck
                </a>
              </td></tr>
            </table>
            <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">
              We look forward to reviewing your submission.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0 0 4px;color:#6b7280;font-size:12px;">Best regards,</p>
            <p style="margin:0;font-size:12px;font-weight:bold;color:#154284;">The Open Innovation Program Team</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const challengeLines = statements
    .map((s) => `Business Challenge: ${s}`)
    .join("\n");

  const text = `Dear ${name},

Thank you for registering ${startupName} for the Open Innovation Program! We are excited to have you join this program and look forward to reviewing your innovative solution.

You have registered for the following problem statement(s):
${challengeLines}

Selected startups will get the opportunity to pitch directly to enterprise clients and explore pilot projects during our Open Innovation event in Singapore (Aug 31 – Sep 2, 2026).

Your Next Step: Submit Your Pitch Deck

To move forward, please upload a pitch deck of maximum 8 slides (excluding the cover page). Your deck should cover:
1. Executive Summary
2. Startup Overview & Existing Customers
3. Your Understanding of the Business Challenge
4. Proposed Solution & Technology Explanation
5. Business Model & Market Opportunity
6. Competitive Advantage & Team Introduction

Submission Guidelines:
- Format: PDF only (Max size: 8 MB)
- Language: English
- File Name Format: StartupName_ChallengeName.pdf
- Submission Deadline: July 31, 2026
${statements.length > 1 ? "\nNote: If you have registered for more than one business challenge, please submit a separate pitch deck for each specific challenge.\n" : ""}
Submit your pitch deck here: ${submitUrl}

We look forward to reviewing your submission.

Best regards,
The Open Innovation Program Team`;

  return { html, text };
}

const DECK_TIMELINE = {
  reviewPeriod: "July, 2026",
  notificationDate: "July, 2026",
  eventDate: "August 31, 2026 - Sep 2, 2026",
  contactEmail: "openinnovation@ntt-startupchallenge.com",
};

export function buildDeckSubmissionEmail(opts: {
  name: string;
  submittedAt?: Date;
}) {
  const { name, submittedAt = new Date() } = opts;
  const submissionDate = submittedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#154284;padding:32px 40px;">
            <p style="margin:0;color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:0.5px;">
              Open Innovation Program
            </p>
            <p style="margin:6px 0 0;color:#93c5fd;font-size:13px;">Pitch Deck Submission Received</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 16px;color:#111827;font-size:15px;">Dear <strong>${name}</strong>,</p>
            <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">
              Thank you for successfully submitting your pitch deck for Open Innovation Program.
            </p>
            <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">
              We appreciate the time and effort you have put into preparing your submission. Our team will carefully review all applications according to the evaluation criteria.
            </p>
            <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">
              To help you stay informed about the next steps and key milestones of the Open Innovation Program selection process, we have included the timeline below for your reference.
            </p>
            <!-- Timeline -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7ff;border-radius:8px;margin:24px 0;">
              <tr><td style="padding:24px;">
                <p style="margin:0 0 12px;color:#154284;font-size:14px;font-weight:bold;">Timeline</p>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;color:#374151;">
                  <tr>
                    <td style="padding:6px 0;color:#6b7280;">Submission Received</td>
                    <td style="padding:6px 0;text-align:right;font-weight:bold;color:#111827;">${submissionDate}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#6b7280;">Review Period</td>
                    <td style="padding:6px 0;text-align:right;font-weight:bold;color:#111827;">${DECK_TIMELINE.reviewPeriod}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#6b7280;">Notification of Results</td>
                    <td style="padding:6px 0;text-align:right;font-weight:bold;color:#111827;">${DECK_TIMELINE.notificationDate}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#6b7280;">Open Innovation Program Event</td>
                    <td style="padding:6px 0;text-align:right;font-weight:bold;color:#111827;">${DECK_TIMELINE.eventDate}</td>
                  </tr>
                </table>
              </td></tr>
            </table>
            <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">
              Should any additional information be required, our team will contact you directly.
            </p>
            <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">
              If you have any questions, please feel free to contact us at
              <a href="mailto:${DECK_TIMELINE.contactEmail}" style="color:#0070C0;text-decoration:underline;">${DECK_TIMELINE.contactEmail}</a>.
            </p>
            <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">
              Thank you once again for your participation. 
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#6b7280;font-size:12px;">Best regards,<br><strong style="color:#154284;">Open Innovation Program Team</strong></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `Dear ${name},

Thank you for successfully submitting your pitch deck for Open Innovation Program.

We appreciate the time and effort you have put into preparing your submission. Our team will carefully review all applications according to the evaluation criteria.

To help you stay informed about the next steps and key milestones of the Open Innovation Program selection process, we have included the timeline below for your reference.

Timeline
- Submission Received: ${submissionDate}
- Review Period: ${DECK_TIMELINE.reviewPeriod}
- Notification of Results: ${DECK_TIMELINE.notificationDate}
- Open Innovation Program Event: ${DECK_TIMELINE.eventDate}

Should any additional information be required, our team will contact you directly.

If you have any questions, please feel free to contact us at ${DECK_TIMELINE.contactEmail}.

Thank you once again for your participation. 

Best regards,
Open Innovation Program Team`;

  return { html, text };
}

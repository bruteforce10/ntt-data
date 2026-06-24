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

  const statementList = statements
    .map((s) => `<li style="margin-bottom:4px;">${s}</li>`)
    .join("");

  const multiDeckNote =
    statements.length > 1
      ? `<p style="margin:16px 0;color:#374151;">Please be advised that if you select more than one problem statement, a separate pitch deck must be submitted for each problem statement selected.</p>`
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
            <p style="margin:6px 0 0;color:#93c5fd;font-size:13px;">Registration Confirmation</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 16px;color:#111827;font-size:15px;">Dear <strong>${name}</strong>, Representative of <strong>${startupName}</strong>,</p>
            <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">
              Thank you for successfully registering for the selected Problem Statement at Open Innovation Program. We are excited to have you join this initiative and look forward to reviewing your innovative solution.
            </p>
            <p style="margin:0 0 8px;color:#111827;font-size:14px;font-weight:bold;">You have registered for the following problem statement(s):</p>
            <ul style="margin:0 0 16px;padding-left:20px;color:#374151;font-size:14px;line-height:1.7;">
              ${statementList}
            </ul>
            <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">
              This challenge focuses on addressing key business and societal issues through innovative, technology-driven solutions. We are looking for scalable ideas with clear value propositions and strong potential for collaboration.
            </p>
            <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">
              Open Innovation Program is designed to connect startups with industry leaders through curated engagement sessions, business matching opportunities, and cultural exchange activities. Selected startups will have the opportunity to present their solutions directly to corporate partners and explore potential pilot projects or long-term partnerships.
            </p>
            <!-- Pitch Deck Section -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7ff;border-radius:8px;margin:24px 0;">
              <tr><td style="padding:24px;">
                <p style="margin:0 0 12px;color:#154284;font-size:14px;font-weight:bold;">Pitch Deck Requirements (maximum 8 slides)</p>
                <ul style="margin:0;padding-left:20px;color:#374151;font-size:13px;line-height:1.8;">
                  <li>Startup Overview</li>
                  <li>Problem</li>
                  <li>Proposed Solution</li>
                  <li>Product or Technology Explanation</li>
                  <li>Business Model</li>
                  <li>Market Opportunity</li>
                  <li>Traction or Existing Customers</li>
                  <li>Competitive Advantage</li>
                  <li>Team Introduction</li>
                </ul>
              </td></tr>
            </table>
            <p style="margin:0 0 8px;color:#111827;font-size:14px;font-weight:bold;">Submission Details:</p>
            <ul style="margin:0 0 16px;padding-left:20px;color:#374151;font-size:14px;line-height:1.8;">
              <li>File format: <strong>PDF</strong></li>
              <li>Maximum size: <strong>8 MB</strong></li>
              <li>Language: <strong>English</strong></li>
              <li>File name format: <strong>StartupName_ChallengeName.pdf</strong></li>
            </ul>
            <p style="margin:0 0 8px;color:#e02020;font-size:14px;font-weight:bold;">Submission deadline: June 31th, 2026</p>
            ${multiDeckNote}
            <!-- CTA Button -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
              <tr><td align="center">
                <a href="${submitUrl}" style="display:inline-block;background:#3176E4;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;padding:14px 36px;border-radius:8px;letter-spacing:0.5px;">
                  Submit Pitch Deck
                </a>
              </td></tr>
            </table>
            <p style="margin:28px 0 0;color:#374151;font-size:14px;line-height:1.6;">
              We look forward to receiving your submission and discovering impactful innovations from your team.
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

  const text = `Dear ${name}, Representative of ${startupName},

Thank you for successfully registering for the selected Problem Statement at Open Innovation Program.

Problem Statement(s):
${statements.map((s) => `- ${s}`).join("\n")}

You are required to submit a Pitch Deck (max 8 slides) covering: Startup Overview, Problem, Proposed Solution, Product/Technology, Business Model, Market Opportunity, Traction, Competitive Advantage, Team Introduction.

Submission Details:
- File format: PDF
- Maximum size: 150 MB
- Language: English
- File name format: StartupName_ChallengeName.pdf
- Submission deadline: June 31th, 2026

Submit your pitch deck here: ${submitUrl}

Best regards,
Open Innovation Program Team`;

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

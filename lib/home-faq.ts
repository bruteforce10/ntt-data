// Home page FAQ content — a curated, shorter set shown on the landing page.
// Intentionally separate from SITE_CONTENT.faq, which powers the full /faq page.
export const HOME_FAQ = {
  title: "Frequently Asked Questions",
  subtitle:
    "Quick answers to the most common questions about eligibility, applying, and what to expect from the program.",
  groups: [
    {
      title: "General Information",
      items: [
        {
          question: "Who can apply?",
          answer:
            "The program is open to startups with innovative solutions that solve one or more of our challenge statements. We welcome companies from any industry, technology domain, or growth stage.",
        },
        {
          question:
            "Will travel and accommodation be provided for selected startups?",
          answer:
            "Travel and accommodation costs are to be covered by the participating startups. We will, however, provide all necessary logistical details and recommendations to help you plan your trip to Singapore.",
        },
        {
          question: "Can startups from any country apply?",
          answer:
            "Yes. The Program welcomes applications from startups across the region and internationally.",
        },
      ],
    },
    {
      title: "Application & Submission",
      items: [
        {
          question: "How do I apply?",
          answer:
            "Startups can apply by visiting the Open Innovation Program webpage, reviewing the listed challenge statements, and registering their interest online. After registration, eligible startups will receive instructions on how to submit their pitch deck or solution details.",
        },
        {
          question: "What is the application process?",
          answer: "The process is expected to be as follows:",
          steps: [
            "Review the challenge statements on the program webpage",
            "Register your interest through the registration form",
            "Receive a link by email to submit your pitch deck",
            "Submit your solution pitch deck for the relevant challenge",
            "Applications are reviewed by NTT DATA and relevant stakeholders",
            "Shortlisted startups may be invited for further discussions or pitch sessions",
            "Final selected startups will be informed directly",
          ],
        },
        {
          question: "Can I update my application after submission?",
          answer:
            "Updates may be allowed before the application deadline. Please contact the Program team if changes are required.",
        },
      ],
    },
    {
      title: "Selection Process",
      items: [
        {
          question: "How will startups be evaluated?",
          answer:
            "Applications will be reviewed based on how well the startup's solution matches the challenge statement. Other factors may include:",
          bullets: [
            "Relevance to the business problem",
            "Innovation and uniqueness of the solution",
            "Market readiness and maturity of the startup",
            "Ability to deliver or support a pilot/POC",
            "Strategic fit with NTT DATA and/or client needs",
          ],
        },
      ],
    },
    {
      title: "Program Participation",
      items: [
        {
          question: "Is physical attendance required?",
          answer:
            "Yes. Selected startups are expected to participate in person during the Program in Singapore.",
        },
      ],
    },
  ],
} as const;

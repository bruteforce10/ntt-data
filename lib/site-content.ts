export const SITE_CONTENT = {
  about: {
    background: {
      src: "/Assets Picture/About NTT.png",
      alt: "NTT DATA headquarters cityscape",
    },
    title: "About the NTT DATA Open Innovation Program",
    description:
      "Are you a startup ready to scale your solution with real enterprise impact? The NTT DATA Open Innovation Program offers you the chance to collaborate directly with NTT DATA and its clients during a 2-day, hands-on innovation sprint in Singapore, from August 31 to September 2, 2026.  You’ll work side by side with these client teams and NTT DATA experts to tackle real-world challenges, shape a Proof of Concept, and present your solution in the final pitch battle. The winning team will receive a USD $30,000 reward in Time & Material services to bring their PoC to life.",
    cta: { label: "Register", href: "/startup-registration" },
  },
  benefit: {
    title: "Why Participate?",
    items: [
      {
        number: "BENEFIT 1",
        title: "Global Market Access",
        descriptionHtml:
          "Collaborate directly with <strong>NTT DATA and our enterprise customers</strong> to expand your reach into new markets.",
        image: {
          src: "/Assets Picture/benefit/1.png",
          alt: "Global Market Access",
        },
      },
      {
        number: "BENEFIT 2",
        title: "Expert Mentorship",
        descriptionHtml:
          "Guidance from <strong>NTT DATA innovation leaders</strong>, offering strategic advice and insights to help accelerate scaling.",
        image: {
          src: "/Assets Picture/benefit/2.png",
          alt: "Expert Mentorship",
        },
      },
      {
        number: "BENEFIT 3",
        title: "Commercial Collaboration",
        descriptionHtml:
          "The opportunity to build <strong>integrated offerings</strong> and bring solutions to market together.",
        image: {
          src: "/Assets Picture/benefit/3.png",
          alt: "Commercial Collaboration",
        },
      },
      {
        number: "BENEFIT 4",
        title: "POC Support",
        descriptionHtml:
          "The winning team will receive a USD $30,000 reward in Time &amp; Material services to bring their PoC to life.",
        image: {
          src: "/Assets Picture/benefit/4.png",
          alt: "POC Support",
        },
      },
    ],
  },
  programOverview: {
    title: "Program Overview",
    items: [
      {
        title: "WORKSHOPS",
        description:
          "Co-creation sessions between customers and startups with support from NTT DATA's.",
        image: {
          src: "/Assets Picture/Program overview.png",
          alt: "Workshops",
        },
      },
      // {
      //   title: "CULTURAL ACTIVITY",
      //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      //   image: {
      //     src: "/Assets Picture/Program overview (2).png",
      //     alt: "Cultural Activity",
      //   },
      // },
      {
        title: "MATCHING SESSIONS",
        description:
          "Matching sessions between shortlisted startups and NTT DATA customers.",
        image: {
          src: "/Assets Picture/Program overview (3).png",
          alt: "Matching Sessions",
        },
      },
      {
        title: "PITCH BATTLE",
        description: "Customer/startup teams present their solutions.",
        image: {
          src: "/Assets Picture/Program overview (4).png",
          alt: "Pitch Battle",
        },
      },
    ],
  },

  roadmap: {
    title: "Program Roadmap and Timeline",
    phases: [
      {
        label: "July",
        steps: [
          {
            caption: "Tell us about your startup.",
            icon: {
              src: "/time-line/1.png",
              alt: "Tell us about your startup",
            },
          },
          {
            caption: "Upload your pitch deck.",
            icon: {
              src: "/time-line/2.png",
              alt: "Upload your pitch deck",
            },
          },
        ],
      },
      {
        label: "July - August",
        steps: [
          {
            caption: "Our panel of experts will review your solution.",
            icon: {
              src: "/time-line/3.png",
              alt: "Our panel of experts reviewing solutions",
            },
          },
        ],
      },
      {
        label: "September",
        steps: [
          {
            caption:
              "If selected, get invited to pitch your concept in Singapore.",
            icon: {
              src: "/time-line/4.png",
              alt: "Pitch your concept in Singapore",
            },
          },
        ],
      },
    ],
  },

  navbar: {
    logo: {
      href: "/",
      src: "/Logo/logo-navbar.png",
      alt: "NTT DATA",
    },
    links: [
      { label: "HOME", href: "/" },
      { label: "WHY PARTICIPATE?", href: "/#benefits" },
      { label: "PROBLEM STATEMENTS", href: "/#problem-statements" },
      { label: "TIMELINE", href: "/#roadmap" },
      { label: "FAQ'S", href: "/#faq" },
    ],
    actions: [
      {
        label: "REGISTER",
        href: "/startup-registration",
        variant: "primary",
        comingSoon: false,
      },
    ],
  },
  footer: {
    legal: [
      {
        label: "Privacy Statement",
        href: "https://services.global.ntt/en-us/legal/privacy-statement",
        external: true,
      },
      {
        label: "Terms of Use",
        href: "https://services.global.ntt/en-us/legal/website-terms-of-use",
        external: true,
      },
      {
        label: "Contact Us",
        href: "mailto:openinnovation@ntt-startupchallenge.com",
        external: false,
      },
    ],
  },
  hero: {
    background: {
      src: "/Assets Picture/Hero page 2.webp",
      alt: "Tokyo cityscape at night",
    },
    ornament: {
      src: "/Ornament/Ornament.png",
      alt: "",
    },
    title: ["NTT DATA OPEN", "INNOVATION PROGRAM"],
    description:
      "An initiative brought by NTT DATA. We are looking at innovative startup solutions that address business challenges and solve societal issues.",
    action: { label: "REGISTER", href: "/startup-registration" },
  },
  countdown: {
    title: "Registration Closes",
    targetDate: "2026-07-31T00:00:00",
    video: {
      src: "/Video Countdown.webm",
      type: "video/webm",
    },
  },
  problemOverview: {
    title: "Explore the Challenges",
    ornament: {
      src: "/Ornament/Ornament (2).png",
      alt: "",
    },
    items: [
      {
        logo: {
          src: "/problem-overview/logo-alliance.png",
          alt: "Alliance Bank",
        },
        logoLabel: "A Leading Digital Bank in Southeast Asia",
        title:
          "Building an Enterprise AI Knowledge Platform to Unlock Structured Insights from Fragmented Data",
        description:
          "Enterprise data and knowledge stay fragmented across SharePoint, OneDrive, email, and legacy systems. Analytics remain manual and narrow, with uneven governance and weak semantic structure — making accurate, up-to-date information hard to access.",
        detail: {
          context: [
            "As the bank accelerates its transformation into an AI-powered enterprise, it faces a core challenge: enterprise data and knowledge remain fragmented across systems, repositories, and communication channels, including SharePoint, OneDrive, email, and legacy platforms.",
            "Although foundational data assets exist, analytics and reporting remain largely manual and designed for narrow use cases. Inconsistent structure, limited semantic organisation, and uneven governance make it difficult for employees to access accurate, up-to-date information efficiently.",
            "Employees often rely on multiple stakeholders to validate information and reach decisions, as expertise and reasoning models are not consolidated. This slows execution, creates knowledge gaps, and limits consistent decision-making across the organisation.",
            "To address this, the bank aims to build a centralised AI-enabled knowledge platform underpinned by domain-to-data mapping. This would structure domain knowledge and enterprise data into reusable, AI-ready data products that support intelligent applications, agents, and future digital capabilities.",
          ],
          description: {
            develop:
              "An enterprise-grade AI knowledge platform that uses domain-to-data mapping to consolidate fragmented sources into a structured, accessible, and continuously updated knowledge base.",
            helpsUsers: [
              "Access relevant policies, procedures, and organisational knowledge through natural language queries",
              "Reduce manual searches and repeated stakeholder consultations",
              "Make faster, more consistent decisions using a reliable single source of truth",
              "Improve productivity by minimising time spent searching and validating information",
              "Enable conversational, AI-driven querying across business domains with role-specific, context-aware guidance",
            ],
            solutionMust: [
              "Map business concepts to underlying data through a domain-to-data semantic layer",
              "Ingest and integrate data from enterprise sources such as SharePoint, OneDrive, email, and core systems",
              "Support reusable, enterprise-wide knowledge layers that can power AI agents and digital interfaces",
              "Keep the knowledge base continuously updated, including from email communications where required",
              "Enable role-based access controls and strict data governance to ensure sensitive information is protected",
              "Operate as an enterprise-wide platform capable of scaling across multiple business units",
            ],
          },
        },
        href: "#problem-statements",
      },
      {
        logo: {
          src: "/problem-overview/logo-alliance.png",
          alt: "Alliance Bank",
        },
        logoLabel: "A Leading Digital Bank in Southeast Asia",
        title:
          "Enabling Enterprise-Grade Digital Twins for Intelligent Workforce Augmentation",
        description:
          "Much organisational knowledge and decision logic stays tacit, fragmented, and tied to individuals, creating execution bottlenecks. Generic AI tools lack context on working styles, decision criteria, and organisational nuance — limiting scalable productivity.",
        detail: {
          context: [
            "Financial institutions are moving toward AI-enabled operating models to improve productivity, decision-making, and consistency. However, much organisational knowledge and decision logic remain tacit, fragmented, and dependent on individuals, creating execution bottlenecks and hindering employee productivity.",
            "Existing analytics and reporting processes are often manual, fragmented, and designed for narrow use cases. This limits scalable AI adoption and the bank's ability to deliver conversational, context-aware business insights.",
            "Existing AI tools often generate generic outputs that lack contextual awareness of individual working styles, decision criteria, and organisational nuances.",
            "The bank seeks to explore digital twin capabilities, AI-driven representations of employees that learn behaviours, preferences, and decision patterns. These digital twins would act as intelligent co-workers, enabling scalable productivity gains while meeting enterprise governance, security, and compliance requirements.",
          ],
          description: {
            develop:
              "Enterprise-grade digital twin solutions that learn, replicate, and augment employee behaviours, decision patterns, and communication styles within a secure banking environment.",
            helpsUsers: [
              "Automate routine cognitive tasks, including document review, approvals, and content creation",
              "Receive next-best-action recommendations aligned with personal decision criteria and working style",
              "Accelerate workflows such as project approvals, UAT reviews, and financial analysis with greater confidence and consistency",
              "Produce outputs (e.g. emails, reports) in the user's own tone and style",
            ],
            solutionMust: [
              "Learn from structured and unstructured enterprise sources such as emails, documents, and past decisions while preserving data privacy",
              "Replicate user-specific behaviours such as approval logic, prioritisation criteria, and communication tone",
              "Provide confidence levels and rationale for outputs and recommendations",
              "Integrate seamlessly within enterprise systems and workflows",
              "Ensure strict access control, governance, and compliance for regulated financial environments",
              "Operate within a private, secure AI environment (non-public data exposure)",
              'Scale across multiple roles and functions, supporting different "twin" configurations per user',
            ],
          },
        },
        href: "#problem-statements",
      },
      // {
      //   logo: {
      //     src: "/Logo/GlobalLogo_NTTDATA_White_RGB.png",
      //     alt: "NTT DATA",
      //   },
      //   title: "Sustainable Digital Infrastructure",
      //   description:
      //     "How can we build sustainable digital infrastructure that aligns with net-zero goals while maintaining business continuity?",
      //   fullDescription:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel nulla consequat, vestibulum magna nec, ultrices lacus. Quisque pellentesque at elit vitae ullamcorper. Quisque nisi urna, lobortis sit amet efficitur at, faucibus non augue.\n\nAenean at metus ex. Mauris eu lacus elementum, sagittis orci ac, iaculis neque. Curabitur tincidunt facilisis dictum. Nam consequat felis nec posuere pulvinar. Ut fermentum purus ut felis sodales, vitae tincidunt est tempor. In hac habitasse platea dictumst.\n\nPraesent a velit in est consequat porta. Nulla pellentesque imperdiet aliquet. Maecenas pretium, enim non bibendum tincidunt, lacus sem ornare enim.",
      //   href: "#problem-statements",
      // },
      // {
      //   logo: {
      //     src: "/Logo/GlobalLogo_NTTDATA_White_RGB.png",
      //     alt: "NTT Holding",
      //   },
      //   title: "Bridging the Digital Divide",
      //   description:
      //     "How might we develop innovative solutions that bridge the digital divide and enable inclusive access to technology across communities?",
      //   fullDescription:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel nulla consequat, vestibulum magna nec, ultrices lacus. Quisque pellentesque at elit vitae ullamcorper. Nullam imperdiet tempus iaculis. Fusce quam nisl, pretium eget volutpat ut, imperdiet non ipsum.\n\nAenean at metus ex. Mauris eu lacus elementum, sagittis orci ac, iaculis neque. Curabitur tincidunt facilisis dictum.\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin eget mi quis massa venenatis gravida sed a massa.",
      //   href: "#problem-statements",
      // },
      // {
      //   logo: {
      //     src: "/Logo/GlobalLogo_NTTDATA_White_RGB.png",
      //     alt: "NTT Holding",
      //   },
      //   title: "Enterprise Workflow Automation",
      //   description:
      //     "How can we use data and automation to transform legacy enterprise workflows into agile, insight-driven operations?",
      //   fullDescription:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel nulla consequat, vestibulum magna nec, ultrices lacus. Quisque pellentesque at elit vitae ullamcorper. Quisque nisi urna, lobortis sit amet efficitur at, faucibus non augue. Nullam imperdiet tempus iaculis.\n\nAenean at metus ex. Mauris eu lacus elementum, sagittis orci ac, iaculis neque. Curabitur tincidunt facilisis dictum. Nam consequat felis nec posuere pulvinar. Ut fermentum purus ut felis sodales.\n\nPraesent a velit in est consequat porta. Nulla pellentesque imperdiet aliquet. Maecenas pretium, enim non bibendum tincidunt.",
      //   href: "#problem-statements",
      // },
      // {
      //   logo: {
      //     src: "/Logo/GlobalLogo_NTTDATA_White_RGB.png",
      //     alt: "Open Innovation Program",
      //   },
      //   title: "Next-Gen Cybersecurity Solutions",
      //   description:
      //     "How can startups co-create scalable solutions with NTT partners to address emerging cybersecurity threats in a hyper-connected world?",
      //   fullDescription:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel nulla consequat, vestibulum magna nec, ultrices lacus. Quisque pellentesque at elit vitae ullamcorper. Nullam imperdiet tempus iaculis. Fusce quam nisl, pretium eget volutpat ut.\n\nAenean at metus ex. Mauris eu lacus elementum, sagittis orci ac, iaculis neque. Curabitur tincidunt facilisis dictum. Nam consequat felis nec posuere pulvinar.\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin eget mi quis massa venenatis gravida sed a massa. Aliquam malesuada nunc eget ante laoreet.",
      //   href: "#problem-statements",
      // },
      // {
      //   logo: {
      //     src: "/Logo/GlobalLogo_NTTDATA_White_RGB.png",
      //     alt: "NTT DATA",
      //   },
      //   title: "Digital Health Platform Innovation",
      //   description:
      //     "How might we reimagine healthcare delivery through digital health platforms that improve patient outcomes and reduce system costs?",
      //   fullDescription:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel nulla consequat, vestibulum magna nec, ultrices lacus. Quisque pellentesque at elit vitae ullamcorper. Quisque nisi urna, lobortis sit amet efficitur at, faucibus non augue.\n\nAenean at metus ex. Mauris eu lacus elementum, sagittis orci ac, iaculis neque. Curabitur tincidunt facilisis dictum. Nam consequat felis nec posuere pulvinar. Ut fermentum purus ut felis sodales, vitae tincidunt est tempor.\n\nPraesent a velit in est consequat porta. Nulla pellentesque imperdiet aliquet. Maecenas pretium, enim non bibendum tincidunt, lacus sem ornare enim, a sagittis nisl ipsum vel enim.",
      //   href: "#problem-statements",
      // },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle:
      "Find quick answers to the most common questions about eligibility, the program timeline, and what to expect during the innovation sprint.",
    groups: [
      {
        title: "General Information",
        items: [
          {
            question: "What is the NTT DATA Open Innovation Program 2026?",
            answer:
              "The NTT DATA Open Innovation Program connects startups with real business challenges from NTT DATA and its clients. Selected startups get the opportunity to present their solutions, work directly with business stakeholders, and explore the potential for a Proof of Concept (PoC) and future commercial engagement.",
          },
          {
            question: "Who can apply?",
            answer:
              "The program is open to startups with innovative solutions that address one or more of our challenge statements. We welcome companies from any industry, technology domain, or growth stage.",
          },
          {
            question: "Is there a participation fee?",
            answer:
              "No. There is no fee to apply for or participate in the program.",
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
              "Yes. The program welcomes applications from startups across the region and internationally.",
          },
        ],
      },
      {
        title: "Application & Submission",
        items: [
          {
            question: "How do I apply?",
            answer:
              "Visit the Open Innovation Program webpage, review the listed challenge statements, and register your interest online. After registration, eligible startups will receive instructions on how to submit their pitch deck or solution details.",
          },
          {
            question: "What is the application period?",
            answer: "Applications are open until July 31, 2026.",
          },
          {
            question: "What is the application process?",
            answer: "The process is expected to be as follows:",
            steps: [
              "Review the challenge statements on the program webpage.",
              "Register your interest through the registration form.",
              "Receive a link by email to submit your pitch deck.",
              "Submit your solution pitch deck for the relevant challenge.",
              "Applications are reviewed by NTT DATA and relevant stakeholders.",
              "Shortlisted startups may be invited for further discussions or pitch sessions.",
              "Final selected startups will be informed directly.",
            ],
          },
          {
            question: "Is there a pitch deck requirement?",
            answer:
              "Yes. A pitch deck is required as part of the application process.",
          },
          {
            question:
              "What is the maximum file size for pitch deck submission?",
            answer: "The maximum file size for uploaded pitch decks is 8 MB.",
          },
          {
            question:
              "What file formats are accepted for pitch deck submissions?",
            answer:
              "Accepted file formats will be specified on the submission portal.",
          },
          {
            question: "Can I update my application after submission?",
            answer:
              "Updates may be allowed before the application deadline. Please contact the Program team if changes are required.",
          },
          {
            question:
              "Will I receive a confirmation after submitting my application?",
            answer:
              "Yes. Applicants will receive a confirmation email after successfully submitting their application.",
          },
          {
            question: "Can I submit my application after the deadline?",
            answer:
              "Late submissions may not be considered. Applicants are encouraged to submit before the deadline.",
          },
        ],
      },
      {
        title: "Selection Process",
        items: [
          {
            question: "How will startups be evaluated?",
            answer:
              "Applications are reviewed based on how well the startup's solution matches the challenge statement. Other factors may include:",
            bullets: [
              "Relevance to the business problem.",
              "Innovation and uniqueness of the solution.",
              "Market readiness and maturity of the startup.",
              "Ability to deliver or support a pilot/PoC.",
              "Strategic fit with NTT DATA and/or client needs.",
            ],
          },
          {
            question: "Who will evaluate the applications?",
            answer:
              "Applications will be reviewed by representatives from NTT DATA and relevant industry experts.",
          },
          {
            question: "When will selected startups be notified?",
            answer:
              "Shortlisted startups will be contacted directly following the evaluation process.",
          },
          {
            question: "How many startups will be selected?",
            answer:
              "The number of selected startups may vary depending on the challenge and evaluation results.",
          },
          {
            question: "Will all applicants receive feedback?",
            answer:
              "Due to the volume of applications, individual feedback may not be provided to all applicants.",
          },
        ],
      },
      {
        title: "Program Participation",
        items: [
          {
            question: "What happens after being selected?",
            answer:
              "Selected startups will be invited to participate in NTT DATA Open Innovation Week in Singapore from August 31 to September 2, 2026.",
          },
          {
            question: "Is physical attendance required?",
            answer:
              "Yes. Selected startups are expected to participate in person during the program in Singapore.",
          },
          {
            question: "What activities will take place during the Program?",
            answer:
              "Participants will collaborate with NTT DATA experts and enterprise stakeholders, refine their solutions, develop Proofs of Concept (PoCs), and present their ideas during the final sessions.",
          },
          {
            question: "How long is the Program?",
            answer:
              "The on-site program runs over three days during NTT DATA Open Innovation Week.",
          },
          {
            question:
              "Can more than one representative attend from each startup?",
            answer:
              "Yes. Multiple representatives may attend, subject to participation guidelines and venue capacity.",
          },
          {
            question: "Is attendance required for all Program activities?",
            answer:
              "Selected startups are expected to participate in the key program activities and sessions.",
          },
        ],
      },
      {
        title: "Benefits & Opportunities",
        items: [
          {
            question: "What are the benefits of joining the Program?",
            answer:
              "Participants gain exposure to enterprise partners, access to industry experts, collaboration opportunities, and the chance to develop solutions for real business challenges.",
          },
          {
            question: "Is there any funding available?",
            answer:
              "The winning team may receive up to USD 30,000 in Time & Material services to support the development of their Proof of Concept (PoC).",
          },
          {
            question:
              "Can startups continue discussions with enterprise partners after the program?",
            answer:
              "Yes. Potential collaboration opportunities may continue beyond the program based on mutual interest and business needs.",
          },
          {
            question: "Will participants receive mentorship?",
            answer:
              "Yes. Participants will have opportunities to engage with NTT DATA innovation leaders and industry experts throughout the program.",
          },
          {
            question: "Will there be networking opportunities?",
            answer:
              "Yes. The program is designed to facilitate interaction among startups, enterprise partners, industry leaders, and NTT DATA representatives.",
          },
        ],
      },
      {
        title: "Intellectual Property & Legal",
        items: [
          {
            question:
              "Who owns the intellectual property (IP) developed during the Program?",
            answer:
              "Participants retain ownership of their pre-existing intellectual property. Any IP matters related to future collaborations or PoCs will be discussed separately between the relevant parties.",
          },
          {
            question: "Will startups be required to sign any agreements?",
            answer:
              "Selected participants may be required to sign program-related agreements prior to participation.",
          },
          {
            question:
              "Will confidential information shared during the Program be protected?",
            answer:
              "Appropriate measures may be implemented to protect confidential information shared during program activities.",
          },
        ],
      },
      {
        title: "Contact & Support",
        items: [
          {
            question: "Who should I contact if I have questions?",
            answer:
              "For inquiries regarding the program or application process, please contact the Program team through the contact information provided on the website.",
          },
          {
            question: "How can I stay updated on Program announcements?",
            answer:
              "Please visit the official program website and follow NTT DATA communication channels for the latest updates.",
          },
          {
            question:
              "What should I do if I experience technical issues during registration?",
            answer:
              "Please contact the Program support team as soon as possible for assistance.",
          },
        ],
      },
    ],
  },
} as const;

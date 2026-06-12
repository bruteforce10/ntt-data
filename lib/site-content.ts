export const SITE_CONTENT = {
  about: {
    background: {
      src: "/Assets Picture/About NTT.png",
      alt: "NTT DATA headquarters cityscape",
    },
    title: "About the NTT Open Innovation Program",
    description:
      "Are you a startup ready to scale your solution with real enterprise impact? The NTT DATA Open Innovation Programme offers you the chance to collaborate directly with NTT DATA and its clients during a 3-day, hands-on innovation sprint in Singapore, from August 31 to September 2, 2026.  You’ll work side by side with client teams and NTT DATA experts to tackle real-world challenges, shape a Proof of Concept, and present your solution in the final pitch battle. The winning team will receive a USD $30,000 reward in Time & Material services to bring their PoC to life. Apply now!",
  },
  benefit: {
    title: "Why Participating",
    subtitle:
      "This program offers startups access to industry expertise, funding of pilots, market access and commercial collaboration opportunities",
    items: [
      {
        number: "BENEFIT 1",
        title: "POC FUNDING",
        descriptionHtml:
          "Proof of Concept (POC) funding of up to <strong>USD 30,000</strong> to help turn ideas into reality.",
        image: {
          src: "/Assets Picture/Benefit from NTT Open innovation Week.png",
          alt: "POC Funding",
        },
      },
      {
        number: "BENEFIT 2",
        title: "EXPERT MENTORSHIP",
        descriptionHtml:
          "Guidance from <strong>NTT DATA innovation leaders</strong>, offering strategic advice and insights to help accelerate scaling.",
        image: {
          src: "/Assets Picture/Benefit from NTT Open innovation Week (3).png",
          alt: "Expert Mentorship",
        },
      },
      {
        number: "BENEFIT 3",
        title: "COMMERCIAL COLLABORATION",
        descriptionHtml:
          "The opportunity to build <strong>integrated offerings</strong> and bring solutions to market together.",
        image: {
          src: "/Assets Picture/Benefit from NTT Open innovation Week (2).png",
          alt: "Commercial Collaboration",
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
          "Co-creation sessions between customers and startups with support from NTT DATA's",
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
          "Matching sessions between shortlisted startups and NTT DATA customers",
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

  navbar: {
    logo: {
      href: "/",
      src: "/Logo/logo-navbar.png",
      alt: "NTT DATA",
    },
    links: [
      { label: "HOME", href: "/" },
      { label: "PROGRAM OVERVIEW", href: "#program-overview" },
      { label: "BENEFITS", href: "#benefits" },
      // { label: "COUNTDOWN", href: "#countdown" },
      // { label: "CONTACT", href: "#contact" },
    ],
    actions: [
      {
        label: "VIEW PROBLEM STATEMENTS",
        href: "#problem-statements",
        variant: "primary",
      },
      { label: "REGISTER", href: "/startup-registration", variant: "outline" },
    ],
  },
  hero: {
    background: {
      src: "/Assets Picture/Hero page 2.png",
      alt: "Tokyo cityscape at night",
    },
    ornament: {
      src: "/Ornament/Ornament.png",
      alt: "",
    },
    title: ["NTT DATA OPEN", "INNOVATION PROGRAM"],
    description:
      "Initiative brought by NTT Data. We are looking at innovative Startup solutions that address business challenges and solve societal issues",
    action: { label: "REGISTER", href: "#register" },
  },
  countdown: {
    title: "REGISTRATION OPEN",
    targetDate: "2026-09-17T00:00:00",
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
          src: "/Logo/oiw-logo.png",
          alt: "Client",
          width: 150,
          height: 48,
        },
        title: "AI-Driven Supply Chain Resilience",
        description:
          "How can we leverage AI-driven analytics to optimize supply chain resilience and reduce operational costs in volatile markets?",
        fullDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel nulla consequat, vestibulum magna nec, ultrices lacus. Quisque pellentesque at elit vitae ullamcorper. Quisque nisi urna, lobortis sit amet efficitur at, faucibus non augue. Nullam imperdiet tempus iaculis. Fusce quam nisl, pretium eget volutpat ut, imperdiet non ipsum. Vestibulum quis mi elementum, ornare ante sit amet, euismod leo. Maecenas sit amet enim ipsum.\n\nAenean at metus ex. Mauris eu lacus elementum, sagittis orci ac, iaculis neque. Curabitur tincidunt facilisis dictum. Nam consequat felis nec posuere pulvinar. Ut fermentum purus ut felis sodales, vitae tincidunt est tempor. In hac habitasse platea dictumst. Etiam a ante lacinia, facilisis diam eget, pellentesque ipsum. Sed tempus felis in faucibus pharetra. Sed pretium urna rhoncus, tristique felis nec, convallis lacus.\n\nPraesent a velit in est consequat porta. Nulla pellentesque imperdiet aliquet. Maecenas pretium, enim non bibendum tincidunt, lacus sem ornare enim, a sagittis nisl ipsum vel enim.",
        href: "#problem-statements",
      },
      {
        logo: {
          src: "/Logo/GlobalLogo_NTTDATA_White_RGB.png",
          alt: "Client",
          width: 200,
          height: 56,
        },
        title: "Seamless Digital Customer Experience",
        description:
          "How might we create seamless digital customer experiences that reduce friction and increase engagement across all touchpoints?",
        fullDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel nulla consequat, vestibulum magna nec, ultrices lacus. Quisque pellentesque at elit vitae ullamcorper. Quisque nisi urna, lobortis sit amet efficitur at, faucibus non augue. Nullam imperdiet tempus iaculis. Fusce quam nisl, pretium eget volutpat ut, imperdiet non ipsum.\n\nAenean at metus ex. Mauris eu lacus elementum, sagittis orci ac, iaculis neque. Curabitur tincidunt facilisis dictum. Nam consequat felis nec posuere pulvinar. Ut fermentum purus ut felis sodales, vitae tincidunt est tempor.\n\nPraesent a velit in est consequat porta. Nulla pellentesque imperdiet aliquet. Maecenas pretium, enim non bibendum tincidunt, lacus sem ornare enim, a sagittis nisl ipsum vel enim. Sed gravida vestibulum vulputate.",
        href: "#problem-statements",
      },
      {
        logo: {
          src: "/Logo/NTT Holding white.png",
          alt: "NTT DATA",
          width: 160,
          height: 80,
        },
        title: "Edge Computing & Real-Time Intelligence",
        description:
          "How can we harness next-generation connectivity and edge computing to enable real-time intelligence at scale?",
        fullDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel nulla consequat, vestibulum magna nec, ultrices lacus. Quisque pellentesque at elit vitae ullamcorper. Nullam imperdiet tempus iaculis. Fusce quam nisl, pretium eget volutpat ut, imperdiet non ipsum. Vestibulum quis mi elementum, ornare ante sit amet, euismod leo.\n\nAenean at metus ex. Mauris eu lacus elementum, sagittis orci ac, iaculis neque. Curabitur tincidunt facilisis dictum. Nam consequat felis nec posuere pulvinar.\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin eget mi quis massa venenatis gravida sed a massa. Aliquam malesuada nunc eget ante laoreet, ullamcorper ornare ipsum lacinia.",
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
      //     alt: "Open Innovation Week",
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
    items: [
      {
        question: "Who is eligible to apply for this program?",
        answer:
          "The program is open to startups at any stage that have a working product, prototype, or proven technology relevant to one of the published challenge statements. Both local and international startups are welcome to apply.",
      },
      {
        question: "What does the selection process look like?",
        answer:
          "Applications are reviewed by NTT DATA and client teams. Shortlisted startups will be invited to a matching session with potential client partners before progressing to the final pitch battle in Singapore.",
      },
      {
        question: "Is there a cost to participate?",
        answer:
          "Participation in the program is free. Selected startups are responsible for their own travel and accommodation to Singapore unless stated otherwise.",
      },
      {
        question: "What do winning teams receive?",
        answer:
          "The winning team will receive a reward of up to USD 30,000 in Time & Material services from NTT DATA to help bring their Proof of Concept (PoC) to life.",
      },
      {
        question: "When and where will the event take place?",
        answer:
          "The innovation sprint will be held over 3 days in Singapore, from August 31 to September 2, 2026.",
      },
      {
        question: "How do I submit my pitch deck?",
        answer:
          "Shortlisted startups will receive a link to upload their pitch deck through the official submission form ahead of the matching session.",
      },
    ],
  },
} as const;

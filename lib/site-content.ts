export const SITE_CONTENT = {
  about: {
    background: {
      src: "/Assets Picture/About NTT.png",
      alt: "NTT DATA headquarters cityscape",
    },
    title: "About the NTT DATA Open Innovation Program",
    description:
      "Are you a startup or a nextgen company ready to scale your solution with real enterprise impact? The NTT DATA Open Innovation Program offers you the chance to collaborate directly with NTT DATA and its clients during a 2-day, hands-on innovation sprint in Singapore, from August 31 to September 2, 2026.  You’ll work side by side with these client teams and NTT DATA experts to tackle real-world challenges, shape a Proof of Concept, and present your solution in the final pitch battle. The winning teams will receive funded technical and development support to help bring their Proof of Concept (PoC) to life.",
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
          "The winning teams will receive funded technical and development support to help bring their Proof of Concept (PoC) to life.",
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
      { label: "FAQ'S", href: "/faq" },
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
    targetDate: "2026-07-24T00:00:00",
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
        // logo: {
        //   src: "/problem-overview/logo-alliance.png",
        //   alt: "Alliance Bank",
        // },
        logoLabel: "A leading Southeast Asian industrial materials company",
        title: "AI-Enabled Supply Chain Market Response",
        description:
          "Regional oversupply and volatile pricing are pressuring PE/PP margins, while manual, spreadsheet-based allocation processes extend response times from hours to days. The company lacks a single integrated view connecting products, supply, inventory, demand, and market pricing to guide fast reallocation decisions.",
        detail: {
          context: [
            "The company operates in a highly competitive petrochemicals and advanced materials market, where regional oversupply, volatile pricing, and changing demand patterns are putting pressure on PE/PP margins.",
            "In this environment, commercial and supply chain teams need to reallocate volume toward better-priced markets more quickly and consistently. Current decision-making can rely on manual analysis and spreadsheet-based processes across multiple functions, which can extend response times from hours to days.",
            "The company does not currently have a single integrated decision-support view that connects PE/PP product portfolios, production footprint, inventory position, customer demand, market pricing, and operational constraints. This can limit its ability to match products to the most attractive markets and customers in near real time.",
            "The challenge is therefore to use AI to close the speed gap in PE/PP product-to-market matching - moving from reactive, multi-day allocation decisions toward faster, more data-informed recommendations that consider demand, pricing, supply, inventory, production readiness, and logistics feasibility.",
            "The initial proof of concept should focus on demand sensing and sales allocation for priority PE/PP product categories across domestic and regional export markets, with the potential to expand into broader supply chain and commercial planning use cases.",
          ],
          description: {
            develop:
              "An AI-enabled solution that integrates market signals, demand, pricing, supply, inventory, customer, logistics, and production constraints to accelerate supply chain and commercial decision-making for PE/PP product allocation.",
            question:
              "How might the company use AI to accelerate supply chain and commercial decisions by identifying attractive PE/PP markets and recommending optimal product allocation in near real time?",
            helpsUsers: [
              "Identify attractive and profitable markets and customer segments based on demand, pricing, margin, and supply signals.",
              "Recommend optimal PE/PP product allocation priorities - including what to sell, where to sell, to which customers, and at what priority.",
              "Match PE/PP product grades or categories to market opportunities across regions and customer groups.",
              "Align commercial opportunities with inventory availability, production plans, logistics feasibility, and operational readiness.",
              "Improve the speed, consistency, and accuracy of decisions across sales, supply chain, and production planning teams.",
              "Support scenario-based planning and rapid response when market conditions, supply positions, or pricing signals change.",
            ],
            priorityScope: [
              "PE/PP polyolefins portfolio as the initial priority scope.",
              "Domestic and regional export markets in Southeast Asia.",
              "Demand sensing, sales allocation, product-to-market matching, and production planning alignment.",
            ],
            targetOutcomes: [
              "Reduce decision cycle time from days to hours where feasible.",
              "Improve inventory, margin, and allocation outcomes, with specific baselines and targets to be confirmed with shortlisted partners under appropriate confidentiality arrangements.",
              "Enable human-in-the-loop decision-making so business users can review, validate, and adjust AI-generated recommendations.",
            ],
            dataExpected: [
              "Historical sales orders and demand information.",
              "Production plans and supply availability.",
              "Inventory data.",
              "Customer segmentation or customer master data.",
              "Market price indicators and external market signals, where available.",
              "Internal sales insights, market observations, and relevant news or demand signals, where available.",
              "Current allocation workflow documentation and business rules.",
            ],
            solutionMust: [
              "Continuously ingest and analyse relevant internal and external data sources.",
              "Generate actionable recommendations on what PE/PP products to sell, where to sell, and what to prioritise.",
              "Balance margin optimisation with operational feasibility, including production, inventory, stock availability, and logistics constraints.",
              "Surface the rationale behind recommendations so business users can understand key drivers and trade-offs.",
              "Support simulation or scenario planning for changes in demand, price, supply, inventory, or production constraints.",
              "Operate initially as a focused proof of concept using historical data, with potential to incorporate live or near-real-time data feeds in later phases.",
              "Be capable of being validated through workshops with commercial, supply chain, and production subject matter experts.",
            ],
            pocApproach: [
              "Focused proof of concept over a defined period, using historical data and human-in-the-loop validation.",
              "Initial focus on PE/PP demand sensing and sales allocation.",
              "Live data feeds and broader operational integration can be assessed after the initial proof of concept, subject to feasibility, governance, and business value.",
            ],
          },
        },
        href: "#problem-statements",
      },
      {
        // logo: {
        //   src: "/problem-overview/logo-alliance.png",
        //   alt: "Alliance Bank",
        // },
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
        // logo: {
        //   src: "/problem-overview/logo-alliance.png",
        //   alt: "Alliance Bank",
        // },
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
      {
        logoLabel: "dHost",
        title:
          "Edge AI Orchestration for In-Building Neutral Host Infrastructure",
        description:
          "Neutral host in-building sites are becoming AI Edge Nodes, but without an orchestration layer, compute stays fragmented and underutilised. dHost needs to allocate, monetise, and govern heterogeneous edge capacity across permanent, on-demand, and background workloads.",
        detail: {
          context: [
            "dHost operates neutral host in-building connectivity infrastructure across Indonesia and the Philippines, serving multiple mobile network operators on shared carrier-grade infrastructure. The company is now converting selected in-building sites into AI Edge Nodes, starting with small deployments and scaling over time.",
            "As demand grows for real-time AI inference, IoT analytics, computer vision, AI-RAN and sovereign AI workloads, distributed in-building infrastructure can become a new edge computing layer. However, without an orchestration layer, it is difficult to allocate compute resources consistently across heterogeneous edge nodes, balance permanent and on-demand workloads, or monetise idle capacity.",
            "dHost aims to support four workload types on the same distributed estate: permanent tenant workloads, on-demand burst demand, background RAN-AI workloads that convert idle compute into virtual baseband resources for mobile operators, and Compute-as-a-Service resources for AI companies. A successful solution would help transform neutral host infrastructure from connectivity-only assets into programmable edge AI infrastructure.",
            "Without a scalable orchestration framework, edge compute capacity may remain fragmented, underutilised and difficult for customers to access. This would limit dHost’s ability to support sovereign AI, venue-level AI applications, AI-RAN monetisation and compute-hour tokenisation across Southeast Asia.",
          ],
          description: {
            develop: [
              "An orchestration layer for distributed AI Edge Nodes deployed across the company’s neutral host in-building infrastructure, enabling compute resources to be allocated, monetised and governed across heterogeneous sites and workload types.",
              "Tailored towards Neutral host operators, mobile network operators, venue owners, AI application providers, IoT solution providers, government users and regulated enterprises requiring in-country workload placement",
            ],
            helpsUsers: [
              "Allocate compute across distributed and heterogeneous edge nodes through a unified orchestration layer",
              "Run permanent tenant workloads, on-demand burst workloads and deferred background workloads on the same infrastructure",
              "Enable venue owners and third-party developers to deploy containerised AI applications without managing infrastructure",
              "Monetise idle GPU or NPU capacity through compute-hour tokenisation, marketplace access and automated settlement",
              "Support sovereign AI and regulated workloads by enforcing in-country workload placement",
            ],
            solutionMust: [
              "Provide hardware abstraction for NVIDIA or equivalent accelerators under a unified API, avoiding lock-in to a single hardware vendor",
              "Support multi-mode allocation across reserved, burst and background workloads",
              "Represent compute-hours as tradeable units with real-time price discovery, reservations and automated settlement",
              "Provide an API or marketplace interface for customers, developers and partners to access distributed edge resources",
              "Enable deployment of containerised AI applications, including NIM, custom models and IoT analytics workloads",
              "Provide an interface to convert idle compute slices into virtual baseband resources for mobile network operators, enabling AI-RAN on shared neutral host infrastructure",
            ],
          },
        },
        href: "#problem-statements",
      },
      {
        logoLabel: "The GEAR by Kajima",
        title:
          "Standardising Asset Data Handover for Smart Building Facilities Management",
        description:
          "Asset identification data is rarely structured during construction — it sits scattered across drawings and PDFs instead of the BIM model. Incomplete, mislabelled handover data blocks smart controls, digital twins, and energy analytics, forcing costly manual rework.",
        detail: {
          context: [
            "The handover process from construction to Facilities Management (FM) currently has inconsistent asset identification information. Asset identification is rarely captured in a structured way during the construction phase, and is scattered across various construction drawings and other documents, rather than being incorporated into the Building Information Model (BIM).",
            "Without a standard format for structuring asset data from construction through to handover, it is challenging to reliably implement smart building systems such as AI-informed controls, digital twins or energy analytics solutions. As building owners increasingly seek more data to make informed FM decisions and implement smart control systems, the lack of clean, structured asset data becomes a fundamental blocker, since poor-quality source data at handover cannot support accurate downstream applications.",
            "Kajima has experienced this issue firsthand across various properties, with documentation and asset information scattered across multiple sources rather than centralised, the resulting BIM models containing limited data, and assets within it being mislabelled. An ideal solution would involve the property developer from the start of a project, driving the standard and engaging the main building contractor, so that asset identification data capture is designed into the construction process rather than retrofitted at handover.",
            "Without a standardised framework, asset identification information will continue to be scattered, incomplete, and poorly labelled at handover. This makes it difficult to source good-quality data from buildings, delaying or preventing the implementation of smart control systems and digital twins, and requiring costly manual rework to reconstruct information retrospectively.",
          ],
          description: {
            develop: [
              "A framework and system for capturing and structuring asset identification information during construction, so it can be reliably ingested into the BIM model at handover to Facilities Management, even where source information (e.g. construction drawings and PDFs) is not natively BIM-compatible.",
              "Tailored towards the property developer, from the start of construction, the main building contractor, Facilities Management teams, and smart building operations teams",
            ],
            helpsUsers: [
              "Capture and structure asset identification information that is currently deprioritised during the construction stage",
              "Consolidate asset identification information that is scattered across construction drawings and other documents such as PDFs",
              "Avoid incomplete BIM models and mislabelled assets at handover",
              "Enable good-quality building data to support smart control systems and digital twins",
            ],
            solutionMust: [
              "Ingest construction and schematic drawings and other handover documentation, to extract asset identification information",
              "Structure extracted asset identification data into a standard framework compatible with the BIM model",
              "Validate asset labelling and flag incomplete or inconsistent asset data against a defined schema",
              "Support early engagement of the property developer and main contractor to drive adoption of the standard from the start of construction",
            ],
          },
        },
        href: "#problem-statements",
      },
      {
        logoLabel: "The GEAR by Kajima",
        title:
          "Achieving End-to-End Data Observability Across Smart Building Ecosystems",
        description:
          "Smart building data quality breaks down at multiple points — edge sensors, processing pipelines, and upstream configuration changes — and issues are diagnosed manually. Without an integrated end-to-end observability layer, data loss and manual reconciliation slow operations and R&D.",
        detail: {
          context: [
            "The organisation operates a complex smart building ecosystem driven by IoT sensors, cloud platforms, and distributed data processing pipelines. However, data quality remains a critical challenge, with issues originating at multiple points, from edge sensors that fail to capture data, to degradation during data processing, and upstream configuration changes (e.g. AWS landing zone updates) that disrupt ingestion.",
            "Currently, data issues are reported and diagnosed manually, creating delays and inefficiencies. Despite having strong anomaly detection capabilities at isolated system levels, there is no integrated, end-to-end observability layer across the full data lifecycle. This results in data loss, reduced operational and research accuracy, and increased manual reconciliation efforts.",
            "The GEAR building is used as a strategic R&D centre for the Kajima group to implement and study smart building best practices, in order to develop new applications, products and services for smart buildings.",
            "Data issues must continue to be manually identified and resolved, with frequently missed issues causing long gaps in collection. This causes delays to R&D projects, or reduction in research outcomes from working with smaller datasets, in addition to missed opportunities to further optimise the operations of The GEAR facility.",
          ],
          description: {
            develop: [
              "An integrated data observability and anomaly detection solution for smart building ecosystems that provides end-to-end visibility across edge, cloud, and processing layers.",
              "Tailored towards The organisation’s diagnostic technicians, operations and research teams",
            ],
            helpsUsers: [
              "Detect and flag data anomalies in real time across IoT sensors, pipelines, and platforms",
              "Identify root causes of data degradation across multiple transformation points",
              "Reduce manual diagnosis and reconciliation efforts",
              "Ensure high-quality data availability for operational and research use cases",
            ],
            solutionMust: [
              "Monitor data quality across distributed architectures (edge, cloud, APIs)",
              "Detect missing, degraded, or misrouted data due to upstream configuration changes",
              "Correlate anomalies across multiple data sources and transformation layers",
              "Provide actionable insights and root cause analysis for technical teams",
              "Integrate with existing IoT and smart building platforms",
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
    items: [
      {
        question: "What is the NTT DATA Open Innovation Program 2026?",
        answer:
          "The NTT DATA Open Innovation Program is an initiative that connects startups and nextgen companies with real business challenges from NTT DATA and its clients. The program gives selected startups and nextgen companies an opportunity to present their solutions, work with business stakeholders, and explore the potential for a Proof of Concept (POC) and future commercial engagement.",
      },
      {
        question: "Who can apply?",
        answer:
          "The program is open to startups and nextgen companies with innovative solutions that solve one or more of our challenge statements. We welcome companies from any industry, technology domain, or growth stage.",
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
        question: "Can startups and nextgen companies from any country apply?",
        answer:
          "Yes. The Program welcomes applications from startups and nextgen companies across the region and internationally.",
      },
      {
        question: "How do I apply?",
        answer:
          "Startups and nextgen companies can apply by visiting the Open Innovation Program webpage, reviewing the listed challenge statements, and registering their interest online. After registration, eligible startups and nextgen companies will receive instructions on how to submit their pitch deck or solution details.",
      },
      {
        question: "What is the application period?",
        answer: "Applications are open until July 24, 2026.",
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
          "Shortlisted startups and nextgen companies may be invited for further discussions or pitch sessions",
          "Final selected startups will be informed directly",
        ],
      },
      {
        question: "Is there a pitch deck requirement?",
        answer:
          "Yes. A pitch deck is required as part of the application process.",
      },
      {
        question: "What is the maximum file size for pitch deck submission?",
        answer: "The maximum file size for uploaded pitch decks is 8 MB.",
      },
      {
        question: "What file formats are accepted for pitch deck submissions?",
        answer:
          "Accepted file formats will be specified on the submission portal.",
      },
      {
        question: "Can I update my application after submission?",
        answer:
          "Updates may be allowed before the application deadline. If changes are required, please contact: openinnovation@ntt-startupchallenge.com.",
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
      {
        question: "What happens after being selected?",
        answer:
          "Selected startups and nextgen companies will be invited to participate in NTT DATA Open Innovation Week in Singapore from 31 August to 2 September 2026.",
      },
      {
        question: "Is physical attendance required?",
        answer:
          "Yes. Selected startups and nextgen companies are expected to participate in person during the Program in Singapore.",
      },
      {
        question: "What activities will take place during the Program?",
        answer:
          "Participants will collaborate with NTT DATA experts and enterprise stakeholders, refine their solutions, develop Proofs of Concept (PoCs), and present their ideas during the final sessions.",
      },
      {
        question: "How long is the Program?",
        answer:
          "The on-site Program will take place over three days during NTT DATA Open Innovation Week.",
      },
      {
        question: "Can more than one representative attend from each startup?",
        answer:
          "Yes. Multiple representatives may attend, subject to participation guidelines and venue capacity.",
      },
    ],
  },
} as const;

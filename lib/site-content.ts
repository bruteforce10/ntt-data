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
    title: "Registration Deadline: July 24, 2026",
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
      {
        logoLabel: "A global infrastructure and engineering services provider",
        title:
          "Unified Orchestration for Multi-Trade Data Centre Delivery and Lifecycle Operations",
        description:
          "Three licensed trades — liquid cooling, low voltage cabling, and in-rack nodes — build the same hyperscale data centre with no orchestration layer above them. Sequencing, workforce, assets, and quality are coordinated through site meetings and supervisor memory, and the project record fractures at the Day 1 to Day 2 handover.",
        richDetail: {
          trades: {
            heading: "Three trades with one delivery motion",
            intro:
              "Fusion Engineering brings together three distinct, licensed, and separately certified trade disciplines to deliver a hyperscale liquid-cooled data centre: mechanical/HVAC engineers who install and commission the liquid cooling loop, BICSI-certified technicians who run and certify low-voltage cabling, and data centre technicians who rack, stack, and burn in the compute nodes themselves.",
            cards: [
              {
                trade: "cooling",
                title: "Liquid Cooling",
                subtitle:
                  "Mechanical/HVAC · CDU · piping · pressure & leak testing",
              },
              {
                trade: "cabling",
                title: "Low Voltage Cabling",
                subtitle:
                  "BICSI-certified · copper/fibre · pathway · OTDR/Fluke certification",
              },
              {
                trade: "nodes",
                title: "In-Rack Nodes & Switches",
                subtitle:
                  "Rack & stack · GPU/compute install · firmware · burn-in QA",
              },
            ],
            body: [
              "Each of these trades is deep, specialised, and already well understood on its own terms. What is not solved in the industry, is the layer that sits above them: the coordination of sequencing, documentation, quality, and workforce across all three, on the same floor, in the same rack, on the same timeline. Today that coordination happens through site meetings, WhatsApp groups, and a project manager holding the whole picture in their head.",
              "The same gap repeats on Day 2. Fusion Engineering already defines a lifecycle support structure CDU service contracts, cable recertification, OEM break-fix running in parallel across the same three trades. But Day 1 as-built records and Day 2 service records live in entirely separate systems, so the lifecycle team inherits a facility they were not present to build, with no continuous record connecting install to operation.",
            ],
            callout: {
              title: "The Orchestration Layer",
              text: "One project record. One sequencing engine. One QA standard. Across all three trades, Day 1 through Day 2.",
            },
          },
          broken: {
            heading: "What is broken today",
            intro:
              "The following pain points are active and recurring across the company's Fusion Engineering project delivery:",
            items: [
              {
                title: "No cross-trade sequencing engine",
                description:
                  "Liquid cooling, cabling, and node install teams work in the same physical space with hard dependencies between them. cooling loop pressure testing must clear before cabling proceeds, cabling certification must clear before node burn-in but these dependencies are tracked informally, through site meetings and supervisor memory, not through any system that can block, gate, or flag out-of-sequence work.",
              },
              {
                title: "No unified project command view across trades",
                description:
                  "Each trade effectively runs its own project tracking. mechanical uses commissioning checklists, cabling uses cut sheets and certification logs, node teams use asset and firmware trackers. There is no single view that shows a project manager the real-time status of all three trades, in all data halls, on one screen.",
              },
              {
                title:
                  "Workforce attendance with no verifiable evidence, across three separately-badged crews",
                description:
                  "Attendance is recorded manually and separately per trade. often per subcontractor. There is no unified, verifiable record of who from which trade was on site, when, and for how long. The solution must function offline and combine biometric verification with photographic evidence against a known staff register, across all three crews.",
              },
              {
                title:
                  "Equipment and materials with no location intelligence, across three overlapping toolsets",
                description:
                  "Pipefitting tools, cable test equipment, and rack integration hardware move independently around the same data halls, often staged by different crews with no shared visibility. BLE tracking has not been applied across a multi-trade site.",
              },
              {
                title:
                  "Quality issues caught too late, and only within a single trade's own inspection",
                description:
                  "Each trade inspects its own work. commissioning agents check cooling, QA/network leads check cabling, burn-in engineers check nodes but nothing checks the interfaces between trades (e.g., a cable pathway routed too close to a cooling manifold, a rack placement that blocks CDU service access). There is no systematic, always-on visual check that spans trade boundaries.",
              },
              {
                title:
                  "Documentation that fractures at the Day 1 to Day 2 handover",
                description:
                  "As-built records, commissioning reports, cable certification data, and asset registers are generated by three different Day 1 teams in three different formats. When the project transitions to Day 2 managed lifecycle support, the incoming service team inherits a facility with no continuous, query-able project record connecting what was built to what must now be maintained.",
              },
            ],
          },
          solve: {
            heading: "What we want to solve",
            paragraphs: [
              "Fusion Engineering already has three highly capable trade teams and a defined Day 1 / Day 2 lifecycle structure. What it does not have is the software layer that sits above all of it to coordinate sequencing, workforce, assets, quality, and documentation as one continuous product rather than three parallel disciplines.",
            ],
            question:
              "How might we build a single orchestration platform that sits above liquid cooling, low voltage cabling, and in-rack node delivery. sequencing cross-trade dependencies, verifying workforce and assets across all three crews, applying AI-powered visual QA across every trade's defect categories, and carrying one continuous project record from Day 1 deployment through Day 2 managed lifecycle so that Fusion Engineering delivers as one coordinated product, not three coordinated trades?",
            note: "The platform must treat the project as the fundamental unit of organisation. A project manager, a client, or a Day 2 lifecycle engineer should be able to pull one continuous record per project ID, spanning every trade and every phase, from mobilisation to ongoing service.",
          },
          dependencyChain: {
            heading: "The dependency chain the platform must understand",
            intro:
              "This is illustrative of the kind of cross-trade sequence the orchestration layer needs to model, gate, and flag deviations from not a fixed workflow every project must follow verbatim.",
            steps: [
              {
                trade: "nodes",
                label: "Rack Placement",
                description:
                  "In-rack nodes team confirms rack position and floor readiness",
              },
              {
                trade: "cooling",
                label: "Cooling Loop Prep",
                description:
                  "Liquid cooling team runs piping, pressure-tests before any adjacent trade proceeds",
              },
              {
                trade: "cabling",
                label: "Cabling & Pathway",
                description:
                  "Low voltage team runs and certifies cable pathways once cooling infrastructure is verified clear",
              },
              {
                trade: "cooling",
                label: "CDU Commissioning",
                description:
                  "Liquid cooling team commissions CDU; leak/flow verification gates node power-on",
              },
              {
                trade: "nodes",
                label: "Node Install & Burn-In",
                description:
                  "In-rack team installs and burns in compute; final cross-trade sign-off closes the sequence",
              },
            ],
          },
          capabilities: {
            heading: "The seven capability areas we want to address",
            intro:
              "We are seeking a solution that addresses all seven modules within one coherent, integrated platform. Solutions that address fewer modules with exceptional depth will also be considered, provided the architecture is explicitly designed to extend to the rest.",
            modules: [
              {
                title: "Cross-Trade Sequencing & Handoff Orchestration",
                bullets: [
                  "Configurable dependency model: define which trade's task must clear (and to what verification standard) before another trade's task can begin",
                  "Automated gating: a downstream task cannot be marked ready-to-start until its upstream dependency is verified complete in the system, not just verbally confirmed",
                  "Real-time conflict and collision flagging: two trades scheduled in the same rack or hall zone at a conflicting time, or a trade proceeding out of sequence",
                  "Cross-trade interface QA: checkpoints specifically for the physical interfaces between trades (e.g., cable pathway clearance from cooling manifolds, rack access clearance for CDU service)",
                  "Escalation routing: sequencing conflicts flagged to the relevant trade leads and the overall project manager simultaneously",
                ],
              },
              {
                title: "Project Management & Single Pane of Glass",
                bullets: [
                  "Project-based data structure: every record, asset, person, defect, and document linked to a project ID and a trade",
                  "Multi-data-hall, multi-country and multi-trade support: hall-level and trade-level views rolling up into one project-level dashboard",
                  "Real-time status across all three trades simultaneously: task completion, workforce presence, QA status, flagged defects, sequencing conflicts, documentation completeness",
                  "Portfolio view for the company and Fusion Engineering team across all active projects",
                  "Role-based access: project manager, trade lead (mechanical/cabling/rack), QA lead, client view",
                  "Offline-first with background sync when connectivity is restored",
                ],
              },
              {
                title: "Workforce Verification & Evidenced Timesheets",
                bullets: [
                  "Fingerprint-based time-in / time-out verification linked to project ID, hall, and trade assignment",
                  "Photo capture (depth sensing) at check-in matched against a registered ground staff photo register per trade crew",
                  "Offline biometric processing, no cloud dependency for core attendance function",
                  "Structured timesheet output per engineer, per trade, per day: project ID, hall, task code, hours, biometric confirmation status",
                  "Exportable, trade-segmented billing evidence package per invoice period",
                  "Subcontractor, temp staff vs direct staff distinction, separately trackable by trade",
                ],
              },
              {
                title:
                  "Equipment & Materials Asset Tracking (BLE or alternative technology)",
                bullets: [
                  "BLE beacon tagging of physical assets across all three trades: pipefitting and pressure-test tools, cable drums and test equipment, rack integration hardware",
                  "Indoor location tracking within data hall with zone-level accuracy, trade-tagged so overlapping equipment from different crews is distinguishable",
                  "Shared asset register per project: what is on site, where it currently is, which trade last interacted with it",
                  "Cross-hall and cross-trade visibility: asset last seen with the cooling crew in Hall A, currently staged with the cabling crew in Hall B",
                  "Check-out / check-in workflow for controlled equipment shared or borrowed across trades",
                  "Offline BLE scanning with local persistence, no network required for core tracking",
                ],
              },
              {
                title: "Cable Patching Validation & Cut Sheet Management",
                bullets: [
                  "Digital cut sheet import and management. Excel migration path required, not replacement from scratch",
                  "Guided patching workflow with source/destination port and cable type confirmation before task closes",
                  "Barcode or QR-code scanning of patch panel ports to confirm correct physical connection",
                  "Patching tasks gated by the sequencing engine against cooling loop and rack placement dependencies",
                  "Multi-data-hall patching with cross-hall dependency tracking",
                  "Submission-ready, certified patching record for client documentation",
                  "Documentation with translation capability for multiple foreign languages",
                ],
              },
              {
                title:
                  "AI Visual QA/QC: Photo-Based Defect Detection Across All Three Trades",
                subtitle:
                  "Point-of-installation image recognition that flags issues before sign-off — not limited to cabling",
                bullets: [
                  "Structured photo capture built into the installation workflow for all three trades, not cabling alone: terminations, cooling fittings, rack/node placement",
                  "Real-time, on-device image analysis flagging likely defects immediately, before the engineer moves to the next task",
                  "Defect confidence scoring with low-confidence flags routed to human review rather than blocking work outright",
                  "Trade-specific defect taxonomies, extensible as new trades or task types are added to the platform",
                  "Cross-trade interface checks (e.g., cable routing proximity to cooling components) as a distinct detection category, not just single-trade defects",
                  "Edge/on-device inference given offline job site conditions",
                  "Defect lifecycle integrated with QA workflow: flagged > assigned > re-checked > closed, full audit trail",
                  "False-positive feedback loop feeding back into model performance over time",
                ],
                table: {
                  caption:
                    "Defect taxonomy, extended across all three Fusion Engineering trades:",
                  rows: [
                    {
                      label: "Low voltage cabling",
                      description:
                        "Improper crimping, exposed conductors, bend radius violations, missing/incorrect labelling, incorrect port-to-slot mapping",
                    },
                    {
                      label: "Liquid cooling",
                      description:
                        "Fitting misalignment, missing safety wire/lock, condensation or residue indicating a slow leak, incorrect manifold torque",
                    },
                    {
                      label: "In-rack nodes & switches",
                      description:
                        "Incorrect rack unit placement, blocked airflow/cable clearance, unseated GPU/compute modules, mislabelled asset tags",
                    },
                  ],
                },
              },
              {
                title: "Documentation Continuity: Day 1 to Day 2 Lifecycle",
                bullets: [
                  "All Day 1 records — commissioning reports, cable certification data, asset registers, QA logs, sequencing history — linked to project ID and queryable from a single interface",
                  "Day 2 lifecycle events (PM visits, break-fix, MACs, recertification, coolant servicing) logged against the same project ID and the same as-built record, not a separate system",
                  "Automated handover package assembly at Day 1 close-out: a complete, structured record the Day 2 team inherits rather than rediscovers",
                  "Version control and change history across the full project lifecycle — as-built updates from Day 2 MACs feed back into the same living record",
                  "Client-facing project portal spanning both deployment status and ongoing lifecycle status",
                ],
              },
            ],
          },
          requirements: {
            heading: "Some technical requirements",
            intro:
              "Any proposed solution must satisfy the following constraints to be viable for Fusion Engineering's operating environment:",
            rows: [
              {
                label: "Offline-first architecture",
                description:
                  "All modules including AI image analysis and cross-trade sequencing logic must deliver their core function without expectation of internet connectivity. DC sites operate under strict network access controls.",
              },
              {
                label: "Project-based, trade-tagged data model",
                description:
                  "The project ID is the master key; every record must also carry a trade tag so cross-trade and single-trade views are both possible from the same data.",
              },
              {
                label: "Multi-hall, multi-trade support",
                description:
                  "The platform must support multiple data halls and all three trades within a single project, with hall- and trade-level granularity rolling up to one project-level view.",
              },
              {
                label: "Configurable sequencing logic",
                description:
                  "Cross-trade dependencies must be configurable per project, not hardcoded. As different sites and rack configurations will require different sequencing rules.",
              },
              {
                label: "BLE indoor tracking",
                description:
                  "Deployable without facility network modification. Zone-level accuracy is the minimum requirement, with trade-level asset tagging.",
              },
              {
                label: "Biometric + photo attendance",
                description:
                  "Both fingerprint verification and photographic evidence against a registered staff photo database are required, across all three trade crews.",
              },
              {
                label: "Excel migration path",
                description:
                  "The solution must accept existing Excel cut sheets, commissioning checklists, and asset registers as input, not require re-entry from scratch.",
              },
              {
                label: "Edge-capable AI inference",
                description:
                  "Visual defect detection must run, or degrade gracefully, without live cloud connectivity, across all trade-specific defect categories.",
              },
              {
                label: "Day 1–to–Day 2 continuity",
                description:
                  "The data model must not treat deployment and lifecycle management as separate systems; one project record must span both phases.",
              },
            ],
          },
        },
        href: "#problem-statements",
      },
      {
        logoLabel: "A leading India-based automotive manufacturer",
        title: "Connected Machines for Operational Efficiency and OT Security",
        description:
          "Machine connectivity is expanding across heterogeneous plants, equipment types and suppliers, but legacy machines use varied protocols and lack consistent asset, identity, patching and configuration controls. Operational gains must be delivered without increasing cyber risk or disrupting production.",
        detail: {
          context: [
            "The company operates a large automotive manufacturing ecosystem spanning its own factories and an extensive supplier network. It is progressing its Industry 4.0 agenda by connecting shop-floor equipment, collecting machine data and using edge and cloud platforms to improve operational visibility and performance.",
            "A previous initiative identified the need to assess operational technology environments, establish machine connectivity, execute workloads at the edge and provide visualization through a cloud-hosted platform. The initial approach covered selected plant sites, with potential to scale across a much larger supplier footprint.",
            "As machine connectivity expands across heterogeneous plants, equipment types and suppliers, operational benefits must be delivered without increasing cyber risk or disrupting production. Legacy machines may use different protocols, provide limited security capabilities or lack consistent asset, identity, patching and configuration controls. This makes it difficult to establish trusted connectivity, standardize data collection and maintain visibility over vulnerabilities, abnormal behaviour and unauthorized access.",
            "The company is seeking an innovative, scalable solution that securely connects machines and industrial assets, provides near-real-time operational insights, and embeds OT security controls by design. The solution should help plants improve uptime, maintenance and resource utilization while protecting production environments and enabling consistent governance across company and supplier sites.",
            "The initial proof of concept should focus on a clearly defined production area or selected supplier plant(s), connecting a representative mix of machines and demonstrating measurable operational and security outcomes before wider rollout.",
          ],
          description: {
            develop:
              "A secure connected-machines solution that integrates industrial equipment, edge computing, operational analytics and OT cybersecurity to improve plant efficiency, resilience and visibility across company and supplier manufacturing sites.",
            helpsUsers: [
              "Provide trusted, near-real-time visibility into machine performance, operating conditions, connected OT assets and security risks.",
              "Reduce unplanned downtime through early anomaly detection, condition monitoring and predictive maintenance insights.",
              "Improve production throughput, equipment effectiveness, maintenance planning, quality and energy/resource efficiency.",
              "Enable plant and supplier teams to act on prioritized operational and security alerts without requiring specialist analysis for every event.",
              "Standardize machine connectivity and governance across plants while accommodating different equipment ages, vendors and industrial protocols.",
            ],
            solutionMust: [
              "Securely connect legacy and modern industrial assets using non-intrusive, standards-based methods and common industrial protocols.",
              "Collect, process and synchronize machine data across edge, on-premise and cloud environments, including during intermittent connectivity.",
              "Provide operational visibility and analytics covering machine condition, utilization, downtime, anomalies and maintenance priorities.",
              "Maintain OT asset and security visibility, including device identity, communication patterns, vulnerabilities and abnormal behaviour.",
              "Embed OT security and governance controls, including network segmentation, role-based access, authentication, encryption, audit trails and safe monitoring practices.",
              "Integrate and scale across plants and suppliers through existing OT/IT platforms, modular deployment options and a repeatable pilot-to-rollout approach.",
            ],
          },
        },
        href: "#problem-statements",
      },
      {
        logoLabel: "A leading Southeast Asian telecommunications and digital services provider",
        title: "AI-Powered Autonomous Telco Assurance and Operations",
        description:
          "Operational workflows and insights are fragmented across network-monitoring, incident-management, field-service, service-desk, customer-care, billing, and CRM systems, limiting end-to-end visibility and slowing fault and congestion detection. The opportunity is a vendor-agnostic AI agent layer that orchestrates semi-autonomous assurance and operations across the existing technology estate, keeping critical or high-impact actions under human review.",
        detail: {
          context: [
            "The company operates extensive fixed broadband and mobile networks supported by multiple network-monitoring, incident-management, field-service, service-desk, customer-care, billing, CRM, and operational-data environments.",
            "Today, operational workflows and insights are fragmented across these systems and teams. This limits end-to-end visibility, slows fault and congestion detection, creates manual ticket triage and hand-offs, and makes it harder to coordinate field response and customer communications during service-impacting events.",
            "The company is seeking to improve network reliability, service quality, customer support, and operational efficiency without replacing its existing technology estate. The opportunity is to introduce a vendor-agnostic AI agent layer that can integrate with current tools and orchestrate work across network operations, service management, field teams, and customer care.",
            "The target state is a cost-effective, semi-autonomous operating model in which AI predicts and prioritizes issues, coordinates routine actions, and proactively informs customers, while critical or high-impact actions remain subject to human review and approval.",
          ],
          description: {
            develop:
              "A vendor-agnostic AI agent platform that integrates with existing network-management, service-desk, CRM, billing, field-service, and operational-data environments to enable cost-effective, semi-autonomous telco assurance and operations.",
            helpsUsers: [
              "Detect and predict fixed and mobile network faults, service degradation, and congestion earlier.",
              "Prioritize incidents, tickets, and field-team activities based on service impact, urgency, and operational context.",
              "Coordinate work across network operations, incident management, field service, customer care, and billing support with fewer manual hand-offs.",
              "Provide proactive, accurate customer notifications and support agents with relevant service-impact information.",
              "Improve network reliability, customer experience, resolution speed, and operational cost efficiency while retaining human oversight.",
            ],
            solutionMust: [
              "Integrate with heterogeneous and existing network-management tools, service desks, CRM systems, billing platforms, field-service applications, and operational data sources through configurable connectors or APIs.",
              "Correlate network, incident, customer, and operational signals to support predictive fault detection, congestion analysis, and service-quality monitoring.",
              "Automate ticket classification, enrichment, prioritization, routing, and recommended next actions across support and operations teams.",
              "Orchestrate semi-autonomous workflows for predictive maintenance, outage response, field-service dispatch, customer-care automation, and billing-query handling.",
              "Provide end-to-end observability, action traceability, audit logs, governance controls, and clear escalation paths.",
              "Apply confidence thresholds and human approval gates before critical, high-risk, or service-impacting actions are executed.",
              "Operate across both fixed broadband and mobile environments without creating dependency on a single network equipment or software vendor.",
              "Support a practical pilot with measurable operational and customer-service outcomes and a clear path to scale.",
            ],
          },
        },
        href: "#problem-statements",
      },
      {
        logoLabel: "A Fortune 500 global pharmaceutical and healthcare company",
        title:
          "Real-Time Predictive Quality and Multivariate Batch Release for GxP Pharmaceutical Manufacturing",
        description:
          "Pharmaceutical batch release still depends on end-of-line laboratory testing that adds days of delay and ties up working capital, while high-frequency process, sensor, and PAT data streams stay underused for real-time quality decisions. The opportunity is to apply machine learning and multivariate analytics to predict Critical Quality Attributes during production, within a validated, explainable, GxP-compliant environment.",
        detail: {
          context: [
            "Pharmaceutical batch release today relies heavily on end-of-line laboratory testing. Samples are pulled only after a batch has been produced and sent to quality control labs, where results can take several days. A batch cannot be released until every test passes, which delays supply, ties up working capital in held inventory, and means quality problems are discovered only after the batch has already been manufactured.",
            "At the same time, modern manufacturing lines generate large volumes of high-frequency process and sensor data. Hundreds of interacting Critical Process Parameters (CPPs), raw material attributes, environmental conditions, and Process Analytical Technology (PAT) spectra are captured continuously, yet remain largely underused for real-time quality decisions.",
            "Regulators such as the FDA and EMA actively encourage a shift toward Quality-by-Design and Real-Time Release Testing (RTRT), where quality is assured continuously during production rather than confirmed afterwards. The opportunity is to apply machine learning and multivariate analytics to predict final product quality while a batch is still being made. Any solution, however, must operate within a strictly regulated GxP environment and satisfy validation, data integrity, explainability, and human-oversight requirements that most off-the-shelf tools do not address.",
          ],
          description: {
            develop:
              "A solution that ingests multivariate, time-series manufacturing data across hundreds of interacting parameters and predicts Critical Quality Attributes (CQAs), such as potency, dissolution rate, tablet hardness, content uniformity, and moisture, in real time, flagging likely deviations before a batch is completed and supporting faster, evidence-based release decisions.",
            painPoints: [
              "Slow release cycles: end-of-line laboratory testing adds days of delay and held inventory before a batch can ship.",
              "Late defect detection: quality issues surface only after production, driving scrap, rework, deviations, and lengthy investigations.",
              "Underused data: rich Critical Process Parameter, material, environmental, and Process Analytical Technology (NIR and Raman) data streams are not converted into real-time quality insight.",
              "Deployment under regulation: introducing machine learning into a GxP setting is difficult given 21 CFR Part 11, computer system validation (CSV), data integrity, and model-explainability expectations.",
            ],
            targetOutcomes: [
              "Real-time prediction of CQAs from in-process data, enabling Real-Time Release Testing and shorter release cycle times.",
              "Earlier detection of emerging deviations, with causal root-cause insight across raw materials, equipment, and process history.",
              "A validated, auditable, and explainable model with human-in-the-loop review and continuous drift and performance monitoring.",
            ],
            lookingFor: [
              "Use statistical and machine-learning models to identify key patterns, predict outcomes, and forecast trends from complex and time-series data.",
              "PAT integration for inline spectroscopy (NIR, Raman) and multi-source sensor fusion.",
              "A compliance-ready MLOps wrapper providing model versioning, audit trails, validation documentation, and ongoing performance monitoring aligned to GxP and 21 CFR Part 11.",
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
      // {
      //   question: "What is the maximum file size for pitch deck submission?",
      //   answer: "The maximum file size for uploaded pitch decks is 8 MB.",
      // },
      // {
      //   question: "What file formats are accepted for pitch deck submissions?",
      //   answer:
      //     "Accepted file formats will be specified on the submission portal.",
      // },
      // {
      //   question: "Can I update my application after submission?",
      //   answer:
      //     "Updates may be allowed before the application deadline. If changes are required, please contact: openinnovation@ntt-startupchallenge.com.",
      // },
      // {
      //   question:
      //     "Will I receive a confirmation after submitting my application?",
      //   answer:
      //     "Yes. Applicants will receive a confirmation email after successfully submitting their application.",
      // },
      // {
      //   question: "Can I submit my application after the deadline?",
      //   answer:
      //     "Late submissions may not be considered. Applicants are encouraged to submit before the deadline.",
      // },
      // {
      //   question: "How will startups be evaluated?",
      //   answer:
      //     "Applications will be reviewed based on how well the startup's solution matches the challenge statement. Other factors may include:",
      //   bullets: [
      //     "Relevance to the business problem",
      //     "Innovation and uniqueness of the solution",
      //     "Market readiness and maturity of the startup",
      //     "Ability to deliver or support a pilot/POC",
      //     "Strategic fit with NTT DATA and/or client needs",
      //   ],
      // },
      // {
      //   question: "Who will evaluate the applications?",
      //   answer:
      //     "Applications will be reviewed by representatives from NTT DATA and relevant industry experts.",
      // },
      // {
      //   question: "When will selected startups be notified?",
      //   answer:
      //     "Shortlisted startups will be contacted directly following the evaluation process.",
      // },
      // {
      //   question: "How many startups will be selected?",
      //   answer:
      //     "The number of selected startups may vary depending on the challenge and evaluation results.",
      // },
      // {
      //   question: "Will all applicants receive feedback?",
      //   answer:
      //     "Due to the volume of applications, individual feedback may not be provided to all applicants.",
      // },
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
      // {
      //   question: "What activities will take place during the Program?",
      //   answer:
      //     "Participants will collaborate with NTT DATA experts and enterprise stakeholders, refine their solutions, develop Proofs of Concept (PoCs), and present their ideas during the final sessions.",
      // },
      // {
      //   question: "How long is the Program?",
      //   answer:
      //     "The on-site Program will take place over three days during NTT DATA Open Innovation Week.",
      // },
      {
        question: "Can more than one representative attend from each startup?",
        answer:
          "Yes. Multiple representatives may attend, subject to participation guidelines and venue capacity.",
      },
    ],
  },
} as const;

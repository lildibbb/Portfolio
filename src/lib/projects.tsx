import { Github, Globe } from "lucide-react";
import physioconnect from "@/assets/physioconnect.png";
import smc_tradingview from "@/assets/smc_tradingview.png";
import movie_dex from "@/assets/movie_dex.png";
import task_reminder from "@/assets/task_reminder.png";
import smc_tradingview_result1 from "@/assets/smc_tradingview_result1.jpeg";
import smc_tradingview_result2 from "@/assets/smc_tradingview_result2.jpeg";
import physioconnect_findTherapist from "@/assets/physioconnect_findTherapist.png";
import invoice_cicd from "@/assets/invoice_cicd.png";
import invoice_example from "@/assets/invoice_example.png";
import invoice_sequence_diagram_auth from "@/assets/invoice_sequence_diagram_auth.png";
import invoice_sequence_diagram_flow from "@/assets/invoice_sequence_diagram_send_flow.png";
import invoice_sequence_diagram_flow2 from "@/assets/invoice_sequence_diagram_send_flow2.png";
import invoice_sequence_diagram_store from "@/assets/invoice_sequence_diagram_send_store.png";
import invoice_sequence_diagram_decrypt from "@/assets/invoice_sequence_diagram_send_decrypt.png";
import invoice_api from "@/assets/invoice_api.png";
import homelab_infra from "@/assets/homelab_infra.png";
import type { ReactNode } from "react";

export interface WikiSection {
  title: string;
  id: string;
  content: string;
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  dates: string;
  tags: string[];
  image: string;
  links: {
    icon: ReactNode;
    type: string;
    href: string;
  }[];
  content: string;
  wikiSections?: WikiSection[];
}

const projects: Project[] = [
  {
    title: "Invoice API",
    slug: "invoice-api",
    description:
      "A production-grade multi-tenant invoice engine built with NestJS, designed to handle both standard invoicing and LHDN MyInvois 1.1 e-invoicing compliance.",
    dates: "2026 - Present (In Progress)",
    tags: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Keyv",
      "AWS S3",
      "MyInvois",
      "Multi-Tenant",
    ],
    image: invoice_api,
    links: [
      {
        icon: <Globe className="h-4 w-4" />,
        type: "Live Demo",
        href: "https://invoice-api-staging.adibasyraaf.com/api#",
      },
    ],
    content: `# Invoice API

This is a project I'm currently building to really push my backend logic and problem-solving skills to the next level. It's a **multi-tenant invoice engine** meant to help Malaysian businesses deal with the new **MyInvois 1.1** mandate. It handles everything from your standard "daily" invoices to the complex e-invoicing requirements set by LHDN.

![Invoice API Architecture](${invoice_api})

## Current Status
The project is still **under heavy development**. I'm progressively adding features and tightening the security logic. It’s been a great journey so far in understanding how to build systems that are actually "production-ready."

`,
    wikiSections: [
      {
        title: "Engineering & Architecture",
        id: "engineering",
        content: `
# Tech Stack
NestJS, TypeScript, PostgreSQL, Redis, BullMQ, Keyv, AWS S3, PDFKit, 

### 1. BullMQ & Concurrency Management
I use **BullMQ** for all intensive tasks. One thing I had to be careful with was **queue concurrency**. Currently, I’ve set the PDF generation to a concurrency of **2**. 
- **The Constraint:** Since my staging VM only has 2 vCPUs and 2GB of RAM, setting this higher would choke the CPU. 
- **Scalability:** The beauty of this setup is that it's vertically scalable—if I move to a higher-resource VM, I can just bump that concurrency number to handle more simultaneous generations.

### 2. High-Speed CSV Processing
I also implemented a queue for **bulk customer uploads** via CSV. 
- **Performance:** Even with a concurrency of **1**, it can process around **60,000 rows** (roughly an 8MB file) in just **3 minutes**. 
- **Hardware:** This is running on an **Intel N100 (Alder Lake)** CPU, which is surprisingly fast for a low-power chip when the logic is optimized.

`,
      },
      {
        title: "Auth & Multi-Tenancy",
        id: "auth-flow",
        content: `
# Multi-Tenant Auth Flow

Since this is a multi-tenant system, I needed a rock-solid way to handle sessions across different companies and devices.

![Auth Flow](${invoice_sequence_diagram_auth})

When you log in, the system generates two tokens:
1. **Access Token:** A standard Bearer token for the frontend.
2. **Refresh Token:** This one is set as a secure cookie and also cached in **Redis** for validation. 

I use a **JTI (JWT ID)** and a unique **Device UUID** for every session. This lets me track exactly which device is logged in and allows me to invalidate specific sessions instantly if something looks fishy.
`,
      },
      {
        title: "LHDN Credential Security",
        id: "security",
        content: `
# Secure Credential Storage

Handling LHDN digital certificates and secrets is serious business. I can't just save them in plain text. I implemented an **Envelope Encryption** strategy using **AES-256-GCM**.

### 1. The Storage Flow
![Store Credentials](${invoice_sequence_diagram_store})

When a company saves their LHDN credentials, the system generates a random **Data Encryption Key (DEK)**. We encrypt the credentials with that DEK, then encrypt the DEK itself using a **Master Key (KEK)**. 

### 2. The Decryption Flow
![Decrypt Credentials](${invoice_sequence_diagram_decrypt})

We only ever store the **encrypted DEK** and the ciphertexts in the database. When we need to talk to LHDN, we decrypt the DEK in memory, use it to get the plaintext credentials, and then immediately wipe the DEK from memory. 

**Future Plan:** I'm planning to set up a Cron job to automatically rotate the Master Key every 6 to 12 months to keep things extra secure.
`,
      },
      {
        title: "Invoice & Queue Logic",
        id: "invoice-logic",
        content: `
# The Invoicing Pipeline

I use **BullMQ** for almost all the heavy lifting. Why? Because background jobs make the app feel way faster for the user, and Redis is persistent—if the server crashes, the jobs stay in the queue and resume when things are back up.

### Standard Invoice Flow
![Invoice Flow 1](${invoice_sequence_diagram_flow})

When you "Finalize" an invoice, the API doesn't make you wait. It just puts a job in the **BullMQ worker** queue. The worker then generates the PDF in the background and saves it to **AWS S3**. You get a "Processing" response immediately, so you aren't staring at a loading spinner.

### PDF Generation Result
Here is an example of a "Normal" invoice currently generated by the system using **PDFKit**:

![smoll Generated Invoice Example](${invoice_example})

### E-Invoice & Email Flow
![Invoice Flow 2](${invoice_sequence_diagram_flow2})

For standard invoices, I have an **Email Worker** that sends the PDF via Gmail SMTP (my current dev setup). 

For the **MyInvois** side, it's a lot more complex. I have to map over 50 data fields into the specific UBL/XML format, sign it with an **X509 digital certificate**, and then ship it off to the LHDN API. It's a lot of data transformation, but using a queue ensures we can retry easily if LHDN's server is having a bad day.
`,
      },
      {
        title: "DevOps & CI/CD",
        id: "devops",
        content: `
# DevOps & Staging Setup

I’m hosting the staging environment right in my **Homelab**. 

![CI/CD Pipeline](${invoice_cicd})

### The Workflow
I self-host a **GitHub Runner** on a small LXC container (2GB RAM, 2 vCPU). It’s a bit slow—taking about 10-15 minutes to build—but it works! 
1. Push to a feature branch.
2. PR to the \`develop\` branch.
3. The runner builds a **Docker image** and deploys it to my staging VM.

### Accessing the VM
To keep things secure but accessible, I use a **Cloudflare Tunnel**. One VM **(we say this VM A)** handles the tunnel, which talks to an **Nginx** reverse proxy on another VM **(VM B)**, which finally points to the staging app **(VM C)**. I did not set any SSL in nginx config because cloudflare tunnel already handles it.
`,
      },
    ],
  },

  // 2. Homelab Infrastructure
  {
    title: "Homelab Infrastructure",
    slug: "homelab-infrastructure",
    description:
      "My personal playground running on bare metal—featuring pfSense routing, VLAN segmentation, and actual production-grade DevOps workflows.",
    dates: "Ongoing",
    tags: [
      "Proxmox",
      "pfSense",
      "VLAN",
      "Docker",
      "LXC",
      "Nginx",
      "Cloudflare Tunnel",
      "Tailscale",
      "GitHub Actions",
    ],
    image: homelab_infra,
    links: [],
    content: `# Homelab Infrastructure

My homelab is basically my personal sandbox where I get to break and build things using enterprise-level tech. I’ve set it up using Proxmox for virtualization, with pfSense handling all the heavy lifting for routing and VLANs. The goal was to mimic a real production environment while keeping it quiet and power-efficient enough to run 24/7 at home.

![Infrastructure Architecture](${homelab_infra})

## My Philosophy
I’m a big fan of **Infrastructure as Code (IaC)** and keeping things secure. I use VLANs to segment the network and rely on Tailscale and Cloudflare Tunnels so I can access my stuff from anywhere without poking holes in my firewall. It’s also the "staging ground" for my other projects, like the **Invoice API**, giving me a place to test everything before it goes live.
`,
    wikiSections: [
      {
        title: "The Hardware",
        id: "hardware",
        content: `
# The Metal

I’m running this lab on two Mini PCs hooked up to a **TP-Link SG105E managed switch**. I specifically bought this switch because it supports **802.1Q VLAN tagging**, which is the backbone of my network segmentation. It’s a small setup, but it’s got plenty of kick for what I need.

### Primary Server (pve2)
- **CPU**: Intel N100 (Alder Lake) — This chip is awesome; it only pulls about 6W but handles everything I throw at it.
- **RAM**: 16GB DDR4
- **Storage**: 500GB NVME M.2 SSD + 500GB HDD
- **Hypervisor**: **Proxmox VE**

### Secondary Server (pve1)
This is my extra compute node. It’s connected via the same switch and sits on VLAN 20, letting me distribute the workload so one machine doesn't get hammered.

### Virtualization Strategy
I use a hybrid mix to keep things lean:
- **pfSense VM**: This is the heart of the network. It handles routing, DHCP, and manages VLAN 20.
- **LXC Containers**: I use these for lightweight stuff like my Nginx proxy, GitHub runners, and Tailscale.
- **VMs**: I save these for when I need full OS control or want an extra layer of security.

**Pro-tip:** Running this entire setup 24/7 actually costs me **under RM10 a month** in electricity. It's incredibly efficient.
`,
      },
      {
        title: "Networking & Security",
        id: "networking",
        content: `
# How Things Connect

Everything in the lab sits on **VLAN 20**. I run a **pfSense VM** as my primary router and DHCP server. This is crucial because it ensures every container and VM across both Proxmox nodes stays organized and reachable. 

![Homelab Topology](${homelab_infra})

### Network Isolation
One of the main reasons for this setup was to **isolate my homelab**. By using pfSense and the managed switch, I’ve separated my lab environment from the "daily" home devices (phones, TVs, etc.). They aren't on the same IP level, so my experiments don't interfere with the rest of the house.

### Secure Remote Access
I hate port forwarding, so I use two much safer methods:

**1. Cloudflare Tunnel (Public Access)**
I run a **cloudflared** daemon in an LXC. It creates a secure, encrypted tunnel to Cloudflare’s edge, hiding my home IP and providing built-in DDoS protection.

**2. Tailscale (Private Admin Access)**
For direct management, I use **Tailscale**. It’s a mesh VPN that lets me "jump" into my lab securely from anywhere.

### Management & RDP
I also have a **Jump-Test** node. This is a Debian LXC running **XFCE**. I use it to access the pfSense GUI internally and it acts as a lightweight RDP gateway for the lab.
`,
      },
      {
        title: "Services & Containers",
        id: "services",
        content: `
# What's Running?

I try to keep things efficient by using LXC containers whenever possible. 

### My Core LXC Stack on pve2:
- **Nginx**: My traffic cop. It takes requests from the Cloudflare Tunnel and sends them to the right spot.
- **GitHub Actions Runner**: My self-hosted muscle for CI/CD.
- **Cloudflare Tunnel**: The secure bridge to the outside world.
- **Tailscale**: My private "backdoor" for management.
- **Jump-Test**: My Debian + XFCE management box for RDP and GUI tasks.

Every single one of these gets a dynamic IP from pfSense on VLAN 20, so I never have to manually mess with network configs when I spin up something new.
`,
      },
      {
        title: "DevOps & Automation",
        id: "automation",
        content: `
# CI/CD & Automation

I run my own **GitHub Actions runners** right here in the lab. This means my build and deployment workflows happen entirely on my own hardware.

### The Flow:
1. I push code to GitHub.
2. GitHub pings my self-hosted runner (LXC on pve2).
3. The runner pulls the code, builds the Docker images, and runs tests.
4. If everything passes, it deploys the update to the right VM or container.
5. pfSense handles the routing through VLAN 20 so the new version is live instantly.

### Why do it this way?
- **Zero Costs**: I’m not paying for cloud compute time.
- **Speed**: Deploying to a local staging environment is lightning fast.
- **Learning**: It’s a great way to practice production-level workflows without the expensive cloud bill.
`,
      },
    ],
  },

  // 3. Task Reminder MVP
  {
    title: "Task Reminder MVP",
    slug: "task-reminder-mvp",
    description:
      "A streamlined task management system built to handle repetitive office workflows and daily team tracking without the bloat.",
    dates: "2025",
    tags: [
      "Next.js",
      "Nest.js",
      "PostgreSQL",
      "Redis",
      "Redux",
      "PWA",
      "S3 Storage",
    ],
    image: task_reminder,
    links: [
      {
        icon: <Github className="h-4 w-4" />,
        type: "GitHub",
        href: "https://github.com/lildibbb/task-reminder-mvp",
      },
      {
        icon: <Globe className="h-4 w-4" />,
        type: "Live Demo",
        href: "https://task-reminder.adibasyraaf.com/",
      },
    ],
    content: `# Task Reminder MVP

I built this solo during my internship at Revnology. The idea actually came from the company itself—they needed a workflow system similar to GitLab but tailored for non-tech office tasks, like managing repetitive daily chores that usually get lost in the shuffle. Since I was the only dev on this, I handled everything from the initial scratchpad to final deployment.

![Task Reminder UI](${task_reminder})

## Test it Out
You can check out the live version using these credentials:
- **Email:** \`admin@example.com\`
- **Password:** \`P@ssw2rd\`
`,
    wikiSections: [
      {
        title: "Engineering & Logic",
        id: "engineering",
        content: `
# Engineering Development

## Security & Authentication (JWT + Redis)
I went with a robust JWT setup for security. Here’s the flow:
- **Access Token:** Stored in Local Storage for quick frontend access.
- **Refresh Token:** Stored as an **HTTP-only cookie** (way safer against XSS) with a 7-day TTL.
- **Server-side Validation:** I also store the refresh token in a **Redis (Keyv)** cache. 
- **The Loop:** If the access token expires, the frontend automatically requests a new one. The backend validates the cookie against the Redis entry. This ensures that even if someone tries to mess with the frontend tokens, we have a "source of truth" in the cache to kill the session if needed.

## Reminders & Event-Driven Crons
To keep people on track, I used **Cron jobs** to act as an event-driven reminder system. Every hour, the system checks for assigned tasks that haven't been touched. If a task is still "pending" after the limit, it pushes a notification through the **Service Worker**. 

Admittedly, this is resource-heavy because the Cron has to scan the status of every active task hourly, but it ensures that nothing important falls through the cracks.

## The Editor Challenge
The biggest headache was finding a text editor that supported Markdown-to-Rich-Text conversion while allowing file attachments. I ended up choosing **Tiptap**. 

It’s powerful, but the learning curve was a bit steep. I had to build a custom pipeline to:
1. Translate HTML from the editor into Markdown format.
2. Store that content as **JSONB** in PostgreSQL for flexibility.
3. Process file uploads to **S3-compatible storage**, then map those URLs back into the JSON content before saving.
`,
      },
      {
        title: "The Tech Stack & DevOps",
        id: "devops",
        content: `
# Tech Stack & Deployment

## Frontend & State
I used **Next.js** for the frontend, paired with **Redux** for global state management. Building it as a **PWA** was a priority so office staff could install it on their desktops or phones for quick access.

## Backend & Infrastructure
- **Framework:** **Nest.js** (for that clean, modular architecture).
- **Database:** **PostgreSQL** with **TypeORM**.
- **Caching:** **Redis** store for session management and speed.
- **Storage:** **S3-compatible storage** for all task attachments.

## Deployment
Everything is self-hosted on a **VPS**. I’m using **Nginx** as a reverse proxy, **Cloudflare** for SSL/security, and **PM2** to make sure the Node services stay alive 24/7 without crashing.
`,
      },
    ],
  },

  // 4. SMC Trading View
  {
    title: "SMC Multi-Timeframe TradingView",
    slug: "smc-mtf-tradingview",
    description:
      "A custom Pine Script tool for TradingView that automates Smart Money Concepts (SMC) tracking across multiple timeframes.",
    dates: "2025",
    tags: [
      "Pine Script",
      "TradingView",
      "Technical Analysis",
      "Smart Money Concepts",
    ],
    image: smc_tradingview,
    links: [
      {
        icon: <Github className="h-4 w-4" />,
        type: "GitHub",
        href: "https://github.com/lildibbb/smc-mtf-tradingview",
      },
    ],
    content: `# SMC Multi-Timeframe TradingView

I've been hanging around the crypto space since 2018—and yeah, I’m still feeling the pain of selling my BTC back then. For a long time, my strategy was basically just reading the news and hoping for the best (usually buying high and selling low in spot trading). Eventually, I realized I needed to actually learn Technical Analysis (TA). 

I built this script to help me learn **Smart Money Concepts (SMC)**. There are a million strategies out there, but you gotta pick one and stick to it. This tool helps me spot things like Order Blocks and Fair Value Gaps in real-time so I can actually understand what’s happening on the chart without getting overwhelmed.

![Trading View Chart](${smc_tradingview})

## Reality Check (TL;DR)
Just a heads up: I don't follow this script blindly, and neither should you. It’s a learning tool, not a money printer. Based on my testing, it has roughly a **40-60% win rate**. Always do your own research (DYOR).

![smoll result 1](${smc_tradingview_result1}) ![smoll result 2](${smc_tradingview_result2})
`,
    wikiSections: [
      {
        title: "How it works",
        id: "how-it-works",
        content: `
# How it works

The script is basically a "detective" for your charts. It looks at a Higher Timeframe (like the 4H) to find the overall trend and then waits for a setup on a Lower Timeframe (like the 15M).

### The Simple Logic:
1.  **Finding the Bias**: It checks the EMAs and Market Structure (Higher Highs/Lower Lows) on the big timeframe to see if we are bullish or bearish.
2.  **Spotting the Zones**: It automatically draws boxes for **Order Blocks (OB)**—where big players might be entering—and **Fair Value Gaps (FVG)**—where price moved so fast it left a hole.
3.  **The Trigger**: It looks for an "Engulfing" candle (a big energetic move) and RSI confirmation before showing a signal.
4.  **Risk Management**: It even calculates where your Stop Loss and Take Profit should be based on the structure, so you don't have to guess.
`,
      },
    ],
  },

  // 5. PhysioConnect
  {
    title: "PhysioConnect",
    slug: "physioconnect",
    description:
      "A complete booking system for physiotherapy. Helps clinics manage appointments, track patient recovery, and skip the manual paperwork.",
    dates: "2024",
    tags: [
      "React",
      "TypeScript",
      "Shadcn",
      "Tailwind CSS",
      "Bun.js",
      "Elysia.js",
      "PWA",
    ],
    image: physioconnect,
    links: [
      {
        icon: <Github className="h-4 w-4" />,
        type: "GitHub",
        href: "https://github.com/lildibbb/Physiotherapy-Treatment-Booking-System",
      },
      {
        icon: <Globe className="h-4 w-4" />,
        type: "Live Demo",
        href: "https://physioconnect.adibasyraaf.com/",
      },
    ],
    content: `# PhysioConnect

This was actually my Final Year Project (FYP). Originally, I wanted to build a general medical system, but after a chat with my supervisor, he suggested focusing specifically on physiotherapy. That’s how the idea started—building something for people who need physio sessions but can’t always make it to a clinic or hospital.

![PhysioConnect Dashboard](${physioconnect})

## The Concept
Think of it as a bridge between therapists and patients. Patients can jump on, pick a therapist, check out their rates, and book a slot. Instead of just a booking tool, it’s a full support system where therapists assist through video calls (GMeet), tutorials, and step-by-step guides to make sure the recovery stays on track at home.

![Find a Therapist](${physioconnect_findTherapist})
`,
    wikiSections: [
      {
        title: "Engineering & Tech",
        id: "engineering",
        content: `
# Engineering & Development

## Tech Stack
For the backend, I went with **Elysia.js** running on **Bun**. I chose this because Bun is honestly a beast compared to the traditional Node ecosystem—it’s faster and has great [Node compatibility](https://bun.com/docs/runtime/nodejs-compat). On the frontend, I used **React with TanStack** for that smooth, type-safe developer experience.

## Architecture: The Decoupled Monolith
Instead of a traditional "all-in-one" setup, I built this as a **Decoupled Monolith**. 



- **The "Brain" (Elysia.js Backend):** All the logic—like handling payments, checking therapist availability, and managing patient data—lives in one solid backend "engine".
- **The "Face" (React Frontend):** The frontend is its own separate project. It doesn't care how the data is processed; it just cares about showing a smooth UI to the user.

### Why use a REST API?
To let these two "talk" to each other, I used a **REST API**. 
- **Stateless & Fast:** Every time the frontend needs something (like a list of therapists), it sends a request to a specific URL (an endpoint). The backend sends back exactly what’s needed in JSON format.
- **Clean Separation:** This made it way easier to debug. If the UI looks weird, I check the React code; if the data isn't saving, I check the Elysia code. They don't get in each other's way.
- **Future Proof:** Because the backend is a REST API, I could easily build a native mobile app later that uses the exact same data engine without changing a single line of backend code.
## Why PWA?
I decided to go with a **Progressive Web App (PWA)** mainly to save development time while staying cross-platform. It’s the best of both worlds: people can use it in a browser or "install" it on their phones so it feels like a native app. I used **Service Workers** to handle caching, which is a lifesaver for users with slow internet since it reduces the need to re-download assets constantly.

## Payment with Stripe
When it came to handling money, I looked at a few providers like toyyibPay, but ended up choosing **Stripe**. Their documentation is top-tier and it's a platform people actually trust. I integrated the **Stripe Checkout** flow to handle payments securely, so I don't have to worry about the heavy lifting of PCI compliance.
`,
      },
      {
        title: "DevOps & Hosting",
        id: "devops",
        content: `
# DevOps & Deployment

I’m currently hosting this on a **Digital Ocean Droplet** (2 vCPU, 4GB RAM). It usually costs around $18/month, but thanks to the [GitHub Student Developer Pack](https://education.github.com/pack), I managed to snag $200 in credits to keep it running for free while I test things out.

The setup is pretty straightforward:
- **Server:** Ubuntu (I used the GNOME GUI version because I prefer a visual setup).
- **Web Server:** Nginx is configured as a reverse proxy to point traffic to the Droplet's IP.
- **Security:** Used **Let’s Encrypt** for free SSL certificates.
- **Domain:** Grabbed a free domain from **Namecheap** (another win from the Student Pack!).
`,
      },
    ],
  },

  // 6. MovieDex (Oldest)
  {
    title: "MovieDex",
    slug: "movie-dex",
    description:
      "A social platform for movie lovers. Rate, review, and discover films. Like Goodreads, but for movies.",
    dates: "2024",
    tags: ["React", "Laravel", "MySQL"],
    image: movie_dex,
    links: [
      {
        icon: <Github className="h-4 w-4" />,
        type: "GitHub",
        href: "https://github.com/kyziq/movie-dex-web-backend",
      },
    ],
    content: `# MovieDex

A place to rant about bad endings or praise cinematic masterpieces. MovieDex allows users to rate and review movies they've watched.

![MovieDex](${movie_dex})
`,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export default projects;

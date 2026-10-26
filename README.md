# CodeAlpha Phishing Awareness Training Platform (`PhishShield`)

**Organization:** CodeAlpha Cyber Security Internship  
**Internship ID:** CA/DF1/324898  
**Student:** Chipasha Cosmas  
**Degree:** Bachelor of Science in Cybersecurity — Kwame Nkrumah University (KMU), Zambia  
**Task 02:** Phishing Awareness Training  

---

## 1. Project Overview

**PhishShield** is an interactive, web-based cybersecurity education platform designed to train employees, cybersecurity students, and IT professionals to identify, analyze, and defend against modern phishing attacks and social engineering deception.

This project was built to fulfill **CodeAlpha Cyber Security Internship Task 02**:
- Create a presentation or online module focused on phishing attacks.
- Explain how to recognize phishing emails and deceptive/fake websites.
- Educate about social engineering tactics utilized by threat actors.
- Provide defensive best practices and countermeasures.
- Include real-world case studies and interactive quizzes for active engagement.
- Upload complete source code to a repository named `CodeAlpha_ProjectName`.

---

## 2. Key Architecture & Training Features

```text
CodeAlpha_PhishingAwarenessTraining/
├── index.html         # Single-Page Interactive Training Application
├── styles.css         # Modern, responsive design system with dark/light themes
├── app.js             # Simulation engine, clue inspectors, quiz logic & cert generator
├── presentation.md    # 11-Slide formal enterprise presentation deck & speaker notes
└── README.md          # Comprehensive technical documentation & setup guide
```

### Core Training Pillars

### 1. 📘 Four Foundational Learning Modules
- **Module 1: Taxonomy of Social Engineering:** Spear phishing, whaling (CEO fraud), smishing (SMS), vishing (AI voice clones), clone phishing, and Business Email Compromise (BEC).
- **Module 2: Psychological Attack Vectors:** Exploitation of artificial urgency, authority impersonation, fear/coercion, greed, and curiosity.
- **Module 3: Email Anatomy & Header Forensics:** Display name spoofing, Reply-To redirection, and the email authentication triad (`SPF`, `DKIM`, `DMARC`).
- **Module 4: Deceptive URL Mechanics & Evasion:** Subdomain trickery, typosquatting, Internationalized Domain Name (IDN) homoglyphs, and Adversary-in-the-Middle (AitM) reverse proxies.

### 2. 🔬 PhishLab: Interactive Email Inspection Sandbox
- **Scenario 1:** *Microsoft 365 Credential Harvester* — Detect lookalike domains, Russian TLDs, artificial urgency, and SPF/DKIM failures.
- **Scenario 2:** *CEO Urgent Wire Transfer (Whaling/BEC)* — Detect display name spoofing, ProtonMail drop inboxes, bypassing financial controls, and dangerous `.pdf.exe` attachments.
- **Scenario 3:** *Legitimate HR Benefit Enrollment* — Inspect clean internal exchange headers, verified DKIM signatures, and genuine intranet paths.
- **Interactive Tooling:**
  - Real-time link destination inspection on hover.
  - Interactive clickable red-flag discovery chips.
  - Raw RFC 822 Internet Header inspector toggle.
  - "Report as Phishing" vs. "Mark as Legitimate" classification engine with feedback.

### 3. 🧠 10-Question Knowledge Assessment & Certification Engine
- Ten rigorous questions covering URL anatomy, emotional exploitation, email headers, AitM proxies, smishing, and FIDO2 Passkeys.
- Dynamic scoring with immediate technical rationales for every answer.
- **Verified Certificate of Completion:** Scoring 80%+ unlocks a personalized, printable Certificate of Completion for **Chipasha Cosmas** (Intern ID: `CA/DF1/324898`). Includes dedicated print media stylesheet for one-click PDF export!

### 4. 📊 Real-World Breach Case Studies
- **FACC Aerospace ($61M):** BEC CEO fraud leading to executive termination.
- **Colonial Pipeline ($4.4M):** Single legacy VPN credential phishing causing shutdown of 5,500 miles of fuel supply.
- **Twilio & Uber:** Smishing combined with MFA push-fatigue attacks.

### 5. 🛡️ Enterprise Incident Response Playbook (SOP)
- Step-by-step actions if a user clicks a malicious link or enters credentials:
  1. System isolation (unplug network, do not power off).
  2. Out-of-band reporting to IT/SOC.
  3. Credential invalidation, session token revocation, and MFA audit.
  4. Message RFC 822 `.eml` header extraction for SOC perimeter blocklisting.

### 6. 📑 Presentation Deck (`presentation.md`)
- Ready-to-present 11-slide presentation complete with speaker notes, statistics, and organizational takeaways.

---

## 3. How to Run & Use the Training Platform

The platform requires **no complex frameworks or server setups**. It runs natively in any modern web browser.

### Option 1: Direct Browser Launch
1. Clone or download this repository.
2. Double-click **`index.html`** or right-click ➔ **Open with** (Google Chrome, Microsoft Edge, Mozilla Firefox, or Brave).

### Option 2: Local HTTP Server (Python)
```bash
cd CodeAlpha_PhishingAwarenessTraining
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

---

## 4. Screenshot Walkthrough

| Feature | Description |
|---|---|
| **Dark / Light Mode** | Sleek cybersecurity neon aesthetic with responsive mobile/desktop layouts. |
| **PhishLab Simulator** | Live email client interface with link hover tooltips and raw header inspection. |
| **Quiz & Certificate** | Real-time score tracking, immediate feedback, and exportable certificate preview. |

---

## 5. Security & Ethical Disclaimer

All scenarios, simulated domains, and mock headers contained within this repository are crafted exclusively for educational, defensive, and security awareness training purposes. No malicious code or active exploit kits are hosted.

---
*Maintained by Chipasha Cosmas — Cybersecurity Student, KMU Zambia.*

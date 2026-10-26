# Phishing Awareness & Social Engineering Defense Training
## Enterprise Security Education & Practical Countermeasures
**CodeAlpha Cyber Security Internship — Task 02: Presentation Deck**  
**Presenter:** Chipasha Cosmas  
**Degree:** Bachelor of Science in Cybersecurity — Kwame Nkrumah University (KMU), Zambia  
**Internship ID:** CA/DF1/324898  

---

## Slide 1: Title & Executive Overview
- **Header:** Defending the Human Perimeter: Phishing Awareness & Threat Mitigation
- **Subtitle:** Recognizing Cognitive Exploitation, Deceptive URLs, and Advanced Social Engineering
- **Presenter:** Chipasha Cosmas · Cybersecurity Intern, CodeAlpha
- **Target Audience:** All Enterprise Employees, IT Staff, and Financial Officers
- **Key Message:** Modern cyberattacks rarely breach firewalls directly; they exploit human trust. 82% of all breaches involve a human element.

---

## Slide 2: The Evolving Phishing Threat Landscape
- **Daily Volume:** Over 3.4 billion deceptive emails are dispatched across global networks daily.
- **Root Cause of Breaches:** 91% of successful enterprise data breaches begin with a spear-phishing attack.
- **Average Cost of Breach:** $4.91 Million (IBM Cost of a Data Breach Report 2024).
- **Core Vector:** Credential harvesting (36%) followed by ransomware drop (28%) and financial diversion (21%).

---

## Slide 3: Taxonomy of Social Engineering Attacks
- **Spear Phishing:** Surgical, intelligence-driven attacks targeting designated employees utilizing OSINT from LinkedIn and corporate websites.
- **Whaling / CEO Fraud:** Deceptions targeting senior leadership or individuals with treasury transfer authorities.
- **Smishing (SMS Phishing):** Deceptive text messages exploiting short attention spans on mobile devices.
- **Vishing (Voice / AI Deepfakes):** Audio impersonation of trusted executives, vendors, or IT support requesting credential resets or MFA bypass.
- **Clone Phishing:** Taking an authentic prior email thread, modifying the link or attachment, and re-sending it from a spoofed domain.

---

## Slide 4: The Psychology of Deception
Threat actors weaponize basic human psychological triggers to force hasty decisions:
1. **Artificial Urgency:** *"Account suspension in 60 minutes."*
2. **Authority:** Posing as the CEO, Legal, or Federal Tax Authorities.
3. **Fear & Coercion:** Fabricated security alerts, HR infractions, or legal subpoena threats.
4. **Greed & Reward:** Unexpected bonus checks, promotional gift cards, or cryptocurrency grants.
5. **Helpfulness & Curiosity:** Internal surveys or package tracking links.

---

## Slide 5: Anatomy of a Phishing Email (Header Analysis)
- **Display Name Spoofing:** The name says `"Microsoft Support"`, but the SMTP header shows `<support@alert-microsoft-verify.ru>`.
- **Mismatched Reply-To:** Directing user responses away from the displayed sender into an attacker-controlled drop mailbox.
- **SPF (Sender Policy Framework):** Verifies if the sending mail server IP is authorized by the domain's DNS TXT record.
- **DKIM (DomainKeys Identified Mail):** Cryptographic signature ensuring message integrity in transit.
- **DMARC:** Alignment policy instructing mail servers how to treat messages failing SPF or DKIM (`none`, `quarantine`, or `reject`).

---

## Slide 6: Deceptive URL Mechanics & Inspection
Never trust the blue clickable text; inspect the destination address:
- **Subdomain Trickery:** `https://login.microsoft.com.auth-token-harvest.net` (The real domain is the last segment before the first single slash!).
- **Typosquatting:** Subtle letter swaps (e.g., `rnicrosoft.com` using 'r' and 'n' to simulate 'm', or `paypa1.com` using numeral '1').
- **Homograph IDN Attacks:** Utilizing Cyrillic characters that render identically to Latin characters on modern screens.
- **Adversary-in-the-Middle (AitM):** Reverse proxies (like Evilginx) that capture active session tokens even when MFA is enabled.

---

## Slide 7: Malicious Attachments & Payload Delivery
- **Double Extensions:** `Q4_Financial_Report.pdf.exe` (Windows hides known extensions by default).
- **Macro-Enabled Documents:** Word and Excel files (`.docm`, `.xlsm`) containing automated VBA scripts that download second-stage payloads.
- **Container Formats:** `.iso`, `.img`, `.vhd`, and `.zip` archives designed to slip past basic gateway antivirus filters.
- **Golden Rule:** Never enable macros or execute unsolicited archive attachments.

---

## Slide 8: Real-World Case Studies
1. **FACC Aerospace ($61 Million):** CEO fraud email convinced accounting to transfer millions into foreign acquisition accounts. Led to termination of CEO and CFO.
2. **Colonial Pipeline ($4.4 Million Ransom):** Single compromised legacy VPN password obtained through credential phishing shut down East Coast fuel supply.
3. **Twilio & Uber (MFA Fatigue):** Attackers sent SMS phishing links followed by repeated MFA push notifications until employees clicked "Accept".

---

## Slide 9: Defensive Playbook & The "SLT" Rule
Before clicking or responding, apply the **SLT Protocol**:
- **S — Sender:** Check the raw email address, not just the display name. Check the domain spelling.
- **L — Links:** Hover before clicking. Does the URL match the verified company domain?
- **T — Tone & Topic:** Is there artificial urgency, pressure for secrecy, or unusual financial requests?

---

## Slide 10: Standard Operating Procedure (SOP) If Compromised
1. **Disconnect Instantly:** Unplug Ethernet or disconnect Wi-Fi. Do not power off (preserves memory forensics).
2. **Out-of-Band Reporting:** Call the SOC / IT Helpdesk from a phone or in person.
3. **Session Invalidation:** Revoke all cloud tokens and reset credentials from an uncompromised machine.
4. **Header Export:** Export the original message as an `.eml` file attachment for SOC threat analysis and perimeter blocklisting.

---

## Slide 11: Summary & Interactive Training Platform
- Hands-on practice makes awareness permanent.
- Explore the **PhishShield Interactive Training Platform**:
  - Live PhishLab Email Inspector
  - 10-Question Technical Knowledge Assessment
  - Verified Certificate of Completion Generator

---
*Created by Chipasha Cosmas · CodeAlpha Cyber Security Internship CA/DF1/324898*

/**
 * PhishShield — Interactive Phishing Awareness Training Platform
 * CodeAlpha Cyber Security Internship — Task 02
 * Author: Chipasha Cosmas | ID: CA/DF1/324898
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Navigation Tab Switching
  // =========================================================================
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      navButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`pane-${targetTab}`);
      if (targetPane) {
        targetPane.classList.add('active');
        window.scrollTo({ top: targetPane.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // 2. Light / Dark Theme Toggle
  // =========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  let currentTheme = localStorage.getItem('phishshield_theme') || 'dark';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggle.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.textContent = '🌙';
    }
    localStorage.setItem('phishshield_theme', theme);
  }

  applyTheme(currentTheme);

  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
  });

  // =========================================================================
  // 3. PhishLab Simulator Engine
  // =========================================================================
  const scenarios = [
    {
      id: 0,
      title: "Scenario 1: M365 Security Alert",
      isPhishing: true,
      from: '"Microsoft 365 Security Team" <no-reply@security-alert-microsoft365-verify.com>',
      replyTo: 'credential-drop@attacker-server-box.net',
      subject: 'CRITICAL: Your Microsoft 365 Password Expires in 2 Hours (Action Required)',
      rawHeaders: `Received: from mail.attacker-server-box.net (185.220.101.5) by mail.enterprise-corp.com
From: "Microsoft 365 Security Team" <no-reply@security-alert-microsoft365-verify.com>
Reply-To: credential-drop@attacker-server-box.net
To: chipasha.cosmas@enterprise-corp.com
Subject: CRITICAL: Your Microsoft 365 Password Expires in 2 Hours (Action Required)
Date: Mon, 26 Oct 2026 09:14:22 +0200
Authentication-Results: spf=fail (sender IP is not authorized); dkim=fail; dmarc=fail
X-Spam-Flag: YES (Pre-quarantine)`,
      body: `
        <p>Dear Valued Employee,</p>
        <p>Your enterprise Microsoft 365 password will expire today in <strong>2 hours</strong>. To maintain uninterrupted access to Outlook, Teams, and SharePoint, you must immediately retain your current credentials.</p>
        <p style="margin: 20px 0;">
          <a href="#" class="phish-link" data-destination="http://login.microsoft.com.auth-token-harvest.ru/login.php" onclick="event.preventDefault();">👉 Click Here to Keep Current Password & Retain Access</a>
        </p>
        <p style="font-size: 0.85rem; color: #94a3b8;">
          Failure to complete verification will result in immediate mailbox suspension per IT Security Policy 8.4.<br>
          <em>Microsoft Cloud Security Operations · Automated Notification</em>
        </p>
      `,
      clues: [
        { text: "Lookalike Domain: security-alert-microsoft365-verify.com", desc: "Microsoft never sends alerts from third-party hyphenated domains." },
        { text: "Reply-To Mismatch: attacker-server-box.net", desc: "Replies are directed to an external anonymous inbox." },
        { text: "Deceptive Link: Subdomain trickery ending in .ru", desc: "The link text says Microsoft, but the actual destination is a Russian TLD credential harvester." },
        { text: "Artificial Urgency: 'Expires in 2 Hours'", desc: "Creates panic to bypass rational analysis." },
        { text: "SPF / DKIM / DMARC Failures", desc: "Raw headers prove the email failed all cryptographic identity checks." }
      ],
      explanation: "This is a classic credential harvesting phishing attack. The sender domain is spoofed, the link directs to a Russian reverse proxy harvesting page, and the sense of artificial urgency is designed to induce hasty action without consulting IT."
    },
    {
      id: 1,
      title: "Scenario 2: CEO Urgent Wire Transfer",
      isPhishing: true,
      from: '"Alexander Vance (Chief Executive Officer)" <ceo.office.vance@mail-exec-portal.org>',
      replyTo: 'finance-director-offshore@protonmail.com',
      subject: 'URGENT & CONFIDENTIAL: Acquisition Closing Payment Required Today',
      rawHeaders: `Received: from relay-host.protonmail.com (185.70.41.12) by mail.enterprise-corp.com
From: "Alexander Vance (Chief Executive Officer)" <ceo.office.vance@mail-exec-portal.org>
Reply-To: finance-director-offshore@protonmail.com
To: chipasha.cosmas@enterprise-corp.com
Subject: URGENT & CONFIDENTIAL: Acquisition Closing Payment Required Today
Date: Mon, 26 Oct 2026 10:22:15 +0200
Authentication-Results: spf=softfail; dkim=none; dmarc=none
X-Priority: 1 (Highest)`,
      body: `
        <p>Chipasha,</p>
        <p>I am currently locked in confidential negotiations for an offshore infrastructure acquisition and cannot take phone calls. We need to release a retainer deposit of <strong>$48,500</strong> before close of business today to secure the exclusivity rights.</p>
        <p>Please review the attached wire authorization voucher immediately. Due to strict NDA requirements, <strong>do not mention this to anyone on the accounting team</strong> until the public press release tomorrow morning.</p>
        <p style="margin: 18px 0;">
          <a href="#" class="phish-link" data-destination="http://secure-file-vault-cdn.net/download?id=Voucher_Wire_48500.pdf.exe" onclick="event.preventDefault();">📎 Download Voucher_Wire_48500.pdf.exe (Encrypted PDF)</a>
        </p>
        <p>Confirm once initiated.<br><br><strong>Alexander Vance</strong><br>Chief Executive Officer · Enterprise Corp</p>
      `,
      clues: [
        { text: "Display Name Spoofing: mail-exec-portal.org", desc: "The CEO's legitimate address is @enterprise-corp.com, not an external .org domain." },
        { text: "Reply-To Redirection: ProtonMail drop", desc: "Attacker directs responses to an anonymous ProtonMail account." },
        { text: "Secrecy & Control Bypass: 'Do not tell accounting'", desc: "Deliberate tactic to avoid standard dual-authorization financial controls." },
        { text: "Dangerous Double Extension: .pdf.exe", desc: "The attachment is an executable binary masquerading as a PDF document." },
        { text: "Unavailability Pretext: 'Cannot take phone calls'", desc: "Prevents out-of-band phone verification." }
      ],
      explanation: "This is a Business Email Compromise (BEC) / Whaling attack. It leverages CEO authority, enforced secrecy, and an executable trojan disguised as a PDF wire voucher."
    },
    {
      id: 2,
      title: "Scenario 3: Internal HR Benefit Update",
      isPhishing: false,
      from: '"Enterprise Human Resources" <hr-benefits@enterprise-corp.com>',
      replyTo: 'hr-benefits@enterprise-corp.com',
      subject: 'Annual Open Enrollment Period: Review Your 2027 Healthcare Benefits',
      rawHeaders: `Received: from internal-exchange.enterprise-corp.com (10.0.1.15) by mail.enterprise-corp.com
From: "Enterprise Human Resources" <hr-benefits@enterprise-corp.com>
Reply-To: hr-benefits@enterprise-corp.com
To: chipasha.cosmas@enterprise-corp.com
Subject: Annual Open Enrollment Period: Review Your 2027 Healthcare Benefits
Date: Mon, 26 Oct 2026 08:30:00 +0200
Authentication-Results: spf=pass (internal authorized sender); dkim=pass (key=corp2026); dmarc=pass
DKIM-Signature: v=1; a=rsa-sha256; d=enterprise-corp.com; s=corp2026`,
      body: `
        <p>Dear Chipasha,</p>
        <p>The annual Open Enrollment window for 2027 healthcare and wellness benefits is now officially open through November 15, 2026.</p>
        <p>You can review policy updates, plan comparisons, and adjust your contribution percentages directly inside the corporate intranet self-service portal:</p>
        <p style="margin: 18px 0;">
          <a href="#" class="phish-link" data-destination="https://intranet.enterprise-corp.com/hr/benefits/2027" onclick="event.preventDefault();">🔗 Open Corporate Intranet: 2027 Benefits Guide</a>
        </p>
        <p>If you have any questions, our HR support desk is available at extension <strong>4420</strong> or during open office hours on Wednesday.</p>
        <p>Best regards,<br><strong>Enterprise Corp Human Resources Department</strong></p>
      `,
      clues: [
        { text: "Legitimate Corporate Domain: enterprise-corp.com", desc: "Sender domain exactly matches internal organization identity." },
        { text: "Matching Reply-To Header", desc: "Responses return to the legitimate HR inbox." },
        { text: "SPF, DKIM, and DMARC: All PASS", desc: "Cryptographic validation proves email originated from internal Exchange servers." },
        { text: "Genuine Intranet Link: intranet.enterprise-corp.com", desc: "URL resolves to the legitimate internal corporate portal using HTTPS." },
        { text: "No Manufactured Panic or Urgency", desc: "Generous 3-week deadline with verified internal phone extension for questions." }
      ],
      explanation: "This is a legitimate internal corporate communication. All cryptographic authentication checks pass, links point to internal corporate domains, and normal communication channels are referenced."
    }
  ];

  let currentScenarioIdx = 0;
  const simSelectors = document.querySelectorAll('.sim-selector');
  const btnToggleHeaders = document.getElementById('btn-toggle-headers');
  const rawHeadersBox = document.getElementById('raw-headers-box');
  const rawHeadersContent = document.getElementById('raw-headers-content');
  const emailFrom = document.getElementById('email-from');
  const emailReplyTo = document.getElementById('email-replyto');
  const emailSubject = document.getElementById('email-subject');
  const emailBodyContent = document.getElementById('email-body-content');
  const cluesList = document.getElementById('clues-list');
  const btnReportPhish = document.getElementById('btn-report-phish');
  const btnMarkLegit = document.getElementById('btn-mark-legit');
  const simFeedback = document.getElementById('sim-feedback');

  function renderScenario(idx) {
    currentScenarioIdx = idx;
    const scen = scenarios[idx];

    simSelectors.forEach((btn, i) => {
      btn.classList.toggle('active', i === idx);
    });

    emailFrom.textContent = scen.from;
    emailReplyTo.textContent = scen.replyTo;
    emailSubject.textContent = scen.subject;
    emailBodyContent.innerHTML = scen.body;
    rawHeadersContent.textContent = scen.rawHeaders;

    // Reset UI state
    rawHeadersBox.classList.remove('visible');
    btnToggleHeaders.textContent = "Toggle Raw Headers ⬍";
    simFeedback.className = "sim-feedback";
    simFeedback.style.display = "none";
    simFeedback.innerHTML = "";

    // Render Clues
    cluesList.innerHTML = "";
    scen.clues.forEach(clue => {
      const chip = document.createElement('div');
      chip.className = 'clue-chip';
      chip.textContent = `🔍 ${clue.text}`;
      chip.title = "Click to inspect explanation";
      chip.addEventListener('click', () => {
        chip.classList.toggle('revealed');
        if (chip.classList.contains('revealed')) {
          chip.textContent = `⚠️ ${clue.desc}`;
        } else {
          chip.textContent = `🔍 ${clue.text}`;
        }
      });
      cluesList.appendChild(chip);
    });
  }

  simSelectors.forEach((btn, idx) => {
    btn.addEventListener('click', () => renderScenario(idx));
  });

  btnToggleHeaders.addEventListener('click', () => {
    rawHeadersBox.classList.toggle('visible');
    btnToggleHeaders.textContent = rawHeadersBox.classList.contains('visible') 
      ? "Hide Raw Headers ⬎" 
      : "Toggle Raw Headers ⬍";
  });

  function evaluateScenario(userSaidPhish) {
    const scen = scenarios[currentScenarioIdx];
    const isCorrect = userSaidPhish === scen.isPhishing;

    simFeedback.style.display = "block";
    simFeedback.className = `sim-feedback visible ${isCorrect ? 'correct' : 'incorrect'}`;

    if (isCorrect) {
      simFeedback.innerHTML = `
        <strong>🎯 EXCELLENT ANALYSIS! Your assessment is 100% correct.</strong><br>
        ${scen.explanation}
      `;
    } else {
      simFeedback.innerHTML = `
        <strong>⚠️ CAUTION! Incorrect assessment.</strong><br>
        This email was <strong>${scen.isPhishing ? "a malicious phishing attack" : "a safe and legitimate message"}</strong>.<br>
        ${scen.explanation}
      `;
    }
  }

  btnReportPhish.addEventListener('click', () => evaluateScenario(true));
  btnMarkLegit.addEventListener('click', () => evaluateScenario(false));

  renderScenario(0);


  // =========================================================================
  // 4. Knowledge Assessment Quiz Engine (10 Questions)
  // =========================================================================
  const quizQuestions = [
    {
      title: "Question 1: Deceptive URL Analysis",
      scenario: "You receive an email prompting you to log into PayPal to dispute an unauthorized charge. The link in the email shows: 'http://paypal.com.customer-support-portal.cc/dispute'. What does this domain actually indicate?",
      options: [
        "It is a legitimate PayPal customer support website hosted in the .cc country code.",
        "It is an attacker-controlled domain (customer-support-portal.cc) using 'paypal.com' as a deceptive subdomain prefix.",
        "It is an encrypted internal redirection portal managed by PayPal.",
        "The URL is safe because it contains the exact keyword 'paypal.com'."
      ],
      correctIndex: 1,
      explanation: "Domains are read from right to left before the path. In 'paypal.com.customer-support-portal.cc', the registered domain is 'customer-support-portal.cc', and 'paypal.com' is merely an attacker-created subdomain designed to fool superficial inspection."
    },
    {
      title: "Question 2: Psychological Social Engineering Tactics",
      scenario: "An email marked 'HIGH IMPORTANCE' arrives from 'IT Helpdesk' claiming your account will be deleted within 30 minutes unless you verify your password. Which psychological trigger is being exploited?",
      options: [
        "Curiosity and technical interest.",
        "Artificial urgency and fear of consequence to bypass critical thinking.",
        "Reciprocity and professional obligation.",
        "Altruism and community support."
      ],
      correctIndex: 1,
      explanation: "Phishers rely on artificial deadlines and severe threats (account deletion, law enforcement, financial loss) to induce cognitive overload, causing victims to act impulsively before verifying authenticity."
    },
    {
      title: "Question 3: Email Authentication Headers",
      scenario: "When examining raw email headers, which of the following authentication results provides cryptographic proof that the email body has not been altered in transit?",
      options: [
        "SPF (Sender Policy Framework)",
        "DKIM (DomainKeys Identified Mail)",
        "SMTP HELO string",
        "X-Mailer tag"
      ],
      correctIndex: 1,
      explanation: "DKIM attaches a cryptographic digital signature to the email header and body using private/public key pairs, mathematically verifying that the message was not modified in transit."
    },
    {
      title: "Question 4: Business Email Compromise (BEC)",
      scenario: "An urgent email from the company CFO asks you to bypass standard procurement procedures and wire $75,000 to a new supplier today due to an 'urgent supplier embargo'. What is the mandatory immediate action?",
      options: [
        "Quickly reply to the email asking the CFO to confirm the routing number.",
        "Execute the wire transfer immediately, then notify the CFO afterwards.",
        "Verify the request out-of-band using an authorized, pre-established phone number or in-person confirmation.",
        "Forward the wire instructions to all employees to warn them."
      ],
      correctIndex: 2,
      explanation: "Never verify high-risk or financial requests using the reply button of a suspect email. Always perform an out-of-band verification using a known trusted phone number or in-person consultation."
    },
    {
      title: "Question 5: MFA & Reverse Proxy Attacks (AitM)",
      scenario: "An attacker uses an Adversary-in-the-Middle (AitM) reverse proxy (such as Evilginx). What critical security asset can they steal even if the user successfully enters an SMS or Authenticator TOTP code?",
      options: [
        "The user's computer BIOS master password.",
        "The active authenticated HTTP session cookie token.",
        "The corporate firewall firmware encryption keys.",
        "The user's local operating system Kerberos ticket."
      ],
      correctIndex: 1,
      explanation: "AitM reverse proxies sit between the user and the real authentication server. When the user completes authentication (including MFA), the proxy captures the session cookie, allowing the attacker to replay the cookie and bypass MFA entirely."
    },
    {
      title: "Question 6: Malicious File Attachments",
      scenario: "You receive an invoice email containing an attachment named 'Quarterly_Invoice_Oct2026.pdf.exe'. What security danger does this represent?",
      options: [
        "It is a legitimate encrypted PDF document requiring an executable viewer.",
        "It is an executable malware program utilizing a double extension to disguise itself as a benign PDF.",
        "It is an Adobe Acrobat proprietary patch file.",
        "It is a standard compressed archive."
      ],
      correctIndex: 1,
      explanation: "Operating systems often hide known extensions by default. Attackers append '.pdf.exe' so that victims only see '.pdf', tricking them into executing arbitrary malicious binaries."
    },
    {
      title: "Question 7: Smishing (SMS Phishing)",
      scenario: "You receive an SMS text on your personal phone: 'USPS: Package ID #94001 cannot be delivered due to missing house number. Update address at usps-track-package-us.vip within 12 hours.' What attack form is this?",
      options: [
        "Vishing (Voice Phishing)",
        "Smishing (SMS Phishing)",
        "Watering Hole attack",
        "Dumpster Diving"
      ],
      correctIndex: 1,
      explanation: "Smishing is the use of deceptive SMS text messages containing malicious links or phone numbers to harvest credentials, addresses, or credit card details."
    },
    {
      title: "Question 8: Homograph (IDN) Domain Spoofing",
      scenario: "In an Internationalized Domain Name (IDN) homograph attack, how do threat actors deceive visually vigilant users?",
      options: [
        "By hacking the root DNS servers to rewrite IP addresses.",
        "By replacing Latin letters with visually indistinguishable characters from other alphabets (such as Cyrillic 'а' for Latin 'a').",
        "By changing the background color of the browser address bar.",
        "By sending the email in Morse code."
      ],
      correctIndex: 1,
      explanation: "Homograph attacks abuse Unicode characters from different scripts (Cyrillic, Greek) that look identical to standard Latin characters to register lookalike domains that fool the human eye."
    },
    {
      title: "Question 9: Phishing-Resistant Authentication",
      scenario: "Which Multi-Factor Authentication (MFA) standard is considered cryptographically 'phishing-resistant' by CISA and NIST?",
      options: [
        "SMS one-time passcodes (OTP)",
        "Voice call passcodes",
        "FIDO2 / WebAuthn Hardware Security Keys (Passkeys)",
        "Security challenge questions (e.g. mother's maiden name)"
      ],
      correctIndex: 2,
      explanation: "FIDO2 / WebAuthn binds cryptographic authentication directly to the legitimate website's TLS origin domain in the browser, making it mathematically impossible for a phishing site to capture or replay the authentication challenge."
    },
    {
      title: "Question 10: Immediate Incident Escalation SOP",
      scenario: "An employee realizes they just entered their corporate network credentials on a fake Microsoft 365 login portal. What is the immediate correct first response?",
      options: [
        "Wait 24 hours to see if any strange emails arrive.",
        "Immediately change the password from an uncompromised device, terminate active sessions, and notify IT Security / SOC.",
        "Delete the phishing email from the Deleted Items folder to hide the mistake.",
        "Turn off the power surge protector."
      ],
      correctIndex: 1,
      explanation: "Immediate credential revocation and session termination prevents the attacker from utilizing harvested tokens. Prompt notification to the SOC allows defenders to block IP connections and investigate token telemetry."
    }
  ];

  let currentQuestionIdx = 0;
  let quizScore = 0;
  let hasAnswered = false;

  const quizProgressBar = document.getElementById('quiz-progress-bar');
  const quizCounter = document.getElementById('quiz-counter');
  const quizScoreTracker = document.getElementById('quiz-score-tracker');
  const questionCard = document.getElementById('question-card');
  const questionTitle = document.getElementById('question-title');
  const questionScenario = document.getElementById('question-scenario');
  const optionsGrid = document.getElementById('options-grid');
  const answerExplanation = document.getElementById('answer-explanation');
  const btnNextQuestion = document.getElementById('btn-next-question');
  const quizResultCard = document.getElementById('quiz-result-card');
  const resultBadge = document.getElementById('result-badge');
  const resultHeadline = document.getElementById('result-headline');
  const resultSummary = document.getElementById('result-summary');
  const btnRetryQuiz = document.getElementById('btn-retry-quiz');

  function renderQuestion(idx) {
    hasAnswered = false;
    const q = quizQuestions[idx];

    // Update Progress
    const progressPct = ((idx + 1) / quizQuestions.length) * 100;
    quizProgressBar.style.width = `${progressPct}%`;
    quizCounter.textContent = `Question ${idx + 1} of ${quizQuestions.length}`;
    quizScoreTracker.textContent = `Score: ${quizScore} / ${quizQuestions.length}`;

    questionTitle.textContent = q.title;
    questionScenario.textContent = q.scenario;
    answerExplanation.style.display = "none";
    answerExplanation.className = "answer-explanation";
    btnNextQuestion.style.display = "none";

    optionsGrid.innerHTML = "";
    q.options.forEach((optText, optIdx) => {
      const optBtn = document.createElement('button');
      optBtn.className = 'quiz-option';
      optBtn.innerHTML = `<strong>${String.fromCharCode(65 + optIdx)}.</strong> ${optText}`;
      optBtn.addEventListener('click', () => handleOptionSelection(optIdx, optBtn));
      optionsGrid.appendChild(optBtn);
    });
  }

  function handleOptionSelection(selectedIdx, clickedBtn) {
    if (hasAnswered) return;
    hasAnswered = true;

    const q = quizQuestions[currentQuestionIdx];
    const isCorrect = selectedIdx === q.correctIndex;
    const allOptions = optionsGrid.querySelectorAll('.quiz-option');

    allOptions.forEach((btn, idx) => {
      btn.classList.add('disabled');
      if (idx === q.correctIndex) {
        btn.classList.add('correct');
      }
    });

    if (isCorrect) {
      quizScore++;
      clickedBtn.classList.add('correct');
      answerExplanation.className = "answer-explanation visible correct";
      answerExplanation.innerHTML = `<strong>✔ CORRECT!</strong> ${q.explanation}`;
    } else {
      clickedBtn.classList.add('incorrect');
      answerExplanation.className = "answer-explanation visible incorrect";
      answerExplanation.innerHTML = `<strong>✖ INCORRECT.</strong> ${q.explanation}`;
    }

    quizScoreTracker.textContent = `Score: ${quizScore} / ${quizQuestions.length}`;
    btnNextQuestion.style.display = "inline-block";
    btnNextQuestion.textContent = currentQuestionIdx === quizQuestions.length - 1 
      ? "View Final Results 🏆" 
      : "Next Question ➔";
  }

  btnNextQuestion.addEventListener('click', () => {
    if (currentQuestionIdx < quizQuestions.length - 1) {
      currentQuestionIdx++;
      renderQuestion(currentQuestionIdx);
    } else {
      showFinalResults();
    }
  });

  function showFinalResults() {
    questionCard.style.display = "none";
    document.querySelector('.quiz-meta-info').style.display = "none";
    document.querySelector('.quiz-progress-wrap').style.display = "none";
    quizResultCard.style.display = "block";

    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    const passed = percentage >= 80;

    resultBadge.textContent = passed ? "🏆 PASSED" : "⚠️ NEEDS REVIEW";
    resultBadge.className = `result-badge ${passed ? 'passed' : 'failed'}`;

    resultHeadline.textContent = passed 
      ? "Outstanding Cybersecurity Awareness!" 
      : "Awareness Refinement Recommended";

    resultSummary.textContent = `You scored ${quizScore} out of ${quizQuestions.length} (${percentage}%). ${passed ? "Your certificate of completion has been issued below." : "Review the modules and retake the assessment to earn your certificate."}`;

    const certBox = document.getElementById('certificate-box');
    if (passed) {
      certBox.style.display = "block";
    } else {
      certBox.style.display = "none";
    }
  }

  btnRetryQuiz.addEventListener('click', () => {
    currentQuestionIdx = 0;
    quizScore = 0;
    quizResultCard.style.display = "none";
    questionCard.style.display = "block";
    document.querySelector('.quiz-meta-info').style.display = "flex";
    document.querySelector('.quiz-progress-wrap').style.display = "block";
    renderQuestion(0);
  });

  renderQuestion(0);

});

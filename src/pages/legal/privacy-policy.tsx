import React from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        color: "#333",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2em", color: "#2c3e50" }}>Privacy Policy</h1>
      <p>
        <strong>Last Updated: April 24, 2025</strong>
      </p>

      <p>
        AI Resume (ABN: 14105436961), a sole trader based in Victoria, Australia
        {'"we,"'} {'"us,"'} or {'"our"'}, is committed to protecting your
        privacy. This Privacy Policy explains how we collect, use, store, and
        protect your personal data in compliance with the{" "}
        <em>Privacy Act 1988 (Cth)</em>, the Australian Privacy Principles
        (APPs), and, where applicable, the General Data Protection Regulation
        (GDPR) for users in the European Economic Area (EEA). This policy
        applies to our website, AI-powered resume-building services, and related
        applications (collectively, the
        {'"Services,"'}), including the AI Resume Builder, Cover Letter
        Generator, Resume Audit, Job Tracker, Resume Lab, Profile Hub, and AI
        Chat Bot.
      </p>

      <h2>1. Information We Collect</h2>
      <p>1.1. We collect the following categories of personal data:</p>
      <ul>
        <li>
          <strong>Identity Data:</strong> Name, email address, and account
          details provided during registration or authentication via Clerk.
        </li>
        <li>
          <strong>Resume Data:</strong> Employment history, education, skills,
          certifications, and other information you provide to the AI Resume
          Builder, Resume Lab, or Profile Hub.
        </li>
        <li>
          <strong>Payment Data:</strong> Billing information (e.g., credit card
          details) processed securely via Stripe for AI Resume Builder
          subscriptions. We do not store full payment details.
        </li>
        <li>
          <strong>Usage Data:</strong> Information about your interactions with
          the Services, including IP address, browser type, device information,
          pages visited, and timestamps, collected via Google Analytics.
        </li>
        <li>
          <strong>Communication Data:</strong> Information from emails, support
          requests, or chats with the AI Chat Bot you send to us.
        </li>
        <li>
          <strong>Job Tracker Data:</strong> Application deadlines, links,
          interview notes, and statuses you input into the Job Tracker.
        </li>
        <li>
          <strong>Profile Hub Data:</strong> Public profile details, success
          stories, and review requests you share via the Profile Hub.
        </li>
      </ul>
      <p>
        1.2. We do not collect sensitive personal data (e.g., racial or ethnic
        origins, health, or biometric data) unless voluntarily provided in your
        resume data.
      </p>

      <h2>2. How We Use Your Data</h2>
      <p>2.1. We use your data for the following purposes:</p>
      <ul>
        <li>
          <strong>Service Delivery:</strong> To provide, personalize, and
          improve the Services, including generating resumes with the AI Resume
          Builder, cover letters with the Cover Letter Generator, audits with
          Resume Audit, tracking with Job Tracker, editing with Resume Lab,
          profiles with Profile Hub, and career coaching with the AI Chat Bot.
        </li>
        <li>
          <strong>Account Management:</strong> To manage user accounts,
          authenticate users via Clerk, and ensure secure access to the
          Services.
        </li>
        <li>
          <strong>Payment Processing:</strong> To process AI Resume Builder
          subscription payments securely via Stripe.
        </li>
        <li>
          <strong>Analytics:</strong> To analyze usage patterns and improve the
          Services using tools like Google Analytics.
        </li>
        <li>
          <strong>Communications:</strong> To send service-related updates,
          respond to inquiries, and, with your consent, send promotional emails.
        </li>
        <li>
          <strong>Legal Compliance:</strong> To comply with applicable laws,
          regulations, or legal requests (e.g., tax reporting, data breach
          notifications).
        </li>
      </ul>
      <p>
        2.2. We do not use your data for automated decision-making that produces
        legal effects (e.g., profiling for hiring decisions).
      </p>

      <h2>3. Legal Basis for Processing (GDPR)</h2>
      <p>
        3.1. For users in the EEA, we process your data based on the following
        legal bases:
      </p>
      <ul>
        <li>
          <strong>Contractual Necessity:</strong> To provide the Services you
          request (e.g., generating resumes, managing your account).
        </li>
        <li>
          <strong>Legitimate Interests:</strong> To improve our Services,
          analyze usage, and ensure security (e.g., via Google Analytics).
        </li>
        <li>
          <strong>Consent:</strong> For non-essential cookies and marketing
          communications (you can withdraw consent at any time).
        </li>
        <li>
          <strong>Legal Obligation:</strong> To comply with applicable laws
          (e.g., tax or data protection regulations).
        </li>
      </ul>

      <h2>4. Data Sharing</h2>
      <p>4.1. We may share your data with the following third parties:</p>
      <ul>
        <li>
          <strong>Service Providers:</strong> Stripe (payment processing),
          Google Analytics (usage analytics), OpenAI (AI features for Resume
          Builder, Cover Letter Generator, Resume Audit, Resume Lab, and AI Chat
          Bot), and Clerk (user authentication).
        </li>
        <li>
          <strong>Legal Authorities:</strong> If required by law, regulation, or
          legal process (e.g., court orders, tax authorities).
        </li>
        <li>
          <strong>Business Transfers:</strong> In the event of a merger,
          acquisition, or sale of assets, your data may be transferred to the
          acquiring entity, with notice provided to you.
        </li>
      </ul>
      <p>
        4.2. We do not sell your personal data to third parties for marketing
        purposes.
      </p>

      <h2>5. International Data Transfers</h2>
      <p>
        5.1. The Services are hosted in Australia, but some third-party
        providers (e.g., OpenAI, Google Analytics) may process data outside
        Australia, including in the United States.
      </p>
      <p>
        5.2. For EEA users, we ensure international transfers comply with GDPR
        through Standard Contractual Clauses (SCCs) or other approved
        mechanisms.
      </p>
      <p>
        5.3. You acknowledge that data processed outside Australia may be
        subject to the laws of those jurisdictions, which may offer different
        levels of protection.
      </p>

      <h2>6. Data Security</h2>
      <p>
        6.1. We implement technical and organizational measures to protect your
        data, including encryption, secure sockets layer (SSL) technology,
        access controls, and regular security audits.
      </p>
      <p>
        6.2. Despite our efforts, no online transmission or storage is 100%
        secure. If a data breach occurs, we will notify affected users and
        relevant authorities as required by law (e.g., within 72 hours under
        GDPR).
      </p>

      <h2>7. Data Retention</h2>
      <p>
        7.1. We retain your data only as long as necessary to provide the
        Services, fulfill legal obligations, or resolve disputes:
      </p>
      <ul>
        <li>
          <strong>Account Data:</strong> Retained for the duration of your
          account, plus 6 months after account deletion for backup purposes.
        </li>
        <li>
          <strong>Resume Data:</strong> Retained until you delete it or your
          account is terminated, subject to legal retention requirements.
        </li>
        <li>
          <strong>Payment Data:</strong> Transaction records are retained for 7
          years to comply with Australian tax laws.
        </li>
        <li>
          <strong>Usage Data:</strong> Retained for up to 2 years for analytics
          purposes.
        </li>
        <li>
          <strong>Job Tracker Data:</strong> Retained until you delete it or
          your account is terminated.
        </li>
        <li>
          <strong>Profile Hub Data:</strong> Retained until you delete your
          profile or account, unless shared publicly.
        </li>
      </ul>
      <p>
        7.2. After retention periods, data is securely deleted or anonymized.
      </p>

      <h2>8. Your Rights</h2>
      <p>
        8.1. Under the Privacy Act 1988 and GDPR (where applicable), you have
        the following rights:
      </p>
      <ul>
        <li>
          <strong>Access:</strong> Request a copy of the personal data we hold
          about you.
        </li>
        <li>
          <strong>Correction:</strong> Request correction of inaccurate or
          incomplete data.
        </li>
        <li>
          <strong>Deletion:</strong> Request deletion of your data, subject to
          legal retention requirements (e.g., tax records).
        </li>
        <li>
          <strong>Restriction:</strong> Request restriction of processing in
          certain circumstances (e.g., while a correction request is processed).
        </li>
        <li>
          <strong>Portability:</strong> Request your data in a machine-readable
          format (GDPR only).
        </li>
        <li>
          <strong>Objection:</strong> Object to processing based on legitimate
          interests (e.g., analytics) or for direct marketing.
        </li>
        <li>
          <strong>Withdraw Consent:</strong> Withdraw consent for non-essential
          processing (e.g., marketing emails) at any time.
        </li>
      </ul>
      <p>
        8.2. To exercise your rights, contact us at{" "}
        <a href="mailto:airesumes579@gmail.com">airesumes579@gmail.com</a>. We
        will respond within 30 days (or 40 days under the Privacy Act for
        complex requests).
      </p>
      <p>
        8.3. If you are unsatisfied with our response, you can lodge a complaint
        with the Office of the Australian Information Commissioner (OAIC) or,
        for EEA users, your local data protection authority.
      </p>

      <h2>9. Children’s Privacy</h2>
      <p>
        9.1. The Services are not intended for users under 13 years old (or 16
        in the EEA). We do not knowingly collect data from children under these
        ages.
      </p>
      <p>
        9.2. If we discover that a child under the applicable age has provided
        data without parental consent, we will delete it immediately.
      </p>

      <h2>10. Cookies</h2>
      <p>
        10.1. We use cookies and similar technologies to enhance functionality,
        analyze usage, and deliver personalized content. For details, see our{" "}
        <Link href="/legal/cookie-policy">Cookie Policy</Link>.
      </p>
      <p>
        10.2. You can manage cookie preferences through your browser settings or
        our cookie consent popup (where required by law, e.g., GDPR).
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        11.1. We may update this Privacy Policy to reflect changes in our
        practices or legal requirements. We will notify you of significant
        changes via email or a notice on the Website at least 30 days before
        they take effect.
      </p>
      <p>
        11.2. Your continued use of the Services after the updated policy takes
        effect constitutes acceptance of the changes.
      </p>

      <h2>12. Contact Information</h2>
      <p>
        12.1. For questions, concerns, or to exercise your rights, contact us
        at:
      </p>
      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:airesumes579@gmail.com">airesumes579@gmail.com</a>
      </p>

      <p style={{ fontStyle: "italic", color: "#777", marginTop: "20px" }}>
        *Disclaimer*: This document is for informational purposes only and does
        not constitute legal advice. For legal advice, consult a qualified
        attorney in your jurisdiction.
      </p>
    </div>
  );
};

export default PrivacyPolicy;

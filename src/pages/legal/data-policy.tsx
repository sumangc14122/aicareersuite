import React from "react";
import Link from "next/link";

const DataPolicy = () => {
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
      <h1 style={{ fontSize: "2em", color: "#2c3e50" }}>Data Policy</h1>
      <p>
        <strong>Last Updated: April 24, 2025</strong>
      </p>

      <p>
        This Data Policy explains how AI Resume (ABN: 14105436961), a sole
        trader based in Victoria, Australia {'"we,"'} {'"us,"'} or {'"our"'},
        collects, stores, processes, and protects your personal data. It
        complements our <Link href="/legal/privacy-policy">Privacy Policy</Link>{" "}
        and complies with the <em>Privacy Act 1988 (Cth)</em>, the Australian
        Privacy Principles (APPs), and the General Data Protection Regulation
        (GDPR) where applicable. This policy applies to our website, AI-powered
        resume-building services, and related applications (collectively, the
        {'"Services,"'}), including the AI Resume Builder, Cover Letter
        Generator, Resume Audit, Job Tracker, Resume Lab, Profile Hub, and AI
        Chat Bot.
      </p>

      <h2>1. What Data We Collect</h2>
      <p>1.1. We collect the following types of data:</p>
      <ul>
        <li>
          <strong>Identity Data:</strong> Name, email address, and account
          details provided during registration or authentication via Clerk.
        </li>
        <li>
          <strong>Resume Data:</strong> Employment history, education, skills,
          certifications, and other user-provided information for the AI Resume
          Builder, Resume Lab, or Profile Hub.
        </li>
        <li>
          <strong>Payment Data:</strong> Transaction details (e.g., payment
          amount, date) processed via Stripe for AI Resume Builder
          subscriptions. We do not store full credit card numbers.
        </li>
        <li>
          <strong>Usage Data:</strong> IP address, browser type, device
          information, pages visited, and timestamps, collected via Google
          Analytics.
        </li>
        <li>
          <strong>Communication Data:</strong> Emails, support tickets, or chats
          with the AI Chat Bot you send to us.
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
        1.2. We collect data directly from you (e.g., during account creation or
        resume input) and automatically (e.g., via cookies and analytics tools).
      </p>

      <h2>2. How We Use Your Data</h2>
      <p>2.1. We use your data for the following purposes:</p>
      <ul>
        <li>
          <strong>Service Delivery:</strong> To generate resumes with the AI
          Resume Builder, cover letters with the Cover Letter Generator, audits
          with Resume Audit, tracking with Job Tracker, editing with Resume Lab,
          profiles with Profile Hub, and career coaching with the AI Chat Bot.
        </li>
        <li>
          <strong>Account Management:</strong> To authenticate users via Clerk
          and manage account settings.
        </li>
        <li>
          <strong>Payment Processing:</strong> To process AI Resume Builder
          subscription payments securely via Stripe.
        </li>
        <li>
          <strong>Analytics and Improvement:</strong> To analyze usage patterns
          and improve the Services using Google Analytics.
        </li>
        <li>
          <strong>Communications:</strong> To send service updates, respond to
          inquiries, and, with your consent, send promotional emails.
        </li>
        <li>
          <strong>Security:</strong> To detect and prevent fraud, abuse, or
          unauthorized access to the Services.
        </li>
      </ul>
      <p>
        2.2. We do not use your data for purposes other than those stated unless
        we obtain your consent or are required by law.
      </p>

      <h2>3. Data Retention</h2>
      <p>3.1. We retain your data as follows:</p>
      <ul>
        <li>
          <strong>Account and Resume Data:</strong> Retained for the duration of
          your account, plus 6 months after deletion for backup purposes.
        </li>
        <li>
          <strong>Payment Data:</strong> Retained for 7 years to comply with
          Australian tax laws.
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
        3.2. You can request earlier deletion of your data, subject to legal
        requirements, as outlined in our{" "}
        <Link href="/legal/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>4. Data Sharing</h2>
      <p>4.1. We share your data with the following third parties:</p>
      <ul>
        <li>
          <strong>Stripe:</strong> For payment processing. Stripe processes
          payment data securely and complies with PCI DSS standards.
        </li>
        <li>
          <strong>Google Analytics:</strong> For usage analytics. Google
          Analytics may process data outside Australia (see Section 5).
        </li>
        <li>
          <strong>OpenAI:</strong> For AI-powered features in the AI Resume
          Builder, Cover Letter Generator, Resume Audit, Resume Lab, and AI Chat
          Bot. OpenAI processes your data via API calls but does not use it for
          training.
        </li>
        <li>
          <strong>Clerk:</strong> For user authentication and account
          management. Clerk processes identity data securely.
        </li>
      </ul>
      <p>
        4.2. We may also share data with legal authorities if required by law or
        to protect our rights, users, or the public.
      </p>

      <h2>5. International Data Transfers</h2>
      <p>
        5.1. Data is primarily stored in Australia but may be transferred to
        third parties (e.g., OpenAI, Google Analytics) in the United States or
        other regions.
      </p>
      <p>
        5.2. For EEA users, we use Standard Contractual Clauses (SCCs) to ensure
        GDPR-compliant transfers.
      </p>
      <p>
        5.3. You consent to international data transfers by using the Services,
        acknowledging that foreign jurisdictions may have different privacy
        laws.
      </p>

      <h2>6. Data Security</h2>
      <p>
        6.1. We use encryption (e.g., AES-256 for data at rest, TLS for data in
        transit), access controls, and regular security audits to protect your
        data.
      </p>
      <p>
        6.2. In the event of a data breach, we will notify affected users and
        authorities as required by law (e.g., within 72 hours under GDPR, or as
        per the Notifiable Data Breaches scheme in Australia).
      </p>

      <h2>7. Your Rights</h2>
      <p>
        7.1. You have the following rights under the Privacy Act 1988 and GDPR
        (where applicable):
      </p>
      <ul>
        <li>
          <strong>Access:</strong> Request a copy of your data.
        </li>
        <li>
          <strong>Correction:</strong> Request correction of inaccurate data.
        </li>
        <li>
          <strong>Deletion:</strong> Request deletion of your data, subject to
          legal retention requirements.
        </li>
        <li>
          <strong>Restriction:</strong> Request restriction of processing in
          certain cases.
        </li>
        <li>
          <strong>Portability:</strong> Request your data in a structured format
          (GDPR only).
        </li>
        <li>
          <strong>Objection:</strong> Object to processing for analytics or
          marketing.
        </li>
      </ul>
      <p>
        7.2. To exercise your rights, email us at{" "}
        <a href="mailto:airesumes579@gmail.com">airesumes579@gmail.com</a>. We
        will respond within 30 days.
      </p>

      <h2>8. Contact Information</h2>
      <p>8.1. For questions or to exercise your rights, contact us at:</p>
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

export default DataPolicy;

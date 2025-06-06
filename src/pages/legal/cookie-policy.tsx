import React from "react";
// import Link from "next/link";

const CookiePolicy = () => {
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
      <h1 style={{ fontSize: "2em", color: "#2c3e50" }}>Cookie Policy</h1>
      <p>
        <strong>Last Updated: April 24, 2025</strong>
      </p>

      <p>
        AI Resume (ABN: 14105436961), a sole trader based in Victoria, Australia
        {'"we,"'} {'"us,"'} or {'"our"'}, uses cookies and similar technologies
        to enhance your experience on our website and services (collectively,
        the
        {'"Services,"'}), including the AI Resume Builder, Cover Letter
        Generator, Resume Audit, Job Tracker, Resume Lab, Profile Hub, and AI
        Chat Bot. This Cookie Policy explains what cookies are, how we use them,
        and how you can manage your preferences.
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        1.1. Cookies are small text files stored on your device when you visit
        our Website. They help us recognize your device, remember your
        preferences, and improve functionality and performance.
      </p>
      <p>
        1.2. We also use similar technologies, such as local storage, session
        storage, and tracking pixels, for the same purposes.
      </p>

      <h2>2. Types of Cookies We Use</h2>
      <p>2.1. We use the following types of cookies:</p>
      <ul>
        <li>
          <strong>Essential Cookies:</strong> Necessary for the Website to
          function, such as Clerk authentication cookies for login and session
          management across the Services.
        </li>
        <li>
          <strong>Analytics Cookies:</strong> Used by Google Analytics to track
          usage patterns, such as page views, time spent on pages, and
          interactions with features like Resume Audit or Job Tracker, to
          improve the Services.
        </li>
        <li>
          <strong>Marketing Cookies:</strong> Used to deliver personalized ads
          or track ad performance (if applicable). We currently do not use
          marketing cookies but may in the future with your consent.
        </li>
        <li>
          <strong>Preference Cookies:</strong> Store your preferences, such as
          theme settings (light/dark mode), to enhance your experience with
          Resume Lab or Profile Hub.
        </li>
      </ul>
      <p>
        2.2. Cookies may be session-based (expiring when you close your browser)
        or persistent (remaining until deleted or expired).
      </p>

      <h2>3. Cookie Consent</h2>
      <p>
        3.1. For users in the EEA and other regions requiring consent (e.g.,
        under GDPR or ePrivacy Directive), we display a cookie consent popup
        upon your first visit, allowing you to accept or customize your cookie
        preferences.
      </p>
      <p>
        3.2. Essential cookies do not require consent as they are necessary for
        the Services to function. You can opt out of non-essential cookies
        (e.g., analytics, marketing) at any time via the consent popup or
        browser settings.
      </p>

      <h2>4. Third-Party Cookies</h2>
      <p>4.1. Some cookies are set by third-party services:</p>
      <ul>
        <li>
          <strong>Google Analytics:</strong> Sets cookies to collect anonymized
          usage data. See Google’s{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>{" "}
          for details.
        </li>
        <li>
          <strong>Clerk:</strong> Sets authentication cookies for user login and
          session management.
        </li>
      </ul>
      <p>
        4.2. Third-party cookies are subject to the privacy policies of those
        providers.
      </p>

      <h2>5. Managing Your Cookies</h2>
      <p>5.1. You can manage cookies through your browser settings:</p>
      <ul>
        <li>
          Block or delete cookies (note: blocking essential cookies may impact
          functionality).
        </li>
        <li>
          Enable {'"Do Not Track"'} settings (we honor such signals where
          applicable).
        </li>
      </ul>
      <p>
        5.2. For more information on managing cookies, visit{" "}
        <a
          href="https://www.allaboutcookies.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.allaboutcookies.org
        </a>
        .
      </p>
      <p>
        5.3. You can also manage non-essential cookies via our consent popup
        (where applicable).
      </p>

      <h2>6. Changes to This Policy</h2>
      <p>
        6.1. We may update this Cookie Policy to reflect changes in our
        practices or legal requirements. Significant changes will be
        communicated via email or a notice on the Website at least 30 days
        before they take effect.
      </p>

      <h2>7. Contact Information</h2>
      <p>
        7.1. For questions or concerns about this Cookie Policy, contact us at:
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

export default CookiePolicy;

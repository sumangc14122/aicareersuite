import React from "react";
import Link from "next/link";

const AIUsagePolicy = () => {
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
      <h1 style={{ fontSize: "2em", color: "#2c3e50" }}>AI Usage Policy</h1>
      <p>
        <strong>Last Updated: April 24, 2025</strong>
      </p>

      <p>
        AI Resume (ABN: 14105436961), a sole trader based in Victoria, Australia
        {'"we,"'} {'"us,"'} or {'"our"'}, uses artificial intelligence (AI) to
        generate resumes, cover letters, audits, and other content as part of
        our services (the {'"Services"'}), including the AI Resume Builder,
        Cover Letter Generator, Resume Audit, Resume Lab, Profile Hub, and AI
        Chat Bot. This AI Usage Policy outlines how we use AI, the data
        involved, transparency measures, and your responsibilities as a user.
      </p>

      <h2>1. AI Purpose and Function</h2>
      <p>
        1.1. We use AI technology, powered by OpenAI, for the following
        features:
      </p>
      <ul>
        <li>
          <strong>AI Resume Builder:</strong> Generates resumes using a
          step-by-step wizard and modern templates, exportable as PDFs.
        </li>
        <li>
          <strong>Cover Letter Generator:</strong> Creates unlimited tailored
          cover letters from a few prompts.
        </li>
        <li>
          <strong>Resume Audit:</strong> Provides AI scoring with ATS-score,
          readability, and keyword health feedback.
        </li>
        <li>
          <strong>Resume Lab:</strong> Offers advanced PDF editing with AI
          suggestions powered by GPT-4 for live rewriting and annotation.
        </li>
        <li>
          <strong>AI Chat Bot:</strong> Acts as a 1:1 career coach for resume
          tips, interview prep, coding questions, and more.
        </li>
      </ul>
      <p>
        1.2. The AI processes your input to create tailored outputs, aiming to
        enhance the quality and presentation of your professional documents.
      </p>

      <h2>2. AI Data Processing</h2>
      <p>
        2.1. We share your input data (e.g., resume details, prompts) with
        OpenAI via secure API calls to generate content for the above features.
        OpenAI does not use your data to train its models, as per our agreement
        with them.
      </p>
      <p>
        2.2. Data shared with OpenAI is processed in accordance with our{" "}
        <Link href="/legal/privacy-policy">Privacy Policy</Link> and{" "}
        <Link href="/legal/data-policy">Data Policy</Link>.
      </p>
      <p>
        2.3. We do not store AI-generated outputs longer than necessary to
        provide the Services, unless you save them in your account.
      </p>

      <h2>3. Transparency</h2>
      <p>
        3.1. We clearly indicate when AI is used to generate content (e.g.,
        during resume creation or chat responses). You will always know when you
        are interacting with AI-generated outputs.
      </p>
      <p>
        3.2. We strive to be transparent about AI limitations, biases, and
        potential errors, as outlined below.
      </p>

      <h2>4. AI Limitations and Bias</h2>
      <p>
        4.1. AI-generated content may contain errors, inaccuracies, or biases
        due to limitations in the underlying models or training data. For
        example, it may suggest phrasing that does not align with your industry
        or cultural norms.
      </p>
      <p>
        4.2. We actively work with OpenAI to mitigate biases and improve
        accuracy, but we cannot guarantee that AI outputs are free from errors
        or biases.
      </p>
      <p>
        4.3. You are responsible for reviewing and editing AI-generated content
        to ensure it meets your needs and complies with ethical and legal
        standards.
      </p>

      <h2>5. User Responsibilities</h2>
      <p>5.1. You agree to:</p>
      <ul>
        <li>Provide accurate and truthful input data to the AI system.</li>
        <li>
          Review and edit AI-generated content to ensure accuracy,
          appropriateness, and compliance with applicable laws (e.g.,
          anti-discrimination laws).
        </li>
        <li>
          Not use AI-generated content to misrepresent your qualifications,
          experience, or identity in a way that could deceive employers or
          others.
        </li>
        <li>
          Not use the AI system for illegal, unethical, or harmful purposes
          (e.g., generating fraudulent documents).
        </li>
      </ul>
      <p>
        5.2. You acknowledge that misuse of AI-generated content may result in
        account suspension or termination, as per our{" "}
        <Link href="/legal/terms-of-use">Terms of Use</Link>.
      </p>

      <h2>6. Ethical AI Use</h2>
      <p>
        6.1. We are committed to ethical AI use, including ensuring that our AI
        tools do not promote discrimination, harm, or illegal activities.
      </p>
      <p>
        6.2. If you believe an AI-generated output is inappropriate, biased, or
        harmful, please report it to us at{" "}
        <a href="mailto:airesumes579@gmail.com">airesumes579@gmail.com</a> for
        review.
      </p>

      <h2>7. Consent</h2>
      <p>
        7.1. By using the Services, you consent to the use of AI as described in
        this policy and to the processing of your data by OpenAI for the purpose
        of generating content.
      </p>
      <p>
        7.2. You can withdraw consent by ceasing to use the AI features and
        deleting your account, but this will not affect data already processed.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        8.1. We are not liable for any errors, inaccuracies, or biases in
        AI-generated content, nor for any consequences arising from your use of
        such content (e.g., rejection by an employer).
      </p>
      <p>
        8.2. Our liability is limited as outlined in our{" "}
        <Link href="/legal/terms-of-use">Terms of Use</Link>.
      </p>

      <h2>9. Contact Information</h2>
      <p>9.1. For questions or concerns about our AI usage, contact us at:</p>
      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:airesumes579@gmail.com">airesumes579@gmail.com</a>.
      </p>

      <p style={{ fontStyle: "italic", color: "#777", marginTop: "20px" }}>
        *Disclaimer*: This document is for informational purposes only and does
        not constitute legal advice.
      </p>
    </div>
  );
};

export default AIUsagePolicy;

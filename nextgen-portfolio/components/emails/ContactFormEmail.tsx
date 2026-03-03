import React from "react";

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const ContactFormEmailTemplate: React.FC<ContactFormEmailProps> = ({
  name,
  email,
  subject,
  message,
}) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "600px" }}>
      <h1 style={{ color: "#333" }}>New Contact Form Submission</h1>
      
      <div style={{ marginTop: "20px" }}>
        <p style={{ marginBottom: "10px" }}>
          <strong>Name:</strong> {name}
        </p>
        <p style={{ marginBottom: "10px" }}>
          <strong>Email:</strong> {email}
        </p>
        <p style={{ marginBottom: "10px" }}>
          <strong>Subject:</strong> {subject || "No subject"}
        </p>
        <div style={{ marginTop: "20px" }}>
          <strong>Message:</strong>
          <p style={{ marginTop: "10px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
            {message}
          </p>
        </div>
      </div>
      
      <footer style={{ marginTop: "30px", fontSize: "12px", color: "#666" }}>
        <p>This email was sent from your portfolio contact form.</p>
      </footer>
    </div>
  );
};


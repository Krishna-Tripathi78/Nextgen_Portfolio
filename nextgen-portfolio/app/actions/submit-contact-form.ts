"use server";

import React from "react";
import { Resend } from "resend";
import { ContactFormEmailTemplate } from "@/components/emails/ContactFormEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;

        if (!name || !email || !message) {
            return {
                success: false,
                error: "Please fill in all required fields.",
            };
        }

        const { data, error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: process.env.YOUR_EMAIL as string,
            subject: subject || "New Contact Form Submission",
            react: ContactFormEmailTemplate({ name, email, subject, message }) as React.ReactElement,
        });

        if (error) {
            console.error("Error sending email:", error);
            return {
                success: false,
                error: "Failed to send message. Please try again.",
            };
        }

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error("Error in submitContactForm:", error);
        return {
            success: false,
            error: "An unexpected error occurred. Please try again.",
        };
    }
}

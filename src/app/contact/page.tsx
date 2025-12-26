import React from 'react';
import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact | Poornaganesh",
  description: "Get in touch for collaborations or freelance inquiries.",
};

export default function ContactPage() {
  return <ContactClient />;
}

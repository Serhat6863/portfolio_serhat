/**
 * EmailJS configuration — https://www.emailjs.com
 *
 * Steps:
 * 1. Create a free account at emailjs.com
 * 2. Add an Email Service (Gmail, Outlook…) → copy the Service ID
 * 3. Create an Email Template with these variables:
 *      {{from_name}}   → sender's name
 *      {{from_email}}  → sender's email (set as Reply-To)
 *      {{message}}     → message body
 *    Copy the Template ID
 * 4. Go to Account > API Keys → copy the Public Key
 * 5. Fill in the three values below
 */
export const EMAILJS_CONFIG = {
  publicKey:  '3bqxbOfmW8Gc-ylre',
  serviceId:  'service_yjzgy3v',
  templateId: 'template_eqwt6fy',
} as const;

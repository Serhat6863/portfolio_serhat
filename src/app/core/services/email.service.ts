import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs.config';

@Injectable({ providedIn: 'root' })
export class EmailService {
  private initialized = false;

  private init(): void {
    if (this.initialized) return;
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    this.initialized = true;
  }

  send(name: string, email: string, message: string): Promise<void> {
    this.init();
    return emailjs
      .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
        from_name: name,
        from_email: email,
        message,
      })
      .then(() => undefined);
  }
}

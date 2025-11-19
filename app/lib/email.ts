/**
 * Email utility functions for sending notifications
 *
 * Setup instructions:
 * 1. Install Resend: npm install resend
 * 2. Add RESEND_API_KEY to .env.local
 * 3. Uncomment the Resend import below
 */

// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

type EmailOptions = {
  to: string;
  from?: string;
  subject: string;
  html: string;
  replyTo?: string;
};

/**
 * Send an email using Resend or your configured email service
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Validate environment variables
    if (!process.env.RESEND_API_KEY && !process.env.SMTP_HOST) {
      console.warn(
        'Email service not configured. Set RESEND_API_KEY or SMTP_HOST in environment variables.'
      );
      return false;
    }

    // TODO: Implement actual email sending with Resend
    // Example with Resend:
    /*
    const { data, error } = await resend.emails.send({
      from: options.from || process.env.EMAILS_FROM_ADDRESS || 'noreply@dumpsters.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });

    if (error) {
      console.error('Email sending failed:', error);
      return false;
    }

    console.log('Email sent successfully:', data);
    return true;
    */

    // For now, log email to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Email (development mode):', {
        to: options.to,
        subject: options.subject,
        timestamp: new Date().toISOString(),
      });
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Send quote confirmation email to customer
 */
export async function sendQuoteConfirmationEmail(data: {
  name: string;
  email: string;
  quoteId: string;
  dumpsterSize: string;
  deliveryDate: Date;
}): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Quote Request Received</h1>
          </div>
          <div class="content">
            <p>Hi ${data.name},</p>
            <p>Thank you for submitting your dumpster rental quote request!</p>
            <p>Your quote ID: <strong>${data.quoteId}</strong></p>
            <p><strong>Request Details:</strong></p>
            <ul>
              <li>Dumpster Size: ${data.dumpsterSize}</li>
              <li>Delivery Date: ${data.deliveryDate.toLocaleDateString()}</li>
            </ul>
            <p>Our team will review your request and contact you within 24 hours with pricing and availability information.</p>
            <p>In the meantime, feel free to call us at <strong>1-800-DUMP-PRO</strong> for immediate assistance.</p>
            <p>Best regards,<br>The Dumpsters.com Team</p>
            <div class="footer">
              <p>© 2025 Dumpsters.com. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: data.email,
    subject: `Quote Confirmation - ID: ${data.quoteId}`,
    html,
  });
}

/**
 * Send contact form notification to admin
 */
export async function sendContactNotificationEmail(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  contactId: string;
}): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@dumpsters.com';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #667eea; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin: 10px 0; }
          .label { font-weight: bold; color: #667eea; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <p><strong>New lead received!</strong></p>
            <div class="field">
              <span class="label">Contact ID:</span> ${data.contactId}
            </div>
            <div class="field">
              <span class="label">Name:</span> ${data.name}
            </div>
            <div class="field">
              <span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a>
            </div>
            <div class="field">
              <span class="label">Phone:</span> <a href="tel:${data.phone}">${data.phone}</a>
            </div>
            <div class="field">
              <span class="label">Message:</span>
              <p>${data.message.replace(/\n/g, '<br>')}</p>
            </div>
            <div class="footer">
              <p>This is an automated email. Please respond to the customer within 24 hours.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `New Contact Form Submission from ${data.name}`,
    html,
    replyTo: data.email,
  });
}

/**
 * Send contact form confirmation email to user
 */
export async function sendContactConfirmationEmail(data: {
  name: string;
  email: string;
}): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Contacting Us</h1>
          </div>
          <div class="content">
            <p>Hi ${data.name},</p>
            <p>We've received your message and appreciate you reaching out to Dumpsters.com!</p>
            <p>Our team will review your inquiry and get back to you as soon as possible, typically within 24 hours.</p>
            <p>If you need immediate assistance, please call us at <strong>1-800-DUMP-PRO</strong>.</p>
            <p>Best regards,<br>The Dumpsters.com Team</p>
            <div class="footer">
              <p>© 2025 Dumpsters.com. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: data.email,
    subject: 'We Received Your Message - Dumpsters.com',
    html,
  });
}

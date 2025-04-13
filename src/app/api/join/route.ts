import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message } = body;

    await resend.emails.send({
      from: 'no-reply@youngmindset.org',
      to: 'contact@youngmindset.org',
      subject: 'New Join Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
          <h1 style="color: #1e293b; text-align: center; margin-bottom: 24px;">New Join Request</h1>
          <div style="background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <p style="margin-bottom: 16px;"><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p style="margin-bottom: 16px;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 16px;"><strong>Phone:</strong> ${phone}</p>
            <div style="margin-top: 16px;">
              <p style="margin-bottom: 8px;"><strong>Message:</strong></p>
              <p style="background-color: #f8fafc; padding: 12px; border-radius: 4px; border-left: 4px solid #1e293b;">${message}</p>
            </div>
          </div>
          <p style="text-align: center; margin-top: 24px; color: #64748b; font-size: 14px;">This is an automated message from YoungMinds ET</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 
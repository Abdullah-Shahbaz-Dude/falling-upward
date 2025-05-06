import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Define the structure of the booking form data
type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  consultationType: string;
  consultationTypeLabel: string;
  message?: string;
  [key: string]: any; // Allow for additional properties
};

export async function POST(request: NextRequest) {
  try {
    // Debug: Log environment variables (API key prefix only for security)
    const apiKeyPrefix = process.env.RESEND_API_KEY?.substring(0, 5) || 'not set';
    console.log('Environment variables check:');
    console.log('- RESEND_API_KEY prefix:', apiKeyPrefix + '...');
    
    // Get form data from request body
    const data = await request.json() as BookingFormData;
    console.log('Received form data:', JSON.stringify(data, null, 2));
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Handle missing consultationTypeLabel
    const consultationTypeLabel = data.consultationTypeLabel || data.consultationType || 'Consultation';
    
    // Initialize Resend with API key
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable is not set');
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    
    const resend = new Resend(resendApiKey);

    // Extract the basic fields for the email template
    const {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      date: appointmentDate,
      time: appointmentTime,
      message = 'No additional message provided',
    } = data;

    // Create additional fields object by filtering out the main fields
    const mainFields = ['name', 'email', 'phone', 'date', 'time', 'consultationType', 'consultationTypeLabel', 'message'];
    const additionalFields = Object.entries(data).filter(([key]) => !mainFields.includes(key));

    // Build HTML for additional fields
    let additionalFieldsHtml = '';
    if (additionalFields.length > 0) {
      additionalFieldsHtml = `
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3 style="color: #0B4073; margin-top: 0;">Form Details</h3>
          ${additionalFields.map(([key, value]) => {
            const prettyKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            let displayValue = value;
            
            // Handle different value types
            if (value === null || value === undefined) {
              displayValue = 'Not provided';
            } else if (typeof value === 'object') {
              try {
                displayValue = JSON.stringify(value);
              } catch (e) {
                displayValue = 'Complex value';
              }
            }
            
            return `<p><strong>${prettyKey}:</strong> ${displayValue}</p>`;
          }).join('')}
        </div>
      `;
    }

    // Create HTML email content directly
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
        <h2 style="color: #0B4073; margin-top: 0;">New Booking Request</h2>
        <p>You have received a new booking request with the following details:</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3 style="color: #0B4073; margin-top: 0;">Customer Information</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Phone:</strong> ${customerPhone}</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3 style="color: #0B4073; margin-top: 0;">Appointment Details</h3>
          <p><strong>Consultation Type:</strong> ${consultationTypeLabel}</p>
          <p><strong>Date:</strong> ${appointmentDate}</p>
          <p><strong>Time:</strong> ${appointmentTime}</p>
        </div>
        
        ${additionalFieldsHtml}
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3 style="color: #0B4073; margin-top: 0;">Additional Message</h3>
          <p>${message}</p>
        </div>
        
        <p style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eaeaea;">Please confirm this appointment with the customer.</p>
      </div>
    `;

    // Generate a plain text version for email clients that don't support HTML
    const plainText = `
New Booking Request from ${customerName}

Customer Information:
- Name: ${customerName}
- Email: ${customerEmail}
- Phone: ${customerPhone}

Appointment Details:
- Consultation Type: ${consultationTypeLabel}
- Date: ${appointmentDate}
- Time: ${appointmentTime}

${additionalFields.map(([key, value]) => {
  const prettyKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  return `${prettyKey}: ${value}`;
}).join('\n')}

Additional Message:
${message}

Please confirm this appointment with the customer.
    `;

    // IMPORTANT: Free tier Resend only allows sending emails to the account owner email
    // For testing, use the verified email that owns the Resend account
    const recipient = 'fahadamjad778@gmail.com';
    console.log('Sending email to:', recipient);
    
    // Send email using Resend with try/catch for better error handling
    try {
      console.log('Attempting to send email via Resend API...');
      
      const result = await resend.emails.send({
        from: 'Falling Upward <onboarding@resend.dev>',
        to: [recipient],
        subject: `New Booking Request: ${consultationTypeLabel}`,
        html: htmlContent,
        text: plainText,
        // Include reply-to so you can respond to the customer directly
        replyTo: customerEmail,
      });
      
      console.log('Resend API response:', JSON.stringify(result, null, 2));
      
      if (result.error) {
        console.error('Resend API returned an error:', result.error);
        return NextResponse.json({ error: result.error.message }, { status: 500 });
      }
      
      console.log('Email sent successfully:', result.data);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Your booking request has been sent successfully',
        emailId: result.data?.id
      });
    } catch (sendError: any) {
      console.error('Exception during Resend API call:', sendError);
      return NextResponse.json({ 
        error: `Failed to send email: ${sendError.message || 'Unknown error'}`,
        details: sendError
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error processing email request:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to send email' 
    }, { status: 500 });
  }
} 
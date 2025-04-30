import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// In-memory store for rate limiter (resets on server restart)
// For production, consider using a persistent store like Redis
const rateLimiter = new RateLimiterMemory({
  points: 3, // 3 requests
  duration: 10 * 60, // per 10 minutes
  blockDuration: 30 * 60, // Block for 30 minutes if exceeded
});

// Configure nodemailer with your email service
const createTransporter = () => {
  // Use environment variables with fallbacks for development
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASSWORD || '',
    },
  });
};

const DESTINATION_EMAIL = process.env.DESTINATION_EMAIL || 'info@classique.co.in';

export async function POST(request: NextRequest) {
  try {
    // Extract client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
      request.headers.get('x-real-ip') || 
      '127.0.0.1';
    
    // Get user agent for logging purposes
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    // Apply rate limiting
    try {
      await rateLimiter.consume(ip);
    } catch (error) {
      console.warn(`Rate limit exceeded for IP: ${ip.split(',')[0]}`);
      console.log(error)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many inquiries. Please try again later.' 
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      productName, 
      productImage, 
      companyName 
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !productName) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields. Please provide name, email, phone, and product name.' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email format. Please provide a valid email address.' 
        },
        { status: 400 }
      );
    }
    
    // Validate phone number (basic validation)
    if (!/^[0-9+\-()\s]{7,15}$/.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid phone number format. Please provide a valid phone number.' 
        },
        { status: 400 }
      );
    }

    // Create email HTML template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333;
              max-width: 600px;
              margin: 0 auto;
            }
            .header { 
              background-color: #0275d8; 
              color: white; 
              padding: 20px; 
              text-align: center; 
            }
            .content { 
              padding: 20px; 
            }
            .section { 
              margin-bottom: 20px; 
              padding-bottom: 20px; 
              border-bottom: 1px solid #eee; 
            }
            .label { 
              font-weight: bold; 
              color: #555; 
            }
            .footer { 
              background-color: #f5f5f5; 
              padding: 15px; 
              text-align: center; 
              font-size: 12px; 
              color: #666; 
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>New Product Inquiry</h2>
          </div>
          <div class="content">
            <div class="section">
              <h3>Product Information</h3>
              <p><span class="label">Product:</span> ${productName}</p>
              <p><span class="label">Company:</span> ${companyName || 'N/A'}</p>
            </div>
            
            <div class="section">
              <h3>Customer Information</h3>
              <p><span class="label">Name:</span> ${name}</p>
              <p><span class="label">Email:</span> ${email}</p>
              <p><span class="label">Phone:</span> ${phone}</p>
            </div>
            
            <div class="section">
              <h3>Additional Information</h3>
              <p><span class="label">Date:</span> ${new Date().toLocaleString()}</p>
              <p><span class="label">IP:</span> ${ip.split(',')[0]}</p>
              <p><span class="label">User Agent:</span> ${userAgent}</p>
            </div>
          </div>
          <div class="footer">
            <p>This inquiry was sent from the Classique website product page.</p>
          </div>
        </body>
      </html>
    `;

    // Plain text version for email clients that don't support HTML
    const textContent = `
      NEW PRODUCT INQUIRY
      
      PRODUCT INFORMATION
      -------------------
      Product: ${productName}
      Company: ${companyName || 'N/A'}
      
      CUSTOMER INFORMATION
      -------------------
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      
      ADDITIONAL INFORMATION
      -------------------
      Date: ${new Date().toLocaleString()}
      
      This inquiry was sent from the Classique website product page.
    `;

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'website@classique.co.in',
      replyTo: email,
      to: DESTINATION_EMAIL,
      subject: `New Product Inquiry: ${productName}`,
      html: htmlContent,
      text: textContent,
    };

    // Create a transporter and send email
    const transporter = createTransporter();
    await transporter.sendMail(mailOptions);

    // Log successful inquiry (but not in production)
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Inquiry sent: ${name} inquired about ${productName}`);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your inquiry has been sent successfully! Our team will contact you shortly.' 
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the actual error for debugging
    console.error('Error sending inquiry email:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'We encountered an issue sending your inquiry. Please try again later or contact us directly.' 
      },
      { status: 500 }
    );
  }
}
import nodemailer from "nodemailer";
import { config } from "@/lib/config";
const sendEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  try {
    // Configure Mailtrap SMTP Transport
    const transporter = nodemailer.createTransport({
      host: config.env.mailtrap.host,
      port: Number(config.env.mailtrap.port),
      auth: {
        user: config.env.mailtrap.user, // Replace with Mailtrap username
        pass: config.env.mailtrap.password, // Replace with Mailtrap password
      },
    });

    // Email options
    const mailOptions = {
      from: 'hello@demomailtrap.com', // Replace with your details
      to,
      subject,
      text,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("Error sending email: ", error);
    return { success: false, error: error.message };
  }
};

export async function POST(req: { json: () => any; }) {
  try {
    const body = await req.json();
    const { to, subject, text } = body;

    if (!to || !subject || !text) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: to, subject, text" }),
        { status: 400 }
      );
    }

    const result = await sendEmail({ to, subject, text });

    if (result.success) {
      return new Response(
        JSON.stringify({ message: "Email sent", id: result.messageId }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          error: "Failed to send email",
          details: result.error,
        }),
        { status: 500 }
      );
    }
  } catch (error:any) {
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

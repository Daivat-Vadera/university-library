import nodemailer from "nodemailer";
import { config } from "@/lib/config";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { NextRequest, NextResponse } from "next/server";
const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
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
    console.log(email, subject, message);

    // Email options
    const mailOptions = {
      from: "hello@demomailtrap.com", // Replace with your details
      to: email,
      subject: subject,
      html: message,
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
async function handler(request: NextRequest) {
  // Parse the request body
  const body = request.body;
  console.log(body);
  // console.log();

  // simulate work
  await new Promise((r) => setTimeout(r, 1000));

  console.log("Success");
  return NextResponse.json({ name: "John Doe Serverless" });
}
export const POST = verifySignatureAppRouter(handler);
// export async function POST(req: { json: () => any }) {
//   try {
//     const body = await req.json();
//     const { email, subject, message } = body;

//     if (!email || !subject || !message) {
//       return new Response(
//         JSON.stringify({
//           error: "Missing required fields: email, subject, message",
//         }),
//         { status: 400 }
//       );
//     }

//     const result = await sendEmail({ email, subject, message });

//     if (result.success) {
//       return new Response(
//         JSON.stringify({ message: "Email sent", id: result.messageId }),
//         { status: 200 }
//       );
//     } else {
//       return new Response(
//         JSON.stringify({
//           error: "Failed to send email",
//           details: result.error,
//         }),
//         { status: 500 }
//       );
//     }
//   } catch (error: any) {
//     return new Response(
//       JSON.stringify({
//         error: "Internal server error",
//         details: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }

import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import { config } from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstahsUrl,
  token: config.env.upstash.qstahsToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstahsToken,
});


export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  const emailPayload = {
    to: email, // Replace with recipient email
    subject: subject,
    text: message,
  };
  const response = await qstashClient.publishJSON({
    body: emailPayload,
    url: `${config.env.prodApiEndPoint}/api/send-email`, // Replace with your server's API URL
  });
  console.log("Scheduled email:", response);
};

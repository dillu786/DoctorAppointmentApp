const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export async function createMessage(body:string,to:string) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    console.log(accountSid);
    console.log(authToken);
    const client = twilio(accountSid, authToken);
    console.log("body"+body);
    console.log("to"+to);
  const message = await client.messages.create({
    body: body,
    from: "whatsapp:+14155238886",
    to: "whatsapp:+91"+to,
  });

  console.log(message.body);
}


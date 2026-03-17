import { Resend } from 'resend';

// We initialize the Resend SDK with the environment variable.
const resend = new Resend(process.env.RESEND_API_KEY);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { firstName, lastName, email, company, service, details, file_name, file_content } = req.body;

        const attachments = [];
        if (file_name && file_content) {
            // The frontend sends base64 with a data URI prefix (e.g. "data:application/pdf;base64,...")
            // Resend expects only the base64 content
            attachments.push({
                filename: file_name,
                content: file_content.split(',')[1],
            });
        }

        // Send the email
        const { data, error } = await resend.emails.send({
            // Until you verify your domain in Resend, you must use onboarding@resend.dev as the 'from' address
            from: 'ESPASYO Inquiry <onboarding@resend.dev>',
            // This MUST be the email address you verified on Resend (usually the one you signed up with)
            to: ['dev.espasyo@alphaexplora.com'],
            subject: `New Project Inquiry from ${firstName} ${lastName}`,
            html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Service Requested:</strong> ${service}</p>
        <p><strong>Details:</strong><br/>${details}</p>
      `,
            attachments: attachments.length > 0 ? attachments : undefined
        });

        if (error) {
            console.error("Resend API Error:", error);
            return res.status(400).json({ error });
        }

        return res.status(200).json({ message: 'Email sent successfully!', data });
    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
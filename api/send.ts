import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { firstName, lastName, email, message } = req.body;

        const { data, error } = await resend.emails.send({
            from: 'ESPASYO Website <inquire@espasyo.ph>', 
            to: ['inquire@espasyo.ph'], 
            subject: `New Inquiry from ${firstName} ${lastName}`,
            html: `
                <h2>New Contact Request</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br/>${message}</p>
            `
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
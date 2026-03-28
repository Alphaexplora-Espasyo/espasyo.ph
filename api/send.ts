import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { firstName, lastName, email, inquiryType, message } = req.body;

        const { data, error } = await resend.emails.send({
            from: 'ESPASYO Website <inquire@espasyo.ph>', 
            to: ['inquire@espasyo.ph'], 
            subject: `[${inquiryType}] New Inquiry from ${firstName} ${lastName}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2 style="color: #3A2618;">New Contact Request</h2>
                    <hr/>
                    <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
                </div>
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
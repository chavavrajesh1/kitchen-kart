import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendPasswordResetEmail = async (email: string, resetToken: string) => {
    const resetUrl = `https://localhost:3000/reset-password?token=${resetToken}`;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Reset Your KitchenKart Password",
        html: `
            <h2>Password Reset</h2>
            <p>You requested a password reset.</p>
            <p>
                <a href="${resetUrl}">Reset Password</a>
            </p>
            <p>This line expires in 15 minutes.</p>`,
    });
};
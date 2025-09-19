import nodemailer from 'nodemailer';
import type { Document } from 'mongoose';

//Typescript Interfaces ,define the propertiies of an object for type checking

interface orderItem{
    productId: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
}

interface Address{
    address: string;
}

//Consuming the interfaces in the OrderDocument interface
interface OrderDocument extends Document {
    userId: string;
    customerEmail: string;
    customerName: string;
    customerPhone: string;
    address: Address;
    items: orderItem[];
    total: number;
    createdAt: Date;
    updatedAt: Date;
}

export class EmailService {
    async sendOrderConfirmation(order: OrderDocument): Promise<boolean> {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });
            const mailOptions = {
                from: process.env.SMTP_FROM,
                to: order.customerEmail,
                subject: 'Confirmacion de Pedido - MERN Store Matecitos.',
                text: ` ${order.customerName}, tu pedido ha sido confirmado!`,
            };

            await transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    }
}
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
    province: string;
    city: string;
}

//Consuming the interfaces in the OrderDocument interface
interface OrderDocument extends Document {
    userId: string;
    customerEmail: string;
    customerName: string;
    customerPhone: string;
    address: Address;  // Fixed: address is an object, not separate fields
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
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #333;">¡Hola ${order.customerName}!</h1>
                        <h2 style="color: #007BFF;">Tu pedido ha sido confirmado</h2>
                        
                        <h3>Detalles de tu pedido:</h3>
                        <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0;">
                            ${order.items.map(item => `
                                <div style="border-bottom: 1px solid #eee; padding: 10px 0; margin-bottom: 10px;">
                                    <h4 style="margin: 0; color: #333;">${item.name}</h4>
                                    <img src="${item.imageUrl}" alt="${item.name}" style="width:150px; height:150px; object-fit:contain; margin: 10px 0;">
                                    <p style="margin: 5px 0;">Cantidad: ${item.quantity}</p>
                                    <p style="margin: 5px 0;">Precio unitario: $${item.price}</p>
                                    <p style="margin: 5px 0; font-weight: bold;">Subtotal: $${item.quantity * item.price}</p>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div style="background: #f8f9fa; padding: 15px; margin: 20px 0;">
                            <h3 style="margin: 0 0 10px 0; color: #007BFF;">Resumen del Pedido</h3>
                            <p style="font-size: 18px; font-weight: bold; color: #333;">Total: $${order.total}</p>
                        </div>
                        
                        <div style="background: #e9ecef; padding: 15px; margin: 20px 0;">
                            <h3 style="margin: 0 0 10px 0; color: #007BFF;">Dirección de Envío</h3>
                            <p style="margin: 5px 0;">${order.address?.address || 'No especificada'}</p>
                            <p style="margin: 5px 0;">${order.address?.city || ''}, ${order.address?.province || ''}</p>
                        </div>
                        
                        <p style="color: #666; font-style: italic;">¡Gracias por tu compra en MERN Store Matecitos!</p>
                    </div>
                `,
            };
            await transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    }
}
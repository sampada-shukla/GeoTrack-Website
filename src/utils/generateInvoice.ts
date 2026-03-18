// src/utils/generateInvoice.ts

import jsPDF from 'jspdf';

interface InvoiceData {
  transactionId: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  planName: string;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  amount: number;
  gst: number;
  total: number;
  status: string;
}

export const generateInvoice = (data: InvoiceData) => {
  const doc = new jsPDF();
  
  // Colors
  const primaryColor = [37, 99, 235] as const; // Blue
  const textColor = [51, 51, 51] as const;
  const lightGray = [245, 245, 245] as const;
  
  // Company Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('GeoTrack', 20, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Field Sales Tracking Solution', 20, 28);
  
  // Invoice Title
  doc.setTextColor(...textColor);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 150, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`#${data.transactionId.slice(-8).toUpperCase()}`, 150, 28);
  
  // Date and Status
  doc.setFontSize(10);
  doc.text(`Date: ${new Date(data.date).toLocaleDateString('en-IN')}`, 150, 35);
  
  // Company Details (Left Side)
  let yPos = 55;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('From:', 20, yPos);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  yPos += 7;
  doc.text('Trackon Technologies', 20, yPos);
  yPos += 5;
  doc.text('123 Business Park', 20, yPos);
  yPos += 5;
  doc.text('Mumbai, Maharashtra 400001', 20, yPos);
  yPos += 5;
  doc.text('India', 20, yPos);
  yPos += 5;
  doc.text('GST: 27AAAAA0000A1Z5', 20, yPos);
  yPos += 5;
  doc.text('Email: billing@trackon.com', 20, yPos);
  
  // Customer Details (Right Side)
  yPos = 55;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To:', 120, yPos);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  yPos += 7;
  doc.text(data.customerName, 120, yPos);
  yPos += 5;
  doc.text(data.customerEmail, 120, yPos);
  if (data.customerPhone) {
    yPos += 5;
    doc.text(data.customerPhone, 120, yPos);
  }
  if (data.customerAddress) {
    yPos += 5;
    const addressLines = doc.splitTextToSize(data.customerAddress, 70);
    doc.text(addressLines, 120, yPos);
  }
  
  // Items Table
  yPos = 115;
  
  // Table Header
  doc.setFillColor(...lightGray);
  doc.rect(20, yPos, 170, 10, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Description', 25, yPos + 7);
  doc.text('Billing Cycle', 100, yPos + 7);
  doc.text('Amount', 170, yPos + 7, { align: 'right' });
  
  // Table Content
  yPos += 15;
  doc.setFont('helvetica', 'normal');
  doc.text(data.planName + ' Plan', 25, yPos);
  
  const billingCycleText = data.billingCycle === 'monthly' ? 'Monthly' : 
                          data.billingCycle === 'quarterly' ? 'Quarterly' : 'Yearly';
  doc.text(billingCycleText, 100, yPos);
  doc.text(`₹${data.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 185, yPos, { align: 'right' });
  
  // Subtotal, Tax, Total
  yPos += 20;
  doc.line(20, yPos, 190, yPos);
  
  yPos += 10;
  doc.text('Subtotal:', 130, yPos);
  doc.text(`₹${data.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 185, yPos, { align: 'right' });
  
  yPos += 7;
  doc.text('GST (18%):', 130, yPos);
  doc.text(`₹${data.gst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 185, yPos, { align: 'right' });
  
  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Total:', 130, yPos);
  doc.text(`₹${data.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 185, yPos, { align: 'right' });
  
  // Payment Status
  yPos += 15;
  doc.setFillColor(34, 197, 94); // Green
  doc.roundedRect(20, yPos, 60, 10, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('PAID', 50, yPos + 7, { align: 'center' });
  
  // Payment Details
  yPos += 20;
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Payment Method: Razorpay', 20, yPos);
  yPos += 5;
  doc.text(`Transaction ID: ${data.transactionId}`, 20, yPos);
  yPos += 5;
  doc.text(`Payment Status: ${data.status}`, 20, yPos);
  
  // Footer
  yPos = 270;
  doc.setFillColor(...primaryColor);
  doc.rect(0, yPos, 210, 27, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text('Thank you for your business!', 105, yPos + 8, { align: 'center' });
  doc.setFontSize(8);
  doc.text('For support, contact us at support@trackon.com | +91-1234567890', 105, yPos + 14, { align: 'center' });
  doc.text('Visit us at www.trackon.com', 105, yPos + 20, { align: 'center' });
  
  // Terms & Conditions (if space)
  if (yPos > 240) {
    doc.setTextColor(...textColor);
    doc.setFontSize(8);
    doc.text('Terms & Conditions:', 20, 250);
    doc.setFontSize(7);
    doc.text('1. Payment is non-refundable after 14 days of purchase.', 20, 255);
    doc.text('2. Subscription auto-renews unless cancelled before the billing date.', 20, 259);
    doc.text('3. All prices are in Indian Rupees (INR) and include applicable taxes.', 20, 263);
  }
  
  // Save PDF
  const fileName = `GeoTrack_Invoice_${data.transactionId.slice(-8)}.pdf`;
  doc.save(fileName);
};
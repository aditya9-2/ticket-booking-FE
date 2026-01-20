import QRCode from "qrcode";

export const generateQrCode = async (text: string): Promise<string> => {

  try {
    return await QRCode.toDataURL(text, { width: 120, margin: 1 });

  } catch (err) {

    console.error("Failed to generate QR code", err);
    return "";

  }  
};

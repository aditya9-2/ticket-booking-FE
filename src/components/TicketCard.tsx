import { useRef } from "react";

interface TicketCardProps {
  eventName: string;
  sectionName: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  qrCode?: string;
}

const TicketCard = ({
  eventName,
  sectionName,
  quantity,
  totalPrice,
  createdAt,
  qrCode,
}: TicketCardProps) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (!ticketRef.current) return;

    const printWindow = window.open("", "_blank", "width=600,height=800");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Event Ticket</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 24px;
            }
            .ticket {
              border: 2px dashed #333;
              border-radius: 12px;
              padding: 20px;
              max-width: 420px;
            }
            .title {
              font-size: 20px;
              font-weight: bold;
            }
            .meta {
              margin-top: 8px;
              font-size: 14px;
              color: #555;
            }
            .price {
              margin-top: 12px;
              font-size: 18px;
              font-weight: bold;
              color: #16a34a;
            }
            .qr {
              margin-top: 16px;
              width: 140px;
              height: 140px;
            }
          </style>
        </head>
        <body>
          ${ticketRef.current.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="flex items-center gap-4">
      {/* TICKET */}
      <div
        ref={ticketRef}
        className="ticket bg-white rounded-xl shadow-md p-4 flex justify-between gap-4 w-full"
      >
        <div>
          <h2 className="title">{eventName}</h2>
          <p className="meta">Section: {sectionName}</p>
          <p className="meta">Quantity: {quantity}</p>
          <p className="price">₹{totalPrice}</p>
          <p className="meta">
            Booked on {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        {qrCode && (
          <img src={qrCode} alt="QR Code" className="qr" />
        )}
      </div>

      {/* PRINT BUTTON */}
      <button
        onClick={handlePrint}
        className="px-3 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
      >
        Print
      </button>
    </div>
  );
};

export default TicketCard;

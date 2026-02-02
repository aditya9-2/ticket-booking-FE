import { useRef } from "react";

interface TicketCardProps {
  eventName: string;
  eventDate: string; // Added to check for expiry
  sectionName: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  qrCode?: string;
}

const TicketCard = ({
  eventName,
  eventDate,
  sectionName,
  quantity,
  totalPrice,
  // createdAt,
  qrCode,
}: TicketCardProps) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  // Check if the event date is in the past
  const isExpired = new Date(eventDate) < new Date();

  const handlePrint = () => {
    if (!ticketRef.current || isExpired) return;

    const printWindow = window.open("", "_blank", "width=600,height=800");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Ticket - ${eventName}</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; display: flex; justify-content: center; }
            .ticket { 
              border: 2px solid #000; 
              border-radius: 20px; 
              padding: 30px; 
              width: 350px; 
              text-align: center;
              position: relative;
            }
            .qr-img { width: 200px; height: 200px; margin: 20px 0; }
            .title { font-size: 24px; font-weight: 800; margin-bottom: 10px; text-transform: uppercase; }
            .info { font-size: 14px; color: #666; margin: 5px 0; }
            .price { font-size: 20px; font-weight: bold; margin-top: 15px; border-top: 1px dashed #ccc; pt: 15px; }
          </style>
        </head>
        <body>
          <div class="ticket">
            <div class="title">${eventName}</div>
            <div class="info">Date: ${new Date(eventDate).toDateString()}</div>
            <div class="info">Section: ${sectionName}</div>
            <div class="info">Quantity: ${quantity}</div>
            <img src="${qrCode}" class="qr-img" />
            <div class="price">Total: ₹${totalPrice}</div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
  };

  return (
    <div className={`flex items-center gap-4 transition-all ${isExpired ? "opacity-60 grayscale" : ""}`}>
      {/* TICKET CONTAINER */}
      <div
        ref={ticketRef}
        className="relative bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex justify-between items-center w-full overflow-hidden"
      >
        {/* Left Cut-out Decoration */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full border border-gray-100"></div>
        
        <div className="pl-4">
          {isExpired && (
            <span className="text-[10px] font-black bg-red-100 text-red-600 px-2 py-1 rounded-md mb-2 inline-block tracking-widest uppercase">
              Event Ended
            </span>
          )}
          <h2 className="text-xl font-bold text-gray-900">{eventName}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-tight">
              {sectionName} • {quantity} {quantity > 1 ? "Tickets" : "Ticket"}
            </p>
          </div>
          <p className="text-lg font-black text-black mt-2">₹{totalPrice.toLocaleString()}</p>
          <p className="text-[10px] text-gray-400 mt-3 font-medium">
            Event Date: {new Date(eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center border-l border-dashed border-gray-200 pl-6 pr-2">
          {qrCode ? (
            <img src={qrCode} alt="Entry QR" className="w-20 h-20 object-contain" />
          ) : (
            <div className="w-20 h-20 bg-gray-50 rounded-lg animate-pulse" />
          )}
          <p className="text-[9px] font-bold text-gray-400 mt-2 tracking-tighter uppercase">Entry Pass</p>
        </div>

        {/* Right Cut-out Decoration */}
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full border border-gray-100"></div>
      </div>

      {/* ACTION BUTTON */}
      {!isExpired ? (
        <button
          onClick={handlePrint}
          className="shrink-0 flex flex-col items-center justify-center gap-1 w-20 h-24 bg-black text-white rounded-2xl hover:bg-gray-800 transition-colors shadow-lg active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span className="text-[10px] font-bold uppercase">Print</span>
        </button>
      ) : (
          <div className="w-20 h-24 flex items-center justify-center text-gray-300">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
          </div>
      )}
    </div>
  );
};

export default TicketCard;
/** @format */
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import QrClient from "../company/Clients/QrClient";

const QRModal = ({ onClose }: { onClose: () => void }) => {
  const [scannedId, setScannedId] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-4 w-[360px] max-h-[90vh] overflow-y-auto text-center">
      <h2 className="text-lg font-bold mb-3">📷 QR Kod Oku</h2>
  
      {!scannedId ? (
        <Scanner
          components={{}}
          onScan={(result) => {
            if (result && result[0]?.rawValue) {
              setScannedId(result[0].rawValue);
            }
          }}
          onError={(error) => {
            console.error("QR hata:", error);
          }}
        />
      ) : (
        <QrClient id={scannedId} />
      )}
  
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        İptal
      </button>
    </div>
  </div>
  
  );
};

export default QRModal;

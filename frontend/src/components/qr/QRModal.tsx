import { Scanner } from "@yudiel/react-qr-scanner";

const QRModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 w-[320px] text-center">
        <h2 className="text-lg font-bold mb-3">📷 QR Kod Oku</h2>

        <Scanner
          components={{}}
          onScan={(result) => {
            console.log("QR kod:", result);
            onClose()
          }}
          onError={(error) => {
            console.error("QR hata:", error);
          }}
        />

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Kapat
        </button>
      </div>
    </div>
  );
};

export default QRModal;

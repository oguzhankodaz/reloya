/** @format */
import QRCode from "react-qr-code";

const QrPage = ({ id }: { id: string }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <QRCode value={id} size={160} />
    </div>
  );
};

export default QrPage;

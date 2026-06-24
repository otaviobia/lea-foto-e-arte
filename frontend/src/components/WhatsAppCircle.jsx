import { FaWhatsapp } from 'react-icons/fa';

function WhatsAppCircle() {
  return (
    <a
      className="z-100 bg-green-500 w-16 h-16 rounded-full fixed bottom-3 right-3 flex justify-center items-center hover:w-17 hover:h-17 animate-bounce-once"
      href="https://wa.me/5516997158260"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp className="text-white w-2/3 h-2/3" />
    </a>
  );
}

export default WhatsAppCircle;

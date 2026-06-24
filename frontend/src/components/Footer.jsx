import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-y-8 mt-10 pt-6 pb-4 relative bottom-0 text-white bg-lfapink">
      <div className="flex portrait:flex-col portrait:justify-start portrait:items-center portrait:gap-y-8 landscape:flex-row landscape:justify-center landscape:items-start landscape:gap-x-16">
        <div className="relative">
          <img
            className="max-w-12 -scale-x-100 portrait:absolute portrait:-top-12 portrait:-left-16 landscape:absolute landscape:-top-12 landscape:left-2.5"
            src="/images/tartaruga.png"
            alt="Tartaruga"
          />
          <img className="h-8" src="/images/nome.png" alt="Léa Foto e Arte" />
        </div>

        <div className="flex relative portrait:flex-col portrait:justify-start portrait:items-center portrait:gap-y-8 landscape:flex-row landscape:justify-center landscape:items-start landscape:gap-x-16">
          <div className="flex flex-col items-center justify-start font-viminalis">
            <h1 className="mb-1 text-lg font-bold">INSTITUCIONAL</h1>
            <a
              href="/"
              className="text-white text-lg no-underline hover:underline block"
            >
              Home
            </a>
            <a
              href="/sobre"
              className="text-white text-lg no-underline hover:underline block"
            >
              Sobre a Léa Foto e Arte
            </a>
            <a
              href="/politicas-da-loja"
              className="text-white text-lg no-underline hover:underline block"
            >
              Política da Loja
            </a>
          </div>

          <div className="flex flex-col items-center justify-start font-viminalis">
            <h1 className="mb-1 text-lg font-bold">CONTATO</h1>
            <a
              href="tel:+5516997158260"
              className="text-white text-lg no-underline hover:underline block"
            >
              (16) 99715-8260
            </a>
            <a
              href="mailto:leafotoearte@gmail.com"
              className="text-white text-lg no-underline hover:underline block"
            >
              leafotoearte@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center font-viminalis">
          <h1 className="font-bold">SIGA NOSSAS REDES SOCIAIS</h1>
          <div className="flex mt-1.5 gap-x-2">
            <a
              href="https://www.instagram.com/leafotoearte"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="w-8 h-8" alt="Instagram" />
            </a>
            <a
              href="https://www.facebook.com/leafotoearte"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook className="w-8 h-8" alt="Facebook" />
            </a>
            <a
              href="https://wa.me/5516997158260"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp className="w-8 h-8" alt="WhatsApp" />
            </a>
          </div>
        </div>
      </div>

      <p className="font-viminalis text-sm mt-4 text-center">
        © 2026, Léa Foto e Arte - CNPJ 29.402.767/0001-29
      </p>
    </footer>
  );
}

export default Footer;

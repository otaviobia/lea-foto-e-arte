import { useState } from "react";

const faqs = [
  {
    question: "Como comprar?",
    answer:
      "Após escolher os produtos você pode fazer seu pedido pela loja ou então nos enviar um WhatsApp.",
  },
  {
    question: "Como é feita a entrega?",
    answer:
      "A entrega é feita pelos correios ou pela transportadora Jadlog. Para moradores de Ribeirão Preto, o produto pode ser retirado no local.",
  },
  {
    question: "Como pagar?",
    answer:
      "O pagamento (100% do valor da encomenda + frete) pode ser feito por pix, boleto ou cartão de crédito. Por cartão é possível fazer parcelamento, mas fique atento porque há cobrança de juros.",
  },
  {
    question: "Qual o prazo de produção?",
    answer:
      "O prazo de produção dos produtos é de 7 a 10 dias úteis, e entrará em vigor somente após a confirmação do pagamento e aprovação de todos os modelos. Após esse tempo, a encomenda será postada nos correios.",
  },
  {
    question: "O que é considerado confirmação do pagamento?",
    answer: (
      <>
        PIX: assim que o dinheiro for liberado na conta.
        <br />
        Cartão de crédito: assim que o Mercado Pago enviar a confirmação por
        e-mail.
        <br />
        Boleto bancário: pagamento leva até 3 dias úteis para a confirmação.
      </>
    ),
  },
  {
    question: "Vou receber um modelo antes da minha compra ser enviada?",
    answer:
      "Sim, após a confirmação do pagamento você irá receber um modelo por WhatsApp de todos os itens comprados, para você conferir e aprovar.",
  },
  {
    question: "Depois que eu aprovar os modelos, posso fazer alguma alteração?",
    answer:
      "Fazemos todas as alterações necessárias até que tudo fique do seu gosto, mas assim que você aprovar o modelo, iniciamos a produção e não será mais possível alterar nada. Por isso, é muito importante conferir atentamente cada item.",
  },
  {
    question:
      "E se eu fizer o pedido em cima da hora e tiver algum atraso na entrega?",
    answer:
      "Não nos responsabilizamos por eventuais atrasos por parte dos correios ou da JadLog, por isso fique atento ao prazo de produção e ao prazo de entrega para planejar seu pedido com a antecedência necessária.",
  },
  {
    question: "Posso pedir um item em tema diferente do mostrado na loja?",
    answer:
      "Sim, todos os itens podem ser feitos em qualquer tema disponível na loja. Aquele bloquinho de safári? Pode virar de pirata, borboletas, o que você quiser.",
  },
];

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-lfapink">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 py-4 text-left cursor-pointer group"
      >
        <span className="text-xl font-bold text-lfapink group-hover:text-lfapink/80 transition-colors">
          {question}
        </span>
        <span
          className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-lfapink transition-all duration-200 ${
            isOpen ? "bg-lfapink" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-3 h-3 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-white" : "text-lfapink"
            }`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-lg leading-relaxed text-gray-600">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="font-viminalis">
      <h2 className="mb-4 text-center text-4xl">
        Tem alguma dúvida?
      </h2>

      <div>
        {faqs.map((item, i) => (
          <FAQItem
            key={i}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </section>
  );
}

export default FAQ;
import Container from "../components/Container";

function Politicas() {
  return (
  <main className="font-viminalis py-4">
    <Container className="max-w-5xl!">
    <h2>Última atualização: 12 de janeiro de 2024</h2>
    <h1 className="font-bold text-4xl pb-4">Políticas da loja</h1>
    <div className="space-y-4 text-xl">
      <p>
        Bem-vinda(o) à Léa Foto e Arte! Ao fazer o pedido indique os dados para
        serem personalizados e quando você precisa receber os produtos.
      </p>

      <ul className="space-y-3 list-disc list-inside">
        <li>
        Após a confirmação do pagamento, você receberá os modelos e assim que os
        aprovar, começa a contar o prazo de produção (para a maioria dos
        produtos): 7 dias úteis.
        </li>
        <li>
        Só fazemos personalizados com os nossos desenhos e artes. Por favor, não
        envie modelos de outras lojas.
        </li>
        <li>
        O pagamento deverá ser feito através do ZOOP (boleto bancário, cartão de
        crédito ou pix).
        </li>
        <li>
        O pagamento por boleto leva até 3 dias úteis para ser confirmado — se
        tiver pressa, não é a melhor opção.
        </li>
        <li>
        A entrega é feita pela Jadlog, Loggi ou Correios (PAC ou SEDEX), sendo o
        frete por conta do cliente. Não nos responsabilizamos por eventuais
        atrasos por parte deles. Fique atento ao prazo de produção + prazo de
        entrega para melhor escolha do tipo de frete. Em caso de atraso, entre em
        contato com a loja.
        </li>
        <li>
        Clientes de Ribeirão Preto que queiram retirar a encomenda devem informar
        no momento do pedido.
        </li>
        <li>
        A etiqueta de envio será gerada com o endereço cadastrado no site. Em caso
        de reenvio por endereço incorreto, o novo frete será por conta do
        comprador. Certifique-se de que seu endereço cadastrado é o endereço de
        entrega desejado.
        </li>
        <li>
        As transportadoras fazem 2 tentativas de entrega. Caso não encontrem
        ninguém, a encomenda segue para a agência, onde o comprador deve retirar.
        </li>
        <li>
        É responsabilidade do comprador acompanhar o rastreio (enviado por nós
        após a postagem) e, se necessário, retirar a caixa no local indicado.
        Caixas devolvidas por falta de retirada só serão reenviadas após o
        pagamento do novo frete. O valor da encomenda não será devolvido.
        </li>
        <li>
        Pedidos sem resposta por 3 dias serão cancelados. Caso ainda tenha
        interesse, realize um novo pedido.
        </li>
        <li>
        Por se tratarem de produtos personalizados, pedidos já pagos não poderão
        ser cancelados. Assim que você aprovar os modelos, o pedido entra em
        produção. Certifique-se de que os modelos estão corretos — correções após
        a aprovação serão cobradas à parte.
        </li>
      </ul>
      <p>Qualquer dúvida, entre em contato — será um prazer te atender!</p>
      </div>
      <img className="pt-4" src="/images/assinatura.png" alt="Léa Biagioni" />
    </Container>
  </main>
  );
}

export default Politicas
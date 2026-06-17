function FAQ() {
	return (
	  <section className="font-viminalis">
		<h2 className="text-center text-4xl">Tem alguma dúvida?</h2>
	  <details className="border-b border-lfapink mb-4 pb-2">
		<summary className="flex justify-between items-center text-2xl text-lfapink cursor-pointer">
		Como comprar?
		</summary>
		<div className="text-lg">
		<p>Após escolher os produtos você pode fazer seu pela loja ou então nos enviar um WhatsApp.</p>
		</div>
	  </details>
	  <details className="border-b border-lfapink mb-4 pb-2">
		<summary className="flex justify-between items-center text-2xl text-lfapink cursor-pointer">
		Como é feita a entrega?
		</summary>
		<div className="text-lg">
		<p>A entrega é feita pelos correios ou pela transportadora Jadlog. Para moradores de Ribeirão Preto, o produto pode ser retirado no local.</p>
		</div>
	  </details>
	  <details className="border-b border-lfapink mb-4 pb-2">
		<summary className="flex justify-between items-center text-2xl text-lfapink cursor-pointer">
		Como pagar?
		</summary>
		<div className="text-lg">
		<p>O pagamento (100% do valor da encomenda + frete) pode ser feito por pix, boleto ou cartão de crédito. Por cartão é possível fazer parcelamento, mas fique atento porque há cobrança de juros.</p>
		</div>
	  </details>
	  <details className="border-b border-lfapink mb-4 pb-2">
		<summary className="flex justify-between items-center text-2xl text-lfapink cursor-pointer">
		Qual o prazo de produção?
		</summary>
		<div className="text-lg">
		<p>O prazo de produção dos produtos é de 7 a 10 dias úteis, e entrará em vigor somente após a confirmação do pagamento e aprovação de todos os modelos. Após esse tempo, a encomenda será postada nos correios.</p>
		</div>
	  </details>
	  <details className="border-b border-lfapink mb-4 pb-2">
		<summary className="flex justify-between items-center text-2xl text-lfapink cursor-pointer">
		O que é considerado confirmação do pagamento?
		</summary>
		<div className="text-lg">
		<p>PIX: assim que o dinheiro for liberado na conta.<br></br>Cartão de Crédito: assim que o Mercado Pago enviar a confirmação por e-mail.<br></br>Boleto Bancário: pagamento leva até 3 dias úteis para a confirmação.</p>
		</div>
	  </details>
	  <details className="border-b border-lfapink mb-4 pb-2">
		<summary className="flex justify-between items-center text-2xl text-lfapink cursor-pointer">
		Vou receber um modelo antes da minha compra ser enviada?
		</summary>
		<div className="text-lg">
		<p>Sim, após a confirmação do pagamento você irá receber um modelo por WhatsApp de todos os itens comprados, para você conferir e aprovar.</p>
		</div>
	  </details>
	  <details className="border-b border-lfapink mb-4 pb-2">
		<summary className="flex justify-between items-center text-2xl text-lfapink cursor-pointer">
		Depois que eu aprovar os modelos, posso fazer alguma alteração?
		</summary>
		<div className="text-lg">
		<p>Nós fazemos todas as alterações necessárias até que tudo fique do seu gosto, mas assim que você aprovar o modelo, iniciamos a produção e não será mais possível alterar nada. Por isso, é muito importante conferir atentamente cada item.</p>
		</div>
	  </details>
	  <details className="border-b border-lfapink mb-4 pb-2">
		<summary className="flex justify-between items-center text-2xl text-lfapink cursor-pointer">
		E se eu fizer o pedido em cima da hora e tiver algum atraso na entrega?
		</summary>
		<div className="text-lg">
		<p>Não nos responsabilizamos por eventuais atrasos por parte dos correios ou da JadLog, por isso, fique atento ao prazo de produção e ao prazo de entrega para planejar o seu pedido com a antecedência necessária.</p>
		</div>
	  </details>
	  <details className="border-b border-lfapink mb-4 pb-2">
		<summary className="flex justify-between items-center text-2xl text-lfapink cursor-pointer">
		Gostei muito do bloquinho de safári, mas a festa do meu filho será de pirata. É possível fazer com esse tema?
		</summary>
		<div className="text-lg">
		<p>Sim, todos os itens podem ser feitos em qualquer tema que tenha na loja.</p>
		</div>
	  </details>
      </section>
	)
}

export default FAQ

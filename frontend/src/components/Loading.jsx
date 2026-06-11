import './loading.css'

function Loading() {
  return (
    <main className="loading-container">
      <img 
        className="loading-imagem animate-bounce-puro" 
        src="/images/borboleta.png" 
        alt="Carregando..." 
      />
      <h1 className="loading-texto">Carregando...</h1>
    </main>
  )
}

export default Loading

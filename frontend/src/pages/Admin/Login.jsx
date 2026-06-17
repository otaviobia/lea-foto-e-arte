function AdminLogin() {
  return (
  <main className="font-viminalis bg-gray-200 h-screen flex justify-center items-center">
  <div className="bg-white rounded-xl flex flex-col p-4 min-w-80 lg:min-w-100">
    <div className="flex flex-col items-center">
      <img className="w-16" src="/images/tartaruga.png" alt="Tartaruga" />
      <h1 className="text-3xl font-bold">Backoffice</h1>
      <p>Léa Foto e Arte</p>
    </div>
    <p className="text-gray-600">Email</p>
    <input className="bg-gray-100 p-2 rounded-xl" type="email" name="email" id="email" placeholder="admin@leafotoearte.com.br" />
    <p className="text-gray-600">Senha</p>
    <input className="bg-gray-100 p-2 rounded-xl" type="password" name="password" id="password" />
    <input className="bg-lfapink p-2 rounded-xl mt-2 text-white" type="submit" value="Entrar" />
  </div>
  </main>
  )
}

export default AdminLogin
const { http } = require("../../providers/httpClient/axios")

console.log('Script da página de login')

function redirectToQrCode() {
  const email = 'john@vendergas.com'
  const senha = '123456'

  http.post('/usuarios/auth', {
    email,
    senha
  }).then(() => {
    alert('Logado com sucesso')
    const anchor = document.createElement('a')
    anchor.setAttribute('href', '../qrcode/index.html')
    anchor.click()
  }).catch((err) => {
    alert(err.response.data.message || err.message)
  })
}
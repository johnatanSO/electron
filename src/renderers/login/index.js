console.log('Script da página de login')

function redirectToQrCode() {

  console.log('redirecionando para a página de QR CODE')

  const anchor = document.createElement('a')
  anchor.setAttribute('href', '../qrcode/index.html')
  anchor.click()
}
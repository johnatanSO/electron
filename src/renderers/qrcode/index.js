const qrcode = require('qrcode')
const { useMultiFileAuthState, default: makeWASocket, DisconnectReason } = require("@whiskeysockets/baileys")

const qrcodeImage = document.getElementById('qrcodeImage')

function backPage() {
  console.log('redirecionando para a página de LOGIN')

  const anchor = document.createElement('a')
  anchor.setAttribute('href', '../login/index.html')
  anchor.click()
}

async function onConnectWa() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_keys')

  const sock = makeWASocket({
    printQRInTerminal: false,
    auth: state
  })

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update

    if (qr) {

      var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        scale: 15,
        margin: 1,
        color: {
          dark:"#010599FF",
          light:"#FFBF60FF"
        }
      }
      
      qrcode.toDataURL('generate code', opts, (err, url) => {
        console.log('url', url)
        qrcodeImage.setAttribute('src', url)
      })
    }

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
      console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
      // reconnect if not logged out
      if(shouldReconnect) {
        onConnectWa()
      }
    }
  })

  sock.ev.on('creds.update', saveCreds)
}
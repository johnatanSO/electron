function backPage() {
  console.log('redirecionando para a página de LOGIN')

  const anchor = document.createElement('a')
  anchor.setAttribute('href', '../login/index.html')
  anchor.click()
}
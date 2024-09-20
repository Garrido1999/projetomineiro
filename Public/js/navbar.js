document.addEventListener('DOMContentLoaded', function() {
    // Obter os modais
    const loginModal = document.getElementById('loginModal');
    const cadastroModal = document.getElementById('cadastroModal');
  
    // Obter os botões que abrem os modais
    const loginBtn = document.getElementById('login-btn');
    const cadastroBtn = document.getElementById('cadastro-btn');
  
    // Obter os botões de fechar (ambos os modais têm o mesmo botão de fechar com classe 'close')
    const closeBtns = document.getElementsByClassName('close');
  
    // Abrir o modal de login ao clicar no botão "Entrar"
    loginBtn.onclick = function() {
      loginModal.style.display = "block";
    }
  
    // Abrir o modal de cadastro ao clicar no botão "Cadastro de Cooperado"
    cadastroBtn.onclick = function() {
      cadastroModal.style.display = "block";
    }
  
    // Fechar os modais ao clicar no botão de fechar ('X')
    for (let i = 0; i < closeBtns.length; i++) {
      closeBtns[i].onclick = function() {
        loginModal.style.display = "none";
        cadastroModal.style.display = "none";
      }
    }
  
    // Fechar os modais ao clicar fora do conteúdo do modal
    window.onclick = function(event) {
      if (event.target == loginModal) {
        loginModal.style.display = "none";
      }
      if (event.target == cadastroModal) {
        cadastroModal.style.display = "none";
      }
    }
  });
  
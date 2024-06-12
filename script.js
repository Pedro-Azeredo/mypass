const localStorageKey = 'espaco';

const inputRange = document.querySelector('.input-range'); // Range

const textoInput = document.querySelector('.size'); //Tamanho

const btnGerarSenha = document.querySelector('.btn-gerar-senha'); //botao senha

inputRange.addEventListener('change', () => {
  textoInput.innerHTML = +inputRange.value;
}); //atualizar valor do tamanho da senha

function novoEspaco() {
  let inputRede = document.querySelector('.input-rede');
  let inputLogin = document.querySelector('.input-login');
  let inputSenha = document.querySelector('.input-senha');

  //validação
  if (!inputRede.value) {
    alert('O nome da rede não pode ficar em branco');
  } else if (!inputLogin.value) {
    alert('O login não pode ficar em branco');
  } else if (!inputSenha.value) {
    alert('A senha não pode ficar em branco');
  } else {
    //se der bom encrementar o local storage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    values.push({
      login: inputLogin.value,
      senha: inputSenha.value,
      rede: inputRede.value,
    });
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    mostrarValues();
  }
}

function mostrarValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
  let list = document.querySelector('.lista');
  list.innerHTML = '';
  for (let i = 0; i < values.length; i++) {
    list.innerHTML += `<li><p class="espaco-rede">${values[i]['rede']}</p>
                      <div class="espaco"><div class="espaco-esquerda"><p class="espaco-login">Login</p><input type="text" class="espaco-login-exibir" value="${values[i]['login']}"></div><div class="espaco-direita"><p class="espaco-senha">Senha</p><input type="text" class="espaco-senha-exibir" value="${values[i]['senha']}"></div><div class="espaco-btn"><button class="espaco-olho"><img src="img/olhos.svg"></button><button onclick='removeItem("${values[i]['senha']}")'
                      class="espaco-lixeira"><img src="img/lixeira.svg"></button></div></div></li>`;
  }
}
function removeItem(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
  let index = values.findIndex((x) => x.senha == data);
  values.splice(index, 1);
  localStorage.setItem(localStorageKey, JSON.stringify(values));
  mostrarValues();
}

mostrarValues();

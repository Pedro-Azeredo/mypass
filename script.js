const localStorageKey = 'espaco'; //chave do local storage
const inputRange = document.querySelector('.input-range'); // Range
const textoInput = document.querySelector('.size'); //Tamanho
const btnOlhoDir = document.querySelector('.espaco-olho');

inputRange.addEventListener('change', () => {
  textoInput.innerHTML = +inputRange.value;
}); //atualizar valor do tamanho da senha

document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    novoEspaco();
  }
}); // acionar quando aperto enter

function esconder() {
  let inputSenha = document.querySelector('.input-senha');
  if (inputSenha.type == 'password') {
    inputSenha.type = 'text';
  } else {
    inputSenha.type = 'password';
  }
} // esconder senha box esquerda

function esconderSenha() {
  let inputSenha = document.getElementsByClassName('espaco-senha-exibir');
  for (let i = 0; i < inputSenha.length; i++) {
    if (inputSenha[i].type == 'text') {
      inputSenha[i].type = 'password';
    } else {
      inputSenha[i].type = 'text';
    }
  }
}

function novoEspaco() {
  let inputRede = document.querySelector('.input-rede');
  let inputLogin = document.querySelector('.input-login');
  let inputSenha = document.querySelector('.input-senha');
  let contemRede = document.querySelector('.input-rede').value;
  let contemLogin = document.querySelector('.input-login').value;
  let contemSenha = document.querySelector('.input-senha').value;
  inputRede.style.border = '';
  inputLogin.style.border = '';
  inputSenha.style.border = '';
  //validação
  if (!inputRede.value) {
    alert('O nome da rede não pode ficar em branco');
    inputRede.style.border = '0.5px solid #8B0000';
  } else if (!inputLogin.value) {
    alert('O login não pode ficar em branco');
    inputLogin.style.border = '0.5px solid #8B0000';
  } else if (!inputSenha.value) {
    inputSenha.style.border = '0.5px solid #8B0000';
    alert('A senha não pode ficar em branco');
  } else if (contemLogin == "'" || contemRede == "'" || contemSenha == "'") {
    alert('Caracter Invalido');
  } else {
    //se der bom encrementar o local storage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    if (values.length >= 5) {
      alert('Numero Máximo são 5 senhas');
    } else {
      values.push({
        login: inputLogin.value,
        senha: inputSenha.value,
        rede: inputRede.value,
      });
      localStorage.setItem(localStorageKey, JSON.stringify(values));
      mostrarValues();
    }
  }
  inputLogin.value = '';
  inputSenha.value = '';
  inputRede.value = '';
}
function mostrarValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
  let list = document.querySelector('.lista');
  list.innerHTML = '';
  for (let i = 0; i < values.length; i++) {
    list.innerHTML += `<li><p class="espaco-rede">${values[i]['rede']}</p>
                      <div class="espaco"><div class="espaco-esquerda"><p class="espaco-login">Login</p><input type="text" class="espaco-login-exibir" value="${values[i]['login']}"></div><div class="espaco-direita"><p class="espaco-senha">Senha</p><input type="text" class="espaco-senha-exibir" value="${values[i]['senha']}"></div><div class="espaco-btn"><button class="espaco-olho" onclick='esconderSenha()'><img src="img/olhos.svg"></button><button onclick='removeItem("${values[i]['senha']}")'
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
//execução automatica quando inicia a pagina
mostrarValues();

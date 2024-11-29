// Função de saudação baseada no horário
function saudacao() {
  var agora = new Date();
  var hora = agora.getHours();
  var saudacaoTexto;

  if (hora >= 0 && hora < 12) {
    saudacaoTexto = "Bom dia!";
  } else if (hora >= 12 && hora < 18) {
    saudacaoTexto = "Boa tarde!";
  } else {
    saudacaoTexto = "Boa noite!";
  }

  var saudacaoElemento = document.getElementById("saudacao");
  if (saudacaoElemento) {
    saudacaoElemento.innerText = saudacaoTexto;
  }
}

// Função para salvar os dados do formulário no sessionStorage
function salvarDadosFormulario(event) {
  event.preventDefault(); // Previne o envio padrão do formulário

  var formulario = event.target; // Obtém o formulário que disparou o evento
  var dados = {};

  // Percorre todos os elementos do formulário
  for (var i = 0; i < formulario.elements.length; i++) {
    var elemento = formulario.elements[i];

    // Verifica se o elemento possui um nome
    if (elemento.name) {
      if (elemento.type === "radio" || elemento.type === "checkbox") {
        // Para radio e checkboxes registra as opções selecionadas
        if (!dados[elemento.name]) {
          dados[elemento.name] = new Array;
        }
        if (elemento.checked) {
          dados[elemento.name].push(elemento.value);
        }
      } else {
        dados[elemento.name] = elemento.value;
      }
    }
  }

  // Salva os dados no sessionStorage
  sessionStorage.setItem(formulario.id, JSON.stringify(dados));
  alert("Dados salvos com sucesso no sessionStorage!");
  formulario.reset()
}

// Define os eventos ao carregar a página
window.onload = function () {
  // Adiciona os eventos de submit nos formulários
  var formularios = Array.from(document.getElementsByTagName("form"));

  formularios.forEach((formulario) =>
    formulario.addEventListener("submit", salvarDadosFormulario)
  );

  // Chama a função de saudação
  saudacao();
};

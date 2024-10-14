// Selecionando os elementos do HTML
const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

// Função para criar um elemento "<li>" no HTML
function criaLi() {
  const li = document.createElement('li') // Cria um elemento "<li>"
  return li
}

// Evento que escuta quando a tecla ENTER é pressionada no input de tarefa
inputTarefa.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) { // Verifica se a tecla pressionada é a tecla ENTER (keyCode 13)
    if (!inputTarefa.value) return // Se o input estiver vazio, a função é interrompida
    criaTarefa(inputTarefa.value) // Cria uma nova tarefa com o valor do input
    limparInput() // Limpa o input
  }
})

// Função para limpar o input de tarefa e focar novamente no input
function limparInput() {
  inputTarefa.value = "" // Limpa o valor do input
  inputTarefa.focus() // Foca novamente no input
}

// Função para criar um botão de apagar e adicioná-lo a um elemento "<li>"
function criaBotaoApagar(li) {
  const botaoApagar = document.createElement('button') // Cria um botão
  botaoApagar.innerText = 'Apagar' // Define o texto do botão
  botaoApagar.setAttribute('class', 'apagar') // Adiciona a classe 'apagar' ao botão
  botaoApagar.setAttribute('title', 'Apaga essa tarefa') // Define o título do botão
  li.appendChild(botaoApagar) // Adiciona o botão como filho do elemento "<li>"
}

// Função para a criação de uma nova tarefa
function criaTarefa(textoInput) {
  const li = criaLi() // Cria um novo elemento "<li>"
  li.innerHTML = textoInput // Define o texto do "<li>" como o valor do input
  tarefas.appendChild(li) // Adiciona o elemento "<li>" à lista de tarefas (elemento <ul>)
  limparInput() // Limpa o input
  criaBotaoApagar(li) // Adiciona o botão de apagar à nova tarefa
  salvaTarefas() // Salva as tarefas no armazenamento local
}

// Evento de clique para o botão de adicionar tarefa
btnTarefa.addEventListener('click', function() {
  if (!inputTarefa.value) return // Se o input estiver vazio, a função é interrompida
  criaTarefa(inputTarefa.value) // Cria uma nova tarefa com o valor do input
  limparInput() // Limpa o input
})

// Evento global de clique para lidar com a exclusão de tarefas
document.addEventListener('click', function(e) {
  const elemento = e.target // Obtém o elemento clicado

  if (elemento.classList.contains('apagar')) { // Verifica se o elemento clicado tem a classe 'apagar'
    elemento.parentElement.remove() // Remove o elemento pai (a tarefa) do DOM
    salvaTarefas() // Salva as tarefas atualizadas no armazenamento local
  }
})

// Função para salvar as tarefas no armazenamento local
function salvaTarefas() {
  const liTarefas = tarefas.querySelectorAll('li') // Seleciona todos os elementos "<li>"
  const listaDeTarefas = [] // Cria um array para armazenar as tarefas

  for (let tarefa of liTarefas) { // Itera sobre todos os elementos "<li>"
    let tarefaTexto = tarefa.innerText // Obtém o texto da tarefa
    tarefaTexto = tarefaTexto.replace('Apagar', '') // Remove o texto 'Apagar'
    listaDeTarefas.push(tarefaTexto) // Adiciona o texto da tarefa ao array
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas) // Converte o array de tarefas para JSON
  localStorage.setItem('tarefas', tarefasJSON) // Salva o JSON no armazenamento local
}

// Função para adicionar as tarefas salvas do armazenamento local ao DOM
function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas') // Obtém as tarefas salvas do armazenamento local
  const listaDeTarefas = JSON.parse(tarefas) // Converte as tarefas de JSON para um array

  for (let tarefa of listaDeTarefas) { // Itera sobre as tarefas salvas
    criaTarefa(tarefa) // Cria uma nova tarefa no DOM para cada tarefa salva
  }
}

// Chama a função para adicionar as tarefas salvas ao carregar a página
adicionaTarefasSalvas()

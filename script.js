
// Array do TODO
let array = [
    {id:create_UUID(), task:'Entregar Projeto'},
    {id:create_UUID(), task:'Estudar JS'},
    {id:create_UUID(), task:'Fazer Commit'},
    {id:create_UUID(), task:'Limpar a Casa'},
    {id:create_UUID(), task:'Fazer Compras do Super'}
]

// cria um UUID
function create_UUID() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt/16);
        return (c == 'x' ? r :(r&0x3 | 0x8)).toString(16);
    });
    return uuid;
}

// variáveis do HTML para trabalhar com DOM
let btnAddTask = document.querySelector('#btnAddTask');
let inputNewTask = document.querySelector('#inputNewTask');
let editWindow = document.querySelector('#editWindow');
let windowEditBack = document.querySelector('#windowEditBack');
let btnEditWindowClose = document.querySelector('#btnEditWindowClose');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTaskNameEdit = document.querySelector('#inputTaskNameEdit');
let btnAttTask = document.querySelector('#btnAttTask');
let inputTask = document.getElementsByClassName("input-task");

// Mostrar modal ao apertar botão +
function AddWindow() {
    AddWindowDiv.classList.toggle('abrir'); // para abrir o modal para adicionar tarefa
    windowEditBack.classList.toggle('abrir'); // para deixar o fundo preto opaco
}

// risca a task no front pelo checkbox
function check(idTask) {
    const cb = document.querySelector('#check' + idTask);
    const task = document.getElementById('span' + idTask);
    
    if(cb.checked) {
        task.style.textDecoration = 'line-through';
    } 
    else if(!cb.check) {
        task.style.textDecoration = 'none';
    }
}

// adiciona a tarefa quando clicar no Salvar
btnAddTask.addEventListener('click', () => {
    const taskValue = inputNewTask.value; // varivel para guardar o valor que está no meu input

    if(taskValue) { // if para não adicionar task vazia
        array.push( {id:create_UUID(), task:taskValue} )
    }
    else {
        alert("Precisa digitar um nome para tarefa") 
        return
    }

    inputNewTask.value = "" // para quando clicar no botão adicionar, o campo input fica vazio

    showResult(); // Atualizar interface/tela com os objetos alterados do aray 
    AddWindow(); // para voltar a tela inicial e sair do modal 
})

// Tafera para quando o botão EDITAR é acionado
function edit(idTask){
    document.getElementById("inputTaskNameEdit").dataset.idTask = idTask; // Pegamos o id da tafera para editar
    let li = document.getElementById('' + idTask + ''); // Pegamos o li da tafera pelo Id

    if(li) {
        // idTarefaEdicao.innerHTML = '#' +idTask;  // Ativar caso queira saber qual o ID da tarefa no popup editar
        inputTaskNameEdit.value = li.innerText; // coloca o nome da tarefa atuar no input de editar
        shiftWindow();
    }
}

// Tarefa para atualizar o valor editado quando clicar em Atualizar
function update() {
    let updte = document.getElementById("inputTaskNameEdit").value; // pega o valor digitado no input editar
    idTask = document.getElementById("inputTaskNameEdit").dataset.idTask; // Pegamos o id da tafera para editar
   
    // Descobir qual é o índice da tarefa a ser editada
    const iTODO = array.findIndex(({id}) => id == idTask)

    array[iTODO].task = updte; // pegamos o array no indice a ser editado, e passamos o novo valor capturado no update
    shiftWindow() // sai do modal Editar
    showResult() // mostra a lista de tarefas, já com o array editado na tela 
}

// Ao clicar no botão fechar do modal Editar ele chama a funcao alternar janela para voltar a tela inicial
btnEditWindowClose.addEventListener('click', (e) => {
    shiftWindow();
});


// adiciona a classe abrir no html para que possamos tratar ela no css com o display
function shiftWindow() {
    editList.classList.toggle('abrir');
    windowEditBack.classList.toggle('abrir');
}

// deleta a tarefa
function delet(idTask) {
    let confirmation = window.confirm('Tem certeza que deseja excluir essa tarefa?')

    if (confirmation) {
        // indentificamos qual o índice 
        const iTODO = array.findIndex(({id}) => id == idTask)

        // Remove o Li do html
        const taskRemove = document.getElementById(idTask);
        taskRemove.parentNode.removeChild(taskRemove);

        return array.splice(iTODO, 1); // retorna a array sem o elemento excluido
    }     
}

// Atualizar interface/tela com os objetos alterados do aray 
function showResult() {
    // cria o ul do TODO
    let ul = document.querySelector("ul") // quando eu clicar em + ele vai selecionar a minha ul do html
    ul.innerHTML = null // impede de repetir todas as tarefas quando entra uma nova

    array.forEach(function (taskIn) {
        // cria o li de cada TODO
        let li = document.createElement("li");
        li.id = taskIn.id;

        // cria o ícone do check
        let decoration = document.createElement('input')
        decoration.setAttribute("type", "checkbox");
        decoration.id = "check" + taskIn.id;
        decoration.setAttribute("onclick", `check('${taskIn.id}')`);

        // cria o span de cada TODO
        let span = document.createElement('span');
        span.classList.add('taskList');
        span.id = "span" + taskIn.id;
        span.innerHTML = taskIn.task;

        // cria o div de cada TODO
        let div = document.createElement('div');

        // cria o button (edit) de cada TODO
        let btnEdit = document.createElement('button');
        btnEdit.classList.add('btnAction'); 
        btnEdit.innerHTML = '<img src="Assets/pencil.svg">';
        btnEdit.setAttribute("onclick", `edit('${taskIn.id}')`);
        btnEdit.setAttribute("id", taskIn.id);

        // cria o button (delete) de cada TODO
        let btnTrash = document.createElement('button');
        btnTrash.classList.add('btnAcao'); 
        btnTrash.innerHTML = '<img src="Assets/trash.svg" alt="ícone lixeira">';
        btnTrash.setAttribute("onclick", `delet('${taskIn.id}')`);
        btnTrash.setAttribute("id", taskIn.id);

        // Adição do <li> do TODO no <ul>
        ul.appendChild(li); // insere o li dentro do ul de cima
        li.appendChild(decoration); // insere a div de decoração dentro da li
        li.appendChild(span); // insere o span dentro do ul de cima
        li.appendChild(div); // insere o div dentro do ul de cima
        div.appendChild(btnTrash);// insere o btnTrash dentro do div de cima
        div.appendChild(btnEdit);// insere o btnEdit dentro do div de cima
    })
}

// Executa Função para Mostrar o TODO
showResult();

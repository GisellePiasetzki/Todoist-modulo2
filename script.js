
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


// variáveis do HTML
let btnAddTask = document.querySelector('#btnAddTask');
let inputNewTask = document.querySelector('#inputNewTask');
let editWindow = document.querySelector('#editWindow');
let windowEditBack = document.querySelector('#windowEditBack');
let btnEditWindowClose = document.querySelector('#btnEditWindowClose');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTaskNameEdit = document.querySelector('#inputTaskNameEdit');
let btnAttTask = document.querySelector('#btnAttTask');
let inputTask = document.getElementsByClassName("input-task");



// adiciona a tarefa
btnAddTask.addEventListener('click', () => {
    let taskValue = inputNewTask.value; //varivel para guardar o valor que está no meu input
    array.push({id:create_UUID(), task:taskValue})
    
    inputNewTask.value = "" // para quando clicar no botão adicionar, o campo input fica vazio

    showResult()
    console.log(array)
})


// Tafera para quando o botão EDITAR é acionado
function edit(idTask){

    document.getElementById("inputTaskNameEdit").dataset.idTask = idTask; //Pegamos o id da tafera para editar
    let li = document.getElementById(''+idTask+''); //Pegamos o li da tafera pelo Id

    if (li){
        // idTarefaEdicao.innerHTML = '#' +idTask;  // Ativar caso queira saber qual o ID da tarefa no popup editar
         inputTaskNameEdit.value = li.innerText; // coloca o nome da tarefa atuar no input de editar
        alternarJanelaEdicao();
    }
    
}

// Tarefa para atualizar o valor editado quando clicar em Salvar
function update() {
    let updte = document.getElementById("inputTaskNameEdit").value; // pega o valor digitado no input editar
    idTask = document.getElementById("inputTaskNameEdit").dataset.idTask; //Pegamos o id da tafera para editar
   
    // Descobir qual é o índice da tarefa a ser editada
    const iTODO = array.findIndex(({id}) => id == idTask)

    array[iTODO].task = updte; // pegamos o array no indice a ser editado, e passamos o novo valor capturado no update
    alternarJanelaEdicao() // sai do popUp Editar
    showResult() //mostra a lista de tarefas, já com o array editado na tela 
  }

// Ao clicar no botão fechar do popUp Editar ele chama a funcao alternarJanelaEdicao para voltar a tela inicial
btnEditWindowClose.addEventListener('click', (e) => {
    alternarJanelaEdicao();
});


// adiciona a classe abrir no html para que possamos tratar ela no css com o display
function alternarJanelaEdicao() {
    editList.classList.toggle('abrir');
    windowEditBack.classList.toggle('abrir');
}


// deleta a tarefa
function delet(idTask) {
    let confirmation = window.confirm('Tem certeza que deseja excluir essa tarefa?')


    if (confirmation) {
        
        //indentificamos qual o índice 
        const iTODO = array.findIndex(({id}) => id == idTask)

        // Remove o Li do html
        const taskRemove = document.getElementById(idTask);
        taskRemove.parentNode.removeChild(taskRemove);

        return array.splice(iTODO, 1); // retorna a array sem o elemento excluido
        
    }     
}


// mostrar as tarefas do array na tela
function showResult() {
    // cria o ul do TODO
    let ul = document.querySelector("ul") // quando eu clicar em + ele vai selecionar a minha ul do html
    ul.innerHTML = null // impede de repetir todas as tarefas quando entra uma nova

    array.forEach(function (taskIn) {
        // cra o li de cada TODO
        let li = document.createElement("li");
        li.id = taskIn.id;


        // cria o ícone do check
        let decoration = document.createElement('span')
        decoration.classList.add('li-decoration');
        decoration.innerHTML = '<img src="Assets/check.svg" alt="ícone de check">';

        // cria o span de cada TODO
        let span = document.createElement('span');
        span.classList.add('taskList');
        span.id = taskIn.id;
        span.innerHTML = taskIn.task;

        // cra o div de cada TODO
        let div = document.createElement('div');

        
        // cria o button (edit) de cada TODO
        let btnEdit = document.createElement('button');
        btnEdit.classList.add('btnAction'); 
        btnEdit.innerHTML = '<i class="fa fa-pencil"></i>';
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




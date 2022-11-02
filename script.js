
let array = [
    {id:create_UUID(), task:'teste 1'},
    {id:create_UUID(), task:'teste 2'},
    {id:create_UUID(), task:'teste 3'},
    {id:create_UUID(), task:'teste 4'},
    {id:create_UUID(), task:'teste 5'},
    {id:create_UUID(), task:'teste 6'}
]

let btnAddTask = document.querySelector('#btnAddTask');
let inputNewTask = document.querySelector('#inputNewTask');


// cria um UUID
function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt/16);
        return (c == 'x' ? r :(r&0x3 | 0x8)).toString(16);
    });
    return uuid;
}


// adiciona tarefa
btnAddTask.addEventListener('click', () => {
    let taskValue = inputNewTask.value; //varivel para guardar o valor que está no meu input
    array.push({id:create_UUID(), task:taskValue})
    
    inputNewTask.value = "" // para quando clicar no botão adicionar, o campo input fica vazio

    showResult()
    console.log(array)
})

// mostrar a tarefa recebida na tela
function showResult() {
    let ul = document.querySelector("ul") // quando eu clicar em + ele vai selecionar a minha ul do html
    ul.innerHTML = null // impede de repetir todas as tarefas quando entra uma nova

    array.forEach(function (taskIn) {
        let li = document.createElement("li"); // cria um li
        li.id = taskIn.id;

        let decoration = document.createElement('span')
        decoration.classList.add('li-decoration');
        decoration.innerHTML = '<img src="Assets/check.svg" alt="ícone de check">';

        let span = document.createElement('span');
        span.classList.add('taskList');
        span.id = taskIn.id;
        span.innerHTML = taskIn.task;
        // li.innerText = task; // insere o texte capturado dentro do li

        let div = document.createElement('div');

        let btnTrash = document.createElement('button');
        btnTrash.classList.add('btnAction'); 
        btnTrash.innerHTML = '<img src="Assets/trash.svg" alt="ícone lixeira">';
        btnTrash.setAttribute("onclick", `delet('${taskIn.id}')`);
        btnTrash.setAttribute("id", taskIn.id);

        ul.appendChild(li); // insere o li dentro do ul de cima
        li.appendChild(decoration); // insere a div de decoração dentro da li
        li.appendChild(span); // insere o span dentro do ul de cima
        li.appendChild(div); // insere o div dentro do ul de cima
        div.appendChild(btnTrash);// insere o btnTrash dentro do div de cima
    })
}

showResult();

function delet(idTask) {
    let confirmation = window.confirm('Tem certeza que deseja excluir essa tarefa?')

    if (confirmation) {
        //indentificamos qual o índice 
        for(let i = 0; i < array.length; i++) {
            if(idTask == array[i].id) {
                iTODO = i;
                break
            }
        }

        // Remove o Li do html
        const taskRemove = document.getElementById(idTask);
        taskRemove.parentNode.removeChild(taskRemove);

        return array.splice(iTODO, 1); // retorna a array sem o elemento excluido
    }     
}

document.addEventListener("DOMContentLoaded", function() {
    let lista = document.querySelector('#taskList');
    let campo = document.querySelector('.campo');
    let span; // variável que receberá a LI que está sendo editada

    lista.addEventListener('click', function(event) {
        span = event.target;
        if(span.tagName == "SPAN") { // verifica se é uma LI
            campo.value = span.textContent;
        };
    });
    
    campo.addEventListener('keypress', function(event) {
        if(event.keyCode === 13 && span) {
            for(let i = 0; i < array.length; i++) {
                if(span.id === array[i].id) {
                    array[i].task = campo.value;
                }
            }

            span.textContent = campo.value;
            campo.value = ''; // esvazia o campo
            span = null; // reseto a variável
            
            console.log(array)
        };
    });
});






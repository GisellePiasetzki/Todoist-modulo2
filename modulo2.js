
const array = [{id:1,task:'Estudar JS'},{id:2,task:'Reunir o grupo no domingo'}]

const add = (text) => {

    let max_id = 0
   
    for(let i = 0; i < array.length; i++) {
        max_id = array[i].id + 1
    }

    array.push({id:max_id,task:text})
    console.log(array)
}

const remove = (argument) => {

    let indice = 0
    if(!isNaN(argument)){
    for(let i = 0; i < array.length; i++) {
        if (array[i].id == argument){
            indice = i
        }
    }} else {
        for(let i = 0; i < array.length; i++) {
            if (array[i].task.search(argument)){
                indice = i
            }
        }
    }

    array.splice(indice,1)
    console.log(array)
}

const edit = (number,text) => {

    let indice = 0
    
    for(let i = 0; i < array.length; i++) {
        if (array[i].id == number){
            indice = i
        }
    }


    array[indice].task = text
    console.log(array)
}

add('Escovar os dentes')

remove(1)

edit(3,'Fazer o jantar')

add('Brilhar')

remove(3)

add('Jogar video game')

remove('video')


const newElement = (element,text) => {
    const li = document.createElement("li");
    const t = document.createTextNode(text);
    li.appendChild(t);
    li.id = text
    document.getElementById(element).appendChild(li);
}

for(let j = 0; j < array.length; j++){
    newElement('lista_id',array[j].id)
    newElement('lista_task',array[j].task)
}

const addinput = () => {
    const value = document.getElementById("myInput").value;
    add(value)
    document.getElementById("myInput").value = "";
    const idadd = array[array.length - 1].id
    newElement('lista_id',idadd)
    const elementadd = array[array.length - 1].task
    newElement('lista_task',elementadd)
}

const removeinput = () => {
    let value = document.getElementById("myInput").value;
    let value_id = 0
    for(let i = 0; i < array.length; i++) {
        if (array[i].task.search(value)){
            indice = i
            value_id = array[i].id
            value = array[i].task
        }
    }
    remove(value)
    document.getElementById("myInput").value = "";
    const idremove = document.getElementById(value_id);
    idremove.parentNode.removeChild(idremove)
    const taskremove = document.getElementById(value);
    taskremove.parentNode.removeChild(taskremove)

}

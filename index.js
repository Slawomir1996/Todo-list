let todoInput
let errorInfo
let addBtn
let ulList
let targetedChild


let popup
let popupInfo
let todoToEdit
let popupInput
let popupAddBtn
let popupCloseBtn



const main = () => {
    prepareDOMElement()
    prepareDOMEvents()

}

const prepareDOMElement = () => {
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
    targetedChild = document.querySelectorAll('li')


}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewTask)
    ulList.addEventListener('click', checkClick)

    popupCloseBtn.addEventListener('click', clousePopup)
    popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKeyCheck)
    popupInput.addEventListener('keyup', checkpopupEwent)


};



const addNewTask = () => {
    if (todoInput.value !== '') {
        const newTodo = document.createElement('li')
        newTodo.textContent = todoInput.value
        ulList.append(newTodo)

        createToolsArea(newTodo)

        todoInput.value = ''
        errorInfo.textContent = ''
    } else {
        errorInfo.textContent = 'zadanie nie moze byc puste'
    }
}

const createToolsArea = (newTodo) => {
    const toolsArea = document.createElement('div')
    toolsArea.classList.add('tools')
    newTodo.append(toolsArea)

    const btnComplete = document.createElement('button')
    btnComplete.classList.add('complete')
    btnComplete.innerHTML = '<i class="fas fa-check"></i>'

    const btnEdit = document.createElement('button')
    btnEdit.classList.add('edit')
    btnEdit.textContent = 'EDIT'

    const btnDelete = document.createElement('button')
    btnDelete.classList.add('delete')
    btnDelete.innerHTML = '<i class="fas fa-times"></i>'
    toolsArea.append(btnComplete, btnEdit, btnDelete)


}

const checkClick = e => {
    if (e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    } else if (e.target.matches('.edit')) {
        editTodo(e)

    } else if (e.target.matches('.delete')) {
        deleteTodo(e)
    } else if (e.target) {

        targetedChild = e.target
        targetedChild.classList.toggle('targetedElement')
        console.log(targetedChild)

        

        document.addEventListener('keyup', (e) => {
            
            if (targetedChild.classList.contains('targetedElement') && e.key === 'Delete'  ) {
                targetedChild.remove();
                const allTodo = ulList.querySelectorAll('li')
                if (allTodo.length === 0) {
                    errorInfo.textContent = 'lista zadań jest pusta'
                } else {
                    errorInfo.textContent = ''
                }
            }
        })


    }
}
const editTodo = e => {
    todoToEdit = e.target.closest('li')
    popupInput.value = todoToEdit.firstChild.textContent
    console.log(todoToEdit.firstChild);
    popup.style.display = 'flex'
}
const changeTodoText = (e) => {
    if (popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value
        clousePopup()
    } else {
        popupInfo.textContent = 'Nalezy wpisac zadanie'
    }

}

const clousePopup = () => {
    popup.style.display = 'none'
    popupInfo.textContent = ''

}

const deleteTodo = e => {
    e.target.closest('li').remove()

    const allTodo = ulList.querySelectorAll('li')
    if (allTodo.length === 0) {
        errorInfo.textContent = 'lista zadań jest pusta'
    } else {
        errorInfo.textContent = ''
    }

}
const checkpopupEwent = (e) => {
    const styles = e.currentTarget.classList
    if (e.key === 'Enter' || styles.contains("flex")) {
        changeTodoText()
    } else if (e.key === 'Escape' || styles.contains("flex")) {
        clousePopup()
    }
}
const enterKeyCheck = (e) => {
    if (e.key === 'Enter') {
        addNewTask()

    }

}






document.addEventListener('DOMContentLoaded', main)
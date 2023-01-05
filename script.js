let todos = [];
const todoStorage = localStorage.getItem("todos");
const todoListEl = document.querySelector(".todo__list");

if (todoStorage) {
    todos = [...JSON.parse(todoStorage)];
}

//artı ikonuna basınca formun açılması
const todoFormEl = document.querySelector(".todo__form");
//aç-kapat işlemi show 
const toggleModal = () => {
    todoFormEl.classList.toggle("show");
};
//arka ekrana tıklanınca modalın kapanması 
todoFormEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("todo__form")) toggleModal();
});
// unique benzeri olmayan bir id tanımlar her todo item için.id tanımlama,benzersiz bir id
const uniqueIdGenerator = () => {
    return Math.round(Math.random() * 100000 + 1);
}
//objeyi html aktardık
const addTodoToHtml = (todoItem) => {

    let todoItemHtml = ` <li class="item ${todoItem.isComplete ? 'todo__comp' : ''} ">
    <div class="complete btn" data-id="${todoItem.id}" onclick="toggleTodoComplete(this)">
    <img src="./assets/image/check.img" alt="">
    </div>
    <div class="todo__info">
    <span class="todo__title">${todoItem.title}</span>
    <span class="todo__desc">${todoItem.desc}</span></div> 
     <img class="btn" src="./assets/image/delete.png" alt="" data-id="${todoItem.id}" onclick="removeTodoItem(this)"></li>`

    todoListEl.insertAdjacentHTML("beforeend", todoItemHtml);
};
const saveTodoItemsToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
}
const addTodos = () => {
    if (todoListEl.innerHTML != "") todoListEl.innerHTML = "";
    const title = document.querySelector("input[name='title']").value;
    const desc = document.querySelector("textarea[name='desc']").value;
    const addedTodoItem = { id: uniqueIdGenerator(), title, desc, isComplete: false };
    document.querySelector("#addTodoForm").reset();
    if (!titleId.value.trim() || !title.value.trim()) {
        alert("lütfen başlık yazınız.");
        return false;
    }
    addTodoToHtml(addedTodoItem);
    todos.push(addedTodoItem);
    saveTodoItemsToLS();
    toggleModal();
};

//tamamlandı-tamamlanmadı işlemi
const toggleTodoComplete = (selectedEl) => {
    const toggleItemIndex = todos.findIndex(todo => todo.id == selectedEl.dataset.id);

    if (toggleItemIndex != -1) {
        todos[toggleItemIndex].isComplete = !todos[toggleItemIndex].isComplete;
        selectedEl.parentNode.classList.toggle("todo__comp")
        saveTodoItemsToLS();
    }

}
//silme işleminin yapılması
const noneTodoItem = () => {
    const notFoundItem = `<li class="list__none">
    Henüz bir iş eklemediniz...
</li>`;
    todoListEl.insertAdjacentHTML("beforeend", notFoundItem);
}
const removeTodoItem = (removedEl) => {
    const removeItemIndex = todos.findIndex(todo => todo.id == removedEl.dataset.id);
    if (removeItemIndex != -1) {
        todos.splice(removeItemIndex, 1);
        removedEl.parentNode.remove();
        saveTodoItemsToLS();
        if (todos.length == 0) {
            noneTodoItem();
        }
    }
};

//elemanların ekranda listelenmesi,sayfa yenilendiği zaman ekranda kalacak liste
const listTodoItems = () => {
    if (todos.length > 0) {
        todos.forEach(todo => {
            addTodoToHtml(todo);
        });

    } else {
        noneTodoItem();
    }

}
listTodoItems();

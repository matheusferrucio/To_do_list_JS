// seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// funções
const saveTodo = (text) => {
    // cria uma div a adiciono a classe todo
    const todo = document.createElement("div");
    todo.classList.add("todo");

    // Cria a div de todo, pegamos o título e criamos os botões que compoem a div todo no html
    // Nesta parte pegamos o título recuperado do forumulário e adicionamos na div principal que é a div todo
    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    // TODAS AS ESTRUTURAS CRIADAS SÃO PARA SEREM INSERIDAS NA DIV TODO QUE É A DIV ONDE FICA A NOSSA TAREFA

    // Aqui criamos os botões de completar, editar e excluir as tarefas
    // cria o botão, adiciona a classe, insere o ícone
    // por fim adicionamos toda essa estrutura à div todo
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    // Coloca essa estrutura criada dentro da div #todo-list
    todoList.appendChild(todo);

    // Limpa o input após adicionarmos a tarefa
    todoInput.value = "";

    // foca o input após todo o processo acima, no meu caso não é necessário pq o input já recebe o foco
    todoInput.focus();
};

// esconde/mostra o formulário de edição, formulário de adicionar e a lista de tarefas
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3"); // seleciona os títulos dos todos

        // verifica se o título da tarefa selecionada é igual ao antigo título passado
        if (todoTitle.innerText === oldInputValue) {
            // muda o título para o texto passado no parâmetro passado quando chamamos a função
            todoTitle.innerText = text;
        }
    });
};

// Eventos

todoForm.addEventListener("submit", (e) => {
    //impede que o evento padrão ocorra, nesse caso, o envio do forumulário
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue);
    }
});

// pega todo o documento e identifica qual elemento foi clicado por meio do atributo e(que faz referência a esse elemento clicado)
document.addEventListener("click", (e) => {
    const targetEl = e.target;
    // pega o elemento pai mais próximo do elemento armazenado em targetEl
    const parentEl = targetEl.closest("div"); // o método retorna o ancestral/pai mais próximo, e o tipo do pai é especificado entre ()
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText; // innerText vai pegar apenas o texto
    }

    // botão de concluir tarefa
    if (targetEl.classList.contains("finish-todo")) {
        // adiciona/remove a classe de finalizada a div do botão clicado
        parentEl.classList.toggle("done");
    }

    // botão de apagar tarefa
    if (targetEl.classList.contains("remove-todo")) {
        // remove a div do botão clicado
        parentEl.remove();
    }

    // botão de editar tarefa
    if (targetEl.classList.contains("edit-todo")) {
        // chama a função de editar tarefa
        toggleForms();

        // insere o título da tarefa no input para ser mudado depois
        editInput.value = todoTitle;
        // guarda o título antigo da tarefa;
        oldInputValue = todoTitle; // isso é uma variável e não um objeto, por isso não possui .value como estava antes
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // pega o valor escrito no input de editar tarefa
    const editInputValue = editInput.value;
    if (editInputValue) {
        updateTodo(editInputValue);
    }
    toggleForms();
});

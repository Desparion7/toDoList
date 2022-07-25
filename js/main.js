let todoInput;
let errorInfo;
let addBtn;
let ulList;
let newTodo;
let divTools;
let popup;
let popupInfo;
let todoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('.todolist ul');
	divTools = document.querySelector('.tools');
	popup = document.querySelector('.popup');
	popupInfo = document.querySelector('.popup-info');
	popupInput = document.querySelector('.popup-input');
	popupAddBtn = document.querySelector('.accept');
	popupCloseBtn = document.querySelector('.cancel');
};
const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo);
	ulList.addEventListener('click', checkClick);
	popupCloseBtn.addEventListener('click', closeEdit);
	popupAddBtn.addEventListener('click', changeTodoText);
	todoInput.addEventListener('keyup', enterKeyCheck);
};

const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li');
		newTodo.textContent = todoInput.value;
		ulList.append(newTodo);
		todoInput.value = '';
		errorInfo.textContent = '';
		createToolsArea();
	} else {
		errorInfo.textContent = 'Wpisz treść zadania!';
	}
};

const createToolsArea = () => {
	toolArea = document.createElement('div');
	toolArea.classList.add('tools');
	toolArea.innerHTML = divTools.innerHTML;
	newTodo.append(toolArea);
};

const checkClick = (e) => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed');
		e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		editTodo(e);
	} else if (e.target.matches('.delete')) {
		deleteTodo(e);
	}
};

const editTodo = (e) => {
	console.log(e.target);
	todoToEdit = e.target.closest('li');
	popupInput.value = todoToEdit.firstChild.textContent;
	popup.style.display = 'flex';
};
const closeEdit = () => {
	popup.style.display = 'none';
	popupInfo.textContent = '';
};

const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = 'none';
		popupInfo.textContent = '';
	} else {
		popupInfo.textContent = 'Wprowadz zadanie';
	}
};

const deleteTodo = (e) => {
	e.target.closest('li').remove();

	const allTodo = ulList.querySelectorAll('li');
	if (allTodo.length === 1) {
		errorInfo.textContent = 'Brak zadań na liście.';
	}
};

const enterKeyCheck = (e) => {
	if (e.key === 'Enter') {
		addNewTodo();
	}
};

document.addEventListener('DOMContentLoaded', main);

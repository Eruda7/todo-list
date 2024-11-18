const input = document.querySelector('#inp')
const btnAdd = document.querySelector('#btnAdd')
const output = document.querySelector('#output')

let todos = []

const addTodo = () => {
	if (!input.value) {
		alert('Добавьте задание')
	} else {
		const todo = {
			id: todos.length + 1,
			name: input.value,
			completed: false,
		}
		// console.log(todo)
		todos.push(todo)
		// console.log(todos)
		input.value = ''
		addToLocalStorage()
	}
}

btnAdd.addEventListener('click', addTodo)

const renderTodos = () => {
	output.innerHTML = ''
	todos.forEach(el => {
		// console.log(el)

		const cart = document.createElement('div')
		cart.classList.add('cart_div')
		const title = document.createElement('h2')
		const btnsWrapper = document.createElement('div')
		const done = document.createElement('button')
		const edit = document.createElement('button')
		const deleteTask = document.createElement('button')

		done.addEventListener('click', () => {
			el.completed = !el.completed // это означает типа не true это false, а если не false это true
			addToLocalStorage()
		})

		if (el.completed) {
			cart.classList.add('active')
		} else {
			cart.classList.add('cart')
		}

		edit.addEventListener('click', () => {
			const userAnswer = confirm('Заменить?')
			if (userAnswer) {
				const newTask = prompt('New task')
				el.name = newTask
				addToLocalStorage()
			}
		})

		deleteTask.addEventListener('click', () => {
			todos = todos.filter(item => item.id !== el.id)
			addToLocalStorage()
		})

		title.innerHTML = el.name
		done.innerHTML = 'Done'
		edit.innerHTML = 'Edit'
		deleteTask.innerHTML = 'Delete'

		btnsWrapper.append(done, edit, deleteTask)
		cart.append(title, btnsWrapper)
		output.append(cart)
	})
}

const addToLocalStorage = () => {
	localStorage.setItem('todos', JSON.stringify(todos))
	renderTodos()
}

const addFromLocaleStorage = () => {
	const data = localStorage.getItem('todos')
	if (data !== null) {
		todos = JSON.parse(data)
		renderTodos()
	}
}
addFromLocaleStorage()

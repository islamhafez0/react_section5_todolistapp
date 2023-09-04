import React, {useState} from 'react';
import Todos from '../components/todos/Todos';
import TodosForm from '../components/todos/TodosForm';
import Header from '../components/todos/Header';

// const initialData = [
//     {id: 1, title: "Create A New React App", done: true},
//     {id: 2, title: "Create A New Angular App", done: false},
//     {id: 3, title: "Create A New Vue App", done: true},
//     {id: 4, title: "Learn Node Js", done: false}
// ]
const storedTodos = localStorage.getItem('todos')
const initialData = storedTodos ? JSON.parse(storedTodos) : []
const TodoList = () => {
    const [todos, setTodos] = useState(initialData)
    const [mode, setMode] = useState('')
    const [activeTodo, setActiveTodo] = useState(null)
    const setToLocal = () => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }
    const toggleTodo = (id) => {
        setTodos((data) => {
            const newData = data.map(td => {
                if(td.id === id) {
                    return {...td, done: !td.done}
                }
                return td
            })
            return newData
        })
        // setTodos((data) => {
        //     const newData = data.map(td => {
        //         if(td.id === id) {
        //             td.done = !td.done
        //         }
        //         return td
        //     })
        //     return newData
        // }) Wrong Way
        // const newData = todos.map(td => {
        //     if(td.id === id) {
        //         td.done = !td.done
        //     }
        //     return td
        // })
        // setTodos(newData) Correct Way 2
    }
    const deleteTodo = id => {
        setTodos((data) => {
            const newData = data.filter(td => td.id !== id)
            return newData
        })
    }
    const addTodo = (title) => {
        if(mode !== 'edit') {
            const newTodo = {
                id: new Date().getTime(),
                title,
                done: false
            }
            setTodos(data => {
                return [
                    newTodo,
                    ...data
                ]
            })
        }else if(mode === 'edit'){
            const newTodos = todos.map(ele => {
                if(ele.id === activeTodo.id) {
                    ele.title = title
                }
                return ele
            })
            setTodos(newTodos)
            setMode('add')
        }
    }
    const filterTodos = () => {
        if(mode === 'edit') {
            return
        }
        if(mode === 'filter') {
            setMode('add')
        }else {
            setMode('filter')
        }
    }
    const editTodo = (todo) => {
        setMode('edit')
        setActiveTodo(todo)
    }
    let currentTodos = [...todos]
    if(mode === 'filter') {
        currentTodos = todos.filter(todo => !todo.done)
    }
    if(mode === 'edit' && activeTodo) {
        currentTodos = [activeTodo]
    }
    setToLocal()
    return (
        <main>
            <div className='container'>
                <div className='todos'>
                    <TodosForm 
                        addTodo={ addTodo } 
                        filterTodos={ filterTodos }
                        mode={ mode }
                        activeTodo={ activeTodo }
                    />
                    <Todos 
                        todos={ currentTodos }
                        mode={mode}
                        toggleTodo={ toggleTodo } 
                        deleteTodo={ deleteTodo }
                        editTodo={ editTodo }
                    />
                </div>
            </div>
        </main>
    )
}

export default TodoList;
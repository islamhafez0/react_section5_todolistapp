import React from 'react'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
const Todo = ({ todo, toggleTodo, deleteTodo, editTodo, mode }) => {
    return (
        <div className={`todos-todo ${todo.done ? 'done' : ''}`}>
            <div className="todos-todo-icon" onClick={() => toggleTodo(todo.id)}>
                <FeatherIcon icon={todo.done ? 'check-circle' : 'circle'}/>
            </div>
            <div className='todos-todo-task'>{todo.title}</div>
            {
                mode !== 'edit' && (
                    <div className='todos-todo-cta'>
                        <div className='todos-todo-cta-edit' onClick={() => editTodo(todo)} >
                            <FeatherIcon icon="edit" size="20"/>
                        </div>
                        <div className='todos-todo-cta-delete' onClick={() => deleteTodo(todo.id)}>
                            <FeatherIcon icon="trash" size="20"/>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Todo;
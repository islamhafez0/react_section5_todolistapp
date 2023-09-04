import React, { useState } from 'react'
import FeatherIcon from 'feather-icons-react';

const TodosForm = ({ addTodo, filterTodos, mode, activeTodo }) => {
    const [title, setTitle] = useState('')
    const [editRender, setRendering] = useState(false)

    if(mode === 'edit' && !editRender) {
        setTitle(activeTodo.title)
        setRendering(true)
    }


    const handleInputChange = (e) => {
        setTitle(e.target.value);
    }
    const handleAddingTodo = () => {
        setRendering(false)
        if(!title.trim()) {
            return
        }
        addTodo(title)
        setTitle('')
    }
    return (
        <div className='form'>
            <div className={`form_icon ${mode === 'filter' ? "active" : ''}`} onClick={ filterTodos }>
                <FeatherIcon icon="circle" />
            </div>
            <div className='form_input'>
                <input type='text' placeholder='Add A New Task....'
                value={ title }
                onChange={handleInputChange} />
            </div>
            <div className='form_submit'>
                <button className='btn' disabled={!title.trim()} onClick={ handleAddingTodo }>
                    {
                        mode === 'edit' ? <FeatherIcon icon="edit" /> : <FeatherIcon icon="plus" />
                    }
                </button>
            </div>
        </div>
    )
}

export default TodosForm
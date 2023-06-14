import React from 'react'
import { useState , useEffect } from 'react'
import { useUpdateNoteMutation , useDeleteNoteMutation} from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave , faTrashCan } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../hooks/useAuth'


const EditNoteForm = ({note,users}) => {

  const {isManager , isAdmin} = useAuth()

  const [updateNote , {
    isLoading,
    isSuccess,
    isError,
    error
}] = useUpdateNoteMutation()

const [deleteNote , {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
}] = useDeleteNoteMutation()

const navigate = useNavigate()

const [selectedUser,setSelectedUser] = useState(note.user)
const [title,setTitle] = useState(note.title)
const [text,setText] = useState(note.text)
const [completed,setCompleted] = useState(note.completed)

const options = users.map( user => {
          return (
            <option
              key={user._id}
              value={user._id}
            >
              {user.username}
            </option>
          )})

useEffect( () => {
            if(isSuccess || isDelSuccess) {
                setSelectedUser('')
                setTitle('')
                setText('')
                navigate('/dash/notes')
            }
        },[isSuccess,isDelSuccess,navigate])

const onUserChanged = (e) => {
          /*
          let ele = document.getElementById('user')
          let id = ele.options[ele.selectedIndex].value
          let name = ele.options[ele.selectedIndex].text
          console.log(`ID=${id} NAME=${name}`);
          */
          setSelectedUser(e.target.value)
        }
      
const onTitleChanged = e => setTitle(e.target.value)
const onTextChanged = e => setText(e.target.value)
const onCompletedChanged = e => setCompleted( prev => !prev)

const onSaveNoteClicked = async (e) => {
  // e.preventDefault()
  /*
  if (canSave){
      await addNewUser({username,password,roles})
  }
  */
  await updateNote({id: note.id,user:selectedUser,title,text,completed})
 
}

const onDeleteNoteClicked = async () => {
  await deleteNote({id: note.id})
}

let deleteButton 

if ( isManager || isAdmin) {
  deleteButton = (
    <button
              className='icon-button'
              title='Delete'
              onClick={onDeleteNoteClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
  )
}
const errClass = isError ? "errmsg" : "offscreen"

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className='form' onSubmit={ e => e.preventDefault() }>
        <div className='form__title-row'>
          <h2>Edit Note</h2>
          <div className='form__actions-buttons'>
            <button
              className='icon-button'
              title='Save'
              onClick={onSaveNoteClicked}
            //disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>

            {deleteButton}
            
          </div>
        </div>

        <label className='form__label' htmlFor='user'>
          Assigned To :
        </label>
        <select
          id='user'
          name='user'
          className={`form__select`}
          value={selectedUser}
          onChange={onUserChanged}
        >
          {options}
        </select>

        <label className='form__label' htmlFor='title'>
          Title: {/* <span className='nowrap'>[***]</span> */}
        </label>
        <input
          className={`form__input`}
          id='title'
          name='title'
          type='text'
          autoComplete='off'
          value={title}
          required
          onChange={onTitleChanged}
        />

        <label className='form__label' htmlFor='text'>
          Text: {/* <span className='nowrap'>[***]</span> */}
        </label>
        <textarea
          className={`form__input`}
          id='text'
          name='text'
          type='text'
          autoComplete='off'
          value={text}
          required
          rows='5'
          onChange={onTextChanged}
        />

        <label className='form__label from__checkbox-container' htmlFor='completed'>
          Completed:
          <input
            className='form__checkbox'
            id='completed'
            name='completed'
            type='checkbox'
            checked={completed}
            onChange={onCompletedChanged}
          />
        </label>

      </form>
    </>
  )

  return content
}

export default EditNoteForm
import React from 'react'
import { useState , useEffect } from 'react'
import { useAddNewNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'


import { useGetUsersQuery } from '../users/usersApiSlice'

const NewNoteForm = () => {

  const [addNewNote , {
    isLoading,
    isSuccess,
    isError,
    error
}] = useAddNewNoteMutation()

const navigate = useNavigate()

const {users} = useGetUsersQuery("usersList", {
  selectFromResult: ({data}) => ({
      users: data?.ids.map(id => data?.entities[id])
  }),
})

  
  const [selectedUser,setSelectedUser] = useState('')
  const [title,setTitle] = useState('')
  const [text,setText] = useState('')

  const options = users.map( user => {
            return (
              <option
                key={user._id}
                value={user._id}
              >
                {user.username}
              </option>
            )})

  const canSave = [selectedUser,title,text].every(Boolean) && ! isLoading

  const onSaveNoteClicked = async (e) => {
      e.preventDefault()
      //console.log("canSave=",canSave,"selectedUser=",selectedUser,"title=",title,"text=",text);
      if (canSave) {
        await addNewNote({ user: selectedUser , title , text})
      }
  }

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

  useEffect(() => {
    if (isSuccess) {
      setSelectedUser('')
      setTitle('')
      setText('')
      navigate('/dash/notes')
    }
  }, [isSuccess, navigate])

  const errClass = isError ? "errmsg" : "offscreen"

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className='form' onSubmit={onSaveNoteClicked}>
        <div className='form__title-row'>
          <h2>New Note</h2>
          <div className='form__actions-buttons'>
            <button
              className='icon-button'
              title='Save'
            //disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>

        <label className='form__label' htmlFor='user'>
          Assigned To :
        </label>
        <select
          id='user'
          name='user'
          className={`form__select`}
          value={ selectedUser }
          onChange={onUserChanged}
        >
          <option
                key='0'
                value={null}
              >
              
            </option>
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

      </form>
    </>
  )

  return content
}

export default NewNoteForm

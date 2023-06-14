import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useGetNotesQuery } from './notesApiSlice';

import useAuth from "../../hooks/useAuth"

import { memo } from 'react';

const Note = ({noteId}) => {

    const {username,isAdmin,isManager} = useAuth()

    //console.log(`Note.js noteId=${noteId}<---------`);

    const {note} = useGetNotesQuery("notesList", {
        selectFromResult: ({data}) => ({
            note: data?.entities[noteId]
        }),
    })
    

    //console.log("Note.js =",note,"-------");
    //console.log("Note.js user",user,"-------");

    const navigate = useNavigate()

    let content = null

    if (note) {

        const created = new Date(note.createdAt).toLocaleString('en-US',{day:'numeric',month:'long'})
        const updated = new Date(note.updatedAt).toLocaleString('en-US',{day:'numeric',month:'long'})
    
        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        content = (
                <tr className='table__row'>
                <td className='table__cell note_status'>
                    { note.completed ?
                        <span className='note__status--completed'>Completed</span> :
                        <span className='note__status--open'>Open</span>
                    }
                </td>
                <td className='table__cell note__created'>{created}</td>
                <td className='table__cell note__updated'>{updated}</td>
                <td className='table__cell note__title'>{note.title}</td>
                <td className='table__cell note__username'>{note.username}</td>
                <td className='table__cell'>
                    <button 
                        className='icon-button table__button'
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

        if ( !isAdmin && !isManager) {
            if (username !== note.username) {
                content = null
            }
        }

    } 

    return content
  
}

const memoizedNote = memo(Note)

export default memoizedNote
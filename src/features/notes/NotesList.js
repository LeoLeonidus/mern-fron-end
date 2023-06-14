import React from 'react'
import { useGetNotesQuery } from './notesApiSlice' 
import Note from './Note'
import { PulseLoader } from "react-spinners";
import useTitle from '../../hooks/useTitle';

const NotesList = () => {

  useTitle('Notes List')

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery( 'notesList' , {
          pollingInterval: 60000, // 60 sec
          refetchOnFocus: true,
          refetchOnMountOrArgChange: true
} )

  let content

  if (isLoading) {
    content = <PulseLoader color="#FFF" />
  }
  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const {ids} = notes

    const tableContent = ids.length ? ids.map(noteId => <Note key={noteId} noteId={noteId} />) : null

    content = (
      <table className='table table--notes'>
        <thead className='table__head'>
          <tr>
            <th scope='col'className='table__th note__status'>Note Status</th>
            <th scope='col'className='table__th note__created'>Created</th>
            <th scope='col'className='table__th note__updated'>Updated</th>
            <th scope='col'className='table__th note__title'>Title</th>
            <th scope='col'className='table__th note__username'>Owner</th>
            <th scope='col'className='table__th note__edit'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return (
    content
  )
}

export default NotesList
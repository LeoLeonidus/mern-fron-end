import React from 'react'
import { useParams } from 'react-router-dom'

import EditUserForm from './EditUserForm'

import { useGetUsersQuery } from './usersApiSlice'
import { PulseLoader } from 'react-spinners'

const EditUser = () => {

    const {id} = useParams()

    //console.log('sono in EditUser id=',id);
    const {user} = useGetUsersQuery("usersList", {
        selectFromResult: ({data}) => ({
            user: data?.entities[id]
        }),
    })
    //console.log('user=',user,'--------');

    if ( ! user ) return <PulseLoader color={"#FFF"} />

    const content = <EditUserForm user = { user } /> 
  

    return content
}

export default EditUser
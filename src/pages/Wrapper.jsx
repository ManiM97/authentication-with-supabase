import React, { Children, useEffect, useState } from 'react'
import supabase from '../helper/supabaseClient'
import { Navigate, useNavigate } from 'react-router'
import Spinner from 'react-bootstrap/Spinner';

const Wrapper = () => {
    const navigate = useNavigate
    const [authenticated , setAuthenticated] = useState(false)
    const [loading , setLoading] = useState(true)

    useEffect(  () => {
        const getSession = async () => {
            const { data : {session}} = await supabase.auth.getSession()
            setAuthenticated(!!session)
            setLoading(false)
        }
        getSession()
    })

  if (loading){
    return <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
  }else {
    if (authenticated){
        return <>{Children}</>
    }
    return <Navigate to={'/login'}></Navigate>
  }
}

export default Wrapper
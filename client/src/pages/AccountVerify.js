import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { verifyAccount } from '../slices/AuthSlice'
import './AccountVerify.css';

const useQuery = ()=>{
    return new URLSearchParams(useLocation().search)
}

const AccountVerify = () => {
  const navigate  = useNavigate()
  const dispatch = useDispatch()
  const query = useQuery();
  const userId = query.get("userId")
  const token = query.get("token")
  const [ isVerified, setIsVerified ] = useState(false)
  const [ clientError, setClientError ] = useState(null)

  const errors = { }
  const formValidate = () =>{
    if(!isVerified){
        errors.isVerified = 'checkbox should be checked'
    }
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    formValidate()
    if(Object.keys(errors).length > 0 ){
        setClientError(errors)
    }else{
        setClientError(null)
        try {
            await dispatch(verifyAccount({ userId, token, isVerified })).unwrap()
            .then(()=>{
                alert("Account Verified Successfully")
                navigate('/')
            })
            .catch((err)=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }
  }
// console.log(isVerified)
    return (
    <div  className="container">
        <div>
            <h2>Account Verify</h2>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                    type='checkbox'
                    value = {isVerified}
                    onChange={()=>setIsVerified(!isVerified)}
                    />
                    <p>your are one step away from verifing account</p>
                </div>
                <div>
                    {clientError?.isVerified && <b>{clientError?.isVerified}</b>}
                </div>
                <div>
                    <input 
                    type='submit'
                    value='Verify Account'
                    />
                </div>
            </form>
        </div>
    </div>
  )
}

export default AccountVerify
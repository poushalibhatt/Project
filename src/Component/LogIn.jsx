import React, {useState} from 'react';
import {useFormik} from 'formik';
import *as Yup from 'yup';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


function LogIn(){
    const [toDashboard, setDashboard]= useState(false)
    const history= useHistory()
    let formik= useFormik({
        initialValues: {
            email : '',
            password : ''
        },
        onSubmit: event =>{
            event.preventDefault()
            axios.post('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setDashboard(() => ({
                    toDashboard : true
                }))
            })
            .catch(err => {
                alert('Unbale to fetch data');
            })
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email format not correct').required('Required'),
            password: Yup.string().min(8,'Must be 8 characters or more').required('Required')
        })
    })
    console.log('Formik Values', formik.values);
    if (setDashboard === true){
        history.push('/dashboard')
    }
    
    return(
        <form onSubmit={formik.handleSubmit}>
            <div>
            <label htmlFor='email'>email</label>
            <input type='email' 
            name='email' 
            id='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
            {formik.touched.email && formik.errors.email ? 
            (<div className='error'>{formik.errors.email}</div>) : null}
            </div>
            
            <div>
            <label htmlFor='password'>password</label>
            <input type='password' 
            name='password' 
            id='password' 
            value={formik.values.password} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
            {formik.touched.password && formik.errors.password ? 
            (<div className='error'>{formik.errors.password}</div>) : null}
            </div>

            <button type='submit'>Submit</button>
        </form>
    )
}

export default LogIn
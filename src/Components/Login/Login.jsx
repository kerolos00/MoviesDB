import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function Login({ saveUserDate }) {
  const baseUrl = "https://route-ecommerce.onrender.com";
  let navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const validationSchema = Yup.object({
    email: Yup.string().required().email("Email invalid"),
    password: Yup.string().required().matches(/^[A-Z][a-zA-Z0-9!@#$%^&*()_-]{5,16}$/, "password must start with capital letter"),
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    }, validationSchema, onSubmit: sendLoginData,
  })

  async function sendLoginData(values) {
    setLoading(true)
    const { data } = await (await axios.post(`${baseUrl}/api/v1/auth/signin`, values)).catch((error) => {
      setError(error.response.data.message)
      setLoading(false)
    })
    if (data.message === 'success') {
      localStorage.setItem('userToken', data.token)
      saveUserDate()
      setLoading(false)
      navigate('/home')
    }
  }

  return (
    <>
      <div className='w-75 m-auto mb-5'>
        <h2 className='my-4 '>Register Now</h2>
        <form className='table text-white ' onSubmit={formik.handleSubmit}>


          <div>
            <label htmlFor='email'>Email :</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type='email' name='email' id='email' className='form form-control mb-2' value={formik.values.email}></input>
            {formik.errors.email && formik.touched.email ? <p className='p-1 text-center m-auto w-50  fw-bold text-danger'>{formik.errors.email}</p> : ""}
          </div>
          <div>
            <label htmlFor='password'>Password :</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type='password' name='password' id='password' className='form form-control mb-2' value={formik.values.password}></input>
            {formik.errors.password && formik.touched.password ? <p className='p-1 text-center m-auto w-50  fw-bold text-danger'>{formik.errors.password}</p> : ""}
          </div>

          <button disabled={!formik.isValid} type='submit' className='btn btn-primary'>
            {loading ? <i className=' fas fa-spinner fa-spin'></i> : "Login"}
          </button>
          {error ? <div className='text-center'>{error}</div> : ""}
        </form>
      </div>
    </>
  )
}

import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function Register() {
  let baseUrl = "https://route-ecommerce.onrender.com";
  let navigate = useNavigate()
  let [error, setError] = useState('')
  let [loading, setLoading] = useState(false)
  let validationSchema = Yup.object({
    name: Yup.string().required().min(3, "minimum name 3 char").max(15, "maximum name 15 char"),
    email: Yup.string().required().email("Email invalid"),
    phone: Yup.string().required().matches(/^(010|011|012|015)[0-9]{8}$/, "enter valid Phone"),
    password: Yup.string().required().matches(/^[A-Z][a-zA-Z0-9!@#$%^&*()_-]{5,16}$/, "password must start with capital letter"),
    rePassword: Yup.string().required().oneOf([Yup.ref("password")], "rePassword not Matches")
  })
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }, onSubmit(values) {
      sendRegisterData(values)
    },
    validationSchema
  })

  async function sendRegisterData(values) {
    setLoading(true)
    const { data } = await (await axios.post(`${baseUrl}/api/v1/auth/signup`, values)).catch((error) => {
      setError(error.response.data.errors.msg)
      console.log(data)
      setLoading(false)
    })
    if (data.message === 'success') {
      navigate('/login')
      setLoading(false)
    }
  }

  return (
    <>
      <div className='w-75 m-auto mb-5'>
        <h2 className='my-4 '>Register Now</h2>
        <form className='table text-white ' onSubmit={formik.handleSubmit}>
          <div >
            <label htmlFor='name'>Name :</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type='text' name='name' id='name' className='form form-control mb-2' value={formik.values.name}></input>
            {formik.errors.name && formik.touched.name ? <p className='p-1 text-center m-auto w-50  fw-bold text-danger'>{formik.errors.name}</p> : ""}
          </div>

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
          <div>
            <label htmlFor='rePassword'>RePassword :</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type='password' name='rePassword' id='rePassword' className='form form-control mb-2' value={formik.values.rePassword}></input>
            {formik.errors.rePassword && formik.touched.rePassword ? <p className='p-1 text-center m-auto w-50  fw-bold text-danger'>{formik.errors.rePassword}</p> : ""}
          </div>
          <div>
            <label htmlFor='phone'>Phone :</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type='text' name='phone' id='phone' className='form form-control mb-2' value={formik.values.phone}></input>
            {formik.errors.phone && formik.touched.phone ? <p className='p-1 text-center m-auto w-50  fw-bold text-danger '>{formik.errors.phone}</p> : ""}
          </div>



          <button disabled={!formik.isValid} type='submit' className='btn btn-primary'>
            {loading ? <i className=' fas fa-spinner fa-spin'></i> : "Register"}
          </button>
          {error ? <div className='text-center'>{error}</div> : ""}
        </form>
      </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import axios from 'axios'

import {
  pageBackground,
  pageWrapper,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  loadingClass
} from '../styles/Common'

function Register() {

  let navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [preview,setPreview] = useState(null);

  const onCreateUser = async (newUser) => {

    // Create form data object
        const formData = new FormData();
        //get user object
        let { role, profileImageUrl, ...userObj } = newUser;
        //add all fields except profilePic to FormData object
        Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
        });
        // add profilePic to Formdata object
        formData.append("profileImageUrl", profileImageUrl[0]);

    setLoading(true)
    setError(null)

    try {

      if (role === "user") {
        let resObj = await axios.post('http://localhost:4000/user-api/users', formData)
        console.log(resObj.data)
      }

      if (role === "author") {
        let resObj = await axios.post('http://localhost:4000/author-api/users', formData)
        console.log(resObj.data)
      }

      navigate('/login')

    } catch (err) {
      setError(err.message)
    }
    finally {
      setLoading(false)
    }
  }
  // remove preview image from browser memory
  useEffect(()=>{
    return () => {
      if(preview){
        URL.revokeObjectURL(preview)
      }
    }
  },[preview])

  if (loading) {
    return <p className={loadingClass}>Loading...</p>
  }

  return (

    <div className={pageBackground}>

      <div className={pageWrapper}>

        <div className={formCard}>

          <h2 className={formTitle}>Create Account</h2>

          {error && <p className={errorClass}>{error}</p>}

          <form onSubmit={handleSubmit(onCreateUser)}>

            {/* Role Selection */}

            <div className={formGroup}>

              <label className={labelClass}>Select Role</label>

              <div className="flex gap-6 mt-2">

                <label>
                  <input
                    className='p-3 m-3'
                    type="radio"
                    value="user"
                    {...register("role", { required: true })}
                  /> User
                </label>

                <label>
                <input
                    className='m-3'
                    type="radio"
                    value="author"
                    {...register("role", { required: true })}
                  /> Author
                </label>

              </div>

            </div>


            {/* First Name */}

            <div className={formGroup}>
              <label className={labelClass}>First Name</label>
              <input
                type="text"
                {...register("firstName", { required: true })}
                placeholder="First Name"
                className={inputClass}
              />
            </div>


            {/* Last Name */}

            <div className={formGroup}>
              <label className={labelClass}>Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                placeholder="Last Name"
                className={inputClass}
              />
            </div>


            {/* Email */}

            <div className={formGroup}>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter Email"
                className={inputClass}
              />
            </div>


            {/* Password */}

            <div className={formGroup}>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Enter Password"
                className={inputClass}
              />
            </div>


            {/* Profile Image */}

            <input
        type="file"
        accept="image/png, image/jpeg"
        {...register("profileImageUrl")}
        className={` bg-orange-500 px-5 py-3 hover:bg-orange-600 rounded-xl w-3/6 mb-5 text-black`}
        onChange={(e) => {

            //get image file
            const file = e.target.files[0];
            // validation for image format
            if (file) {
                if (!["image/jpeg", "image/png"].includes(file.type)) {
                setError("Only JPG or PNG allowed");
                return;
                }
                //validation for file size
                if (file.size > 2 * 1024 * 1024) {
                setError("File size must be less than 2MB");
                return;
                }
                //Converts file → temporary browser URL(create preview URL)
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
                setError(null);
            }

        }} />
          {preview && (
                <div className="mt-3 flex justify-center">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border"
                />
                </div>
            )}


            <button type="submit" className={submitBtn}>
              Register
            </button>

          </form>

        </div>

      </div>

    </div>

  )
}

export default Register
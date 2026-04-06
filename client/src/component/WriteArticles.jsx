import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {cardClass, inputClass, labelClass, loadingClass, submitBtn} from '../styles/Common.js'
import axios from 'axios';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

function WriteArticles() {

  let { register,handleSubmit } = useForm();
  let navigate = useNavigate();
  // let [title,setTitle] = useState([]);
  // let [category,setCategory] = useState([]);
  // let [content,setContent] = useState([]);
  let [loading,setLoading] = useState(false);
  let [error,setError] = useState(null);
  
  const createArticle = async(newArticle) => {
    console.log(newArticle);
    try{
        setLoading(true);
        setError(null);
        let response = await axios.post('http://localhost:4000/author-api/articles',newArticle,{ withCredentials: true })
        console.log(response.data);
        toast.success("Article Created");
        navigate('/author-profile');

    }catch(err){
      setError(err.message);
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className={cardClass}>
      {loading && <p className={loadingClass}>Loading....</p>}
        <form action="" className='flex flex-col gap-5' onSubmit={handleSubmit(createArticle)}>
          {error && <p>{error}</p>}
            <div>
              <label htmlFor="" className={labelClass}>Title :</label>
              <input type="text" className={inputClass} placeholder=' Eg . Power Of MERN...' {...register("title",{required : true})}/>
            </div>
            <div>
              <label htmlFor="" className={labelClass}>Category :</label>
              <select name="category" id="" className={inputClass} {...register("category",{required : true})}>
                <option value="Engineering">Engineering</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
              </select>
            </div>
            <div>
              <label htmlFor="" className={labelClass}>content :</label>
              <textarea name="" {...register("content",{required : true})} rows="4" cols="50" placeholder ="Ur Words" className={inputClass} id=""></textarea>
            </div>
            <div>
              <button type='submit' className={submitBtn}>Create</button>
            </div>
        </form>
    </div>
  )
}

export default WriteArticles
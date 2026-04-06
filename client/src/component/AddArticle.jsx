import React, { useState } from "react";
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from "react-router";
import { errorClass,loadingClass,inputClass,submitBtn,cardClass,headingClass } from "../styles/Common";
import toast from "react-hot-toast";

function AddArticle() {
  const { register, handleSubmit } = useForm()
  // const [title, setTitle] = useState("");
  // const [category, setCategory] = useState("");
  // const [content, setContent] = useState("");
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onCreateArticle = async(newArticle) => {
    try{
        setLoading(true);
        console.log(newArticle);
        setError(null);
        let res = await axios.post('http://localhost:4000/author-api/articles',newArticle,{ withCredentials : true });
        let data = res.data.payload;
        console.log(data);
        toast.success("Article Created");
        navigate('/author-profile');
    }
    catch(err){
      setError(err.message);
    }finally{
      setLoading(false);
    }
  }
  if (loading) {
      return <p className={loadingClass}>Loading...</p>
    }
  

  return (
    <div className={`${cardClass} mt-10 w-[50%] mx-auto`}>

    {error && <p className={errorClass}>{error}</p>}
    <form
        onSubmit={handleSubmit(onCreateArticle)}
        className={`${cardClass} mt-10 flex flex-col gap-3`}
        >
        <h1 className={headingClass}>Add Article</h1>
        <input
        type="text"
        placeholder="Title"
        className={inputClass}
        {...register("title",{required : true})}
        />

    
        <select
        className={inputClass}
        {...register("category",{required : true})}
        >
        <option value="" >Category</option>
        <option value="Technology">Technology</option>
        <option value="Sports">Sports</option>
        <option value="Education">Education</option>
        </select>


        <textarea
        placeholder="Content"
        className={inputClass}
        {...register("content",{required : true})}
        />

        <button
        type="submit"
        className={submitBtn}        >
        Publish Article
        </button>

      </form>
    </div>
  );
}

export default AddArticle;
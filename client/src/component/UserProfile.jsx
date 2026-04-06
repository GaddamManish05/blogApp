import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { userAuth } from '../AuthStore/AuthStore.js'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import {
  pageBackground,
  pageWrapper,
  headingClass,
  primaryBtn,
  errorClass,
  loadingClass,
  articleGrid,
  articleCardClass,
  articleTitle,
  articleBody,
  articleMeta,
  ghostBtn
} from '../styles/Common'

function UserProfile() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const logout = userAuth(state => state.logout)

  const [error, setError] = useState(null)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)

  const onLogOut = async () => {
    await logout()
    toast.success("Logged Out Successfully")
    navigate('/login')
  }

  const onGetArticles = async () => {

    setError(null)
    setLoading(true)

    try {

      let res = await axios.get(
        `${BASE_URL}/user-api/articles`,
        { withCredentials: true }
      )

      setArticles(res.data.payload)

    } catch (err) {

      setError(err.message)

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className={pageBackground}>

      <div className={pageWrapper}>

        <h2 className={headingClass + " mb-6"}>
          User Dashboard
        </h2>

        {/* Buttons */}

        <div className="flex gap-4 mb-8">

          <button onClick={onGetArticles} className={primaryBtn}>
            Load Articles
          </button>

          <button onClick={onLogOut} className={primaryBtn}>
            Logout
          </button>

        </div>

        {/* Error */}

        {error && <p className={errorClass}>{error}</p>}

        {/* Loading */}

        {loading && <p className={loadingClass}>Loading articles...</p>}

        {/* Articles */}

        <div className={articleGrid}>

          {articles.map(articleObj => (

            <div key={articleObj._id} className={articleCardClass}>

              <h3 className={articleTitle}>
                {articleObj.title}
              </h3>

              <p className={articleMeta}>
                Category: {articleObj.category}
              </p>
              <button className={ghostBtn} onClick={() => {navigate(`/article/${articleObj._id}`,{ state : articleObj})}}>Read Article →</button>
            </div>

          ))}

        </div>

      </div>

    </div>

  )
}

export default UserProfile
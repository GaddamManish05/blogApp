import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'

import Register from './component/Register'
import Login from './component/Login'
import AddArticle from './component/AddArticle'
import Home from './Home'
import RootLayout from './component/RootLayout'
import UserProfile from './component/UserProfile'
import AuthorProfile from './component/AuthorProfile'
import AdminProfile from './component/AdminProfile'

import { Toaster } from 'react-hot-toast'

import ProtectedRoute from './component/ProtectedRoute'
import ErrorBoundary from './component/ErrorBoundary'

import EditArticle from './component/EditArticles'
import AuthorArticles from './component/AuthorArticles'
import Unauthorized from './component/Unauthorized'
import WriteArticles from './component/WriteArticles'
import ArticleByID from './component/ArticleByID.jsx'

function App() {

  let routingObj = createBrowserRouter([

    {
      path: "/",

      element: <RootLayout />,

      errorElement: <ErrorBoundary />,

      children: [

        // HOME

        {
          path: "",
          element: <Home />
        },

        // REGISTER

        {
          path: "register",
          element: <Register />
        },

        // LOGIN

        {
          path: "login",
          element: <Login />
        },

        // USER PROFILE

        {
          path: "user-profile",

          element: (

            <ProtectedRoute role={["USER"]}>

              <UserProfile />

            </ProtectedRoute>
          )
        },

        // AUTHOR PROFILE

        {
          path: "author-profile",

          element: (

            <ProtectedRoute role={["AUTHOR"]}>

              <AuthorProfile />

            </ProtectedRoute>
          ),

          children: [

            {
              index: true,
              element: <AuthorArticles />
            },

            {
              path: "articles",
              element: <AuthorArticles />
            },

            {
              path: "write-article",
              element: <WriteArticles />
            }
          ]
        },

        // ADMIN PROFILE

        {
          path: "admin-profile",

          element: (

            <ProtectedRoute role={["ADMIN"]}>

              <AdminProfile />

            </ProtectedRoute>
          )
        },

        // ADD ARTICLE

        {
          path: "add-article",
          element: <AddArticle />
        },

        // EDIT ARTICLE

        {
          path: "edit-article",
          element: <EditArticle />
        },

        // UNAUTHORIZED

        {
          path: "unauthorized",
          element: <Unauthorized />
        },

        // ARTICLE BY ID

        {
          path: "article/:id",
          element: <ArticleByID />
        }

      ]
    }

  ])

  return (

    <>

      <Toaster
        position='top-center'
        reverseOrder={false}
      />

      <RouterProvider router={routingObj} />

    </>
  )
}

export default App
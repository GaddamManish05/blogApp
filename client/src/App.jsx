import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router'
import Register from './component/Register'
import Login from './component/Login'
import AddArticle from './component/AddArticle'
import Home from './Home'
import RootLayout from './component/RootLayout'
import UserProfile from './component/UserProfile'
import AuthorProfile from './component/AuthorProfile'
import {Toaster} from 'react-hot-toast'
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
      path : "/",
      element :<RootLayout></RootLayout>,
      errorElement : <ErrorBoundary/>,
      children :[
        {
          path: "",
          element : <Home></Home>
        },
        {
          path: "register",
          element : <Register></Register>
        },
        {
          path: "login",
          element : <Login></Login>
        },
        {
          path: "user-profile",
          element : (
          <ProtectedRoute role = {["USER"]}>
            <UserProfile/>
          </ProtectedRoute>)
        },
        {
          path: "author-profile",
          element : (
            <ProtectedRoute role={["AUTHOR"]}>
              <AuthorProfile/>
            </ProtectedRoute>
          ),
          children : [
            {
              index: true,
              element: <AuthorArticles />,
            },
            {
              path: "articles",
              element: <AuthorArticles />,
            },
            {
              path: "write-article",
              element: <WriteArticles />,
            },
            
          ]
        },
        {
          path: "add-article",
          element : <AddArticle/>
        },
        {
          path:"edit-article",
          element:<EditArticle />
        },
        {
          path:"unauthorized",
          element:<Unauthorized />
        },
        {
          path:"article/:id",
          element:<ArticleByID></ArticleByID>
        }
      ]
    }
  ])
  return (
    <>
      <Toaster position='top-center' reverseOrder= {false}></Toaster>
      <RouterProvider router = {routingObj}></RouterProvider>
    </>
  )
}

export default App
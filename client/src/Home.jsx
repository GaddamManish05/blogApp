import React from "react";
import Login from './component/Login'
import { useNavigate } from "react-router";
import {
  pageBackground,
  pageWrapper,
  section,
  pageTitleClass,
  headingClass,
  bodyText,
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  primaryBtn
} from "./styles/Common";

function Home() {
  const navigate = useNavigate();
  const sampleBlogs = [
    {
      title: "Getting Started with MERN Stack",
      desc: "Learn how to build full stack applications using MongoDB, Express, React, and Node.js."
    },
    {
      title: "Understanding React Hooks",
      desc: "A beginner friendly guide to useState, useEffect and custom hooks in React."
    },
    {
      title: "JavaScript Tips for Developers",
      desc: "Improve your coding skills with these useful JavaScript tricks and best practices."
    }
  ];

  const newUser = () => {
    navigate('/login');
  }

  return (

    <div className={pageBackground}>

      <div className={pageWrapper}>

        {/* Hero Section */}

        <section className={section + " text-center"}>

          <h1 className={pageTitleClass}>
            Welcome to BlogSpace
          </h1>

          <p className={bodyText + " mt-4 max-w-xl m-auto"}>
            Discover articles, tutorials, and insights from developers and
            writers around the world.
          </p>

          <button onClick={newUser}className={primaryBtn + " mt-6"}>
            Explore Articles
          </button>

        </section>


        {/* Featured Articles */}

        <section className={section}>

          <h2 className={headingClass + " mb-6"}>
            Featured Articles
          </h2>

          <div className={articleGrid}>

            {sampleBlogs.map((blog, index) => (
              <div key={index} className={articleCardClass}>

                <h3 className={articleTitle}>
                  {blog.title}
                </h3>

                <p className={articleExcerpt}>
                  {blog.desc}
                </p>

              </div>
            ))}

          </div>

        </section>

      </div>

    </div>

  );
}

export default Home;
import React from 'react';
import blog from '../assets/blog.jpg';
import { NavLink } from 'react-router';
import { userAuth } from '../AuthStore/AuthStore';

import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
} from '../styles/Common.js';

function Header() {
  // ✅ Direct Zustand state (NO useState)
  const isAuthenticated = userAuth(state => state.isAuthenticated);
  const currentUser = userAuth(state => state.currentUser);

  console.log(isAuthenticated);
  return (
    <nav className={navbarClass}>
      {!isAuthenticated ? (
        // 🔹 Guest Navbar
        <div className={navContainerClass}>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={blog} alt="blog" className="w-8 h-8 rounded-xl" />
            <span className={navBrandClass}>BlogSpace</span>
          </div>

          {/* Links */}
          <ul className={navLinksClass}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? navLinkActiveClass : navLinkClass
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? navLinkActiveClass : navLinkClass
                }
              >
                Register
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? navLinkActiveClass : navLinkClass
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      ) : (
        // 🔹 Authenticated Navbar
        <div className={navContainerClass}>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={blog} alt="blog" className="w-8 h-8 rounded-xl" />
            <span className={navBrandClass}>BlogSpace</span>
          </div>

          {/* Links */}
          <ul className={navLinksClass}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? navLinkActiveClass : navLinkClass
                }
              >
                Home
              </NavLink>
            </li>
          </ul>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">
              {currentUser?.username}
            </span>
            
            <img
              src={currentUser?.profileImageUrl}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
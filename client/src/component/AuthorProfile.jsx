import { Navigate, NavLink, Outlet } from "react-router";
import { pageWrapper, navLinkClass, navLinkActiveClass, divider, submitBtn } from "../styles/Common.js";
import { userAuth } from "../AuthStore/AuthStore.js";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
function AuthorProfile() {
  const logout = userAuth(state => state.logout);
  const navigate = useNavigate();
  const handleLogout = async() => {
    await logout();
    toast.success('Logout Successful');
    navigate('/login');
  }
  return (
    <div className={pageWrapper}>
      {/* Author Navigation */}
      <div className="flex gap-6 mb-6 justify-around">
        <NavLink to="articles" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
          Articles
        </NavLink>

        <NavLink to="write-article" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
          Write Article
        </NavLink>
        <div>
          <button className = {`${submitBtn} w-3/11 px-4 py-2`} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className={divider}></div>

      {/* Nested route content */}
      <Outlet />
    </div>
  );
}

export default AuthorProfile;
import React, { useState } from 'react';
import { images } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
import { CgLogIn, CgLogOut } from "react-icons/cg";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaBlog } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { logout } from "../store/actions/user";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navIsVisible, setNavIsVisible] = useState(false);
  const userState = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/'); // Added navigation after logout
  };
  
  const navItemsInfo = [
    { name: 'Home', type: "link", href: "/", icon: FaHome },
    { name: 'Blog', type: "link", href: "/blog", icon: FaBlog },
    { name: 'Contact', type: "link", href: "/contact", icon: MdOutlineMailLock },


  // Dashboard - only shown to admin users
  ...(userState?.userInfo?.admin ? [
    {
      name: 'Dashboard',
      type: "link",
      href: "/dashboard",
      icon: MdDashboard,
      className: "hover:bg-yellow-600 cursor-pointer",
      iconClassName: "w-5 h-5"
    }
  ] : []),

  // Conditional items using spread operator
  ...(!userState?.userInfo ? [
    {
      name: 'Signup',
      type: "button",
      icon: SiGnuprivacyguard,
      className: "hover:bg-green-600 cursor-pointer",
      iconClassName: "w-5 h-5",
      onClick: () => navigate('/register')
    },
    {
      name: 'Login',
      type: "button",
      icon: CgLogIn,
      className: "hover:bg-blue-600 cursor-pointer",
      iconClassName: "w-5 h-5",
      onClick: () => navigate('/login')
    }
  ] : [
    // Logged-in user items
    {
      name: 'Profile',
      type: "link", 
      href: "/profile",
      icon: CiUser, 
      className: "hover:bg-purple-600 cursor-pointer",
      iconClassName: "w-5 h-5"
    },
    {
      name: 'Logout',
      type: "button",
      icon: CgLogOut,
      className: "hover:bg-red-600 cursor-pointer",
      iconClassName: "w-5 h-5",
      onClick: logoutHandler
    }
  ])
];

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => !curState);
  };

  const NavItem = ({ name, type, href, onClick, icon: Icon, className = "", iconClassName = "" }) => {
    const baseClasses = 'flex flex-col items-center px-4 py-1 transition-all rounded-md gap-y-1 text-slate-200 hover:text-white hover:scale-105 ' + className;

    if (type === "link" && href) {
      return (
        <Link to={href} className={`${baseClasses} hover:bg-black`}>
          <small>{name}</small>
          {Icon && <Icon className={`${iconClassName || "w-5 h-5"}`} />}
        </Link>
      );
    }

    return (
      <button onClick={onClick} className={`${baseClasses} hover:bg-black`}>
        <small>{name}</small>
        {Icon && <Icon className={`${iconClassName || "w-5 h-5"}`} />}
      </button>
    );
  };

  return (
    <section className="sticky top-0 left-0 right-0 z-50">
      <header className="container flex items-center justify-between px-5 py-4 mx-auto">
        <Link to="/">
          <img className="w-60" src={images.VoaLogo} alt="logo" />
        </Link>

        <div className='z-50 lg:hidden'>
          {navIsVisible ? (
            <AiOutlineClose 
              className='w-6 h-6 text-white cursor-pointer' 
              onClick={navVisibilityHandler}
            /> 
          ) : ( 
            <AiOutlineMenu className='w-6 h-6 text-white cursor-pointer' onClick={navVisibilityHandler} />
          )}
        </div>

        <div className={`${
            navIsVisible ? "right-0" : "-right-full"
          } transition-all duration-300 mt-[56px] lg:mt-0 lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-4 items-center`}
        >
          <ul className="flex flex-col items-center w-full py-2 m-auto font-semibold bg-gray-700 rounded-md shadow-lg lg:flex-row gap-x-1 lg:w-auto justify-evenly gap-y-2 backdrop-blur">
            {navItemsInfo.map((item) => (
              <li key={item.name} className="w-full lg:w-auto">
                <NavItem 
                  name={item.name}
                  type={item.type}
                  href={item.href}
                  onClick={item.onClick}
                  icon={item.icon}
                  className={item.className}
                  iconClassName={item.iconClassName}
                />
              </li>
            ))}
          </ul>
        </div>
      </header>
    </section>
  )
}

export default Header;

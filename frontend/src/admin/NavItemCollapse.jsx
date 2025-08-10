import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavItemCollapse = ({
  title,
  children,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (activeNavName !== name) {
      setIsChecked(false);
    }
  }, [activeNavName, name]);

  return (
    <div className="min-h-0 py-2 rounded-none d-collapse d-collapse-arrow">
      <input
        type="checkbox"
        className="min-h-0 py-0"
        checked={name === activeNavName}
        onChange={() => {
          setActiveNavName(name);
          setIsChecked(!isChecked);
        }}
      />
      <div
        className={`d-collapse-title font-medium min-h-0 py-0 pl-0 flex items-center gap-x-2 text-lg ${name === activeNavName
          ? "font-bold text-primary"
          : "font-semibold text-[#A5A5A5]"
          }`}
      >
        {icon}
        {title}
      </div>
      <div className="d-collapse-content">
        <div className="flex flex-col mt-2 gap-y-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NavItemCollapse;
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const NavItemCollapse = ({
//   title,
//   content,
//   icon,
//   name,
//   activeNavName,
//   setActiveNavName,
// }) => {
//   const [isChecked, setIsChecked] = useState(false);

//   useEffect(() => {
//     if (activeNavName !== name) {
//       setIsChecked(false);
//     }
//   }, [activeNavName, name]);

//   return (
//   <div tabIndex={0} className="text-white collapse collapse-arrow border-base-300">

//     <input 
//       type="checkbox" 
//       className="min-h-0 py-0"
//       checked={ name === activeNavName}
//       onChange={() => {
//         setActiveNavName(name);
//         setIsChecked(!isChecked);
//         }}
//       />

//     <div className={`flex items-center pl-0 font-semibold gap-x-2 collapse-title ${name === activeNavName
//     ? "text-[#5eeccc]"
//     : "text-[#A5A5A5]"
//   }`}>{icon}{title}</div>
//     <div className="text-sm collapse-content">
//     <div className="flex flex-col gap-y-3">
//        {content.map((item) => (
//         <Link 
//           to={item.link}>{item.title}
//         </Link>
//        ))}
//         </div>
//     </div>
// </div>
//   );
// };

// export default NavItemCollapse;


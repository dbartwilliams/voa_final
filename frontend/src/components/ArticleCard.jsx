
import React from "react";
import { images, stables } from "../constants";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';

const ArticleCard = ({ post, className }) => {
  return (
    <div className="flex flex-col w-full overflow-hidden transition-shadow duration-300 rounded-r md:flex-row hover:shadow-xl">
  
  {/* Image container */}
  <div className="relative h-48 overflow-hidden md:h-64 md:w-1/3">
    <Link to={`/blog/${post.slug}`}>
      <img
        src={
          post.photo
            ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
            : images.samplePostImage
        }
        alt={post.title}
        className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 hover:scale-110"
        loading="lazy"
        onError={(e) => {
          e.target.src = images.samplePostImage;
          e.target.className = "absolute inset-0 object-contain w-full h-full";
        }}
      />
    </Link>
  </div>

  {/* Content container */}
  <div className="flex flex-col items-start p-4 bg-gray-800 md:w-2/3">
      <Link to={`/blog/${post.slug}`} className="group">
         <h2 className="text-xl font-bold text-[#5eeccc]  hover:text-[#1be4b5] md:text-2xl line-clamp-2">
           {post.title}
         </h2>
        {/* <p className="mt-2 text-gray-200 text-[18px] line-clamp-2 md:line-clamp-3">
          {post.caption}
       </p> */}
      </Link>

      <p className="py-2 text-[22px]">
        {post.caption.length > 180 ? post.caption.slice(0, 250) + "....." : post.caption}
      </p>
  
     {/* Author & Metadata */}
     <div className="flex flex-wrap items-center gap-4 mt-4 md:flex-nowrap">
        <div className="flex items-center gap-3">
          <Link to={`/user/${post.user?.username || '#'}`}>
            <img
              src={
                post.user?.avatar
                  ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                  : images.userImage
              }
              alt={post.user?.name || 'Author'}
              className="object-cover w-8 h-8 rounded-full md:w-10 md:h-10"
            />
          </Link>
          <span className="text-sm font-medium text-white border-b border-[#5eeccc] md:text-base">
            {post.user?.name || 'Unknown Author'}
          </span>
        </div>

        <div className="flex gap-4 text-sm md:text-base">
          <span>
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </span>
          <Link 
            to={`/blog/${post.slug}`}
            className="font-medium text-white border-b border-[#5eeccc]"
          >
            Read More →
          </Link>
        </div>
      </div>
  </div>
</div>


  );
};

export default ArticleCard;












// import React from "react";
// import { images, stables } from "../constants";
// import { Link } from "react-router-dom";
// import { formatDistanceToNow } from 'date-fns';

// const ArticleCard = ({ post, className }) => {
//   return (
//   <div
//     className={`flex flex-col md:flex-row rounded overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-amber-400 ${className}`}>




//     <div className="relative overflow-hidden aspect-video md:aspect-square md:w-1/3">
//       <Link to={`/blog/${post.slug}`}>
//         <img
//           src={
//             post.photo
//               ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
//               : images.samplePostImage
//           }
//           alt={post.title}
//           className="object-cover w-full transition-transform duration-500 hover:scale-110"
//           loading="lazy"
//           onError={(e) => {
//             e.target.src = images.samplePostImage;
//             e.target.className = "object-contain w-full h-full";
//           }}
//         />
//       </Link>
//     </div>




//     {/* Content Container */}
//     <div className="flex flex-col p-5 bg-blue-400 md:w-2/3 md:py-6">
//       <Link to={`/blog/${post.slug}`} className="group">
//         <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 md:text-2xl line-clamp-2">
//           {post.title}
//         </h2>
//         <p className="mt-2 text-gray-500 line-clamp-2 md:line-clamp-3">
//           {post.caption}
//         </p>
//       </Link>

//       {/* Article Content Excerpt */}
//       <div className="hidden mt-3 md:block">
//         <p className="text-gray-600 line-clamp-3">
//           {post.body?.content || post.caption}
//         </p>
//       </div>

//       {/* Author & Metadata */}
//       <div className="flex flex-wrap items-center gap-4 mt-4 md:flex-nowrap">
//         <div className="flex items-center gap-3">
//           <Link to={`/user/${post.user?.username || '#'}`}>
//             <img
//               src={
//                 post.user?.avatar
//                   ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
//                   : images.userImage
//               }
//               alt={post.user?.name || 'Author'}
//               className="object-cover w-8 h-8 rounded-full md:w-10 md:h-10"
//             />
//           </Link>
//           <span className="text-sm font-medium text-gray-700 md:text-base">
//             {post.user?.name || 'Unknown Author'}
//           </span>
//         </div>

//         <div className="flex gap-4 text-sm text-gray-500 md:text-base">
//           <span>
//             {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
//           </span>
//           <Link 
//             to={`/blog/${post.slug}`}
//             className="font-medium text-blue-500 hover:text-blue-700"
//           >
//             Read More →
//           </Link>
//         </div>
//       </div>
//     </div>

    

//   </div>
//   );
// };

// export default ArticleCard;




 
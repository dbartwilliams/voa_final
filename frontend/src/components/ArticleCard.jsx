import React from "react";
import { images, stables } from "../constants";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';

const ArticleCard = ({ post }) => {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col overflow-hidden bg-white rounded shadow-md md:flex-row">
        
        {/* Image - Left (2/5 on desktop) */}
        <div className="flex-shrink-0 w-full md:w-2/5">
          <Link to={`/blog/${post.slug}`}>
            <img
              src={
                post.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
                  : images.samplePostImage
              }
              alt={post.title}
              className="object-cover object-center w-full h-auto md:h-full"
              loading="lazy"
              onError={(e) => {
                e.target.src = images.samplePostImage;
                e.target.className =
                  "object-contain object-center w-full h-auto md:h-full";
              }}
            />
          </Link>
        </div>

        {/* Content - Right (3/5 on desktop) */}
        <div className="flex flex-col justify-center w-full p-6 bg-gray-800 md:w-3/5">
          
        <Link to={`/blog/${post.slug}`} className="group">
          <h2 className="mb-2 lg:text-[26px] text-[22px] font-bold text-[#5eeccc]  hover:text-[#1be415] ">
            {post.title}
          </h2>
        </Link>

          <p className="mb-4 text-gray-300 lg:text-[24px] text-[18px]">
            {post.caption.length > 180
              ? post.caption.slice(0, 250) + "....."
              : post.caption}
          </p>

          {/* Profile + Date + Read More */}
          <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-700">
            {/* Left side - Profile image + date */}
           
            <Link to={`/user/${post.user?.username || '#'}`}>
                <div className="flex items-center space-x-3">
                    <img
                        src={
                          post.user.avatar
                            ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                            : images.userImage
                        }
                      alt="user avatar"
                      className="object-cover w-10 h-10 rounded-full"
                    />

                      {/* Post Authot */}
                      <span className="text-sm font-medium text-white border-b border-[#5eeccc] md:text-base hover:text-[#1be415]">
                      {post.user?.name || 'Unknown Author'}
                      </span>
                        
                      {/* Date Posted */}
                      <span className="text-sm text-white border-b border-[#5eeccc]">
                              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                      </span>
                </div>
            </Link>

            {/* Right side - Read More */}
            <Link
              to={`/blog/${post.slug}`}
              className="text-sm font-medium text-white border-b border-[#5eeccc] hover:text-[#1be415]"
            >
              Read more →
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ArticleCard


// import React from "react";
// import { images, stables } from "../constants";
// import { Link } from "react-router-dom";
// import { formatDistanceToNow } from 'date-fns';

// const ArticleCard = ({ post }) => {
//   return (
//     <div className="flex flex-col w-full overflow-hidden transition-shadow duration-300 rounded-lg md:flex-row hover:shadow-xl">
  
//   {/* Image container */}
  
//   <div className="relative h-48 overflow-hidden md:h-64 md:w-1/3">
//     <Link to={`/blog/${post.slug}`}>
//       <img
//         src={post.photo 
//             ? `${stables.UPLOAD_FOLDER_BASE_URL}/${post.photo}` 
//             : images.samplePostImage}
//             alt={post.title}

//         className="inset-0 object-cover w-full h-full transition-transform duration-500 hover:scale-110"
//         loading="lazy"
//         onError={(e) => {
//           e.target.src = images.samplePostImage;
//           e.target.className = "absolute inset-0 object-contain w-full h-full";
//         }}
//       />
//     </Link>
//   </div>

//   {/* Content container */}
//   <div className="flex flex-col items-start p-4 bg-gray-800 md:w-2/3">
//       <Link to={`/blog/${post.slug}`} className="group">
//          <h2 className="text-[20px] font-bold text-[#5eeccc]  hover:text-[#1be4b5] md:text-[22px] line-clamp-2">
//            {post.title}
//          </h2>
//       </Link>

//       <p className="py-2 text-[20px] text-gray-300">
//         {post.caption.length > 180 ? post.caption.slice(0, 250) + "....." : post.caption}
//       </p>
  
//      {/* Author & Metadata */}
//      <div className="flex flex-wrap items-center gap-4 mt-4 md:flex-nowrap">
//         <div className="flex items-center gap-3">

//           <Link to={`/user/${post.user?.username || '#'}`}>
//             <img
//               src={
//                 post.user?.avatar
//                 ? `${stables.UPLOAD_FOLDER_BASE_URL}/${post.user.avatar}`
//                 : images.userImage
//               }
//                alt={post.user?.name || 'Author'}
//               className="object-cover w-8 h-8 rounded-full md:w-10 md:h-10"
//             />
//           </Link>
//           <span className="text-sm font-medium text-white border-b border-[#5eeccc] md:text-base">
//             {post.user?.name || 'Unknown Author'}
//           </span>
//         </div>

//         <div className="flex gap-4 text-sm md:text-base">
//           <span>
//             {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
//           </span>
//           <Link 
//             to={`/blog/${post.slug}`}
//             className="font-medium text-white border-b border-[#5eeccc]"
//           >
//             Read More →
//           </Link>
//         </div>
//       </div>
//   </div>
// </div>
//   );
// };

// export default ArticleCard;





 
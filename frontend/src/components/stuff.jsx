import React from "react";
import { images, stables } from "../constants";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';


const ArticleCard = ({ post, className }) => {
    return (
      <div
        className={`flex flex-col md:flex-row rounded-t-lg overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] 
        ${className}`}
      >
        
        <img
          src={
            post.photo
              ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
              : images.samplePostImage
          }
          alt="title"
          className="object-cover w-full rounded-t-lg h-[300px] md:w-1/3 transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
        />

  
        {/* Removed justify-center to align content at the top */}
        <div className="flex flex-col p-5 md:w-2/3">

          {/* ARTICLE TITLE */}
          <Link to={`/blog/${post.slug}`}>
            <h2 className="text-2xl font-semibold cursor-pointer textcol">
            {post.title}
            </h2>
         

          {/* ARTICLE CONTENT */}
          <p className="mt-3 text-xl text-gray-400">
          {post.caption}
          </p>
          </Link>

          <p className="mt-3 text-base text-gray-400">
               {post.body.content}
          </p>
          

          {/* WRITERS DETAILS */}
          <div className="flex items-center gap-6 mt-6 flex-nowrap">

              {/* WRITERS PROFILE */}
              <div className="flex items-center gap-x-3">

              <Link to={`/blog/${post.slug}`}>
                  <img
                      src={
                        post.user.avatar
                          ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                          : images.userImage
                      }
                      alt="Post Profile" 
                    className="w-10 h-10 rounded-full md:w-10 md:h-10"
                    />
                  </Link>

                <div className="flex flex-col">
                    <h4 className="pb-1 border-b border-[#5eeccc] italic md:text-base cursor-pointer">
                        {post.user.name}
                    </h4>
                </div>
              </div>

              {/* PUBLISHED DATE */}
              <span className="pb-1 border-b border-[#5eeccc] md:text-base">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </span>
              <Link to={`/blog/${post.slug}`}>
              <span className="pb-1 border-b border-[#5eeccc] cursor-pointer md:text-base">
                ReadMore
              </span>
              </Link>

          </div>

        </div>
      </div>
    );
  };
  
export default ArticleCard;
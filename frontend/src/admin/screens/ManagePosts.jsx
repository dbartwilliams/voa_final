import React, { useEffect, useState } from 'react'
import { images, stables } from "../../constants";
import { deletePost, getAllPosts } from '../../services/index/posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom";
import Pagination  from "../../components/Pagination";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux"

// import { Link } from "react-router-dom";

let isFirstRun = true;

const ManagePosts = () => {
    const  queryClient = useQueryClient()
    const  userState = useSelector((state) => state.user)
    const [ searchkeyword , setSearchKeyword] = useState("")
    const [ currentPage , setCurrentPage] = useState(1)

    const { 
        data: postsData, 
        isLoading, 
        isFetching,
        refetch, 
    } = useQuery({
        queryFn: () => getAllPosts(searchkeyword, currentPage),
        queryKey: ["posts"],
      });


      const { mutate: mutateDeletePost, isLoading: isLoadingDeletePost } = useMutation({
        mutationFn: ({ slug, token }) => {
          return deletePost({
            token,
            slug,
          });
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries(["posts"]);
          toast.success("Post is deleted");
        },
        onError: (error) => {
          toast.error(error.message);
          console.log(error);
        },
      });

      useEffect(() => {
        if (isFirstRun) {
            isFirstRun = false;
            return;
        }
        refetch();
      }, [refetch, currentPage])

    const searchkeywordHandler = (e) => {
        const { value } = e.target;
        setSearchKeyword(value);
    }

    const submitsearchkeywordHandler = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        refetch()
    }

    const deletePostHandler = (slug, token) => {
        mutateDeletePost({slug, token})
    }

  return (
    <div className=''>
        <div className="w-full px-4 mx-auto">
        <div className="py-8">
            <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                <h2 className="text-2xl leading-tight">
                    Manage Posts
                </h2>
                <div className="text-end">
                    <form onSubmit={submitsearchkeywordHandler} className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                        <div className="relative ">
                            <input type="text" id="&quot;form-subscribe-Filter" className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                             placeholder="Post title...."
                             onChange={searchkeywordHandler}
                             value={searchkeyword}
                             />
                            </div>
                            <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                                Filter
                            </button>
                        </form>
                    </div>
                </div>
                <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div className="inline-block min-w-full overflow-hidden shadow">
                        <table className="min-w-full leading-normal bg-gray-800">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b-4 border-[#5eeccc]">
                                        Image
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b-4 border-[#5eeccc]">
                                        Title
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b-4 border-[#5eeccc]">
                                        Category
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b-4 border-[#5eeccc]">
                                        Created at
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b-4 border-[#5eeccc]">
                                        Tags
                                    </th>

                                    <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b-4 border-[#5eeccc]">
                                        Published
                                    </th>
                                    
                                    <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b-4 border-[#5eeccc]">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                            { isLoading || isFetching ? (
                            <tr>
                                <td colSpan={5} className='w-full py-10 text-2xl text-center'>
                                    Loading please wait... 
                                </td>
                            </tr>
                            ) : postsData?.data?.length === 0 ? (

                            <tr>
                                <td colSpan={5} className='w-full py-10 text-2xl text-center'>
                                    There are currently no posts
                                </td>
                            </tr>

                            ) : ( 
                                postsData?.data.map((post) => (
                                <tr>
                                    <td className="px-5 py-5 text-sm border-b border-gray-700">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <a href="/" className="relative block">
                                                    <img
                                                        src={
                                                            post?.photo
                                                            // ? stables.UPLOAD_FOLDER_BASE_URL + post?.photo
                                                        ?   `${stables.UPLOAD_FOLDER_BASE_URL}/${post.photo}`
                                                            : images.samplePostImage
                                                        }
                                                        alt="Post Image"
                                                        className="object-cover w-10 mx-auto rounded-lg aspect-square"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 text-sm border-b border-gray-700">
                                        <div className="ml-3">
                                            <p className="text-xl text-gray-200 whitespace-no-wrap">
                                                {post.title}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 text-sm border-b border-gray-700">
                                    <p className="text-gray-200 whitespace-no-wrap">
                                        {post.categories.length > 0
                                            ? post.categories
                                                .slice(0, 3)
                                                .map(
                                                (category, index) =>
                                                    `${category.title}${
                                                    post.categories.slice(0, 3).length === index + 1
                                                        ? ""
                                                        : ", "
                                                    }`
                                                )
                                            : "Not Set"}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 text-sm border-b border-gray-700">
                                        <p className="text-gray-200 whitespace-no-wrap">
                                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 text-xl border-b border-gray-700">
                                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-[#5eeccc]">
                                        <div className="flex gap-x-2">
                                            {post.tags.length > 0
                                                ? post.tags.map((tag, index) => (
                                                    <p>
                                                    {tag}
                                                    {post.tags.length - 1 !== index && ","}
                                                    </p>
                                                ))
                                                : "No tags"}
                                            </div>
                                        </span>
                                    </td>

                                    <td className="px-5 py-5 text-sm border-b border-gray-700">
                                    {post.isPublished ? (
                                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-[#5eeccc] bg-gray-700 rounded-full">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Published
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        Draft
                                        </span>
                                    )}
                                    </td>
                                    <td className="px-5 py-5 space-x-5 text-sm border-b border-gray-700">
                                        <button 
                                            disabled={isLoadingDeletePost}
                                            onClick={() => {deletePostHandler({slug: post?.slug, token: userState.userInfo.token})}}
                                            type='button' className="text-red-400 cursor-pointer hover:hover:text-red-500 disabled:opacity-70 disabled:cursor-not-allowed">
                                            Delete
                                        </button>
                                        <Link to={`/dashboard/posts/manage/edit/${post?.slug}`} 
                                            className="text-[#5eeccc] hover:hover:text-[#1be4b5]">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                                ))
                            )}
                           </tbody>
                        </table>

                        {/* PAGINATION */}
                        {!isLoading && (
                            <Pagination 
                            onPageChange={(page ) => setCurrentPage(page)}
                            currentPage={currentPage}
                            totalPageCount={JSON.parse(postsData?.headers?.[`x-totalpagecount`])}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default ManagePosts;







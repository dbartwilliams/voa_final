import React, { useState } from 'react'
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSinglePost, updatePost } from '../../services/index/posts';
import ErrorMessage from '../../components/ErrorMessage';
import ArticleDetailSkeleton from '../../components/ArticleDetailSkeleton';
import { stables } from '../../constants';
import { HiOutlineCamera } from "react-icons/hi";
import Editor from "../../components/editor/Editor";
import MultiSelectTagDropdown from "../../components/MultiSelectTagDropdown";
import { getAllCategories } from "../../services/index/postCategories";
import {
  categoryToOption,
  filterCategories,
} from "../../utils/multiSelectTagUtils";

const promiseOptions = async (inputValue) => {
  const { data: categoriesData } = await getAllCategories();
  return filterCategories(inputValue, categoriesData);
};

const EditPost  = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const [categories, setCategories] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(null);
  const [postSlug, setPostSlug] = useState(slug);
  const [caption, setCaption] = useState("");
  const [isPublished, setIsPublished] = useState("");



  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }), 
    queryKey: ['blog', slug ],
    onSuccess: (data) => {
      setInitialPhoto(data?.photo || null);
      setCategories(data.categories.map((item) => item._id));
      setTitle(data.title);
      setTags(data.tags);
      setCaption(data.caption);
      setBody(data.body);
      setIsPublished(Boolean(data.isPublished));
    },
    refetchOnWindowFocus: false,
  });

    const {
      mutate: mutateUpdatePostDetail,
      isLoading: isLoadingUpdatePostDetail,
    } = useMutation({
      mutationFn: ({ updatedData, slug, token }) => {
        return updatePost({
          updatedData,
          slug,
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["blog", slug]);
        toast.success("Post is updated");
        navigate(`/dashboard/posts/edit/manage/${data.slug}`, { replace: true });
      },
      onError: (error) => {  
        toast.error(error.message);
        console.log(error);
      },
    });
   
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setPhoto(file);
    };

    const handleUpdatePost = async () => {
      let updatedData = new FormData();
  
      if (!initialPhoto && photo) {
        updatedData.append("postPicture", photo);
      } else if (initialPhoto && !photo) {
        const urlToObject = async (url) => {
          let reponse = await fetch(url);
          let blob = await reponse.blob();
          const file = new File([blob], initialPhoto, { type: blob.type });
          return file;
        };
        const picture = await urlToObject(
           `${stables.UPLOAD_FOLDER_BASE_URL}/${data.photo}`
        );
  
        updatedData.append("postPicture", picture);
      } 
  
      updatedData.append(
        "document",
        JSON.stringify({ body, categories, title, tags, isPublished, slug: postSlug, caption })
      );
  
  
      mutateUpdatePostDetail({
        updatedData,
        slug,
        token: userState.userInfo.token,
      });
    };

    const handleDeleteImage = () => {
      if (window.confirm("Do you want to delete your Post picture?")) {
        setInitialPhoto(null);
        setPhoto(null);
      }
    };

    let isPostDataLoaded = !isLoading && !isError;

  return (
    <div className='bg-[#1e1e1e]'>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
            <section className="container flex flex-col max-w-6xl py-5 mx-auto px-9 lg:flex-row lg:gap-x-5 lg:items-start">
                <article className="flex-1 px-5 pb-2">

                  {/* LABEL AND HIDDEN INPUT */}
                <label htmlFor="postPicture" className='w-full cursor-pointer'>
                {photo ? (
                        // New image just selected
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="Post Image"
                          className="w-[800px] rounded"
                        />
                      ) : initialPhoto ? (
                        // Existing image from server
                        <img
                          src={`${stables.UPLOAD_FOLDER_BASE_URL}/${data?.photo}`}
                          alt="Post Image"
                          className="w-full rounded-xl"
                        />
                      ) : (
                      <div className='flex items-center justify-center w-full min-h-[200px] bg-blue-50/50'>
                         <HiOutlineCamera className="w-12 h-auto" />
                      </div>
                    )}
                  </label>

                  <input  
                    type='file' 
                    className='sr-only' 
                    id="postPicture"
                    onChange={handleFileChange}
                    />

                  {/* DELETE IMAGE */}
                  <button type='button' 
                      onClick={handleDeleteImage}
                      className='px-2 py-1 mt-4 text-sm text-black bg-red-300 rounded cursor-pointer w-fit'>   
                    Delete Image
                  </button>

                    {/*ARTICLE CATEGORY  */}
                    <div className="flex gap-2 mt-4">
                        {data?.categories.map((category) => (
                            <Link
                            to={`/blog?category=${category.name}`}
                            className="inline-block text-sm text-primary font-roboto md:text-base"
                            >
                            {category.name}
                            </Link>
                        ))}
                    </div>


                    {/* TITLE + PUBLISH CHECKBOX */}
                    <div className="flex items-end w-full gap-4 mb-2">
                      {/* Title Input (takes remaining space) */}
                      <div className="flex-1">
                        <label htmlFor="title" className="block mb-1 text-lg">
                          Article Title
                        </label>
                        <input
                          id="title"
                          value={title}
                          className="w-full p-2 text-xl font-medium border border-gray-700 rounded outline-slate-300"
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter Title"
                        />
                      </div>

                      {/* Simple Checkbox */}
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          type="checkbox"
                          id="publish"
                          checked={isPublished}
                          onChange={() => setIsPublished(!isPublished)}
                          className="w-5 h-5"
                        />
                        <label htmlFor="publish" className="text-gray-200">
                          Publish
                        </label>
                      </div>
                    </div>


                    {/* CAPTION */}
                    <div className="w-full space-x-4">
                        <label className="" htmlFor="caption">
                          <span className="text-lg">Caption</span>
                        </label>
                        <textarea
                            id="caption"
                            value={caption}
                            className="w-full p-2 text-xl font-medium border border-gray-700 rounded resize-none"
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Enter new caption"
                        />
                    </div>

                    {/* SLUG */}
                    <div className="w-full">
                        <label className="" htmlFor="slug">
                          <span className="text-lg">Slug</span>
                        </label>
                        <input
                          id="slug"
                          value={postSlug}
                          className="w-full p-2 text-xl font-medium border border-gray-700 rounded resize-none"
                          onChange={(e) =>
                            setPostSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())
                          }
                          placeholder="post slug"
                        />
                      </div>
                   
                    {/* MULTI-SELECT DROPDOWN */}
                    <div className="my-5">
                    <label className="mb-1">
                        <span className="text-lg text-white">Categories</span>
                    </label>
                    {isPostDataLoaded && (
                      <MultiSelectTagDropdown
                          loadOptions={promiseOptions}
                          defaultValue={data.categories.map(categoryToOption)}
                          onChange={(newValue) =>
                          setCategories(newValue.map((item) => item.value))
                        }
                      />
                    )}
                    </div>

                    {/* ARTICLE TAGS */}
                    <div className="mt-2 mb-5">
                        <label className="">
                          <span className="text-lg">Tags</span>
                        </label>
                        {isPostDataLoaded && (
                          <CreatableSelect
                            defaultValue={data.tags.map((tag) => ({
                              value: tag,
                              label: tag,
                            }))}
                            isMulti
                            onChange={(newValue) =>
                              setTags(newValue.map((item) => item.value))
                            }
                            className="relative z-20"
                          />
                        )}
                      </div>

                    {/* TIPTAP EDITOR */}
                    <div className="w-full bg-white">
                      {isPostDataLoaded && (
                          <Editor
                            content={data?.body}
                            editable={true}
                            onDataChange={(data) => {
                              setBody(data);
                            }}
                          />
                        )}
                    </div>

                    <button
                        disabled={isLoadingUpdatePostDetail}
                        type="button"
                        onClick={handleUpdatePost}
                        className="w-full px-4 py-2 mt-5 font-semibold text-white rounded cursor-pointer bg-slate-500 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        Update Post
                      </button>
                    </article>


            </section>
             )}
    </div>
  )
}
export default EditPost;

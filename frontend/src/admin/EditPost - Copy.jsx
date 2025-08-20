import React, { useState } from 'react'
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSinglePost, updatePost } from '../services/index/posts';
import ErrorMessage from '../components/ErrorMessage';
import ArticleDetailSkeleton from '../components/ArticleDetailSkeleton';
import { HiOutlineCamera } from "react-icons/hi";
import Editor from "../components/editor/Editor";
import MultiSelectTagDropdown from "../components/MultiSelectTagDropdown";
import { getAllCategories } from "../services/index/postCategories";
import Image from "../components/Image";
import { getPostImagePath } from '../util/imageKitHelper';
import {
  categoryToOption,
  filterCategories,
} from "../util/multiSelectTagUtils";

const promiseOptions = async (inputValue) => {
  const { data: categoriesData } = await getAllCategories();
  return filterCategories(inputValue, categoriesData);
};


const EditPost = () => {
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
    queryKey: ["blog", slug],
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (data) {
      setInitialPhoto(data?.photo || null);
      setCategories(data.categories.map((item) => item._id) || []);
      setTitle(data?.title || "");
      setTags(data.tags || []);
      setCaption(data?.caption || "");
      setIsPublished(data?.isPublished || "");
      setBody(data?.body || "");
    }
  }, [data]);

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
      navigate(`/admin/posts/edit/${data.slug}`, { replace: true });
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
          // stables.UPLOAD_FOLDER_BASE_URL + data?.photo
        );
  
        updatedData.append("postPicture", picture);
      }
  
      updatedData.append(
        "document",
        JSON.stringify({ body, categories, title, tags, slug: postSlug, caption })
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
    <div>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <section className="container flex flex-col max-w-5xl px-5 py-5 mx-auto lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <label htmlFor="postPicture" className="w-full cursor-pointer">
              {!photo ? (
                <Image
                src={getPostImagePath(data.photo)}
                  alt={data?.title}
                  className="w-[300px] rounded-xl"
                />
              ) : (
                <div className="w-full min-h-[200px] bg-blue-50/50 flex justify-center items-center">
                  <HiOutlineCamera className="h-auto w-7 text-primary" />
                </div>
              )}
            </label>
            <input
              type="file"
              className="sr-only"
              id="postPicture"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              className="px-2 py-1 mt-5 text-sm font-semibold text-white bg-red-500 rounded w-fit"
            >
              Delete Image
            </button>

            {/* Categories */}
            <div className="flex gap-2 mt-4">
              {data?.categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/blog?category=${category.name}`}
                  className="inline-block text-sm text-primary font-roboto md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Title + isPublished */}
            <div className="w-full p-3 d-form-control">
              <label className="d-label" htmlFor="title">
                <span className="text-white">Title</span>
              </label>

              <div className="flex items-center gap-4">
                {/* Title input */}
                <input
                  value={title}
                  id="title"
                  className="flex-1 p-2 text-[18px] font-medium !text-white border border-gray-700 rounded"
                  onChange={(e) => setTitle(e.target.value)}
                />

                {/* isPublished checkbox */}
                <label className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-5 h-5 accent-green-600"
                  />
                  Published
                </label>
              </div>
            </div>
            {/* Caption */}
            <div className="w-full d-form-control">
              <label className="d-label" htmlFor="caption">
                <span className="d-label-text">Caption</span>
              </label>
              <textarea
                id="caption"
                value={caption}
                className="w-full p-3 text-[18px] font-medium border border-gray-700 rounded resize-none h-35"
                onChange={(e) => setCaption(e.target.value)}
                placeholder="caption"
              />
            </div>

            {/* Slug */}
            <div className="w-full d-form-control">
              <label className="d-label" htmlFor="slug">
                <span className="d-label-text">Slug</span>
              </label>
              <input
                id="slug"
                value={postSlug}
                className="w-full p-2 text-[18px] font-medium text-white border border-gray-700 rounded"
                onChange={(e) =>
                  setPostSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())
                }
                placeholder="post slug"
              />
            </div>

            {/* Categories dropdown */}
            <div className="mt-2 mb-5">
              <label className="d-label">
                <span className="d-label-text">Categories</span>
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

            {/* Tags */}
            <div className="mt-2 mb-5">
              <label className="d-label">
                <span className="d-label-text">Tags</span>
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

            {/* Editor */}
            <div className="w-full mb-3 bg-white">
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
              className="w-full px-4 py-2 font-semibold text-black bg-[#5eeccc] hover:bg-[#1be415] rounded disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer">
              Update Post
            </button>
          </article>
        </section>
      )}
    </div>
  );
};

export default EditPost;


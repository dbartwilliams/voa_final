import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import Header from './Header'
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/index/users";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";


const AdminLayout = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const {
    // data: profileData,
    isLoading: profileIsLoading,
    // error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
    onSuccess: (data) => {
      if (!data?.admin) {
        navigate("/");
        toast.error("Ops! Intruder dictected");
      }
    },
    onError: (err) => {
      console.log(err);
      navigate("/");
      toast.error("Ops! You are an intruder");
    },
  });

  if (profileIsLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h3 className="text-3xl text-green-700">Loading please wait .....</h3>
      </div>
    );
  }


  return (
    <div className='flex flex-col lg:flex-row'>
      <Header />

      <main className="flex-1 p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
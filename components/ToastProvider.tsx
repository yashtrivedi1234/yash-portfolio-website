"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      toastClassName="!rounded-xl !border !border-slate-700 !bg-slate-900/95 !text-slate-100 !shadow-xl !backdrop-blur-sm"
      progressClassName="!bg-violet-500"
    />
  );
}

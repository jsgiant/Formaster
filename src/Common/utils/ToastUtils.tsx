import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Toaster = () => {
   return (
      <ToastContainer
         position='bottom-center'
         autoClose={3000}
         hideProgressBar
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss={false}
         draggable
         pauseOnHover={false}
      />
   )
}

export const notify = error => {
   toast.error(`${error}`, {
      className: {
         borderRadius: '50px',
         background: '#2FEDAD',
         boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)'
      }
   })
}

export const showSuccessMessage = message => {
   toast.success(`✔ ${message}`, {
      className: {
         borderRadius: '50px',
         background: '#2FEDAD',
         boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)'
      }
   })
}

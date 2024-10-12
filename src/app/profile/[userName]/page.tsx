import React from 'react'

function ProfilePage({params}:any) {
  return (
    <div className='flex justify-center mt-16 overflow-x-hidden w-screen'>
        Profile Page 
        <span className='bg-yellow-50 text-black ml-6'>{params.userName}</span>
    </div>
  )
}

export default ProfilePage

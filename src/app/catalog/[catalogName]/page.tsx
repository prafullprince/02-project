import React from 'react'

function page({params}:any) {
  return (
    <div className='flex min-h-screen justify-center items-center'>
        Catalog name is : <span className='text-2xl text-yellow-50 ml-3'>{" "} {params.catalogName}</span>
    </div>
  )
}

export default page

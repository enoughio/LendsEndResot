import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-red-400'> 
        <main className='bg-blue-400 flex gap-[25%] justify-center items-center py-4'>
            <div>
                landsend
            </div>
            <div className='flex flex-row gap-6 justify-center items-center'>
                <ul className='flex gap-3 font-extralight text-xl'>
                    <li>Retreet</li>
                    <li>Gallery</li>
                    <li>Contact</li>
                </ul>

                <div className='flex gap-3'>
                    <button className='border-2 p-2 px-4 rounded-3xl bg-transparent'>
                        Book Now
                    </button>
                    <button className='border-2 p-2 px-4 rounded-3xl bg-transparent bg-white'>
                        Free Call
                    </button>
                </div>

            </div>

        </main>
        
    </div>
  )
}

export default Navbar
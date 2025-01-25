import React from 'react';

const Navbar = () => {
    return (
        <nav>
            <div className='absolute'>
                <div className='w-screen flex justify-center items-center'>
                    <div className="bg-[#F1F9FF] w-[50vw] position-sticky mt-6 font-poppins text-white rounded-xl h-16 flex justify-left items-center">
                        <div className='rounded-full bg-white w-[3vw] h-[3vw] ml-4'></div>
                        <div className='flex gap-12 ml-12 font-medium text-[#8DCCFF] font-poppins justify-center items-center'>
                            <hr className='bg-white rounded-md w-64 h-2 '/>
                            {/* <h1>Home</h1>
                            <h1>About</h1>
                            <h1>Contact Us</h1> */}
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
import { Button } from '@heroui/react';
import Image from 'next/image';
import React from 'react';

const Navbar = () => {

    const date = new Date().toLocaleDateString("bn-bd",
    {
        dateStyle: "full",
    });



    return (
        <div className='flex justify-between container mx-auto items-center'>
            <div className='flex gap-2'>
                <div className='bg-[#05893E] py-2 px-2.75 rounded-[10px] w-13.5 h-15 inline-flex items-center justify-center'>
                    <Image 
                        height={28}
                        width={28}
                        src={'/logo-icon.png'}
                        alt='Logo Icon'
                    />
               </div>

                <div>
                    <h2 className="mb-1.5 text-3xl font-bold">বাজার দর</h2>
                    <p>{date}</p>
                </div>
            </div >
           
            <div className='flex gap-2'>
                <Button variant="bordered"
                className="text-[#1D271F] py-5 px-2.5"
                >সাইন ইন</Button>

                <Button className="bg-[#05893E] text-[#FAFCFA] py-2.5 px-4.75 rounded-[10px]">সাইন আপ</Button>
            </div>
            
        </div>
    );
};

export default Navbar;
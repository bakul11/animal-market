"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CategoryModal from '../modal/CategoryModal';
import AnimalModal from '../modal/AnimalModal';
import CartLoader from '../loader/CartLoader';





const Home = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('');
    const [active, setActive] = useState('all');
    const [loading, setLoading] = useState(true);

    // Load all animals
    useEffect(() => {
        const fetchingData = async () => {
            await fetch(`/api/animal/get?category=${category}`)
                .then(res => res.json())
                .then(result => {
                    setData(result);
                    setLoading(false)
                })
        }

        fetchingData();

    }, [category])


    // handle category 
    const handleCategory = (item) => {
        setCategory(item);
        setActive(item)
    }






    return (
        <div className='px-5 lg:px-24 py-[100px]'>
            <div className="flex justify-between items-center flex-wrap gap-5 mb-24">
                <div className="category-item flex gap-5 flex-wrap items-center justify-between">
                    <button onClick={() => setCategory(data)} className={`border-[1px]  rounded-[100px] px-[20px] py-[10px] outline-none ${active === 'all' ? 'bg-blue-500 text-white' : ' border-red-500 text-red-500'}`}>All Products</button>
                    <button onClick={() => handleCategory('animal')} className={`border-[1px]  rounded-[100px] px-[20px] py-[10px] outline-none ${active === 'animal' ? 'bg-blue-500 text-white' : ' border-red-500 text-red-500'}`}>Land Animal</button>
                    <button onClick={() => handleCategory('bird')} className={`border-[1px]  rounded-[100px] px-[20px] py-[10px] outline-none ${active === 'bird' ? 'bg-blue-500 text-white' : ' border-red-500 text-red-500'}`}>Bird</button>
                    <button onClick={() => handleCategory('fish')} className={`border-[1px]  rounded-[100px] px-[20px] py-[10px] outline-none ${active === 'fish' ? 'bg-blue-500 text-white' : ' border-red-500 text-red-500'}`}>Fish</button>
                    <button onClick={() => handleCategory('insect')} className={`border-[1px] rounded-[100px] px-[20px] py-[10px] outline-none ${active === 'insect' ? 'bg-blue-500 text-white' : ' border-red-500 text-red-500'}`}>Insect</button>
                </div>
                <div className="flex items-center justify-between gap-5">
                    <div className="add-cat-btn">
                        <CategoryModal />
                    </div>
                    <div className="add-cat-btn">
                        <AnimalModal />
                    </div>
                </div>
            </div>


            {
                loading ?
                    <div className="loader space-y-5">
                        <CartLoader />
                        <CartLoader />
                    </div>
                    :
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-x-2 gap-y-12">
                        {
                            data?.map((item, index) => {
                                const { title, photo } = item;

                                return (
                                    <div className="border-[1px] border-[#141414] bg-[#050505] rounded-[8px]" key={index}>
                                        <Image src={photo} alt='logo' className='object-cover h-[200px]' height={200} width={200} />
                                        <h3 className='text-white text-center uppercase font-[400] mt-8 text-[18px] leading-[18px] '>{title}</h3>
                                    </div>
                                )
                            })
                        }
                    </div>
            }


        </div>
    );
};

export default Home;
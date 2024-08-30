"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CategoryModal from '../modal/CategoryModal';
import AnimalModal from '../modal/AnimalModal';
import CartLoader from '../loader/CartLoader';
import Search from '../search/Search';






const Home = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('');
    const [active, setActive] = useState('all');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const limit = 4;

    // Load all animals
    useEffect(() => {
        const fetchingData = async () => {
            await fetch(`/api/animal/get?category=${category}&page=${currentPage}&limit=${limit}`)
                .then(res => res.json())
                .then(result => {
                    console.log("result is...", result);
                    setData(result?.product);
                    setTotalPage(result?.totalPage)
                    setLoading(false)
                })
        }

        fetchingData();

    }, [category, currentPage])




    // handle category 
    const handleCategory = (item) => {
        setCategory(item);
        setActive(item)
    }


    // handle change page 
    const handleChange = (item) => {
        setCurrentPage(item + 1)
    }


    // handle previous Page 
    const handlePrevious = () => {
        setCurrentPage(currentPage - 1)
    }

    // handle next page 
    const handleNext = () => {
        setCurrentPage(currentPage + 1)
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



            {/* search components  */}
            <div className="search-bar mb-24">
                <Search />
            </div>




            {/* show product UI  */}
            <div className="show-product">
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

            {/* Pagination  */}

            <div className="flex items-center justify-center gap-2 mt-32">
                {/* previous page  */}
                <button onClick={handlePrevious} className={`text-white p-2 rounded-sm ${currentPage === 1 ? 'bg-slate-300' : 'bg-blue-400'}`} disabled={currentPage === 1}>Previous</button>


                <div className="page">
                    {Array.from({ length: totalPage }, (_, index) => (
                        <button className={`text-white  p-2 px-5 mx-2 rounded-sm ${currentPage === index + 1 ? 'bg-red-600' : 'bg-blue-400'}`} onClick={() => handleChange(index)}>
                            {index + 1}
                        </button>
                    ))}

                </div>

                {/* next page  */}
                <button onClick={handleNext} className={`text-white p-2 rounded-sm ${currentPage === totalPage ? 'bg-slate-300' : 'bg-blue-400'}`} disabled={currentPage === totalPage}>Next</button>
            </div>
        </div>
    );
};

export default Home;
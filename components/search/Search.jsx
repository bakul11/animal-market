"use client"
import React, { useState } from 'react';


const Search = () => {
    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState('');



    // handle search Product 
    const handleSearchProudct = async () => {
        await fetch(`/api/product?search=${search}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            }).catch(err => {
                console.log(err?.message);
            })
    }


    return (
        <div>
            <div className="search relative lg:w-1/3">
                <input type="text" placeholder='Search product' className='outline-none w-full block relative bg-[#F2F2F2] p-3 rounded-md' onChange={(e) => {
                    handleSearchProudct(),
                        setSearch(e.target.value)
                }} />


                {
                    search && <div className="show-pd absolute left-0 top-[65px] z-50 space-y-8 bg-[#F2F2F2] w-full divide-y rounded-b-md overflow-y-auto h-[200px]">
                        {
                            product && product?.map((item, index) => {
                                const { photo, title, category } = item;
                                return (
                                    <div className="pd flex items-center p-2  gap-5" key={index}>
                                        <div className="logo">
                                            <img src={photo} alt="photo" className='object-cover h-8 w-8' />
                                        </div>

                                        <div className="title">
                                            <h3 className='text-slate-800'>{title}</h3>
                                            <p className='text-gray-400 text-sm capitalize'>Category :{category}</p>
                                        </div>


                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>

        </div>
    );
};

export default Search;
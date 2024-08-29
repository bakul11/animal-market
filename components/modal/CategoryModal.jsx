"use client"
import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';

const CategoryModal = () => {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('');
    const [loadding, setLoadding] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);


    // Handle submit data 
    const handleSumit = async (event) => {
        event.preventDefault();

        setLoadding(true);
        await fetch('/api/category', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ category: category })
        })
            .then(res => res.json())
            .then(result => {
          
                if (result?.success) {
                    toast.success(result?.message);
                    setLoadding(false);
                    setCategory('')
                } else {
                    if (result?.error) {
                        toast.error(result?.message);
                        setLoadding(false);
                    }
                }
            })


    }





    return (
        <div>
            <button onClick={onOpenModal} className='border-[1px] border-white text-white rounded-[100px] px-[20px] py-[10px] outline-none'>Add Category</button>

            <Modal
                open={open}
                onClose={onCloseModal}
                classNames={{
                    overlay: 'customOverlay',
                    modal: 'customModal',
                }}
                center>
                <div className="modal-data py-5">
                    <h2 className='text-[18px] font-[400px] pb-5 text-[#000000]'>Add Category</h2>
                    <form onSubmit={handleSumit} className='space-y-4'>
                        <input type="text" placeholder='Name' className='bg-[#F2F2F2] placeholder:text-slate-800 w-full block outline-none border-[1px] px-[20px] py-[12px] border-white rounded-[8px]' value={category} onChange={(e) => setCategory(e.target.value)} required/>

                        {
                            loadding ?
                                <button type="submit" value="save" className='bg-blue-500 w-full p-3 text-center rounded-[8px] text-white ' disabled>
                                    <div className="flex items-center gap-2 justify-center">
                                        <span>Saving please wait</span>
                                        <BeatLoader color="#FFFFFF" size={8} speedMultiplier={2} />
                                    </div>
                                </button>
                                :
                                <input type="submit" value="save" className='bg-[#000000] w-full p-3 text-center rounded-[8px] text-white capitalize cursor-pointer' />
                        }

                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default CategoryModal;
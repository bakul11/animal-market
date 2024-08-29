"use client"
import React, { useRef, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';


const AnimalModal = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [photo, setPhoto] = useState('');
    const [loadding, setLoadding] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const fileInputRef = useRef(null);
    
    // Handle submit data 
    const handleSumit = async (event) => {
        event.preventDefault();

        // image upload api 
        const formData = new FormData();
        formData.append('file', photo);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUD_UPLOAD_PRESETS);
        formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUD_UPLOAD_NAME);


        setLoadding(true);
        await fetch('https://api.cloudinary.com/v1_1/dn30vawdt/image/upload', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                const photoUrl = result?.secure_url;
                const categoryTitle = category.toLowerCase();

                const storeData = {
                    title: title,
                    category: categoryTitle,
                    photo: photoUrl
                }

                setLoadding(true);
                fetch('/api/animal/post', {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(storeData)
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result?.success) {
                            toast.success(result?.message);
                            setLoadding(false);
                            setCategory('')
                            setTitle('');
                            if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                            }
                        } else {
                            if (result?.error) {
                                toast.error(result?.message);
                                setLoadding(false);
                                setCategory('')
                                setTitle('');
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = '';
                                }
                            }
                        }
                    })



            }).catch(err => {
                console.log(err);
            })

    }
















    return (
        <div>
            <button onClick={onOpenModal} className='border-[1px] border-white text-white rounded-[100px] px-[20px] py-[10px] outline-none'>Add Animal</button>

            <Modal
                open={open}
                onClose={onCloseModal}
                classNames={{
                    overlay: 'customOverlay',
                    modal: 'customModal',
                }}
                center>
                <div className="modal-data py-5">
                    <h2 className='text-[18px] font-[400px] pb-5 text-[#000000]'>Add Animal</h2>
                    <form onSubmit={handleSumit} className='space-y-4'>
                        <input type="text" placeholder='Animal Name' className='bg-[#F2F2F2] placeholder:text-slate-800 w-full block outline-none border-[1px] px-[20px] py-[12px] border-white rounded-[8px]' value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <input type="text" placeholder='Category' className='bg-[#F2F2F2] placeholder:text-slate-800 w-full block outline-none border-[1px] px-[20px] py-[12px] border-white rounded-[8px]' value={category} onChange={(e) => setCategory(e.target.value)} required />
                        <input type="file" placeholder='Category' ref={fileInputRef} className='bg-[#F2F2F2] placeholder:text-slate-800 w-full block outline-none border-[1px] px-[20px] py-[12px] border-white rounded-[8px]' onChange={(e) => setPhoto(e.target.files[0])} required />

                        {
                            loadding ?
                                <button type="submit" value="save" className='bg-blue-500 w-full p-3 text-center rounded-[8px] text-white ' disabled>
                                    <div className="flex items-center gap-2 justify-center">
                                        <span>Saving please wait</span>
                                        <BeatLoader color="#FFFFFF" size={8} speedMultiplier={2} />
                                    </div>
                                </button>
                                :
                                <input type="submit" value="Create Animal" className='bg-[#000000] w-full p-3 text-center rounded-[8px] text-white capitalize cursor-pointer' />
                        }

                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default AnimalModal;
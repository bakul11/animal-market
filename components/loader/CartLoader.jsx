import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CartLoader = () => {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-5">
                <div className="item">
                    <Skeleton
                        count={1}
                        borderRadius={10}
                        highlightColor='#978d8d'
                        baseColor='#493434'
                        height={200}
                    />
                </div>
                <div className="item">
                    <Skeleton
                        count={1}
                        borderRadius={10}
                        highlightColor='#978d8d'
                        baseColor='#493434'
                        height={200}
                    />
                </div>
                <div className="item">
                    <Skeleton
                        count={1}
                        borderRadius={10}
                        highlightColor='#978d8d'
                        baseColor='#493434'
                        height={200}
                    />
                </div>
                <div className="item">
                    <Skeleton
                        count={1}
                        borderRadius={10}
                        highlightColor='#978d8d'
                        baseColor='#493434'
                        height={200}
                    />
                </div>
                <div className="item">
                    <Skeleton
                        count={1}
                        borderRadius={10}
                        highlightColor='#978d8d'
                        baseColor='#493434'
                        height={200}
                    />
                </div>
                <div className="item">
                    <Skeleton
                        count={1}
                        borderRadius={10}
                        highlightColor='#978d8d'
                        baseColor='#493434'
                        height={200}
                    />
                </div>
            </div>
        </div>
    );
};

export default CartLoader;
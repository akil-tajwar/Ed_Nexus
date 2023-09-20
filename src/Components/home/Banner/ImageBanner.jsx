import React from 'react';
import Image from 'next/image'
import bannerImage from '../../../asstes/banner.jpg'

const ImageBanner = () => {
    return (
        <div className='w-[500px] pr-14 pt-14'>
            <Image className='rounded-br-[60px] h-auto'
                src={bannerImage}
                alt="Picture of the author"
                fill={true}
            />
        </div>
    )
}

export default ImageBanner
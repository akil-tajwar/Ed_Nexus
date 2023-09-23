"use client"

import Head from 'next/head';
import dynamic from 'next/dynamic'

const VideoCall = dynamic(() => import('./videoServer'), { ssr: false });

const Video = () => {
    return (
        <div>
            <VideoCall></VideoCall>
        </div>
    );
};
export default Video;






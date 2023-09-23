"use client"

import Head from 'next/head';
import dynamic from 'next/dynamic'

const VideoCall = dynamic(() => import('./videoServer'), { ssr: false });

// const Home = () => {
//     return (
//         <div style={{ display: 'flex', flex: 1, height: '100vh' }}>
//             {/* <Head>
//                 <title>Next - Agora UIKit </title>
//                 <meta name="description" content="Agora Web UIKit demo in Next.js" />
//                 <link rel="icon" href="/favicon.ico" />
//             </Head> */}

//             <main style={{ display: 'flex', flex: 1 }}>
//                 <Videocall />
//             </main>
//         </div>
//     );
// };

// export default Home;

const Video = () => {
    return (
        <div>
            <VideoCall></VideoCall>
        </div>
    );
};
export default Video;






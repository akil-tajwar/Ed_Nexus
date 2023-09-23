import React from 'react';
import Achievements from '@/Components/profile/Achievements/Achievements';
import UserInfo from '@/Components/profile/UserInfo/UserInfo';
import PinnedClasses from '@/Components/profile/PinnedClasses/PinnedClasses';

const Profile = () => {

    return (
        <div className='w-3/4 mx-auto pt-32 pb-20 px-[25px]'>
            <div className='grid grid-cols-3 gap-6'>
                <div>
                    <UserInfo />
                    <hr />
                    <Achievements />
                </div>
                <div className='col-span-1'>
                    <PinnedClasses />
                </div>
            </div>
        </div>
    );
};

export default Profile;
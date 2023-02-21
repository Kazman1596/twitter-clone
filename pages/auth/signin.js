import React from 'react';
import {getProviders, signIn} from 'next-auth/react'

export default function signin({providers}) {
    return (
        <div className='flex justify-center mt-20 space-x-4'>
            <img 
                src='https://www.techbooky.com/wp-content/uploads/2021/07/4859E08D-388B-4475-9FCC-C05914CC654A.png' 
                alt='twitter_phone'
                className='hidden object-cover md:inline-flex md:w-44 md:h-80 rotate-6'
            />
            <div className=''>
                {Object.values(providers).map((provider) => (
                    <div key={provider.name} className='flex flex-col items-center'>
                        <img 
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png' 
                            alt='twitter-logo'
                            className='w-36 h-auto object-cover'
                        />
                        <button onClick={() => signIn(provider.id, {callbackUrl: '/'})} className='my-10 bg-red-400 rounded-lg p-3 text-white hover:bg-red-500'>Sign in with {provider.name}</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers,
        }
    }
}

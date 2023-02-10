import { SparklesIcon } from '@heroicons/react/outline';
import Input from './Input';
import Post from './Post';

export default function Feed() {
    const posts = [
        {
            id: '1',
            name: 'Stephen Kaczmarowski',
            username: 'Kazman1596',
            userImg: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F664169149002874880%2Fz1fmxo00_400x400.jpg&w=256&q=75',
            img: 'https://i0.wp.com/theelectrichawk.com/wp-content/uploads/2023/01/Gem-Jam-2023-Lineup.jpg?resize=529%2C662&ssl=1',
            text: 'Great lineup this year!',
            timestamp: '2 hours ago'
        },{
            id: '2',
            name: 'Stephen Kaczmarowski',
            username: 'Kazman1596',
            userImg: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F664169149002874880%2Fz1fmxo00_400x400.jpg&w=256&q=75',
            img: 'https://theelectrichawk.com/wp-content/uploads/2022/01/Gem-and-Jam-2022-EH.jpg',
            text: 'Had a blast!',
            timestamp: '5 months ago'
        }
    ]

    return (
        <div className='xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
            <div className='flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
                <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
                <div className='hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9'>
                    <SparklesIcon className='h-5' />
                </div>
            </div>
            <Input />
            {posts.map((post)=> (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}

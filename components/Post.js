import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartFilled } from '@heroicons/react/solid'
import Moment from "react-moment";
import {setDoc, doc, onSnapshot, collection, deleteDoc} from 'firebase/firestore'
import {useSession, signIn} from 'next-auth/react'
import { db, storage } from '../firebase'
import { useEffect, useState } from "react";
import Image from "next/image";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import { postIdState } from "../atom/postIdAtom";
import { useRouter } from "next/router";

const Post = ({post, id}) => {
    const {data: session} = useSession()
    const [ likes, setLikes ] = useState([])
    const [ comments, setComments ] = useState([])
    const [ hasLiked, setHasLiked ] = useState(false)
    const [open, setOpen] = useRecoilState(modalState)
    const [postId, setPostId] = useRecoilState(postIdState)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'posts', id, 'likes'), (snapshot) => setLikes(snapshot.docs)
        )
    }, [db])
    
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'posts', id, 'comments'), (snapshot) => setComments(snapshot.docs)
        )
    }, [db])

    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1)
    }, [likes])

    async function likePost() {
        if(session) {
            if(hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid))

        }else {
            await setDoc(doc(db, 'posts', id, 'likes', session?.user.uid ), {
                username: session.user.username,
            })
        }} else {
            signIn()
        }
    }
        
    async function deletePost() {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deleteDoc(doc(db, 'posts', id))
            if (post.data().image) {
                deleteObject(ref(storage, `posts/${id}/image`))
            }
            router.push('/')
        }

    }

    return (
        <div className="flex p-3 cursor-pointer border-b border-gray-200">
            {/* user image */}
            <Image className="h-11 w-11 rounded-full mr-4" src={post?.data()?.userImg} width='50' height='50' alt='user_image' />
            {/* right side */}
            <div>
                {/* Header */}

                <div className="flex items-center justify-between">
                    {/* Post User Info */}
                    <div className="flex items-center space-x-1 whitespace-nowrap">
                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post?.data()?.name}</h4>
                        <span className="text-sm sm:text-[15px]">@{post?.data()?.username} - </span>
                        <span className="text-sm sm:text-[15px] hover:underline">
                            <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
                        </span>
                    </div>

                    {/* Dot Icon */}
                    <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
                </div>

                {/* Post text */}
                <p onClick={() => router.push(`/posts/${id}`)} className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{post?.data()?.text}</p>

                {/* Post image */}
                <img onClick={() => router.push(`/posts/${id}`)} className="rounded-2xl mr-2" src={post?.data()?.image}/>

                {/* icons */}
                <div className="flex justify-between text-gray-500 p-2">
                    <div className="flex items-center select-none">
                        <ChatIcon 
                            onClick={() => {
                                if (!session) {
                                    signIn()
                                } else {
                                    setPostId(id)
                                    setOpen(!open)
                                }
                            }} 
                            className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
                        />
                        {comments.length > 0 && (
                            <span className="text-sm">{comments.length}</span>
                        )}
                    </div>
                    {session?.user.uid === post?.data()?.id && (
                        <TrashIcon onClick={deletePost} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
                    )}
                    <div className="flex items-center">
                        {hasLiked ? (<HeartFilled onClick={likePost} className="text-red-600 h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>) : (

                            <HeartIcon onClick={likePost} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
                        )}
                        {
                            likes.length > 0 && (
                                <span className={`${hasLiked && 'text-red-600'} text-sm select-none`}>{likes.length}</span>
                            )
                        }
                    </div>
                    <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
                    <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>

                </div>
            </div>
        </div>
    );
}

export default Post;

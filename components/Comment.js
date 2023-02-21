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

const Comment = ({comment, commentId, originalPostId}) => {
    const {data: session} = useSession()
    const [ likes, setLikes ] = useState([])
    const [ hasLiked, setHasLiked ] = useState(false)
    const [open, setOpen] = useRecoilState(modalState)
    const [postId, setPostId] = useRecoilState(postIdState)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'posts', originalPostId, 'comments', commentId, 'likes'), (snapshot) => setLikes(snapshot.docs)
        )
    }, [db, originalPostId, commentId])
    
    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1)
    }, [likes])

    async function likeComment() {
        if(session) {
            if(hasLiked) {
            await deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', session?.user.uid))

        }else {
            await setDoc(doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', session?.user.uid ), {
                username: session.user.username,
            })
        }} else {
            signIn()
        }
    }
        
    async function deleteComment() {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId))
        }
    }

    return (
        <div className="flex p-3 cursor-pointer border-b border-gray-200 pl-20">
            {/* user image */}
            <Image className="h-11 w-11 rounded-full mr-4" src={comment?.userImg} width='50' height='50' alt='user_image' />
            {/* right side */}
            <div>
                {/* Header */}

                <div className="flex items-center justify-between">
                    {/* Post User Info */}
                    <div className="flex items-center space-x-1 whitespace-nowrap">
                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{comment?.name}</h4>
                        <span className="text-sm sm:text-[15px]">@{comment?.username} - </span>
                        <span className="text-sm sm:text-[15px] hover:underline">
                            <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
                        </span>
                    </div>

                    {/* Dot Icon */}
                    <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
                </div>

                {/* Post text */}
                <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{comment?.comment}</p>

                {/* icons */}
                <div className="flex justify-between text-gray-500 p-2">
                    <div className="flex items-center select-none">
                        <ChatIcon 
                            onClick={() => {
                                if (!session) {
                                    signIn()
                                } else {
                                    setPostId(originalPostId)
                                    setOpen(!open)
                                }
                            }} 
                            className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
                        />
                    </div>
                    {session?.user.uid === comment?.userId && (
                        <TrashIcon onClick={deleteComment} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
                    )}
                    <div className="flex items-center">
                        {hasLiked ? (<HeartFilled onClick={likeComment} className="text-red-600 h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>) : (

                            <HeartIcon onClick={likeComment} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
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

export default Comment;

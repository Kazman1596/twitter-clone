import { EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import {useSession, signOut} from 'next-auth/react'
import { useRef, useState } from "react";
import { db, storage } from '../firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Input = () => {
    const {data: session} = useSession()
    const [input, setInput] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const filePickerRef = useRef(null)

    const sendPost = async () => {

        if (loading) return;
        setLoading(true)

        const docRef = await addDoc(collection(db, 'posts'), {
            id: session.user.uid,
            text: input,
            userImg: session.user.image,
            timestamp: serverTimestamp(),
            name: session.user.name,
            username: session.user.username,
        })

        const imageRef = ref(storage, `posts/${docRef.id}/image`)

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, 'data_url').then(async() =>{
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db, 'posts', docRef.id), {
                    image: downloadURL,
                })
            })
        }

        setInput('')
        setSelectedFile(null)
        setLoading(false)
    }

    const addImageToPost = (e) => {
        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

    return (
        <>
            {session && (
                <div className="flex border-b border-gray-200 p-3 space-x-3">
                <Image 
                    src={session.user.image}
                    onClick={signOut}
                    width='200' 
                    height='200' 
                    alt='user_image'
                    className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
                />
                <div className="w-full divide-y divide-gray-200">
                    <div className="">
                        <textarea 
                            className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700" 
                            rows='2' 
                            placeholder="What's happening?"
                            value={input}
                            onChange={(e)=>setInput(e.target.value)}
                        ></textarea>
                    </div>
                    {selectedFile && (
                        <div>
                            <XIcon onClick={() => setSelectedFile(null)} className="border border-gray-700 shadow-md rounded-full h-7 absolute cursor-pointer text-black" />
                            <Image className={`${loading && 'animate-pulse'} rounded-lg`} src={selectedFile} width='400' height='400' alt='uploadedimg' />
                        </div>
                    )}
                    <div className="flex items-center justify-between pt-2.5">
                        {!loading && (
                            <>
                                <div className="flex">
                                    <div className="" onClick={() => filePickerRef.current.click()}>
                                        <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                        <input type="file" hidden ref={filePickerRef} onChange={addImageToPost}></input>
                                    </div>
                                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                </div>
                                <button 
                                    onClick={sendPost} 
                                    disabled={!input.trim()} 
                                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                                    >Tweet
                                </button>
                            </>    
                        )}
                    </div>
                </div>
            </div>
            )}
        </>
        
    );
}

export default Input;

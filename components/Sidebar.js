import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import {HomeIcon} from "@heroicons/react/solid"
import {BellIcon, BookmarkIcon, ClipboardIcon, DotsCircleHorizontalIcon, DotsHorizontalIcon, HashtagIcon, InboxIcon, UserIcon} from "@heroicons/react/outline"

export default function Sidebar() {
    return (
        <div>
            {/* Twitter Logo */}
            <div>
                <Image width='50' height='50' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png'></Image>
            </div>
            {/* Menu */}
            <div>
                <SidebarMenuItem text='Home' Icon={HomeIcon}/>
                <SidebarMenuItem text='Explore' Icon={HashtagIcon}/>
                <SidebarMenuItem text='Notifications' Icon={BellIcon}/>
                <SidebarMenuItem text='Messages' Icon={InboxIcon}/>
                <SidebarMenuItem text='Bookmark' Icon={BookmarkIcon}/>
                <SidebarMenuItem text='Lists' Icon={ClipboardIcon}/>
                <SidebarMenuItem text='Profile' Icon={UserIcon}/>
                <SidebarMenuItem text='More' Icon={DotsCircleHorizontalIcon}/>
            </div>

            {/* Button */}
            <button>Tweet</button>

            {/* Mini Profile */}
            <div>
                <img src='https://pbs.twimg.com/profile_images/664169149002874880/z1fmxo00_400x400.jpg' alt="user-image" />
                <div>
                    <h4>Stephen Kaczmarowski</h4>
                    <p>@Kazman1596</p>
                    <DotsHorizontalIcon className="h-5" />
                </div>
            </div>
        </div>
    );
}
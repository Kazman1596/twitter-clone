import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className=''>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex min-h-screen min-w-screen mx-auto'>
        {/* SideBar */}

        <Sidebar />

        {/* Feed */}

        <Feed />

        {/* Widgets */}



        {/* Modal */}


 

      </main> 
    </div>
  )
}

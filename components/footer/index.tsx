import React from 'react'
import Image from 'next/image'

const list = [
  {
    title: 'What to watch today?',
    href: '#',
  },
  {
    title: 'Anime terminology',
    href: '#',
  },
  {
    title: 'Group chat',
    href: '#',
  }
]
export default function Footer() {
  return (
    <div className='h-[200px] bg-header/50 flex items-start justify-center flex-col gap-5'>
      <div className='flex items-end gap-5 ml-5'>
        <Image src={'/footer.png'} width={50} height={50} alt='footer' />
        <div>
          <h4>Chill with anime</h4>
          <div className='flex gap-3 mb-3 mt-1 flex-wrap border-r-2 border-primary'>
            {list.map((item, index) => (
              <a key={index} href
                ={item.href} className='hover:underline border-r-2 border-primary pr-3 text-xs'>{item.title}</a>
            ))}
          </div>
        </div>
      </div>
      <p className='font-semibold text-gray-600 self-end mx-3'>© Copyright 2024 next-anime-kncn.vercel.app. All rights reserved.</p>
    </div>
  )
}

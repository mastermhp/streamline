"use client"
import { Bot, CircleUser, Edit3, FileVideo, LayoutTemplate, PanelsTopLeft, ShieldPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function SideNav() {

    const menuOptions =[
        {
            id: 1,
            name: 'Dashboard',
            path: '/dashboard',
            icon: PanelsTopLeft
        },
        {
            id: 2,
            name: 'Create New',
            path: '/dashboard/create-new',
            icon: FileVideo
        },
        {
            id: 3,
            name: 'AI Scripts',
            path: '/dashboard/ai-scripts',
            icon: Bot
        },
        {
            id: 4,
            name: 'Templates',
            path: '/dashboard/pre-made-templates',
            icon: LayoutTemplate
        },
        {
            id: 5,
            name: 'Editing Tools',
            path: '/dashboard/video-editing-tools',
            icon: Edit3
        },
        {
            id: 6,
            name: 'Upgrade',
            path: '/upgrade',
            icon: ShieldPlus
        },
        {
            id: 7,
            name: 'Account',
            path: '/account',
            icon: CircleUser
        },
    ]

    const path = usePathname();
    console.log(path)

  return (
    <div className="w-64 h-screen shadow-md p-5">
      <div className="grid gap-3">
        {menuOptions.map((item,index)=>(
            <Link href={item.path} key={index}>
            <div className={`flex items-center gap-3 p-3 text-fuchsia-950 hover:bg-fuchsia-950 hover:text-white rounded-md cursor-pointer ${path==item.path&&'bg-fuchsia-950 text-white'}`}>
                <item.icon/>
                <h2>{item.name}</h2>
            </div>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default SideNav

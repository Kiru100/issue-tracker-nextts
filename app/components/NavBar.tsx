import Link from 'next/link';
import React from 'react'
import { ImBug } from 'react-icons/im';

const NavBar = () => {

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/issue", label: "Issue" }
  ]

  return (
    <nav className='flex px-6 space-x-6 border-b mb-5 h-14 items-center'>
        <Link href="/"><ImBug /></Link>
        <ul className='space-x-6'>
			{
				links.map(link => 
					<Link 
						href={link.href} 
						className='text-zinc-500 hover:text-zinc-800'
						key={`${link.href}_${link.label}`}
					>
							{link.label}
					</Link>
				)
			}
        </ul>
      
    </nav>
  )
}

export default NavBar;

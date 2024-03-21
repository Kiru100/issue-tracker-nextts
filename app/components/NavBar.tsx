"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { ImBug } from 'react-icons/im';
import classNames from 'classnames';
import { Button } from '@radix-ui/themes';

const NavBar = () => {
	const current_path = usePathname();

	const links = [
		{ href: "/", label: "Dashboard" },
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
							key={`${link.href}_${link.label}`}
							className={classNames({
								"text-zinc-900": current_path === link.href,
								"text-zinc-500": current_path !== link.href,
								"hover:text-zinc-800 transition-colors": true
							})}
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

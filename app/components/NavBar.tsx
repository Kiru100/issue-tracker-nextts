"use client";

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ImBug } from 'react-icons/im';
import { Skeleton } from "@/app/components";
import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {
	return (
		<nav className='border-b mb-5 py-3'>
			<Container>	
				<Flex justify="between">
					<Flex align="center" gap="3">
						<Link href="/"><ImBug /></Link>
						<LinkList/> 
					</Flex>
					<AuthBar/> 
				</Flex>
			</Container>
		</nav>
	)
}

const LinkList = ()=>{
	const current_path = usePathname();
	
	const links = [
		{ href: "/", label: "Dashboard" },
		{ href: "/issue/list", label: "Issue" }
	];

	return (
		<ul className='flex space-x-6'>
			{
				links.map(link => 
					<li key={`${link.href}_${link.label}`}>
						<Link 
							href={link.href} 							
							className={classNames({
								"nav-link": true,
								"!text-zinc-900": current_path === link.href
							})}
						>
							{link.label}
						</Link>
					</li>
				)
			}
		</ul>	
	)
}

const AuthBar = () =>{
	const {status, data: session} = useSession();

	if (status === "loading") return <Skeleton  width="3rem" />;

	if(status === "unauthenticated") return <Link className="nav-link" href="/api/auth/signin">Login</Link>

	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar 
						src={session?.user?.image!} 
						fallback size="2" 
						radius='full' 
						className='cursor-pointer'
						referrerPolicy='no-referrer'
					/>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text>
							{session?.user?.email}
						</Text>
					</DropdownMenu.Label>
					<DropdownMenu.Item>
						{						
							(status === "authenticated") && <Link href={`/api/auth/signout`}>Log Out</Link>
						}
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	)
}


export default NavBar;

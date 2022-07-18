import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/authContext'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { MenuIcon, XIcon, UserIcon } from '@heroicons/react/outline'
import { motion } from 'framer-motion'

const Navbar = ({ children }: { children: React.ReactNode }) => {
	const { user, logOut } = useAuth()
	const router = useRouter()

	const handleLogout = async () => {
		try {
			await logOut()
			router.push('/login')
		} catch (error: any) {
			console.log(error.message)
		}
	}

	const menuItems = [
		{
			id: 1,
			name: 'Home',
			link: '/',
		},
		{
			id: 2,
			name: 'Login',
			link: '/login',
		},
		{
			id: 3,
			name: 'Sign Up',
			link: '/signup',
		},
	]

	const userData = {
		name: 'Tom Cook',
		email: 'tom@example.com',
		imageUrl:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	}
	const products = [
		{ name: 'Plans', href: '#' },
		{ name: 'Business Cards', href: '#' },
		{ name: 'Postcards', href: '#' },
		{ name: 'Posters', href: '#' },
		{ name: 'Flyers', href: '#' },
		{ name: 'Banners', href: '#' },
		{ name: 'Stationery', href: '#' },
		{ name: 'Marketing Materials', href: '#' },
		{ name: 'Signage & Tradeshows', href: '#' },
		{ name: 'Booklets', href: '#' },
	]
	const userNavigation = [
		{ name: 'Your Profile', href: '/dashboard', onClick: () => {} },
		{ name: 'Sign out', href: '/', onClick: handleLogout },
	]

	function classNames(...classes: any) {
		return classes.filter(Boolean).join(' ')
	}

	return (
		<>
			<Disclosure as='header' className='bg-white shadow'>
				{({ open }) => (
					<>
						<div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
							<div className='relative h-24 flex justify-between '>
								<div className='relative z-10 px-2 flex lg:px-0'>
									<div className='flex-shrink-0 flex items-center'>
										<motion.button className='flex flex-row focus:outline-none outline-none z-10'>
											<Link href='/'>
												<picture>
													<source
														srcSet='https://res.cloudinary.com/the-color-mill/image/upload/v1616105305/Color%20Mill%20Design/color-mill-animated-logo_bxjcpm.webp'
														type='image/webp'
													/>
													<source
														srcSet='https://res.cloudinary.com/the-color-mill/image/upload/v1639014317/Color%20Mill%20Design/ColorMillLogoHeader-NoText_nvtcqj.png'
														type='image/png'
													/>
													<img
														className='h-16'
														srcSet='https://res.cloudinary.com/the-color-mill/image/upload/v1639014317/Color%20Mill%20Design/ColorMillLogoHeader-NoText_nvtcqj.png'
														alt='Color Mill logo'
													/>
												</picture>
											</Link>
											<Link href='/'>
												<h1 className='font-semibold ml-4 my-auto text-2xl hidden md:block'>
													COLOR MILL PRINTING
												</h1>
											</Link>
										</motion.button>
									</div>
								</div>
								<div className='relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0'>
									<div className='w-full sm:max-w-xs'>
										<label
											htmlFor='search'
											className='sr-only'>
											Search
										</label>
										<div className='relative'>
											<div className='pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center'>
												<SearchIcon
													className='h-5 w-5 text-gray-400'
													aria-hidden='true'
												/>
											</div>
											<input
												id='search'
												name='search'
												className='block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
												placeholder='Search'
												type='search'
											/>
										</div>
									</div>
								</div>
								<div className='relative z-10 flex items-center lg:hidden'>
									{/* Mobile menu button */}
									<Disclosure.Button className='rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
										<span className='sr-only'>
											Open menu
										</span>
										{open ? (
											<XIcon
												className='block h-6 w-6'
												aria-hidden='true'
											/>
										) : (
											<MenuIcon
												className='block h-6 w-6'
												aria-hidden='true'
											/>
										)}
									</Disclosure.Button>
								</div>
								<div className='hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center'>
									{/* Profile dropdown */}
									{!user.uid ? (
										<Link href='/login'>
											<a
												href=''
												className='text-blue-800 hover:text-blue-900 transition'>
												Sign in
											</a>
										</Link>
									) : (
										<Menu
											as='div'
											className='flex-shrink-0 relative ml-4'>
											<div>
												<Menu.Button className='bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
													<span className='sr-only'>
														Open user menu
													</span>
													<UserIcon className='h-6 text-gray-400' />
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter='transition ease-out duration-100'
												enterFrom='transform opacity-0 scale-95'
												enterTo='transform opacity-100 scale-100'
												leave='transition ease-in duration-75'
												leaveFrom='transform opacity-100 scale-100'
												leaveTo='transform opacity-0 scale-95'>
												{!user.uid ? (
													menuItems.map((item) => (
														<li
															key={item.id}
															className='my-3 md:my-0 items-center mr-4 md:inline-block block '>
															<Link
																href={
																	item?.link
																}>
																<a
																	href=''
																	className='text-blue-800 hover:text-blue-900 transition'>
																	{item?.name}
																</a>
															</Link>
														</li>
													))
												) : (
													<Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none'>
														{userNavigation.map(
															(item) => (
																<Menu.Item
																	key={
																		item.name
																	}>
																	{({
																		active,
																	}) => (
																		<a
																			href={
																				item.href
																			}
																			onClick={
																				item.onClick
																			}
																			className={classNames(
																				active
																					? 'bg-gray-100'
																					: '',
																				'block py-2 px-4 text-sm text-gray-700'
																			)}>
																			{
																				item.name
																			}
																		</a>
																	)}
																</Menu.Item>
															)
														)}
													</Menu.Items>
												)}
											</Transition>
										</Menu>
									)}
								</div>
							</div>
							<nav
								className='hidden lg:py-2 lg:flex lg:space-x-8'
								aria-label='Global'>
								{products.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className='text-gray-900 hover:underline py-2 px-3 inline-flex items-center text-sm font-medium'>
										{item.name}
									</a>
								))}
							</nav>
						</div>

						<Disclosure.Panel
							as='nav'
							className='lg:hidden'
							aria-label='Global'>
							<div className='pt-2 pb-3 px-2 space-y-1'>
								{products.map((item) => (
									<Disclosure.Button
										key={item.name}
										as='a'
										href={item.href}
										className='text-gray-900 hover:bg-gray-50 hover:text-gray-900 block rounded-md py-2 px-3 text-base font-medium'
										
										>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
							{!user.uid ? (
								<Link href='/login'>
									<a
										href=''
										className='text-blue-800 hover:text-blue-900 transition'>
										Sign in
									</a>
								</Link>
							) : (
								<div className='border-t border-gray-200 pt-4 pb-3'>
									<div className='px-4 flex items-center'>
										<UserIcon className='h-12 text-gray-400' />

										<div className='ml-3'>
											<div className='text-base font-medium text-gray-800'>
												{userData.name}
											</div>
											<div className='text-sm font-medium text-gray-500'>
												{user.email}
											</div>
										</div>
									</div>
									<div className='mt-3 px-2 space-y-1'>
										{userNavigation.map((item) => (
											<Disclosure.Button
												key={item.name}
												as='a'
												href={item.href}
												onClick={item.onClick}
												className='block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900'>
												{item.name}
											</Disclosure.Button>
										))}
									</div>
								</div>
							)}
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>

			{children}
		</>
	)
}

export default Navbar

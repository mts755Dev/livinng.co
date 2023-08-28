import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

// function classNames(...classes) {
// 	return classes.filter(Boolean).join(' ')
// }

export function DropdownSearchBar({ children, ...props }) {
	return (
		<Menu
			as='div'
			className='relative flex h-full w-fit items-center transition-all hover:bg-gray-100 sm:w-full'
		>
			{({ open }) => (
				<>
					<Menu.Button className='dropdown h-full w-full'>
						{children[0]}
					</Menu.Button>

					<Transition
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<Menu.Items className='absolute left-1/2 top-0 w-fit origin-bottom -translate-x-1/2 translate-y-49px transform rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
							<div className='w-fit px-25px py-15px'>
								<Menu.Item>
									{({ close }) => (
										<>
											{children[1]}
											{/* <button onClick={close}>cerrar</button> */}
										</>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	)
}

export function DropdownUser({ children, ...props }) {
	return (
		<Menu as='div' className='relative hidden h-full items-center sm:flex'>
			<Menu.Button className='dropdown h-full transition-all'>
				{children[0]}
			</Menu.Button>

			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='absolute left-1/2 top-0 flex w-fit origin-bottom -translate-x-1/2 translate-y-49px transform flex-col items-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
					<svg
						width='24'
						height='12'
						viewBox='0 0 24 12'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='-translate-y-4'
					>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M0.0151367 11.1538H23.9849C23.7957 10.5892 23.4806 10.0588 23.0398 9.60825L14.7975 1.18427C13.2525 -0.394756 10.7476 -0.394758 9.2026 1.18427L0.960258 9.60824C0.519446 10.0588 0.204405 10.5892 0.0151367 11.1538Z'
							fill='#d1d1d1'
						/>
					</svg>

					<div className='w-fit p-25px '>
						<Menu.Item>{children[1]}</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

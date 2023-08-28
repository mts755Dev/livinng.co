import Image from 'next/image'
import Link from 'next/link'
import SearchBar from './SearchBar'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ModalUser } from './Modals'
import Cookies from 'js-cookie'

export default function Navbar({ setaccommodations }) {
	const { route } = useRouter()
	const [modalState, setModalState] = useState(false)
	const token = Cookies.get('__session')

	return (
		<nav
			className={`${
				route === '/alojamiento/[details]' ? 'flex justify-center' : undefined
			} fixed bottom-0 left-0 right-0 z-8  bg-white md:top-0 md:h-[100px] md:px-5%`}
		>
			{/* Resto del código */}
			<div
				className={`${
					route === '/alojamiento/[details]' ? 'max-w-[1024px]' : undefined
				} flex h-full items-center justify-center justify-items-center border-t-2 border-gray-100 py-20px sm:grid md:grid-cols-[3fr_1fr] md:border-b-2 md:border-t-0 md:py-0 lg:grid-cols-[1fr_2fr_1fr]`}
			>
				{/* Logo (visible solo en desktop) */}
				<Link href='/' className='hidden w-full lg:block'>
					<Image
						className='h-[50px] w-auto'
						src='https://res.cloudinary.com/dg8awhbvm/image/upload/v1688585588/Proyecto%20JS%20vanilla/livinng_ico_sgauay.png'
						alt='Your Company'
						width={150}
						height={80}
					/>
				</Link>
				<div className='hidden md:block'>
					<SearchBar setaccommodations={setaccommodations} />
				</div>
				<div className='flex w-full items-center justify-center gap-25px md:gap-0'>
					{/* Iconos para desktop */}
					<button>
						<Image
							className='md:hidden'
							src='https://res.cloudinary.com/dg8awhbvm/image/upload/v1688652141/Proyecto%20JS%20vanilla/Home_vyevu1.svg'
							alt='User-Logo'
							width={24}
							height={24}
						/>
					</button>

					{token ? (
						<>
							<Image
								className='hidden cursor-pointer md:block'
								src='https://res.cloudinary.com/dg8awhbvm/image/upload/v1688590142/Proyecto%20JS%20vanilla/Profile_ktehjr.svg'
								alt='User-Logo'
								width={24}
								height={24}
								onClick={() => setModalState(true)}
							/>
							<Image
								className='md:hidden'
								src='https://res.cloudinary.com/dg8awhbvm/image/upload/v1688590142/Proyecto%20JS%20vanilla/Profile_ktehjr.svg'
								alt='User-Logo'
								width={24}
								height={24}
								onClick={() => setModalState(true)}
							/>
						</>
					) : (
						<Link
							href='/sign-in'
							className='rounded-2xl bg-corporate-yellow px-15px py-10px text-black transition-all hover:bg-corporate-yellow/50'
						>
							Iniciar Sesion
						</Link>
					)}
				</div>
			</div>
			<ModalUser
				status={modalState}
				setStatus={setModalState}
			></ModalUser>
		</nav>
	)
}

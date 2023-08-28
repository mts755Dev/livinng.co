import Head from 'next/head'

import Navbar from './Navbar'
import Footer from './Footer'

import { useRouter } from 'next/router'
import SearchBar from './SearchBar'

export default function Layout({
	children,
	title = 'Livinng ~ Oferta a los alojamientos',
	setaccommodations,
}) {
	const { route } = useRouter()
	return (
		<div
			id='app'
			className={
				route === '/alojamiento/[details]' ? 'max-w-[1024px]' : undefined
			}
		>
			<Head>
				<title>{title}</title>
			</Head>
			<div className='fixed left-0 z-7 w-full border-b bg-white px-5% py-25px md:hidden'>
				<SearchBar setaccommodations={setaccommodations} />
			</div>
			<Navbar setaccommodations={setaccommodations}/>
			<main className='py-[75px] md:py-[100px]'>{children}</main>
			<Footer />
		</div>
	)
}

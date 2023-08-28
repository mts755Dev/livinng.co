import Image from 'next/image'
import Link from 'next/link'
export default function Footer() {
	return (
		<footer className='gap-10px flex w-full flex-col border-t-2 border-gray-100 py-[50px]'>
			<div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
				<div className='text-left '>
					<Link href='/'>
						<Image
							className='mx-auto block h-12 w-auto lg:mx-0'
							src='https://res.cloudinary.com/dg8awhbvm/image/upload/v1688585588/Proyecto%20JS%20vanilla/livinng_ico_sgauay.png'
							alt='Your Company'
							width={150}
							height={80}
						/>
					</Link>
					<ul className='mt-8 flex justify-center gap-6 lg:justify-start'>
						<li>
							<Image
								className='block h-6 w-auto'
								src='https://res.cloudinary.com/dg8awhbvm/image/upload/v1688656494/Proyecto%20JS%20vanilla/icon__circle_facebook__pw5pu1.png'
								alt='Your Company'
								width={60}
								height={60}
							/>
						</li>
						<li>
							<Image
								className='block h-6 w-auto'
								src='https://res.cloudinary.com/dg8awhbvm/image/upload/v1688656494/Proyecto%20JS%20vanilla/icon__rounded_instagram__n00it8.png'
								alt='Your Company'
								width={60}
								height={60}
							/>
						</li>
						<li>
							<Image
								className='block h-6 w-auto'
								src='https://res.cloudinary.com/dg8awhbvm/image/upload/v1688656494/Proyecto%20JS%20vanilla/icon__twitterbird__bfe1ev.png'
								alt='Your Company'
								width={60}
								height={60}
							/>
						</li>
					</ul>
				</div>
				<div className='text-left '>
					<p className='font-medium text-gray-900'>Información</p>
					<ul className='mt-6 space-y-2 text-sm'>
						<li>
							<a href='terminos-y-condiciones' className='text-gray-700 transition hover:opacity-75'>
							Términos y condiciones
							</a>
						</li>
						<li>
							<a href='sobre-nosotros' className='text-gray-700 transition hover:opacity-75'>
							Sobre Nosotros
							</a>
						</li>
						<li>
							<a href='preguntas-frecuentes' className='text-gray-700 transition hover:opacity-75'>
							Preguntas frecuentes
							</a>
						</li>
					</ul>
				</div>
				<div className='text-left '>
					
					<ul className='mt-6 space-y-2 text-sm'>
						<li>
							<a href='about-the-team' className='text-gray-700 transition hover:opacity-75'>
								Equipo de desarrollo
							</a>
						</li>
					</ul>
				</div>
				<div className='text-left '>
					<p className='font-medium text-gray-900'>Contáctanos</p>
					<ul className='mt-6 space-y-2 text-sm'>
						<li>
							<a href='#' className='text-gray-700 transition hover:opacity-75'>
								Colombia <br></br>+57 320 2156005
							</a>
						</li>
						<li>
							<a href='#' className='text-gray-700 transition hover:opacity-75'>
							Info@livinng.co
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
				<div className='text-left '>
					<p className='text-xs text-gray-500'>&copy; 2023 Livinng</p>
				</div>
			</div>
		</footer>
	)
}

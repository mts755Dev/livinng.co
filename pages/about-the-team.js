import React from 'react'
import Layout from 'components/Layout'
import Image from 'next/image'

const TeamMembers = () => {
	const teamMembersData = [
		{
			image:
				'https://res.cloudinary.com/dkndsv9ur/image/upload/v1690847215/Wok%20Team/Dael.png',
			name: 'David Flores',
			position: 'Backend Developer',
			github: 'https://github.com/daelflodo',
			linkedin: 'https://www.linkedin.com/in/davidflodo/',
		},
		{
			image:
				'https://res.cloudinary.com/dkndsv9ur/image/upload/v1690847183/Wok%20Team/LucasSande.png',
			name: 'Lucas Sande',
			position: 'Backend Developer',
			github: 'https://github.com/Lucaselsande',
			linkedin: 'https://www.linkedin.com/in/lucas-sande-5a74b720b/',
		},
		{
			image:
				'https://res.cloudinary.com/dkndsv9ur/image/upload/v1690844262/Wok%20Team/DiegoSa.png',
			name: 'Diego Sapia',
			position: 'Backend Developer',
			github: 'https://github.com/Diegosapia',
			linkedin: 'https://www.linkedin.com/in/diego-sapia-814511228/',
		},
		{
			image:
				'https://res.cloudinary.com/dkndsv9ur/image/upload/v1690847560/Wok%20Team/EmiTan_kmmkax.png',
			name: 'Emiliano Tancredi',
			position: 'Frontend Developer',
			github: 'https://github.com/EmilianoTancredi21',
			linkedin: 'https://www.linkedin.com/in/emiliano-tancredi-b566bb253/',
		},
		{
			image:
				'https://res.cloudinary.com/dkndsv9ur/image/upload/v1690844252/Wok%20Team/LucasChan.png',
			name: 'Lucas Chanquia',
			position: 'Frontend Developer',
			github: 'https://github.com/LucasChanquia',
			linkedin: 'https://www.linkedin.com/in/lucas-chanqu%C3%ADa-889103213/',
		},
		{
			image:
				'https://res.cloudinary.com/dkndsv9ur/image/upload/v1690844266/Wok%20Team/EstivenVal.png',
			name: 'Estiven Valencia',
			position: 'Frontend Developer',
			github: 'https://github.com/devEstivenValencia',
			linkedin: 'https://www.linkedin.com/in/estivenvalencia/',
		},
		{
			image:
				'https://res.cloudinary.com/dkndsv9ur/image/upload/v1690844259/Wok%20Team/LuisCa.png',
			name: 'Luis Carlos Moreno',
			position: 'Frontend Developer',
			github: 'https://github.com/LCMorenoG',
			linkedin: 'https://linkedin.com/in/luis-carlos-moreno-81515326b',
		},
	]

	return (
		<Layout>
			<div className='container mx-auto my-24 md:px-6'>
				<section className='mb-32 text-center lg:text-left'>
					<h2 className='text-3xl mb-12 text-center font-bold'>
						Conoce al equipo de desarrollo
					</h2>

					<div className='grid gap-6 md:grid-cols-3 xl:gap-x-12'>
						{teamMembersData.map((member, index) => (
							<div key={index} className='mb-6 lg:mb-0'>
								<div className='relative block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
									<div className='flex-row items-center lg:flex'>
										<div className='w-full shrink-0 grow-0 basis-auto lg:w-5/12 lg:pr-6'>
											<Image
												src={member.image}
												alt={member.name}
												className='mb-6 w-full rounded-full lg:mb-0'
											/>
										</div>
										<div className='w-full shrink-0 grow-0 basis-auto lg:w-7/12'>
											<h5 className='text-lg mb-2 font-bold'>{member.name}</h5>
											<p className='mb-4 text-neutral-500 dark:text-neutral-300'>
												{member.position}
											</p>
											<ul className='mx-auto flex list-inside justify-center lg:justify-start'>
												<a
													href={member.github}
													target='_blank'
													rel='noopener noreferrer'
													className='px-2 transition-transform hover:scale-110'
												>
													{/* GitHub */}
													<svg
														xmlns='http://www.w3.org/2000/svg'
														viewBox='0 0 24 24'
														className='text-primary dark:text-primary-400 h-6 w-6'
													>
														<path
															fill='currentColor'
															d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
														/>
													</svg>
												</a>
												<a
													href={member.linkedin}
													target='_blank'
													rel='noopener noreferrer'
													className='px-2 transition-transform hover:scale-110'
												>
													{/* Linkedin */}
													<svg
														xmlns='http://www.w3.org/2000/svg'
														viewBox='0 0 24 24'
														className='text-primary dark:text-primary-400 h-6 w-6'
													>
														<path
															fill='currentColor'
															d='M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z'
														/>
													</svg>
												</a>
											</ul>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</Layout>
	)
}

export default TeamMembers

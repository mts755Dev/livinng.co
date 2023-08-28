import { useEffect, useState } from 'react'
import { useReservation } from 'store/Reservation'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import datesUtils from 'utils/datesUtils'

import Layout from 'components/Layout'
import { ModalConfirmReservation, ModalSetReservation } from 'components/Modals'

export default function Detail() {
	const router = useRouter()
	const { details } = router.query
	const [accommodation, setAccommodation] = useState([])
	const { setLocation, dataReservation } = useReservation()
	const [modalState, setModalState] = useState({
		setReservation: false,
		confirmReservation: false,
	})

	const ratingOptions = [1, 2, 3, 4, 5]

	const [allPhotos, setAllPhotos] = useState(false)
	const [mapUrl, setMapUrl] = useState('')

	const tickImageUrl =
		'https://res.cloudinary.com/dg8awhbvm/image/upload/v1688978913/Proyecto%20JS%20vanilla/Tick_Square_iojxxc.png'

	const ubicationIco =
		'https://res.cloudinary.com/dg8awhbvm/image/upload/v1689081640/Proyecto%20JS%20vanilla/Location_cisem2.png'

	const fetchAccommodation = async () => {
		try {
			const { data } = await axios.get(
				`https://www.api.livinng.co/user/acc/${details}`
			)
			setAccommodation(data)
		} catch (error) {
			console.error(error)
		}
	}
	useEffect(() => {
		setLocation(details)
		if (details) fetchAccommodation()
	}, [details])

	const handleReservation = event => {
		if (
			dataReservation.offer.price > 0 &&
			dataReservation.dates.length &&
			dataReservation.people.adults
		) {
			setModalState(state => ({
				...state,
				confirmReservation: true,
			}))
		} else
			setModalState(state => ({
				...state,
				setReservation: true,
			}))
	}

	if (allPhotos) {
		return (
			<div className='absolute inset-0 min-h-screen bg-black text-white'>
				<div className='grid gap-4 bg-black p-8'>
					<div>
						<h2 className='text-3xl mr-48'>Fotos de {accommodation?.name}</h2>
						<button
							onClick={() => setAllPhotos(false)}
							className='fixed right-12 top-8 flex gap-1 rounded-2xl bg-white px-4 py-2 text-black shadow shadow-black'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='currentColor'
								className='h-6 w-6'
							>
								<path
									fillRule='evenodd'
									d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
									clipRule='evenodd'
								/>
							</svg>
							Cerrar fotos
						</button>
					</div>
					{accommodation?.image?.length > 0 &&
						accommodation.image.map((image, index) => (
							<div key={index}>
								<Image src={image} alt='' width={1920} height={1080} />
							</div>
						))}
				</div>
			</div>
		)
	}

	const fetchMapData = async () => {
		try {
			const address = encodeURIComponent(accommodation.address)
			console.log(accommodation.address)
			const mapUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCAMxkzNrj-bSGWBgPb81DOKpvmhZsDUoQ`

			const response = await axios.get(mapUrl)
			const data = response.data

			const location = data.results[0].geometry.location
			const latitude = location.lat
			const longitude = location.lng

			const mapEmbedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&output=embed`

			setMapUrl(mapEmbedUrl)
		} catch (error) {
			console.error('Error al obtener los datos de geolocalización:', error)
		}
	}

	if (accommodation.location) {
		fetchMapData()
	}

	return (
		<Layout>
			<div className='relative max-w-[1024px] py-25px'>
				<div className='fixed bottom-0 left-0 right-0 z-7 mb-[75px] flex sm:mb-10px'>
					<button
						onClick={() => handleReservation()}
						className='mx-auto w-fit rounded-full bg-corporate-yellow px-20px py-15px hover:bg-corporate-yellow/75'
					>
						Quiero hacer una oferta
					</button>
				</div>
				<h1 className='mb-4 text-[32px] font-semibold'>
					{accommodation?.name}
				</h1>
				<div className='mb-2 flex justify-between'>
					<p className='flex flex-wrap items-center'>
						<span className='mr-3 flex items-center'>
							<Image
								src='https://i.ibb.co/rvjkYqQ/Star.png'
								width={18}
								height={18}
								alt=''
							/>
							<span className='ml-1'>
								{accommodation?.rating?.toFixed(2)} ·
							</span>
							<Image
								src={ubicationIco}
								alt='Tick'
								width={18}
								height={18}
								className='inline-block'
								priority={true}
							/>
							<span className='ml-1'>{accommodation.location}</span>
						</span>
					</p>
					<div className='flex items-center gap-5px'></div>
				</div>

				{/* Título del hospedaje */}
				<div className=' flex flex-wrap  items-end justify-end'>
					<div className='w-full pr-2 md:w-1/2'>
						<Image
							src={accommodation.image ? accommodation.image[0] : undefined}
							alt='Imagen Principal'
							layout='responsive'
							width={625}
							height={625}
							className='aspect-square rounded-lg object-cover'
							priority={true}
						/>
					</div>
					<div className='hidden w-full flex-wrap sm:flex md:w-1/2'>
						{accommodation.image
							?.concat(accommodation.image)
							?.slice(1, 5)
							?.map((image, index) => (
								<div key={index} className='w-full pr-2 md:w-1/2'>
									<Image
										src={image}
										alt={`Imagen ${index + 2}`}
										layout='responsive'
										objectFit='cover'
										width={310}
										height={300}
										className='object-cover: aspect-square  rounded-lg'
										priority={true}
									/>
								</div>
							))}
					</div>
					<div className=' absolute m-4 flex gap-2 rounded-lg bg-white px-3 py-3'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='h-8 w-8'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z'
							/>
						</svg>
						<button onClick={() => setAllPhotos(true)}>Ver más fotos</button>
					</div>
				</div>

				{/* Sección dividida de descripción y detalles de solicitud */}
				<div className='mb-12 mt-16 grid grid-cols-1 gap-25px sm:grid-cols-2'>
					<div className='w-full align-middle'>
						{/* Descripción */}
						<h2 className='mb-2 text-[32px]'>Descripción</h2>
						<p>{accommodation.description}</p>
					</div>
					<div className='flex w-full flex-col'>
						<h2 className='border-b pb-5px text-[32px]'>Distribucion</h2>
						<p>{accommodation.distribution}</p>
					</div>
				</div>

				{/* Características y mapa- */}
				<div className='mb-6 flex flex-wrap pb-6'>
					<div className='w-full pr-4 md:w-1/2'>
						<hr className='mb-6 mt-0 border-gray-300' />
						{/* Características */}
						<h2 className='mb-4 text-[32px]'>Otras Características</h2>
						<ul>
							{[
								{ label: 'Capacidad', value: accommodation.guests },
								{ label: 'Baños', value: accommodation.bathroom },
								{ label: 'Habitaciones', value: accommodation.rooms },
								{ label: 'Camas', value: accommodation.beds },
								{ label: 'Tipo', value: accommodation.type },
								{
									label: 'Servicios',
									value: accommodation.services?.join(', '),
								},
							].map((item, index) => (
								<ul key={index} className='mb-2'>
									<Image
										src={tickImageUrl}
										alt='Tick'
										width={16}
										height={16}
										className='inline-block'
									/>
									&nbsp;{item.label}: {item.value}
								</ul>
							))}
						</ul>
					</div>
					<div className='w-full  md:w-1/2'>
						{/* Mapa */}
						<iframe
							src={mapUrl}
							width='100%'
							height='350'
							style={{ border: '1px solid #ccc' }}
							allowFullScreen=''
							loading='lazy'
							className='rounded-2xl'
						></iframe>
					</div>
				</div>
			</div>
			<h2 className='p-6 text-center'>últimas reseñas del alojamiento</h2>

			<section className='grid grid-cols-1 gap-4 bg-white sm:grid-cols-2 md:grid-cols-3'>
				{accommodation?.review?.slice(0, 3).map((review, index) => (
					<div key={index} className='flex items-center p-4'>
						<Image
							className='mr-4 rounded-full'
							src='https://res.cloudinary.com/dg8awhbvm/image/upload/v1689083757/Proyecto%20JS%20vanilla/Ellipse_2_rnjdhm.png'
							alt='User 1'
							width={55}
							height={55}
						/>
						<div>
							<p className='text-black'>
								Fecha: {datesUtils.abrevDate(review.dateTime)}
								<div className='flex justify-start'>
									{ratingOptions?.map((value, index) => (
										<button
											key={index}
											name='rating'
											className='mt-4'
											value={value}
											type='button'
											disabled={true}
										>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill={review.Rating >= value ? '#ffde59' : 'none'}
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='#17387e'
												className='h-6 w-6'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
												/>
											</svg>
										</button>
									))}
								</div>
							</p>
							<p className='text-black'>Comentario: {review.comment}</p>
						</div>
					</div>
				))}
			</section>

			<ModalConfirmReservation
				status={modalState.confirmReservation}
				setStatus={setModalState}
			/>
			<ModalSetReservation
				status={modalState.setReservation}
				setStatus={setModalState}
				info={accommodation}
			/>
		</Layout>
	)
}

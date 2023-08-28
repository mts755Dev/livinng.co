import { Dialog } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useReservation } from 'store/Reservation'
import { monthUtils } from 'utils/monthUtils'
import { buttonUtils } from 'utils/buttonUtils'
import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

import Calendar from './Calendar'
import { useUser } from 'store/User'

import { useClerk } from '@clerk/clerk-react'
import datesUtils from 'utils/datesUtils'
import moneyUtils from 'utils/moneyUtils'
import Image from 'next/image'
import Link from 'next/link'
const URL = 'https://www.api.livinng.co'

export function ModalConfirmReservation({ status, setStatus }) {
	const { dataReservation, setContact, setOffer, selectDates } =
		useReservation()
	const [edit, setEdit] = useState({
		contact: false,
		reservation: false,
	})
	const [check, setCheck] = useState(false)

	const handleReservation = async event => {
		const token = Cookies.get('__session')
		if (
			check &&
			dataReservation.contact.phone &&
			dataReservation.contact.name &&
			dataReservation.contact.email
		) {
			try {
				const headers = {
					Authorization: `Bearer ${token}`,
				}
				const { data } = await axios.post(
					'https://www.api.livinng.co/client/reservations/',
					dataReservation,
					{ headers }
				)
				Swal.fire({
					title: 'OK!',
					text: data,
					icon: 'success',
					confirmButtonColor: '#17387e',
					confirmButtonText: 'Aceptar',
					width: 400,
				})
				setOffer('price', null)
				setOffer('total', 0)
				closeModal()
			} catch (error) {
				Swal.fire({
					title: 'Algo salió mal',
					text: error.response.data,
					icon: 'error',
					confirmButtonColor: '#17387e',
					confirmButtonText: 'Aceptar',
					width: 400,
				})
			}
		}
	}
	const closeModal = () => {
		setStatus(state => ({
			...state,
			confirmReservation: false,
		}))
	}

	return (
		<Dialog open={status} onClose={() => closeModal()} className='relative z-8'>
			{/* The backdrop, rendered as a fixed sibling to the panel container */}
			<div
				className='fixed inset-0 bg-corporate-blue/25 backdrop-blur-sm'
				aria-hidden='true'
			/>

			{/* Full-screen container to center the panel */}
			<div className='fixed inset-0 flex items-center justify-center'>
				{/* The actual dialog panel */}
				<Dialog.Panel className='overflow- mx-auto flex h-fit w-full max-w-[800px]  flex-col gap-10px rounded-[20px] bg-white p-25px'>
					<Dialog.Title className='text-center'>
						<h2 className='border-b pb-5px'>Detalles de la solicitud</h2>
					</Dialog.Title>
					<Dialog.Description className='gri-cols-1 grid justify-center gap-25px sm:grid-cols-2'>
						<section className='grid grid-rows-2 gap-25px'>
							<article className='flex flex-col gap-10px'>
								<div className='flex items-center justify-between gap-25px border-b pb-1 transition-all'>
									<h4>Datos de quien reserva</h4>
									{!edit.contact ? (
										<button
											className='flex h-fit gap-5px text-[14px] leading-none text-gray-500 transition-all hover:text-gray-700'
											onClick={() =>
												setEdit(state => ({ ...state, contact: true }))
											}
										>
											<i className='fi fi-rs-pencil text-[12px]'></i>
											editar
										</button>
									) : (
										<button
											className='flex h-fit gap-5px text-[14px] leading-none text-gray-500 transition-all hover:text-gray-700'
											onClick={() =>
												setEdit(state => ({ ...state, contact: false }))
											}
										>
											Guardar
										</button>
									)}
								</div>

								<div className='leading-normal'>
									Nombre Completo:{' '}
									{!edit.contact ? (
										dataReservation.contact.name
									) : (
										<input
											value={dataReservation.contact.name}
											type='text'
											onChange={e => setContact('name', e.target.value)}
											className='cursor-text border-b border-black bg-corporate-yellow/25 transition-all focus:border-corporate-blue'
										/>
									)}
									<br />
									Email:{' '}
									{!edit.contact ? (
										dataReservation.contact.email
									) : (
										<input
											value={dataReservation.contact.email}
											type='text'
											onChange={e => setContact('email', e.target.value)}
											className='cursor-text border-b border-black bg-corporate-yellow/25 transition-all focus:border-corporate-blue'
										/>
									)}{' '}
									<br />
									Celular:{' '}
									{!edit.contact ? (
										dataReservation.contact.phone
									) : (
										<input
											value={dataReservation.contact.phone}
											type='text'
											onChange={e =>
												setContact('phone', Number(e.target.value))
											}
											className='cursor-text border-b border-black bg-corporate-yellow/25 transition-all focus:border-corporate-blue'
										/>
									)}
								</div>
							</article>
							<article className='flex flex-col gap-10px'>
								<div className='flex items-center justify-between gap-25px border-b pb-1'>
									<h4>Informacion de la reserva</h4>

									{!edit.reservation ? (
										<button
											className='flex h-fit gap-5px text-[14px] leading-none text-gray-500 transition-all hover:text-gray-700'
											onClick={() =>
												setStatus(state => ({
													...state,
													setReservation: true,
												}))
											}
										>
											<i className='fi fi-rs-pencil text-[12px]'></i>
											editar
										</button>
									) : (
										<button
											className='flex h-fit gap-5px text-[14px] leading-none text-gray-500 transition-all hover:text-gray-700'
											onClick={() =>
												setEdit(state => ({ ...state, reservation: false }))
											}
										>
											Guardar
										</button>
									)}
								</div>
								<div className='leading-normal'>
									{selectDates.arrival.day &&
										`Viajaras del ${selectDates.arrival.day
										} de ${monthUtils.getMonthName(
											selectDates.arrival.month - 1
										)} `}
									{selectDates.departure.day &&
										`al ${selectDates.departure.day
										} de ${monthUtils.getMonthName(
											selectDates.departure.month - 1
										)}`}
									<br />
									<span className='inline-flex'>
										{dataReservation.people.adults > 0 &&
											` ${dataReservation.people.adults} Adultos`}
										{dataReservation.people.childs > 0 && (
											<i className='fi fi-sr-bullet px-2 text-[10px]'></i>
										)}
										{dataReservation.people.childs > 0 &&
											`${dataReservation.people.childs} Niños`}
									</span>
									<br />
									Pagaras: {moneyUtils.formatCOP(
										dataReservation.offer.price
									)} x {dataReservation.offer.nights} Noches
									<br />
									Total: {moneyUtils.formatCOP(dataReservation.offer.total)}
								</div>
							</article>
						</section>
						<section className='relative w-full border-l'>
							<h4 className='mx-auto w-fit border-b px-5px pb-1'>
								Terminos y condiciones
							</h4>
							<ol className='flex h-[150px] list-decimal flex-col gap-10px overflow-y-scroll px-25px py-10px sm:h-[200px]'>
								<li>
									El anfitrion podra aceptar, contraofertar o rechazar tu
									solicitud.
								</li>
								<li>
									Tendras 24 hrs para pagar el 50% de la reserva, una vez se
									acepte tu pago tu oferta estara confirmada y pagaras el resto
									en el hospedaje el dia del Check In.
								</li>
								<li>
									<b>Politicas de cancelacion</b>
									<br />
									Recibirás un reembolso del 95% del valor pagado cancelando al
									menos 10 días antes de la fecha de check-in o si la
									cancelación se realiza dentro de las 24 horas posteriores a la
									reserva.
								</li>
								<Link
									href='/terminos-y-condiciones'
									className='text-center text-gray-500 underline hover:font-medium hover:text-gray-700'
								>
									Lea todos los terminos y condiciones
								</Link>
							</ol>
							<div className='absolute bottom-0 flex w-full items-center justify-center gap-2 bg-white pt-2'>
								<input
									type='checkbox'
									value='checkbox'
									onChange={e => setCheck(state => !state)}
								/>
								<label>Acepto terminos y condiciones</label>
							</div>
						</section>
					</Dialog.Description>
					<div className='mt-25px flex w-full items-center justify-center gap-25px'>
						<button
							className='h-fit border-b text-gray-500 hover:text-red'
							onClick={() => closeModal()}
						>
							Cancelar
						</button>
						<button
							className='h-fit w-fit rounded-2xl bg-corporate-blue px-20px py-10px text-white hover:bg-corporate-blue/75'
							onClick={() => handleReservation()}
							type='submit'
						>
							Ofrecer {moneyUtils.formatCOP(dataReservation.offer.total)}
						</button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export function ModalSetReservation({ status, setStatus, info }) {
	const { setOffer, increment, decrement, dataReservation } = useReservation()

	const handleChange = event => {
		setOffer('price', event.target.value)
	}

	useEffect(() => {
		return () => {
			setOffer('price', null)
			setOffer('total', 0)
		}
	}, [])

	return (
		<Dialog
			open={status}
			onClose={() => setStatus(state => ({ ...state, setReservation: false }))}
			className='relative z-9'
		>
			{/* The backdrop, rendered as a fixed sibling to the panel container */}
			<div
				className='fixed inset-0 bg-corporate-blue/25 backdrop-blur-sm'
				aria-hidden='true'
			/>

			{/* Full-screen container to center the panel */}
			<div className='fixed inset-0 flex items-center justify-center'>
				{/* The actual dialog panel */}
				<Dialog.Panel
					className='relative mx-auto flex w-max flex-col gap-10px rounded-[20px] bg-white p-25px'
					as='section'
				>
					<Dialog.Title className='border-b py-2 text-center' as='h3'>
						Editar reserva
					</Dialog.Title>
					<Dialog.Description
						className='grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 sm:gap-20'
						as='article'
					>
						<div className='flex h-full flex-col justify-between gap-5px'>
							<h4 className='text-center'>Seleccione las fechas</h4>
							<div className='rounded-lg border p-5px'>
								<Calendar />
							</div>
						</div>

						<div className='flex flex-col gap-15px'>
							<section>
								<h4 className='pb-2'>Cuantas personas viajarian?</h4>
								<article className='flex justify-around'>
									{[
										{ name: 'Adultos', id: 'adults' },
										{ name: 'Niños', id: 'childs' },
									].map(({ name, id }, index) => (
										<div
											key={index}
											className='flex w-[90px] items-center justify-between gap-5px'
										>
											{name}
											<div className='grid grid-cols-3 items-center justify-center'>
												<button onClick={() => decrement(id)}>
													<i className='fi fi-rs-angle-left text-[12px]'></i>
												</button>

												<span className='text-center leading-none'>
													{dataReservation.people[id]}
												</span>
												<button
													onClick={() => increment(id)}
													className='h-full w-full'
												>
													<i className='fi fi-rs-angle-right text-[12px]'></i>
												</button>
											</div>
										</div>
									))}
								</article>
							</section>
							<div className='flex flex-col'>
								<label>Cuanto quieres ofertar?</label>
								<input
									type='text'
									className=' rounded-lg border border-gray-300 px-6 py-3'
									placeholder={
										dataReservation.dates.length === 0
											? 'Seleccione una fecha primero'
											: `Oferta ${dataReservation.offer.nights} Noches`
									}
									onChange={handleChange}
									value={dataReservation.price}
								/>
								<span className='mt-1 text-center text-[12px] text-gray-500'>
									Precio sugerido x noche: {moneyUtils.formatCOP(info.price)}
								</span>
							</div>
							{dataReservation.offer.total > 0 && (
								<span className='grid place-items-center'>
									{`Pagaras ${moneyUtils.formatCOP(
										dataReservation.offer.total
									)} por
									${dataReservation.offer.nights} Noches`}
								</span>
							)}
						</div>
					</Dialog.Description>
					<div className='flex items-center justify-center gap-25px'>
						<button
							className='h-fit border-b text-gray-500 hover:text-red'
							onClick={() =>
								setStatus(state => ({
									...state,
									setReservation: false,
								}))
							}
						>
							Cancelar
						</button>
						<button
							onClick={() => {
								dataReservation.dates.length &&
									dataReservation.people.adults > 0 &&
									dataReservation.offer.price > 0 &&
									setStatus(state => ({
										...state,
										confirmReservation: true,
										setReservation: false,
									}))
							}}
							className='w-fit rounded-2xl bg-corporate-yellow/75 px-15px py-10px'
						>
							Continuar
						</button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export function ModalUser({ status, setStatus, setStatusUser }) {
	const ratingOptions = [1, 2, 3, 4, 5]
	const { User } = useUser()
	const { signOut } = useClerk()
	const [sendReviews, setSendReviews] = useState({
		hospedaje: '',
		comentario: '',
		rating: null,
	})
	const [reviewsOn, setReviewsOn] = useState(false)
	const [currentReviews, setCurrentReviews] = useState({})
	const [offers, setOffers] = useState([])
	const token = Cookies.get('__session')
	const headers = {
		Authorization: `Bearer ${token}`,
	}

	const getOffers = async event => {
		const { data } = await axios(
			'https://www.api.livinng.co/client/reservations',
			{
				headers,
			}
		)
		setOffers(data)
	}

	const ableReview = async () => {
		try {
			const { data } = await axios(`${URL}/client/reviews`, { headers })
			setCurrentReviews(data)
		} catch (error) { }
	}

	useEffect(() => {
		if (token) getOffers()
		if (token) ableReview()
	}, [status, setOffers, User.userId])

	const handleSignOut = () => {
		signOut()
		console.log('Cookie "__session" eliminada')
		setStatus(false)
	}

	const acceptOffer = id => {
		try {
			const { data } = axios.put(
				'https://www.api.livinng.co/client/reservations/modify',
				{
					reservationId: id,
					stateId: 'Aceptado',
				},
				{
					headers,
				}
			)
			Swal.fire({
				title: 'OK!',
				text: data,
				icon: 'success',
				confirmButtonColor: '#17387e',
				confirmButtonText: 'Aceptar',
				width: 400,
			})
			getOffers()
		} catch (error) {
			console.log(error)
		}
	}
	const rejectOffer = id => {
		try {
			const { data } = axios.put(
				'https://www.api.livinng.co/client/reservations/modify',
				{
					reservationId: id,
					stateId: 'Rechazado',
				},
				{
					headers,
				}
			)
			Swal.fire({
				title: 'OK!',
				text: data,
				icon: 'success',
				confirmButtonColor: '#17387e',
				confirmButtonText: 'Aceptar',
				width: 400,
			})
			getOffers()
		} catch (error) {
			console.log(error)
		}
	}

	const isReviewButtonEnabled = (accommodationId, offerEndDate) => {
		const reviewsForAccommodation = currentReviews.filter(
			review => review.hospedaje === accommodationId
		)
		// Calcular 3 semanas desde la review mas reciente
		const threeWeeksAgo = new Date()
		threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21)

		// Calcular 2 semanas desde la fecha final de la oferta
		const twoWeeksAgoFromOffer = new Date(offerEndDate)
		twoWeeksAgoFromOffer.setDate(twoWeeksAgoFromOffer.getDate() - 14)

		if (
			reviewsForAccommodation.length === 0 &&
			new Date(offerEndDate) > new Date() &&
			new Date() < twoWeeksAgoFromOffer
		) {
			// Verificar que no hayan reviews realizadas
			return true
		} else {
			// En caso de que haya, encontrar la review mas reciente
			const mostRecentReview = new Date(
				Math.max(
					...reviewsForAccommodation.map(review => new Date(review.dateTime))
				)
			)
			// Habilita el boton si la review mas reciente se hizo hace mas de 3 semanas,
			// Si han pasado menos de 2 semanas desde la fecha de llegada de la offer,
			// y ademas que ya haya  pasado la fecha final de la offer
			return (
				mostRecentReview < threeWeeksAgo &&
				new Date() < twoWeeksAgoFromOffer &&
				new Date(offerEndDate) > new Date()
			)
		}
	}

	const handleReviewSubmit = async event => {
		event.preventDefault()
		setReviewsOn(false)

		try {
			axios.post(
				'https://www.api.livinng.co/client/reviews/create',
				{
					hospedaje: sendReviews.hospedaje,
					comentario: sendReviews.comentario,
					rating: sendReviews.rating,
				},
				{ headers }
			)
		} catch (error) { }

		console.log('Formulario enviado:', sendReviews)
	}
	return (
		<Dialog
			open={status}
			onClose={() => setStatus(false)}
			className='relative z-9'
		>
			<div
				className='fixed inset-0 bg-corporate-blue/25 backdrop-blur-sm'
				aria-hidden='true'
			/>

			<div className='fixed inset-0 flex items-center justify-center'>
				<Dialog.Panel className='mx-auto flex flex-col gap-10px rounded-[20px] bg-white p-25px'>
					<Dialog.Title
						className='mx-auto text-center'
						as='img'
						src='https://res.cloudinary.com/dg8awhbvm/image/upload/v1688585588/Proyecto%20JS%20vanilla/livinng_ico_sgauay.png'
						width={150}
						height={80}
					/>
					<Dialog.Description
						className='flex h-[350px] flex-col justify-center gap-10px'
						as='div'
					>
						<h3>Mis ofertas</h3>
						<section className='flex flex-col gap-25px overflow-y-scroll'>
							{offers?.map(
								({
									id,
									accommodation,
									image,
									total,
									nights,
									dates,
									stateId,
									dateTime,
									location,
									accommodationId,
								}) => (
									<article key={id}>
										<article className='flex w-full flex-row items-center gap-10px'>
											<Image
												src={image}
												width={100}
												height={100}
												alt={accommodation}
												className='aspect-square h-[100px] w-[100px] rounded-[15px] bg-gray-300'
											/>
											<div className='flex w-full flex-col justify-between gap-5px border-l px-10px'>
												<p className='flex flex-col items-center md:flex-row'>
													<span className='text-18px'>{accommodation}</span>
													<i className='fi fi-sr-bullet !hidden px-2 text-[10px] sm:!block'></i>
													{`${datesUtils.abrevDate(
														dates[0]
													)} a ${datesUtils.abrevDate(dates[1])}`}
												</p>
												<div className='flex flex-col'>
													<span className='text-18px'>Mi oferta:</span>
													<p className='flex items-center'>
														<span className='flex flex-col items-center md:flex-row'>
															{`${moneyUtils.formatCOP(
																total
															)} ${nights} Noches`}
															<i className='fi fi-sr-bullet !hidden px-2 text-[10px] sm:!block'></i>
															<span
																className={`rounded-full px-4 py-2 text-12px font-medium leading-none text-white opacity-75 ${stateId === 'Aceptado' ||
																	stateId === 'Confirmado'
																	? 'bg-green-500'
																	: stateId === 'Pendiente'
																		? 'bg-yellow-500'
																		: stateId === 'Rechazado'
																			? 'bg-red/75'
																			: stateId === 'Contraofertado'
																				? 'bg-orange-500'
																				: 'bg-blue-300'
																	}`}
															>
																{stateId}
															</span>
														</span>
														<span className='ml-10px flex flex-row gap-5px text-12px'>
															{stateId === 'Contraofertado' ? (
																<>
																	<button
																		className='rounded-full bg-green-200 px-4 py-2 hover:bg-green-300'
																		onClick={() => acceptOffer(id)}
																	>
																		Aceptar
																	</button>
																	<button
																		className='rounded-full bg-red/25 px-4 py-2 hover:bg-red/50'
																		onClick={() => rejectOffer(id)}
																	>
																		Rechazar
																	</button>
																</>
															) : stateId === 'Confirmado' &&
																isReviewButtonEnabled(
																	accommodationId,
																	dates[1]
																) ? (
																<button
																	className='rounded-full bg-yellow-500/25 px-4 py-2 hover:bg-yellow-500/50 disabled:bg-gray-400'
																	disabled={new Date(dates[1]) > new Date()}
																	onClick={() => {
																		setReviewsOn(!reviewsOn)
																		setSendReviews({
																			...sendReviews,
																			hospedaje: accommodationId,
																		})
																	}}
																>
																	Puntuar
																</button>
															) : undefined}
														</span>
													</p>
												</div>
												<div className='flex w-full justify-between'>
													{stateId === 'Confirmado' ||
														stateId === 'Rechazado' ? undefined : (
														<monthUtils.Countdown
															endDate={dateTime}
															hours={24}
														/>
													)}
													<div className='hidden items-center gap-1 md:flex'>
														<Image
															src='/Location.svg'
															width={15}
															height={15}
															alt='Location icon'
														/>
														{location}
													</div>
												</div>
											</div>
										</article>
										{reviewsOn && accommodationId === sendReviews.hospedaje && (
											<article className='mt-4 flex w-full flex-row items-center gap-10px'>
												<form
													onSubmit={handleReviewSubmit}
													className='flex w-full flex-row items-center gap-10px'
												>
													<div>
														<div className='flex w-full flex-row place-content-center items-center gap-10px'>
															<div>
																<span className='text-18px'>
																	Puntua tu estadia
																</span>
																{ratingOptions?.map((value, index) => (
																	<button
																		key={index}
																		name='rating'
																		classNameName='mt-4'
																		value={value}
																		type='button'
																		onClick={() =>
																			buttonUtils.handleRatingChange(
																				value,
																				sendReviews,
																				setSendReviews
																			)
																		}
																	>
																		<svg
																			xmlns='http://www.w3.org/2000/svg'
																			fill={
																				sendReviews.rating >= value
																					? '#ffde59'
																					: 'none'
																			}
																			viewBox='0 0 24 24'
																			strokeWidth='1.5'
																			stroke='#17387e'
																			className='h-8 w-8'
																		>
																			<path
																				stroke-linecap='round'
																				stroke-linejoin='round'
																				d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
																			/>
																		</svg>
																	</button>
																))}
															</div>

															<div className='flex w-full flex-col justify-between gap-5px border-l px-10px'>
																<span className='text-18px'>
																	Opina sobre tu estadia:
																</span>
																<textarea
																	rows='4'
																	cols='25'
																	value={sendReviews.comentario}
																	onChange={event =>
																		setSendReviews({
																			...sendReviews,
																			comentario: event.target.value,
																		})
																	}
																	placeholder='Escribe tu reseña...'
																/>
															</div>
														</div>
														<div className='mt-5 flex w-full justify-center'>
															<button
																disabled={
																	!sendReviews.rating || !sendReviews.comentario
																}
																className='flex rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400'
																type='submit'
															>
																Enviar Reseña
															</button>
														</div>
													</div>
												</form>
											</article>
										)}
									</article>
								)
							)}
						</section>
					</Dialog.Description>
					<Dialog.Description
						className='flex flex-col justify-center gap-15px'
						as='section'
					></Dialog.Description>
					<button onClick={() => handleSignOut()}>Cerrar Sesion</button>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

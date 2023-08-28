import axios from 'axios'
import { useState, useEffect } from 'react'
import { buttonUtils } from 'utils/buttonUtils'
import { mathUtils } from 'utils/mathUtils'

const Filter = ({ status, setStatus, setaccommodations }) => {
	const [selectedFilters, setSelectedFilters] = useState({
		price: { min: '', max: '' },
		beds: '',
		rooms: '',
		bathrooms: '',
		type: '',
		size: '',
		services: [],
		rating: '',
	})

	// const [errors, setErrors] = useState({
	// 	minPrice: '',
	// 	maxPrice: '',
	// 	type: '',
	// 	size: '',
	// 	rooms: '',
	// 	beds: '',
	// 	bathrooms: '',
	// 	services: '',
	// 	rating: '',
	// })

	const [arrayTypes, setArrayTypes] = useState([])
	const [arraySizes, setArraySizes] = useState([])
	const [arrayServices, setArrayServices] = useState([])
	const ratingOptions = [1, 2, 3, 4, 5]

	// Funciones que hacen el Fetch de las opciones de los filtros

	const fetchData = async () => {
		try {
			const responseTypes = await fetch('https://www.api.livinng.co/user/utils/acctype')
			const dataTypes = await responseTypes.json()
			setArrayTypes(dataTypes)

			const responseSizes = await fetch('https://www.api.livinng.co/user/utils/size')
			const dataSizes = await responseSizes.json()
			setArraySizes(dataSizes)

			const responseServices = await fetch(
				'https://www.api.livinng.co/user/utils/services'
			)
			const dataServices = await responseServices.json()
			setArrayServices(dataServices)
		} catch (error) {
			console.log('Error al obtener los datos:', error)
		}
	}

	useEffect(() => {
		if (status) fetchData()
	}, [status])

	// Funcion que maneja los cambios en el form
	const handleChange = event => {
		let { name, value } = event.target
		// los valores se parsean a entero antes de enviar
		if (value === undefined) {
			value = ''
		}
		if (name === 'price') {
			value = parseInt(value)
		}

		if (name === 'services') {
			// El caso de services, al ser un array, debe retirar las opciones con el filter cuando se hace un-check
			if (selectedFilters[name].includes(value)) {
				const arrayServices = selectedFilters[name].filter(
					service => service !== value
				)
				return setSelectedFilters({
					...selectedFilters,
					services: arrayServices,
				})
			} else {
				return setSelectedFilters({
					...selectedFilters,
					services: [...selectedFilters.services, value],
				})
			}
		}
		// Para los precios, se separa el name para construir el objeto price{min: number, max: number}
		if (name === 'price.min' || name === 'price.max') {
			if (isNaN(value) || value === undefined || value === '') {
				value = ''
			} else {
				value = parseInt(value)
				// Si de alguna manera introducen un valor negativo, lo convierte en 0
				if (value < 0) {
					value = 0
				}
			}

			const [fieldName, fieldProp] = name.split('.')
			setSelectedFilters({
				...selectedFilters,
				[fieldName]: {
					...selectedFilters[fieldName],
					[fieldProp]: value,
				},
			})
			// Cuando el checkbox es un-checked debe resetear el valor a ''
		} else {
			if (value === selectedFilters[name]) {
				setSelectedFilters({
					...selectedFilters,
					[name]: '',
				})
			} else {
				setSelectedFilters({
					...selectedFilters,
					[name]: value,
				})
			}
		}
	}

	// Funcion validadora, maneja los errores
	const handleErrors = () => {
		let correct = true
		const error = {}

		if (
			Number.isNaN(selectedFilters.price.min) ||
			selectedFilters.price.min < 0 ||
			selectedFilters.price.min > selectedFilters.price.max
		) {
			error.minPrice = 'El precio minimo debe ser un número mayor que cero'
			correct = false
		}
		if (
			Number.isNaN(selectedFilters.price.max) ||
			selectedFilters.price.max < 0 ||
			selectedFilters.price.max < selectedFilters.price.min
		) {
			error.maxPrice =
				'El precio maximo debe ser un número mayor que cero y mayor que el precio minimo'
			correct = false
		}
		if (
			selectedFilters.type !== '' &&
			!arrayTypes.includes(selectedFilters.type)
		) {
			error.type = 'Debe seleccionar entre las opciones sugeridas'
			correct = false
		}
		if (
			selectedFilters.size !== '' &&
			!arraySizes.includes(selectedFilters.size)
		) {
			error.size = 'Debe seleccionar entre las opciones sugeridas'
			correct = false
		}
		if (
			selectedFilters.services.length > 0 &&
			!selectedFilters.services.every(service =>
				arrayServices.includes(service)
			)
		) {
			error.services = 'Debe seleccionar entre las opciones sugeridas'
			correct = false
		}
		if (Number.isNaN(selectedFilters.rooms) || selectedFilters.rooms < 0) {
			error.rooms = 'Debe seleccionar un numero mayor a cero'
			correct = false
		}
		if (Number.isNaN(selectedFilters.beds) || selectedFilters.beds < 0) {
			error.beds = 'Debe seleccionar un numero mayor a cero'
			correct = false
		}
		if (
			Number.isNaN(selectedFilters.bathrooms) ||
			selectedFilters.bathrooms < 0
		) {
			error.bathrooms = 'Debe seleccionar un numero mayor a cero'
			correct = false
		}
		if (
			selectedFilters.rating > 0 &&
			!ratingOptions.includes(selectedFilters.rating)
		) {
			error.rating = 'Debe seleccionar entre las opciones sugeridas'
			correct = false
		}
		// setErrors(error)
		return correct
	}
	// Permite que se actualicen los errores cada que haya cambio en los input
	useEffect(() => {
		handleErrors()
	}, [selectedFilters])

	// Filtrar las propiedades con valores vacios o no validos
	const filteredFilters = mathUtils.filterEmptyProperties(selectedFilters)

	// Manejador del envio del form
	const handleSubmit = async event => {
		event.preventDefault()
		// Previene envio de informacion erronea
		if (handleErrors()) {
			const updateaccommodations = async () => {
				try {
					const { data } = await axios.post(
						'https://www.api.livinng.co/user/acc/filter',
						filteredFilters
						)
					setaccommodations(data)
				} catch (error) {
					console.log(error)
				}
			}
			updateaccommodations()
			setStatus(false)
		}
	}

	return (
		<div>
			{status && (
				<>
					<div className='fixed inset-0 z-9 bg-gray-700 bg-opacity-50 transition-opacity'></div>
					<div className='fixed inset-0 z-9 flex justify-center'>
						<div className='relative my-25px flex h-fit w-full max-w-[800px] items-end justify-center rounded-[15px] bg-white p-50px pt-25px text-center sm:items-center'>
							<button
								onClick={() => setStatus(false)}
								className='-full absolute left-0 top-0 p-20px hover:text-red'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='h-6 w-6'
								>
									<path
										stroke-linecap='round'
										stroke-linejoin='round'
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
							<div className='flex h-full w-full flex-col gap-20px  '>
								<h3
									className='border-gray border-b pb-15px font-semibold'
									id='modal-title'
								>
									Filtra por
								</h3>

								<form
									onSubmit={handleSubmit}
									className='grid grid-cols-1 gap-15px sm:grid-cols-2 sm:gap-25px'
								>
									<fieldset className='grid grid-cols-2 gap-10px'>
										<div className='flex flex-col gap-10px'>
											<legend className=' 10 font-bold '>
												Rango de precios
											</legend>
											<div className='flex items-center justify-center gap-10px'>
												<input
													type='number'
													min={0}
													placeholder='Min'
													value={selectedFilters.price.min}
													onChange={handleChange}
													name='price.min'
													className='w-full max-w-[75px] border-b-2 px-10px'
												/>
												<div className='flex h-0.5 w-4 items-center border-t-2 border-sky-950'></div>
												<input
													min={parseInt(selectedFilters.price.min) + 1}
													type='number'
													placeholder='Max'
													value={selectedFilters.price.max}
													onChange={handleChange}
													name='price.max'
													className='w-full max-w-[75px] border-b-2 px-10px'
												/>
											</div>
										</div>
										<div className='flex flex-col gap-10px'>
											<legend className=' 10 text-center font-bold '>
												Rating
											</legend>
											<div className='flex justify-center'>
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
																selectedFilters,
																setSelectedFilters
															)
														}
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															fill={
																selectedFilters.rating >= value
																	? '#ffde59'
																	: 'none'
															}
															viewBox='0 0 24 24'
															strokeWidth='1.5'
															stroke='#17387e'
															className='h-6 w-6'
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
										</div>
									</fieldset>

									<fieldset className='flex gap-5px'>
										<legend className=' 10 text-center font-bold '>
											Cantidad de:
										</legend>

										<div className='flex w-full flex-col gap-2 text-[14px]'>
											{[
												{ name: 'Habitaciones', id: 'rooms' },
												{ name: 'Camas', id: 'beds' },
												{ name: 'Baños', id: 'bathrooms' },
											].map(({ name, id }, index) => (
												<div className='flex justify-between' key={index}>
													<label className='font-medium '>{name}</label>
													<div className='flex items-center justify-center'>
														<svg
															onClick={() =>
																buttonUtils.handleDecrement(
																	id,
																	setSelectedFilters
																)
															}
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															strokeWidth='1.5'
															stroke='currentColor'
															className='h-full w-auto cursor-pointer'
															height='16'
															width='16'
														>
															<path
																stroke-linecap='round'
																stroke-linejoin='round'
																d='M15.75 19.5L8.25 12l7.5-7.5'
															/>
														</svg>

														<input
															value={selectedFilters[id]}
															placeholder='Numero de habitaciones'
															name='rooms'
															className='w-10px'
														/>
														<svg
															onClick={() =>
																buttonUtils.handleIncrement(
																	id,
																	setSelectedFilters
																)
															}
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															strokeWidth='1.5'
															stroke='currentColor'
															className='h-6 w-6 cursor-pointer'
														>
															<path
																stroke-linecap='round'
																stroke-linejoin='round'
																d='M8.25 4.5l7.5 7.5-7.5 7.5'
															/>
														</svg>
													</div>
												</div>
											))}
										</div>
									</fieldset>

									<fieldset>
										<legend className=' text-center font-bold '>
											Tipo de alojamiento
										</legend>
										<div className='mt-2 flex flex-col gap-5px'>
											{arrayTypes?.map((type, index) => (
												<div className='flex justify-between' key={index}>
													<label htmlFor={type} className='font-medium '>
														{type}
													</label>
													<div className='flex h-6 items-center'>
														<input
															min={0}
															value={type}
															onChange={handleChange}
															id={type}
															name='type'
															type='checkbox'
															className='h-12px w-40px  border-gray-300'
															checked={selectedFilters.type === type}
														/>
													</div>
												</div>
											))}
										</div>
									</fieldset>

									<div>
										<legend className=' 10 text-center font-bold '>
											Tamaño
										</legend>
										<div className='mt-5px flex flex-col gap-5px text-left'>
											{arraySizes?.map((size, index) => (
												<div className='flex justify-between' key={index}>
													<label htmlFor={size} className='font-medium '>
														{size}
													</label>
													<div className='flex h-6 items-center'>
														<input
															value={size}
															onChange={handleChange}
															id={size}
															name='size'
															type='checkbox'
															checked={selectedFilters.size === size}
															className='h-12px w-40px  border-gray-300'
														/>
													</div>
												</div>
											))}
										</div>
									</div>

									<fieldset>
										<legend className=' text-center font-bold '>
											Servicios
										</legend>
										<div className='flex flex-col gap-5px'>
											{arrayServices?.map((service, index) => (
												<div
													className='relative flex justify-between'
													key={index}
												>
													<label htmlFor={service} className='font-medium '>
														{service}
													</label>
													<input
														value={service}
														onChange={handleChange}
														id={service}
														name='services'
														type='checkbox'
														className='h-12px w-40px  border-gray-300'
													/>
												</div>
											))}
										</div>
									</fieldset>

									<button
										type='submit'
										className='m-auto h-fit w-fit rounded-md bg-corporate-yellow p-3 px-20px font-semibold text-corporate-blue shadow-sm hover:bg-corporate-yellow/80'
									>
										Filtrar
									</button>
								</form>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Filter

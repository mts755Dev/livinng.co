import { useState } from 'react'
import { useReservation } from 'store/Reservation'
import axios from 'axios'
import { DropdownSearchBar } from './Dropdowns'
import Calendar from './Calendar'

export default function SearchBar({ setaccommodations }) {
	const [search, setSearch] = useState({
		guests: {
			adults: 0,
			childs: 0,
		},
		name: '',
	})
	const { dataReservation, increment, decrement } = useReservation()

	const fetchData = async () => {
		try {
			const { data } = await axios(
				`https://www.api.livinng.co/user/acc/?name=${search.name}`
			)
			setaccommodations(data)
		} catch (error) {
			console.log(error)
		}
	}

	const handleChange = event => {
		const { name, value } = event.target
		setSearch({
			...search,
			[name]: value,
		})
		fetchData()
	}

	const handleSearch = event => {
		fetchData()
	}

	return (
		<div className='border-gray flex h-50px w-full items-center justify-items-center rounded-full border text-[14px] sm:grid sm:grid-cols-[2fr_1fr_1fr_60px]'>
			<div className='flex h-full w-full items-center rounded-l-full pl-15px transition-all hover:bg-gray-100'>
				<input
					className='h-full w-full px-10px transition-all'
					placeholder='¿A dónde deseas ir? ✈️'
					onChange={handleChange}
					value={search.name}
					name='name'
				/>
			</div>

			<DropdownSearchBar>
				<div className='border-gray hidden md:flex w-full flex-row items-center justify-between gap-10px border-l px-10px'>
					<input
						className='hidden w-full sm:block'
						value='¿Que fechas?'
						type='button'
					/>

					<svg
						width='18'
						height='18'
						viewBox='0 0 20 21'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='block'
					>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M17.2221 8.75366H2.36874C2.02374 8.75366 1.74374 8.47366 1.74374 8.12866C1.74374 7.78366 2.02374 7.50366 2.36874 7.50366H17.2221C17.5671 7.50366 17.8471 7.78366 17.8471 8.12866C17.8471 8.47366 17.5671 8.75366 17.2221 8.75366'
							fill='black'
						/>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M13.501 12.0081C13.156 12.0081 12.8727 11.7281 12.8727 11.3831C12.8727 11.0381 13.1485 10.7581 13.4935 10.7581H13.501C13.846 10.7581 14.126 11.0381 14.126 11.3831C14.126 11.7281 13.846 12.0081 13.501 12.0081'
							fill='black'
						/>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M9.80308 12.0081C9.45808 12.0081 9.17474 11.7281 9.17474 11.3831C9.17474 11.0381 9.45058 10.7581 9.79558 10.7581H9.80308C10.1481 10.7581 10.4281 11.0381 10.4281 11.3831C10.4281 11.7281 10.1481 12.0081 9.80308 12.0081'
							fill='black'
						/>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M6.0974 12.0081C5.7524 12.0081 5.46823 11.7281 5.46823 11.3831C5.46823 11.0381 5.7449 10.7581 6.0899 10.7581H6.0974C6.4424 10.7581 6.7224 11.0381 6.7224 11.3831C6.7224 11.7281 6.4424 12.0081 6.0974 12.0081'
							fill='black'
						/>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M13.501 15.2469C13.156 15.2469 12.8727 14.9669 12.8727 14.6219C12.8727 14.2769 13.1485 13.9969 13.4935 13.9969H13.501C13.846 13.9969 14.126 14.2769 14.126 14.6219C14.126 14.9669 13.846 15.2469 13.501 15.2469'
							fill='black'
						/>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M9.80308 15.2469C9.45808 15.2469 9.17474 14.9669 9.17474 14.6219C9.17474 14.2769 9.45058 13.9969 9.79558 13.9969H9.80308C10.1481 13.9969 10.4281 14.2769 10.4281 14.6219C10.4281 14.9669 10.1481 15.2469 9.80308 15.2469'
							fill='black'
						/>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M6.0974 15.2469C5.7524 15.2469 5.46823 14.9669 5.46823 14.6219C5.46823 14.2769 5.7449 13.9969 6.0899 13.9969H6.0974C6.4424 13.9969 6.7224 14.2769 6.7224 14.6219C6.7224 14.9669 6.4424 15.2469 6.0974 15.2469'
							fill='black'
						/>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M13.1613 5.32587C12.8163 5.32587 12.5363 5.04587 12.5363 4.70087V1.95837C12.5363 1.61337 12.8163 1.33337 13.1613 1.33337C13.5063 1.33337 13.7863 1.61337 13.7863 1.95837V4.70087C13.7863 5.04587 13.5063 5.32587 13.1613 5.32587'
							fill='black'
						/>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M6.42941 5.32587C6.08441 5.32587 5.80441 5.04587 5.80441 4.70087V1.95837C5.80441 1.61337 6.08441 1.33337 6.42941 1.33337C6.77441 1.33337 7.05441 1.61337 7.05441 1.95837V4.70087C7.05441 5.04587 6.77441 5.32587 6.42941 5.32587'
							fill='black'
						/>
						<mask x='1' y='2' width='17' height='18'>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M1.66666 2.64929H17.9167V19.25H1.66666V2.64929Z'
								fill='white'
							/>
						</mask>
						<g>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M6.26749 3.89929C4.10666 3.89929 2.91666 5.05179 2.91666 7.14429V14.6851C2.91666 16.8235 4.10666 18.0001 6.26749 18.0001H13.3158C15.4767 18.0001 16.6667 16.8451 16.6667 14.7485V7.14429C16.67 6.11513 16.3933 5.31513 15.8442 4.76513C15.2792 4.19846 14.4083 3.89929 13.3233 3.89929H6.26749ZM13.3158 19.2501H6.26749C3.42999 19.2501 1.66666 17.501 1.66666 14.6851V7.14429C1.66666 4.37096 3.42999 2.64929 6.26749 2.64929H13.3233C14.7475 2.64929 15.925 3.07596 16.7292 3.88179C17.51 4.66596 17.9208 5.79346 17.9167 7.14596V14.7485C17.9167 17.5251 16.1533 19.2501 13.3158 19.2501V19.2501Z'
								fill='black'
							/>
						</g>
					</svg>
				</div>
				<Calendar state={true} />
			</DropdownSearchBar>

			<DropdownSearchBar>
				<div className='border-gray hidden md:flex w-full flex-row items-center justify-between gap-10px border-l px-10px'>
					<input
						className='hidden w-full sm:block'
						value='¿Cuantos?'
						type='button'
					/>
					<svg
						width='20'
						height='20'
						viewBox='0 0 24 25'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='down-arrow hidden sm:block'
					>
						<path d='M18 9.5L12 15.5L6 9.5' stroke='#33363F' strokeWidth='2' />
					</svg>
				</div>
				<div className='flex w-[100px] flex-col gap-5px'>
					{[
						{ name: 'Adultos', id: 'adults' },
						{ name: 'Niños', id: 'childs' },
					].map(({ name, id }, index) => (
						<div className='flex flex-row justify-between gap-15px' key={index}>
							{name}
							<div className='grid grid-cols-3 items-center justify-center'>
								<button onClick={() => decrement(id)}>
									<i className='fi fi-rs-angle-left text-[12px]'></i>
								</button>
								<span className='text-center leading-none'>
									{dataReservation.people[id]}
								</span>
								<button onClick={() => increment(id)} className='h-full w-full'>
									<i className='fi fi-rs-angle-right text-[12px]'></i>
								</button>
							</div>
						</div>
					))}
				</div>
			</DropdownSearchBar>

			<button className='w-fit rounded-full bg-corporate-blue/25 p-3 transition-all hover:border hover:bg-corporate-yellow/25 mr-5px' onClick={()=> handleSearch()}>
				<svg
					width='18'
					height='18'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<mask x='2' y='2' width='20' height='20'>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M2 2H21.4768V21.477H2V2Z'
							fill='white'
						/>
					</mask>
					<g>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M11.7388 3.5C7.19576 3.5 3.49976 7.195 3.49976 11.738C3.49976 16.281 7.19576 19.977 11.7388 19.977C16.2808 19.977 19.9768 16.281 19.9768 11.738C19.9768 7.195 16.2808 3.5 11.7388 3.5ZM11.7388 21.477C6.36876 21.477 1.99976 17.108 1.99976 11.738C1.99976 6.368 6.36876 2 11.7388 2C17.1088 2 21.4768 6.368 21.4768 11.738C21.4768 17.108 17.1088 21.477 11.7388 21.477Z'
							fill='black'
						/>
					</g>
					<mask x='17' y='17' width='6' height='6'>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M17.24 17.7069H22.264V22.7217H17.24V17.7069Z'
							fill='white'
						/>
					</mask>
					<g>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M21.5142 22.7217C21.3232 22.7217 21.1312 22.6487 20.9842 22.5027L17.4602 18.9887C17.1672 18.6957 17.1662 18.2207 17.4592 17.9277C17.7512 17.6327 18.2262 17.6347 18.5202 17.9257L22.0442 21.4407C22.3372 21.7337 22.3382 22.2077 22.0452 22.5007C21.8992 22.6487 21.7062 22.7217 21.5142 22.7217Z'
							fill='black'
						/>
					</g>
				</svg>
			</button>
		</div>
	)
}

import Card from 'components/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from 'components/Filter'
import Layout from 'components/Layout'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function Home() {
	const [accommodations, setaccommodations] = useState([])
	const [startIndex, setStartIndex] = useState(0)
	const [filterState, setFilterState] = useState(false)

	const URL = 'https://www.api.livinng.co'

	const itemsPerPage = 10

	const loadMore = () => {
		setStartIndex(prevStartIndex => prevStartIndex + itemsPerPage)
	}

	useEffect(() => {
		try {
			const getAllaccommodations = async () => {
				const { data } = await axios(`${URL}/user/acc`)
				setaccommodations(data)
			}
			getAllaccommodations()
		} catch (error) {
			console.error('Error while fetching accs:', error)
		}
	}, [])

	const endIndex = startIndex + itemsPerPage
	const slicedAccommodations = accommodations.slice(0, endIndex)

	return (
		<Layout setaccommodations={setaccommodations}>
			<Filter
				status={filterState}
				setStatus={setFilterState}
				setaccommodations={setaccommodations}
			/>

			<div className='flex w-full flex-row justify-between pt-[25px]'>
				{/* <select>
					<option>Ordenar por</option>
					<option>Reviews</option>
					<option>Precio sugerido</option>
					<option>Rating</option>
				</select> */}
				<button
					onClick={() => setFilterState(true)}
					className='flex gap-5px p-2 px-10px font-semibold'
				>
					Filtros
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
								d='M2.00037 2H21.5V21.5007H2.00037V2Z'
								fill='white'
							/>
						</mask>
						<g>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M8.77337 11.5987C8.79137 11.6147 8.80837 11.6297 8.82537 11.6477C9.90437 12.7537 10.4994 14.2187 10.4994 15.7737V19.7577L12.7354 18.5397C12.9114 18.4437 13.0204 18.2557 13.0204 18.0487V15.7617C13.0204 14.2127 13.6094 12.7527 14.6784 11.6527L19.5154 6.50769C19.8284 6.17469 20.0004 5.73769 20.0004 5.27669V4.34069C20.0004 3.87669 19.6344 3.49969 19.1864 3.49969H4.31537C3.86637 3.49969 3.50037 3.87669 3.50037 4.34069V5.27669C3.50037 5.73769 3.67237 6.1747 3.98537 6.50669L8.77337 11.5987ZM10.1464 21.5007C9.94437 21.5007 9.74437 21.4467 9.56237 21.3387C9.21037 21.1287 8.99937 20.7577 8.99937 20.3457V15.7737C8.99937 14.6387 8.57637 13.5697 7.80537 12.7507C7.78237 12.7317 7.75937 12.7107 7.73937 12.6887L2.89337 7.53569C2.31737 6.92369 2.00037 6.12069 2.00037 5.27669V4.34069C2.00037 3.04969 3.03937 1.99969 4.31537 1.99969H19.1864C20.4614 1.99969 21.5004 3.04969 21.5004 4.34069V5.27669C21.5004 6.11969 21.1834 6.92169 20.6094 7.53469L15.7624 12.6887C14.9594 13.5167 14.5204 14.6057 14.5204 15.7617V18.0487C14.5204 18.8047 14.1114 19.4967 13.4534 19.8567L10.6924 21.3607C10.5204 21.4537 10.3334 21.5007 10.1464 21.5007Z'
								fill='black'
							/>
						</g>
					</svg>
				</button>
			</div>
			<div>
				<InfiniteScroll
					className='grid w-full grid-cols-1 gap-[25px] !overflow-hidden py-25px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
					dataLength={slicedAccommodations.length}
					next={loadMore}
					hasMore={endIndex < accommodations.length}
					loader={<h4>Cargando...</h4>}
				>
					{slicedAccommodations && slicedAccommodations.map(({ id, name, location, image, rating }) => (
						<Card
							key={id}
							id={id}
							name={name}
							location={location}
							images={image}
							rating={rating}
						/>
					))}
				</InfiniteScroll>
			</div>
		</Layout>
	)
}

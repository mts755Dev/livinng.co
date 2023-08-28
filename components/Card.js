import Link from 'next/link'
import Image from 'next/image'
// ---- LibrerÃ­a  "react-slick" -------
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

export default function Card({ name, images, location, id, rating }) {
	// se extraen las props de la Api

	// Funciones para el paginado de la card
	const CustomPrevArrow = props => {
		const { onClick, currentSlide } = props

		return (
			<>
				{currentSlide !== 0 && (
					<button className='invisible left-7 sm:visible' onClick={onClick}>
						<i className='fi fi-sr-angle-small-left flex rounded-full bg-white/90 p-1'></i>
					</button>
				)}
			</>
		)
	}
	const CustomNextArrow = props => {
		const { onClick } = props
		return (
			<button className='invisible right-7 sm:visible' onClick={onClick}>
				<i className='fi fi-sr-angle-small-right flex rounded-full bg-white/90 p-1'></i>
			</button>
		)
	}
	// * Props del Slider
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 0,
		Lazyload: true,
		fade: true,
		prevArrow: <CustomPrevArrow />,
		nextArrow: <CustomNextArrow />,
		dotsClass: 'dots',
		customPaging: () => <i className='fi fi-sr-bullet'></i>,
	}
	return (
		<div className='relative h-fit'>
			
			<Link
				href={`alojamiento/${id}`}
				className='flex max-w-[320px] flex-col gap-1'
			>
				<Slider {...settings}>
					{images?.map((image, index) => (
						<Image
							key={index}
							src={image}
							alt={name}
							className='aspect-square rounded-[20px] bg-gray-100'
							width={320}
							height={320}
						/>
					))}
				</Slider>
				<div className='flex items-center justify-between pt-3'>
					<h1 className='font-montserrat text-[18px] font-semibold'>{name}</h1>
					<div className='flex items-center gap-2'>
						<Image src='/Star.svg' width={18} height={18} alt={name} />
						<p>{rating.toFixed(2)}</p>
					</div>
				</div>
				<div className='flex items-center gap-1'>
					<Image src='/Location.svg' width={18} height={18} alt='Icon Location' />
					<p>{location}</p>
				</div>
			</Link>
		</div>
	)
}

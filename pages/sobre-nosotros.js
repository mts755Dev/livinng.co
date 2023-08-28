// import { useState } from 'react'
import Layout from 'components/Layout'

export default function AboutUs() {
	// const [activeAccordion, setActiveAccordion] = useState(null)

	// const accordionData = [
	// 	{
	// 		title: '1. Responsabilidad del usuario',
	// 		content:
	// 			'Livinng proporciona una plataforma de reservas de alojamientos, y los usuarios deben utilizarla de acuerdo con las leyes y regulaciones aplicables. Los usuarios son responsables de la información que proporcionan y garantizan que es precisa y completa. Cualquier uso indebido de la plataforma o violación de estos términos puede dar lugar a la suspensión o terminación de la cuenta del usuario.',
	// 	},
	// 	{
	// 		title: '2. Proceso de reserva',
	// 		content:
	// 			'Los usuarios tendrán 24 horas para pagar el 50% de la reserva una vez que se acepte su pago. Una vez confirmada la oferta, el usuario deberá pagar el resto del monto al momento del check-in en el alojamiento.',
	// 	},
	// 	{
	// 		title: '3. Cancelaciones y reembolsos',
	// 		content:
	// 			'El Huésped recibirá un reembolso del 95% del valor pagado si cancela al menos 10 días antes de la fecha de check-in o si la cancelación se realiza dentro de las 24 horas posteriores a la reserva. Para solicitar un reembolso, el usuario debe comunicarse con nuestro equipo de soporte y proporcionar la información necesaria.',
	// 	},
	// 	{
	// 		title: '4. Comisiones y tarifas',
	// 		content:
	// 			'Actualmente, Livinng cobra una comisión del 13% a los alojamientos asociados por cada reserva realizada a través de nuestra plataforma. ',
	// 	},
	// 	{
	// 		title: '5. Estructura legal',
	// 		content:
	// 			'Livinng es una sociedad de régimen simplificado en Colombia. Todos los usuarios deben cumplir con las leyes y regulaciones locales al utilizar nuestra plataforma.',
	// 	},
	// 	{
	// 		title: '6. . Privacidad y protección de datos',
	// 		content:
	// 			'Livinng se compromete a proteger la privacidad y los datos personales de los usuarios de acuerdo con nuestra política de privacidad. Los usuarios aceptan que su información se procese y utilice de acuerdo con esta política.',
	// 	},
	// 	{
	// 		title: '7. Cambios en los términos y condiciones',
	// 		content:
	// 			'Livinng se reserva el derecho de modificar o actualizar estos términos y condiciones en cualquier momento. Los usuarios serán notificados de los cambios y se les proporcionará la versión actualizada de los términos y condiciones. El uso continuo de la plataforma después de los cambios constituirá la aceptación de los nuevos términos y condiciones.',
	// 	},
	// ]

	return (
		<Layout>
			<div className='container mx-auto my-24 md:px-6 xl:px-24'>				
					<h2 className='text-3xl mb-6 pl-6 font-bold'>Sobre Nosotros</h2>

					<div id='accordionFlushExample'>
						{/* {accordionData.map((item, index) => (
							<div
								key={index}
								className={`rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 ${
									activeAccordion === index ? 'border-b-0' : ''
								}`}
							></div>
						))} */}
						<div className='px-5 py-4 text-neutral-500 dark:text-neutral-300'>
							En Livinng, nos apasiona brindar a nuestros usuarios una
							plataforma confiable y eficiente para reservas de alojamientos.
							Nos enorgullece conectar a huéspedes y anfitriones, proporcionando
							una experiencia única y satisfactoria para ambas partes.
						</div>
						<div className='px-5 py-4 text-neutral-500 dark:text-neutral-300'>
							Nuestra inspiración surge de la creciente tendencia de las
							personas a buscar negociaciones directas para sus reservas,
							buscando un trato más personalizado y beneficios adicionales.
							Reconocemos que los medios tradicionales de comunicación, como
							WhatsApp o llamadas telefónicas, no están diseñados
							específicamente para llevar a cabo estas transacciones de manera
							eficiente. Por eso, hemos creado Livinng.
						</div>
						<div className='px-5 py-4 text-neutral-500 dark:text-neutral-300'>
							Con más de 10 años de experiencia en el sector de alojamientos y
							reservas turísticas, hemos adquirido un profundo conocimiento
							sobre el mercado y las necesidades de los usuarios. Basándonos en
							ese conocimiento, hemos creado una plataforma que mejora el
							proceso de reservas bajo el modelo de negociación, ofreciendo a
							los usuarios una forma más adecuada y eficaz de realizar
							transacciones.
						</div>
						<div className='px-5 py-4 text-neutral-500 dark:text-neutral-300'>
							En Livinng, nos esforzamos por brindar una experiencia fluida y
							segura para nuestros usuarios. Valoramos la transparencia, la
							confianza y la satisfacción de nuestros clientes. Nos esforzamos
							por mantener altos estándares de calidad en nuestros servicios y
							nos preocupamos por cada detalle para asegurarnos de que su
							experiencia sea excepcional.
						</div>
						<div className='px-5 py-4 text-neutral-500 dark:text-neutral-300'>
							Además de nuestro enfoque en la excelencia del servicio, también
							valoramos las colaboraciones estratégicas y las alianzas con otras
							empresas del sector. Reconocemos a nuestros competidores y
							buscamos aprender de las mejores prácticas establecidas en la
							industria.
						</div>
						<div className='px-5 py-4 text-neutral-500 dark:text-neutral-300'>
							En Livinng, estamos comprometidos con la privacidad y protección
							de datos de nuestros usuarios. Tomamos medidas exhaustivas para
							garantizar la confidencialidad y seguridad de la información
							proporcionada en nuestra plataforma.
						</div>
						<div className='px-5 py-4 text-neutral-500 dark:text-neutral-300'>
							Estamos entusiasmados por el crecimiento y el futuro de Livinng.
							Nuestro objetivo es convertirnos en líderes en el mercado de la
							industria turística, brindando una plataforma confiable y
							eficiente que satisfaga las necesidades de nuestros usuarios en
							cada paso del proceso de reserva.
						</div>
						<div className='px-5 py-4 text-neutral-500 dark:text-neutral-300'>
							¡Gracias por elegir Livinng! Estamos aquí para hacer de tu
							experiencia de reserva un viaje placentero y exitoso.
						</div>
					</div>				
			</div>
		</Layout>
	)
}

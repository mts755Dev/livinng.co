import { useState } from 'react'
import Layout from 'components/Layout'

export default function Faqs() {
	const [activeAccordion, setActiveAccordion] = useState(null)

	const accordionData = [
		{
			title: '1. ¿Qué es Livinng?',
			content:
				'Livinng es una plataforma en línea que facilita las reservas de alojamientos al conectar a huéspedes y anfitriones. Nuestro objetivo es brindar a los usuarios una forma eficiente y confiable de realizar negociaciones directas y obtener beneficios adicionales en sus reservas.',
		},
		{
			title: '2. ¿Qué necesito para reservar?',
			content:
				'Para reservar a través de Livinng, necesitarás tener una cuenta de usuario registrada en nuestra plataforma. Podrás explorar los alojamientos disponibles, seleccionar las fechas deseadas y realizar el pago correspondiente para confirmar tu reserva.',
		},
		{
			title: '3.	¿Puedo pagar en el hotel?',
			content:
				'Deberás pagar el 50% del pago correspondiente para confirmar la reserva. El otro 50% lo pagarás una vez llegues al alojamiento y realices el check-in.',
		},
		{
			title: '4.	¿Puedo hacer cambios en mi itinerario?',
			content:
				'Los cambios en el itinerario, como modificar las fechas de check-in o check-out, están sujetos a las políticas de cancelación establecidas por el anfitrión. Estas políticas son las siguientes: recibirás un reembolso del 95% del valor pagado si cancelas al menos 10 días antes de la fecha de check-in, o si la cancelación se realiza dentro de las 24 horas posteriores a la reserva.',
		},
		{
			title: '5. ¿Puede cancelar mi reserva en cualquier momento?',
			content:
				'No, las cancelaciones estas sujetas a políticas de cancelación.',
		},
		{
			title: '6. No veo la dirección o datos de contacto de la recepción del hotel, ¿qué debo hacer?',
			content:
				'En Livinng, proporcionamos la información de contacto y dirección del alojamiento una vez confirmada tu reserva. Si no puedes ver esta información, te recomendamos revisar tu correo electrónico, incluyendo la carpeta de spam. Si aún no la encuentras, por favor, comunícate con nuestro equipo de soporte y con gusto te proporcionaremos los datos necesarios.',
		},
		{
			title: '7. ¿Cuándo obtendré mi reembolso?',
			content:
				'Si cumples con los requisitos para obtener un reembolso, el proceso de devolución se llevará a cabo dentro de un plazo determinado. Por lo general, los reembolsos se procesan en un período de tiempo no superior a 5 días y se acreditan a la misma forma de pago utilizada durante la reserva.',
		},
		{
			title: '8. ¿Puedo tener visitantes en mi habitación?',
			content:
				'Las políticas con respecto a los visitantes en las habitaciones pueden variar según el alojamiento y las regulaciones locales. Te recomendamos verificar las normas establecidas por el anfitrión antes de invitar a visitantes a tu habitación. Algunos alojamientos pueden cobrar tarifas adicionales o requerir autorización previa para los visitantes.',
		},
		{
			title: '9. ¿Como puede enviar una oferta?',
			content:
				'Para enviar una oferta, deberás seleccionar el alojamiento que te interesa, posteriormente escoger las fechas de reserva, la cantidad de adultos y niños, y a continuación, ingresar el valor o monto que estás dispuesto a ofertar. Finalmente, presiona el botón de continuar para completar el proceso.',
		},
		{
			title: '10. ¿Cuánto tiempo tengo para pagar después de que el anfitrión acepté mi oferta o me envié una contraoferta?',
			content:
				'Tendrás 24 horas para realizar el pago de tu reserva una vez el anfitrión responda a tu solicitud.',
		},
		// Add more items as needed
	]

	return (
		<Layout>
			<div className='container mx-auto my-24 md:px-6 xl:px-24'>
				<section className='mb-32'>
					<h2 className='text-3xl mb-6 pl-6 font-bold'>Preguntas Frecuentes</h2>

					<div id='accordionFlushExample'>
						{accordionData.map((item, index) => (
							<div
								key={index}
								className={`rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 ${
									activeAccordion === index ? 'border-b-0' : ''
								}`}
							>
								<h2 className='mb-0'>
									<button
										className={`text-base ${
											activeAccordion === index
												? 'text-primary'
												: 'text-primary-400'
										} dark:${
											activeAccordion === index
												? 'text-primary'
												: 'text-primary-400'
										} group relative flex w-full items-center rounded-none border-0 px-5 py-4 text-left font-bold transition ${
											activeAccordion === index
												? 'box-shadow:inset_0_-1px_0_rgba(229,231,235)'
												: ''
										} hover:z-[2] focus:z-[3] focus:outline-none ${
											activeAccordion === index
												? 'rotate-0 fill-[#212529]'
												: 'rotate-[-0deg] fill-[#336dec]'
										} motion-reduce:transition-none dark:${
											activeAccordion === index
												? 'fill-[#8FAEE0]'
												: 'fill-[#eee]'
										}`}
										type='button'
										onClick={() =>
											setActiveAccordion(
												activeAccordion === index ? null : index
											)
										}
									>
										{item.title}
										<span className='ml-auto h-5 w-5 shrink-0'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 16 16'
											>
												<path
													fillRule='evenodd'
													d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
												/>
											</svg>
										</span>
									</button>
								</h2>
								<div
									id={`flush-collapse-${index}`}
									className={`!visible ${
										activeAccordion === index ? '' : 'hidden'
									} border-0`}
								>
									<div className='px-5 py-4 text-neutral-500 dark:text-neutral-300'>
										{item.content}
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

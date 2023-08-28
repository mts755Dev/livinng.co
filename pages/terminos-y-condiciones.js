import { useState } from 'react'
import Layout from 'components/Layout'

export default function TermsAndConditions() {
	const [activeAccordion, setActiveAccordion] = useState(null)

	const accordionData = [
		{
			title: '1. Responsabilidad del usuario',
			content:
				'Livinng proporciona una plataforma de reservas de alojamientos, y los usuarios deben utilizarla de acuerdo con las leyes y regulaciones aplicables. Los usuarios son responsables de la información que proporcionan y garantizan que es precisa y completa. Cualquier uso indebido de la plataforma o violación de estos términos puede dar lugar a la suspensión o terminación de la cuenta del usuario.',
		},
		{
			title: '2. Proceso de reserva',
			content:
				'Los usuarios tendrán 24 horas para pagar el 50% de la reserva una vez que se acepte su pago. Una vez confirmada la oferta, el usuario deberá pagar el resto del monto al momento del check-in en el alojamiento.',
		},
		{
			title: '3. Cancelaciones y reembolsos',
			content:
				'El Huésped recibirá un reembolso del 95% del valor pagado si cancela al menos 10 días antes de la fecha de check-in o si la cancelación se realiza dentro de las 24 horas posteriores a la reserva. Para solicitar un reembolso, el usuario debe comunicarse con nuestro equipo de soporte y proporcionar la información necesaria.',
		},
		{
			title: '4. Comisiones y tarifas',
			content:
				'Actualmente, Livinng cobra una comisión del 13% a los alojamientos asociados por cada reserva realizada a través de nuestra plataforma. ',
		},
		{
			title: '5. Estructura legal',
			content:
				'Livinng es una sociedad de régimen simplificado en Colombia. Todos los usuarios deben cumplir con las leyes y regulaciones locales al utilizar nuestra plataforma.',
		},
		{
			title: '6. . Privacidad y protección de datos',
			content:
				'Livinng se compromete a proteger la privacidad y los datos personales de los usuarios de acuerdo con nuestra política de privacidad. Los usuarios aceptan que su información se procese y utilice de acuerdo con esta política.',
		},
		{
			title: '7. Cambios en los términos y condiciones',
			content:
				'Livinng se reserva el derecho de modificar o actualizar estos términos y condiciones en cualquier momento. Los usuarios serán notificados de los cambios y se les proporcionará la versión actualizada de los términos y condiciones. El uso continuo de la plataforma después de los cambios constituirá la aceptación de los nuevos términos y condiciones.',
		},		
	]

	return (
		<Layout>
			<div className='container mx-auto my-24 md:px-6 xl:px-24'>
				<section className='mb-32'>
					<h2 className='text-3xl mb-6 pl-6 font-bold'>
						Términos y condiciones{' '}
					</h2>

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
						<div className='px-5 py-4 text-neutral-500 dark:text-neutral-300'>
                        Estas políticas de Términos y Condiciones se aplican a todos los usuarios de Livinng. Al utilizar nuestra plataforma, los usuarios aceptan cumplir con estos términos y condiciones.
						</div>
					</div>
				</section>
			</div>
		</Layout>
	)
}

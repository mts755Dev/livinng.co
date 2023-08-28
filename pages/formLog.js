import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react';

const FormLog = ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};
	return (
		<>
			<section className='m-auto flex h-screen flex-col items-center '>
				<div className='flex h-screen w-full items-center justify-center bg-white px-6  md:w-full md:max-w-md lg:max-w-full lg:px-16 xl:w-1/3 xl:px-12'>
					<div className=' h-100 w-full'>
						<div className='flex items-center justify-center'>
							<Image
								className='h-[50px] w-auto'
								src='https://res.cloudinary.com/dg8awhbvm/image/upload/v1688585588/Proyecto%20JS%20vanilla/livinng_ico_sgauay.png'
								alt='Your Company'
								width={150}
								height={80}
							/>
						</div>
						<h1 className='text-xl md:text-2xl mt-12 font-bold leading-tight'>
							Ingresá a tu cuenta
						</h1>

						<form className='mt-6' onSubmit={handleSubmit}>
							<fieldset className='mb-5 rounded-xl border '>
								<legend className='mx-4 px-2'>Nombre</legend>
								<input
									type='name'
									name='name'
									id='name'
									placeholder='Introduzca su nombre'
									className='w-full bg-transparent px-4 py-2 focus:outline-none'
									value={formData.name} // Bind value to the formData state
									onChange={handleChange} // Call handleChange on input change
									required
								/>
							</fieldset>
							<fieldset className='mb-5 rounded-xl border '>
								<legend className='mx-4 px-2'>Usuario</legend>
								<input
									type='email'
									name='email'
									id='email'
									placeholder='Ingrese su correo electrónico'
									className='w-full bg-transparent px-4 py-2 focus:outline-none'
									value={formData.email} // Bind value to the formData state
									onChange={handleChange} // Call handleChange on input change
									required
								/>
							</fieldset>

							<fieldset className='rounded-xl border '>
								<legend className='mx-4 px-2'>Contraseña</legend>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='Ingrese su contraseña'
									className='w-full bg-transparent px-4 py-2 focus:outline-none'
									value={formData.password} // Bind value to the formData state
									onChange={handleChange} // Call handleChange on input change
									required
								/>
							</fieldset>
							<div className='flex items-center justify-center'>
								<button
									type='submit'
									className='mt-6 block w-auto rounded-lg bg-blue-900 p-5 font-semibold text-white hover:bg-indigo-400 focus:bg-indigo-400'
								>
									Iniciar Sesión
								</button>
							</div>
						</form>

						<div className='mx-5 mt-10 flex justify-between text-center'>
							<Link
								href='/reset'
								className='text-sm font-semibold text-blue-700 focus:text-blue-700'
							>
								Olvidé mi contraseña
							</Link>
							<Link
								href='/register'
								className='text-sm font-semibold text-blue-700 focus:text-blue-700'
							>
								Crear una cuenta
							</Link>
						</div>

						<div className='mx-10 my-5 flex'>
							<hr className='my-6 w-1/2 border-gray-300' />
							<span className='px-5 py-2'>o</span>
							<hr className='my-6 w-1/2 border-gray-300' />
						</div>
						<div className='flex items-center justify-center'>
							<button
								type='button'
								className='block w-auto  rounded-lg border border-gray-300 bg-white px-4 py-5 font-semibold text-gray-900 hover:bg-gray-100 focus:bg-gray-100'
							>
								<div className='flex items-center justify-center'>
									<svg className='h-6 w-6' viewBox='0 0 533.5 544.3'>
										<path
											d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
											fill='#4285f4'
										/>
										<path
											d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
											fill='#34a853'
										/>
										<path
											d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
											fill='#fbbc04'
										/>
										<path
											d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
											fill='#ea4335'
										/>
									</svg>

									<span className='ml-4'>Inicia sesión con Google</span>
								</div>
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default FormLog

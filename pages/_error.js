import Link from 'next/link'

function Error({ statusCode }) {
	return (
		<div className='flex h-screen flex-col items-center justify-center bg-white'>
			<div className='flex items-center'>
				<h1 className='mr-4 border-r border-gray-300 pr-3 text-2xl font-medium'>
					{statusCode && statusCode}
				</h1>
				<div>
					<h2 className='text-base font-normal leading-7'>
						{statusCode
							? 'Se ha producido un error en el servidor'
							: 'Se ha producido un error en el cliente'}
					</h2>
				</div>
			</div>
			<div className='mt-5 flex items-center justify-center gap-x-6 hover:text-gray-600'>
				<Link href='/' className='font-semibol px-3.5 py-2.5 text-sm'>
					Volver al inicio
				</Link>
			</div>
		</div>
	)
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

export default Error

import { UserButton } from '@clerk/nextjs'
import { useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function Prueba() {
	const sendDataToServer = async () => {
		const token = Cookies.get('__session')

		if (token) {
			try {
				const headers = {
					Authorization: `Bearer ${token}`,
				}
				const { data } = await axios('https://www.api.livinng.co/login', {
					headers,
				})
				console.log('Token enviado al servidor con éxito', data)
			} catch (error) {
				console.error('Error al enviar el token al servidor', error)
			}
		} else {
			console.error('No se encontró ninguna cookie "__session"')
		}
	}

	const handleSignOut = () => {
		Cookies.remove('__session')
		console.log('Cookie "__session" eliminada')
		sendDataToServer() // Enviar token al servidor al cerrar sesión
	}

	useEffect(() => {
		sendDataToServer()
	}, [])

	return (
		<div>
			<header>
				<UserButton afterSignOutUrl='/' onSignOut={handleSignOut} />
			</header>
		</div>
	)
}

import 'styles/globals.css'
import 'styles/styles.css'

import { useEffect } from 'react'
import axios from 'axios'

import { ClerkProvider } from '@clerk/nextjs'

import Cookies from 'js-cookie'
import { useUser } from 'store/User'
import { useReservation } from 'store/Reservation'

function MyApp({ Component, pageProps }) {
	const token = Cookies.get('__session')
	const { setToken, setName, setEmail } = useUser()
	const { setContact } = useReservation()

	function parseJwt(token) {
		if (!token) {
			return
		}
		const base64Url = token.split('.')[1]
		const base64 = base64Url.replace('-', '+').replace('_', '/')
		return JSON.parse(window.atob(base64))
	}

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

	useEffect(() => {
		if (!token) setToken(null)
		else {
			const { name, email } = parseJwt(token)
			setName(name)
			setEmail(email)
			setContact('name', name)
			setContact('email', email)
			setToken(token)
			sendDataToServer()
		}
	}, [token, setToken])

	return (
		<ClerkProvider {...pageProps}>
			<Component {...pageProps} />
		</ClerkProvider>
	)
}

export default MyApp

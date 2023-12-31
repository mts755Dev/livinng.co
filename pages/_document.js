import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
						rel='stylesheet'
					/>

					<link
						rel='stylesheet'
						href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'
					/>
					<link
						rel='stylesheet'
						href='https://cdn-uicons.flaticon.com/uicons-solid-straight/css/uicons-solid-straight.css'
					/>
					<link
						rel='stylesheet'
						href='https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css'
					/>
					<link
						rel='stylesheet'
						href='https://cdn-uicons.flaticon.com/uicons-regular-straight/css/uicons-regular-straight.css'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument

import { SignUp } from '@clerk/nextjs'

export default function Page() {
	return (
		<SignUp
			appearance={{
				elements: {
					rootBox: 'w-[400px] h-[600px]',
					card: 'w-[400px] h-[600px] flex ',
					headerTitle: 'text-[20px] mt-8',
					headerSubtitle: 'text-[13px]',
					formFieldLabel: 'text-[13px]',
					logoBox: 'h-[50px] flex justify-center mb-16',
					formFieldInput: 'text-[12px]',
					footerActionText: 'text-[12px] mt-6',
					footerActionLink: 'text-[12px] ml-2 m-6',
					formButtonPrimary: {
						fontSize: 12,
					},
					socialButtonsBlockButtonText: 'text-[12px]',
				},
			}}
		/>
	)
}

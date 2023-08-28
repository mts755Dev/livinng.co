import { create } from 'zustand'

export const useUser = create(set => ({
	User: {
		token: null,
		userId: null,
		name: '',
		email: '',
		phone: 91515151,
		offers: [],
		favs: [],
	},
	setUserId: prop =>
		set(({ User }) => ({
			User: {
				...User,
				userId: prop,
			},
		})),
	setName: prop =>
		set(({ User }) => ({
			User: {
				...User,
				name: prop,
			},
		})),
	setEmail: prop =>
		set(({ User }) => ({
			User: {
				...User,
				email: prop,
			},
		})),
	setToken: prop =>
		set(({ User }) => ({
			User: {
				...User,
				token: prop,
			},
		})),
	setOffers: prop =>
		set(({ offers }) => {
			return {
				offers: prop,
			}
		}),
}))

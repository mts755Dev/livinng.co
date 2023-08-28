const buttonUtils = {
	// Funcion manejadora del boton de incremento
	handleIncrement: (prop, setFunction) => {
		setFunction(prevFilters => {
			let updatedValue = parseInt(prevFilters[prop]) || 0
			updatedValue++
			return {
				...prevFilters,
				[prop]: updatedValue,
			}
		})
	},
	// Funcion manejadora del boton de decremento o reduccion
	handleDecrement: (prop, setFunction) => {
		setFunction(prevFilters => {
			let updatedValue = parseInt(prevFilters[prop]) || 0
			if (updatedValue > 0) {
				updatedValue--
			}
			return {
				...prevFilters,
				[prop]: updatedValue,
			}
		})
	},
	// Funcion manejadora de selector de rating
	handleRatingChange: (value, state, setState) => {
		if (value === state.rating) {
		  setState({
			...state,
			rating: '',
		  });
		} else {
		  setState({
			...state,
			rating: value,
		  });
		}
	  },
}

export { buttonUtils }

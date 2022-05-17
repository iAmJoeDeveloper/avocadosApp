const baseURL = 'https://platzi-avo.vercel.app'
const appNode = document.querySelector('div#app')

const formatPrice = (price) => {
	const newPrice = new window.Intl.NumberFormat('en-EN', {
		style: 'currency',
		currency: 'USD',
	}).format(price)

	return newPrice
}
//Web Api
//Conectarnos al server

/* window
	.fetch(url)
	//Procesar la respuesta y convertirla en JSON
	.then((response) => response.json())
	//JSON -> Data -> Renderizar info en el browser
	.then((responseJson) => {
		const allItems = []
		responseJson.data.forEach((item) => {
			//crear imagen
			const img = document.createElement('img')
			//crear titulo
			const title = document.createElement('h2')
			//crear precio
			const price = document.createElement('div')

			//creamos un contenedor
			const container = document.createElement('div')
			container.append(img, title, price)

			allItems.push(container)
		})
		document.body.append(...allItems)
	}) */

//INTL
//1- Dar formatos a fechas
//2- Dar formatos a monedas formatPrice(elPrecio)

// -Cambiando promises por Async Await para optimizar
async function fetchData() {
	const response = await fetch(`${baseURL}/api/avo`),
		responseJson = await response.json(),
		allItems = []

	responseJson.data.forEach((item) => {
		//Create image
		const img = document.createElement('img')
		img.className = 'h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6'
		img.src = `${baseURL}${item.image}`

		//Create title
		const title = document.createElement('h2')
		title.className = 'text-lg'
		title.textContent = item.name

		//Create price
		const price = document.createElement('div')
		price.className = 'text-gray-600'
		price.textContent = formatPrice(item.price)

		//Create a container title and price
		const containerTP = document.createElement('div')
		containerTP.className = 'text-center md:text-left'
		//Adding all of elements inside the container
		containerTP.append(title, price)

		//Create a Card for img and container TP
		const card = document.createElement('div')
		card.className = 'md:flex bg-white rounded-lg p-6 hover:bg-gray-300'
		card.append(img, containerTP)

		//Pushing all into the main container
		const mainContainer = document.createElement('div')
		mainContainer.appendChild(card)

		//Adding the complete component to the array
		allItems.push(mainContainer)
	})
	appNode.append(...allItems)
}

fetchData()

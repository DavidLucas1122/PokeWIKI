'use strict'

const container = document.getElementById('list.container')
let listaPokemon = []

async function carregarPokemons() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
    const response = await fetch(url)
    const dados = await response.json()

    const promises = dados.results.map(async (p) => {
        const resp = await fetch(p.url)
        const info = await resp.json()

        return {
            id: info.id,
            nome: info.name,
            imagem: info.sprites.other['official-artwork'].front_default,
            tipos: info.types.map(t => t.type.name)
        }
    })

    listaPokemon = await Promise.all(promises)
    mostrarPokemons(listaPokemon)
}

function mostrarPokemons(lista) {
    container.replaceChildren()

    lista.forEach(pokemon => {
        const card = document.createElement('div')
        card.classList.add('poke')

        const img = document.createElement('img')
        img.src = pokemon.imagem
        img.classList.add('image')

        const titulo = document.createElement('h3')
        titulo.classList.add('nome')
        titulo.textContent = `#${pokemon.id} - ${pokemon.nome}`

        const tiposContainer = document.createElement('div')
        tiposContainer.classList.add('tipos')

        
        pokemon.tipos.forEach((tipo) => {
            const tipoDiv = document.createElement('div')
            tipoDiv.classList.add('tipo')
            tipoDiv.textContent = tipo
            tiposContainer.appendChild(tipoDiv)
        })

        card.append(titulo, img, tiposContainer)
        container.appendChild(card)
    })
}

// Chama para carregar todos os Pokémon ao abrir a página
carregarPokemons()

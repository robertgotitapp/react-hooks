// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useState} from 'react'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!pokemonName) {
      return 
    }
    fetchPokemon(pokemonName)
    .then(pokemonData => setPokemon(pokemonData))
    .catch(error => setError(error))
  }, [pokemonName])
  
  if (error) {
    return (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )}

  if (!pokemonName) {
    return 'Submit a pokemon'
  }

  if (pokemonName && !pokemon) {
    return (<PokemonInfoFallback name={pokemonName} />)
  }

  return (<PokemonDataView pokemon={pokemon} />)
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App

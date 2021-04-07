// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useState} from 'react'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {PokemonForm} from '../pokemon'

const PokemonStatus = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
}

function PokemonInfo({pokemonName}) {
  const [status, setStatus] = useState({
    status: PokemonStatus.IDLE,
    pokemon: null,
    error: null
  })

  useEffect(() => {
    if (!pokemonName) {
      return 
    }
    fetchPokemon(pokemonName)
    .then(pokemonData => setStatus({
        error: null,
        pokemon: pokemonData,
        status: PokemonStatus.RESOLVED
      })
    )
    .catch(error => setStatus({
      error: error,
      pokemon: null,
      status: PokemonStatus.REJECTED
    }))
  }, [pokemonName])
  
  if (status.status === PokemonStatus.REJECTED) {
    return (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{status.error.message}</pre>
      </div>
    )}

  if (status.status === PokemonStatus.IDLE) {
    return 'Submit a pokemon'
  }

  if (status.status === PokemonStatus.PENDING) {
    return (<PokemonInfoFallback name={pokemonName} />)
  }

  return (<PokemonDataView pokemon={status.pokemon} />)
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

// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name({name, onNameChange}) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  )
}

function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={onAnimalChange}
      />
    </div>
  )
}

function Display({name, animal}) {
  if (name && animal) {
    return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
  }
  if (name) {
    return <div>{`Hey ${name}`}</div>
  }
  if (animal) {
    return <div>{`Your favorite animal is: ${animal}!`}</div>
  }
  return 'Please fill into the input field'
}

function App() {
  const [name, setName] = React.useState('')
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name name={name} onNameChange={event => setName(event.target.value)} />
      <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)} />
      <Display name={name} animal={animal} />
    </form>
  )
}

export default App

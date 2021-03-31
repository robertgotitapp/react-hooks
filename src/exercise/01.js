// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialName}) {
  const [ input, setInput] = React.useState(initialName)

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={input} />
      </form>
      {input ? <strong>Hello {input}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Robert"/>
}

export default App

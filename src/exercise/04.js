// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import useLocalStorageState from '../hooks/useLocalStorageState'

function Board() {
  const INITIAL_STATE = [Array(9).fill(null)]
  const [squares, setSquares] = useLocalStorageState('tictactoe', INITIAL_STATE)
  const [selected, setSelected] = useLocalStorageState('tictactoe-pointer', 0)
  const [nextValue, setNextValue] = React.useState('X')
  const [winner, setWinner] = React.useState(null)
  const [status, setStatus] = React.useState(null)

  function selectSquare(square) {
    if (squares[selected][square] || winner) {
      return
    }
    const newSquares =  [...squares[selected]]
    newSquares[square] = nextValue
    setSquares([
      ...squares,
      newSquares
    ])
  }

  function restart() {
    const newSquares = INITIAL_STATE
    setSquares(newSquares)
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[selected][i]}
      </button>
    )
  }

  React.useEffect(() => {
    const calculatedWinner = calculateWinner(squares[selected])
    const newNextValue = calculateNextValue(squares[selected])
    setNextValue(newNextValue)
    setWinner(calculatedWinner)
    const newStatus = calculateStatus(calculatedWinner, squares[selected], newNextValue)
    setStatus(newStatus)
  }, [squares, selected])

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares, selected) {
  const xSquaresCount = squares[selected].filter(r => r === 'X').length
  const oSquaresCount = squares[selected].filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares, selected) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[selected][a] && squares[selected][a] === squares[selected][b] && squares[selected][a] === squares[selected][c]) {
      return squares[selected][a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App

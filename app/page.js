"use client"

import { useState } from "react"
export default function Home() {
  const word = ["c", "r", "a", "t", "e"]
  const [message, setMessage] = useState("")
  const [currentRow, setCurrentRow] = useState(0)
  const [guessIndex, setGuessIndex] = useState(0)
  const [guesses, setGuesses] = useState([[
    ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]
  ], [
    ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]
  ], [
    ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]
  ], [
    ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]
  ], [
    ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]
  ], [
    ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]
  ]])
  const rows = []
  for (let i = 0; i < 6; i++) {
    let row = []
    for (let j = 0; j < 5; j++) {
      row.push(<div key={`${i}_${j}`} className={`flex ${guesses[i][j][0] ? "border-gray-400" : "border-gray-500"} ${i < currentRow ? "" : "border-3"} w-20 h-20 text-4xl ${guesses[i][j][1]} font-semibold uppercase justify-center items-center`}>{guesses[i][j][0]}</div>)
    }
    rows.push(<div key={i} className="flex space-x-2 mb-2">{row}</div>)
  }
  const keyboard = []
  const row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]
  const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"]
  const row3 = ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"]
  const handleClick = (e) => {
    if (guessIndex < 5) {
      setGuesses(prevGuesses => {
        return prevGuesses.map((guess, index) => {
          if (currentRow == index) {
            guess[guessIndex][0] = e.target.value
            guess[guessIndex][1] = ""
            return guess
          } else {
            return guess
          }
        })
      })
      setGuessIndex(guessIndex + 1)
    }
  }
  const handleDelete = (e) => {
    if (guessIndex > 0) {
      setGuesses(prevGuesses => {
        return prevGuesses.map((guess, index) => {
          if (currentRow == index) {
            guess[guessIndex-1] = ["", ""]
            return guess
          } else {
            return guess
          }
        })
      })
      setGuessIndex(guessIndex - 1)
    }
  }
  const handleEnter = (e) => {
    if (guessIndex < 5) {
      setMessage("Not enough letters")
    } else {
      setGuesses(prevGuesses => {
        return prevGuesses.map((guess, index) => {
          if (currentRow == index) {
            for (let i = 0; i < 5; i++) {
              if (guess[i][0] == word[i]) {
                guess[i] = [guess[i][0], "bg-green-450"]
              } else if (word.includes(guess[i][0])) {
                guess[i] = [guess[i][0], "bg-yellow-450"]
              } else {
                guess[i] = [guess[i][0], "bg-zinc-700"]
              }
            }
            return guess
          } else {
            return guess
          }
        })
      })
      
      setCurrentRow(currentRow + 1)
      setGuessIndex(0)
    }
  }
  for (let i = 0; i < 3; i++) {
    let temp = []
    if (i == 0) {
      row1.forEach((key, j) => temp.push(<button key={`${i}_${j}`} className="uppercase rounded-lg text-2xl font-semibold bg-gray-400 w-14 h-20" onClick={handleClick} value={key}>{key}</button>))
    } else if (i == 1) {
      row2.forEach((key, j) => temp.push(<button key={`${i}_${j}`} className="uppercase rounded-lg text-2xl font-semibold bg-gray-400 w-14 h-20" onClick={handleClick} value={key}>{key}</button>))
    } else if (i == 2) {
      row3.forEach((key, j) => {
        if (key == "enter") {
          temp.push(<button key={`${i}_${j}`} className="uppercase rounded-lg text-md font-semibold bg-gray-400 w-24 h-20" onClick={handleEnter} value={key}>{key}</button>)
        } else if (key == "delete") {
          temp.push(<button key={`${i}_${j}`} className="uppercase rounded-lg text-md font-semibold bg-gray-400 w-24 h-20" onClick={handleDelete} value={key}>{key}</button>)
        } else {
          temp.push(<button key={`${i}_${j}`} className="uppercase rounded-lg text-2xl font-semibold bg-gray-400 w-14 h-20" onClick={handleClick} value={key}>{key}</button>)
        }
      })
    }
    keyboard.push(<div key={`${i}`} className="flex space-x-2 m-1">{temp}</div>)
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-neutral-900">
      <div className="mb-12">{rows}</div>
      {keyboard}
    </main>
  );
}

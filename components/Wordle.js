"use client"

import { useState, useEffect } from "react"
export default function Wordle({onEnter, onCorrect, wordOfDay}) {
  const word = wordOfDay.split("")
  const [message, setMessage] = useState("")
  const [correct, setCorrect] = useState(false)
  const [currentRow, setCurrentRow] = useState(0)
  const [guessIndex, setGuessIndex] = useState(0)
  const [gridLength, setGridLength] = useState(5)
  const [gridHeight, setGridHeight] = useState(1)
  const [guesses, setGuesses] = useState([[
    ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]
  ]])
  const rows = []
  for (let i = 0; i < gridHeight; i++) {
    let row = []
    for (let j = 0; j < guesses[i].length; j++) {
      row.push(<div key={`${i}_${j}`} className={`flex ${guesses[i][j][0] ? "border-gray-400" : "border-gray-500"} ${i < currentRow ? "" : "border-3"} w-20 h-20 text-4xl ${guesses[i][j][1]} font-semibold uppercase justify-center items-center`}>{guesses[i][j][0]}</div>)
    }
    rows.push(<div key={i} className="flex space-x-2 mb-2">{row}</div>)
  }
  const keyboard = []
  const row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]
  const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"]
  const row3 = ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"]


  useEffect(() => {
    if (correct) {
      handleOnCorrect();
    }
  }, [correct]); // Run this effect whenever 'correct' state changes

  useEffect(() => {
    const keyDownHandler = (e) => {
        if (guessIndex < 5) {
            setGuesses(prevGuesses => {
              return prevGuesses.map((guess, index) => {
                if (currentRow == index) {
                  guess[guessIndex][0] = e.key
                  guess[guessIndex][1] = ""
                  return guess
                } else {
                  return guess
                }
              })
            })
          }
          else {
            setGuesses(prevGuesses => {
              return prevGuesses.map((guess, index) => {
                if (currentRow == index) {
                  return [...guess, [e.key, ""]]
                } else {
                  return guess
                }
              })
            })
            setGridLength(gridLength + 1)
          }
          setGuessIndex(guessIndex + 1)
    };
    document.addEventListener("keydown", keyDownHandler);

    // clean up
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const validateWord = () => {

  }
  const handleOnCorrect = () => {
    onCorrect()
  }

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
    }
    else {
      setGuesses(prevGuesses => {
        return prevGuesses.map((guess, index) => {
          if (currentRow == index) {
            return [...guess, [e.target.value, ""]]
          } else {
            return guess
          }
        })
      })
      setGridLength(gridLength + 1)
    }
    setGuessIndex(guessIndex + 1)
  }
  const handleDelete = (e) => {
    if (guessIndex > 0) {
      if (gridLength <= 5) {
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
      } else {
        setGuesses(prevGuesses => {
          return prevGuesses.map((guess, index) => {
            if (currentRow == index) {
              guess = guess.slice(0, -1)
              return guess
            } else {
              return guess
            }
          })
        })
      }
      setGuessIndex(guessIndex - 1)
    }
  }
  const handleEnter = (e) => {
    setGuesses(prevGuesses => {
      return prevGuesses.map((guess, index) => {
        if (currentRow == index) {
          for (let i = 0; i < guessIndex; i++) {
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
    for (let i = 0; i < guesses.length; i++) {
        if (guesses[i].map((g) => g[0]).join() == word.join()) {
            setCorrect(true)
        }
    }
    setCurrentRow(currentRow + 1)
    setGuessIndex(0)
    setGridHeight(gridHeight+1)
    setGuesses([...guesses, [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]]])
    
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
    <div className="flex flex-col items-center">
      <div className="mb-12 flex flex-col">{rows}</div>
      <div className="items-center flex flex-col">{keyboard}</div>
    </div>
  );
}

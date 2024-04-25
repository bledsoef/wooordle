"use client"
import { useState, useEffect } from "react"
export default function Wordle({onEnter, onCorrect, wordOfDay}) {
  const word = wordOfDay.split("")
  const [correct, setCorrect] = useState(false)
  const [currentRow, setCurrentRow] = useState(0)
  const [guessIndex, setGuessIndex] = useState(0)
  const [rowLength, setRowLength] = useState(5)
  const [message, setMessage] = useState(false)
  const [guesses, setGuesses] = useState([
    [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
    [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
    [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
    [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
    [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
    [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
    [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
    [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
    [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
    [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],

  ])
  let gridHeight = 10

  const validKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"]  
  useEffect(() => {
    if (correct) {
      handleOnCorrect();
    }
  }, [correct]);
  useEffect(() => {
    const keyDownHandler = (e) => {
        if (validKeys.includes(e.key)) {
            if (e.key == "Enter") {
                handleEnter()
            } else if (e.key == "Backspace") {
                handleDelete()
            } else if (guessIndex < 5) {
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
                setGuessIndex(guessIndex+1)
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
                setRowLength(rowLength + 1)
                setGuessIndex(guessIndex+1)
              }
            }
        };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [guessIndex, currentRow]);

  const validateWord = async (guess) => {
    var joinedWord = ""
    for (let letter of guess) {
        joinedWord = joinedWord + letter[0]
    }
    let response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${joinedWord}?key=${process.env.NEXT_PUBLIC_MERRIAM_WEBSTER}`)
    let data = await response.json()
    if (data == [] || typeof data[0] === 'string' || data[0] instanceof String) {
        return "invalid"
    }
    var wordCharacterCount = {};
    var guessCharacterCount = {};
    for (let letter of word) {
        if (letter in wordCharacterCount) {
            wordCharacterCount[letter] += 1
        } else {
            wordCharacterCount[letter] = 1
        }
    }
    for (let letter of guess) {
        guessCharacterCount[letter[0]] = 0
    }
    let result = guess.map((character) => {
        character[1] = "bg-zinc-700"
        character[2] = "6"
        character[3] = "xl"
        return character
    })
    for (let i = 0; i < guess.length; i++) {
        if (i < word.length && guess[i][0] == word[i]) {
            result[i][1] = "bg-green-450"
            guessCharacterCount[guess[i][0]] += 1
        }
    }
    for (let i = 0; i < guess.length; i++) {
        if (word.includes(guess[i][0]) && result[i][1] != "bg-green-450" && guessCharacterCount[guess[i][0]] < wordCharacterCount[guess[i][0]]) {
            result[i][1] = "bg-yellow-450"
            guessCharacterCount[guess[i][0]] += 1
        }
    }
    return result
  }
  const handleOnCorrect = () => {
    onCorrect()
  }
  const handleSetMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
        setMessage("")
      }, 3000);  
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
      setRowLength(rowLength + 1)
    }
    setGuessIndex(guessIndex + 1)
  }
  const handleDelete = (e) => {
    if (guessIndex > 0) {
      if (rowLength <= 5) {
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
        setRowLength(rowLength-1)
      }
      setGuessIndex(guessIndex - 1)
    }
  }
  const handleEnter = async (e) => {
    if (guessIndex >= 5) {
        let res = await validateWord(guesses[currentRow])
        if (res == "invalid") {
            handleSetMessage("Invalid word.")
        } else {
            setGuesses(prevGuesses => {
                return prevGuesses.map((guess, index) => {
                  if (currentRow == index) {
                    return res
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
              setRowLength(5)
              onEnter()
        }
        
    } else {
        handleSetMessage("Not enough characters.")
    }
  }
  const initalizeGrid = () => {
    const rows = []
    for (let i = 0; i < gridHeight; i++) {
      let row = []
      for (let j = 0; j < guesses[i].length; j++) {
        row.push(<div key={`${i}_${j}`} className={`flex ${guesses[i].length == word.length && currentRow != i ? "underline" : ""} justify-center ${guesses[i][j][0] ? "border-gray-400" : "border-gray-500"} ${i < currentRow ? "" : "md:border-3 border-2"} md:w-20 w-16 ${currentRow == i ? "md:h-20 h-16 md:text-5xl text-3xl" : "md:h-6 h-6 md:text-xl text-lg"}  ${guesses[i][j][1]} font-semibold uppercase justify-center items-center`}>{guesses[i][j][0]}</div>)
      }
      rows.push(<div key={i} className="flex justify-center space-x-2 mb-2">{row}</div>)
    }
    return rows
  }
  const initializeKeyboard = () => {
    const keyboard = []
    const row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]
    const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"]
    const row3 = ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"]
    for (let i = 0; i < 3; i++) {
        let temp = []
        if (i == 0) {
          row1.forEach((key, j) => temp.push(<button key={`${i}_${j}`} className="uppercase rounded-lg md:text-3xl text-xl font-semibold bg-gray-400 md:w-16 w-12 h-24" onClick={handleClick} value={key}>{key}</button>))
        } else if (i == 1) {
          row2.forEach((key, j) => temp.push(<button key={`${i}_${j}`} className="uppercase rounded-lg md:text-3xl text-xl font-semibold bg-gray-400 md:w-16 w-12 h-24" onClick={handleClick} value={key}>{key}</button>))
        } else if (i == 2) {
          row3.forEach((key, j) => {
            if (key == "enter") {
              temp.push(<button key={`${i}_${j}`} className="uppercase rounded-lg md:text-md text-sm font-semibold bg-gray-400 md:w-24 w-16 h-24" onClick={handleEnter} value={key}>{key}</button>)
            } else if (key == "delete") {
              temp.push(<button key={`${i}_${j}`} className="uppercase rounded-lg md:text-md text-sm font-semibold bg-gray-400 md:w-24 w-16 h-24" onClick={handleDelete} value={key}>{key}</button>)
            } else {
              temp.push(<button key={`${i}_${j}`} className="uppercase rounded-lg md:text-3xl text-xl font-semibold bg-gray-400 md:w-16 w-12 h-24" onClick={handleClick} value={key}>{key}</button>)
            }
          })
        }
        keyboard.push(<div key={`${i}`} className="flex w-full text-white justify-center md:space-x-2 space-x-1 md:mb-1 md:mt-1 md:mx-1 mb-1.5">{temp}</div>)
      }
    return keyboard
  }
  let keyboard = initializeKeyboard()
  let rows = initalizeGrid()
  return (
    <div className="flex flex-col items-center w-full">
      {message && <div className="text-3xl uppercase font-bold">{message}</div>}
      <div className="mb-12 flex flex-col">{rows}</div>
      <div className="fixed bottom-0 items-center flex flex-col mb-3 w-full">{keyboard}</div>
    </div>
  );
}

"use client"
import Modal from "@/components/Modal"
import Wordle from "@/components/Wordle"
import Navbar from "@/components/Navbar"
import { useState } from "react"
import LandingPage from "@/components/LandingPage"
export default function Home() {
  const [guessesCount, setGuessesCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [play, setPlay] = useState(false)
  const [correct, setCorrect] = useState(false)
  const handleEnter = () => {
    setGuessesCount(guessesCount + 1)
    if (guessesCount == 10) {
      setShowModal(true)
    }
  }
  const handleCorrect = () => {
    setShowModal(true)
    setCorrect(true)
  }
  const handlePlay = () => {
    setPlay(true)
  }
  return (
    <main className="min-h-screen items-center w-full pt-24 bg-neutral-900">
      {play && <Navbar guesses={guessesCount}/>}
      {!play && <LandingPage onPlay={handlePlay}/>}
      {!showModal && play && <Wordle onEnter={handleEnter} onCorrect={handleCorrect} wordOfDay={"equivocal"}/>}
      {showModal && <Modal guesses={guessesCount} correct={correct}/>}
    </main>
  );
}

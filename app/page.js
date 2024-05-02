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
  }
  const handleCorrect = () => {
    setShowModal(true)
    setCorrect(true)
  }
  const handlePlay = () => {
    setPlay(true)
  }
  return (
    <main className="h-screen items-center w-full md:pt-20 pt-10 bg-neutral-900">
      <Navbar guesses={guessesCount} play={play}/>
      {!play && <LandingPage onPlay={handlePlay}/>}
      {!(showModal || guessesCount == 10) && play && <Wordle onEnter={handleEnter} onCorrect={handleCorrect} wordOfDay={"cramping"}/>}
      {(showModal || guessesCount == 10) && <Modal guesses={guessesCount} correct={correct}/>}
    </main>
  );
}

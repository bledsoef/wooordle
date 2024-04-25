"use client"
import Modal from "@/components/Modal"
import Wordle from "@/components/Wordle"
import Navbar from "@/components/Navbar"
import { useState } from "react"
export default function Home() {
  const [guessesCount, setGuessesCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const handleEnter = () => {
    setGuessesCount(guessesCount + 1)
  }
  const handleCorrect = () => {
    setShowModal(true)
  }
  return (
    <main className="min-h-screen items-center w-full pt-24 bg-neutral-900">
      <Navbar guesses={guessesCount}/>
      {!showModal && <Wordle onEnter={handleEnter} onCorrect={handleCorrect} wordOfDay={"clinically"}/>}
      {showModal && <Modal guesses={guessesCount}/>}
    </main>
  );
}

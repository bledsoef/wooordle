"use client"
import Modal from "@/components/Modal"
import Wordle from "@/components/Wordle"
import { useState } from "react"
export default function Home() {
  const [guessesCount, setGuessesCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const handleEnter = () => {

  }
  const handleCorrect = () => {
    setShowModal(true)
  }
  return (
    <main className="min-h-screen items-center p-24 bg-neutral-900">
      {!showModal && <Wordle onEnter={handleEnter} onCorrect={handleCorrect} wordOfDay={"clinically"}/>}
      {showModal && <Modal guesses={guessesCount}/>}
    </main>
  );
}

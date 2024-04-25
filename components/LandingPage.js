export default function LandingPage({onPlay}) {
    const handlePlay = () => {
        onPlay()
    }
    return (
        <div className="flex flex-col items-center justify-between h-full p-9 text-white">
            <div className="flex flex-col justify-center items-center">
                <p className="text-6xl font-bold mb-6">Welcome to <b>Wooordle</b></p>
                <div className="flex flex-col w-2/3 justify-center items-center">
                    <p className="text-4xl font-bold underline flex justify-center uppercase mb-2">Rules</p>
                    <ul className="space-y-4 text-3xl p-2">
                        <li>1. You have 10 guesses to guess the Word of the Day.</li>
                        <li>2. The word of the day can be <b>ANY</b> length greater than or equal to 5 letters.</li>
                        <li>3. The word of the day is a valid word according to the Merriam-Webster Dictionary.</li>
                        <li>4. Your guess must also be a valid word according to the Merriam-Webster Dictionary.</li>
                        <li>5. A <span className="text-green-450">GREEN</span> letter indicates it is in the correct position.</li>
                        <li>6. A <span className="text-yellow-450">YELLOW</span> letter indicates it is in the word but not the correct position.</li>
                        <li>7. If your previous guess is <span className="underline">UNDERLINED</span> that means the amount of letters in that guess was CORRECT.</li>
                    </ul>
                </div>
            </div>
            <button className="p-4 text-4xl rounded-lg bg-green-450 font-bold" onClick={handlePlay}>Play Wooordle</button>
        </div>
    )
}
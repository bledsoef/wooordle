export default function LandingPage({onPlay}) {
    const handlePlay = () => {
        onPlay()
    }
    return (
        <div className="flex flex-col items-center justify-between h-full p-9 text-white">
            <div className="flex flex-col justify-center items-center pb-2">
                <div className="flex flex-col md:w-2/3 w-full justify-center items-center">
                    <p className="md:text-5xl text-2xl font-bold flex justify-center mb-2">How to play</p>
                    <ul className="space-y-4 md:text-3xl text-lg">
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
            <button className="p-4 mb-2 md:text-4xl text-2xl rounded-lg bg-green-450 font-bold uppercase" onClick={handlePlay}>Play Wooordle</button>
        </div>
    )
}
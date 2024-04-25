export default function LandingPage({onPlay}) {
    const handlePlay = () => {
        onPlay()
    }
    return (
        <div className="flex flex-col items-center justify-between h-full text-white">
            <p className="text-5xl font-bold mb-6">Welcome to Wooordle</p>
            <p className="text-3xl font-bold underline uppercase mb-2">Rules</p>
            <ul className="space-y-2 mb-8">
                <li className="text-xl">The word of the day can be <b>ANY</b> length greater than or equal to 5 letters.</li>
                <li className="text-xl">The word of the day is a valid word according to the Merriam-Webster Dictionary.</li>
                <li className="text-xl">Your guess must also be a valid word according to the Merriam-Webster Dictionary.</li>
                <li className="text-xl">You have 10 guesses to guess the word of the day.</li>
                <li className="flex text-xl">A <p className="text-green-450 mx-1">GREEN</p> letter indicates it is in the correct position.</li>
                <li className="flex text-xl">A <p className="text-yellow-450 mx-1">YELLOW</p> letter indicates it is in the correct position.</li>
                <li className="flex text-xl">If your previous guess is <p className="underline mx-1">UNDERLINED</p> that means the amount of letters in that guess was <b className="ml-1">CORRECT.</b></li>
            </ul>

            <button className="p-4 text-3xl rounded-lg bg-green-450 font-bold" onClick={handlePlay}>Play Wooordle</button>
        </div>
    )
}
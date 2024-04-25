export default function Modal({guesses, correct}) {
    if (guesses <= 10 && correct) {
        return (
            <div className="flex flex-col items-center text-white">
                <p className="text-5xl font-bold">Nice work!</p>
                <p className="p-3 text-2xl">You solved the Wooordle in <b>{guesses}</b> guesses!</p>
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center text-white">
            <p className="text-5xl font-bold">Bad luck!</p>
            <p className="p-3 text-2xl">You were unable to solve the Wooordle in 10 guesses. Try again tomorrow!</p>
        </div>
    )

}
export default function Modal({guesses}) {
    return (
        <div className="flex flex-col items-center text-white">
            <p className="text-5xl font-bold">Nice work!</p>
            <p className="p-3 text-2xl">You solved the Wooordle in <b>{guesses}</b> guesses!</p>
        </div>
    )
}
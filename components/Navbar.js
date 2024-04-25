export default function Navbar({guesses}) {
    return (
        <div className="flex justify-between text-center items-center w-full h-20 px-20 top-0 text-white fixed">
            <p className="text-3xl uppercase font-semibold">Wooordle</p>
            <p className="text-3xl uppercase font-semibold">Guesses: {guesses}</p>
        </div>
    )
}
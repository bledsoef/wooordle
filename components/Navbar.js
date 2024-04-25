export default function Navbar({guesses, play}) {
    return (
        <div className="flex justify-between text-center items-center w-full h-20 md:px-20 px-4 top-0 text-white fixed">
            <p className="md:text-3xl text-2xl uppercase font-semibold">Wooordle</p>
            {play && <p className="md:text-3xl text-2xl uppercase font-semibold">Guesses: {guesses}/10</p>}
        </div>
    )
}
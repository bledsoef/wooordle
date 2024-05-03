export default function Navbar({guesses, play}) {
    return (
        <div className="flex justify-between text-center items-center w-full h-16 fixed md:px-20 px-4 top-0 text-white bg-neutral-900">
            <p className="md:text-3xl text-xl uppercase font-semibold">Wooordle</p>
            {play && <p className="md:text-3xl text-xl uppercase font-semibold">Guesses: {guesses}/10</p>}
        </div>
    )
}
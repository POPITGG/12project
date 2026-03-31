import { useEffect, useState } from 'react'
import { getCountries } from './features/countries/api'
import { Country } from './features/countries/types'

function App() {
    const [countries, setCountries] = useState<Country[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
        getCountries()
            .then(data => setCountries(data))
            .catch(() => setError("Error loading data"))
            .finally(() => setLoading(false))
    }, [])

    if (loading)
        return <p className="p-8 text-center text-gray-700 text-xl">Loading countries...</p>
    if (error)
        return <p className="p-8 text-center text-red-500 font-bold">{error}</p>

    const filteredCountries = countries.filter(c =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-700 mb-8">
                ?? Countries Explorer
            </h1>

            {/* Search input */}
            <div className="max-w-xl mx-auto mb-8">
                <input
                    type="text"
                    placeholder="Search countries..."
                    className="w-full p-4 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-lg"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {/* Countries grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCountries.map(c => (
                    <div
                        key={c.name.common}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 overflow-hidden"
                    >
                        <img
                            src={c.flags.png}
                            alt={c.name.common}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h2 className="font-semibold text-xl text-gray-800 mb-2">{c.name.common}</h2>
                            <p className="text-gray-600 mb-1">Region: {c.region}</p>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCountries.length === 0 && (
                <p className="text-center mt-8 text-gray-500 text-lg">No countries found</p>
            )}
        </div>
    )
}

export default App
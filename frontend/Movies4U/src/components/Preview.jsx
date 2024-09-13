import React from 'react'
import { useNavigate } from 'react-router-dom'
function capitalizeFirstLetter(str) {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
function Preview({ randomShow }) {
    const navigate = useNavigate();

    const handleShowClick = (showId) => {
        navigate(`/watch/${showId}`);
    };

    return (
        <div className='relative w-full h-screen'>
            {randomShow.poster && (
                <div className='absolute top-0 left-0 w-full h-full'>
                    <img
                        className='w-full h-full object-cover object-top'
                        src={randomShow.poster}
                        alt={randomShow.title}
                    />
                    <div className='absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent'></div>
                </div>
            )}
            <div className="absolute bottom-[20%] left-16 max-w-xl z-10">
                <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">{capitalizeFirstLetter(randomShow.title)}</h1>
                <p className="text-lg text-gray-300 mb-6 drop-shadow-md">{randomShow.plot}</p>
                <div className="flex space-x-4">
                    <button 
                    onClick={() => handleShowClick(randomShow.id)}
                    className="bg-white text-black py-2 px-8 rounded font-bold hover:bg-opacity-80 transition duration-300">
                        Play
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Preview
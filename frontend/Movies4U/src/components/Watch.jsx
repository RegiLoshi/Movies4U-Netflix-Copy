import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShow } from '../services/contentService';
import { X } from 'lucide-react';

function Watch() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getShow(id)
            .then(showData => {
                setShow(showData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching show:', error);
                setError(error);
                setIsLoading(false);
            });
    }, [id]);

    const handleExit = () => {
        navigate('/home'); 
    };

    if (isLoading) {
        return <div className="w-full h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
    }

    if (error) {
        return <div className="w-full h-screen flex items-center justify-center bg-black text-white">Error: {error.message}</div>;
    }

    if (!show) {
        return <div className="w-full h-screen flex items-center justify-center bg-black text-white">No show found</div>;
    }

    return (
        <div className='relative w-full h-screen bg-black'>
            <iframe 
                src={`${show.trailer}?autoplay=1&controls=1&title=0&byline=0&portrait=0&dnt=1`}
                title={show.title}
                className='w-full h-full'
                allowFullScreen
            ></iframe>
            
            <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/70 to-transparent">
                <div className="flex justify-end">
                    <button 
                        onClick={handleExit}
                        className="text-white hover:text-gray-300 transition-colors"
                        aria-label="Exit"
                    >
                        <X size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Watch;
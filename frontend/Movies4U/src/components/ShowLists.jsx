import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Star , StarOff} from 'lucide-react';
import { addLikedShow, getLikedShows , removeLikedShow } from '../services/userService';
import Swal from 'sweetalert2';

function ShowList({ category, shows, handleLike, removeLike,  likes }) {
  const rowRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const handleShowClick = (showId) => {
    navigate(`/watch/${showId}`);
  };

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8 relative group">
      <h2 className="text-xl font-bold text-white mb-4 px-4">{category}</h2>
      <div className="flex items-center">
        <button 
          className="absolute left-0 z-40 h-full w-12 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => scroll('left')}
        >
          {'<'}
        </button>
        <div ref={rowRef} className="flex space-x-2 overflow-x-scroll scrollbar-hide px-4">
          {shows.map((show, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 relative transition-all duration-200 ease-out"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                width: hoveredIndex === index ? '300px' : '200px',
                height: hoveredIndex === index ? '350px' : '300px',
                zIndex: hoveredIndex === index ? 10 : 1,
                transform: hoveredIndex === index ? 'scale(1.1) translateY(-20px)' : 'scale(1) translateY(0)',
                transitionDelay: hoveredIndex === index ? '0.3s' : '0s'
              }}
            >
              {hoveredIndex !== index && (
                <img 
                  src={show.poster} 
                  alt={show.title} 
                  className="w-full h-full object-cover rounded-md transition-all duration-200 ease-out"
                />
              )}
              {hoveredIndex === index && (
                <iframe
                  src={`${show.trailer}?autoplay=1&muted=1&controls=0&loop=1&background=1`} 
                  alt={show.title} 
                  className="w-full h-full object-cover rounded-md transition-all duration-200 ease-out"
                />
              )}
              {hoveredIndex === index && (
                <div className="absolute bottom-0 left-0 w-full bg-zinc-800 p-4 rounded-b-md">
                  <h3 className="text-white font-bold">{show.title}</h3>
                  <div className="flex mt-2 flex-wrap">
                    {show.genre.map((g, i) => (
                      <span key={i} className="text-xs bg-gray-700 text-white px-1 py-0.5 rounded mr-1 mb-1">
                        {g}
                      </span>
                    ))}
                  </div>
                  <div className='flex'>
                    <button onClick={() => handleShowClick(show.id)}
                    className='cursor-pointer focus:outline-none'>
                      <Play color='#FFF' size={24} />
                    </button>
                    {!likes && (
                    <button onClick={() => handleLike(show.id)}
                    className='flex items-center justify-center cursor-pointer focus:outline-none ml-3'>
                      <Star color='#FFF' size={24} />
                    </button>
                    )}
                    {likes && (
                    <button onClick={() => removeLike(show.id)}
                    className='flex items-center justify-center cursor-pointer focus:outline-none ml-3'>
                      <StarOff color='#FFF' size={24} />
                    </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <button 
          className="absolute right-0 z-40 h-full w-12 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => scroll('right')}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}


function ShowLists({ categories }) {
  const [user, setUser] = useState(null);
  const [favoriteShows, setFavoriteShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLikedShows = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        throw new Error('No user found in local storage');
      }
      const { id } = JSON.parse(storedUser);

      const response = await getLikedShows(id);
      setFavoriteShows(response.likedShows);
      setUser({ id });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedShows();
  }, []);

  const handleLike = async (showId) => {
    try {
      const { id } = JSON.parse(localStorage.getItem('user'));
      await addLikedShow(id, showId);
      
      const updatedLikedShows = await getLikedShows(id);
      setFavoriteShows(updatedLikedShows.likedShows);
      
      Swal.fire({
        title: 'Success!',
        text: 'Show added to liked shows',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.status === 408 ? 'Show already liked' : 'Failed to add show to liked shows',
        icon: 'error',
      });
    }
  };

  const removeLike = async (showId) => {
    try {
      const { id } = JSON.parse(localStorage.getItem('user'));
      await removeLikedShow(id, showId);
      
      const updatedLikedShows = await getLikedShows(id);
      setFavoriteShows(updatedLikedShows.likedShows);
      
      Swal.fire({
        title: 'Success!',
        text: 'Show removed from liked shows',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to remove show from liked shows',
        icon: 'error',
      });
    }
  }

  if (loading) {
    return <div className="text-white text-center pt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-white text-center pt-20">Error: {error}</div>;
  }

  if (!categories || Object.keys(categories).length === 0) {
    return <div className="text-white text-center pt-20">No categories to display</div>;
  }

  return (
    <div className='bg-black overflow-hidden'>
      <div className='space-y-8 pt-20'>
        {favoriteShows.length > 0 && (
            <ShowList category="Favorites" shows={favoriteShows} handleLike={handleLike} removeLike={removeLike} likes={true} />
          )}
        {Object.entries(categories).map(([categoryName, shows], index) => (
          <ShowList key={index} category={categoryName} shows={shows} handleLike={handleLike} likes={false}/>
        ))}
      </div>
    </div>
  );
}

export default ShowLists;
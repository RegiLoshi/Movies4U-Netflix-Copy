import React, { useState, useEffect } from 'react';
import {signOut} from '../../redux/authActions';
import {useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const id = useSelector(state => state.auth.user.id);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const shows = useSelector(state => state.content.shows);
  const dispatch = useDispatch();

  const handleShowClick = (showId) => {
    navigate(`/watch/${showId}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogOut = async (e) => {
    e.preventDefault();
    await dispatch(signOut());
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const searchedShows = shows.filter(show => show.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0,5);
    setSearchResults(searchedShows);
    // setIsSearchExpanded(false);
    // setSearchQuery('');
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <a  onClick={() => navigate('/home')} className="text-red-600 text-3xl font-bold mr-8 cursor-pointer">Movies4U</a>
            <ul className="hidden md:flex space-x-6">
              <li><a onClick={() => navigate("/home")} className="cursor-pointer text-sm text-gray-200 hover:text-white transition-colors duration-200">Home</a></li>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block relative">
              {isSearchExpanded ? (
                <form onChange={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-l-full focus:outline-none"
                    placeholder="Search..."
                  />
                  <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded-r-full hover:bg-gray-600 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </button>
                  {searchResults.length > 0 && (
                    <ul className="absolute top-full left-0 w-64 bg-gray-800 rounded-b-lg shadow-lg overflow-hidden">
                      {searchResults.map(show => (
                        <li key={show.id} className="border-b border-gray-700 last:border-b-0">
                          <button
                            onClick={() => handleShowClick(show.id)}
                            className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200"
                          >
                            {show.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </form>
              ) : (
                <button onClick={() => setIsSearchExpanded(true)} className="text-sm text-gray-200 hover:text-white transition-colors duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              )}
            </div>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white focus:outline-none md:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="hidden md:flex items-center space-x-2">
              <img className="w-8 h-8 rounded" src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41" alt="User profile" />
              <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black/75">
          <ul className="px-2 pt-2 pb-3 space-y-1">
            <li><a onClick={() => navigate("/home")} className="cursor-pointer block px-3 py-2 text-base font-medium text-white hover:bg-gray-700 rounded-md">Home</a></li>
            <li><a onClick={() => navigate(`/profile/${id}`)} className="cursor-pointer block px-3 py-2 text-base font-medium text-white hover:bg-gray-700 rounded-md">My Profile</a></li>
            <li><a onClick={handleLogOut}  className="cursor-pointer block px-3 py-2 text-base font-medium text-white hover:bg-gray-700 rounded-md">Log Out</a></li>
          </ul>
        </div>
      )}
      {isProfileOpen && (
        <div className="absolute right-12 mt-0 bg-black text-white rounded shadow-lg w-40">
          <ul className="px-2 pt-2 pb-3 space-y-1">
            <li><a onClick={() => navigate(`/profile/${id}`)} className="block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md">My Profile</a></li>
            <li>
              <button 
                onClick={handleLogOut} 
                className="w-full text-left block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Header;
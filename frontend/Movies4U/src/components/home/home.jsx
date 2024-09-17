import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Header from './Header';
import { getContent } from '../../redux/contentActions';
import Preview from '../Preview';
import ShowLists from '../ShowLists';

function Home() {
    const shows = useSelector(state => state.content.shows);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getContent());
    }, [dispatch]);
    

    if (!shows || shows.length === 0) {
        return (
            <div className="bg-black h-screen">
                <Header />
                <div className="flex items-center justify-center h-full">
                    <div className="text-white text-2xl">Loading shows...</div>
                </div>
            </div>
        );
    }

    const randomShowIndex = Math.floor(Math.random() * shows.length);
    const randomShow = shows[randomShowIndex];
    const showCategories = {};
    if (shows && typeof shows === 'object' && shows !== null) {
        Object.values(shows).forEach(show => {
            if (show && Array.isArray(show.genre)) {
                show.genre.forEach(category => {
                    if (showCategories[category]) {
                        showCategories[category].push(show);
                    } else {
                        showCategories[category] = [show];
                    }
                });
            } else {
                if (!showCategories['Uncategorized']) {
                    showCategories['Uncategorized'] = [];
                }
                showCategories['Uncategorized'].push(show);
            }
        });
    }
    


    return (
        <div className="bg-black min-h-screen overflow-x-hidden">
            <Header />
            <Preview randomShow={randomShow} />
            <ShowLists categories={showCategories} />
        </div>
    );
}

export default Home;
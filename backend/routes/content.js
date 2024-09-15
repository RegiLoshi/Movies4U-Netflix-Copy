import express from 'express';
import Movies from '../models/movie.js';
import Shows from '../models/show.js';
import Author from '../models/author.js';
import Season from '../models/season.js';
import Episode from '../models/episode.js';

const router = express.Router();

// Get all movies
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movies.find({});
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching movies', details: err.message });
    }
});

// Get movie by ID
router.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movies.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching movie', details: err.message });
    }
});

// Get movies by genre
router.get('/movies/genre', async (req, res) => {
    const { genre } = req.query; 
    if (!genre) {
        return res.status(400).json({ error: 'Genre is required' });
    }

    try {
        const movies = await Movies.find({ genre });
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching movies by genre', details: err.message });
    }
});

// Get all shows
router.get('/shows', async (req, res) => {
    try {
        const shows = await Shows.find({});
        res.status(200).json(shows);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching shows', details: err.message });
    }
});

// Get show by ID
router.get('/shows/:id', async (req, res) => {
    try {
        const show = await Shows.findById(req.params.id);
        if (!show) {
            return res.status(404).json({ error: 'Show not found' });
        }
        res.status(200).json(show);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching show', details: err.message });
    }
});

// Get shows by genre
router.get('/shows/genre', async (req, res) => {
    const { genre } = req.query; 
    if (!genre) {
        return res.status(400).json({ error: 'Genre is required' });
    }

    try {
        const shows = await Shows.find({ genre });
        res.status(200).json(shows);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching shows by genre', details: err.message });
    }
});

// Get all authors
router.get('/authors', async (req, res) => {
    try {
        const authors = await Author.find({});
        res.status(200).json(authors);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching authors', details: err.message });
    }
});

// Get all seasons
router.get('/seasons', async (req, res) => {
    try {
        const seasons = await Season.find({});
        res.status(200).json(seasons);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching seasons', details: err.message });
    }
});

// Get season by ID
router.get('/seasons/:id', async (req, res) => {
    try {
        const season = await Season.findById(req.params.id);
        if (!season) {
            return res.status(404).json({ error: 'Season not found' });
        }
        res.status(200).json(season);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching season', details: err.message });
    }
});

// Get all episodes
router.get('/episodes', async (req, res) => {
    try {
        const episodes = await Episode.find({});
        res.status(200).json(episodes);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching episodes', details: err.message });
    }
});

// Get episode by ID
router.get('/episodes/:id', async (req, res) => {
    try {
        const episode = await Episode.findById(req.params.id);
        if (!episode) {
            return res.status(404).json({ error: 'Episode not found' });
        }
        res.status(200).json(episode);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching episode', details: err.message });
    }
});

export default router;

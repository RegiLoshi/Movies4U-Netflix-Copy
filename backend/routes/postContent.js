import express from 'express';
import Author from '../models/author.js';
import Show from '../models/show.js';
import Season from '../models/season.js';
import Episode from '../models/episode.js';
import Movie from '../models/movie.js';

const router = express.Router();

// Post Authors
router.post('/authors', async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Post Shows
router.post('/shows', async (req, res) => {
  try {
    const show = new Show(req.body);
    await show.save();
    res.status(201).json(show);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Post Seasons
router.post('/seasons', async (req, res) => {
  try {
    const season = new Season(req.body);
    await season.save();
    res.status(201).json(season);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Post Episodes
router.post('/episodes', async (req, res) => {
  try {
    const episode = new Episode(req.body);
    await episode.save();
    res.status(201).json(episode);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Post Movies
router.post('/movies', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add an episode to a season
router.put('/seasons/:seasonId/episodes/:episodeId', async (req, res) => {
  try {
    const { seasonId, episodeId } = req.params;

    // Check if the season exists
    const season = await Season.findById(seasonId);
    if (!season) {
      return res.status(404).json({ message: 'Season not found' });
    }

    // Check if the episode exists
    const episode = await Episode.findById(episodeId);
    if (!episode) {
      return res.status(404).json({ message: 'Episode not found' });
    }

    // Check if the episode is already in the season
    if (season.episodes.includes(episodeId)) {
      return res.status(400).json({ message: 'Episode already in the season' });
    }

    // Add the episode to the season
    season.episodes.push(episodeId);
    season.totalEpisodes += 1;
    await season.save();

    res.status(200).json({ message: 'Episode added to season successfully', season });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/shows/:showId/seasons/:seasonId', async (req, res) => {
  try {
    const { showId, seasonId } = req.params;

    // Check if the season exists
    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    // Check if the episode exists
    const season = await Season.findById(seasonId);
    if (!season) {
      return res.status(404).json({ message: 'Season not found' });
    }

    // Check if the episode is already in the season
    if (show.seasons.includes(seasonId)) {
      return res.status(400).json({ message: 'Season already in the season' });
    }

    // Add the episode to the season
    show.seasons.push(seasonId);
    season.numberOfSeasons += 1;
    await show.save();

    res.status(200).json({ message: 'Season added to season successfully', show });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
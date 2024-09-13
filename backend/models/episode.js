import mongoose from 'mongoose';
const { Schema } = mongoose;

const episodeSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true
    },
    episodeNumber: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: false,
        validate: {
            validator: function(v) {
                return /^(http|https):\/\/[^ "]+$/.test(v); // Basic URL validation
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    videoUrl: {
        type: String,
        required: false,
        validate: {
            validator: function(v) {
                return /^(http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    languages: {
        type: [String],
        required: true
    },
    season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season',
        required: true
    }
});

// Middleware to handle episode creation
episodeSchema.post('save', async function(doc) {
    try {
        const season = await mongoose.model('Season').findById(doc.season);
        if (season) {
            season.totalEpisodes = (season.totalEpisodes || 0) + 1;
            await season.save();
        }
    } catch (err) {
        console.error('Error updating total episodes:', err);
    }
});

// Middleware to handle episode removal
episodeSchema.post('remove', async function(doc) {
    try {
        const season = await mongoose.model('Season').findById(doc.season);
        if (season) {
            season.totalEpisodes = Math.max((season.totalEpisodes || 1) - 1, 0);
            await season.save();
        }
    } catch (err) {
        console.error('Error updating total episodes:', err);
    }
});

episodeSchema.index({ season: 1, episodeNumber: 1 });
episodeSchema.index({ title: 1 });

const Episode = mongoose.model('Episode', episodeSchema);

export default Episode;

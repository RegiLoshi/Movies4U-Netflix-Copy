import mongoose from 'mongoose';
const { Schema } = mongoose;

const seasonSchema = new Schema({
    seasonNumber: {
        type: Number,
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    poster: {
        type: String,
    },
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
        required: true
    },
    episodes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Episode'
    }],
    totalEpisodes: {
        type: Number,
        required: false,
        default: 0
    }
});

seasonSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});

// Middleware to handle season creation
seasonSchema.post('save', async function(doc) {
    try {
        const show = await mongoose.model('Show').findById(doc.show);
        if (show) {
            show.numberOfSeasons = (show.numberOfSeasons || 0) + 1;
            await show.save();
        }
    } catch (err) {
        console.error('Error updating total seasons:', err);
    }
});

// Middleware to handle season removal
seasonSchema.post('remove', async function(doc) {
    try {
        const show = await mongoose.model('Show').findById(doc.show);
        if (show) {
            show.numberOfSeasons = Math.max((show.numberOfSeasons || 1) - 1, 0);
            await show.save();
        }
    } catch (err) {
        console.error('Error updating total seasons:', err);
    }
});

seasonSchema.index({ show: 1, seasonNumber: 1 });

const Season = mongoose.models.Season || mongoose.model('Season', seasonSchema);

export default Season;


import mongoose from 'mongoose';
const { Schema } = mongoose;

const watchingSchema = new Schema({
    type: {
        type: String,
        enum: ['movie', 'episode'],
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: function() { return this.type === 'movie'; }
    },
    episodeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Episode',
        required: function() { return this.type === 'episode'; }
    },
    lastWatched: {
        type: Number,
        default: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

watchingSchema.index({ type: 1, movieId: 1, episodeId: 1 });
watchingSchema.index({ updatedAt: -1 });

const Watching = mongoose.model('Watching', watchingSchema);

export default Watching;

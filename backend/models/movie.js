import mongoose from 'mongoose';
const { Schema } = mongoose;
const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    genre: {
        type: [String],
        required: true,
        enum: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller']
    },
    duration: {
        type: Number,
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(http|https):\/\/[^ "]+$/.test(v); // Basic URL validation
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    trailer: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    videoUrl: {
        type: String,
        required: true,
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
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

movieSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
      returnedObject.releaseDate = returnedObject.releaseDate.toISOString().split('T')[0]; // Converts Date to 'YYYY-MM-DD' format
    }
});

// Indexes for faster queries
movieSchema.index({ title: 1 });
movieSchema.index({ author: 1 });
movieSchema.index({ releaseDate: -1 });
movieSchema.index({ genre: 1 });
movieSchema.index({ rating: -1 });

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;

import mongoose from 'mongoose';
const { Schema } = mongoose;

const showSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true
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
    numberOfSeasons: {
        type: Number,
        required: true,
        default: 0
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
                return /^(http|https):\/\/[^ "]+$/.test(v);
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
    languages: {
        type: [String],
        required: true
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    totalRating: {
        type: Number,
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    seasons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    }
});

showSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
      returnedObject.releaseDate = returnedObject.releaseDate.toISOString().split('T')[0];
    }
});

showSchema.index({ title: 1 });
showSchema.index({ author: 1 });
showSchema.index({ releaseDate: -1 });
showSchema.index({ genre: 1 });
showSchema.index({ rating: -1 });
showSchema.index({ numberOfSeasons: 1 });

const Show = mongoose.model('Show', showSchema);

export default Show;

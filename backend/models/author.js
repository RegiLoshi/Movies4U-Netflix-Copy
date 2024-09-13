import mongoose from 'mongoose';
const { Schema } = mongoose;

const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    surname: {
        type: String,
        required: true,
        lowercase: true
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    shows: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show'
    }],
    biography: {
        type: String,
        required: false
    },
    birthDate: {
        type: Date,
        required: false
    },
    deathDate: {
        type: Date,
        required: false
    },
    nationality: {
        type: String,
        required: false
    },
})

authorSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

authorSchema.index({ name: 1, surname: 1 });

const Author = mongoose.model('Author', authorSchema)

export default Author;
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9_]{3,30}$/,
        //regex => 3-30 characters, letters, numbers, and underscores only
        unique: true
    },
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA]+$/,
        //regex => email format only 
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    // stripeCustomerId is a unique identifier for a customer in Stripe
    stripeCustomerId: {
        type: String,
        unique: true,
        sparse: true
    },
    // subscriptionStatus can be 'active', 'inactive', 'canceled', or 'none'
    subscriptionStatus: {
        type: String,
        enum: ['active', 'inactive', 'canceled', 'none'],
        default: 'none'
    },
    favoriteShows: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',  // Assuming 'Show' is the model for the shows
        default: []
    }],
    roles: [{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }]
})
// The pre-save hook is used to modify the email field before saving the user to the database.
userSchema.pre('save', function(next) {
    if (this.isModified('email')) { 
      this.email = this.email.toLowerCase().trim();
    }
    next();
  });

// The toJSON method is used to modify the user object before sending it as a response.
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
      if (returnedObject.dateOfBirth) {
        returnedObject.dateOfBirth = returnedObject.dateOfBirth.toISOString().split('T')[0];
    }
    }
  })

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ stripeCustomerId: 1 }, { sparse: true });
userSchema.index({ subscriptionStatus: 1 });

const User = mongoose.model('User', userSchema)

export default User;

const watchListSchema = new Schema({
    user:
     { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: 
    { type: Schema.Types.ObjectId, refPath: 'contentType' },
    contentType: 
    { type: String, enum: ['Movie', 'Show'], required: true },
    addedAt:
     { type: Date, default: Date.now }
  });
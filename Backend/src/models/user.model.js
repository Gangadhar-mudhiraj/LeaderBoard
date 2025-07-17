import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    points: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    awardedAt: {
        type: Date,
        default: Date.now
    }
}, { _id: false }); // Disable _id for subdocuments

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    points: {
        type: Number,
        default: 0,
        min: 0
    },
    history: {
        type: [historySchema],
        default: [] // Initialize as empty array
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Capitalize name before saving
userSchema.pre('save', function (next) {
    if (this.name && this.isModified('name')) {
        this.name = this.name.charAt(0).toUpperCase() +
            this.name.slice(1).toLowerCase();
    }
    next();
});

export default mongoose.model('User', userSchema);


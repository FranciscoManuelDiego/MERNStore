import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Check if the model exists before creating it (for Next.js hot reload)
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;

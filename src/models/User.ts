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
  phonenumber: {
    type: String,
    default: '',
  },
  province: {
    type: String,
    default: '',
  },
  city:{
    type: String,
    default: '',
  },
  streetAddress: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Clear the cached model to ensure schema changes are applied
if (mongoose.models.User) {
  delete mongoose.models.User;
}

// Check if the model exists before creating it (for Next.js hot reload)
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Create Schema
const contactSchema = new Schema({
  firstName: {type: String, required: [true, 'Required First Name']},
  lastName: {type: String, required: [true, 'Required Last Name']},
  email:  {type: String, required: [true, 'Required Email']},
  phone: {type: String, required: [true, 'Required Phone']},
  address: {type: String, required: [true, 'Required Address']}
});

// Convert to model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact
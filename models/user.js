import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {type: String, required: [true, 'Required First Name']},
  lastName: {type: String, required: [true, 'Required Last Name']},
  email:  {type: String, required: [true, 'Required Email']},
  phone: {type: String, required: [true, 'Required Phone']},
  pass: {type: String, required: [true, 'Required Password']},
  dateCreated: {type: Date, default: Date.now},
  active: {type: Boolean, default: true}
});

// Validator
userSchema.plugin(uniqueValidator, { message: 'Error, expecting unique {PATH}.' });

// Remove pass from JSON response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.pass;
  return obj;
}
// Convert to model
const User = mongoose.model('User', userSchema);

export default User;
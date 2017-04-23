import mongoose from 'mongoose';
let Schema = mongoose.Schema;

var PlaceSchema   = new Schema({
    name: String,
    street: String,
    number: Number,
    zipcode: String,
    city: String,
    lat: Number,
    lng: Number,  
});

export default mongoose.model('Place', PlaceSchema);

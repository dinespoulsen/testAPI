import mongoose from 'mongoose';
let Schema = mongoose.Schema;

var BearSchema   = new Schema({
    name: String
});

export default mongoose.model('Bear', BearSchema);

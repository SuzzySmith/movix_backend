const  mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;

const userSchema = new Schema ({
     
        name: {type: String, required: true, minlength:3},
        email: {type: String, required: true, unique: true},
        image:{type: String, required: false, default: "https://via.placeholder.com/25"},
        password:{type: String, required: true, minlength:6},
        favourite: [{
                date :{type:Date, default: Date.now()},
                movie_id: {type:String },
                movie_title : {type: String },
        }],
        account_active : {type: Number, default: 1},
});

 userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)      
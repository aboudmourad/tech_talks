

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const TechTalkSchema = new Schema ({
    title : {type:String, required: true},
    keywords: {type:String, required: true},
    summary : {type:String, required: true},
    story : {type:String, required: true},
    like: {type: Number, default: 0 ,required: true},
    user_id: {type: Schema.Types.ObjectId, ref: "User"},
    createAt: { type : Date, default : Date.now},
    updatedAt: { type : Date, default : Date.now}

})
const UsersSchema = new Schema({
    fullName: {type:String, required: true},
    email:{type:String, required: true},
    description : {type:String, required: true},
    password: {type:String, required: true},
    createAt: { type : Date, default : Date.now, required: true},
    updatedAt: { type : Date, default : Date.now , required: true}

})
/////////////////////////////User Password///////////////
UsersSchema.methods.hashPassword = function(password){  
    return bcrypt.hashSync(password, 12);
}
UsersSchema.methods.comparePassword = function(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword);
}
///////////////////////////////////////



const AdminSchema = new Schema({
    fullName: {type:String, required: true},
    email:{type:String, required: true},
    description : {type:String, required: true},
    password: {type:String, required: true},
    createAt: { type : Date, default : Date.now, required: true},
    updatedAt: { type : Date, default : Date.now , required: true}

})

///////////Admin password//////////////
AdminSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, 12);
}
AdminSchema.methods.comparePassword = function(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword);
}
//////////////////////////////

mongoose.model('User', UsersSchema);
mongoose.model('TechTalk', TechTalkSchema);
mongoose.model('Admin', AdminSchema);
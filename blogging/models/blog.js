const { Schema, model } = require('mongoose');
const { create } = require('./user');

const blogSchema = new Schema({
    title: {
        type:String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverimageUrl: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
},{
    timestamps: true
})


const blog = model('blog', blogSchema)

module.exports = blog;
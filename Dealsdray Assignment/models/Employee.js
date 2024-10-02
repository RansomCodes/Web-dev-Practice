const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ImageSchema=new Schema({
    url: String,
    filename: String
});

const EmployeeSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: String,
    designation: {
        type: String,
        enum: ['HR','Manager','Sales'],
        required: true
    },
    gender: {
        type: String,
        enum: ['Male','Female','Other'],
        required: true
    },
    course: {
        type: String,
        enum: ['MCA','BCA','BSC'],
        required: true
    },
    Image: ImageSchema,
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    employer: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }
})

module.exports =mongoose.model('Employee',EmployeeSchema)
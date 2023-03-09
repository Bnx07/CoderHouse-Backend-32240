import mongoose from "mongoose";

const courseCollection ='courses';

const coursesSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    teacher:
    {
        type:String,
        required:true
    },
    student: {
        type: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'users'
            }
        ],
        default: []
    }
})

const cousersModel= mongoose.model (courseCollection,coursesSchema);
export default cousersModel;
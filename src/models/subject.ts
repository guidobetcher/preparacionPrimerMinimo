import {Schema, model} from 'mongoose'

/**
 * Definition of subject schema
 */

const subjectShema: Schema = new Schema({
    name: {type: String, required: true},
    students: [{type:Schema.Types.ObjectId, ref:'Student'}]
});

export default model('Subject', subjectShema);

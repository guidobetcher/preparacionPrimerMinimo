import {Request,Response} from 'express';
import Student from '../models/student';

async function  getDetailStud(req:Request,res:Response) {
    let studentId = req.body.studentId;
    let student = await Student.findOne({_id: studentId});
    if (student) {
        res.status(200).json(student)
    } else {
        res.status(404).send({message: 'Student not found'})
    }
}

async function addStudent(req:Request,res:Response) {
    console.log("ADD STUDENT")
    let {name,address,contact}= req.body; //Parsing everything
    const newStudent = new Student({name, address, contact});
    await newStudent.save().then((data)=> {
        res.status(201).json(data);
    }).catch((err)=> {
        res.status(500).json(err);
    })
}

export default{getDetailStud,addStudent};

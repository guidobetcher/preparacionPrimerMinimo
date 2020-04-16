import {Request,Response} from 'express';
import Student from '../models/student';
import Subject from "../models/subject";

async function  getDetailStud(req:Request,res:Response) {
    let studentId = req.params.studentId;
    let student = await Student.findOne({_id: studentId});
    if (student) {
        res.status(200).json(student)
    } else {
        res.status(404).send({message: 'Student not found'})
    }
}

async function addStudent(req:Request,res:Response) {
    console.log("ADD STUDENT");
    let {name,address,phones}= req.body; //Parsing everything
    console.log("Student phone:");
    const newStudent = new Student({name, address, phones});
    await newStudent.save().then((data)=> {
        res.status(201).json(data);
    }).catch((err)=> {
        res.status(500).json(err);
    })
}

async function getStudents(req:Request,res:Response) {
    console.log("GET ALL SUBJECTS");
    let students = await Student.find().populate('students');
    if (students) {
        res.status(200).json(students)
    } else {
        res.status(424).send({message: 'Students not found'})
    }
}

export default{getDetailStud,addStudent,getStudents};

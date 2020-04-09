import { Request, Response } from 'express';
import Student from '../models/student';
import Subject from '../models/subject';

function addSubject(req:Request,res:Response){
    console.log("ADD SUBJECT");
    let {name,students}= req.body; //Parsing everything
    console.log(name);
    console.log(students);
    const newsubject = new Subject({name,students});
    newsubject.save().then((data)=>{
        res.status(201).json(data);
    }).catch((err)=>{
        res.status(500).json(err);
    })
}

async function addStudentToSubject(req: Request,res:Response) {
    console.log("ADD STUDENT TO SUBJECT");
    const subjectId = req.body.subjectId;
    const studentId = req.body.studentId;

    const student = await Student.findOne({_id: studentId});
    if (!student) {
        return res.status(404).send({message: 'Student not found'})
    } else {
        let subject = await Subject.findOne({_id: subjectId});
        if (!subject) {
            return res.status(404).send({message: 'Subject not found'})
        } else {
            await Subject.updateOne({_id: subjectId}, {$addToSet: {students: studentId}})
        };
    }
    return res.status(200).send({message: 'Student added succesfully'});
}

async function getDetailsSubj(req:Request,res:Response){
    console.log("GET DETAILS SUBJECT");
    const idSubj = req.query.id || '';
    Subject.findById(idSubj, (err,subject)=>{
        if (err)
        {
            res.status(404);
        }
        res.status(200).json(subject);
    });
}

async function getAllSubjects(req:Request,res:Response) {
    console.log("GET ALL SUBJECTS");
    let subjects = await Subject.find().populate('students');
    if (subjects) {
        res.status(200).json(subjects)
    } else {
        res.status(424).send({message: 'Subjects not found'})
    }
}

export default{addSubject,addStudentToSubject,getDetailsSubj, getAllSubjects
};

import { Router } from 'express';
import subjectController from '../controllers/subjectController';
import studentController from '../controllers/studentController';

const router: Router = Router();

/**
 * Subject Services
 */
router.get('/subjects',subjectController.getAllSubjects);//Get all the Subjects
router.get('/subjects/:subject',subjectController.getDetailsSubj); //Get the details of a certain subj (students without details)
router.post('/subjects',subjectController.addSubject); //Add a Subj to the DB
router.post('/subjects/:subject',subjectController.addStudentToSubject);

/**
 * Student Services
 */
router.get('/students/:student', studentController.getDetailStud); //Get the details of a certain student
router.post('/students',studentController.addStudent); //Add a student to the DB
router.get('/students',studentController.getStudents); //Get all the students

export default router;

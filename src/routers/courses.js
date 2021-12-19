const authenticate = require('../authenticate');
const courseMiddleware = require('../middlewares/courses');
const express = require('express');
const courseController = require('../controllers/CourseController');

const router = express.Router();

router
  .post('/store', authenticate.verifyUser, courseController.createCourse)
  .get('/:slug', authenticate.verifyUser, courseController.getCourse)
  .put('/:id', authenticate.verifyUser, courseController.updateCourse)
  .delete('/:id', authenticate.verifyUser, courseController.deleteCourse)
  .get('/', authenticate.verifyUser, courseController.getCourses);

router.get('/join/:id', authenticate.verifyUser, courseController.joinCourse);

router
  .route('/invite')
  .post(authenticate.verifyUser, courseController.inviteUser);
router.get(
  '/:id/invitation',
  authenticate.verifyUser,
  courseController.getDefaultInvitation
);

/**
 * type body = {
 *  type: '0' | '1';
 *  userId: string
 * }
 */
router.post(
  '/:id/invitation',
  authenticate.verifyUser,
  courseController.createInvitation
);

router
  .get(
    '/:slug/assignment',
    authenticate.verifyUser,
    courseController.getAllAssignment
  )
  .post(
    '/:slug/assignment',
    authenticate.verifyUser,
    courseController.addAssignment
  );

router
  .get(
    '/:slug/assignment/:id',
    [
      authenticate.verifyUser,
      courseMiddleware.getCourseBySlug,
      courseMiddleware.requireStudentOrTeacher,
    ],
    courseController.getAssignments
  )
  .patch(
    '/:slug/assignment/:id',
    authenticate.verifyUser,
    courseController.updateAssignment
  )
  .delete(
    '/:slug/assignment/:id',
    authenticate.verifyUser,
    courseController.deleteAssignment
  );

router
  .get(
    '/:slug/assignment/:id/grade',
    [
      authenticate.verifyUser,
      courseMiddleware.getCourseBySlug,
      courseMiddleware.requireTeacher,
    ],
    courseController.getSingleStudentGrade
  )
  .post(
    '/:slug/assignment/:id/grade',
    [
      authenticate.verifyUser,
      courseMiddleware.getCourseBySlug,
      courseMiddleware.requireTeacher,
    ],
    courseController.setSingleStudentGrade
  );

router.post(
  '/:slug/assignment/:id/upload',
  [
    authenticate.verifyUser,
    courseMiddleware.getCourseBySlug,
    courseMiddleware.requireTeacher,
  ],
  courseController.setMultipleStudentGrades
);

router.post(
  '/:slug/assignment/:id/finalize',
  [
    authenticate.verifyUser,
    courseMiddleware.getCourseBySlug,
    courseMiddleware.requireTeacher,
  ],
  courseController.setSingleGradeFinalize
);

router.post(
  '/:slug/assignment/:id/finalizemultiple',
  [
    authenticate.verifyUser,
    courseMiddleware.getCourseBySlug,
    courseMiddleware.requireTeacher,
  ],
  courseController.setMultipleGradeFinalize
);

router.post(
  '/:slug/assignment/studentid',
  [
    authenticate.verifyUser,
    courseMiddleware.getCourseBySlug,
    courseMiddleware.requireTeacher,
  ],
  courseController.setCourseStudentIds
);

module.exports = router;

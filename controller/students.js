const studentIndex = require('../view/students/index');
const studentModel = require('../model/students');
const veiw = require('../view/view.js');
const parseBody = require('../helpers/parse-body');

/** @module controller/students
  * The student controller.
  */
module.exports = {
  list: list,
  create: create
}

/** @function list
  * Lists the students currently saved in the app
  * @param {http.IncomingRequest} req - the request object
  * @param {http.ServerResponse} res - the response object
  */
function list(req, res) {
  var students = studentModel.getStudents();
  veiw.render('students/index.html', {students: students}, function(err, html){
    if(err) {
      res.statusCode = 500;
      res.end("Server error");
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  });
  
}

/** @function create
  * Creates a new student from the request body,
  * and then renders the list of all students
  * (including the new one)
  * @param {http.IncomingRequest} req - the request object
  * @param {http.ServerResponse} res - the response object
  */
function create(req, res) {
  // 1) Parse the form content
  parseBody(req, res, function(req, res){
    // 2) Create new student from form content
    studentModel.addStudent(req.body, function(err){
      if(err) {
        console.error(err);
        res.statusCode = 500;
        res.end("Server error");
        return;
      }
      // 3) Render the index with the new student
      list(req, res);
    });
  });
}

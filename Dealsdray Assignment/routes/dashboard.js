const express=require('express');
const router=express.Router({mergeParams: true});
const requireAuth=require('../authMiddleware')
const dashboard=require('../controllers/dashboard');
const { route } = require('./user');

router.route('/:id')
    .get(dashboard.renderDashboard)
    // .post(dashboard.addEmployee)
    // .patch(dashboard.editEmployee)
    // .delete(dashboard.deleteEmployee)

// router.route('/:id/new')
//     .get(dashboard.addEmployeeForm)

// router.route('/:id/edit')
//     .get(dashboard.editEmployeeForm)

module.exports=router
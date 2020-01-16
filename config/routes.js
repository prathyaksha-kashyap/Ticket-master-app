const express = require('express')
const router = express.Router()

const { authenticateUser } = require('../app/middlewares/authentication')

const usersController = require('../app/controllers/UsersController')
const customersControllers = require('../app/controllers/customersControllers')
const departmentsControllers = require('../app/controllers/departmentsControllers')
const employeesControllers = require('../app/controllers/employeeControllers')
const ticketsControllers = require('../app/controllers/ticketControllers')

router.post('/user/register', usersController.register)
router.post('/user/login', usersController.login)
router.get('/user/account', authenticateUser, usersController.account)
router.delete('/user/logout', authenticateUser, usersController.logout)

router.get('/customers', authenticateUser, customersControllers.list)
router.get('/customers/:id', authenticateUser, customersControllers.show)
router.post('/customers', authenticateUser, customersControllers.create)
router.put('/customers/:id', authenticateUser, customersControllers.modify)
router.delete('/customers/:id', authenticateUser, customersControllers.destroy)

router.get('/departments', authenticateUser, departmentsControllers.list)
router.get('/departments/:id', authenticateUser, departmentsControllers.show)
router.post('/departments', authenticateUser, departmentsControllers.create)
router.put('/departments/:id', authenticateUser, departmentsControllers.update)
router.delete('/departments/:id', authenticateUser, departmentsControllers.destroy)

router.get('/employees', authenticateUser, employeesControllers.list)
router.get('/employees/:id', authenticateUser, employeesControllers.show)
router.post('/employees', authenticateUser, employeesControllers.create)
router.put('/employees/:id', authenticateUser, employeesControllers.update)
router.delete('/employees/:id', authenticateUser, employeesControllers.destroy)

router.get('/tickets', authenticateUser, ticketsControllers.list)
router.get('/tickets/:id', authenticateUser, ticketsControllers.show)
router.post('/tickets', authenticateUser, ticketsControllers.create)
router.put('/tickets/:id', authenticateUser, ticketsControllers.update)
router.delete('/tickets/:id', authenticateUser, ticketsControllers.destroy)

module.exports = router

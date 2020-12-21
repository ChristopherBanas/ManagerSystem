"""
Desc: Classes used by the server. No error checking done on back end, all done on web page.
Author: Christopher Banas
"""

from flask_restful import Resource
from flask_restful import request
from flask_restful import reqparse
import json

from .utilities import *


class CreateDatabase(Resource):
    def post(self):
        """
        Rest post call to create the employee database
        :return: None
        """
        initialize()


class GetAllEmployees(Resource):
    def get(self):
        """
        Rest get call to get all of the data within the employee database
        :return: List of tuples containing all the employee data
        """
        result = getAllEmployees()
        return result


class CreateEmployee(Resource):
    def post(self):
        """
        Rest post call to create an employee. Employee information sent via body call
        :return: List containing employee information from database
        """
        parser = reqparse.RequestParser()
        parser.add_argument('department', type=str)
        parser.add_argument('firstName', type=str)
        parser.add_argument('lastName', type=str)
        parser.add_argument('birthYear', type=int)
        parser.add_argument('phoneNumber', type=int)
        args = parser.parse_args()
        department = args['department']
        firstName = args['firstName']
        lastName = args['lastName']
        birthYear = args['birthYear']
        phoneNumber = args['phoneNumber']
        result = createEmployee(department, firstName, lastName, birthYear, phoneNumber)
        return result


class DeleteEmployee(Resource):
    def delete(self, employeeCode):
        """
        Rest delete call to delete an employee given an employeeCode
        :param employeeCode: employeeCode of user to be deleted
        :return: None if employee was deleted, "Employee not found" if not found
        """
        result = deleteEmployee(employeeCode)
        return result


class GetEmployee(Resource):
    def get(self, employeeCode):
        """
        Rest get call to retrieve an employee given an employeeCode
        :param employeeCode: employeeCode of user to be retrieved
        :return: List containing employee information, None if employee not found
        """
        result = getEmployee(employeeCode)
        return result


class HashEmployee(Resource):
    def post(self):
        """
        Rest post call to make an employeeCode. Employee information sent via body call
        :return: employeeCode
        """
        parser = reqparse.RequestParser()
        parser.add_argument('firstName', type=str)
        parser.add_argument('lastName', type=str)
        parser.add_argument('birthYear', type=int)
        parser.add_argument('phoneNumber', type=int)
        args = parser.parse_args()
        firstName = args['firstName']
        lastName = args['lastName']
        birthYear = args['birthYear']
        phoneNumber = args['phoneNumber']
        result = hashCode(firstName, lastName, birthYear, phoneNumber)
        return result

class UpdateEmployee(Resource):
    def put(self, employeeCode):
        parser = reqparse.RequestParser()
        parser.add_argument('department', type=str)
        parser.add_argument('firstName', type=str)
        parser.add_argument('lastName', type=str)
        parser.add_argument('birthYear', type=int)
        parser.add_argument('phoneNumber', type=int)
        args = parser.parse_args()
        department = args['department']
        firstName = args['firstName']
        lastName = args['lastName']
        birthYear = args['birthYear']
        phoneNumber = args['phoneNumber']
        result = updateEmployee(employeeCode, department, firstName, lastName, birthYear, phoneNumber)
        return result

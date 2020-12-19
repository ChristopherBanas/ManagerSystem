"""
Desc: Test file to make sure database is operating as intended
Author: Christopher Banas
"""

import json
import unittest

from tests.rest_utils import *


class TestDatabase(unittest.TestCase):

    def setUp(self):
        post_rest_call(self, 'http://localhost:5000/initialize')

    def test_00_addEmployee(self):
        print("Test: Adding user to database")

        data = dict(department="Delivery", firstName="chris", lastName="banas", birthYear=2000, phoneNumber=5701112222)
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = post_rest_call(self, 'http://localhost:5000/createEmployee', jdata, hdr)

        print(" > Return information:", result)
        self.assertEqual(7, len(result), "Result should have been a length of 6")

        print(" > PASS: User added")

    def test_01_hashEmployee(self):
        print("Test: Hashing user information")

        data = dict(firstName="chris", lastName="banas", birthYear=2000, phoneNumber=5701112222)
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        code1 = post_rest_call(self, 'http://localhost:5000/hashEmployee', jdata, hdr)

        print(" > Return information:", code1)
        self.assertEqual(int, type(code1), "Result should have been an integer")

        data = dict(firstName="chris", lastName="banas", birthYear=2001, phoneNumber=5701112222)
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        code2 = post_rest_call(self, 'http://localhost:5000/hashEmployee', jdata, hdr)

        print(" > Return information:", code2)
        self.assertNotEqual(code1, code2, "Result's equal'")

        print(" > PASS: User information hashed")

    def test_02_deleteEmployee(self):
        print("Test: Deleting user from database")

        data = dict(department="Delivery", firstName="chris", lastName="banas", birthYear=2000, phoneNumber=5701112222)
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = post_rest_call(self, 'http://localhost:5000/createEmployee', jdata, hdr)

        print(" > User to be deleted:", result)
        code = post_rest_call(self, 'http://localhost:5000/hashEmployee', jdata, hdr)
        result = delete_rest_call(self, f'http://localhost:5000/deleteEmployee/{code + 1}')
        print(" > Nonexistent user deletion attempt:", result)
        self.assertEqual("Employee not found", result, "No employee should have been found")

        result = delete_rest_call(self, f'http://localhost:5000/deleteEmployee/{code}')
        print(" > Information of deleted user in the database:", result)
        self.assertEqual(None, result, "None should have been returned")

        print(" > PASS: User deleted")

    def test_03_getAllEmployees(self):
        print("Test: Getting all employees from database")

        data = dict(department="Delivery", firstName="chris", lastName="banas", birthYear=2000, phoneNumber=5701112222)
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        post_rest_call(self, 'http://localhost:5000/createEmployee', jdata, hdr)

        data = dict(department="Waiter", firstName="joe", lastName="alice", birthYear=2001, phoneNumber=5701112223)
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        post_rest_call(self, 'http://localhost:5000/createEmployee', jdata, hdr)

        result = get_rest_call(self, 'http://localhost:5000/getAllEmployees')

        print(" > Return information:", result)
        self.assertEqual(2, len(result), "Result should have been a length of 1")

        print(" > PASS: All employee data retrieved")

    def test_04_getEmployee(self):
        print("Test: Getting an employee from database")

        data = dict(department="Delivery", firstName="chris", lastName="banas", birthYear=2000, phoneNumber=5701112222)
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        post_rest_call(self, 'http://localhost:5000/createEmployee', jdata, hdr)
        code1 = post_rest_call(self, 'http://localhost:5000/hashEmployee', jdata, hdr)
        result = get_rest_call(self, f'http://localhost:5000/getEmployee/{code1}')
        print(" > Return information:", result)
        self.assertEqual(result[1], code1, "Employee codes not equal")

        delete_rest_call(self, f'http://localhost:5000/deleteEmployee/{code1}')
        result = get_rest_call(self, f'http://localhost:5000/getEmployee/{code1}')
        print(" > Return information:", result)
        self.assertEqual(None, result, "Nothing should have been returned")

        data = dict(department="Waiter", firstName="chris2", lastName="banas2", birthYear=2001, phoneNumber=5701112223)
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        post_rest_call(self, 'http://localhost:5000/createEmployee', jdata, hdr)
        code2 = post_rest_call(self, 'http://localhost:5000/hashEmployee', jdata, hdr)
        result = get_rest_call(self, f'http://localhost:5000/getEmployee/{code2}')
        print(" > Return information:", result)
        self.assertEqual(result[1], code2, "Employee codes not equal")

        delete_rest_call(self, f'http://localhost:5000/deleteEmployee/{code2}')
        result = get_rest_call(self, f'http://localhost:5000/getEmployee/{code2}')
        print(" > Return information:", result)
        self.assertEqual(None, result, "Nothing should have been returned")

        result = get_rest_call(self, f'http://localhost:5000/getEmployee/{code2 + 1}')
        print(" > Return information:", result)
        self.assertEqual(None, result, "Nothing should have been returned")

        print(" > PASS: Employee data found")

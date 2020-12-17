"""
Desc: Methods used by serverClasses to operate commands
Author: Christopher Banas
"""

from .dbTools import *
import operator

def initialize():
    """
    Drops the users table if exists, then creates user table
    :return: None
    """
    commit("DROP TABLE IF EXISTS employees")
    commit("""
        CREATE TABLE employees(
            id INTEGER PRIMARY KEY,
            employeeCode INTEGER NOT NULL, 
            firstName TEXT NOT NULL, 
            lastName TEXT NOT NULL, 
            birthYear INTEGER NOT NULL, 
            phoneNumber INTEGER NOT NULL)
    """)
    print("Server started")


def getAllEmployees():
    """
    Selects all data from employees table
    :return: List of tuples containing employee information
    """
    result = getAll("SELECT * FROM employees")
    result.sort(key=operator.itemgetter(3))  # sorts by last name (A-Z)
    return result


def createEmployee(firstName, lastName, birthYear, phoneNumber):
    """
    Creates an employee given the parameters
    :param firstName: First name of employee
    :param lastName: Last name of employee
    :param birthYear: Birth year of employee
    :param phoneNumber: Phone number of employee
    :return: List containing the employees information from the database to verify it was added correctly
    """
    code = hashCode(firstName, lastName, birthYear, phoneNumber)
    commit("INSERT INTO employees(employeeCode, firstName,lastName,birthYear,phoneNumber) VALUES (?,?,?,?,?)",
           (code, firstName, lastName, birthYear, phoneNumber))
    return getOne("SELECT * FROM employees WHERE employeeCode = ?", (code,))


def deleteEmployee(employeeCode):
    """
    Deletes an employee from database whose employeeCode is equal to parameter
    :param employeeCode: employeeCode of employee to be deleted
    :return: "Employee not found" is no employee with given code, otherwise None is returned
    """
    if getEmployee(employeeCode) is None:  # check if the employeeID is valid
        return "Employee not found"
    commit("DELETE FROM employees WHERE employeeCode = ?", (employeeCode,))
    result = getOne("SELECT * FROM employees WHERE employeeCode= ?", (employeeCode,))
    return result


def getEmployee(employeeCode):
    """
    Gets an employee from database whose employeeCode is equal to parameter
    :param employeeCode: employeeCode of employee to be found
    :return: None if employee isn't found, otherwise a list of employee information is found
    """
    result = getOne("SELECT * FROM employees WHERE employeeCode= ?", (employeeCode,))
    return result


def hashCode(firstName, lastName, birthYear, phoneNumber):
    """
    Complex process that produces a unique employee code
    :param firstName: First name of employee
    :param lastName: Last name of employee
    :param birthYear: Birth year of employee
    :param phoneNumber: Phone number of employee
    :return: employeeCode
    """
    firstCode = sum([ord(x) for x in firstName])  # sums up all ascii values of first name
    lastCode = sum([ord(x) for x in lastName])   # sums up all ascii values of last name
    birthCode = birthYear - 1900
    phoneNumber = str(phoneNumber)
    phoneCode = int(phoneNumber[0:2]) + int(phoneNumber[3:6]) + int(phoneNumber[7:])
    code = ((firstCode * 2) + (lastCode * 2) + (birthCode * 2) + (phoneCode * 5))*99
    return code

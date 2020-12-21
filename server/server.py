"""
Desc: Server file that webpage will interact with
Author: Christopher Banas
"""

from flask import Flask
from flask_restful import Resource, Api

from api.serverClasses import *
from api.utilities import *
app = Flask(__name__) #create Flask instance

api = Api(app) #api router

api.add_resource(CreateDatabase, '/initialize')
api.add_resource(GetAllEmployees, '/getAllEmployees')
api.add_resource(CreateEmployee, '/createEmployee')
api.add_resource(DeleteEmployee, '/deleteEmployee/<string:employeeCode>')
api.add_resource(GetEmployee, '/getEmployee/<string:employeeCode>')
api.add_resource(HashEmployee, '/hashEmployee')
api.add_resource(UpdateEmployee, '/updateEmployee/<string:employeeCode>')

if __name__ == '__main__':
    initialize()  # initializes server
    print("Starting flask")
    app.run(debug=True),  # starts Flask
/**
 * Desc: Contains all components needed to render web page
 * Author: Christopher Banas
 */

import React from 'react';
import {Table, Container, Alert} from "reactstrap";
import TableRow from "./TableRow";
import AddButton from "./AddButton";
import './Table.css';

/**
 * Contains all information needed to render starter page
 */
class StarterPage extends React.Component {

    /**
     * Constructs the add button's state with given props
     * @param props
     */
    constructor(props) {
        super(props);
        this.state={
            employeeList : [],
            addModal : false
        }
    }

    /**
     * Calls server URL to get all employee information
     */
    fetchData = () => {
         fetch('/getAllEmployees')
         .then(response => response.json())
         .then (jsonOutput => {
             this.setState({
                employeeList : jsonOutput
            });
         })
    }

    /**
     * Initializes starter page to fill in initial data
     */
    componentDidMount(){
        this.fetchData();
    }

    /**
     * Call parent for AddButton to call server to add an employee
     * @param props Information of employee to be added
     */
    addHandler = (props) => {
        const URL = '/createEmployee'
        fetch(URL,{
            method : 'POST',
            body : JSON.stringify({
                department : props.textDepartment,
                firstName : props.textFirst,
                lastName : props.textLast,
                birthYear : props.textYear,
                phoneNumber : props.textPhone
            }),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState({
                employeeList : this.state.employeeList.concat([json])
            });
            this.fetchData();
        });
    }

    /**
     * Updates employee in database with the given employee information
     * @param hashCode Code of employee to be edited
     * @param props Information of edited employee
     */
    updateEmployee = (hashCode, props) => {
        const URL = '/updateEmployee/'+hashCode
        fetch(URL,{
            method : 'PUT',
            body : JSON.stringify({
                department : props.textDepartment,
                firstName : props.textFirst,
                lastName : props.textLast,
                birthYear : props.textYear,
                phoneNumber : props.textPhone
            }),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        }).then(response => {
            return response.json();
        }).then(json => {
            //update the courses with the updated DB information
            this.fetchData();
        });
    }

    /**
     * Call parent for EditButton to call server to edit an employee
     * @param props Information of employee to be edited
     */
    editHandler = (props) => {
        const URL = '/hashEmployee'
        fetch(URL,{
            method : 'POST',
            body : JSON.stringify({
                firstName : props.originalFirst,
                lastName : props.originalLast,
                birthYear : props.originalYear,
                phoneNumber : props.originalPhone
            }),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        }).then(response => {
            return response.json();
        }).then(json => {
            //edit employee with the hashcode and employee information
            this.updateEmployee(json, props);
        });
    }

    /**
     * Call parent for DeleteButton to call server to delete an employee
     * @param props Information of employee to be deleted
     */
    deleteHandler = (props) => {
        let code = props[1];  //employeeCode
        let URL = '/deleteEmployee/'+code
        fetch(URL,{
            method : 'DELETE'
        }).then(response => {
            response.json();
        }).then (jsonOutput => {
             this.fetchData();
        });
    }

    /**
     * Renders the starter page
     * @returns {JSX.Element} Interactive starter page
     */
    render() {
        if(this.state.employeeList.length === 0){  //if no employees are in the database
            return(
                <div>
                    <Header addParent={this.addHandler}/>
                    <p></p>
                    <div>
                        <h5>
                            No employees in system
                        </h5>
                    </div>
                </div>
            );
        }
        return(
            <div>
                <Header addParent={this.addHandler}/>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Last name</th>
                            <th>First name</th>
                            <th/>
                            <th/>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employeeList.map((list,i) => {
                            return <TableRow infoList={list} editParent={this.editHandler}
                                             deleteParent={this.deleteHandler}/>
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

/**
 * Contains all information needed to render starter page's header
 */
export class Header extends React.Component{

    /**
     * Renders the starter page's header
     * @returns {JSX.Element} Interactive starter page's header
     */
    render() {
        return(
            <div>
                <Container className="themed-container" fluid="true">
                    <Alert color="dark">
                        <h1>Employee List</h1>
                        <AddButton addParent={this.props.addParent}/>
                    </Alert>
                    <p></p>
                </Container>
                <div>
                    <p></p>
                </div>
            </div>
        );
    }
}

export default StarterPage;


import React from 'react';
import {Table, Navbar, NavbarBrand, Container, Col, Row, Alert} from "reactstrap";
import TableRow from "./TableRow";
import AddButton from "./AddButton";
import './Table.css';

class StarterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            employeeList : [],
            addModal : false
        }
    }
    fetchData = () => {
         fetch('/getAllEmployees')
         .then(response => response.json())
         .then (jsonOutput => {
             this.setState({
                employeeList : jsonOutput
            })
         })
    }

    componentDidMount(){
        this.fetchData();
    }

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
        }).then(response=>{
            return response.json()
        }).then(json =>{
            this.setState({
                employeeList : this.state.employeeList.concat([json])
            })
            this.fetchData()
        })
    }
    updateEmployee = (hashCode, props) =>{
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
        }).then(response=>{
            return response.json()
        }).then(json =>{
            //update the courses with the updated DB information
            console.log("updating data")
            this.fetchData()
        })
    }

    editHandler = (props) =>{
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
        }).then(response=>{
            return response.json()
        }).then(json =>{
            //update the courses with the updated DB information
            this.updateEmployee(json, props)
        })
    }

    deleteHandler = (props) =>{
        var code = props[1];
        var URL = '/deleteEmployee/'+code
        fetch(URL,{
            method : 'DELETE'
        }).then(response => {
            response.json()
        }).then (jsonOutput => {
             this.fetchData();
         })
    }

    render() {
        return(
            <div>
                <Container className="themed-container" fluid="true">
                    <Alert color="dark">
                        <h1>Employee List</h1>
                        <AddButton callParent={this.addHandler}/>
                    </Alert>
                    <p></p>
                </Container>
                <div>
                    <p></p>
                </div>
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
                        {this.state.employeeList.map((list,i) =>{
                            return <TableRow infoList={list} editParent={this.editHandler}
                                             deleteParent={this.deleteHandler}/>
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default StarterPage;


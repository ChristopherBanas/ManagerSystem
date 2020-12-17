import React from 'react';
//import {Card, CardHeader} from "reactstrap";

class TableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            code : props.infoList[1],
            lastName : props.infoList[3],
            firstName : props.infoList[2],
            infoList : props.infoList
        }
    }

    render() {
        if(this.props.list === "") {
            return (<div></div>);
        }
        return (
            <tr>
                <td><EditButton list={this.props.list} callParent={this.props.callParent}/></td>
                <td>{this.props.code}</td>
                <td>{this.props.lastName}</td>
                <td>{this.props.firstName}</td>
                <td>{this.props.list[6]}</td>
                <td>Info list</td>
            </tr>
        );
    }
}

export class EditButton extends React.Component{
    render() {
        return(
            <div>
                Hello
            </div>
        );
    }
}

export default TableRow;
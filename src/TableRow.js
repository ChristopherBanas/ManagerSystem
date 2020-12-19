import React from 'react';
//import {Card, CardHeader} from "reactstrap";

class TableRow extends React.Component {
    constructor(props) {
        super(props);
        console.log("table row constructor")
        console.log(this.props.infoList)
        this.state={
            code : props.infoList[1],
            lastName : props.infoList[4],
            firstName : props.infoList[3],
            infoList : props.infoList
        }
    }

    render() {
        if(this.props.list === "") {
            return (<div></div>);
        }
        console.log("table row render")
        console.log(this.state)
        return (
            <tr>
                <td><EditButton list={this.props.infoList}/></td>
                <td className={"text-left text-md-left"}>{this.state.code}</td>
                <td className={"text-left text-md-left"}>{this.state.lastName}</td>
                <td className={"text-left text-md-left"}>{this.state.firstName}</td>
                <td className={"text-left text-md-left"}>Info list</td>
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
import React from 'react';
import EditButton from "./EditButton";


class TableRow extends React.Component {
    render() {
        if(this.props.infoList === "") {
            return (<div></div>);
        }
        return (
            <tr>
                <td><EditButton infoList={this.props.infoList} callParent={this.props.callParent}/></td>
                <td className={"text-left text-md-left"}>{this.props.infoList[4]}</td>
                <td className={"text-left text-md-left"}>{this.props.infoList[3]}</td>
                <td className={"text-left text-md-left"}>Info list</td>
            </tr>
        );
    }
}

export default TableRow;
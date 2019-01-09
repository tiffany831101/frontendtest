import React, { Component } from 'react'

export default class Tableitem extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            id: 0,
            deleteId: 0,

        }

        this.sendID = this.sendID.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(e) {
        this.setState({
            deleteId: e.target.dataset.id,
        })
    }


    componentWillMount() {
        this.props.getItemId(this.state.id);
        this.props.deleteItem(this.state.deleteId);
    }



    componentDidUpdate() {
        this.props.getItemId(this.state.id);
        this.props.deleteItem(this.state.deleteId);
    }

    handleClick(e) {

        this.setState({
            id: e.target.dataset.id
        })
    }

    sendID(e) {
        this.setState({
            id: e.target.dataset.id,
        })
    }


    render() {
        console.log(this.state);
        return (
            <tbody>
                {this.props.tableItem.length !== 0 && this.props.tableItem.map((item, key) => (
                    < tr class="" >
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>
                            <i data-id={item.id} className="fas fa-pen" onClick={this.sendID}></i>
                            <i data-id={item.id} onClick={this.deleteItem} className="far fa-trash-alt"></i>
                        </td>
                    </tr>
                ))}
            </tbody>
        )
    }
}

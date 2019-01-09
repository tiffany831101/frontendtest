import React, { Component } from 'react'
import Tableitem from "./Tableitem";

const Tabletitle = () => (
    <thead>
        <tr>
            <th scope="col" className="thead__id">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col" className="thead__action">Action</th>

        </tr>
    </thead>
)

export default class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deleteId: 0,
            initialId: 0,
            //由子層傳上來要改的id
            editId: 0,
            // 要修改的tableitem
            editChange: {
                name: "",
                phone: "",
                email: "",
            },
            // 是否要顯示modal輸入框，當要修改時才會出現modal
            modalShow: false,
            // 上面輸入攔的部分
            inputValue: {
                name: "",
                phone: "",
                email: "",
            },
            // 表格裡的內容
            tableItem: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getItemId = this.getItemId.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.editChange = this.editChange.bind(this);
        this.editClick = this.editClick.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(deleteId) {
        let id = Number(deleteId);
        console.log(deleteId);
        console.log(this.state.deleteId);
        // console.log()
        if (deleteId == this.state.deleteId) return;
        this.setState({
            deleteId: deleteId,
            tableItem: this.state.tableItem.filter((item, key) => {
                console.log(item.id == deleteId)
                return Number(item.id) !== id
            }),
        })
    }

    editChange(e) {
        console.log(e);
        e.preventDefault();
        // console.log(e.target.value);
        let value = e.target.value;
        // let inputType = e.target.name;
        this.setState({
            editChange: {
                ...this.state.editChange,
                [e.target.name]: value,
            }
        })

    }

    editClick(e) {
        console.log(e.target);
        console.log(this.state.editId);
        this.setState(prevState => ({
            modalShow: false,
            tableItem: this.state.tableItem.map((item, key) => {
                if (item.id == this.state.editId) {
                    return ({ ...this.state.editChange, id: this.state.editId })
                } else {
                    return item
                }
            }),
            editChange: {
                name: "",
                phone: "",
                email: "",
                id: 0,
            }
        }))

    }

    handleChange(e) {
        e.preventDefault();
        // console.log(e.target.value);
        let value = e.target.value;
        // let inputType = e.target.name;
        this.setState({
            inputValue: {
                ...this.state.inputValue,
                [e.target.name]: value,

            }
        })
    }
    // 這邊可以取得到要修改哪一筆的資料
    getItemId(id) {
        this.setState(prevState => {
            console.log(prevState.editId)
            console.log(id)
            if (id == prevState.editId) {
                console.log("已經更改過了")
                return
            } else {
                return (
                    {
                        modalShow: true,
                        editId: id,
                    }
                )
            }



        })
    }

    handleShow(e) {
        console.log(e);
        this.setState({
            modalShow: true,
        })
    }

    handleClick(e) {
        console.log(e);
        console.log(this.state.inputValue);
        this.setState(prevState => ({
            tableItem: [
                ...prevState.tableItem,
                {
                    ...this.state.inputValue,
                    id: (this.state.initialId + 1),
                }
                // this.state.inputValue,
                // this.state.initialId,
            ],
            initialId: (prevState.initialId + 1),
        }))

        this.setState({
            inputValue: {
                name: "",
                email: "",
                phone: "",
            }
        })

    }

    handleClose(e) {
        this.setState({
            modalShow: false,
        })
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <div className="col-lg-6 col-md-6 red">
                    <p className="px-0">Name</p>
                    <input name="name" type="text" className="d-block" onChange={this.handleChange} value={this.state.inputValue.name} />
                    <p className="px-0">Phone</p>
                    <input name="phone" type="text" className="d-block" onChange={this.handleChange} value={this.state.inputValue.phone} />
                    <p className="px-0">Email</p>
                    <input name="email" type="email" className="d-block" onChange={this.handleChange} value={this.state.inputValue.email} />
                    <button onClick={this.handleClick}>clickme</button>
                </div>
                <div className="col-lg-12 col-md-10 col-12 mx-auto">
                    {/* table */}

                    <div className="table__wrapper">
                        <table class="table">
                            <Tabletitle />
                            <Tableitem tableItem={this.state.tableItem} getItemId={this.getItemId} deleteItem={this.deleteItem} />
                        </table>
                    </div>
                    {/*modal */}
                    <div className={(this.state.modalShow ? "d-block " : "d-none ") + "modal"} tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add New Item</h5>
                                    {/* 消失 */}
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p className="px-0">Name</p>
                                    <input name="name" type="text" className="d-block" onChange={this.editChange} value={this.state.editChange.name} />
                                    <p className="px-0">Phone</p>
                                    <input name="phone" type="text" className="d-block" onChange={this.editChange} value={this.state.editChange.phone} />
                                    <p className="px-0">Email</p>
                                    <input name="email" type="email" className="d-block" onChange={this.editChange} value={this.state.editChange.email} />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>Close</button>
                                    <button type="button" class="btn btn-primary" onClick={this.editClick}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

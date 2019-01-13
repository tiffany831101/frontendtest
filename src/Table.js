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
            inputError: {
                phone: false,
                email: true,
                name: false,
            },
            inputColor: {
                phone: false,
                email: false,
                name: false,
            },
            modifyColor: {
                phone: false,
                email: false,
                name: false,
            },
            modifyError: {
                phone: false,
                email: true,
                name: false,
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
        this.checkInvalid = this.checkInvalid.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.editChangeColor = this.editChangeColor.bind(this);
        this.modifyInvalid = this.modifyInvalid.bind(this);

    }

    deleteItem(deleteId) {
        let id = Number(deleteId);
        // console.log(deleteId);
        // console.log(this.state.deleteId);
        // console.log()
        if (deleteId == this.state.deleteId) return;
        this.setState({
            deleteId: deleteId,
            tableItem: this.state.tableItem.filter((item, key) => {
                // console.log(item.id == deleteId)
                return Number(item.id) !== id
            }),
        })
    }

    editChange(e) {
        // console.log(e);
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
        if (this.state.modifyError.email || this.state.modifyError.phone || this.state.modifyError.name) return
        // console.log(e.target);
        // console.log(this.state.editId);
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
            },
            modifyError: {
                email: true,
                phone: false,
                name: false,
            }
        }))

    }

    handleChange(e) {
        e.preventDefault();
        // console.log(e.target.value);
        let value = e.target.value;
        console.log(e.target.name);
        //check for regular expression
        // 2. phone
        // 3. email
        // if (e.target.name == "phone") {
        //     if (!(/^0\d{1,3}-\d{5,8}$/.test(e.target.value))) {
        //         alert("號碼有誤，請重填");
        //         return false;
        //     }
        // }
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
            // console.log(prevState.editId)
            // console.log(id)
            if (id == prevState.editId) {
                // console.log("已經更改過了")
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
        // console.log(e);
        this.setState({
            modalShow: true,
        })
    }

    //change borderColor when focus on input
    changeColor(e) {
        console.log("changing...");
        let inputName = e.target.name;
        this.setState(prevState => {
            return ({
                inputColor: {
                    ...prevState.inputColor,
                    [inputName]: true,
                }
            })
        })
    }


    // onblur
    // check if valid before submit
    checkInvalid(e) {
        console.log("checking...")
        // check phone
        // console.log(e.target.value);
        if (e.target.name === "phone") {
            if (!(/^0\d{1,3}-\d{5,8}$/.test(e.target.value))) {
                if (e.target.value == "") {
                    console.log("here is empty...")
                    this.setState(prevState => {
                        return ({
                            inputError: {
                                ...prevState.inputError,
                                phone: false,
                            },
                            inputColor: {
                                ...prevState.inputColor,
                                phone: false,
                            }
                        })
                    })
                } else {
                    this.setState(prevState => {
                        return ({
                            inputError: {
                                ...prevState.inputError,
                                phone: true,
                            },
                            inputColor: {
                                ...prevState.inputColor,
                                phone: false,
                            }
                        })
                    })
                }
            } else {
                this.setState(prevState => {
                    return ({
                        inputError: {
                            ...prevState.inputError,
                            phone: false,
                        },
                        inputColor: {
                            ...prevState.inputColor,
                            phone: false,
                        }
                    })
                })
            }
        }
        //check email
        if (e.target.name === "email") {
            if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e.target.value))) {
                this.setState(prevState => {
                    return ({
                        inputError: {
                            ...prevState.inputError,
                            email: true,
                        },
                        inputColor: {
                            ...prevState.inputColor,
                            email: false,
                        }
                    })
                })
            } else {
                this.setState(prevState => {
                    return ({
                        inputError: {
                            ...prevState.inputError,
                            email: false,
                        },
                        inputColor: {
                            ...prevState.inputColor,
                            email: false,
                        }
                    })
                })
            }


        }
        //check if duplicate name
        if (e.target.name === "name") {
            if (this.state.tableItem.map(item => item.name).indexOf(e.target.value) !== (-1)) {
                this.setState(prevState => {
                    return ({
                        inputError: {
                            ...prevState.inputError,
                            name: true,
                        },
                        inputColor: {
                            ...prevState.inputColor,
                            name: false,
                        }
                    })
                })
            } else {
                this.setState(prevState => {
                    return ({
                        inputError: {
                            ...prevState.inputError,
                            name: false,
                        },
                        inputColor: {
                            ...prevState.inputColor,
                            name: false,
                        }
                    })
                })
            }

        }
    }
    // click to submit
    handleClick(e) {
        if (this.state.inputError.email || this.state.inputError.phone || this.state.inputError.name) return
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
            },
            inputError: {
                name: false,
                phone: false,
                email: true,
            }
        })

    }

    handleClose(e) {
        this.setState({
            modalShow: false,
        })
    }

    editChangeColor(e) {
        console.log("modify changing...");
        let modifyInput = e.target.name;
        this.setState(prevState => {
            return ({
                modifyColor: {
                    ...prevState.modifyColor,
                    [modifyInput]: true,
                }
            })
        })
    }

    modifyInvalid(e) {
        console.log("checking...")
        // check phone
        // console.log(e.target.value);
        if (e.target.name === "phone") {
            if (!(/^0\d{1,3}-\d{5,8}$/.test(e.target.value))) {
                if (e.target.value == "") {
                    console.log("here is empty...")
                    this.setState(prevState => {
                        return ({
                            modifyError: {
                                ...prevState.modifyError,
                                phone: false,
                            },
                            modifyColor: {
                                ...prevState.modifyColor,
                                phone: false,
                            }
                        })
                    })
                } else {
                    this.setState(prevState => {
                        return ({
                            modifyError: {
                                ...prevState.modifyError,
                                phone: true,
                            },
                            modifyColor: {
                                ...prevState.modifyColor,
                                phone: false,
                            }
                        })
                    })
                }
            } else {
                this.setState(prevState => {
                    return ({
                        modifyError: {
                            ...prevState.modifyError,
                            phone: false,
                        },
                        modifyColor: {
                            ...prevState.modifyColor,
                            phone: false,
                        }
                    })
                })
            }
        }
        //check email
        if (e.target.name === "email") {
            if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e.target.value))) {
                this.setState(prevState => {
                    return ({
                        modifyError: {
                            ...prevState.modifyError,
                            email: true,
                        },
                        modifyColor: {
                            ...prevState.modifyColor,
                            email: false,
                        }
                    })
                })
            } else {
                this.setState(prevState => {
                    return ({
                        modifyError: {
                            ...prevState.modifyError,
                            email: false,
                        },
                        modifyColor: {
                            ...prevState.modifyColor,
                            email: false,
                        }
                    })
                })
            }


        }
        //check if duplicate name
        if (e.target.name === "name") {
            console.log(this.state.editId);
            console.log(this.state.tableItem
                .filter(item => (Number(item.id) !== Number(this.state.editId)))
                .map(item => item.name)
                .indexOf(e.target.value));
            // console.log(this.state.tableItem.filter(item => (Number(item.id) !== Number(this.state.editId)))).map(item => item.name))
            if (this.state.tableItem.filter(item => (Number(item.id) !== Number(this.state.editId))).map(item => item.name).indexOf(e.target.value) !== (-1)) {
                this.setState(prevState => {
                    return ({
                        modifyError: {
                            ...prevState.modifyError,
                            name: true,
                        },
                        modifyColor: {
                            ...prevState.modifyColor,
                            name: false,
                        }
                    })
                })
            } else {
                this.setState(prevState => {
                    return ({
                        modifyError: {
                            ...prevState.modifyError,
                            name: false,
                        },
                        modifyColor: {
                            ...prevState.modifyColor,
                            name: false,
                        }
                    })
                })
            }
        }
    }
    render() {
        const style = {
            borderColor: "#1abc9c",
        }
        console.log(this.state.modifyColor);
        console.log(this.state.modifyError);

        return (
            <div>
                <div className="col-lg-5 col-md-6 col-sm-8 col-12  mt-5">

                    <div className="input__box">
                        <div className={(this.state.inputColor.name && "input__box__area--active") + " input__box__area"}>
                            <input name="name" type="text" className="" onChange={this.handleChange} onFocus={this.changeColor} value={this.state.inputValue.name} onBlur={this.checkInvalid} placeholder='Enter Your Name' />
                            <i className="fas fa-user" style={this.state.inputColor.name ? { color: "#1abc9c" } : {}}></i>
                        </div>
                        <p className={this.state.inputError.name ? "error" : "valid"}>Name already exists</p>
                        <div className={(this.state.inputColor.phone && "input__box__area--active") + " input__box__area"}>
                            <input name="phone" type="text" className="" onChange={this.handleChange} onFocus={this.changeColor} value={this.state.inputValue.phone} onBlur={this.checkInvalid} placeholder='Enter Your Phone ex:02-111111' />
                            <i className="fas fa-phone" style={this.state.inputColor.phone ? { color: "#1abc9c" } : {}}></i>

                        </div>
                        <p className={this.state.inputError.phone ? "error" : "valid"}>Enter a valid Phone Number</p>
                        <div className={(this.state.inputColor.email && "input__box__area--active") + " input__box__area"}>
                            <input name="email" type="email" className="" onChange={this.handleChange} onFocus={this.changeColor} value={this.state.inputValue.email} onBlur={this.checkInvalid} placeholder='Enter Your Email*' />
                            <i className="fas fa-envelope-open" style={this.state.inputColor.email ? { color: "#1abc9c" } : {}}></i>
                        </div>
                        <p className={this.state.inputError.email ? "error" : "valid"}>必填*</p>
                        <button onClick={this.handleClick} className="input__box__btn">Add</button>
                    </div>
                </div>
                <div className="col-lg-12 col-md-10 col-12 mx-auto mt-4">
                    {/* table */}

                    <div className="table__wrapper">
                        <table className="table">
                            <Tabletitle />
                            <Tableitem tableItem={this.state.tableItem} getItemId={this.getItemId} deleteItem={this.deleteItem} handleShow={this.handleShow} />
                        </table>
                    </div>
                    {/*modal */}
                    <div className={(this.state.modalShow ? "d-block " : "d-none ") + "modal"} tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Modify</h5>
                                    {/* 消失 */}
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                                        <span aria-hidden="true" onClick={this.handleClose}>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body py-5">

                                    <input name="name" type="text" className={(this.state.modifyColor.name && "modify__input--active")} onChange={this.editChange} value={this.state.editChange.name} onFocus={this.editChangeColor}
                                        onBlur={this.modifyInvalid} placeholder="name" />
                                    <p className={(this.state.modifyError.name ? "error" : "valid") + " mb-1"}>Name already exists</p>

                                    <input name="phone" type="text" className={(this.state.modifyColor.phone && "modify__input--active")} onChange={this.editChange} value={this.state.editChange.phone} onFocus={this.editChangeColor} onBlur={this.modifyInvalid} placeholder="phone" />
                                    <p className={(this.state.modifyError.phone ? "error" : "valid") + " mb-1"}>Invalid Phone Number</p>
                                    <input name="email" type="email" className={(this.state.modifyColor.email && "modify__input--active")} onChange={this.editChange} value={this.state.editChange.email} onFocus={this.editChangeColor} onBlur={this.modifyInvalid} placeholder="email" />
                                    <p className={(this.state.modifyError.email ? "error" : "valid") + " mb-1"}>必填*</p>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={this.editClick}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}

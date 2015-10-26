import React from "react";
import ReactDOM from "react-dom";

export default React.createClass({
    getInitialState() {
        return {
            customers: [{
                firstName: "Adam",
                lastName: "Lambert",
                phone: "777777777",
                gender: "male",
                age: 34
            },
            {
                firstName: "Stevie",
                lastName: "Wonder",
                phone: "123456789",
                gender: "male",
                age: 30
            }],
            sortByAscending: {
                firstName: false,
                lastName: false,
                phone: false,
                gender: false,
                age: false
            }
        }
    },
    removeCustomer(e) {
        let index = parseInt(e.target.value);
        this.state.customers.splice(index, 1);
        this.setState({
            customers: this.state.customers
        });
    },
    renderCustomers() {
        return this.state.customers.map((item, index) => {
            return <tr key={index}>
                        <td><button className="fa fa-trash-o btn btn-danger" value={index}
                                    onClick={this.removeCustomer}></button></td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.phone}</td>
                        <td>{item.gender}</td>
                        <td>{item.age}</td>
                   </tr>
        })
    },
    createCustomer(e) {
        e.preventDefault();
        let customerData = {};
        let keys = Object.keys(this.refs);
        for(let i = 0; i < keys.length; i++) {
            customerData[keys[i]] = ReactDOM.findDOMNode(this.refs[keys[i]]).value;
            ReactDOM.findDOMNode(this.refs[keys[i]]).value = '';
        }
        this.state.customers.push(customerData);
        this.setState({
            customers: this.state.customers
        });
    },
    sortCustomers(e) {
        e.preventDefault();
        let target = '', sortCustomers, data = {};
        switch(e.target.innerHTML.trim()) {
            case "Name": target = 'firstName'; break;
            case "Surname": target = 'lastName'; break;
            case "Phone": target = 'phone'; break;
            case "Gender": target = 'gender'; break;
            case "Age": target = 'age'; break;
        }
        if (this.state.sortByAscending[target]) {
            data[target] = false;
            sortCustomers = this.state.customers.sort((a, b) => {
                if (a[target] < b[target]) return -1;
                if (a[target] > b[target]) return 1;
                return 0;
            });
        } else if(!(this.state.sortByAscending[target])) {
            data[target] = true;
            sortCustomers = this.state.customers.sort((a, b) => {
                if (a[target] < b[target]) return -1;
                if (a[target] > b[target]) return 1;
                return 0;
            }).reverse();
        }
        this.setState({
            customers: sortCustomers,
            sortByAscending: data
        });
    },
    render() {
        return (
            <div className='customers-list'>
                <header>
                    <h1>
                        Customers list
                    </h1>
                </header>
                    <form className="form-horizontal" onSubmit={this.createCustomer}>
                        <div className="form-group">
                            <label for="first_name" className="col-sm-3 control-label">First Name</label>
                            <div className="col-sm-9">
                                <input id="first_name" className="form-control" type="text" ref="firstName"
                                       placeholder="e.g. Stevie" required pattern="[a-zA-Z]+" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="second_name" className="col-sm-3 control-label">Second Name</label>
                            <div className="col-sm-9">
                                <input id="second_name" className="form-control" type="text" ref="lastName"
                                       placeholder="e.g. Wonder" required pattern="[a-zA-Z]+"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="phone" className="col-sm-3 control-label">Phone</label>
                            <div className="col-sm-9">
                                <input id="phone" className="form-control" type="tel" ref="phone"
                                       placeholder="Must contain 10 digits (e.g. 0981234567)" required pattern="[0-9]{10}"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="gender" className="col-sm-3 control-label">Gender</label>
                            <div className="col-sm-9">
                                <select id="gender" className="form-control" ref='gender'>
                                    <option value='male'>male</option>
                                    <option value='female'>female</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="age" className="col-sm-3 control-label">Age</label>
                            <div className="col-sm-9">
                                <input id="age" className="form-control" type="text" ref="age"
                                       placeholder="Must contain 2 digits" required pattern="[0-9]{2}"/>
                            </div>
                        </div>
                        <div className="form-group submit-btn">
                            <input className="btn btn-success" type="submit" value="New customer" />
                        </div>
                    </form>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td></td>
                            <td onClick={this.sortCustomers}>Name <i className={this.state.sortByAscending.firstName ? "fa fa-caret-up" :
                                                                    "fa fa-caret-down"}></i></td>
                            <td onClick={this.sortCustomers}>Surname <i className={this.state.sortByAscending.lastName ? "fa fa-caret-up" :
                                                                    "fa fa-caret-down"}></i></td>
                            <td onClick={this.sortCustomers}>Phone <i className={this.state.sortByAscending.phone ? "fa fa-caret-up" :
                                                                    "fa fa-caret-down"}></i></td>
                            <td onClick={this.sortCustomers}>Gender <i className={this.state.sortByAscending.gender ? "fa fa-caret-up" :
                                                                    "fa fa-caret-down"}></i></td>
                            <td onClick={this.sortCustomers}>Age <i className={this.state.sortByAscending.age ? "fa fa-caret-up" :
                                                                    "fa fa-caret-down"}></i></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCustomers()}
                    </tbody>
                </table>
            </div>
        );
    }
});
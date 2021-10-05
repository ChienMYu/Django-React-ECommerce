import React, { Component } from 'react'

export default class Studentpost extends Component {
    render() {
        const student = this.props.student
        return (
            <div className="col-6 col-lg-3 col-md-4 pt-3 px-3">
                <div className="card">
                    <div className="card-header">
                        Student #{student.index}
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">First Name: {student.first_name}</li>
                        <li className="list-group-item">Last Name: {student.last_name}</li>
                    </ul>
                </div>
            </div>
        )
    }
}

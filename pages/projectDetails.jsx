import { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from '../firebase/index';
import 'firebase/firestore';
import 'firebase/auth';
import Link from 'next/link';
import Router from 'next/router'
import Navbar from "../Components/Navbar";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
// const Logo = require("../resources/staffLogo.png");

const currentDate = new Date();
const ProjectDetails = (props) => {
    const [firestoreData, setFirestoreData] = useState([]);
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [signedInUserData, setSignedInUserData] = useState({});

    useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setStatus(true);
                setSignedInUserData(user);
                // console.log("...........",user.uid)
                // loadData();
            }
            else {
                setStatus(false)
                setSignedInUserData(null);
                Router.push('/')
            }
        })

        console.log("All the data in the staff component is: ", firestoreData);

        if (status) {
            const db = firebase.firestore();
            db.collection(`Data/Projects/${signedInUserData.uid}`)
                .get()
                .then(snapshot => {
                    let data = [];
                    snapshot.forEach(element => {
                        data.push(Object.assign({
                            id: element.id,
                            "ProjectName": element.ProjectName,
                            "ProjectMembers": element.ProjectMembers,
                            "ProjectStages": element.ProjectStages,
                            "ProjectTasks": element.ProjectTasks,
                            "createAt": element.createAt,
                        }, element.data()))
                    })
                    console.log("data=> ", data)
                    if (firestoreData.length != data.length) {
                        setFirestoreData(data);
                        setLoading(true);
                        console.log("Updated")
                    }
                }).catch(err => {
                    console.log(err)
                })
        }


    })

    return (
        <>
            <div className="container">
                <div className="fixed-top">
                    <Navbar />
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            {(status) ? (
                <div className="container">


                    {(firestoreData.length == 0) ? (
                        <div>
                            <br /><br />
                            <h1 className="mt-3 text-info text-center">Please Create any project first to see its details</h1>
                            <br /><br />
                            <p className="btn btn-link btn-block border"><Link href="/new">Create New Project</Link></p>
                        </div>
                    ) : (
                        <div>
                            {(loading) ? (
                                <>
                                    <div>
                                        <h1 className="text-center">{firestoreData[0].ProjectName}</h1>
                                        <p className="text-center text-info">All the project details can be customized and updated according to your choices.</p>
                                    </div>
                                    <div title={`This is a sample preview of your project dear ${signedInUserData.name}`}>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th colSpan={5}><h2><i className="fas fa-list-alt fa-lg mr-3" style={{ color: "#48dafd" }}></i>&nbsp;&nbsp; {firestoreData[0].ProjectName}</h2></th>
                                                </tr>
                                                <tr>
                                                    <th scope="col">Task name</th>
                                                    <th scope="col">Assignee</th>
                                                    <th scope="col">Due date</th>
                                                    <th scope="col">Priority</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <>
                                                {/* This matters */}
                                                {firestoreData[0].ProjectStages.map((s, i) => {
                                                    return <tbody key={i}>
                                                        <tr>
                                                            <th scope="row" colSpan={5}><h5><i className="fas fa-chevron-down mr-3"></i>&nbsp; {s}</h5></th>
                                                        </tr>
                                                        {(firestoreData[0].ProjectTasks.length == 0) ? (
                                                            <tr>
                                                                <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                                                <td>&nbsp;&nbsp;</td>
                                                                <td>&nbsp;&nbsp;</td>
                                                                <td>&nbsp;&nbsp;</td>
                                                                <td>&nbsp;&nbsp;</td>
                                                            </tr>
                                                        ) : (
                                                            firestoreData[0].ProjectTasks.map((v, i) => {
                                                                return <tr key={i}>
                                                                    {(v.taskSection == s) ? (
                                                                        <>
                                                                            <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;{v.taskName}</th>
                                                                            {(v.taskAssignee == "") ? (
                                                                                <td><i className="fas fa-user-circle fa-2x text-primary"></i></td>
                                                                            ) : (
                                                                                <td>{v.taskAssignee}</td>
                                                                            )}

                                                                            <td>{v.taskDue}</td>
                                                                            {(v.taskPriority == "High") ? (
                                                                                <td><button type="button" className="btn btn-danger btn-rounded">{v.taskPriority}</button></td>
                                                                            ) : (v.taskPriority == "Medium") ? (
                                                                                <td><button type="button" className="btn btn-warning btn-rounded">{v.taskPriority}</button></td>
                                                                            ) : (v.taskPriority == "Low") ? (
                                                                                <td><button type="button" className="btn btn-info btn-rounded">{v.taskPriority}</button></td>
                                                                            ) : (
                                                                                <td></td>
                                                                            )}
                                                                            <td><h5>{v.taskSection}</h5></td>
                                                                        </>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </tr>
                                                            })
                                                        )}
                                                        )
                                                    </tbody>
                                                })}
                                                {/* This matters */}
                                            </>
                                        </table>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-center">
                                        <div id="loader"></div>
                                    </div>
                                    <br />
                                    <div className="animate-bottom text-center">
                                        <h2>Loading Your Projects ...</h2>
                                    </div>
                                </>
                            )}

                        </div>
                    )}
                </div>
            ) : (
                <>
                    <div className="text-center">
                        <div id="loader"></div>
                    </div>
                    <br />
                    <div className="animate-bottom text-center">
                        <h2>Please wait signing In ...</h2>
                    </div>
                </>
            )
            }



        </>
    )
}
const mapStateToProps = (state) => ({
    user_data: state.auth.USER
})
export default connect(mapStateToProps, null)(ProjectDetails);

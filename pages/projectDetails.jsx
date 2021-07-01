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

        console.log("All the data in the staff component is: ", props.currentKey);

        if (status) {
            const db = firebase.firestore();
            db.collection(`Data/Projects/${signedInUserData.email}`)
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
                                    <div title="Create New Project" className="newProjectBtn" onClick={() => Router.push('/new')}><i className="fas fa-4x fa-plus-circle"></i></div>
                                    <div>
                                        <h1 className="text-center"><span className="text-danger"><b>Project Name:-</b></span> {firestoreData[props.currentKey].ProjectName}</h1>
                                        <p className="text-center text-info">All the project details can be customized and updated according to your choices.</p>
                                        <p className="text-center"> <b>Note:- </b>Project Stage and Task having <span className="text-danger">Red color</span> are the one that are active and current tasks. </p>
                                    </div>
                                    <div title={`This is a sample preview of your project dear ${signedInUserData.name}`}>
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th colSpan={5}>
                                                            <h2><i className="fas fa-list-alt fa-lg mr-3" style={{ color: "#48dafd" }}></i>&nbsp;&nbsp; {firestoreData[0].ProjectName}</h2>
                                                            <h4><span className="text-success">{JSON.stringify(firestoreData[0].ProjectStartingDate)}</span> <i className="fas fa-1x text-primary fa-arrow-right"></i> <span className="text-danger">{JSON.stringify(firestoreData[0].ProjectEndingDate)}</span></h4>
                                                        </th>
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
                                                    {firestoreData[props.currentKey].ProjectStages.map((s, i) => {
                                                        return <tbody key={i}>
                                                            <tr>
                                                                <th className={(firestoreData[props.currentKey].CurrentStage==s)?(`text-danger`):(``)} scope="row" colSpan={5}><h5><i className="fas fa-chevron-down mr-3"></i>&nbsp; {s}</h5></th>
                                                            </tr>
                                                            {(firestoreData[props.currentKey].ProjectTasks.length == 0) ? (
                                                                <tr>
                                                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                                                    <td>&nbsp;&nbsp;</td>
                                                                    <td>&nbsp;&nbsp;</td>
                                                                    <td>&nbsp;&nbsp;</td>
                                                                    <td>&nbsp;&nbsp;</td>
                                                                </tr>
                                                            ) : (
                                                                firestoreData[props.currentKey].ProjectTasks.map((v, i) => {
                                                                    return <tr className={(firestoreData[props.currentKey].CurrentStageCurrentTask == v.taskName)?(`text-danger`):(``)} key={i}>
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

                                                        </tbody>
                                                    })}
                                                    {/* This matters */}
                                                </>
                                            </table>
                                        </div>
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
    currentKey: state.app.SET_KEY
})
export default connect(mapStateToProps, null)(ProjectDetails);

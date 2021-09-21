import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setCurrentKey } from "../../store/action/index";
import firebase from '../../firebase/index';
import 'firebase/firestore';
import Router from 'next/router'
import 'firebase/auth';
import Link from "next/link"
import Navbar from "../../Components/Navbar";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
// const Logo = require("../resources/staffLogo.png");

const currentDate = new Date();
const Admin = (props) => {
    const [firestoreData, setFirestoreData] = useState([]);
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initial, setInitial] = useState(true);
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
            //SendNotifications();
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
                    ///////////////////////////////Here is the code for sending notifications
                    ///////////////////////////////Here is the code for sending notifications
                    if (initial == true) {
                        let dateArray = [];
                        for (let i = 0; i < data.length; i++) {
                            var date = new Date(data[i].ProjectEndingDate);
                            var currentDate = new Date();
                            var difference_in_seconds = date - currentDate;
                            var Difference_In_Days = difference_in_seconds / (1000 * 3600 * 24);
                            if (Difference_In_Days < 25) {
                                console.log(`The Project is less than ${Difference_In_Days} days and its name is ${data[i].ProjectName}`)
                                ////////////////////////////
                                let today = new Date();
                                let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                let dateTime = date + ' ' + time;
                                dateTime = dateTime.toString();
                                ////////////////////////////
                                let thingsRef = db.collection(`Data/Notifications/${signedInUserData.email}`);
                                thingsRef.add({
                                    uid: signedInUserData.uid,
                                    userEmail: signedInUserData.email,
                                    ProjectName: data[i].ProjectName,
                                    ProjectMembers: data[i].ProjectMembers,
                                    ProjectStartingDate: data[i].ProjectStartingDate,
                                    ProjectEndingDate: data[i].ProjectEndingDate,
                                    CurrentStage: data[i].CurrentStage,
                                    CurrentStageCurrentTask: data[i].CurrentStageCurrentTask,
                                    createAt: data[i].createAt,
                                    notificationSentAt: dateTime,
                                    DaysLeft: Difference_In_Days
                                }).then(() => {
                                    //alert(`The '${Difference_In_Days}' Days are remaining of Project whose name is '${data[i].ProjectName}'`);
                                })
                            }
                            let temp = {
                                "ProjectEndingDate": Difference_In_Days + " days",
                                "ProjectName": data[i].ProjectName
                            }
                            //console.log(data[i].ProjectEndingDate+'\n');
                            dateArray.push(temp);
                        }
                    }

                    ///////////////////////////////Here is the code for sending notifications
                    ///////////////////////////////Here is the code for sending notifications

                    if (firestoreData.length != data.length) {
                        setFirestoreData(data);
                        setLoading(true);
                        setInitial(false)
                        console.log("Updated")
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    })

    const SendNotifications = () => {
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
                ///////////////////////////////Here is the code for sending notifications
                let dateArray = [];
                for (let i = 0; i < data.length; i++) {
                    var date = new Date(data[i].ProjectEndingDate);
                    var currentDate = new Date();
                    var difference_in_seconds = date - currentDate;
                    var Difference_In_Days = difference_in_seconds / (1000 * 3600 * 24);
                    if (Difference_In_Days < 25) {
                        console.log(`The Project is less than ${Difference_In_Days} days and its name is ${data[i].ProjectName}`)
                        ////////////////////////////
                        let today = new Date();
                        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        let dateTime = date + ' ' + time;
                        dateTime = dateTime.toString();
                        ////////////////////////////
                        let thingsRef = db.collection(`Data/Notifications/${signedInUserData.email}`);
                        thingsRef.add({
                            uid: signedInUserData.uid,
                            userEmail: signedInUserData.email,
                            ProjectName: data[i].ProjectName,
                            ProjectMembers: data[i].ProjectMembers,
                            ProjectStartingDate: data[i].ProjectStartingDate,
                            ProjectEndingDate: data[i].ProjectEndingDate,
                            CurrentStage: data[i].CurrentStage,
                            CurrentStageCurrentTask: data[i].CurrentStageCurrentTask,
                            createAt: data[i].createAt,
                            notificationSentAt: dateTime,
                            DaysLeft: Difference_In_Days
                        }).then(() => {
                            alert(`The '${Difference_In_Days}' Days are remaining of Project whose name is '${data[i].ProjectName}'`);
                        })
                    }
                    let temp = {
                        "ProjectEndingDate": Difference_In_Days + " days",
                        "ProjectName": data[i].ProjectName
                    }
                    //console.log(data[i].ProjectEndingDate+'\n');
                    dateArray.push(temp);
                }
                ///////////////////////////////Here is the code for sending notifications

                // if (firestoreData.length != data.length) {
                // setFirestoreData(data);
                // setLoading(true);
                // console.log("Updated")
                // }
            }).catch(err => {
                console.log(err)
            })
    }

    const UpdateTheData = () => {
        //console.clear()
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
                // console.log("data=> ", data[0].ProjectEndingDate)
                //////////////Here is the code for sending notifications
                // let dateArray = [];
                // for(let i=0;i<data.length;i++)
                // {
                //     var date = new Date(data[i].ProjectEndingDate);
                //     var currentDate = new Date();
                //     var difference_in_seconds = date - currentDate;
                //     var Difference_In_Days = difference_in_seconds / (1000 * 3600 * 24);
                //     if(Difference_In_Days<25)
                //     {
                //         console.log(`The Project is less than ${Difference_In_Days} days and its name is ${data[i].ProjectName}`)

                //         let thingsRef = db.collection(`Data/Projects/${signedInUserData.email}`);
                //         thingsRef.add({
                //             uid: signedInUserData.uid,
                //             userEmail: signedInUserData.email,
                //             ProjectName: projectPlan,
                //             ProjectMembers: teamMatesArray,
                //             ProjectStages: allStageArray,
                //             ProjectTasks: allTaskArray,
                //             ProjectStartingDate: projectStartingDate.toLocaleDateString(),
                //             ProjectEndingDate: projectEndingDate.toLocaleDateString(),
                //             CurrentStage: currentStage,
                //             CurrentStageCurrentTask: currentStageCurrentTask,
                //             createAt: JSON.stringify(currentDate),
                //             // UniqueID: id
                //         }).then(() => {
                //             console.log("Data sent");
                //             const { pathname } = Router
                //             if (pathname == '/new') {
                //                 alert("Your Project is initialized Successfully.Redirecting you to your projects page.")
                //                 Router.push('/staff');
                //             }
                //         })

                //     }
                //     let temp = {
                //         "ProjectEndingDate":Difference_In_Days + " days",
                //         "ProjectName":data[i].ProjectName
                //     }
                //     //console.log(data[i].ProjectEndingDate+'\n');
                //     dateArray.push(temp);
                // }

                //console.log(dateArray)
                /////////////////Here is the code for sending notifications

                if (firestoreData.length != data.length) {
                    setFirestoreData(data);
                    setLoading(true);

                    console.log("Updated")
                }
            }).catch(err => {
                console.log(err)
            })
    }

    // setTimeout(()=>{
    //    alert("Condition set to false No Notification will be sent now");
    //    setInitial(false);
    // },300000)

    const goToDetails = (e, key) => {
        props.setCurrentKey(key);
        Router.push(`/${e}`);
    }

    return (
        <div>
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
                <div onMouseOver={() => UpdateTheData()}>
                    {(firestoreData.length == 0) ? (
                        <div className="container">
                            <br /><br />
                            <h3 className="mt-3 text-info text-center">There is no project created.Please create a project by clicking on below button.</h3>
                            <br /><br />
                            <Link href="/new">
                                <p className="btn btn-link btn-block border"><i className="fas fa-2x fa-plus-circle"><span> Create New Project</span></i></p>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            {(loading) ? (
                                <>
                                    <div title="Create New Project" className="newProjectBtn" onClick={() => Router.push('/new')}><i className="fas fa-4x fa-plus-circle"></i></div>


                                    <div className="container">
                                        <div className="row">
                                            {/* First Column of list of Projects */}
                                            <div className="col-md-6">
                                                {/* Tabs navs */}
                                                <ul className="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
                                                    <li className="nav-item" role="presentation">
                                                        <a className="nav-link active" id="ex3-tab-1" data-mdb-toggle="tab" href="#ex3-tabs-1" role="tab" aria-controls="ex3-tabs-1" aria-selected="true"><i className="fas mr-2 fa-1x fa-id-card"></i> Card View</a>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <a className="nav-link" id="ex3-tab-2" data-mdb-toggle="tab" href="#ex3-tabs-2" role="tab" aria-controls="ex3-tabs-2" aria-selected="false"><i className="fas fa-1x mr-2 fa-th-list"></i> List View</a>
                                                    </li>
                                                </ul>
                                                {/* Tabs navs */}
                                                {/* Tabs content */}
                                                <div className="tab-content" id="ex2-content">
                                                    <div className="tab-pane fade show active" id="ex3-tabs-1" role="tabpanel" aria-labelledby="ex3-tab-1">
                                                        <div className="containerProjectsList">
                                                            {
                                                                firestoreData.map((v, i) => {
                                                                    return <div className="blockProject" key={i}>
                                                                        <div className="card">
                                                                            <div onClick={() => goToDetails('projectDetails', i)} className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                                                                <img src="/resources/staffLogo.png" className="img-fluid img-card" />
                                                                                <a onClick={() => goToDetails('projectDetails', i)}>
                                                                                    <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }} />
                                                                                </a>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <h5 className="card-title">{v.ProjectName}</h5>
                                                                                <p className="card-text">
                                                                                    {v.createAt}
                                                                                </p>
                                                                                <a onClick={() => goToDetails('projectDetails', i)} className="btn btn-link border">Go to Project</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="ex3-tabs-2" role="tabpanel" aria-labelledby="ex3-tab-2">
                                                        <div className="containerProjectsList">
                                                            {
                                                                firestoreData.map((v, i) => {
                                                                    return <div className="listProject" key={i}>
                                                                        <div className="card2">
                                                                            <div onClick={() => goToDetails('projectDetails', i)} className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                                                                <a onClick={() => goToDetails('projectDetails', i)}>
                                                                                    <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }} />
                                                                                </a>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <h3 className="card-title2">{v.ProjectName}</h3>
                                                                                <h5><b>Current Stage:</b> <span className="text-warning">"{v.CurrentStage}"</span></h5>
                                                                                <h5><b>Current Stage Active Task:</b> <span className="text-info">"{v.CurrentStageCurrentTask}"</span> </h5>
                                                                                <h5><b>Project Started At:</b> <span className="text-success">{v.ProjectStartingDate}</span></h5>
                                                                                <h5><b>Project Ending At(Estimated) :</b> <span className="text-danger">{v.ProjectEndingDate}</span></h5>
                                                                                <p className="card-text">
                                                                                    {v.createAt}
                                                                                </p>
                                                                                <a onClick={() => goToDetails('projectDetails', i)} className="btn btn-link border">Go to Project</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Tabs content */}
                                            </div>
                                            {/* First Column of list of Projects */}

                                            {/* Second Column of list of Exterior and Commercial */}
                                            <div className="col-md-3">
                                                <h1>
                                                    Exterior
                                                </h1>
                                                <hr />
                                                <br /><br /><br /><br /><br /><br />
                                                <hr />
                                                <h1>
                                                    Commercial
                                                </h1>
                                            </div>
                                            {/* Second Column of list of Exterior and Commercial */}

                                            {/* Third Column of General Tasks */}
                                            <div className="col-md-3">
                                                <h1 className='text-danger'>TASKS: </h1>
                                                <ul className="ml__2">
                                                    <ol>
                                                        <h3 className="border text-warning text-weightLight">My task</h3>
                                                    </ol>
                                                    <ol>
                                                        <h3 className='mt-4 border text-warning text-weightLight'>Marketing</h3>
                                                    </ol>
                                                    <ol>
                                                        <h3 className="mt-4 border text-warning text-weightLight">Const Supervision</h3>
                                                    </ol>
                                                    <ol>
                                                        <h3 className='mt-4 border text-warning text-weightLight'>Finance</h3>
                                                    </ol>
                                                    <ol>
                                                        <h3 className='mt-4 border text-warning text-weightLight'>Given Task</h3>
                                                    </ol>
                                                </ul>
                                            </div>
                                            {/* Third Column of General Tasks */}


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
        </div>
    )
}
const mapStateToProps = (state) => ({
    user_data: state.auth.USER
})
const mapDispatchToProp = (dispatch) => ({
    setCurrentKey: (data) => dispatch(setCurrentKey(data))
})
export default connect(mapStateToProps, mapDispatchToProp)(Admin);

import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setCurrentKey } from "../../store/index";
import firebase from '../../firebase/index';
import 'firebase/firestore';
import Router from 'next/router'
import 'firebase/auth';
import Link from "next/link"
import Navbar from "../../Components/Navbar";
import DatePicker from 'react-date-picker/dist/entry.nostyle';

const Main = () => {
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

    //For navigating to specified console
    const navigateToSpecifiedPage = (e) => {
        (e == "Finance") ? (
            // alert("Finance team welcome")
            Router.push("/department/finance")
        ) :
            (e == "Staff") ? (
                // alert("Staff team welcome")
                Router.push("/department/staff")
            ) :
                (e == "Admin") ? (
                    //alert("Admin team welcome")
                    Router.push("/admin")
                ) :
                    (
                        // alert("Market team welcome")
                        Router.push("/department/market")
                    )
    }

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

            <h1 className="text-center text-primary">Choose your Department</h1>
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <button className="btn-primary main-buttons" onClick={() => navigateToSpecifiedPage("Marketing")}>Marketing Management</button>
                    </div>
                    <div className="col-md-6 text-center">
                        <button className="btn-warning main-buttons" onClick={() => navigateToSpecifiedPage("Finance")}>Finance Management</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 text-center">
                        <button className="btn-info main-buttons" onClick={() => navigateToSpecifiedPage("Staff")}>Staff Management</button>
                    </div>
                    <div className="col-md-6 text-center">
                        <button className="btn-success main-buttons" onClick={() => navigateToSpecifiedPage("Admin")}>Admin Management</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Main;


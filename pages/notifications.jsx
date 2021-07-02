import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setCurrentKey } from "../store/action/index";
import firebase from '../firebase/index';
import 'firebase/firestore';
import Router from 'next/router'
import 'firebase/auth';
import Link from "next/link"
import Navbar from "../Components/Navbar";
// const Logo = require("../resources/staffLogo.png");

const currentDate = new Date();
const Notification = (props) => {
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
            db.collection(`Data/Notifications/${signedInUserData.email}`)
                .get()
                .then(snapshot => {
                    let data = [];
                    snapshot.forEach(element => {
                        data.push(Object.assign({
                            id: element.id,
                            "ProjectName": element.ProjectName,
                            "ProjectMembers": element.ProjectMembers,
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

    const UpdateTheData = () => {
        //console.clear()
        const db = firebase.firestore();
        db.collection(`Data/Notifications/${signedInUserData.email}`)
            .get()
            .then(snapshot => {
                let data = [];
                snapshot.forEach(element => {
                    data.push(Object.assign({
                        id: element.id,
                        "ProjectName": element.ProjectName,
                        "ProjectMembers": element.ProjectMembers,
                        "createAt": element.createAt,
                    }, element.data()))
                })
            
                // if (firestoreData.length != data.length) {
                    setFirestoreData(data);
                    setLoading(true);
                    console.log("Updated")
                // }
            }).catch(err => {
                console.log(err)
            })
    }

    const goToDetails = (e, key) => {
        props.setCurrentKey(key);
        Router.push(`/${e}`);
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
            <div className="container">
                <hr />
            </div>

            {(status) ? (
                <div onMouseOver={()=>UpdateTheData()}>
                    {(firestoreData.length == 0) ? (
                        <div className="container">
                            <br /><br />
                            <h3 className="mt-3 text-info text-center">There are no notifications yet.</h3>
                        </div>
                    ) : (
                        <div>
                            {(loading) ? (
                                <div className="container">
                                    <div className="containerProjectsList">
                                        {
                                            firestoreData.map((v, i) => {
                                                return <div key={i}>
                                                    <div className="alert alert-primary" role="alert">
                                                        Only <span className="text-danger">'{v.DaysLeft}'</span> days are left in the ending of Project named <span className="text-primary">'{v.ProjectName}'</span> !
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
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
const mapDispatchToProp = (dispatch) => ({
    setCurrentKey: (data) => dispatch(setCurrentKey(data))
})
export default connect(mapStateToProps, mapDispatchToProp)(Notification);

import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setCurrentKey } from "../store/action/index";
import firebase from '../firebase/index';
import 'firebase/firestore';
import Router from 'next/router'
import 'firebase/auth';
import Link from "next/link"
import Navbar from "../Components/Navbar";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
// const Logo = require("../resources/staffLogo.png");

const currentDate = new Date();
const Staff = (props) => {
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

            {(status) ? (
                <div>
                    {(firestoreData.length == 0) ? (
                        <div className="container">
                            <br /><br />
                            <h3 className="mt-3 text-info text-center">There is no project created.Please create a project by clicking on below button.</h3>
                            <br /><br />
                            <p className="btn btn-link btn-block border"><i className="fas fa-4x fa-plus-circle"><Link href="/new"> Create New Project</Link></i></p>
                        </div>
                    ) : (
                        <div>
                            {(loading) ? (
                                <>
                                    <div title="Create New Project" className="newProjectBtn" onClick={() => Router.push('/new')}><i className="fas fa-4x fa-plus-circle"></i></div>
                                    <div className="container">
                                        <h1 className="text-center">All your projects are here.</h1>
                                        <p className="text-center text-info">Click on a project to start working over it.</p>
                                    </div>
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
const mapDispatchToProp = (dispatch) => ({
    setCurrentKey: (data) => dispatch(setCurrentKey(data))
})
export default connect(mapStateToProps, mapDispatchToProp)(Staff);

import { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from '../firebase/index';
import 'firebase/firestore';
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
                <div>
                    {(loading) ? (
                        <>
                            <div className="container">
                                <h1 className="text-center">All your projects are here.</h1>
                                <p className="text-center text-info">Click on a project to start working over it.</p>
                            </div>
                            <div className="containerProjectsList">
                                {
                                    firestoreData.map((v, i) => {
                                        return <div className="blockProject" key={i}>
                                            <div className="card">
                                                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                                    <img src="/resources/staffLogo.png" className="img-fluid img-card" />
                                                    <a href="#!">
                                                        <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }} />
                                                    </a>
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title">{v.ProjectName}</h5>
                                                    <p className="card-text">
                                                        Created At 20/10/2010
                                                    </p>
                                                    <p className="btn btn-link border"><Link href="/projectDetails">Go to Project</Link></p>
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
export default connect(mapStateToProps, null)(Staff);

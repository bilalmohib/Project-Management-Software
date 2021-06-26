import { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from '../firebase/index';
import 'firebase/firestore';
import 'firebase/auth';
import Navbar from "../Components/Navbar";
import DatePicker from 'react-date-picker/dist/entry.nostyle';

const currentDate = new Date();
const Staff = (props) => {
    const [firestoreData, setFirestoreData] = useState([]);
    const [status, setStatus] = useState(false);
    const [loading,setLoading] = useState(false);
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
                <div className="container">
                    {(loading) ? (
                        <>
                            <h1>All your projects are here</h1>
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

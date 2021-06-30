import { useEffect, useState } from "react";
import { connect } from "react-redux";
import firebase from '../firebase/index';
import 'firebase/firestore';
import Router from 'next/router'
import 'firebase/auth';
import Link from "next/link"
import Navbar from "../Components/Navbar";

const Admin = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(null);
    const [allAlertData, setAllAlertData] = useState([]);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setStatus(true);
                loadData();
            }
            else {
                setStatus(false)
            }
        })
    }, [])

    const reset_password = () => {
        var auth = firebase.auth();
        var emailAddress = "info@alumtec.ca";
        auth.sendPasswordResetEmail(emailAddress).then(function () {
            // alert(`A password reset email has been sent to ${emailAddress}.`)
        }).catch(function (error) {
            // An error happened.
            alert(error)
            // return;
        });
        alert(`A password reset email has been sent to ${emailAddress}.`)
    }

    const loadData = () => {
        let alertData = [];
        //Taking data from job vacancy form
        firebase.database().ref(`JobVacancies/`).on('value', (snapshot) => {
            snapshot.forEach(function (data) {
                alertData.push(data.val())
            })
            //console.log(jobData);
            setAllAlertData(alertData);
        })
    }

    const login = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // console.log("The user is logged in and data is: " + user);
                alert("Logged in successfully")
                setStatus(true)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
                alert(errorMessage)
            });
    }

    const sign_out = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            alert("Signed Out Successfully");
            setStatus(false)

        }).catch((error) => {
            // An error happened.
            console.log(error)
            alert(error);
        });

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
            {/* Background image */}
            <div id="intro" className="bg-image shadow-2-strong">
                <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <form action="javascript:void(0);" className="bg-white  rounded-5 shadow-5-strong p-5">
                                    {/* Email input */}
                                    <div className="mb-4">
                                        <input type="email" placeholder="Email" className="form-control" />
                                    </div>
                                    {/* Password input */}
                                    <div className="mb-4">
                                        <input type="password" placeholder="Password" className="form-control" />
                                    </div>
                                    {/* 2 column grid layout for inline styling */}
                                    <div className="row mb-4">
                                        <div className="col d-flex justify-content-center">
                                            {/* Checkbox */}
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" defaultValue defaultChecked />
                                                <label className="form-check-label" htmlFor="form1Example3">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col text-center">
                                            {/* Simple link */}
                                            <a href="#!">Forgot password?</a>
                                        </div>
                                    </div>
                                    {/* Submit button */}
                                    <button onClick={() => alert("Hello")} className="btn btn-primary btn-block">Sign in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Background image */}
        </>
    )
}
const mapStateToProps = (state) => ({
    user_data: state.auth.USER
})

export default connect(mapStateToProps, null)(Admin);

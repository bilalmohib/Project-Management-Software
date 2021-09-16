import { useEffect, useState } from "react";
import { connect } from "react-redux";
import firebase from '../../firebase/index';
import 'firebase/firestore';
import Router from 'next/router'
import 'firebase/auth';
import Link from "next/link"
import Navbar from "../../Components/Navbar";

const Marketing = (props) => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [status, setStatus] = useState(null);
    const [allAlertData, setAllAlertData] = useState([]);
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
    }, [])

    const reset_password = () => {
        var auth = firebase.auth();
        var emailAddress = "bilalmohib7896@gmail.com";
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
            <div className="container">
                <h1>Marketing</h1>
            </div>
        </>
    )
}
const mapStateToProps = (state) => ({
    user_data: state.auth.USER
})

export default connect(mapStateToProps, null)(Marketing);

import { useState, useEffect } from "react";
import Link from "next/link"
import Router from "next/router"
import { connect } from "react-redux";
import firebase from '../../firebase/index';
import "firebase/auth";
const Navbar = (props) => {
    const [signedInUserData, setSignedInUserData] = useState({});
    const [status, setStatus] = useState(false);

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
    })

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
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {/* Container wrapper */}
                <div className="container">
                    {/* Navbar brand */}
                    <a className="navbar-brand me-2">
                        <img src="https://w7.pngwing.com/pngs/827/265/png-transparent-task-manager-android-es-datei-explorer-file-manager-android-thumbnail.png" width={50} alt="" loading="lazy" style={{ marginTop: '-1px' }} />
                    </a>

                    {/* Toggle button */}
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarButtonsExample" aria-controls="navbarButtonsExample" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars" />
                    </button>
                    {/* Collapsible wrapper */}
                    <div className="collapse navbar-collapse" id="navbarButtonsExample">
                        {/* Left links */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li>
                                <h2 className="text-warning">STAFF MANAGER</h2>
                            </li>
                            {/* Notification dropdown */}
                            <li className="nav-item dropdown">

                            </li>
                            {/* Notification dropdown */}
                        </ul>
                        {/* Left links */}
                        {(status) ? (
                            <div className="d-flex space-evenly">
                                <div className="dropdown">
                                    <a className="dropdown-toggle" role="button" id="dropdownMenuLink" data-mdb-toggle="dropdown" aria-expanded="false">
                                        <img src={signedInUserData.photoURL} className="NavbarUserImage" alt="User Image" title={signedInUserData.name} />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li className="signout" onClick={sign_out}><a className="dropdown-item">Log Out</a></li>
                                        <li className="signout" onClick={() => Router.push('/admin')}><a className="dropdown-item">Admin Page</a></li>
                                        <li className="signout" onClick={() => Router.push('/new')}><a className="dropdown-item">New Project</a></li>
                                        <li className="signout" onClick={() => Router.push('/staff')}><a className="dropdown-item">All Project</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <a onClick={()=>Router.push('/notifications')} className="nav-link hidden-arrow" role="button">
                                        <i className="fas fa-bell text-dark fa-2x" />
                                        <span className="badge rounded-pill badge-notification bg-danger">1</span>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <h5 className="text-primary"><Link href="/">Login</Link></h5>
                        )}

                    </div>
                    {/* Collapsible wrapper */}
                </div>
                {/* Container wrapper */}
            </nav>
            {/* Navbar */}
        </>
    )
}
const mapStateToProps = (state) => ({
    user_data: state.auth.USER
})
// const mapDispatchToProp = (dispatch) => ({
//     set_data: (data) => dispatch(set_data(data))
//   })
export default connect(mapStateToProps, null)(Navbar);
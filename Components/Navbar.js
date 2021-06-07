import { useState, useEffect } from "react";
import Link from "next/link"
import { connect } from "react-redux";
import firebase from '../firebase/index';
const Navbar = (props) => {
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
                        </ul>
                        {/* Left links */}
                        {(props.user_data.isSignedIn) ? (
                            <div>
                                <div className="dropdown">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-mdb-toggle="dropdown" aria-expanded="false">
                                        <img src={props.user_data.photo} className="NavbarUserImage" alt="User Image" title={props.user_data.name} />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li><a className="dropdown-item" href="#">Log Out</a></li>
                                        <li><a className="dropdown-item" href="#">Admin Page</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
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
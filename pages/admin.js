import {useEffect} from "react";
import { connect } from "react-redux";
const Admin=(props)=>{
    useEffect(()=>{
        console.log("All the data is: ",props.user_data)
    })
    return (
        <>
            {/* Background image */}
            <div id="intro" className="bg-image shadow-2-strong">
                <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <form className="bg-white  rounded-5 shadow-5-strong p-5">
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
                                    <button type="submit" className="btn btn-primary btn-block">Sign in</button>
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

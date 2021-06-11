import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

import firebase from '../firebase/index';
import firebaseAuth from 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { connect } from "react-redux"
import { set_data } from '../store/action/index';


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      isSignedIn: false,
      user_data: []
    }
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }

  componentDidMount = () => {
   
    
    // firebase.firestore().collection('things')
    //   .get()
    //   .then(snapshot => {
    //     let data = [];
    //     snapshot.forEach(element => {
    //       data.push(Object.assign({
    //         id: element.id
    //       }, element.data()))
    //     })
    //     console.log("data=> ", data)
    //   }).catch(err => {
    //     console.log(err)
    //   })


    firebase.auth().onAuthStateChanged(user => {
      // this.setState({ isSignedIn: !!user })
      // console.log("user", user)

      // var positiono = {};
      // if ('geolocation' in navigator) {
      //   // console.log("Geolocation is Available");
      //   navigator.geolocation.getCurrentPosition((position) => {
      //     positiono = position
      //     //  console.log("Latitude==>",position.coords.latitude);
      //     //  console.log("Longitude==>",position.coords.longitude);
      //   })
      // }
      // else {
      //   alert("Geolocation is not supported by this browser.");
      // }

      this.setState({ isSignedIn: !!user })
      // console.log("user", user)

      if (this.state.isSignedIn == true) {
        ////////////////////////////
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        dateTime = dateTime.toString();
        //////////////////////////////

        let userdata = {
          name: firebase.auth().currentUser.displayName,
          email: firebase.auth().currentUser.email,
          photo: firebase.auth().currentUser.photoURL,
          uid: firebase.auth().currentUser.uid,
          isSignedIn: this.state.isSignedIn,
          LoginTime: dateTime
        }
        this.setState({
          user_data: userdata
        })
        this.props.set_data(userdata);
      
        console.log("Simple User===>", user);
      }
      else {
        console.log("Not signed in")
      }
    })

    //console.log("User_Data==> ", user.providerData[0])
    //   console.log("Simple User===>",this.state.user_data);
  }

  componentDidUpdate = () => {
    
    console.log(this.state.isSignedIn)
  }

  // googleSignin = () => {
  //   const auth = firebase.auth();

  //   auth.signInWithPopup(provider)
  //     .then((result) => {
  //       var credential = result.credential;

  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       var token = credential.accessToken;
  //       // The signed-in user info.
  //       var user = result.user;
  //       alert(user)
  //       // ...
  //     }).catch((error) => {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       // The email of the user's account used.
  //       var email = error.email;
  //       // The firebase.auth.AuthCredential type that was used.
  //       var credential = error.credential;
  //       // ...
  //     });

  //   // auth.onAuthStateChanged(user => {
  //   //   if (user) {
  //   //     alert("Signed in successfully==> ", user.displayName);

  //   //   } else {
  //   //     console.log('Not signed in');
  //   //   }
  //   // });
  // }
  render() {
    if (this.state.isSignedIn == true) {
      this.props.set_data(this.state.user_data);
      const {pathname} = Router
      if(pathname == '/' ){
        Router.push('/staff')
     }
    }
    return (
      <div>
        <Head>
          <title>Staff Manager/Home</title>
          <meta name="description" content="Staff manager || Home" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main id="homeMainBody">
          <h1 className="bg-light text-center headingstaff text-warning bg-light mt-3">STAFF MANAGER</h1>
          <section className="login-block">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <form className="md-float-material form-material" action="#" method="POST">
                    <div className="auth-box card">
                      <div className="card-block">
                        <div className="row">
                          <div className="col-md-12">
                            <h3 className="text-center heading">STAFF MANAGER</h3>
                          </div>
                        </div>
                        {/* <div className="form-group form-primary"> <input type="text" className="form-control" name="first_name" defaultValue placeholder="Display name" id="first_name" /> </div>
                      <div className="form-group form-primary"> <input type="text" className="form-control" name="email" defaultValue placeholder="Email" id="email" /> </div>
                      <div className="form-group form-primary"> <input type="password" className="form-control" name="password" placeholder="Password" defaultValue id="password" /> </div>
                      <div className="form-group form-primary"> <input type="password" className="form-control" name="password_confirm" placeholder="Repeat password" defaultValue id="password_confirm" /> </div> */}
                        {/* <div className="row">
                        <div className="col-md-12"> <input type="submit" className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20" name="submit" defaultValue="Signup Now" />  <button type="button" class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20"><i class="fa fa-lock"></i> Signup Now </button> 
                        </div>
                      </div> */}
                        <div className="or-container">
                          <div className="line-separator" />
                          {/* <div className="or-label">or</div> */}
                          <h5>Staff Login</h5>
                          <div className="line-separator" />
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <StyledFirebaseAuth
                              uiConfig={this.uiConfig}
                              firebaseAuth={firebase.auth()}
                            />
                          </div>
                        </div> <br />
                        <p className="text-inverse text-center">Dont have an account? <a href="<?= base_url() ?>auth/login" data-abc="true">Contact Here</a></p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

      </div>
    )
  }
}
//const mapStateToProps = (state) => ({
  // projects_data: state.app.GET_PROJECTS_DATA
//})
const mapDispatchToProp = (dispatch) => ({
  set_data: (data) => dispatch(set_data(data))
})
export default connect(null, mapDispatchToProp)(Home);
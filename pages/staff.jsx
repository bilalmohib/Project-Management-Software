import { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from '../firebase/index';
import 'firebase/firestore';

import Navbar from "../Components/Navbar";

import DatePicker from 'react-date-picker/dist/entry.nostyle';


const currentDate = new Date();
const Staff = (props) => {
    const [firestoreData, setFirestoreData] = useState([]);

    useEffect(() => {
        console.log("All the data in the staff component is: ", firestoreData);

        const db = firebase.firestore();

        db.collection('Data/abc/123')
            .get()
            .then(snapshot => {
                let data = [];
                snapshot.forEach(element => {
                    data.push(Object.assign({
                        id: element.id,
                        name: element.name,
                        uid: '123',
                        createAt: element.createAt,
                        UniqueID: element.id
                    }, element.data()))
                })
                console.log("data=> ", data)
                if (firestoreData.length != data.length) {
                    setFirestoreData(data);
                    console.log("Updated")
                }


            }).catch(err => {
                console.log(err)
            })
    })

    
    const addData = () => {
        const db = firebase.firestore();

        //For getting the exact time
        const { serverTimestamp } = firebase.firestore.FieldValue;

        let thingsRef = db.collection(`Data/abc/123`);

        // const ref = db.collection(`Data`).doc();
        // const id = ref.id;


        thingsRef.add({
            uid: '123',
            name: "Muhammad Bilal",
            createAt: serverTimestamp(),
            // UniqueID: id
        }).then(() => {
            console.log("Data sent");
        })

        db.collection('Data/abc/123')
            .get()
            .then(snapshot => {
                let data = [];
                snapshot.forEach(element => {
                    data.push(Object.assign({
                        id: element.id,
                        name: element.name,
                        uid: '123',
                        createAt: element.createAt,
                        UniqueID: element.id
                    }, element.data()))
                })
                console.log("data=> ", data)
                // if (firestoreData.length == data.length) {
                setFirestoreData(data);
                // console.log(true);
                // }
                // else {
                //     console.log(false);
                // }

            }).catch(err => {
                console.log(err)
            })

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
             <h1>asdlkfj loremfldksajf lk;dsjfl;ksadjfkl;dsjaflk;jsdaflk;jaskl;dfjsa;klfjs;kldjfkl;sdajfkl;sajdfklsd;af</h1>
            </div>

        </>
    )
}
const mapStateToProps = (state) => ({
    user_data: state.auth.USER
})
export default connect(mapStateToProps, null)(Staff);

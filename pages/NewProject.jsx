//https://stackoverflow.com/questions/58173809/next-js-redirect-from-to-another-page/58182678?sfb=2#58182678
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from '../firebase/index';
import Router from 'next/router'
import 'firebase/firestore';
import 'firebase/auth';
import Navbar from "../Components/Navbar";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
const currentDate = new Date();

const NewProject = (props) => {
    const [firestoreData, setFirestoreData] = useState([]);
    const [stage, setStage] = useState(1);
    const [projectPlan, setProjectPlan] = useState("");
    const [task, setTask] = useState("");
    const [teamMate, setTeamMate] = useState("");
    //Drop Down Selected content
    const [assignee, setAssignee] = useState("");
    const [taskSection, setTaskSection] = useState("");
    //Drop Down Selected content
    const [taskDue, setTaskDue] = useState(currentDate);
    const [taskPriority, setTaskPriority] = useState("");
    const [stageName, setStageName] = useState("");
    const [allStageArray, setAllStageArray] = useState([]);
    const [allTaskArray, setAllTaskArray] = useState([]);
    const [teamMatesArray, setTeamMatesArray] = useState([]);

    useEffect(() => {
//        console.log("All the data in the staff component is: ", projectPlan)

        firebase.auth().onAuthStateChanged(user => {
            setState(true)
            // console.log("user", user)
           
          })
      

        //console.log("All the user data of current signed user: ", props.user_data)

        ///////////////////////////////////This code is for RETRIVING DATABASE data//////////////////////////
        // const db = firebase.firestore();

        // db.collection('Data/abc/123')
        //     .get()
        //     .then(snapshot => {
        //         let data = [];
        //         snapshot.forEach(element => {
        //             data.push(Object.assign({
        //                 id: element.id,
        //                 name: element.name,
        //                 uid: '123',
        //                 createAt: element.createAt,
        //                 UniqueID: element.id
        //             }, element.data()))
        //         })
        //         console.log("data=> ", data)
        //         if (firestoreData.length != data.length) {
        //             setFirestoreData(data);
        //             console.log("Updated")
        //         }


        //     }).catch(err => {
        //         console.log(err)
        //     })
        ///////////////////////////////////This code is for RETRIVING DATABASE data//////////////////////////
    })

    const addtasks = () => {
        //let tasksArray = [];

        // let dateObj = new Date();
        // let month = dateObj.getUTCMonth() + 1; //months from 1-12
        // let day = dateObj.getUTCDate();
        // let year = dateObj.getUTCFullYear();

        // let newdate = year + "/" + month + "/" + day;






        let taskobj = {
            taskName: task,
            taskAssignee: assignee,
            taskDue: taskDue.toLocaleDateString(),
            taskPriority: taskPriority,
            taskSection: taskSection,
        }
        // tasksArray.push(taskobj);
        setAllTaskArray([...allTaskArray, taskobj])

        setTask("");
    }

    const addTeamMateInArray = () => {
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (teamMate.match(mailformat)) {
            //alert("Valid email address!");
            setTeamMatesArray([...teamMatesArray, teamMate]);
            setTeamMate("");
        }
        else {
            alert("You have entered an invalid email address!");
            return;
        }
    }

    const addTaskStageInArray = () => {
        if (stageName != "") {
            //alert("Valid stage name to be added!");
            setAllStageArray([...allStageArray, stageName]);
            setStageName("");
        }
        else {
            alert("Please enter a section name to add it!");
            return;
        }
    }

    const setTaskAssignedTo = (e) => {
        let assignedTo = e.target.value
        alert(`${assignedTo} is the assignee you selected`);
        // setCategory(selectCategory);
        setAssignee(assignedTo);
    }

    const addData = () => {
        const db = firebase.firestore();

        //For getting the exact time
        const { serverTimestamp } = firebase.firestore.FieldValue;

        let thingsRef = db.collection(`Data/Projects/${props.user_data.uid}`);

        // const ref = db.collection(`Data`).doc();
        // const id = ref.id;


        thingsRef.add({
            uid: props.user_data.uid,
            ProjectName: projectPlan,
            ProjectMembers: teamMatesArray,
            ProjectStages: allStageArray,
            ProjectTasks: allTaskArray,
            createAt: serverTimestamp(),
            // UniqueID: id
        }).then(() => {
            console.log("Data sent");
        })

        // db.collection('Data/abc/123')
        //     .get()
        //     .then(snapshot => {
        //         let data = [];
        //         snapshot.forEach(element => {
        //             data.push(Object.assign({
        //                 id: element.id,
        //                 name: element.name,
        //                 uid: '123',
        //                 createAt: element.createAt,
        //                 UniqueID: element.id
        //             }, element.data()))
        //         })
        //         console.log("data=> ", data)
        //         // if (firestoreData.length == data.length) {
        //         setFirestoreData(data);
        //         // console.log(true);
        //         // }
        //         // else {
        //         //     console.log(false);
        //         // }

        //     }).catch(err => {
        //         console.log(err)
        //     })

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
                <div className="row">
                    {(stage == 1) ? (
                        <div className="col-md-4">
                            <h2 className="fontWeight-light" style={{ color: "black" }}>Let's set up your first project</h2>
                            <br />
                            <h5>What's something you and your team are currently working on? <span className="text-danger">*</span> </h5>
                            <br />
                            <input type="text" placeholder="Project Title" value={projectPlan} onChange={(e) => setProjectPlan(e.target.value)} className="form-control" />
                            <br />
                            {
                                (projectPlan == "")
                                    ? (
                                        <>
                                            <span className="text-danger">Please enter the project title to continue</span><br />
                                            <button className="btn btn-secondary btn-continue" disabled={true} onClick={() => setStage(stage + 1)}>Continue</button>
                                        </>
                                    ) : (
                                        <button className="btn btn-secondary btn-continue" onClick={() => setStage(stage + 1)}>Continue</button>
                                    )
                            }
                            {/* <ol>
                            {firestoreData.map((v, i) => {
                                return <li key={i}>
                                    <h5>{v.name}<br /> {v.UniqueID}</h5>
                                </li>
                            })}
                        </ol>
                        <button className="btn btn-primary" onClick={addData}>Add data</button> */}
                        </div>
                    ) :
                        (stage == 2) ? (
                            <div className="col-md-4">
                                {/* <h2 className="fontWeight-light">Let's set up your first project</h2> */}
                                <br />
                                <h5><i className="fas fa-arrow-left fa-lg mr-3" onClick={() => setStage(stage - 1)}></i> &nbsp;&nbsp;Who's working on this project with you? <span className="text-danger">*</span> </h5>
                                <br />
                                <p>Email address</p>
                                <input type="email" required value={teamMate} placeholder="eg : Teammate's email i.e bilalmohib7896@gmail.com" onChange={(e) => setTeamMate(e.target.value)} className="form-control" />

                                <br />
                                <button className="btn btn-info" onClick={addTeamMateInArray}>Add TeamMate</button>
                                <br />
                                <hr />
                                <ol>
                                    {
                                        teamMatesArray.map((v, i) => {
                                            return <li key={i}>
                                                {v}
                                            </li>
                                        })
                                    }
                                </ol>

                                {
                                    (teamMatesArray.length == 0)
                                        ? (
                                            <>
                                                <span className="text-danger">Please add atleast one project member's email to continue</span><br />
                                                <button className="btn btn-secondary btn-continue" disabled={true} onClick={() => setStage(stage + 1)}>Continue</button>
                                            </>
                                        ) : (
                                            <button className="btn btn-secondary btn-continue" onClick={() => setStage(stage + 1)}>Continue</button>
                                        )
                                }


                                {/* <ol>
                            {firestoreData.map((v, i) => {
                                return <li key={i}>
                                    <h5>{v.name}<br /> {v.UniqueID}</h5>
                                </li>
                            })}
                        </ol>
                        <button className="btn btn-primary" onClick={addData}>Add data</button> */}
                            </div>
                        ) :
                            (stage == 3) ? (
                                <div className="col-md-4">
                                    {/* <h2 className="fontWeight-light">Let's set up your first project</h2> */}
                                    <br />
                                    <h5><i className="fas fa-arrow-left fa-lg mr-3" onClick={() => setStage(stage - 1)}></i>&nbsp;&nbsp;How would you group these tasks into sections or stages? What are a few tasks that you have to do for '<b>{projectPlan}</b>' ?</h5>

                                    {/* Bas dekh */}
                                    <br />
                                    <input type="text" value={stageName} placeholder="eg : To do" onChange={(e) => setStageName(e.target.value)} className="form-control" />
                                    <br />
                                    <button className="btn btn-info" onClick={addTaskStageInArray}>Add Section or Stage</button>
                                    <br />
                                    <hr />
                                    <ol>
                                        {
                                            allStageArray.map((v, i) => {
                                                return <li key={i}>
                                                    {v}
                                                </li>
                                            })
                                        }
                                    </ol>

                                    {
                                        (allStageArray.length == 0)
                                            ? (
                                                <>
                                                    <span className="text-danger">Please add atleast one Stage or Section to Continue</span><br />
                                                    <button className="btn btn-secondary btn-continue" disabled={true} onClick={() => setStage(stage + 1)}>Continue</button>
                                                </>
                                            ) : (
                                                <button className="btn btn-secondary btn-continue" onClick={() => setStage(stage + 1)}>Continue</button>
                                            )
                                    }


                                    {/* <ol>
                            {firestoreData.map((v, i) => {
                                return <li key={i}>
                                    <h5>{v.name}<br /> {v.UniqueID}</h5>
                                </li>
                            })}
                        </ol>
                        <button className="btn btn-primary" onClick={addData}>Add data</button> */}
                                </div>
                            ) :
                                (stage == 4) ? (
                                    <div className="col-md-4">
                                        {/* <h2 className="fontWeight-light">Let's set up your first project </h2> */}
                                        <br />
                                        <h4 style={{ color: "grey" }}><i className="fas fa-arrow-left fa-lg mr-2" onClick={() => setStage(stage - 1)}></i>  Congratulations, you've created your first project in Staff Manager!</h4>
                                        <br />
                                        <h5>What are a few tasks that you have to do for '<b>{projectPlan}</b>' ?</h5>
                                        <br />
                                        <h6>Task name :<span className="text-danger">*</span></h6>
                                        <input type="text" value={task} placeholder="eg : Determine project goal add as many as you want you can edit later on" onChange={(e) => setTask(e.target.value)} className="form-control" />
                                        <br />

                                        <h6>Task Assigned to :<span className="text-danger">*</span></h6>
                                        <div className="input-group input-group-md category_select">
                                            <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
                                            <select style={{ fontSize: "15px", width: "200px" }} value={assignee}
                                                onChange={(e) => setTaskAssignedTo(e)} className="form-control">
                                                {["--default--", ...teamMatesArray].map((v, i) => {
                                                    return <option value={v} key={i}>
                                                        {v}
                                                    </option>
                                                })}
                                            </select>
                                        </div>
                                        <br />

                                        <div>
                                            <h6>Due Date for the Task : <span className="text-red">*</span></h6>
                                            <DatePicker
                                                onChange={(val) => setTaskDue(val)}
                                                value={taskDue}
                                            />
                                        </div>

                                        <br />

                                        <h6>Task Priority :<span className="text-danger">*</span></h6>
                                        <div className="input-group input-group-md category_select">
                                            <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
                                            <select style={{ fontSize: "15px", width: "200px" }} value={taskPriority}
                                                onChange={(e) => setTaskPriority(e.target.value)} className="form-control">
                                                <option disabled={true} value="default">--default--</option>
                                                <option value="High">High</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Low">Low</option>
                                            </select>
                                        </div>
                                        <br />

                                        <h6>Task Section :<span className="text-danger">*</span></h6>
                                        <div className="input-group input-group-md category_select">
                                            <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
                                            <select style={{ fontSize: "15px", width: "200px" }} value={taskSection}
                                                onChange={(e) => setTaskSection(e.target.value)} className="form-control">
                                                {["--default--", ...allStageArray].map((v, i) => {
                                                    return <option value={v} key={i}>
                                                        {v}
                                                    </option>
                                                })}
                                            </select>
                                        </div>
                                        <br />

                                        {(task == "" || assignee == "" || taskDue == currentDate || taskPriority == "" || taskSection == "") ? (
                                            <>
                                                <span className="text-danger">Please enter all the fields with <span className="text-danger">*</span> to continue</span><br />
                                                <button className="btn btn-info" disabled={true} onClick={addtasks}>Add task</button>
                                            </>

                                        ) : (
                                            <>
                                                <button className="btn btn-info" onClick={addtasks}>Add task</button>
                                            </>
                                        )}

                                        <br />
                                        <hr />
                                        {/* ProjectName: projectPlan,
            ProjectMembers:teamMatesArray,
            ProjectStages:allStageArray,
            ProjectTasks:allTaskArray,
            createAt: serverTimestamp(), */}
                                        {(projectPlan = "", teamMatesArray.length == 0, allStageArray.length == 0, allTaskArray.length == 0) ? (
                                            <>
                                                <span className="text-danger">Please enter atleast One Stage and One task to continue <span className="text-danger">*</span> to continue</span><br />
                                                <button className="btn btn-secondary btn-continue" disabled={true} onClick={addData}>Take me to my project</button>
                                            </>
                                        ) : (
                                            <button className="btn btn-secondary btn-continue" onClick={addData}>Take me to my project</button>
                                        )}

                                        {/* <ol>
                                {firestoreData.map((v, i) => {
                                    return <li key={i}>
                                        <h5>{v.name}<br /> {v.UniqueID}</h5>
                                    </li>
                                })}
                            </ol>
                            <button className="btn btn-primary" onClick={addData}>Add data</button> */}
                                    </div>
                                ) : (
                                    <span></span>
                                )}

                    <div className="col-md-8" title={`This is a sample preview of your project dear ${props.user_data.name}`}>
                        <table className="table table-bordered">
                            <thead>

                                <tr>
                                    <th colSpan={5}><h2><i className="fas fa-list-alt fa-lg mr-3" style={{ color: "#48dafd" }}></i>&nbsp;&nbsp; {projectPlan}</h2></th>
                                </tr>
                                <tr>
                                    <th scope="col">Task name</th>
                                    <th scope="col">Assignee</th>
                                    <th scope="col">Due date</th>
                                    <th scope="col">Priority</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <>
                                {/* {(stage)?(

                                ):(

                                )} */}


                                {/* This matters */}
                                {allStageArray.map((s, i) => {
                                    return <tbody key={i}>
                                        <tr>
                                            <th scope="row" colSpan={5}><h5><i className="fas fa-chevron-down mr-3"></i>&nbsp; {s}</h5></th>
                                        </tr>
                                        {(allTaskArray.length == 0) ? (
                                            <tr>
                                                <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                                <td>&nbsp;&nbsp;</td>
                                                <td>&nbsp;&nbsp;</td>
                                                <td>&nbsp;&nbsp;</td>
                                                <td>&nbsp;&nbsp;</td>
                                            </tr>
                                        ) : (
                                            allTaskArray.map((v, i) => {
                                                return <tr key={i}>
                                                    {(v.taskSection == s) ? (
                                                        <>

                                                            <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;{v.taskName}</th>
                                                            {(v.taskAssignee == "") ? (
                                                                <td><i className="fas fa-user-circle fa-2x text-primary"></i></td>
                                                            ) : (
                                                                <td>{v.taskAssignee}</td>
                                                            )}

                                                            <td>{v.taskDue}</td>
                                                            {(v.taskPriority == "High") ? (
                                                                <td><button type="button" className="btn btn-danger btn-rounded">{v.taskPriority}</button></td>
                                                            ) : (v.taskPriority == "Medium") ? (
                                                                <td><button type="button" className="btn btn-warning btn-rounded">{v.taskPriority}</button></td>
                                                            ) : (v.taskPriority == "Low") ? (
                                                                <td><button type="button" className="btn btn-info btn-rounded">{v.taskPriority}</button></td>
                                                            ) : (
                                                                <td></td>
                                                            )}
                                                            <td><h5>{v.taskSection}</h5></td>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </tr>
                                            })
                                        )}
                                        )
                                    </tbody>
                                })}
                                {/* This matters */}


                                {/* This is commented for now for map to work */}
                                {/* <tr>
                                    <th scope="row" colSpan={5}><h5><i className="fas fa-chevron-down mr-3"></i>&nbsp; {stageName}</h5></th>
                                </tr> */}


                                {/* {(allTaskArray.length == 0) ? (
                                    <>
                                        <tr>
                                            <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                            <td>&nbsp;&nbsp;</td>
                                            <td>&nbsp;&nbsp;</td>
                                            <td>&nbsp;&nbsp;</td>
                                            <td>&nbsp;&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                            <td>&nbsp;&nbsp;</td>
                                            <td>&nbsp;&nbsp;</td>
                                            <td>&nbsp;&nbsp;</td>
                                            <td>&nbsp;&nbsp;</td>
                                        </tr>
                                    </>
                                ) : (

                                    allTaskArray.map((v, i) => {
                                        return <tr key={i}>
                                            <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;{v.taskName}</th>
                                            {(v.taskAssignee.length == "") ? (
                                                <td><i className="fas fa-user-circle fa-2x text-primary"></i></td>
                                            ) : (
                                                <td>{v.taskAssignee}</td>
                                            )}

                                            <td>{v.taskDue}</td>
                                            <td><button type="button" className="btn btn-info btn-rounded">{v.taskPriority}</button></td>
                                            <td><button type="button" className="btn btn-info btn-rounded">{v.taskSection}</button></td>
                                        </tr>
                                    })
                                )} */}
                                {/* This is commented for now for map to work */}

                                {/* <tr>
                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;Determine project goal</th>
                                    <td><i className="fas fa-user-circle fa-2x text-primary"></i></td>
                                    <td>Today-Jun 9</td>
                                    <td><button type="button" className="btn btn-info btn-rounded">Low</button></td>
                                    <td><button type="button" className="btn btn-info btn-rounded">On track</button></td>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;Schedule meeting with client</th>
                                    <td><i className="fas fa-user-circle fa-2x t text-danger"></i></td>
                                    <td>Jun 8 - 10</td>
                                    <td><button type="button" className="btn btn-warning btn-rounded">Medium</button></td>
                                    <td><button type="button" className="btn btn-warning btn-rounded">At risk</button></td>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;Set final deadline</th>
                                    <td><i className="fas fa-user-circle fa-2x t text-danger"></i></td>
                                    <td>Jun 9 - 11</td>
                                    <td><button type="button" className="btn btn-secondary btn-rounded">High</button></td>
                                    <td><button type="button" className="btn btn-danger btn-rounded">On track</button></td>
                                </tr> */}

                                {/* This is commented for now */}
                                {/* <tr>
                                    <th scope="row" colSpan={5}><h5><i className="fas fa-chevron-down mr-3"></i>&nbsp; {stageName}</h5></th>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <th scope="row" colSpan={5}><h5><i className="fas fa-chevron-down mr-3"></i>&nbsp; {stageName}</h5></th>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="far fa-check-circle fa-lg"></i>&nbsp;&nbsp;</th>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;</td>
                                </tr> */}
                                {/* This is commented for now */}
                            </>
                        </table>
                    </div>
                </div>

            </div>

        </>
    )
}
const mapStateToProps = (state) => ({
    user_data: state.auth.USER
})
// const mapDispatchToProp = (dispatch) => ({
//     set_data: (data) => dispatch(set_data(data))
//   })
export default connect(mapStateToProps, null)(NewProject);
import firebase from '../../firebase/index';

const setCurrentKey = (data) => {
    console.log("Hello I am here The key is: ", data);
    return (dispatch) => {
        dispatch({ type: "SETCURRENTKEY", data: data })
    }
}

const set_data = (data) => {
    return (dispatch) => {
        dispatch({ type: "SETDATA", data: data })
    }
}

const get_all_projects_data = () => {
    return (dispatch) => {
        let users = [];
        firebase.database().ref(`Projects/`).on('value', (snapshot) => {
            snapshot.forEach(function (data) {
                console.log("Haaha=>",data.val())
                users.push(data.val())
            })
            dispatch({ type: "GET_PROJECTS_DATA", data: users }) 
            //console.log(users)
        })        
    }
}



export {
    get_all_projects_data,
    setCurrentKey,
    set_data
}
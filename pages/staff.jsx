import {useEffect} from "react";
import { connect } from "react-redux";
const Staff=(props)=>{
    useEffect(()=>{
        console.log("All the data in the staff component is: ",props.user_data)
    })
    return (
        <>
            {/* Background image */}
            <div>
                <h1>Staff</h1>
            </div>
            {/* Background image */}
        </>
    )
}
const mapStateToProps = (state) => ({
  user_data: state.auth.USER
})
// const mapDispatchToProp = (dispatch) => ({
//     set_data: (data) => dispatch(set_data(data))
//   })
export default connect(mapStateToProps, null)(Staff);
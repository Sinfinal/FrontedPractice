import {useParams} from "react-router-dom"
function Edit(){
    const {id =""}=useParams()
    return <p>Edit {id}</p>
}
export default Edit
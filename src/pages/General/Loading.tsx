import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {loginFormRoute} from "../../routes/navRoutes";
import {useDispatch} from "react-redux";
import {getAssumptionsAction} from "../../redux/assumptions/assumptions";

const Loading = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        const getAsm = async () => {
            await dispatch(getAssumptionsAction())

        }
        getAsm().then(()=>history.push(loginFormRoute)).catch(err=>console.log(err));
    }, [dispatch, history])

    return <div>
        Loading
    </div>
}

export default Loading
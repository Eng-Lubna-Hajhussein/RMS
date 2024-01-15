import { useContext } from "react";
import Website from "./shared/website/Website";
import { AppContext } from "contextapi/context/AppContext";

function RouteLandingPage(){
    const {appState,appDispatch} = useContext(AppContext);

    const onSaveUpperHeader = (contacts)=>{
        appState.jsnSystemContact = contacts;
        appDispatch({...appState});
    }

    return (<Website editable={true} onSaveUpperHeader={onSaveUpperHeader}  />)
};

export default RouteLandingPage;
import Popup from "../components/custom/popup";
import { useState } from "react";
import axios from "axios";
export default function Logout() {
    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
    axios.get("http://localhost:8080/sportsmate/member/logout")
    .then(function (response) {
        if(response.status == 202){
        axios.defaults.headers.common['Authorization'] = null;
        setPopup({
            open: true,
            title: "Confirm",
            message: "Logout Success!", 
            callback: function(){
                document.location.href='/'
                }
            });
        }
    }).catch(function (error) {
    //error
    console.log(error);
    });
    return(
        <div>
             <Popup open = {popup.open} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/>
        </div>
    );
}

import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import 'moment/locale/ko'
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios'
import Participation from './Participation'
import {useState} from 'react'
moment.locale("ko")
const localizer = momentLocalizer(moment)
export default function MyCalendar(props){
  const [participation, setParticipation] = useState({open: false, callback: false});
  console.log(participation)
  return (
    <div style={{height:500}}>
      <Participation open = {participation.open} setPopup = {setParticipation} schedule_id={participation.schedule_id} party_id = {props.party_id} viewdata={participation.viewdata} callback = {participation.callback}/>
      <Calendar
        localizer={localizer}
        events={props.event}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={event => {
          axios.get(`http://localhost:8080/sportsmate/party/${props.party_id}/schedule/${event.id}`)
          .then(function (response) {
              if(response.status == 200){ 
                setParticipation({
                  open: true,
                  schedule_id: event.id,
                  party_id: props.party_id,
                  viewdata:response.data ,
                  callback: function(){
                  }
                });
              }
              }).catch(function (error) {
              console.log(error);
          })
        }
        }
      />
    </div>
  )
}

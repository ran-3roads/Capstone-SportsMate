import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import 'moment/locale/ko'
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("ko")
const localizer = momentLocalizer(moment)


const MyCalendar = (props) => (
    <div style={{height:500}}>
      <Calendar
        localizer={localizer}
        events={props.event}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )

  export default MyCalendar;
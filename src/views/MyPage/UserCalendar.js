import React, { useState, useEffect, useRef } from "react";
import "./Calendar.css";
//Fullcalendar and Realted Plugins
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed
import axios from "axios";
import Footer from "../Footer/Footer";

const acToken = sessionStorage.getItem("accesstoken");

function UserCalendar(props) {
  const [event, setEvent] = useState({});

  const baseUrl = "/api/v1/calendar/" + props.memberId;

  useEffect(() => {
    getCalendar();
  }, []);

  async function getCalendar() {
    await axios
      .get(baseUrl, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      })
      .then((response) => {
        if (
          response.data.result !== "undefined" &&
          response.data.result !== null
        ) {
          setEvent(response.data.result);
          console.log(event);
        }
      })
      .catch((error) => {
        alert(error.response.data.errorMessage);
      }); //실패했을 때
  }

  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <img className="eventimage" alt="urlImg" src={eventInfo.event.url} />
      </div>
    );
  };

  return (
    <div>
      <div className="maincontainer">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            center: "title",
            left: "",
          }}
          initialView="dayGridMonth"
          eventContent={renderEventContent}
          events={event}
          contentHeight={"800px"}
          windowResize={true}
          locale={"ko"}
          fixedWeekCount={false}
        />
      </div>
    </div>
  );
}

export default UserCalendar;

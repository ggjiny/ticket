import React, { useState, useEffect, useRef } from "react";
import "./Calendar.css";
//Fullcalendar and Realted Plugins
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed
import axios from "axios";
import useDidMountEffect from "./useDidMountEffect";
import moment from "moment";
const acToken = sessionStorage.getItem("accesstoken");

function Calendar() {
  const [date, setDate] = useState({
    date: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [img, setImg] = useState({
    file: "",
    pURL: "",
  });

  const [event, setEvent] = useState({});
  const [newEvent, setNewEvent] = useState({
    date: "",
    imgUrl: "",
  });
  let formData = new FormData();

  const baseUrl = "/api/v1/calendar";
  const baseUrl2 = "/api/v1/file?category=calendar";

  useEffect(() => {
    calendar();
  }, []);

  useDidMountEffect(() => {
    console.log(date);
    setDisabled(false);

    if (date !== "") {
      formData.append("files", img.file);
      setDisabled(true);
    }

    console.log(img.file);
    add_file();
  }, [img]);

  useDidMountEffect(() => {
    console.log(newEvent);
    post_calendar();
  }, [newEvent]);

  async function add_file() {
    await axios
      .post(baseUrl2, formData, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      })
      .then((response) => {
        if (
          response.data.result !== "undefined" &&
          response.data.result !== null
        )
          console.log("success!");
        console.log(response.data.message);
        setNewEvent({
          ...newEvent,
          date: date.date,
          imgUrl: response.data.message,
        });
        //alert("파일 보내기 성공!");
      })
      .catch((error) => {
        alert("달력을 불러오지 못했습니다.");
        console.log(error);
      }); //실패했을 때
  }

  async function post_calendar() {
    await axios
      .post(baseUrl, newEvent, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (
          response.data.result !== "undefined" &&
          response.data.result !== null
        )
          console.log("success!");
        console.log(response);
        alert("사진이 저장되었습니다.");
        calendar();
      })
      .catch((error) => {
        alert("입력이 잘못 되었습니다.");
        console.log(error);
      }); //실패했을 때
  }

  async function calendar() {
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
        console.log(error);
      }); //실패했을 때
  }

  const handleFile = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImg(() => ({
        ...img,
        file: file,
        pURL: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

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
          dateClick={(args) => {
            setDate({ ...date, date: args.dateStr });
            setDisabled(false);
            //console.log(e);
          }}
          eventContent={renderEventContent}
          events={event}
          contentHeight={"800px"}
          windowResize={true}
          locale={"ko"}
          fixedWeekCount={false}
        />
      </div>
      <form id="imgf" style={{ marginTop: "-210px", marginLeft: "0px" }}>
        <h2>캘린더에 사진을 추가하세요.</h2>
        {/* <label for="files" style={{ display: "none" }}></label> */}
        <input
          type="file"
          name="files"
          id="imageBtn"
          accept="img/*"
          onChange={handleFile}
          disabled={disabled}
        />
      </form>
    </div>
  );
}

export default Calendar;

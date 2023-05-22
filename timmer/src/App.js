import React, {  useState } from "react";
import useSound from "use-sound";


function App() {

  const soundUrl = "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav";

  //to make the state 25 min need to multiply 25*60 sec
const [breakLength, setBreakLength] = useState(2);
const [sessionLength, setSessionLength] = useState(3) ;
const [displayTime, setDisplayTime] = useState(5);
const [timerOn, setTimerOn] = useState(false);
const [onBreak, setOnBreak] = useState(false);
//to get audio file from folder
 const [play,{pause}] = useSound(soundUrl);


const formatTime = (displayTime) => {

  let minutes = Math.floor(displayTime / 60);
  let seconds = displayTime - minutes *60;
  return (
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds)
  );
};



 const changeTime = (amount, type) => {
    if (type === "break") {
      //check if time not going to be less than 60sec
      if (breakLength <= 1 && amount < 0) {
        return;
      }
      setBreakLength((prev) => prev + amount);
    } else {
      if (sessionLength <= 1 && amount < 0) {
        return;
      }
      setSessionLength((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(displayTime + amount);
      }
    }
  };
function controlTimer() {
  //make seconds to miliseconds
  let second = 1000;
  //get accurate time
  let date = new Date().getTime();
  let nextDate = new Date().getTime() + second;
  let onBreak = false;

  if (!timerOn) {
    let interval = setInterval(() => {
      date = new Date().getTime();
      if (date > nextDate) {
        setDisplayTime((prev) => {

          if (prev <= 0 && !onBreak) {
            
            play.currentTime = 0;
  play();
            onBreak = true;
            setOnBreak(true);
            // setSessionLength(25);
            return breakLength;
          } else if (prev <= 0 && onBreak) {
            play.currentTime = 0;
            play();
            onBreak = false;
            setOnBreak(false);
            //setSessionLength(25);
            return sessionLength;
          }
          return prev - 1;
        });
        nextDate += second;
      }
      //interval set to 30 miliseconds to make timer more accurate
    }, 30);
    //store id to clear interval
    localStorage.clear();
    localStorage.setItem("interval-id", interval);
  }
  if (timerOn) {
    clearInterval(localStorage.getItem("interval-id"));
  }
  setTimerOn(!timerOn);

}
function resetTimer() {
  setDisplayTime(1500);
  setBreakLength(5 );
  setSessionLength(25 );
  setTimerOn(false);
  clearInterval(localStorage.getItem("interval-id"));
  resetAudio();
}
function resetAudio() {
  pause();
}

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="container">
      <BreakLenght
        title={"Break Length"}
        changeTime={changeTime}
        type={"break"}
        time={breakLength}
        
      />
      <SessionLenght
        title={"Session Length"}
        changeTime={changeTime}
        type={"session"}
        time={sessionLength}
        
      />
      <Timer
        displayTime={displayTime}
        timerOn={timerOn}
        controlTimer={controlTimer}
        resetTimer={resetTimer}
        title={"Session" || "Break"}
        formatTime={formatTime}
        ref={play}
      
      />
     </div>
    </div> 
  );
  function BreakLenght({title, changeTime, type}) {
    return (
      <div>
        <h3 id="break-label">{title}</h3>
        <div className="time-sets">
          <button id="break-decrement" className="btn-level" value="-" onClick={()=>changeTime(-1,type)}>
            <i className="fa fa-arrow-down fa-2x"></i>
          </button>
           <h3 id="break-length">{breakLength}</h3> 
          <button id="break-increment" className="btn-level" value="+" onClick={()=>changeTime(+1, type)}>
            <i className="fa fa-arrow-up fa-2x"></i>
          </button>
        </div>
      </div>
    );
  }
  function SessionLenght({title, changeTime, type}) {
    return (
      <div>
        <h3 id="session-label">{title}</h3>
        <div className="time-sets">
          <button id="session-decrement" className="btn-level" value="-" onClick={()=>changeTime(-1,type)}>
            <i className="fa fa-arrow-down fa-2x"></i>
          </button>
           <h3 id="session-length">{sessionLength}</h3> 
          <button id="session-increment" className="btn-level" value="+" onClick={()=>changeTime(+1, type)}>
            <i className="fa fa-arrow-up fa-2x"></i>
          </button>
        </div>
      </div>
    );
  }

function Timer({displayTime,controlTimer,resetTimer,onBreak, formatTime}) {
  
  return (
    <div className="timer-wrap"> 
    <div className="timer-container">
      <h3 id="timer-label">{onBreak?  "Session" : "Break"}</h3>
      <h2 id="time-left">{formatTime(displayTime)}</h2>
      </div>
      <div className="timer-control">
        <button id="start_stop" onClick={controlTimer } >
          <i className="fa fa-play fa-2x"></i>
          <i className="fa fa-pause fa-2x"></i>
          <audio
          id="beep"
          preload="auto"
          type="audio/mpeg"
          
          src ="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>
        </button>
        <button id="reset" onClick={resetTimer}>
          <i className="fa fa-refresh fa-2x"></i>
        </button>
        
      </div>
  </div>
  );
  }






}

export default App;

// function App() {
//   const [breakLength, setBreakLength] = React.useState(5 * 60);

//   //to make the state 25 min need to multiply 25*60 sec
//   const [sessionLength, setSessionLength] = React.useState(25 * 60);
//   // const [timerMinute, setTimerMinute] = React.useState(25);
//   // const [intervalId, setIntervalId] = React.useState(null);
//   // const [currentTimer, setCurrentTimer] = React.useState('Session');
//   // const [isPlay, setIsPlay] = React.useState(false);
//   // const [timerSecond, setTimerSecond] = React.useState(0);

//   const formatTime = (time) => {
//     let minutes = Math.floor(time / 60);
//     let seconds = time % 60;
//     return (
//       (minutes < 10 ? "0" + minutes : minutes) +
//       ":" +
//       (seconds < 10 ? "0" + seconds : seconds)
//     );
//   };
//   return (
//     <div className="App">
//       <h1>25 + 5 Clock</h1>
//       <BreakLenght
//         title={"Break Length"}
//         changeTime={null}
//         type={"break"}
//         time={breakLength}
//         formatTime={formatTime}
//       />
//       <h2>{formatTime(sessionLength)}</h2>
//     </div>
//   );
//   function BreakLenght(title, changeTime, type, time, formatTime) {
//     return (
//       <div>
//         <h3 id="break-label">{title}</h3>
//         <div className="time-sets">
//           <button id="break-decrement" className="btn-level" value="-">
//             <i className="fa fa-arrow-down fa-2x"></i>
//           </button>
//           <h3 id="break-length">{formatTime(time)}</h3>
//           <button id="break-increment" className="btn-level" value="+">
//             <i className="fa fa-arrow-up fa-2x"></i>
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;

import React, { useState, useEffect, useRef } from 'react';
import './FaceRegister.css';
import { useNavigate } from 'react-router-dom';
import Page from './Page';
import Button from './Button';

function FaceDetection() {
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const nav = useNavigate();
  const stateObject = { prediction: prediction};

  const videoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleStartRecording = () => {
    setRecording(true);
    const stream = videoRef.current.srcObject;
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.addEventListener('dataavailable', event => {
      chunks.push(event.data);
    });

    mediaRecorder.addEventListener('stop', () => {
      const blob = new Blob(chunks, { type: 'video/mp4' });
      setVideoBlob(blob);
    });

    mediaRecorder.start();
    setTimeout(() => {
      mediaRecorder.stop();
      setRecording(false);
    }, 5000);
  };
 

  const handleSendVideo = async() => {
    // send videoBlob to server using your preferred method
    const formData = new FormData();
    formData.append('video', videoBlob);

    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    setPrediction(data.message);


    if (response.ok) {
      console.log('Video uploaded successfully');
    } else {
      console.error('Failed to upload video');
    }
    console.log(videoBlob);
    //nav("/main", { state: stateObject })
  };


 

  return (
    <><div className='headings'>Face Recognition Attendence System</div><div>
      <div className='video_contain' >
              <video className='video'  ref={videoRef} autoPlay></video>
              
             
                <div className='name'>
                   <div className='inst'><b>Instructions</b>: <hr></hr>
                                               1. Click on Record button 
                                      <br></br>2. Timer is set for 5 seconds    
                                      <br></br>3. In 5 sec ,try to show diffrent expressions,don't keep blank face.
                                      <br></br>4. Anyone else should'nt be in the frame 
                                      <br></br>5. Avoid hiding your face and both of your eyes should be visible all the time 
                  </div>
                  {videoBlob && (<Button handleSendVideo = {handleSendVideo}/>)}
                  <div className='pred_div'>
                  <h3 className='name_head'>Welcome ! </h3>
                  {prediction && (             
                        <h2 className='pred'>Hi {prediction} !</h2>       
                   )}
                 
                </div>
                </div>
           
      </div>
      {recording ? (
        <button className='btn_record' disabled>Recording...</button>
      ) : (
        <button className='btn_record' onClick={handleStartRecording}>Record</button>
      )}
     
    </div></>
  );
}
export default FaceDetection;
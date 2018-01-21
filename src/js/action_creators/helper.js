import {push} from "react-router-redux";

export const redirectOnUnAuthorized = (dispatch, error) => {
  if(
    error &&
    error.response &&
    error.response.status &&
    error.response.status == 401
  ){
    dispatch(push('/authentication/sign_in'));
  }else{
    throw error;
  }
};

export const speak = (text) => {
  if(window.SpeechSynthesisUtterance){
    const sounds = [
      [11, "Fred"], [32, "Samantha"], [40, "Victoria"]
    ];
    var msg = new SpeechSynthesisUtterance(text);
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[sounds[1][0]]; // Note: some voices don't support altering params
    msg.voiceURI = sounds[1][1];
    // msg.volume = 1; // 0 to 1
    // msg.rate = 1; // 0.1 to 10
    // msg.pitch = 2; //0 to 2
    msg.text = text;
    msg.lang = 'en-US';
    window.setTimeout(
      () => window.speechSynthesis.speak(msg),
      1000
    );
  }
};


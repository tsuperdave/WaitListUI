import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  GoogleReCaptchaProvider
} from 'react-google-recaptcha-v3';
import {
  Translator
} from 'react-translator-component';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_GCAPTCHA_SECRET}>
      <Translator>
        <App />
      </Translator>          
    </GoogleReCaptchaProvider>  
  </>
);

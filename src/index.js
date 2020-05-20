'use strict';

import { calc } from './modules/calc';
import accordionTwo from './modules/accordionTwo';
import modalsClose from './modules/modalsClose';
import popUpConsultation from './modules/popUpConsultation';
import popUpCheck from './modules/popUpCheck';
import popUpDiscount from './modules/popUpDiscount';
import popUpCall from './modules/popUpCall';
import moreBtn from './modules/moreBtn';
import sendForm from './modules/sendForm';
import maskPhone from './modules/maskPhone';


window.addEventListener('DOMContentLoaded', function(){  // фукнция запускается после загрузки DOM

  modalsClose();

  popUpCall();

  // PopUpDiscount

  popUpDiscount();

  // PopUpCheck

  popUpCheck();

  // PopUp Consultation

  popUpConsultation();

  // Accordion

  accordionTwo();

  // Accordion-constructor

  calc();
  
  // Phone mask

  maskPhone();

  // More
  
  moreBtn();  

  // Send Form + Input Validation

  sendForm();

});
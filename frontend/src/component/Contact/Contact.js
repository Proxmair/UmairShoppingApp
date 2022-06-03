import React, { Fragment, useRef, useState } from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import emailjs from 'emailjs-com'
import SendIcon from '@mui/icons-material/Send';
import { useAlert } from "react-alert";
import './Contact.css'
const Contact = () => {
  const form = useRef();
  const alert = useAlert();
  const [mailerName, setmailerName] = useState("")
  const [mailerEmail, setmailerEmail] = useState("")
  const [mailerMessage, setmailerMessage] = useState("")
  const sendEmail = (e) => {
    e.preventDefault();
    if (mailerName && mailerEmail && mailerMessage) {
      const validMailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (mailerEmail.match(validMailRegex)) {
        setmailerEmail('');
        setmailerName('');
        setmailerMessage('');
        emailjs.sendForm('service_ioefads', 'template_k18rpwi', form.current, 'Em8fBmsEVCuKn56zo')
          .then((result) => {
            alert.success('Your mail is sended successfully')
          }, (error) => {
            alert.error('Something went wrong try again later')
          });
      }
      else{
        alert.error('Invalid Email')  
        setmailerEmail('');
      }
    }
    else {
      alert.error('Missing data either mail name or message')
    }

  };
  return (
    <Fragment>
      <h3 className="contact-heading" >Contact Me</h3>
      <div className="container contact-container">
        <div className="contact-options">
          <article className="contact-option">
            <MailOutlineIcon className='contact-icon' />
            <h4>Email</h4>
            <h5>umair.xmair@gmail.com</h5>
            <a href="mailto:umair.xmair@gmail.com">Send a message</a>
          </article>
          <article className="contact-option">
            <WhatsAppIcon className='contact-icon' />
            <h4>Whatsapp</h4>
            <a href="https://wa.me/+923360336130">Send a message</a>
          </article>
        </div>
        <form ref={form} onSubmit={sendEmail}>
          <input value={mailerName} onChange={(e) => setmailerName(e.target.value)} type="text" name="name" placeholder='Your Full Name' required />
          <input value={mailerEmail} onChange={(e) => setmailerEmail(e.target.value)} type="email" name="email" placeholder='Your email' required />
          <textarea value={mailerMessage} onChange={(e) => setmailerMessage(e.target.value)} name="message" rows="7" placeholder='Your message' required></textarea>
          <div className='contact-button'>
            <button onClick={sendEmail}><p>Send</p><SendIcon /></button>
          </div>
        </form>
      </div>
    </Fragment>
  )
}

export default Contact



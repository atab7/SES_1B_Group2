import React from 'react';
import emailjs from 'emailjs-com';


export default function ContactUs() {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_onar6eb', 'template_9x1hlr9', e.target, 'user_y37OxRmCicn4obS3k4lV0')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />

      <input type="submit" value="Send" />
    </form>
  );
}

//To be integrated with register.js for email confirmation upon signing up --Aryan
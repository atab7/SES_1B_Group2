import React from 'react';
import emailjs from 'emailjs-com';


export default function ContactUs() {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_onar6eb', 'template_aldnmku', e.target, 'user_y37OxRmCicn4obS3k4lV0')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <label>First Name</label>
      <input type="text" name="first_name"/>
      <label>Last Name</label>
      <input type="text" name="last_name" />
      <label>Email</label>
      <input type="email" name="email" />
      <label>Message</label>
      <input type="text" name="message" />

      <input type="submit" value="Send" />
    </form>
  );
}


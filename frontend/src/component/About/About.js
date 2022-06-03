import React from 'react'
import Me from '../../images/MyImage.jpeg'
import './About.css'
import {Link} from 'react-router-dom';
const message = "Developer's Image";
const About = () => {
  return (
    <div className='about-container'>
      <h3 className='about-heading'>About me</h3>
      <div className='about'>
        <div className='about-image'><img src={Me} alt={message} /></div>
        <div className='about-text'>
          <div>
            <h4>Introduction</h4>
            <p>Hi, I am Umair ul Islam. A Full Stack Web app and mobile app MERN developer working and learning for about ten months in this field, the Project you are viewing is a Professional E-Commerce app this is completely developed by me.</p>
          </div>
          <div>
            <h4>Experience</h4>
            <p>Although I was learning to code and was in the field of programming for more than a year but on the development site I had a developing experience of about 10  months in which I had created many small projects like Drum Machine, simple Calculator, I had also earned my certificates while progressing in my passion on software development <a href='https://www.google.com/'>here</a> are all my certificates in this journey</p>
          </div>
          <div>
            <h4>Projects</h4>
            <p>So my flight start with the simple front end development in which for study purposed I developed a basic app like drum machine Simple Calculator and 3 other on React after gathering some experience with the developing in making front end web pages on react I also dive out to backend MVCS architecture development in which I have created some the basic Full stack CRUD app on NodeJS and MongoDB like Diary and 2 other and after some time a Professional Full stack full like this one and 2 other all the above-mentioned Projects are  <a href='https://www.google.com/'>here</a> on my GitHub profile </p>
          </div>
          <div><h4>Services</h4>
            <p>If you are looking for developing upgrading or fixing a MERN stack app you came to the right choice following are the services that I offer</p>
            <li>Removing any kind of bud whether in front end or in backend in MERN stack app.</li>
            <li>Creating any design of webpage with React.</li>
            <li>Developing a complete Professional Full Stack web app according to your need.</li>
            <li>Integrating a Customized Chatbot on your website with react</li></div>
          <div>

            <h4>Contact</h4>
            <p><Link to={`/contact`}>Contact me</Link> for any issues reguarding my services</p>
          </div>



        </div>
      </div>
    </div>
  )
}

export default About
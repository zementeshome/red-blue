import React from 'react'
import fire from '../../fire';
import { useHistory } from 'react-router-dom';
import './Home.scss';
// import Cookies from 'js-cookie';
import earth from '../../assets/images/earth.png';
import mars from '../../assets/images/Planet_Mars.png';

function Home() {
const history = useHistory()
const handleLogout = () => {
    fire.auth().signOut().then(() => {
        history.push('/');
    })
}

// const randomColor = () => {
//     return Math.random() > 0.5 ? "red" : "blue"
// }

// let color = Math.random() > 0.5 ? {earth} : {mars}

// const setCookies = () => {
//     Cookies.set('color')
// }

// const getCookies = () => {
//     Cookies.get('color')
// }

let image = earth
    if (Math.random() <0.5) {
    image = mars
    console.log(image)
}


// getCookie = () => {
//     Cookies.get('color');
// }

// setCookie = () => {
//     Cookies.set('color');
// }



    return (
        <section className="home">
            <h1>Home</h1>
            <button className="home__logout" onClick={handleLogout}>logout</button>
            <div className="home__circle-container">
            <img src={image} alt=""/> 
            {/* <p className="home__circle-colour">image shown: {image}</p> */}
            {/* <div className="home__circle"></div>
            <p className="home__circle-number"></p> */}
            </div>
        </section>
    )
}

export default Home;
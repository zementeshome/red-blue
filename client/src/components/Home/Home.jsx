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

const earthOrMars = new Array('../../assets/images/earth.png', '../../assets/images/Planet_Mars.png')


function displayImage() {
    // return Math.random() > 0.5 ? earth : mars
    return Math.floor(Math.random() * earthOrMars.length / 2)
}

function getCookie(key) {
    const pattern = new RegExp("(?:(?:^|.*;\\s*)" + key + "\\s*\\=\\s*([^;]*).*$)|^.*$")
    return document.cookie.replace(pattern, "$1");
  }


function updateImageCookies() {
    let image = getCookie('earth_or_mars');
    let timesViewed;

    if (image === "") {
    image = displayImage()
    document.cookie = "earth_or_mars=" + image;
    timesViewed = 1;
    document.cookie = "image_views=" + timesViewed
    } else {
    const views = getCookie("image_views");
    timesViewed = parseInt(views, 10) + 1;
    document.cookie = "image_views=" + timesViewed;
    }

    return {image, timesViewed}
}

    const {image, timesViewed} = updateImageCookies()

    // document.getElementsByClassName('home__image').src = image;
    // document.getElementsByClassName('home__number').innerHTML = timesViewed


    return (
        <section className="home">
            <h1>Home</h1>
            <button className="home__logout" onClick={handleLogout}>logout</button>
            <div className="home__circle-container">
        <img src={image} alt=""/>
            {/* <div className="home__circle" style={{backgroundColor: image}}></div> */}
            <p className="home__number">number of times you've visited: {timesViewed}</p>
            </div>
        </section>
    )
}

export default Home;
import React, { useEffect, useState } from "react";
import fire from "../../fire";
import { useHistory } from "react-router-dom";
import "./Home.scss";
// import Cookies from 'js-cookie';
import earth from "../../assets/images/earth.png";
import mars from "../../assets/images/Planet_Mars.png";

function Home() {
  const [image, setImage] = useState("");
  const [timesViewed, setTimesViewed] = useState(null);
  const history = useHistory();
  const handleLogout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      });
  };

  // const earthOrMars = new Array('../../assets/images/earth.png', '../../assets/images/Planet_Mars.png')

  function displayImage() {
    return Math.random() > 0.5 ? mars : earth; // fix this
    // return Math.floor(Math.random() * earthOrMars.length / 2)
  }

  function getCookie(key) {
    const pattern = new RegExp(
      "(?:(?:^|.*;\\s*)" + key + "\\s*\\=\\s*([^;]*).*$)|^.*$"
    );
    return document.cookie.replace(pattern, "$1");
  }

  function updateImageCookies(user) {
    // {
    //     'test@gamil':{
    //         earth_orm:
    //         image_view:2
    //     },

    // }
    
    if (user) {
      let usersCookie = getCookie("users");
      let users = usersCookie ? JSON.parse(getCookie("users")) : {};
      let currentUser = users[user];
      if (!currentUser) {
        currentUser = {};
      }

      let image = currentUser["earth_or_mars"];

      if (!image) {
        image = displayImage();
        currentUser["earth_or_mars"] = image;
        currentUser["image_views"] = 1;
      } else {
        // currentUser["earth_or_mars"] = displayImage();

        currentUser["image_views"] =
          parseInt(currentUser["image_views"], 10) + 1;
      }
      users[user] = currentUser;
      document.cookie = "users=" + JSON.stringify(users);
      return {
        image: currentUser["earth_or_mars"],
        timesViewed: currentUser["image_views"],
      };
    }

  }
  useEffect(() => {
    let user = fire.auth()?.currentUser?.email;
if(user){

    const { image, timesViewed } = updateImageCookies(user);
    setImage(image);
    setTimesViewed(timesViewed);
}else{
    history.push('/');
}
  }, []);

  // document.getElementsByClassName('home__image').src = image;
  // document.getElementsByClassName('home__number').innerHTML = timesViewed

  return (
    <section className="home">
      <h1>Home</h1>
      <button className="home__logout" onClick={handleLogout}>
        logout
      </button>
      <p>hey {fire.auth().currentUser?.email}</p>
      <div className="home__circle-container">
        <img className="home__image" src={image} alt="" />
        {/* <div className="home__circle" style={{backgroundColor: image}}></div> */}
        <p className="home__number">
          number of times you've visited: {timesViewed}
        </p>
      </div>
    </section>
  );
}

export default Home;

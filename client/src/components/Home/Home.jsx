import React, { useEffect, useState } from "react";
import fire from "../../fire";
import { useHistory } from "react-router-dom";
import "./Home.scss";
import earth from "../../assets/images/earth.png";
import mars from "../../assets/images/Planet_Mars.png";

function Home() {
  const [image, setImage] = useState("");
  const [timesVisited, setTimesVisited] = useState(null);
  const history = useHistory();
  const handleLogout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      });
  };
  
  function displayImage() {
    return Math.random() > 0.5 ? mars : earth;
  }

  function getCookie(key) {
    const pattern = new RegExp(
      "(?:(?:^|.*;\\s*)" + key + "\\s*\\=\\s*([^;]*).*$)|^.*$"
    );
    return document.cookie.replace(pattern, "$1");
  }

  function updateImageCookies(user) {
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
        currentUser["image_views"] =
          parseInt(currentUser["image_views"], 10) + 1;
      }
      users[user] = currentUser;
      document.cookie = "users=" + JSON.stringify(users);
      return {
        image: currentUser["earth_or_mars"],
        timesVisited: currentUser["image_views"],
      };
    }
  }
  useEffect(() => {
    let user = fire.auth()?.currentUser?.email;
    if (user) {
      const { image, timesVisited } = updateImageCookies(user);
      setImage(image);
      setTimesVisited(timesVisited);
    } else {
      history.push("/");
    }
  }, []);

  return (
    <section className="home">
    <p className="home__welcome">hello {fire.auth().currentUser?.email}</p>
      <button className="home__logout" onClick={handleLogout}>
        logout
      </button>
      <div className="home__circle-container">
        <img className="home__image" src={image} alt="earth or mars"/>
      </div>
      <p className="home__number">
          number of times you've visited: {timesVisited}
        </p>
    </section>
  );
}

export default Home;

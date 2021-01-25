import React from 'react'
import fire from '../../fire';
import { useHistory } from 'react-router-dom';
import './Home.scss';

function Home() {
const history = useHistory()
const handleLogout = () => {
    fire.auth().signOut().then(() => {
        history.push('/');
    })
}

let color = "blue";
if (Math.random() < 0.5) {
    color = "red"
}


    return (
        <section className="home">
            <h1>Home</h1>
            <button className="home__logout" onClick={handleLogout}>logout</button>
            <div className="home__circle-container">
            <div className="home__circle" style={{background: color}}></div>
            </div>
        </section>
    )
}

export default Home;
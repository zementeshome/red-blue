import React from 'react'
import fire from '../../fire';
import { useHistory } from 'react-router-dom';

function Home() {
const history = useHistory()
const handleLogout = () => {
    fire.auth().signOut().then(() => {
        history.push('/');
    })
}

    return (
        <section className="home">
            <h1>Home</h1>
            <button className="home__logout" onClick={handleLogout}>logout</button>
        </section>
    )
}

export default Home;

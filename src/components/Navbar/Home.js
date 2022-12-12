import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
// import Single from '../Single'
// import Single from "../Single";

function Home({ dogHouses, click, user }) {


    const dogHouse = dogHouses.map((house) => (
        <>
            <div className="card" key={house.id}>
                <img src={house.image_url} alt={house.image_url} />
                <div className="centered">
                    <h3>{house.name}</h3>
                    <h3>Location: {house.location}</h3>
                    <p><span>Price:</span>{house.price}</p>
                </div>
                <br></br>
                <br></br>
                {user ? (
                    <Link to={`/dog_houses/${house.id}`}>
                        <button onClick={() => click(house.id)} >View More</button>
                    </Link>
                ) : (
                    <Link to="/login">
                    <button>View More</button>
                </Link>
                )}

            </div>
        </>))
    // const navigate = useNavigate()
    // function handleClick() {
    //     navigate("/single")
    // }
    return (
        <>
            <div className="container">
                {dogHouse}
            </div>
        </>

    );
}

export default Home;

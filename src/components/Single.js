import React, { useEffect, useState } from "react";
//import './App.css';
import { FaStar } from "react-icons/fa";
//import '../../assets'
import "../styles/Single.css";
import { RiDeleteBin6Line } from "react-icons/ri"

const colors = {
  orange: "#FFBA5A",
  grey: "#A9A9A9",
};
function Single({ user, id }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [house, setHouse] = useState({})
  const [reviews, setReviews] = useState(false)

  const stars = Array(5).fill(0);
  const [comment, setComment] = useState('')
  const handleClick = (value) => {
    setCurrentValue(value);
  };
  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };
  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  function handleChange(e) {
    setComment(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    e.target.reset()
    fetch(`/dog_houses/${house.id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, user_id: user.id }),
    });
    fetchPostedReview()

  }
  console.log(id)
  useEffect(() => {
    fetch(`/dog_houses/${id}`)
      .then(response => response.json()
      )
      .then((data) => {
        //console.log(data)
        setHouse(data)
      })
      // eslint-disable-next-line
  }, [reviews])
  console.log(house)

  function fetchPostedReview() {
    setReviews(reviews => !reviews)
  }

  function handleDelete(id) {
    fetch(`/reviews/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        const updatedReviews = reviews.filter((review) => review.id !== id)
        setReviews(updatedReviews)      
      })
      fetchPostedReview()
  }


  return (
    <div className="single">
      <div className="leftside">
        <img src={house.image_url} alt="house" />
        <h3>DogHouse Name: {house.name}</h3>
        <h3>Location: {house.location}</h3>
        <h3>Price: Kshs.{house.price}</h3>
      </div>
      <div className="rightside">
        <h1>REVIEWS</h1>
        {house.reviews?.map((review) => (
          <ul className="reviews">
            <li>{review.comment}</li>
            <button style={{ color: "white",
              backgroundColor: "red",
              padding: "2px",
              width: 50,
              borderRadius: 25 }}
              onClick={() => handleDelete(review.id)}
            ><RiDeleteBin6Line /></button>
          </ul>
          // <p>{review.comment}</p>
        ))}
        <div style={styles.stars}>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={40}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={
                  (hoverValue || currentValue) > index
                    ? colors.orange
                    : colors.grey
                }
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            placeholder="What's your experience?"
            style={styles.textarea}
          />
          <button style={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
}
const styles = {
  // container: {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   border: "3px solid #fff",
  //   padding: "20px",
  // },
  stars: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  textarea: {
    border: "1px solid #A9A9A9",
    borderRadius: 25,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 500,
    justifyContent: "center",
    bottom: "0px"
  },
  button: {
    border: "1px solid #A9A9A9",
    borderRadius: 25,
    width: 300,
    padding: 10,
    justifyContent: "center"
    // color:"#1D2DD4",
  },
  // doghouse: {
  //   width: "800px",
  //   display: "flex",
  //   flexDirection: "row"
  // }
};

export default Single;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function List({ reviews }) {
  const listItems = reviews.map((review, index) => (
    <p key={index}>{review.feedback} -- { review.isAnonymous ? 'anonym' : review.username }</p>
  ));
  return <ul>{listItems}</ul>;
}

List.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      feedback: PropTypes.string.isRequired,
    })
  ).isRequired,
};


function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}`);
        const data = await response.json();
        console.log("fetch", data)
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <article className='review'>
      <h3>Vad andra säger om oss</h3>
      <List reviews={reviews} />
      <Link className='button button--review' to="tyck-till">Lämna omdöme</Link>
    </article>
  );
}

export default Reviews;
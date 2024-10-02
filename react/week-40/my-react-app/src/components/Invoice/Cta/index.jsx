import propTypes from "prop-types";

function Cta({message}) {

  console.log("inside CTA component:", message)
  return (
    <h3>{message}</h3>
  )
}

export default Cta;

Cta.propTypes = {
  message: propTypes.string.isRequired,
};
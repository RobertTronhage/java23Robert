import propTypes from "prop-types";

function HeroSection({message}) {
  return (
  <section className="hero">
    <h1>Elektriker Jansson</h1>
    <p>Din pålitliga partner för alla elarbeten</p>
    <p>{message}</p>
    <a className="button button--cta" href="#">BÖRJA DIN PLANERING</a>
  </section>
  )
}

HeroSection.propTypes = {
  message: propTypes.string
}

export default HeroSection;
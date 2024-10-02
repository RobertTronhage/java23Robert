import propTypes from 'prop-types';
import sectionData from '../../data/sectionData'

function Article() {
  const articleList = sectionData.map((elem, index) => 
      <article key={index}>
        <img
          src={elem.imgSrc}
          className='responsive-img'
          alt={elem.title}
        />
        <h2>{elem.title}</h2>
        <p>{elem.content}</p>
        <a className="button" href="#">{elem.buttonText}</a>
      </article>
  )

  return articleList
}

Article.propTypes = {
  sectionData: propTypes.arrayOf(
    propTypes.shape({
      title: propTypes.string.isRequired,
      content: propTypes.string.isRequired,
      imgSrc: propTypes.string.isRequired,
    })
  )
}

export default Article;
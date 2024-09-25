import propTypes from 'prop-types';
import sectionData from '../../data/sectionData'

function Article() {
  const articleList = sectionData.map((elem, index) => {

    const {title, content, imgSrc, buttonText} = elem
    
    return (
      <article key={index}>
        <img
          src={imgSrc}
          className='responsive-img'
          alt={title}
        />
        <h2>{title}</h2>
        <p>{content}</p>
        <a className="button" href="#">{buttonText}</a>
      </article>
    )}
  )

  return <>{articleList}</>
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
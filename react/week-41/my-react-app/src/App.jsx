import Hero from './components/Hero'
import Article from './components/Article'
import Footer from './components/Footer'
import './App.css'
import HeroImg from './components/HeroImg'
import Service from './components/Service'
import Invoice from './components/Invoice'
import Reviews from './components/Reviews'

function App() {
  const invoiceMessage = "hej från parent"

  return (
    <>
      <Hero message={invoiceMessage}/>
      <p>Shopping icon</p>
      <main>
        <HeroImg />
        <Reviews />
        

        <Article />
        <Service />
        
        <Invoice message={invoiceMessage}/>
      </main>

      <Footer />
    </>
  )
}

export default App

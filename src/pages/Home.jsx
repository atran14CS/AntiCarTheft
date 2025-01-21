import './Home.css';
import Searchbar from '../componets/Searchbar';
import Hero from '../componets/Hero';

const Home = () => {
  return (
    <div>
      <h1>Anti Car Theft</h1>
      <button>Upload</button>
      <button>Home</button>
      <Searchbar />
      <Hero />
    </div>
  )
}

export default Home

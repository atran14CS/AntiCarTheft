import './Home.css';
import Searchbar from '../componets/searchbar';
import Hero from '../componets/Hero';

const Home = () => {
  return (
    <div>
      <h1>AutoGuard</h1>
      <button>Upload</button>
      <button>Home</button>
      <Searchbar />
      <Hero />
    </div>
  )
}

export default Home

import heropic from '../photos/heropic.jpeg';
import './Hero.css';


const Hero = () => {
  return (
    <div className='hero-container'>
      <img src={heropic} alt="car theft image" id='hero-pic'/>
    </div>
  )
}

export default Hero

import { Link } from 'react-router-dom';
import './home.css';
import emote1 from '../../../../assets/Home/circleHome.png';
import emote2 from '../../../../assets/Home/circleOutlineHome.png';
import emote3 from '../../../../assets/Home/image1.png';
import emote4 from '../../../../assets/Home/image2.png';
import emote6 from '../../../../assets/Home/image4.png';

const Home = () => {
  return (
    <>
      <p id="emotions">Emotion Detection System</p>
      <Link to="/Login">
        <p id="login">LOG IN</p>
      </Link>
      <Link to="/Register">
        <button type="button" id="register">
          Register
        </button>
      </Link>
      <span id="ellipse3">ellipse</span>
      <img id="emote3" src={emote3} alt="model" />

      <h1 id="text1">
        How are you <span id="feelings">feeling</span> today?
      </h1>
      <h2 id="text2">
        I’m an emotion detection AI and I can know how you feel. I use enhanced
        algorithms to try to analyze, interpret and classify human emotion
        through the analysis of facial features.
      </h2>
      <img id="emote2" src={emote2} alt="model" />
      <img id="emote1" src={emote1} alt="model" />

      <span id="ellipse4">ellipse</span>
      <img id="emote4" src={emote4} alt="model" />
      <img id="emote6" src={emote6} alt="model" />

      {/* <img id="emote1" src={emote1} alt="model" />
      <img id="emote2" src={emote2} alt="model" />
      <img id="emote4" src={emote4} alt="model" />
      <img id="emote5" src={emote5} alt="model" />
      <img id="emote6" src={emote6} alt="model" /> */}
    </>
  );
};
export default Home;

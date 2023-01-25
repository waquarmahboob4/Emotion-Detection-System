import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './workspace.css';
import { GridLoader } from 'react-spinners';
import emote1 from '../../../../assets/Home/circleHome.png';
import emote2 from '../../../../assets/Home/circleOutlineHome.png';

const { ipcRenderer } = window.electron;
const Hello = () => {
  const [loading, setLoading] = useState(false);
  const { userName } = useParams();
  return (
    <div className="container">
      <p id="emotionss">Emotions</p>
      <Link to="/Login">
        <p id="logins">LOG IN</p>
      </Link>
      <Link to="/Register">
        <button type="button" id="registers">
          Register
        </button>
      </Link>

      <Form className="registerModal">
        <h3 id="registerUsers">
          Welcome{' '}
          <span id="userName">
            <b>{userName}</b>
          </span>{' '}
          in Emotion Detection System
        </h3>
        {loading && (
          <GridLoader
            id="gridLoader"
            color="#fc4a1a"
            loading
            margin={5}
            size={50}
            speedMultiplier={2}
          />
        )}
        {loading === false && (
          <>
            <Button
              id="btn1"
              variant="primary"
              type="button"
              onClick={() => {
                ipcRenderer.togglePythonScript(true);
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 6000);
              }}
            >
              Start
            </Button>
            <Button
              type="button"
              id="btn2"
              onClick={() => {
                ipcRenderer.togglePythonScript(false);
              }}
            >
              Stop
            </Button>
          </>
        )}
      </Form>

      <span id="ellipses3">ellipse</span>
      <img id="emotes2" src={emote2} alt="model" />
      <img id="emotes1" src={emote1} alt="model" />

      <span id="ellipses4">ellipse</span>
      {/* <img id="emote4" src={emote4} alt="model" />
      <img id="emote6" src={emote6} alt="model" /> */}

      {/* <img id="emote1" src={emote1} alt="model" />
      <img id="emote2" src={emote2} alt="model" />
      <img id="emote4" src={emote4} alt="model" />
      <img id="emote5" src={emote5} alt="model" />
      <img id="emote6" src={emote6} alt="model" /> */}
    </div>
  );
};

export default Hello;

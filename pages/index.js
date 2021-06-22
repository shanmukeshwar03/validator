import { useState, useEffect } from 'react';
import Head from 'next/head';

const Home = () => {
  const [score, setscore] = useState(0);
  const [password, setpassword] = useState('');
  const [showpassword, setshowpassword] = useState(false);
  const [check, setcheck] = useState({
    lowercase: false,
    uppercase: false,
    numbers: false,
    symbols: false,
    lenght: false,
  });

  useEffect(() => {
    let tempscore = 0;
    let tempcheck = {
      lowercase: false,
      uppercase: false,
      numbers: false,
      symbols: false,
      lenght: false,
    };

    if (/[a-z]/.test(password)) {
      tempcheck.lowercase = true;
      tempscore += 20;
    }
    if (/[A-Z]/.test(password)) {
      tempcheck.uppercase = true;
      tempscore += 20;
    }
    if (/[0-9]/.test(password)) {
      tempcheck.numbers = true;
      tempscore += 20;
    }
    if (/[^0-9A-Za-z]/.test(password)) {
      tempcheck.symbols = true;
      tempscore += 20;
    }
    if (password.length >= 6) {
      tempcheck.lenght = true;
      tempscore += 20;
    }
    setscore(tempscore);
    setcheck(tempcheck);
  }, [password]);

  const handlePassword = (event) => {
    setpassword(event.target.value);
  };

  const handleshowpassword = () => {
    setshowpassword((password) => !password);
  };

  const strengthMeter = () => {
    switch (score) {
      case 0:
        return 'zero';
      case 20:
        return 'one';
      case 40:
        return 'two';
      case 60:
        return 'three';
      case 80:
        return 'four';
      case 100:
        return 'five';
      default:
        break;
    }
  };

  return (
    <div className="home__container">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="description" content="check your password strength online" />
        <meta name="keywords" content="password checker meter security reactjs nextjs strength" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="EN" />
        <title>password meter</title>
      </Head>
      <div className="home__header">
        <h1>HOW SECURE IS YOUR PASSWORD?</h1>
        <h3>check your password strength here!</h3>
      </div>
      <div className="home__strengthcontainer">
        <div className={`home__strengthmeter ${strengthMeter()}`}></div>
      </div>
      <div className="home__inputcontainer">
        <input
          type={showpassword ? 'text' : 'password'}
          className="home__passwordinput"
          value={password}
          onChange={handlePassword}
        />
        <img
          className="home__showpassword"
          src={showpassword ? '/icons/eye-close.svg' : '/icons/eye-open.svg'}
          alt="visibility"
          onClick={handleshowpassword}
        />
      </div>
      <div className="home__passwordcheck">
        {Object.keys(check).map((e , key) => <span key={key}>
          {check[e] ? (
            <span className="home__check">&#10003;</span>
          ) : (
            <span className="home__cross">&#10540;</span>
          )}
          {e}
        </span>)}
      </div>
    </div>
  );
};

export default Home;

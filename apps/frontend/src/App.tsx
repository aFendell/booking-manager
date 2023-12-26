import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [hello, setHello] = useState('');

  useEffect(() => {
    fetch('/api')
      .then((res) => res.text())
      .then(setHello);
  }, []);

  return (
    <div>
      <h1>TURBO</h1>
      <h1>{hello}</h1>
    </div>
  );
}

export default App;

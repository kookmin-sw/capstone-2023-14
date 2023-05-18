import axios from 'axios';
import { useState } from 'react';

function ChatTest() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('/api/chat', { prompt })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{response}</p>
    </div>
  );
}

export default ChatTest;

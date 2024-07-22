import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from './Logout';
import MenuBar from './MenuBar';
import '../App.css'; 
import './AudioList.css'; 

function AudioList( {onLogout} ) {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    fetchAudioFiles();
  }, []);

  const fetchAudioFiles = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://localhost:5000/api/audio/files', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAudioFiles(response.data);
    } catch (error) {
      console.error('Error fetching audio files', error);
      // Handle error, e.g., show an error message
    }
  };

  const playAudio = (filename) => {
    const audio = new Audio(`http://localhost:5000/api/playback/${filename}`);
    audio.onerror = (error) => {
      console.error('Error playing audio', error);
      // Handle playback error, e.g., show an error message to the user
    };
    audio.play();
    setCurrentAudio(audio);
    audio.onended = () => setCurrentAudio(null);
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
  };

  return (
    <div>
      <MenuBar />
      <h2>Audio Files List</h2>
      <table>
        <thead>
          <tr>
            <th>Filename</th>
            <th>Description</th>
            <th>Category</th>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {audioFiles.map(audio => (
            <tr key={audio.id}>
              <td>{audio.filename}</td>
              <td>{audio.description}</td>
              <td>{audio.category}</td>
              <td>{audio.username}</td>
              <td>
                <button onClick={() => playAudio(audio.filename)}
                  disabled={currentAudio !== null}
                  className={currentAudio !== null ? 'disabled' : ''}
                >Play</button>
                {currentAudio && <button onClick={stopAudio} disabled={currentAudio === null}>Stop</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <a href='/upload'>Upload files</a>
      <br/>
      <br/>
      <br/>
      <Logout />
    </div>
  );
}

export default AudioList;

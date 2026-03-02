import './App.css';

export default function App() {
  return (
    <div className="app">
      <div className="header">
        <h1>SoundCloud Mirror</h1>
      </div>
      <div className="content">
        <iframe
          src="https://soundcloud.com"
          title="SoundCloud"
          className="soundcloud-frame"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation allow-storage allow-pointer-lock allow-presentation"
          allow="geolocation; microphone; camera"
        />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";

function Home() {
  const [screenSharing, setScreenSharing] = useState(false);
  const [screenStream, setScreenStream] = useState(null);
  const [videoURL, setVideoURL] = useState(null);

  useEffect(() => {
    if (screenStream) {
      const mediaRecorder = new MediaRecorder(screenStream);
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: "video/webm" });

        const blobURL = URL.createObjectURL(videoBlob);
        setVideoURL(blobURL);
      };

      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, 2000);
    }
  }, [screenStream]);

  const handleStartSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setScreenStream(stream);
      setScreenSharing(true);
    } catch (error) {
      console.error("Error accessing screen sharing:", error);
    }
  };

  const handleStopSharing = () => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
    }
    setScreenSharing(false);
    setVideoURL(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Video Conferencing
        </h1>
        <p className="text-lg text-gray-600">
          Connect and collaborate with others in real-time.
        </p>
        <div className="mt-6">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 m-2">
            Start Meeting
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 m-2">
            Join Meeting
          </button>
          {screenSharing ? (
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 m-2"
              onClick={handleStopSharing}
            >
              Stop Sharing
            </button>
          ) : (
            <button
              className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 m-2"
              onClick={handleStartSharing}
            >
              Screen Sharing
            </button>
          )}
        </div>
        {screenSharing && videoURL && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">Screen Sharing</h2>
            <video src={videoURL} autoPlay controls width="800" height="600" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

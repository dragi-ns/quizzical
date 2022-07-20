import ReactLoading from 'react-loading';

function Loading() {
  return (
    <div className="loading-overlay">
      <ReactLoading type="spinningBubbles" color="#293265" />
      <p>Loading data...</p>
    </div>
  );
}

export default Loading;

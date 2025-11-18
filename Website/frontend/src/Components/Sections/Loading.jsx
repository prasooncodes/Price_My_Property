import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div className="loading-container">
      <Spinner animation="grow" style={{ width: '30px', height: '30px', color: '#FF9933' }} />
      <Spinner animation="grow" style={{ width: '60px', height: '60px', color: '#FFFFFF' }} />
      <Spinner animation="grow" style={{ width: '100px', height: '100px', color: '#4CAF50' }} />
      <h2 className="loading-text">Loading data...</h2>

      <style>{`
        .loading-container {
          text-align: center;
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        .loading-text {
          margin-top: 20px;
          font-size: 1.5rem;
          font-weight: 600;
          color: #ddd;
          letter-spacing: 1px;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export default Loading

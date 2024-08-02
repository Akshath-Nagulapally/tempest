// components/SplineViewer.js
"use client"
import { useEffect } from 'react';

const SplineViewer = ({ url, width = '100%', height = '500px' }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer/build/spline-viewer.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <spline-viewer url={url}></spline-viewer>;
};

export default SplineViewer;

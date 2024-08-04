// components/LaunchListWidget.js
"use client";

import React, { useEffect } from 'react';

const WaitlistForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://getlaunchlist.com/js/widget.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="launchlist-widget" data-key-id="wbGtvd" data-height="180px"></div>
  );
};

export default WaitlistForm;

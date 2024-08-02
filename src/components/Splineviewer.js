"use client"
import { useEffect } from 'react';

const SplineViewer = () => {
  useEffect(() => {
    // Function to hide the watermark
    const hideWatermark = () => {
      const logoElement = document.querySelector('#logo');
      if (logoElement) {
        logoElement.style.display = 'none';
      }
    };

    // Create a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(() => {
      hideWatermark();
    });

    // Start observing the document body for added nodes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Add the script to load the Spline viewer
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.4/build/spline-viewer.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script and observer on component unmount
    return () => {
      document.body.removeChild(script);
      observer.disconnect();
    };
  }, []);

  return (
    <spline-viewer
      loading-anim-type="spinner-small-dark"
      url="https://prod.spline.design/BlifPelOQWyhJHBR/scene.splinecode"
      style={{ width: '100%', height: '100%' }}
    >
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAANCAYAAADISGwcAAAG1ElEQVR4AQCBAH7/ADU5OwY1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7ATU5Oxk1OTsuNTk7PjU5O0c1OTtHNTk7PjU5Oy41OTsZNTk7ATU5OwA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsGAIEAfv8ANTk7CDU5OwI1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsQNTk7KTU5Oz81OTtQNTk7WTU5O1k1OTtQNTk7PzU5Oyk1OTsQNTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7BTU5OwsAgQB+/wA1OTsLNTk7BjU5OwA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7DzU5Oyk1OTtENTk7XDU5O241OTt3NTk7dzU5O241OTtcNTk7RDU5Oyo1OTsPNTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwE1OTsLNTk7EACBAH7/ADU5Ow01OTsJNTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7ADU5Ow81OTspNTk7RzU5O2Q1OTt9NTk7kDU5O5o1OTuZNTk7jzU5O3w1OTtiNTk7RTU5Oyg1OTsONTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7BjU5Ow81OTsUAIEAfv8ANTk7DzU5Ows1OTsENTk7ADU5OwA1OTsANTk7ADU5OwA1OTsNNTk7JTU5O0I1OTtiNTk7gTU5O5s1OTuvNTk7uDU5O7g1OTusNTk7mDU5O3w1OTtdNTk7PTU5OyA1OTsJNTk7ADU5OwA1OTsANTk7ADU5OwA1OTsHNTk7DzU5OxMAgQB+/wA1OTsSNTk7DzU5Owk1OTsCNTk7ADU5OwA1OTsANTk7CjU5Ox01OTs3NTk7VjU5O3c1OTuXNTk7sjU5O8U1OTvPNTk7zjU5O8E1OTurNTk7jjU5O2w1OTtKNTk7KzU5OxI1OTsANTk7ADU5OwA1OTsANTk7ADU5OwU1OTsMNTk7EACBAH7/ADU5Oxg1OTsVNTk7DzU5Owk1OTsENTk7AzU5Owg1OTsVNTk7KDU5O0M1OTtiNTk7hDU5O6Q1OTu/NTk70jU5O9s1OTvZNTk7yzU5O7Q1OTuWNTk7czU5O1A1OTswNTk7FTU5OwI1OTsANTk7ADU5OwA1OTsANTk7BDU5Ows1OTsPAIEAfv8ANTk7HjU5Oxs1OTsVNTk7DzU5Owo1OTsJNTk7DjU5Oxk1OTstNTk7RzU5O2U1OTuGNTk7pTU5O781OTvSNTk72jU5O9c1OTvJNTk7sjU5O5M1OTtwNTk7TTU5Oy01OTsTNTk7ADU5OwA1OTsANTk7ADU5OwA1OTsFNTk7DDU5OxAAgQB+/wA1OTshNTk7HjU5Oxc1OTsQNTk7CjU5Owg1OTsLNTk7FTU5Oyc1OTs/NTk7XDU5O3s1OTuZNTk7sjU5O8Q1OTvLNTk7yDU5O7o1OTujNTk7hDU5O2M1OTtBNTk7IzU5Owo1OTsANTk7ADU5OwA1OTsANTk7ADU5OwY1OTsONTk7EwCBAH7/ADU5Oxw1OTsYNTk7ETU5Owk1OTsBNTk7ADU5OwA1OTsHNTk7FjU5Oyw1OTtHNTk7ZDU5O4A1OTuXNTk7qDU5O681OTurNTk7njU5O4c1OTtrNTk7SzU5Oyw1OTsQNTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7BTU5Ow81OTsUAIEAfv8ANTk7EDU5Ows1OTsDNTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7EDU5Oyg1OTtDNTk7XTU5O3Q1OTuDNTk7ijU5O4c1OTt6NTk7ZTU5O0o1OTstNTk7EDU5OwA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7CzU5OxAAgQB+/wA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7CjU5OyM1OTs8NTk7UjU5O2E1OTtnNTk7ZDU5O1g1OTtENTk7KzU5OxA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsENTk7CwGBAH7/ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7EDU5Oyg1OTs9NTk7SzU5O1I1OTtPNTk7RDU5OzA1OTsYNTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsANTk7ADU5OwA1OTsGxmFYomzaK4UAAAAASUVORK5CYII="
        alt="3D Donut"
        style={{ width: '100%', height: '100%' }}
      />
    </spline-viewer>
  );
};

export default SplineViewer;



<script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.4/build/spline-viewer.js" async></script>

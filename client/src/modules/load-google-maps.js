const loadGoogleMaps = (callback) => {
    const existingScript = document.getElementById('googleMaps');
  
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD5qfI1IAGDuGP6YzsfsddTcTN9FxC_xL0&v=3.exp&libraries=geometry,drawing,places";
      script.id = 'googleMaps';
      document.body.appendChild(script);
  
      script.onload = () => {
        if (callback) callback();
      };
    }
  
    if (existingScript && callback) callback();
  };

  export default loadGoogleMaps;
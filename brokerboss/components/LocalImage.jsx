'use client';

import { useState, useEffect } from 'react';

export default function LocalImage({ srcKey, srcUrl, alt, className }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const cachedImage = localStorage.getItem(srcKey);
    if (cachedImage) {
      setImageSrc(cachedImage);
    } else {
      fetch(srcUrl)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result;
            try {
              localStorage.setItem(srcKey, base64data);
            } catch (e) {
              console.warn("Could not save image to localStorage, might be out of quota:", e);
            }
            setImageSrc(base64data);
          };
          reader.readAsDataURL(blob);
        })
        .catch(err => {
          console.error("Failed to load and cache image:", err);
          setImageSrc(srcUrl); // Fallback to normal url
        });
    }
  }, [srcKey, srcUrl]);

  return (
    <img
      src={imageSrc || srcUrl} // Show normal url while loading from localstorage/network
      alt={alt}
      className={className}
    />
  );
}

import React from 'react';

const ImageWithDownload = () => {
  const imageUrl = 'http://localhost:9000/image-storage/1729803269615_child.jpg'
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'downloaded-image'; 
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="text-center">
      <img src={imageUrl} alt="Display" className="w-full h-auto max-w-xs mx-auto mb-4" />
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Download Image
      </button>
    </div>
  );
};

export default ImageWithDownload;

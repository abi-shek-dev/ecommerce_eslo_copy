import React, { useState } from "react";
import { assets } from "../assets/assets";

const ProductSize = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (img) => {
    setSelectedImage(img);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full border border-gray-600 mt-20 mb-20 rounded-2xl">
      {/* Image Row */}
      <div className="flex flex-col justify-around md:flex-row items-center mt-20 mb-20 gap-6">
        <img
          className="w-[50vw] md:w-[25vw] cursor-pointer rounded-xl hover:scale-105 transition"
          src={assets.regularfitroundneck}
          alt="Regular Fit"
          onClick={() => openImage(assets.regularfitroundneck)}
        />
        <img
          className="w-[50vw] md:w-[25vw] cursor-pointer rounded-xl hover:scale-105 transition"
          src={assets.hoodiessweatshirts}
          alt="Hoodie"
          onClick={() => openImage(assets.hoodiessweatshirts)}
        />
        <img
          className="w-[50vw] md:w-[25vw] cursor-pointer rounded-xl hover:scale-105 transition"
          src={assets.dropshoulder}
          alt="Drop Shoulder"
          onClick={() => openImage(assets.dropshoulder)}
        />
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeImage}
        >
          <img
            src={selectedImage}
            alt="Full View"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevents closing when clicking image
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold cursor-pointer"
            onClick={closeImage}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductSize;

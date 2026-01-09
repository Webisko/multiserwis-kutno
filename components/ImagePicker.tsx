import React from 'react';

interface ImagePickerProps {
  images: string[];
  onSelect: (path: string) => void;
  onClose: () => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ images, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center">
          <h3 className="text-xl font-heading font-bold text-brand-dark">Wybierz obraz dla szkolenia</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <button
              key={img}
              onClick={() => onSelect(img)}
              className="border border-slate-200 rounded overflow-hidden hover:shadow-md transition-shadow text-left"
            >
              <div className="aspect-[3/2] bg-slate-100">
                <img src={img} alt={img} className="w-full h-full object-cover" />
              </div>
              <div className="p-2 text-xs font-bold text-slate-700">{img}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePicker;

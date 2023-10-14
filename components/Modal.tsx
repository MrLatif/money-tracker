import React from "react";

const Modal = ({
  show,
  onClose,
  children,
}: {
  show: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  children: any;
}) => {
  return (
    <div
      style={{
        transform: show ? "translateX(0%)" : "translateX(-200%)",
      }}
      className="absolute top-0 left-0 w-full h-25 z-10 transition-all duration-500">
      <div className="container mx-auto max-w-2xl h-25 rounded 3x1 bg-main-color py-6 px-4">
        <button
          onClick={() => onClose(false)}
          className="w-10 h-10 mb-4 font-bold rounded-full ">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

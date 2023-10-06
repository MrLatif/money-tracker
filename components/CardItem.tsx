import {
  ChatBubbleLeftRightIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import React from 'react'
import Image from "next/image";


const CardItem = () => {
  return (
    <div className="bg-white rounded-md p-3 mt-3 ">
      <label className="bg-gradient-to-r from-blue-500 to-blue-200 px-2 py-1 rounded text-white text-sm">
        Low Priority
      </label>
      <h5 className="text-md my-3 text-lg leading-6">
        Company website redesign.
      </h5>
      <div className="flex justify-between">
        <div className="flex space-x-4 items-center">
          <span className="flex space-x-2 items-center">
            <ChatBubbleLeftRightIcon className="w-4 h-4 text-gray-500" />
            <span>1</span>
          </span>
          <span className="flex space-x-2 items-center">
            <PaperClipIcon className="w-4 h-4 text-gray-500" />
            <span>2</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardItem
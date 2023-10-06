import React from 'react'
import { ChevronDownIcon, EllipsisVerticalIcon} from '@heroicons/react/24/solid'
import {
  ChatBubbleLeftRightIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { Paper } from '@mui/material';
import Image from 'next/image';
import CardItem from './CardItem';

const Kanban = () => {
  return (
    <>
      <div className="p-10">
        {/* Board header */}
        <div className="flex items-center">
          <h4 className="text-4xl font-bold text-gray-600">Todo List</h4>
          <ChevronDownIcon className="w-9 h-9 text-gray-500 rounded-full p-1 bg-white ml-5 shadow-xl" />
        </div>

        {/* Board columns */}
        <div className="grid grid-cols-4 gap-5 my-5">
          <div className="bg-gray-100 p-3 rounded-md shadow-md flex flex-col relative overflow-hidden">
            <span className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200 absolute inset-x-0 top-0"></span>
            <h4 className="flex justify-between items-center mb-2">
              <span className="text-2xl text-gray-600">BackLog</span>
              <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
            </h4>

            <CardItem />
            <CardItem />
            <CardItem />
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Kanban
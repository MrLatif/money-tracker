import React from "react";
import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import {
  ChatBubbleLeftRightIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { Paper } from "@mui/material";
import CardItem from "./CardItem";
import BoardData from "../data/board-data.json";

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
          {BoardData.map((board, index) => {
            return (
              <div
                key={index}
                className="bg-gray-100 p-3 rounded-md shadow-md flex flex-col relative overflow-hidden"
              >
                <span className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200 absolute inset-x-0 top-0"></span>
                <h4 className="flex justify-between items-center mb-2">
                  <span className="text-2xl text-gray-600">{board.name}</span>
                  <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
                </h4>

                {board.items.length > 0 &&
                  board.items.map((item, iIndex) => {
                    return <CardItem key={iIndex} data={item} />;
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Kanban;

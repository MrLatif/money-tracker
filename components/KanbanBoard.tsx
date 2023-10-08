"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Paper } from "@mui/material";
import CardItem from "./CardItem";
import BoardData from "../data/board-data.json";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Kanban = () => {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  const onDragEnd = (re: any) => {
    console.log(re);
    let newBoardData = boardData;
    var dragItem = newBoardData[parseInt(re.souce.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(re.souce.index,1);
    newBoardData[parseInt(re.destination.droppableId)].items.splice(re.destination.index,0, dragItem);
    setBoardData(newBoardData);
  }
  return (
    <>
      <div className="p-10">
        {/* Board header */}
        <div className="flex items-center">
          <h4 className="text-4xl font-bold text-gray-600">Todo List</h4>
          <ChevronDownIcon className="w-9 h-9 text-gray-500 rounded-full p-1 bg-white ml-5 shadow-xl" />
        </div>

        {/* Board columns */}
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-4 gap-5 my-5">
              {BoardData.map((board, index) => {
                return (
                  <div key={index}>
                    <Droppable droppableId={board.name}>
                      {(provider) => (
                        <div
                          {...provider.droppableProps}
                          ref={provider.innerRef}
                          className="bg-gray-100 p-3 rounded-md shadow-md flex flex-col relative overflow-hidden"
                        >
                          <span className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200 absolute inset-x-0 top-0"></span>
                          <h4 className="flex justify-between items-center mb-2">
                            <span className="text-2xl text-gray-600">
                              {board.name}
                            </span>
                            <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
                          </h4>

                          {board.items.length > 0 &&
                            board.items.map((item, iIndex) => {
                              return (<CardItem key={iIndex} data={item} />);
                            })}

                          <button className="flex justify-center items-center mt-6 space-x-2 text-lg">
                            <span>Add task</span>
                            <PlusCircleIcon className="w-6 h-6 text-gray-500" />
                          </button>
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        )}
      </div>
    </>
  );
};

export default Kanban;

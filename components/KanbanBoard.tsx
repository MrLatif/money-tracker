"use client";

import React, { useMemo, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import { 
  DndContext, 
  DragEndEvent, 
  DragOverEvent, 
  DragOverlay, 
  DragStartEvent, 
  PointerSensor, 
  useSensor, 
  useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>([]);

  console.log(columns);

  const [activeColumn, setActiveColumn] = useState<Column | null> (null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: {
      distance: 3 //300px
    }})
  );

  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40]
    "
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-2">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColumn();
            }}
            className="
            h-[60px]
            w-[350px]
            min-w-[350px]
            cursor-pointer
            rounded-lg
            bg-mainBackgroundColor
            border-2
            border-columnBackgroundColor
            p-4
            ring-rose-500
            hover:ring-2
            flex
            gap-2
            "
          >
            <PlusCircleIcon className="w-6 h-6" />
            Add Column
          </button>
        </div>
        {typeof document !== "undefined" &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {
                    activeTask && <TaskCard task={activeTask} deleteTask={deleteTask} updateTask={updateTask}/>

              }
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );

  function onDragEnd(event: DragEndEvent){
    const {active, over} = event;

    if(!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if(activeColumnId === overColumnId) return;

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId);
      
      const overColumnIndex = columns.findIndex(col => col.id === overColumnId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }


  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    //Dropping a Task over another task

    
    //Dropping a Task over a column
  }

  function onDragStart(event: DragStartEvent){
    if(event.active.data.current?.type === "Column"){
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
        setActiveTask(event.active.data.current.task);
        return;
    }
  }

  function updateTask(id: Id, content: string){
    const newTasks = tasks.map(task => {
      if(task.id !==id) return task;
      return {...task, content};
    });

    setTasks(newTasks)
  }

  function deleteTask(id: Id){
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  function createTask(columnId: Id){
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`
    }

    setTasks([...tasks, newTask]);
  }

  function updateColumn(id: Id, title: string){
    const newColumns = columns.map(col => {
      if(col.id !== id) return col;
      return {...col, title};
    });

    setColumns(newColumns);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }
}

function generateId() {
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;

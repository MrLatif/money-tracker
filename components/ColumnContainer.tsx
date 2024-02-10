import { Column, Id, Task } from "../types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import TaskCard from "./TaskCard";
import { debounce } from "lodash";

interface Props {
  column: Column;
  tasks: Task[];
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function ColumnContainer(props: Props) {
  const { column, updateColumn, createTask, tasks, deleteTask, updateTask } =
    props;

  const [editMode, setEditMode] = useState(false);
  const [localTitle, setLocalTitle] = useState(column.title);

  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };
  const saveColumnTitle = debounce(() => {
    updateColumn(column.id, localTitle);
  }, 0);

  useEffect(() => {
    if (editMode) {
      // If in edit mode, update local title immediately
      saveColumnTitle.flush();
    }
  }, [editMode]);

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        data-column-id={column.id}
        className="
      bg-[#333333]
      opacity-40
      border-2
      border-[#FFF]
      w-[350px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
      bg-[#333333]
      w-[350px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      "
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="
        bg-black
        text-md
        min-h-[60px]
        max-h-[60px]
        h-[60px]
        cursor-grab
        rounded-md
        rounded-b-none
        p-3
        font-bold
        border-columnBackgroundColor
        border-4x
        flex
        items-center
        justify-between
      "
      >
        <div className="flex gap-2">
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-black focus:border-none border rounded outline-none px-2"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              autoFocus
              onBlur={() => {
                toggleEditMode();
                saveColumnTitle();
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                toggleEditMode();
                saveColumnTitle();
              }}
            />
          )}
        </div>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={[0]}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      {/* Column footer */}
      <button
        onClick={() => {
          createTask(column.id);
        }}
        className="flex gap-2 items-cente rounded-md p-4 hover:bg-none hover:text-[#97F704] active:bg-[#]"
      >
        <PlusCircleIcon className="w-6 h-6" />
        Add task
      </button>
    </div>
  );
}

export default ColumnContainer;

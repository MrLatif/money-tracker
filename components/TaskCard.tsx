import { useEffect, useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { debounce } from "lodash";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [localContent, setLocalContent] = useState(task.content);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const saveTaskContent = debounce(() => {
    updateTask(task.id, localContent);
  }, 0); // Adjust the delay as needed

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  useEffect(() => {
    if (editMode) {
      // If in edit mode, update local content immediately
      saveTaskContent.flush();
    }
  }, [editMode]);

  if (isDragging) {
    return (
        <div
            ref={setNodeRef}
            style={style}
            className="
        bg-[#202021] 
        p-2.5 
        h-[100px] 
        min-h-[100px] 
        items-center 
        flex 
        text-left 
        rounded-xl 
        border-2
        border-[#97F704]
        cursor-grab
        relative
        opacity-50
      "
        />
    );
  }

  if (editMode) {
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="
          bg-[#202021] 
          p-2.5 
          h-[100px] 
          min-h-[100px] 
          items-center 
          flex 
          text-left 
          rounded-xl 
          hover:ring-2 
          hover:ring-inset 
          hover:ring-[#97F704]
          cursor-grab
          relative
        "
        >
            <textarea
                className="
        h-[90%]
        w-full 
        resize-none 
        border-none 
        rounded 
        bg-transparent
        text-white
        focus:outline-none
      "
                value={localContent}
                autoFocus
                placeholder="Task content here"
                onBlur={() => {
                    toggleEditMode();
                    saveTaskContent();
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && e.shiftKey) toggleEditMode();
                }}
                onChange={(e) => setLocalContent(e.target.value)}
            ></textarea>
        </div>
    );
  }

  return (
      <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          onClick={toggleEditMode}
          className="
        bg-[#202021] 
        p-2.5 
        h-[100px] 
        min-h-[100px] 
        items-center 
        flex 
        text-left 
        rounded-xl 
        hover:ring-2 
        hover:ring-inset 
        hover:ring-[#97F704]
        cursor-grab
        relative
        task
      "
          onMouseEnter={() => {
              setMouseIsOver(true);
          }}
          onMouseLeave={() => {
              setMouseIsOver(false);
          }}
      >
          <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
              {task.content}
          </p>
          {mouseIsOver && (
              <button
                  onClick={() => {
                      deleteTask(task.id);
                  }}
                  className="
            stroke-white
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            bg-[#202021]
            p-2
            rounded
            opacity-60
            hover:opacity-100
          "
              >
                  <TrashIcon />
              </button>
          )}
      </div>
  );
}

export default TaskCard;

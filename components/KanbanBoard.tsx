"use client";

import React, { useEffect, useState } from "react";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  doc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { db } from "../lib/firebase";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const fetchDefaultColumns = async () => {
    const columnsRef = collection(db, "columns");

    try {
      const fetchedColumns = [];

      // Fetch the "To Do" column
      const todoDoc = await getDoc(doc(columnsRef, "todo"));
      if (todoDoc.exists()) {
        const todoData = todoDoc.data();
        if (todoData) {
          fetchedColumns.push({ id: "todo", title: todoData.title });
        }
      }

      // Fetch the "Doing" column
      const doingDoc = await getDoc(doc(columnsRef, "doing"));
      if (doingDoc.exists()) {
        const doingData = doingDoc.data();
        if (doingData) {
          fetchedColumns.push({ id: "doing", title: doingData.title });
        }
      }

      // Fetch the "Done" column
      const doneDoc = await getDoc(doc(columnsRef, "done"));
      if (doneDoc.exists()) {
        const doneData = doneDoc.data();
        if (doneData) {
          fetchedColumns.push({ id: "done", title: doneData.title });
        }
      }

      // Update the state with the fetched columns
      setColumns(fetchedColumns);
    } catch (error) {
      console.error("Error fetching columns: ", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const q = query(
        collection(db, "tasks"),
        where("columnId", "in", ["todo", "doing", "done"])
      );
      const querySnap = await getDocs(q);

      const newTasks: Task[] = [];

      querySnap.forEach((doc) => {
        newTasks.push({
          id: doc.id,
          columnId: doc.data().columnId,
          content: doc.data().content,
        });
      });

      setTasks(newTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (columns.length === 0) {
      fetchDefaultColumns();
    }

    fetchTasks();
  }, []);

  return (
    <div
      className="
        flex
        mt-10
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40]
    ">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}>
        <div className="flex gap-2">
          <div className="flex gap-4">
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter((task) => task.columnId === col.id)}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </div>
        </div>
        {typeof document !== "undefined" &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    //Dropping a Task over another task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        updateTaskDrag(tasks[activeIndex].id, tasks[overIndex].columnId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    //Dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        updateTaskDrag(tasks[activeIndex].id, overId);

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  async function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    try {
      const taskRef = doc(db, "tasks", id.toString());
      await updateDoc(taskRef, {
        content,
      });
    } catch (error) {
      console.log(error);
    }

    setTasks(newTasks);
  }

  async function updateTaskDrag(id: Id, columnId: Id) {
    try {
      const taskRef = doc(db, "tasks", id.toString());
      await updateDoc(taskRef, {
        columnId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);

    await deleteDoc(doc(db, "tasks", id.toString()));

    setTasks(newTasks);
  }

  async function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    try {
      const collectionRef = collection(db, "tasks");

      const docRef = await addDoc(collectionRef, {
        columnId,
        content: `Task ${tasks.length + 1}`,
      });
      newTask.id = docRef.id;
    } catch (error: any) {
      console.error(error.message);
    }
    setTasks([...tasks, newTask]);
  }

  async function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    const columnRef = doc(db, "columns", id.toString());

    await updateDoc(columnRef, {
      title,
    });

    setColumns(newColumns);
  }

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }
}

export default KanbanBoard;

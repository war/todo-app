import { trpc } from "./trpc";

export const taskGetAll = () => {
  const tasks = trpc.todo.taskGetAll.useQuery();
  const tasksDesc = tasks.data?.map((task) => { return task.description });
  return tasksDesc != undefined && tasksDesc?.length > 0 ? tasksDesc : ["No tasks found"];
};

export const taskCreate = (task: string) => {
  //get userid
  //get datetime
  //create task
  return "success";
};

export const taskComplete = (taskID: string) => {
  //mark task as complete
  return "success";
};

export const taskDelete = (taskID: string) => {
  //mark task as complete
  return "success";
};
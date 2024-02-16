import axios from "axios";
import useSwr from "swr";
import { Todo } from "./types";
import { getBackendUrl } from "lib/utils";

export const useListTodo = () => {
  return useSwr<Todo[]>("/todo", listTodo);
};

async function listTodo() {
  const { data } = await axios.get(getBackendUrl() + "/todo", {
    withCredentials: true,
  });

  return data;
}

// returns two lists: one with complete todos and another with incomplete todos
export const useListSeparatedTodo = () => {
  return useSwr<Todo[][]>("/todo", listSeparatedTodo);
}

async function listSeparatedTodo() {
  const { data } = await axios.get<Todo[]>(getBackendUrl() + "/todo", {
    withCredentials: true,
  });

  const completed = []
  const notCompleted = []
  for (const todo of data) {
    if (todo.completed) {
      completed.push(todo)
    } else {
      notCompleted.push(todo)
    }
  }

  return [completed, notCompleted];
}

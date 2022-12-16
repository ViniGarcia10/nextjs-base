import { useEffect, useState } from "react";
import { Todo } from "../../@types/Todo";

const TodoListPage = () => {
  const [TodoList, setTodoList] = useState<Todo[]>([]);
  const [Loading, setLoading] = useState(true);

  const loadTodos = async () => {
    setLoading(true);
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todoList: Todo[] = await res.json();
    setTodoList(todoList);
    setLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div>
      <h1>Lista de Tarefas do {process.env.NEXT_PUBLIC_NOME}</h1>

      {Loading && <h2>Carregando!!</h2>}

      <ul>
        {!Loading &&
          TodoList.map((todo: Todo, index) => (
            <li
              key={index}
              style={{
                color: todo.completed ? "blue" : "red",
                marginBottom: 15,
                fontSize: 20,
              }}
            >
              {todo.title} - Status:
              {todo.completed ? " Completa" : " Incompleta"}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoListPage;

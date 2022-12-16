import { Todo } from "../../@types/Todo";

type PropsTodo = {
  todoList: Todo[];
};

const TodoPage = ({ todoList }: PropsTodo) => {
  return (
    <div>
      <h1>Lista de Tarefas</h1>

      <ul>
        {todoList.map((todo, index) => (
          <li key={index} style={{ color: todo.completed ? "blue" : "red", marginBottom: 15, fontSize: 20 }}>
            {todo.title} - Status:{todo.completed ? " Completa" : " Incompleta"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;

export const getServerSideProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todoList: Todo[] = await res.json();

  return {
    props: {
      todoList,
    },
  };
};

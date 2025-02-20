import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
  inprogressTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
    inprogressTodo: (id) => dispatch(inprogressTodos(id)),
  };
};

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active");
  return (
    <div className="displaytodos">
      <div className="buttons">
      <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => setSort("active")}
  style={{
    backgroundColor: sort === "active" ? "#2563eb" : "#e5e7eb", // Blue for active, gray otherwise
    color: sort === "active" ? "#fff" : "#000",
    padding: "10px 16px",
    borderRadius: "8px",
    transition: "all 0.3s ease-in-out",
  }}
>
  Active
</motion.button>

<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => setSort("inprogress")}
  style={{
    backgroundColor: sort === "inprogress" ? "#2563eb" : "#e5e7eb",
    color: sort === "inprogress" ? "#fff" : "#000",
    padding: "10px 16px",
    borderRadius: "8px",
    transition: "all 0.3s ease-in-out",
  }}
>
  InProgress
</motion.button>

<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => setSort("completed")}
  style={{
    backgroundColor: sort === "completed" ? "#2563eb" : "#e5e7eb",
    color: sort === "completed" ? "#fff" : "#000",
    padding: "10px 16px",
    borderRadius: "8px",
    transition: "all 0.3s ease-in-out",
  }}
>
  Completed
</motion.button>

<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => setSort("all")}
  style={{
    backgroundColor: sort === "all" ? "#2563eb" : "#e5e7eb",
    color: sort === "all" ? "#fff" : "#000",
    padding: "10px 16px",
    borderRadius: "8px",
    transition: "all 0.3s ease-in-out",
  }}
>
  All
</motion.button>

      </div>
      <ul>
        <AnimatePresence>
          {props.todos.length > 0 && sort === "active"
            ? props.todos.map((item) => {
                return (
                  item.completed === false && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              })
            : null}
          {/* for completed items */}
          {props.todos.length > 0 && sort === "completed"
            ? props.todos.map((item) => {
                return (
                  item.completed === true && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              })
            : null}
          {/* for all items */}
          {props.todos.length > 0 && sort === "all"
            ? props.todos.map((item) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeTodo={props.removeTodo}
                    updateTodo={props.updateTodo}
                    completeTodo={props.completeTodo}
                  />
                );
              })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);

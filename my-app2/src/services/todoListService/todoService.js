export function getTodoIndex (id, todoProps) {
  // let props = this.state.todoProps;
  for (let i = 0; i < todoProps.length; i++) {
    if (todoProps[i].id === id) {
      return i;
    }
  }
  return -2;
}

export function extractTodos (toExtract) {
  let todoProperties = [];
  for (let i = 0; i < toExtract.length; i++) {
    todoProperties[i] = {
      id: toExtract[i].id,
      title: toExtract[i].name,
    };
  }
  return todoProperties;
}

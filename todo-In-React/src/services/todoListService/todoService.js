export function getTodoIndex(id, todoProps) {
  // let props = this.state.todoProps;
  for (let i = 0; i < todoProps.length; i++) {
    if (todoProps[i].id === id) {
      return i;
    }
  }
  return -2;
}

export function extractTodos(toExtract) {
  // console.log(toExtract);
  let tagName = [];
  let todoProperties = [];
  for (let i = 0; i < toExtract.length; i++) {
    tagName = toExtract[i].tags.map(tagItem => tagItem.name);
    todoProperties[i] = {
      id: toExtract[i].id,
      title: toExtract[i].name,
      tags: tagName || []
    };
  }

  return todoProperties;
}

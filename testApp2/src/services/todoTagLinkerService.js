import Boom from 'boom';
import TodoTagLinker from '../models/todoAndTagsLinker.js';

export function getUserTodoId(tagId) {
  return new TodoTagLinker()
    .query('where', 'tag_id', '=', tagId)
    .fetchAll()
    .then(linker => {
      if(!linker) {
        throw('tag_id: ' + tagId + ' not found.');
        return null;
      }
      return linker;
    });
}

export function getTags(todoId) {
  return new TodoTagLinker()
    .query('where', 'user_todo_id', '=', todoId)
    .fetchAll()
    .then(linker => {
      if(!linker) {
        throw('user_todo_id: ' + todoId + ' not found.');
        return null;
      }
      return linker;
    });
}

export async function getMultipleUserTodoIds(tagIdArray) {
  let todoIds = [];
  let matchedModels;
  let newId;
  for(let i = 0; i < tagIdArray.length; i++) {
    matchedModels = await getUserTodoId(tagIdArray[i])
      .then(data => {
        // console.log(data.models.attributes);
        // console.log(data.models);  // prints an array due to fetchAll()
        return data.models;
      })
      .catch(err => {
        console.log(err);
        return null;
      });
    if(matchedModels) {
      for(let i = 0; i < matchedModels.length; i++) {
        // console.log(matchedModels[i].attributes.userTodoId);
        newId = matchedModels[i].attributes.userTodoId;
        if(todoIds.indexOf(newId) === -1) {
          todoIds.push(newId);
        }
      }
    }
  }
  // console.log(todoIds);
  return todoIds;
}

export function removeLink(todoId) {
  return new TodoTagLinker().query('where', 'user_todo_id', '=', todoId).destroy().then(linker => {
    // console.log('linker');
    // console.log(linker);
    // linkers.destroy();
    return linker;
  });
}

export function removeLinkByTags(tagId) {
  return new TodoTagLinker().query('where', 'tag_id', '=', tagId).destroy().then(linker => {
    return linker;
  })
}

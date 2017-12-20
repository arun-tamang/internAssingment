import Boom from 'boom';
import UserTodo from '../models/userTodo.js';
import * as tagService from './tagService';
import * as linkerService from './todoTagLinkerService';

export function getUserTodo(id) {
  return new UserTodo().query('where', 'user_id', '=', id)
    .orderBy('updated_at', 'DESC')
    .fetchPage({
      pageSize: 5, // Defaults to 10 if not specified
      page: 1, // Defaults to 1 if not specified
    })
    .then(userTodo => {
      if(!userTodo) {
        throw new Boom.notFound('UserTodo not found');
      }

      return userTodo;
    });
}

export async function getTodosFromTags(tagArray) {
  // get tag ids from tag names
  let tagIdArray = await tagService.getMultipleByTagName(tagArray);
  // get todo_ids having these tag_ids by using linker table
  let todoIdArray = await linkerService.getMultipleUserTodoIds(tagIdArray);
  return todoIdArray;
}

export async function searchUserTodo(user_id, queries) {
  let keyArray = queries.keywords.split(',');
  let tagArray = queries.tags.split(',');
  let todoIds = await getTodosFromTags(tagArray);
  let searchByKeys = (qb) => {
    for(let i = 0; i < keyArray.length; i++) {
      qb = qb.orWhere('name', 'LIKE', '%' + keyArray[i] + '%');
    }
    return qb;
  }
  let searchByTodoIds = (qb) => {
    console.log(todoIds.length);
    for(let i = 0; i < todoIds.length; i++) {
      console.log(todoIds[i]);
      qb = qb.orWhere('id', '=', todoIds[i]);
    }
    return qb;
  }
  return new UserTodo()
    .query(async function(qb) {
      qb = searchByKeys(qb);
      qb = searchByTodoIds(qb);
      qb = qb.where('user_id', '=', user_id);
    })
    .orderBy('updated_at', 'DESC')
    .fetchPage({
      pageSize: 10, // Defaults to 10 if not specified
      page: 1, // Defaults to 1 if not specified
    })
    .then(userTodo => {
      if(!userTodo) {
        console.log('query doesn\'t match');
        userTodo = 'no todo matches your query';
      }
      return userTodo;
    });
}

export function createUserTodo(user_todo) {
  let tagIds = user_todo.tagIds;
  return new UserTodo({ name: user_todo.name })
    .save()
    .then(user_todo => {
      user_todo.refresh();
      return user_todo.tags().attach(tagIds);
    });
}

export function updateUserTodo(id, user_todo) {
  // this actually adds new user_todo row and doesn't update any row in table.
  let tagIds = user_todo.tagIds;  //tagIds is array
  return new UserTodo()
    .save({ name: user_todo.name, user_id: id })
    .then(user_todo => {
      user_todo.refresh();
      user_todo.tags().attach(tagIds);  // camelCase because of json data user sends.
      return user_todo;
    });
}

export function editUserTodo(todoId, newTitle) {
  // edit a single todo
  return new UserTodo({id: todoId})
    .save({ name: newTitle})
    .then(user_todo => {
      user_todo.refresh();
      return user_todo;
    });
}

function getTagIds(arr) {
  let tags = [];
  for (let i = 0; i < arr.length; i++) {
    tags[i] = arr[i].attributes.tagId;
  }
  return tags;
}

export async function deleteUserTodo(userId, todoId) {
  // currently userId is not used for validation
  // get array of tags of todo from linkerTable
  console.log('todoId to destroy', todoId)
  let tags = await linkerService.getTags(todoId).then(data => {return data});
  tags = getTagIds(tags.models);
  console.log(tags);
  // let linkerResponse = linkerService.removeLinks(todoId);
  for(let i = 0; i < tags.length; i++) {
    linkerService.removeLink(todoId);
  }
  return new UserTodo({ id: todoId }).destroy().then(user_todo => {
    return ('todoId deleted: ' + todoId);
  });
}

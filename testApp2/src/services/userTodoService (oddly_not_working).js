import Boom from 'boom';
import UserTodo from '../models/userTodo.js';
import * as tagService from './tagService';
import * as linkerService from './todoTagLinkerService';

export function getUserTodo(id) {
  return new UserTodo().query('where', 'user_id', '=', id)
    .fetchPage({
      pageSize: 10, // Defaults to 10 if not specified
      page: 1, // Defaults to 1 if not specified
    })
    .then(userTodo => {
      if(!userTodo) {
        throw new Boom.notFound('UserTodo not found');
      }

      return userTodo;
    });
}

export function searchUserTodo(user_id, queries) {
  // let keyArray = Object.values(queries);
  // console.log(queries.keywords);
  // console.log(queries.tags);
  let keyArray = queries.keywords.split(',');
  let tagArray = queries.tags.split(',');
  let searchByKeys = (qb) => {
    for(let i = 0; i < keyArray.length; i++) {
      qb = qb.orWhere('name', 'LIKE', '%' + keyArray[i] + '%');
    }
    return qb;
  }
  let searchByTags = async (qb) => {
    // get tag ids from tag names
    let tagIdArray = await tagService.getMultipleByTagName(tagArray);
    // console.log(tagIdArray);
    // get todo_ids having these tag_ids by using linker table
    let todoIdArray = await linkerService.getMultipleUserTodoIds(tagIdArray);
    // console.log(todoIdArray);
    for(let i = 0; i < todoIdArray.length; i++) {
      qb = qb.orWhere('id', '=', todoIdArray[i]);
    }
    // return qb;
  }
  return new UserTodo()
    .query(async function(qb) {
      qb = searchByKeys(qb);
      console.log('before');
      console.log(qb);
      qb = await searchByTags(qb);
      console.log('after');
      console.log(qb);
      qb = qb.where('user_id', '=', user_id);
    })
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
  let tagIds = user_todo.tagIds;
  return new UserTodo()
    .save({ name: user_todo.name, user_id: id })
    .then(user_todo => {
      user_todo.refresh();
      user_todo.tags().attach(tagIds);  // camelCase because of json data user sends.
    });
}

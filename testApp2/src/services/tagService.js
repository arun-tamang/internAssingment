import Boom from 'boom';
import Tags from '../models/tags.js';

export function getByTagName(name) {
  return new Tags()
    .query('where', 'name', '=', name)
    .fetch()
    .then(tag => {
      if (!tag) {
        // throw new Boom.notFound('tag not found');
        throw 'tag: ' + name + ' not found';
      }
      return tag;
    });
}

export async function getMultipleByTagName(tagArray) {
  let tag;
  let idArray = [];
  for (let i = 0; i < tagArray.length; i++) {
    tag = await getByTagName(tagArray[i])
      .then(data => {
        // console.log(data.attributes.id);
        return data.attributes.id;
      })
      .catch(err => {
        console.log(err);
        return null;
      });
    // console.log('tag........');
    // console.log(tag);
    if (tag) {
      idArray.push(tag);
    }
  }
  // console.log('idArray');
  // console.log(idArray);
  return idArray;
}

export function getAllTags() {
  return new Tags().fetchAll();
}

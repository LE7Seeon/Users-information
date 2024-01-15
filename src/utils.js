import axios from 'axios';

const URLusers = 'https://jsonplaceholder.typicode.com/users';
const URLposts = 'https://jsonplaceholder.typicode.com/posts';
const URLtodos = 'https://jsonplaceholder.typicode.com/todos';

const getAll = (url) => axios.get(url);

const getById = (url, id) => axios.get(`${url}/${id}`);

const getByUserId = (url, id) => axios.get(`${url}?userId=${id}`);

const addItem = (url, obj) => axios.post(url, obj);

const updateItem = (url, id, obj) => axios.put(`${url}/${id}`, obj);

const deleteItem = (url, id) => axios.delete(`${url}/${id}`);

export { URLusers, URLposts, URLtodos, getAll, getById, addItem, updateItem, deleteItem, getByUserId };

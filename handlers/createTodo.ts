import { Request, Response } from '../deps.ts';
import { createTodo } from '../services/todos.ts';

export default async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: 'Invalid todo data' };
    return;
  }

  const { userId, title, completed = false } = await request.body().value;

  if (!userId || !title) {
    response.status = 422;
    response.body = {
      msg: 'Incorrect todo data. userId and title are required',
    };
    return;
  }

  const todoId = await createTodo({ userId, title, completed });

  response.body = { msg: 'Todo created', todoId };
};

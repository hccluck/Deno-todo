import { RouteParams } from 'https://deno.land/x/oak/mod.ts';
import { Request, Response } from '../deps.ts';
import { updateTodo } from '../services/todos.ts';

export default async ({
  params,
  request,
  response,
}: {
  params: RouteParams;
  request: Request;
  response: Response;
}) => {
  const todoId = params.id;

  if (!todoId) {
    response.status = 400;
    response.body = { msg: 'Invalid todo id' };
    return;
  }

  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: 'Invalid todo data' };
    return;
  }

  const { userId, title, completed } = await request.body().value;

  await updateTodo(todoId, { userId, title, completed });
  response.body = { msg: 'Todo updated' };
};

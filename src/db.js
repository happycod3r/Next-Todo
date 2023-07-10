import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// the addTodo function receives an object todoData that contains 
// the fields required to create a new todo. It uses the Prisma client's 
// create method to add the todo to the database. If successful, the 
// function returns the created todo. If an error occurs, it throws an error.

export async function addTodo(todoData) {
  
    try {
        const todo = await prisma.todo.create({
        data: todoData,
        });

        return todo;
    } catch (error) {
        throw new Error('Error creating todo');
    } finally { 
        prisma.$disconnect();
    }
}

// The deleteTodo function takes a todoId parameter, which represents the ID 
// of the todo you want to delete. It uses the Prisma client's delete method 
// with the where clause specifying the ID of the todo to be deleted. If 
// successful, the function returns the deleted todo. If an error occurs, 
// it throws an error.

export async function deleteTodo(todoId) {
    const prisma = new PrismaClient();
  
    try {
        const todo = await prisma.todo.delete({
            where: { id: todoId },
        });
  
        return todo;
    } catch (error) {
        throw new Error('Error deleting todo');
    } finally {
        prisma.$disconnect();
    }
}

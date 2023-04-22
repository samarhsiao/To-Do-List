export interface ToDoItem { 
    _id: string, 
    title: string | undefined, 
    isDone: boolean, 
    createdAt?:string,
    updatedAt?:string,
} 
import { IToDo} from '../@types/interfaces/index';

export class ToDo implements IToDo {
    constructor(
        public action: string,
        public description: string,
        public completed: boolean,
        public priority?: string
    ) {}
}

export const data: ToDo[] = [
    {
        action: 'task_1',
        description: 'text_1',
        completed: false,
        priority: 'high'
    },
    {
        action: 'task_2',
        description: 'text_2',
        completed: true,
        priority: 'low'
    },
    {
        action: 'task_3',
        description: 'text_3',
        completed: false,
        priority: 'high'
    },
    {
        action: 'task_4',
        description: 'text_4',
        completed: true,
        priority: 'high'
    },
    {
        action: 'task_5',
        description: 'text_5',
        completed: false,
        priority: 'high'
    },
    {
        action: 'task_6',
        description: 'text_6',
        completed: false,
        priority: 'low'
    },
    {
        action: 'task_7',
        description: 'text_7',
        completed: false,
        priority: 'high'
    }
]

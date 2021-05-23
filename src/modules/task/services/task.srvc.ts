import { Task } from '../models/task';
import TaskRepository from '../schemas/task.schema';

/**
 * @class TaskService
 */
class TaskService {


    /**
     * @description Saves the task in the storage
     * @param {Task} task
     * @returns {Promise<Task>}
     */
    async save(task: Task): Promise<Task> {
        return (await new TaskRepository(task).save()).toObject({virtuals: true});
    }



    /**
     * @description Fetches all tasks from the storage
     * @returns {Promise<Task[]>}
     */
     async findAll(): Promise<Task[]> {
        return await TaskRepository.find({}).populate(
            {
                path: 'idUser',
                model: 'User',
            })
             .populate(
                    {
                        path: 'idProject',
                        model: 'Project',
                    }) as Task[];
    }
    async findone(userId): Promise<Task[]> {
        return await TaskRepository.find({ idUser : userId})
        .populate(
            {
                path: 'idUser',
                model: 'User',
            })
             .populate(
                    {
                        path: 'idProject',
                        model: 'Project',
                    }) as Task[];
    }
    async findAllInproject(projectId): Promise<Task[]> {
        return await TaskRepository.find({idProject : projectId}).populate(
            {
                path: 'idUser',
                model: 'User',
            })
             .populate(
                    {
                        path: 'idProject',
                        model: 'Project',
                    }) as Task[];
    }
    async update(id , task): Promise<Task> {
        return await TaskRepository.update({_id: id}, task) as Task;
    }

    async deleteOneById(id: string): Promise<void> {
        return await TaskRepository.deleteOne({_id: id});
    }
    /**
     * @param user
     * @param idTask
     * @returns {Promise<Task[]>}
     */
    async findOneByIdAndOwnerId(userId): Promise<Task[]> {
        return await TaskRepository.find({idUser: userId}).populate({
            path: 'idUser',
            model: 'User'
        }) as Task[];
    }

    /**
     * @param user
     * @param idTask
     */
    async findOneById( idTask): Promise<Task> {
        return await TaskRepository.findOne({ _id: idTask}) as Task;
    }
    async findById(id): Promise<Task> {
        return await TaskRepository.findById(id) as Task;
    }

    updateUpdates(id, updates) {
        return TaskRepository.findByIdAndUpdate(id, {updates: updates});
    }

    /**
     * @description Fetches all tasks from the storage
     * @returns {Promise<Task>}
     */
    async find(user, taskId): Promise<Task> {
        return await TaskRepository.findOne({idUser: user._id, _id: taskId}) as Task;
    }

}

export default new TaskService();

import { getSuggestedTitle} from "../utils/ai.helper.js";
import { readTask, writeTask } from "../utils/file.util.js";

export const createTask = async (req, res) => {
     try {
          const { description } = req.body;
          if (!description) {
               return res.status(400).json({ message: 'Description is required' });
          }
           const title = await getSuggestedTitle(description);
          const task = await readTask();
          const newTask = {
               id: Date.now(),
               username: req.session.user.username,
               title,
               description,
               completed: false
          }
          task.push(newTask);
          await writeTask(task);
          res.status(200).json({ msg: 'Task is created successfully', newTask });
     } catch (error) {
          console.error('internal server error', error)
          res.status(500).json({ msg: 'internal server error to create task' });
     }
}
export const getAllTask = async (req, res) => {
     try {
          const data = await readTask();
          res.status(200).json({ mgs: true, data });
     } catch (error) {
          console.error("internal server error in getalltask", error);
          res.status(500).json({ msg: 'internal server error in get all task' });
     }
}
export const updateTask = async (req, res) => {
     try {
          const { id } = req.params;
          const { title, description } = req.body;
          const taskData = await readTask();
          const findData = taskData.find((item) => item.id == id);
          if (!findData) {
               return res.status(404).json({ success: false, msg: 'data is not found with id' });
          }
          findData.title = title || taskData.data,
               findData.description = description || taskData.description
          await writeTask(taskData);
          res.status(201).json({ msg: "data is updated successfully" });

     } catch (error) {
          console.error(error);
          res.status(500).json({ msg: 'internal server error in update task' });
     }

}
export const deleteTask = async (req, res) => {
     try {
          const { id } = req.params;
          const task = await readTask();
          const filterTask = task.filter((item) => item.id != id);
          await writeTask(filterTask);
          res.status(200).json({ msg: 'task is deleted successfully' });
     } catch (error) {
          console.error(error);
          res.status(500).json({ msg: 'internal server error in deleted task' });
     }

}
import React, { useState } from "react";
import { InputField } from "../components/inputField";

interface TodoListProp {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

interface EditModalProps {
  isOpen: boolean;
  name: string ;
  description: string;
  onClose: () => void;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const EditModal : React.FC<EditModalProps>=({
  isOpen,
  name,
  description,
  onClose,
  onClick,
}) =>{
  



  const [formEditData, setFormEditData] = useState({  
    name: name,
    description: description,
  });
return(<>
  <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
      <form>
        <InputField
          id="name"
          label="Task Name"
          onChange={(e) => {setFormEditData({...formEditData,name : e.target.value})}}
          placeholder={name}
          type="text"
          value={name}
        />
        <InputField
          id="description"
          label="Description"
          onChange={(e) => {setFormEditData({...formEditData,description: e.target.value})}}
          placeholder={description}
          type="text"
          value={description}
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4" onClick={()=>onClick}>Save</button>
      </form>
      <button onClick={onClose} className="mt-4 text-red-500">Close</button>
    </div>
  </div>
  </>

  
)

}
export const Todo = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [todoList, setTodoList] = useState<TodoListProp[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const[selectedTask,setSelectedTask] = useState<TodoListProp | null>(null)
const [isEditModalOpen,setIsModalOpen] = useState<boolean>(false)

const handleOpenModal = (task :TodoListProp) => {
  setIsModalOpen(true);
  setSelectedTask(task);
}

const handleCloseModal = () => {
  setIsModalOpen(false);}
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.name || !formData.description) {
        setError("Please fill all the fields");
        return;
      }

      const addNewData = {
        id: Math.random().toString(36).substring(2, 9),
        name: formData.name,
        description: formData.description,
        completed: false,
      };
      setFormData({ name: "", description: "" });
      setTodoList([...todoList, addNewData]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: string) => {
    setTodoList((prevList) => prevList.filter((task) => task.id !== id));
  };

  const handleComplete = (id: string) => {
    setTodoList((prevList) =>
      prevList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTask) {
      setTodoList((prevList) =>
        prevList.map((task) =>
          task.id === selectedTask.id ? { ...task, name: formData.name, description: formData.description } : task
        )
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tl from-[#F9F9F9] to-[#201d1d] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
          <p className="mt-2 text-lg text-gray-600">Manage your tasks efficiently.</p>
        </div>

        {/* Form Section */}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <InputField
            id="name"
            label="Task Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter task name"
            type="text"
            value={formData.name}
          />

          <InputField
            label="Description"
            id="description"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter task description"
            type="text"
            value={formData.description}
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
          >
            Add Task
          </button>
        </form>

        {/* Task Sections */}
        <div className="mt-8 space-y-4">
          {/* Completed Tasks */}
          <div>
            <h2 className="text-2xl font-semibold text-green-500">Completed Tasks</h2>
            <ul>
              {todoList
                .filter((task) => task.completed)
                .map((task) => (
                  <li key={task.id} className="flex justify-between items-center bg-green-50 p-4 rounded-lg shadow-md mb-4">
                    <div className="flex flex-col">
                      <h3 className="text-xl font-semibold text-gray-800">{task.name}</h3>
                      <p className="text-gray-600">{task.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                        disabled
                      >
                        Completed
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                        onClick={() => handleOpenModal(task)}
                      >
                        Edit
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          {/* Pending Tasks */}
          <div>
            <h2 className="text-2xl font-semibold text-red-500">Pending Tasks</h2>
            <ul>
              {todoList
                .filter((task) => !task.completed)
                .map((task) => (
                  <li key={task.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
                    <div className="flex flex-col">
                      <h3 className="text-xl font-semibold text-gray-800">{task.name}</h3>
                      <p className="text-gray-600">{task.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                        onClick={() => handleComplete(task.id)}
                      >
                        Complete
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <EditModal
      description={selectedTask?.description || ""}
      name={selectedTask?.name || ""}
      isOpen={isEditModalOpen}
      onClose={handleCloseModal}
      onClick={handleEdit}
      />
    </div>
  );
};

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { Task } from './models/task.model';
import { useForm } from "react-hook-form";
import { TaskCard } from './components/taskCard';
import moment from 'moment/min/moment-with-locales';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [toDos, setToDos] = useState([] as Task[]);
  const { register: create, trigger: createTrigger, getValues: createGetValues, reset } = useForm();

  const add = async () => {
    const isValid = await createTrigger(["name", "date", "description"], { shouldFocus: true });
    if(!isValid){
      return;
    }

    var newData = createGetValues();
    var date = new Date(newData.date.replace(/-/g, '\/'));
    setToDos((currentToDo) => currentToDo.concat(new Task(uuidv4(), newData.name, newData.description, date.getTime(), false)));
    reset({ name: "", date: "", description: "" });
  }

  const checked = (id: string) => {
    setToDos(prevState => prevState.map(task => {
      if (task.id == id) {
          return {
              ...task,
              isCompleted: !task.isCompleted,
          }
      }

      return task;
    }));
  }

  return (
    <div className="container mx-auto grid gap-y-4 mt-5">
      <div className="flex space-x-3">
        <h1 className='text-4xl font-bold'>To Do</h1>
        <h1 className='text-4xl text-slate-600 font-semibold'>{toDos.length}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-1 gap-2">
        <div className="col-span-11 grid gap-y-2">
          <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-1 gap-2 gap-y-2">
            <div className="col-span-12 md:col-span-8">
              <input type="text" 
                     className="shadow-sm appearance-none border border-slate-300 border-1 rounded-md w-full focus:shadow-outline py-2 px-3 placeholder-slate-400" 
                     placeholder="Task Name*"
                     {...create("name", {required: "The name is mandatory", validate: (value) => { return !!value.trim()}, setValueAs: value => value.trim()})} />
            </div>
            <div className="col-span-12 md:col-span-4">
              <input type="date" 
                     className="shadow-sm appearance-none border border-slate-300 border-1 rounded-md w-full focus:shadow-outline py-2 px-3 placeholder-slate-100"
                     {...create("date", {required: "The name is mandatory", validate: (value) => { return !!value.trim()}, setValueAs: value => value.trim()})} />
            </div>
          </div>
          <div>
            <textarea className="shadow-sm appearance-none border border-slate-300 border-1 rounded-md w-full focus:shadow-outline py-2 px-3" 
                      rows={4} 
                      placeholder="Description (optional)"
                      {...create("description", {setValueAs: value => value.trim()})}></textarea>
          </div>
        </div>
        <div className="col-span-12 md:col-span-1">
          <button className="bg-slate-600 rounded-lg text-white text-center self-center py-2 w-full" onClick={add}>
            <FontAwesomeIcon icon={faPlus} className='mr-2'/>Add
          </button>
        </div>
      </div>
      <div className='mt-5 grid gap-y-4'>
        <div className="flex space-x-3">
          <h1 className='text-3xl font-semibold'>Overdue</h1>
          <h1 className='text-3xl text-slate-600 font-semibold'>{toDos.filter((task: Task) => moment(task.date).isBefore(moment())).length}</h1>
        </div>
        <div className='grid gap-y-3'>
          {
            toDos.filter((task: Task) => moment(task.date).isBefore(moment()) && !task.isCompleted).map((task: Task, index: number) => {
              return (<TaskCard key={index}
                                name={task.name} 
                                date={task.date} 
                                description={task.description}
                                id={task.id}
                                checked={task.isCompleted}
                                onChecked={(id)=> {checked(id)}}></TaskCard>);
            })
          }
        </div>
      </div>
      <div className='mt-5 grid gap-y-4'>
        <div className="flex space-x-3">
          <h1 className='text-3xl font-semibold'>Outstanding</h1>
          <h1 className='text-3xl text-slate-600 font-semibold'>{toDos.filter((task: Task) => moment(task.date).isAfter(moment())).length}</h1>
        </div>
        <div className='grid gap-y-3'>
          {
            toDos.filter((task: Task) => moment(task.date).isAfter(moment()) && !task.isCompleted).map((task: Task, index: number) => {
              return (<TaskCard key={index}
                                name={task.name} 
                                date={task.date} 
                                description={task.description}
                                id={task.id}
                                checked={task.isCompleted}
                                onChecked={(id)=> {checked(id)}}></TaskCard>);
            })
          }
        </div>
      </div>
      <div className='mt-5 grid gap-y-4'>
        <div className="flex space-x-3">
          <h1 className='text-3xl font-semibold'>Complete</h1>
          <h1 className='text-3xl text-slate-600 font-semibold'>{toDos.filter((task: Task) => task.isCompleted).length}</h1>
        </div>
        <div className='grid gap-y-3'>
          {
            toDos.filter((task: Task) => task.isCompleted).map((task: Task, index: number) => {
              return (<TaskCard key={index}
                                name={task.name} 
                                date={task.date} 
                                description={task.description}
                                id={task.id}
                                checked={task.isCompleted}
                                onChecked={(id)=> {checked(id)}}></TaskCard>);
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;

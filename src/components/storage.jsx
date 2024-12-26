export function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}
export function getTask(index) { 
    let t = JSON.parse(localStorage.getItem ("tasks")) || [];
    let task = t[index];
    return task
}
  
export function saveTask(task, index) {
    let t = JSON.parse(localStorage.getItem ("tasks")) || [];
    t[index] = task;
    saveTasks(t);
}
  
export function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
  
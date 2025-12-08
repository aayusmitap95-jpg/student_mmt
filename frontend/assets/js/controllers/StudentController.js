import { 
    apiGetAll, 
    apiGetOne, 
    apiCreate, 
    apiUpdate, 
    // apiDelete 
} from "../services/studentService.js";

import { showAlert } from "../components/Alert.js";
import { renderStudentTable } from "../components/StudentTable.js";
import { resetForm, fillForm } from "../components/StudentForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";
export function initStudentController() {
  loadStudents();
  $("studentForm").addEventListener("submit", async (e) => {
    
    e.preventDefault();
    const data = {
      name: $("name").value.trim(),   // Get name value, remove whitespace
      email: $("email").value.trim(), // Get email value
      course: $("course").value.trim(), // Get course value
      year: $("year").value.trim()    // Get year value
    };
    const { editingId } = getState();

    editingId
      ? await updateStudent(editingId, data) 
      : await createNewStudent(data);        
  });


  
  $("cancelBtn").addEventListener("click", () => {
    
    setState({ editingId: null });
   
    resetForm();
  });
}



export async function loadStudents() {
  
  const spinner = $("loadingSpinner");
  const table = $("studentsTableContainer");
  spinner.style.display = "block";
  table.style.display = "none";
I
  const students = await apiGetAll();

  setState({ students });
  
  renderStudentTable(students);

  spinner.style.display = "none";
  table.style.display = "block";
}

export async function createNewStudent(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("Student added!");
    resetForm();
    loadStudents();
  }
}
export async function editStudent(id) {
  const student = await apiGetOne(id);

  setState({ editingId: id });
  fillForm(student);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update an existing student
export async function updateStudent(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetForm();
    setState({ editingId: null });
    loadStudents();
  }
}

// Delete a student
// export async function deleteStudentAction(id) {
//   if (!confirm("Delete this student?")) return;

//   const res = await apiDelete(id);
//  	if (res.ok) {
//     showAlert("Deleted!");
//     loadStudents();
//   }
// }
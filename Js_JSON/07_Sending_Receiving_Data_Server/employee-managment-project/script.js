let log = console.log; // for debugging
// API URL to our data
const apiUrl = 'http://localhost:3000/employees';

// Fetcing Employees
function fetchEmployees() {
    fetch(apiUrl)
        .then(response => response.json())  // Note
        .then(data => displayEmployees(data)) // fucntion call
        .catch(error => console.error('Error:', error));
}

/* Note that despite the method being named .json(),
the result is not JSON but is instead the result of taking JSON as input 
and parsing it to produce a JavaScript object. */


function addEmployee() {
    // Values to be sent to the server
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const skills = document.getElementById('skills').value.split(',');
    log("Skills: ", skills)

    const employee = {
        name: name,
        age: parseInt(age), // Convert age to a number
        skills: skills
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchEmployees(); // Function call
    })
    .catch(error => console.error('Error:', error));
}

function displayEmployees(employees) {
    //log(employees)

    // ul to dislay each employee as a list item
    const employeeList = document.getElementById('employees');
    employeeList.innerHTML = '';

    employees.forEach(employee => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Name:</strong> ${employee.name} <br> 
                        <strong>Age:</strong> ${employee.age} <br> 
                        <strong>Skills:</strong> ${employee.skills}`;
        employeeList.appendChild(li);


    });
}

// Initial fetch to display employees
fetchEmployees();

//End
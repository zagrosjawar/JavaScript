// When the html page loads
document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');

    // Function call
    loadUsers();

    // Add user event
    userForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Getting input values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        //Function call
        addUser(name, email);
    })


    // Function to load users
    function loadUsers() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // getting users data from a json file - convert json format to text format.
                const users = JSON.parse(this.responseText);
                //What to do with users?
                displayUsers(users)
            }
        };
        // Open (make) a request 
        xhttp.open("GET", "http://localhost:3000/users", true);
        // Send your request
        xhttp.send();

    }

    // Now it is up to you to be creative.. you got the data/users you requested
    // Function to display users
    function displayUsers(users) {
        userList.innerHTML = ""; // clear the <ul></ul> to populate it with list items <li>

        // Traversing the list of user objects
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name} - ${user.email}`
            userList.appendChild(li);


            // Add a delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = 'Delete';

            deleteButton.addEventListener("click", function () {
                // Function call
                deleteUser(user.id);
            });

            li.appendChild(deleteButton);


            // Add update button
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.addEventListener("click", function () {
                // Function call
                updateUser(user.id, prompt("New name: "), prompt("New email:"));
            });
            li.appendChild(updateButton)
        });
    }

    
    // Function to add a user
    function addUser(name, email) {
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 201) {
                loadUsers(); // Reload users after adding
            }
        };

        xhttp.open("POST", "http://localhost:3000/users", true);
        xhttp.setRequestHeader("Content-Type", "application/json")

        // Create a JSON string from the user data; from text format to json format
        const data = JSON.stringify({ name: name, email: email });

        // Send the JSON string to the server (local json-server)
        xhttp.send(data);
    }


    // Function to delete a user
    function deleteUser(id) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                loadUsers(); // Reload users after deleting
            }
        };
        xhttp.open("DELETE", `http://localhost:3000/users/${id}`, true);
        xhttp.send();
    }


    // Function to update a user
    function updateUser(id, name, email) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                loadUsers(); // Reload users after updating
            }
        };
        xhttp.open("PUT", `http://localhost:3000/users/${id}`, true);
        xhttp.setRequestHeader("Content-Type", "application/json");

        // Create a JSON string from the user data
        const data = JSON.stringify({ name: name, email: email });

        // Send the JSON string to the server
        xhttp.send(data);
    }

});
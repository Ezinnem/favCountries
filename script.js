let addUserData = () => {
    // Get the input values
    let name = document.getElementById("name").value;
    let country = document.getElementById("country").value;

    // Check if the name and country are not empty
    if (name !== "" && country !== "") {
        // Get the existing data from local storage
        let data = JSON.parse(localStorage.getItem("favCountry")) || [];

        // Add the new data to the existing data
        data.push({ name: name, country: country });

        // Save the updated data to local storage
        localStorage.setItem("favCountry", JSON.stringify(data));

        document.getElementById("name").value = "",
            document.getElementById("country").value = ""

        // Refresh the table
        showUserData();

    } else {
        alert("Please enter a name and your country");
    }
}

let deleteUserData = (index) => {
    // Get the existing data from local storage
    let data = JSON.parse(localStorage.getItem("favCountry")) || [];

    // Remove the data at the specified index
    data.splice(index, 1);

    // Save the updated data to local storage
    localStorage.setItem("favCountry", JSON.stringify(data));

    // Refresh the table
    showUserData();
}

let showUserData = () => {
    // Get the existing data from local storage
    let data = JSON.parse(localStorage.getItem("favCountry")) || [];

    // Build the table HTML
    let tableHtml = "<tr><th>Name</th><th>Country</th><th>Action</th></tr>";
    for (let i = 0; i < data.length; i++) {
        tableHtml +=
            "<tr><td>" +
            data[i].name +
            "</td><td>" +
            data[i].country +
            "</td><td><button class='delete-button' onclick='deleteUserData(" +
            i +
            ")'>Delete</button></td></tr>";
    }

    // Update the table
    document.getElementById("dataTable").innerHTML = tableHtml;
}

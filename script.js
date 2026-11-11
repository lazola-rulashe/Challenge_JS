
const form = document.getElementById("form");

form.addEventListener("submit", function(event) {

    event.preventDefault(); // prevents the form from refreshing the webpage when you click the Submit button

    // gets the uploaded CSV file
    const file = document.getElementById("csvFile").files[0];

    // gets the username
    const username = document.getElementById("username").value.trim();

	// error handling for when user doesnt insert a file
    if (!file) {
        alert("Please upload a CSV file");
        return;
    }

    // reads the CSV file
    const reader = new FileReader();

    reader.onload = function(event) {

        const data = event.target.result;

        const rows = data.trim().split(/\n/);

        // finds the student
        const student = rows
            .slice(1)
            .map(row => row.split(","))
            .find(columns => columns[0].trim() === username);

        if (student && student.length >= 8) {

            const part1F = student[2];
            const part1S = student[3];
            const part1H = student[4];
            const part2F = student[5];
            const part2S = student[6];
            const part2H = student[7];

            document.getElementById("output").innerHTML = `

                <h2>Hi ${username}</h2>

                <h3>Your assessment results</h3>

                <h4>First attempt:</h4>
                Coding: ${part1F}<br>
                Long Form: ${part1S}<br>
                Average: ${part1H}<br>

                <h4>Second attempt:</h4>
                Coding: ${part2F}<br>
                Long Form: ${part2S}<br>
                Average: ${part2H}

            `;

        } else {

            document.getElementById("output").innerHTML =
                "Username not found. Please try again.";

        }

    };

    reader.readAsText(file);

});

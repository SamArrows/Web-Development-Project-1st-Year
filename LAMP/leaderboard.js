fetch('./messages.json')
           .then(results => results.json())
           .then(data => {
                for(let i = 0; i < data.length; i++){

                    var row = document.createElement("tr");
                    var nameCell = document.createElement("td");
                    var totalCell = document.createElement("td");
                    var scoresCell = document.createElement("td");

                    nameCell.textContent = data[i]["name"];
                    totalCell.textContent = data[i]["total"];
                    scoresCell.textContent = data[i]["scores"];

                    row.appendChild(nameCell);
                    row.appendChild(totalCell);
                    row.appendChild(scoresCell);
                    document.getElementById("tbl").appendChild(row);
                }
           });
// Search Database for Buddy 
async function searchBuddyHandler(event) {
    const username = document.querySelector("#add-buddy-input").value.trim();
    const foundUser = document.querySelector(".found-user")


    if(username) {
        const response = await fetch ('/api/users/' + username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json();
        })
        console.log(response.id, response.username)
        foundUser.innerHTML = response.username + ' User ID: ' + response.id;
        
        if(username == response.username) {
            $("#add-buddy-modal").modal('toggle')
            } else {
            $("#search-fail-modal").modal('toggle')
        }
    }
}

async function addBuddyHandler(event) {
    const addToBuddyList = document.querySelector("#add-to-buddy-list");
    const foundUser = document.querySelector(".found-user");
    const userId = foundUser.innerHTML.split(": ")[1];

    const response = await fetch('/api/users/buddy' + userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok) {
        console.log('Buddy Added!')
    }
    console.log(userId);
}



// Sample Exercise
async function sampleExercise() {
    const exerciseEl = document.querySelector('.suggested-exercise');

    $.ajax('/api/exercises/dashboard', {
        type: 'GET'
    }).then(
       function () {
           
       }
    )
    // await fetch('/api/exercises/dashboard', {
    //     method: 'GET'
    // })
    // .then( response => {
    //     response.json()
    // }
    // )
    // .then(results => {
    //     JSON.stringify(results)
    //     exerciseEl.appendChild(results)
    // })
}

sampleExercise()

// Create a new chart
let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
            label: 'My First dataset',
            backgroundColor: 'rgba(54, 189, 207, .8)',
            borderColor: 'rgba(255, 255, 255, .8)',
            data: [1, 10, 20, 30, 40, 20, 30]
            },
            {
                label: 'My Second dataset',
                backgroundColor: 'rgba(255, 98, 208, .8)',
                borderColor: 'rgba(255, 255, 255, 1)',
                data: [1, 5, 30, 20, 10, 25, 45]  
            }
        ],
    },
    options: {
        responsive: true,
        scales: {
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                    color: 'white'
                },
                ticks: {
                    fontColor: 'white',
                    fontFamily: 'Russo One',
                    fontSize: 16,
                }
            }],
            xAxes: [{
                gridLines: {
                    drawBorder: false,
                    color: 'white'
                },
                ticks: {
                    fontColor: 'white',
                    fontFamily: 'Russo one',
                    fontSize: 16,
                }
            }],
        },
        legend: {
            labels: {
                fontColor: 'white',
                fontSize: 16,
                fontFamily: 'Russo One',
            }
        }
    }
});

document.querySelector('.add-buddy-btn').addEventListener('click', searchBuddyHandler)
document.querySelector('#add-to-buddy-list').addEventListener('click', addBuddyHandler)

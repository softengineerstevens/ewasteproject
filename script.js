// Show form for personal details
function showForm() {
    let button1 = document.getElementById('personal');
    button1.addEventListener('click', () => {
        console.log("Personal details button clicked");
        document.getElementById('form-container').style.display = "block";
    });
}
showForm();

// Toggle item details dropdown
function toggleDropDown() {
    let button2 = document.getElementById('itemdetails');
    let dropdown = document.getElementById('itemDropdown');
    button2.addEventListener('click', () => {
        console.log("Item details button clicked");
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
    });
}
toggleDropDown();

// Handle item selection
function handleItemSelection() {
    let dropdownItemsLoc = document.querySelectorAll('#itemDropdown a');
    dropdownItemsLoc.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            let selectedItem = event.target.getAttribute('data-item');
            console.log("Item selected:", selectedItem);
            fetch('https://my-json-server.typicode.com/softengineerstevens/ewasteproject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item: selectedItem })
            }).then(res => res.json())
              .then(data => console.log(data))
              .catch(err => console.log('rejected', err));
        });
    });
}
handleItemSelection();

// Submit personal information form
const form1 = document.querySelector('#personalinfoform');
form1.addEventListener('submit', event => {
    event.preventDefault();
    console.log("Submitting personal information form");
    const formData = new FormData(form1);
    const data = Object.fromEntries(formData);
    fetch(' https://my-json-server.typicode.com/softengineerstevens/ewasteproject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log('rejected', err));
});

// Toggle location details dropdown
function toggleLocationDropdown() {
    let button3 = document.getElementById('location');
    let locationDropdown = document.getElementById('locationDropdown');
    button3.addEventListener('click', () => {
        console.log("Location details button clicked");
        locationDropdown.style.display = locationDropdown.style.display === "none" ? "block" : "none";
    });
}
toggleLocationDropdown();

// Handle location selection
function handleLocationSelection() {
    let dropdownItemsLoc = document.querySelectorAll('#locationDropdown a');
    dropdownItemsLoc.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            let selectedLocation = event.target.getAttribute('data-location');
            console.log("Location selected:", selectedLocation);
            fetch(' https://my-json-server.typicode.com/softengineerstevens/ewasteproject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ location: selectedLocation })
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log('Error:', err));
        });
    });
}
handleLocationSelection();

function initializeDatePicker() {
    let button4 = document.getElementById('dates');
    button4.addEventListener('click', () => {
        console.log("Collection dates button clicked");
        
        // Create date picker container
        let dateContainer = document.createElement('div');
        dateContainer.id = 'date-picker-container';
        document.body.appendChild(dateContainer);
        
        // Create input element for the date picker
        let dateInput = document.createElement('input');
        dateInput.id = 'date-picker';
        dateContainer.appendChild(dateInput);
        
        // Create submit button
        let submitButton = document.createElement('button');
        submitButton.textContent = 'Submit Date';
        dateContainer.appendChild(submitButton);
        
        // Initialize flatpickr
        flatpickr("#date-picker", {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            minDate: "today",
            inline: true,
            disable: [
                function(date) {
                    return !(date.getDay() === 0 || date.getDay() === 6);
                }
            ]
        });

        // Add event listener to the submit button
        submitButton.addEventListener('click', () => {
            let selectedDate = document.getElementById('date-picker').value;
            if (selectedDate) {
                console.log("Date selected:", selectedDate);
                fetch(' https://my-json-server.typicode.com/softengineerstevens/ewasteproject', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ collectionDate: selectedDate })
                }).then(res => res.json())
                  .then(data => {
                      console.log(data);
                      document.body.removeChild(dateContainer);
                  })
                  .catch(err => console.log('Error:', err));
            } else {
                alert("Please select a date and time.");
            }
        });

        // Make the date picker draggable
        $(dateContainer).draggable();
    });
}
initializeDatePicker();

// Handle additional information form submission
function handleAdditionalInfoSubmission() {
    const additionalInfoForm = document.getElementById('additionalInfoForm');
    additionalInfoForm.addEventListener('submit', event => {
        event.preventDefault();
        console.log("Submitting additional information form");
        const additionalInfo = document.getElementById('additionalInfo').value;
        if (additionalInfo) {
            fetch(' https://my-json-server.typicode.com/softengineerstevens/ewasteproject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ additionalInfo: additionalInfo })
            }).then(res => res.json())
              .then(data => console.log(data))
              .catch(err => console.log('Error:', err));
        } else {
            alert("Please enter some additional information.");
        }
    });
}
handleAdditionalInfoSubmission();
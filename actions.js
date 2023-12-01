// Function to fetch data from an API using promises
function fetchData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

// Function to create and append elements for Harry Potter staff
function displayHarryPotterStaff(staff) {
    const staffList = document.getElementById('staff-list');

    // Display all staff members
    staff.forEach(person => {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';

        // Display image or empty avatar if image is empty or null
        const image = document.createElement('img');
        image.src = person.image || 'null-image-avatar.png';
        image.alt = person.name;
        image.classList.add('staff-image');
        image.style.width = '200px';
        image.style.height = '250px';

        listItem.appendChild(image);

        // Display name
        const name = document.createElement('p');
        name.textContent = `Name: ${person.name}`;
        listItem.appendChild(name);

        // Display house
        const house = document.createElement('p');
        house.textContent = `House: ${person.house || 'Unknown'}`;
        listItem.appendChild(house);

        // Display ancestry
        const ancestry = document.createElement('p');
        ancestry.textContent = `Ancestry: ${person.ancestry || 'Unknown'}`;
        listItem.appendChild(ancestry);

        staffList.appendChild(listItem);
    });
}

// Execute function to display Harry Potter staff on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchData('https://hp-api.onrender.com/api/characters/staff')
        .then(staff => displayHarryPotterStaff(staff))
        .catch(error => {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Error fetching Harry Potter staff: ${error}`;
            document.body.appendChild(errorMessage);
        });
});

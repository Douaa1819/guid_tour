
///// booking in destination details page 

(function () {
    emailjs.init('q2Lm4pXv-bQeUkHGx'); // Replace with your user ID
})();
const confirmBookingButton = document.querySelector('#confirm-booking');
const serviceID = 'service_t7m0kdu'; // Replace with your service ID
const templateID = 'template_z8sk5ar'; // Replace with your template ID

// Check if confirmBookingButton exists before adding event listener
if (confirmBookingButton) {
    confirmBookingButton.addEventListener('click', sendBookingInfo);
}

function sendBookingInfo() {
    // Get the selected values from the new form fields
    const from = document.querySelector('#from').value;
    const guests = document.querySelector('#guests').value;

    // Construct the email parameters
    const emailParams = {
        from_name: 'guidTour',
        to_name: 'guid',
        message: `
            Booking Information:
            From: ${from}
            Number of Guests: ${guests}
        `,
        reply_to: 'ouchinmustapha82@email.com',
    };

    // Send the email using EmailJS
    emailjs
        .send(serviceID, templateID, emailParams)
        .then(() => {
            console.log('Email sent successfully!');
            // Show Flowbite modal
            const modal = document.createElement('div');
            modal.classList.add('fixed', 'z-10', 'inset-0', 'overflow-y-auto');
            modal.setAttribute('aria-labelledby', 'modal-title');
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.innerHTML = `
                <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        Email Sent Successfully
                                    </h3>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">Your booking information has been sent successfully.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" onclick="closeModal(this)">
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            // Show error alert if needed
        });
}

function closeModal(button) {
    const modal = button.closest('.fixed');
    modal.remove();
}


///// booking in destination details page 




//// populaire destination in destination details page 


fetch('../destinations.json')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('destinations');
    data.forEach(destination => {
        if ([5, 6, 7, 8].includes(destination.id)) {
            const card = document.createElement('div');
            card.classList.add('bg-white', 'p-4', 'shadow-lg', 'rounded-lg', 'cursor-pointer');
            card.innerHTML = `
                <img src="${destination.img || 'default-image.jpg'}" alt="${destination.title}" class="w-full h-48 object-cover rounded-lg mb-4">
                <h2 class="text-xl font-bold">${destination.title}</h2>
                <p class="text-yellow-500 mt-1"><span class="font-bold">${destination.rating}</span> <span>(${destination.reviews} reviews)</span></p>
                <p class="mt-2 text-gray-600">${destination.description.substring(0, 100)}...</p>
                <p class="mt-2 text-green-500 text-lg font-bold">${destination.price}</p>
            `;
            card.addEventListener('click', () => {
                localStorage.setItem('selectedDestination', JSON.stringify(destination));
                window.location.href = 'destinationDetails.html';
            });
            container.appendChild(card);
        }
    });
});

//// populaire destination in destination details page 






//// fetche destination details data 


    document.addEventListener('DOMContentLoaded', function() {
        const selectedDestination = JSON.parse(localStorage.getItem('selectedDestination'));

        if (!selectedDestination || !selectedDestination.id) {
            console.error('No destination id found in localStorage.');
            return;
        }
        
        fetch('../destinations.json')
            .then(response => response.json())
            .then(data => {
                const destination = data.find(dest => dest.id === selectedDestination.id);
                if (destination) {
                    document.getElementById('destination-title').textContent = destination.title;
                    document.getElementById('destination-rating').textContent = destination.rating;
                    document.getElementById('destination-reviews').textContent = `(${destination.reviews} reviews)`;
                    document.getElementById('destination-img').src = destination.img;
                    document.getElementById('destination-description').textContent = destination.description;
                    document.getElementById('destination-duration').textContent = destination.duration;
                    document.getElementById('destination-language').textContent = 'English'; // Assume English if not specified
                    document.getElementById('destination-people').textContent = '5 People'; // Assume 5 people if not specified
                    document.getElementById('destination-meeting-point').textContent = 'Meet your guide outside the main entrance of Alpha Park (Whitechapel Road). It\'s opposite the entrance to the Royal Exchange. Exit from Station and the Whitechapel Gallery. Look for a guide wearing a "SPT" t-shirt and holding a red sign.';
                    document.getElementById('destination-map').src = destination.location;

                    const highlightsContainer = document.getElementById('destination-highlights');
                    const activitiesContainer = document.getElementById('destination-activities');
                    const includesContainer = document.getElementById('destination-includes');
                    const notIncludesContainer = document.getElementById('destination-not-includes');
                    const safetyContainer = document.getElementById('destination-safety');

                    destination.points_of_interest.forEach(point => {
                        const div = document.createElement('div');
                        div.classList.add('flex', 'items-start');
                        div.innerHTML = `
                            <svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <div>
                                <h3 class="font-bold">${point.split(':')[0]}</h3>
                                <p class="text-sm text-gray-600">${point.split(':')[1]}</p>
                            </div>
                        `;
                        highlightsContainer.appendChild(div);
                    });

                    destination.activities.forEach(activity => {
                        const li = document.createElement('li');
                        li.textContent = activity;
                        activitiesContainer.appendChild(li);
                    });

                    destination.includes.forEach(include => {
                        const li = document.createElement('li');
                        li.textContent = include;
                        includesContainer.appendChild(li);
                    });

                    destination.not_includes.forEach(notInclude => {
                        const li = document.createElement('li');
                        li.textContent = notInclude;
                        notIncludesContainer.appendChild(li);
                    });

                    const safetyMeasures = ['All required protective equipment is provided', 'All areas that customers touch are frequently cleaned', 'You must keep social distance while in vehicles', 'The number of visitors is limited to reduce crowds'];
                    safetyMeasures.forEach(safety => {
                        const li = document.createElement('li');
                        li.textContent = safety;
                        safetyContainer.appendChild(li);
                    });
                }
            })
            .catch(error => console.error('Error fetching destination data:', error));
    });


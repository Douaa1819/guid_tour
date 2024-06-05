//dont select date in past 

document.addEventListener('DOMContentLoaded', function() {
    var dateInput = document.getElementById('dateInput');
    var today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
});

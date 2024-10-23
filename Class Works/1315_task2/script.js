document.getElementById('applicationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var id = document.getElementById('studentId').value.trim();
    var name = document.getElementById('fullName').value.trim();
    var mail = document.getElementById('email').value.trim();
    var birthDate = document.getElementById('dob').value.trim();
    var gradePointAvg = document.getElementById('cgpa').value.trim();
    var phoneNumber = document.getElementById('phoneNo').value.trim();
    
    var errors = [];

    var idParts = id.split('-');
    if (idParts.length !== 3 ||
        isNaN(parseInt(idParts[0])) ||
        isNaN(parseInt(idParts[1])) ||
        isNaN(parseInt(idParts[2]))) {
        errors.push("Student ID format is invalid");
    }

    var nameParts = name.split(' ');
    if (nameParts.length !== 2 || name.length < 6 || name.length > 30) {
        errors.push("Full Name must contain both first name and last name and be between 6 and 30 characters");
    }
    
    var mailParts = mail.split('@');
    if (mailParts.length !== 2 || mailParts[0] === '' || mailParts[1].indexOf('.') === -1) {
        errors.push("Email Address is invalid");
    }
    
    var birthDateParts = birthDate.split('/');
    var dobDate = new Date(birthDateParts[2], birthDateParts[0] - 1, birthDateParts[1]);
    var currentDate = new Date();
    var minDate = new Date(1997, 0, 1);
    if (!(dobDate instanceof Date && !isNaN(dobDate.valueOf()) && dobDate < currentDate && dobDate >= minDate)) {
        errors.push("Date of Birth is invalid or out of range");
    }
    
    if (isNaN(gradePointAvg) || parseFloat(gradePointAvg) <= 3.90) {
        errors.push("CGPA must be a number greater than 3.90");
    }
    
    var validPhonePrefixes = ['017', '019', '016', '013', '014', '+88017', '+88019', '+88016', '+88013', '+88014'];
    var validPhoneLengths = [13, 14];
    var phoneNoPrefix = phoneNumber.substring(0, phoneNumber.length > 5 ? 6 : 0);
    if (!validPhonePrefixes.includes(phoneNoPrefix) || !validPhoneLengths.includes(phoneNumber.length)) {
        errors.push("Phone No. format is invalid");
    }
    
    if (errors.length > 0) {
        alert("Validation errors:\n" + errors.join("\n"));
    } else {
        alert("Form submitted successfully!");     
    }
});

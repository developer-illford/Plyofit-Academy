// ************************************************************************************
// STUDENTS ZONE VALIDATIONS
// ************************************************************************************

//validate using certificate ID
document.addEventListener("DOMContentLoaded", function () {
    var certIdInput = document.getElementById("cert_id");
    var validateButton = document.getElementById("validate_cert_id");
    var validatorDisplay1 = document.querySelector(".validator_display1");

    validateButton.addEventListener("click", function () {
        validatorDisplay1.style.display = 'block'
        var certId = certIdInput.value.trim();
        if (certId === "") {
            alert("Please enter a Certificate ID");
            return;
        }

        // Reference to the certificates section of the database
        var certificatesRef = firebase.database().ref("certificates");

        // Check if the certificate ID exists in the database
        certificatesRef.child(certId).once("value", function (snapshot) {
            var certificateData = snapshot.val();
            if (certificateData) {
                // Certificate exists, display validation result and person's name
                validatorDisplay1.innerHTML = "Certificate with ID: " + certificateData.certificate_id + " is valid.<br/> Name: " + certificateData.student_name;
            } else {
                // Certificate does not exist
                validatorDisplay1.innerHTML = "Certificate with ID: " + certId + " is not found";
            }
        });
    });
});



//validate using Student Code
document.addEventListener("DOMContentLoaded", function () {
    var studentCodeInput = document.getElementById("student_code");
    var validateButton = document.getElementById("validate_student_code");
    var validatorDisplay2 = document.querySelector(".validator_display2");

    validateButton.addEventListener("click", function () {
        validatorDisplay2.style.display = 'block';
        var studentCode = studentCodeInput.value.trim();
        if (studentCode === "") {
            alert("Please enter a Student Code");
            return;
        }

        // Reference to the certificates section of the database
        var certificatesRef = firebase.database().ref("certificates");

        // Query certificates based on student code
        certificatesRef.orderByChild("student_code").equalTo(studentCode).once("value", function (snapshot) {
            var studentDetails = "";
            // var uniqueAwards = {}; // Object to store unique awards

            // Iterate over each certificate associated with the student code
            snapshot.forEach(function (childSnapshot) {
                var certificateData = childSnapshot.val();
                // Append certificate details to studentDetails string
                studentDetails += "Certificate ID: " + certificateData.certificate_id + "<br/>";
                studentDetails += "Course Title: " + certificateData.course_title + "<br/>";
                studentDetails += "Certifying Authority: " + certificateData.cert_athority + "<br/><br/>";

                // Check if the award is not already displayed
                // if (!uniqueAwards[certificateData.awards]) {
                //     uniqueAwards[certificateData.awards] = true; // Mark the award as displayed
                // }
            });

            if (studentDetails !== "") {
                // Get the student's name from the last certificate in the snapshot
                var studentName = snapshot.val()[Object.keys(snapshot.val())[0]].student_name;
                // Student details found, display them
                validatorDisplay2.innerHTML = "Student Name: " + studentName + "<br/>" +
                    "Student Code: " + studentCode + "<br/>" ;
                    // + "<b>Awards:</b><br/>";

                // Display unique awards
                // for (var award in uniqueAwards) {
                //     validatorDisplay2.innerHTML += award + "<br/>";
                // }

                validatorDisplay2.innerHTML += "<br/><b>Certifications:</b><br/>" + studentDetails;
            } else {
                // Student not found or has no certifications
                validatorDisplay2.innerHTML = "Student with code: " + studentCode + " is not found or has no certifications";
            }
        });
    });
});



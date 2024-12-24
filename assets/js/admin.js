// ********************************************************************************************
//CAREERS SECTION ADMIN PANNEL
// ********************************************************************************************

// variable decerations
var jobId, vacancyName, JobDescriptioon, Experience, DeadLine;

//function to read careers form data
function readFomV() {
    jobId = document.getElementById("job_id").value;
    vacancyName = document.getElementById("vacancy_name").value;
    JobDescriptioon = document.getElementById("job_description").value;
    Experience = document.getElementById("experience").value;
    DeadLine = document.getElementById("deadline").value;
    console.log(jobId, vacancyName, JobDescriptioon, Experience, DeadLine);
}

function clearVaccancyForm() {
    event.preventDefault();
    document.getElementById("job_id").value = "";
    document.getElementById("vacancy_name").value = "";
    document.getElementById("job_description").value = "";
    document.getElementById("experience").value = "";
    document.getElementById("deadline").value = "";
}
function clearCertificationsForm() {
    event.preventDefault();
    document.getElementById("certificate_id").value = "";
    document.getElementById("student_name").value = "";
    document.getElementById("student_code").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("course_title").value = "";
    document.getElementById("cert_athority").value = "";
}

//function to add vacancy data 
document.getElementById("createV").onclick = function () {
    readFomV();

    if (jobId && vacancyName && JobDescriptioon && Experience && DeadLine) {
        alert('Are you sure to Update?')
        firebase
            .database()
            .ref("vacancies/" + jobId)
            .set({
                job_id: jobId,
                vacancy_name: vacancyName,
                job_description: JobDescriptioon,
                experience: Experience,
                deadline: DeadLine,
            });
        alert("New vacancy added");
        clearVaccancyForm();
    } else {
        alert("Please enter Full details to insert vacancy data.");
    }
};

//function to read vacancy data 
// document.getElementById("readV").onclick = function () {
//     readFomV();

//     if (jobId) {
//         firebase
//         .database()
//         .ref("vacancies/" + jobId)
//         .on("value", function (snap) {
//             document.getElementById("job_id").value = snap.val().job_id;
//             document.getElementById("vacancy_name").value = snap.val().vacancy_name;
//             document.getElementById("job_description").value = snap.val().job_description;
//             document.getElementById("experience").value = snap.val().experience;
//             document.getElementById("deadline").value = snap.val().deadline;
//         });
//     } else {
//         alert("Please enter a Job ID to read vacancy data.");
//     }
// };

//function to update vacancy data 
// document.getElementById("updateV").onclick = function () {
//     readFomV();

//     if (jobId, vacancyName, JobDescriptioon, Experience, DeadLine) {
//         firebase
//         .database()
//         .ref("vacancies/" + jobId)
//         .update({
//             job_id:jobId,
//             vacancy_name: vacancyName,
//             job_description: JobDescriptioon,
//             experience: Experience,
//             deadline: DeadLine,
//         });
//     alert("Vacancy Details Updated");
//     } else {
//         alert("Please enter a full details to update vacancy data.");
//     }


//     document.getElementById("job_id").value = "";
//     document.getElementById("vacancy_name").value = "";
//     document.getElementById("job_description").value = "";
//     document.getElementById("experience").value = "";
//     document.getElementById("deadline").value = "";
// };




//function to remove vacancy data 
// document.getElementById("deleteV").onclick = function () {
//     readFomV();

//     if (jobId) {
//         firebase
//             .database()
//             .ref("vacancies/" + jobId)
//             .remove();
//         alert("vacancy removed");
//     } else {
//         alert("Please enter a Job ID to delete vacancy data.");
//     }
//     document.getElementById("job_id").value = "";
//     document.getElementById("vacancy_name").value = "";
//     document.getElementById("job_description").value = "";
//     document.getElementById("experience").value = "";
//     document.getElementById("deadline").value = "";

// };

















// ********************************************************************************************
// Function to create the vacancies table with expand/collapse functionality
// ********************************************************************************************
function createVacanciesTable(snapshot) {
    // Clear previous content of the dummy_table div
    var tableDiv = document.querySelector(".vacancy_table");
    tableDiv.innerHTML = "";

    // Create a table element
    var table = document.createElement("table");
    table.classList.add("vacancies_table");

    // Create table header
    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th class='action-column'>Action</th><th>Job ID</th><th>Vacancy Name</th><th>Job Description</th><th>Experience</th><th>Deadline</th>";
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    var tbody = document.createElement("tbody");

    // Iterate through vacancies data and populate the table
    snapshot.forEach(function (childSnapshot) {
        var vacancyKey = childSnapshot.key; // Get the key of the job
        var vacancyData = childSnapshot.val();
        var row = document.createElement("tr");
        row.innerHTML = "<td><button class='edit_btn' data-key='" + vacancyKey + "'><i class='fa-solid fa-pen-to-square'></i>&nbsp;&nbsp;Edit</button><br><button class='delete_btn' data-key='" + vacancyKey + "'><i class='fa-solid fa-trash'></i>&nbsp;&nbsp;Delete</button></td>" +
            "<td>" + vacancyData.job_id + "</td>" +
            "<td>" + vacancyData.vacancy_name + "</td>" +
            "<td class='job_description_cell'>" +
            "<div class='job_description_content'>" + vacancyData.job_description + "</div>" +
            "<button class='expand_collapse_btn'>Expand/Collapse</button>" +
            "</td>" +
            "<td>" + vacancyData.experience + "</td>" +
            "<td>" + vacancyData.deadline + "</td>";

        tbody.appendChild(row);
    });

    // Add event listener for expand/collapse button click, edit button click, and delete button click
    tbody.addEventListener("click", function (e) {
        if (e.target && (e.target.classList.contains("edit_btn") || e.target.parentNode.classList.contains("edit_btn"))) {
            // If edit button or its child element is clicked
            var button = e.target.classList.contains("edit_btn") ? e.target : e.target.parentNode;
            var key = button.getAttribute("data-key");
            var jobRef = firebase.database().ref("vacancies").child(key);
            jobRef.once("value", function (snapshot) {
                var jobData = snapshot.val();
                // Fill form fields with job data
                document.getElementById("job_id").value = jobData.job_id;
                document.getElementById("vacancy_name").value = jobData.vacancy_name;
                document.getElementById("job_description").value = jobData.job_description;
                document.getElementById("experience").value = jobData.experience;
                document.getElementById("deadline").value = jobData.deadline;
                // Set the key of the job being edited
                document.getElementById("edit_job_key").value = key;
            });
        } else if (e.target && e.target.classList.contains("delete_btn")) {
            // If delete button is clicked
            var key = e.target.getAttribute("data-key");
            if (confirm("Are you sure you want to delete this vacancy?")) {
                // If user confirms deletion, remove data from the database
                var jobRef = firebase.database().ref("vacancies").child(key);
                jobRef.remove()
                    .then(function () {
                        // Data successfully deleted
                        console.log("Vacancy deleted successfully");
                    })
                    .catch(function (error) {
                        // Error occurred while deleting data
                        console.error("Error deleting vacancy: ", error);
                    });
            }
        } else if (e.target && e.target.classList.contains("expand_collapse_btn")) {
            var descriptionContent = e.target.previousElementSibling;
            descriptionContent.classList.toggle("expanded");
            e.target.textContent = descriptionContent.classList.contains("expanded") ? "Collapse" : "Expand";
        }
    });

    table.appendChild(tbody);
    tableDiv.appendChild(table);
}

// Call the function to display vacancies when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    var vacanciesRef = firebase.database().ref("vacancies");
    vacanciesRef.once("value", function (snapshot) {
        createVacanciesTable(snapshot);
    });
});


















// ********************************************************************************************
//CERTIFICATIONS SECTION ADMIN PANNEL
// ********************************************************************************************

// variable decerations
var certificateId, studentName, studentCode, mobileNumber, courseTitle, cert_athority;

//function to read certifications form data
function readFormC() {
    certificateId = document.getElementById("certificate_id").value;
    studentName = document.getElementById("student_name").value;
    studentCode = document.getElementById("student_code").value;
    mobileNumber = document.getElementById("phone").value;
    courseTitle = document.getElementById("course_title").value;
    cert_athority = document.getElementById("cert_athority").value;
    console.log(certificateId, studentName, studentCode, mobileNumber, courseTitle, cert_athority);
}



//function to add certificate data 
document.getElementById("createC").onclick = function () {
    readFormC();

    if (certificateId, studentName, studentCode, mobileNumber, courseTitle, cert_athority) {
        firebase
            .database()
            .ref("certificates/" + certificateId)
            .set({
                certificate_id: certificateId,
                student_name: studentName,
                student_code: studentCode,
                phone: mobileNumber,
                course_title: courseTitle,
                cert_athority: cert_athority,
            });
        alert("New certificate added");
    } else {
        alert("Please enter a certificate ID to insert vacancy data.");
    }


    document.getElementById("certificate_id").value = "";
    document.getElementById("student_name").value = "";
    document.getElementById("student_code").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("course_title").value = "";
    document.getElementById("cert_athority").value = "";

};



//function to read certificate data 
// document.getElementById("readC").onclick = function () {
//     readFormC();

//     if (certificateId) {
//         firebase
//             .database()
//             .ref("certificates/" + certificateId)
//             .on("value", function (snap) {
//                 document.getElementById("certificate_id").value = snap.val().certificate_id;
//                 document.getElementById("student_name").value = snap.val().student_name;
//                 document.getElementById("student_code").value = snap.val().student_code;
//                 document.getElementById("phone").value = snap.val().phone;
//                 document.getElementById("course_title").value = snap.val().course_title;
//                 document.getElementById("cert_athority").value = snap.val().cert_athority;
//             });
//     } else {
//         alert("Please enter a Certificate ID ID to read Certification data.");
//     }
// };




//function to update certificate data 
// document.getElementById("updateC").onclick = function () {
//     readFormC();

//     if (certificateId, studentName, studentCode, mobileNumber, courseTitle, cert_athority) {
//         firebase
//             .database()
//             .ref("certificates/" + certificateId)
//             .update({
//                 certificate_id: certificateId,
//                 student_name: studentName,
//                 student_code: studentCode,
//                 phone: mobileNumber,
//                 course_title: courseTitle,
//                 cert_athority: cert_athority,
//             });
//         alert("Certification Details Updated");
//     } else {
//         alert("Please enter a full details to update Certification data.");
//     }

//     document.getElementById("certificate_id").value = "";
//     document.getElementById("student_name").value = "";
//     document.getElementById("student_code").value = "";
//     document.getElementById("phone").value = "";
//     document.getElementById("course_title").value = "";
//     document.getElementById("cert_athority").value = "";
// };




//function to remove certificate data 
// document.getElementById("deleteC").onclick = function () {
//     readFormC();

//     if (certificateId) {
//         firebase
//             .database()
//             .ref("certificates/" + certificateId)
//             .remove();
//         alert("Certification Details removed");
//     } else {
//         alert("Please enter a Certifiate ID to delete Certification data.");
//     }

//     document.getElementById("certificate_id").value = "";
//     document.getElementById("student_name").value = "";
//     document.getElementById("student_code").value = "";
//     document.getElementById("phone").value = "";
//     document.getElementById("course_title").value = "";
//     document.getElementById("cert_athority").value = "";

// };








// ********************************************************************************************
// Function to create the certifications table
// ********************************************************************************************
function createCertificationsTable(snapshot) {
    var tableDiv = document.querySelector(".certifications_table_area");
    tableDiv.innerHTML = "";

    var table = document.createElement("table");
    table.classList.add("certifications_table");

    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Action</th><th>Certificate ID</th><th>Student Name</th><th>Student Code</th><th>Mobile Number</th><th>Course Title</th><th>Certifying Authority</th>";
    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");

    snapshot.forEach(function (childSnapshot) {
        var certificationData = childSnapshot.val();
        var row = document.createElement("tr");
        row.innerHTML = "<td><button class='editButton'><i class='fa-solid fa-pen-to-square'></i>&nbsp;&nbsp;Edit</button><button class='deleteButton'><i class='fa-solid fa-trash'></i>&nbsp;&nbsp;Delete</button></td>" +
            "<td>" + certificationData.certificate_id + "</td>" +
            "<td>" + certificationData.student_name + "</td>" +
            "<td>" + certificationData.student_code + "</td>" +
            "<td>" + certificationData.phone + "</td>" +
            "<td>" + certificationData.course_title + "</td>" +
            "<td>" + certificationData.cert_athority + "</td>";

        tbody.appendChild(row);

        // Edit button functionality
        var editButton = row.querySelector(".editButton");
        editButton.addEventListener("click", function () {
            // Fill form fields with respective data for editing
            document.getElementById("certificate_id").value = certificationData.certificate_id;
            document.getElementById("student_name").value = certificationData.student_name;
            document.getElementById("student_code").value = certificationData.student_code;
            document.getElementById("phone").value = certificationData.phone;
            document.getElementById("course_title").value = certificationData.course_title;
            document.getElementById("cert_athority").value = certificationData.cert_athority;
        });

        // Delete button functionality
        var deleteButton = row.querySelector(".deleteButton");
        deleteButton.addEventListener("click", function () {
            // Show confirmation dialog
            var confirmDelete = confirm("Are you sure you want to delete this certificate?");
            if (confirmDelete) {
                // Remove respective data from the database
                childSnapshot.ref.remove()
                    .then(function () {
                        console.log("Certificate removed successfully");
                    })
                    .catch(function (error) {
                        console.error("Error removing certificate: ", error);
                    });
            }
        });
    });

    table.appendChild(tbody);
    tableDiv.appendChild(table);
}



// ********************************************************************************************
//code to prevent default page refresh on submissions
// ********************************************************************************************

document.addEventListener("DOMContentLoaded", function () {
    // Prevent page refresh on button clicks
    var preventRefresh = function (event) {
        event.preventDefault(); // Prevent default button click behavior
        // Additional logic can be added here if needed
    };

    // Buttons with IDs createV, readV, updateV, deleteV
    var vacanciesButtons = document.querySelectorAll("#createV, #readV, #updateV, #deleteV");
    vacanciesButtons.forEach(function (button) {
        button.addEventListener("click", preventRefresh);
    });

    // Buttons with IDs createC, readC, updateC, deleteC
    var certificationsButtons = document.querySelectorAll("#createC, #readC, #updateC, #deleteC");
    certificationsButtons.forEach(function (button) {
        button.addEventListener("click", preventRefresh);
    });
});



// ********************************************************************************************
// function to refresh certifications table data
// ********************************************************************************************
function refreshCertificateTable() {
    var certificationsRef = firebase.database().ref("certificates");
    certificationsRef.once("value", function (snapshot) {
        createCertificationsTable(snapshot);
    });
}


// ********************************************************************************************
// function to refresh vacancy table data
// ********************************************************************************************
function refreshVacancyTable() {
    var vacancyRef = firebase.database().ref("vacancies");
    vacancyRef.once("value", function (snapshot) {
        createVacanciesTable(snapshot);
    });
}



// ********************************************************************************************
// SEARCH FUNCTIONALITY
// ********************************************************************************************

document.addEventListener("DOMContentLoaded", function () {
    var searchInput = document.getElementById("admin_searchBox");
    var searchButton = document.getElementById("admin_searchButtton");
    var certificationsTableArea = document.querySelector(".certifications_table_area");

    searchButton.addEventListener("click", function () {
        var searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === "") {
            // If search term is empty, clear the table area
            certificationsTableArea.innerHTML = "";
            return;
        }

        // Perform search operation in the "certificates" section of the database
        var certificationsRef = firebase.database().ref("certificates");
        certificationsRef.once("value", function (snapshot) {
            var searchResults = [];
            snapshot.forEach(function (childSnapshot) {
                var certificationData = childSnapshot.val();
                // Check if any of the fields contain the search term
                if (certificationData.certificate_id.toLowerCase().includes(searchTerm) ||
                    certificationData.student_name.toLowerCase().includes(searchTerm) ||
                    certificationData.student_code.toLowerCase().includes(searchTerm) ||
                    certificationData.phone.toLowerCase().includes(searchTerm)) {
                    searchResults.push(certificationData);
                }

            });

            // Display search results as a table
            displaySearchResults(searchResults);
            var certificationData = childSnapshot.val();

        });
    });

    function displaySearchResults(results) {
        var tableHTML = "<table class='certifications_table'>" +
            "<th>Action</th><th>Certificate ID</th><th>Student Name</th><th>Student Code</th><th>Mobile Number</th><th>Course Title</th><th>Certifying Authority</th>" +
            "<tbody>";

        results.forEach(function (certificationData) {
            tableHTML += "<tr>" +
                "<td><button class='editButton'><i class='fa-solid fa-pen-to-square'></i>&nbsp;&nbsp;Edit</button><button class='deleteButton'><i class='fa-solid fa-trash'></i>&nbsp;&nbsp;Delete</button></td>" +
                "<td>" + certificationData.certificate_id + "</td>" +
                "<td>" + certificationData.student_name + "</td>" +
                "<td>" + certificationData.student_code + "</td>" +
                "<td>" + certificationData.phone + "</td>" +
                "<td>" + certificationData.course_title + "</td>" +
                "<td>" + certificationData.cert_athority + "</td>" +
                "</tr>";
        });

        tableHTML += "</tbody></table>";
        certificationsTableArea.innerHTML = tableHTML;

        // Add event listeners for edit and delete buttons
        var editButtons = document.querySelectorAll(".editButton");
        editButtons.forEach(function (button, index) {
            button.addEventListener("click", function () {
                // Fill form fields with respective data for editing
                document.getElementById("certificate_id").value = results[index].certificate_id;
                document.getElementById("student_name").value = results[index].student_name;
                document.getElementById("student_code").value = results[index].student_code;
                document.getElementById("phone").value = results[index].phone;
                document.getElementById("course_title").value = results[index].course_title;
                document.getElementById("cert_athority").value = results[index].cert_athority;
            });
        });

        var deleteButtons = document.querySelectorAll(".deleteButton");
        deleteButtons.forEach(function (button, index) {
            button.addEventListener("click", function () {
                var confirmDelete = confirm("Are you sure you want to delete this certificate?");
                if (confirmDelete) {
                    // Remove respective data from the database
                    var certificatesRef = firebase.database().ref("certificates");
                    certificatesRef.once("value", function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            if (childSnapshot.val().certificate_id === results[index].certificate_id) {
                                childSnapshot.ref.remove()
                                    .then(function () {
                                        console.log("Certificate removed successfully");
                                    })
                                    .catch(function (error) {
                                        console.error("Error removing certificate: ", error);
                                    });
                            }
                        });
                    });
                }
            });
        });
    }

});



// ********************************************************************************************
// Function to create the pending reviews table
// ********************************************************************************************
document.addEventListener("DOMContentLoaded", function () {
    // Function to create the pending reviews table
    function createPendingReviewsTable(snapshot) {
        var tableDiv = document.querySelector(".pending_reviews_table_area");
        tableDiv.innerHTML = "";

        var table = document.createElement("table");
        table.classList.add("pending_reviews_table");

        var thead = document.createElement("thead");
        var headerRow = document.createElement("tr");
        headerRow.innerHTML = "<th>Name</th><th>Email</th><th>Message</th><th>Action</th>";
        thead.appendChild(headerRow);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");

        snapshot.forEach(function (childSnapshot) {
            var reviewData = childSnapshot.val();
            var reviewKey = childSnapshot.key; // Get the key of the current pending review
            var row = document.createElement("tr");
            row.innerHTML = "<td>" + reviewData.name + "</td>" +
                "<td>" + reviewData.email + "</td>" +
                "<td>" + reviewData.message + "</td>" +
                "<td class='actionColumn'><button class='approve_btn'><i class='fa-solid fa-square-check'>&nbsp; Approve</i></button>" +
                "<button class='delete_btn'><i class='fa-solid fa-trash-can'></i>&nbsp; Delete</button></td>";

            // Add event listener to the approve button
            var approveBtn = row.querySelector(".approve_btn");
            approveBtn.addEventListener("click", function () {
                approveReview(reviewKey, reviewData);
            });

            // Add event listener to the delete button
            var deleteBtn = row.querySelector(".delete_btn");
            deleteBtn.addEventListener("click", function () {
                deleteReview(reviewKey);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        tableDiv.appendChild(table);
    }

    // Function to refresh pending reviews table data
    function refreshPendingReviewsTable() {
        var pendingReviewsRef = firebase.database().ref("PendingReviews");
        pendingReviewsRef.once("value", function (snapshot) {
            createPendingReviewsTable(snapshot);
        });
    }

    // Function to approve a review
    function approveReview(reviewKey, reviewData) {
        // Get a reference to the Firebase database
        var database = firebase.database();

        // Get a reference to the "ApprovedReviews" collection
        var approvedReviewsRef = database.ref("approvedReviews");

        // Set the review data with the "name" key's value as the key for the object
        var updatedReviewData = {};
        updatedReviewData[reviewData.name] = reviewData;

        // Add the updated review data to the "ApprovedReviews" collection
        approvedReviewsRef.update(updatedReviewData)
            .then(function () {
                // If adding to "ApprovedReviews" succeeds, remove the review from "PendingReviews"
                var pendingReviewsRef = database.ref("PendingReviews/" + reviewKey);
                pendingReviewsRef.remove()
                    .then(function () {
                        // If removal from "PendingReviews" succeeds, refresh the pending reviews table
                        refreshPendingReviewsTable();
                    })
                    .catch(function (error) {
                        console.error("Error removing review from PendingReviews:", error);
                    });
            })
            .catch(function (error) {
                console.error("Error adding review to ApprovedReviews:", error);
            });
    }

    // Function to delete a review
    function deleteReview(reviewKey) {
        // Get a reference to the Firebase database
        var database = firebase.database();

        // Get a reference to the "PendingReviews" collection
        var pendingReviewsRef = database.ref("PendingReviews/" + reviewKey);

        // Remove the review from the "PendingReviews" collection
        pendingReviewsRef.remove()
            .then(function () {
                // If removal succeeds, refresh the pending reviews table
                refreshPendingReviewsTable();
            })
            .catch(function (error) {
                console.error("Error removing review from PendingReviews:", error);
            });
    }

    // Call the function to display pending reviews when the page is loaded
    refreshPendingReviewsTable();
});




// Call the function to display pending reviews when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    refreshPendingReviewsTable();
});








//************************************************* */
// Function to create the approved reviews table
//************************************************* */

// Function to create the approved reviews table
function createApprovedReviewsTable(snapshot) {
    var tableDiv = document.querySelector(".approved_reviews_table_area");
    tableDiv.innerHTML = "";

    var table = document.createElement("table");
    table.classList.add("approved_reviews_table");

    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Name</th><th>Email</th><th>Message</th><th>Action</th>";
    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");

    snapshot.forEach(function (childSnapshot) {
        var reviewData = childSnapshot.val();
        var reviewKey = childSnapshot.key; // Get the key of the current approved review
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + reviewData.name + "</td>" +
            "<td>" + reviewData.email + "</td>" +
            "<td>" + reviewData.message + "</td>" +
            "<td class='actionColumn'><button class='delete_btn'><i class='fa-solid fa-trash-can'></i>&nbsp; Delete</button></td>";

        // Add event listener to the delete button
        var deleteBtn = row.querySelector(".delete_btn");
        deleteBtn.addEventListener("click", function () {
            deleteReview(reviewKey);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableDiv.appendChild(table);
}

// Function to refresh approved reviews table data
function refreshApprovedReviewsTable() {
    var approvedReviewsRef = firebase.database().ref("approvedReviews");
    approvedReviewsRef.once("value", function (snapshot) {
        createApprovedReviewsTable(snapshot);
    });
}

// Function to delete a review
function deleteReview(reviewKey) {
    // Get a reference to the Firebase database
    var database = firebase.database();

    // Get a reference to the "ApprovedReviews" collection
    var approvedReviewsRef = database.ref("approvedReviews/" + reviewKey);

    // Remove the review from the "ApprovedReviews" collection
    approvedReviewsRef.remove()
        .then(function () {
            // If removal succeeds, refresh the approved reviews table
            refreshApprovedReviewsTable();
        })
        .catch(function (error) {
            console.error("Error removing review from ApprovedReviews:", error);
        });
}

// Call the function to display approved reviews when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    refreshApprovedReviewsTable();
});


// ********************************************************************************************
// testimonials toggle switch
// ********************************************************************************************
document.querySelector('.reviewTogglerPending').style.backgroundColor = '#f003a0';
document.querySelector('.reviewTogglerApproved').style.backgroundColor = '#ff00aa3f';


function showPendingReviews() {
    document.querySelector('.pending_reviews_table_area').style.display = 'block';
    document.querySelector('.approved_reviews_table_area').style.display = 'none';

    document.querySelector('.reviewTogglerPending').style.backgroundColor = '#f003a0';
    document.querySelector('.reviewTogglerApproved').style.backgroundColor = '#ff00aa3f';
}

function showApprovedReviews() {
    document.querySelector('.pending_reviews_table_area').style.display = 'none';
    document.querySelector('.approved_reviews_table_area').style.display = 'block';

    document.querySelector('.reviewTogglerPending').style.backgroundColor = '#ff00aa3f';
    document.querySelector('.reviewTogglerApproved').style.backgroundColor = '#f003a0';
}







// ********************************************************************************************
// GALLERY
// ********************************************************************************************
document.querySelector('.admin_AddImageButtton').addEventListener('click', async () => {
    const fileInput = document.getElementById('galleryImage');
    const categorySelect = document.getElementById('imageCategory');
    const progressContainer = document.getElementById('progressContainer');
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

    if (fileInput.files.length === 0) {
        alert("Please select files to upload.");
        return;
    }

    const files = Array.from(fileInput.files);
    const category = categorySelect.value;

    progressContainer.innerHTML = ''; // Clear previous progress bars

    files.forEach((file, index) => {
        if (file.size > MAX_FILE_SIZE) {
            alert(`File "${file.name}" exceeds the 2 MB limit and will not be uploaded.`);
            return;
        }

        const storageRef = firebase.storage().ref().child(`gallery/${file.name}`);
        const progressBar = document.createElement('progress');
        progressBar.id = `uploadProgress${index}`;
        progressBar.value = 0;
        progressBar.max = 100;
        progressBar.style.width = '100%';
        progressContainer.appendChild(progressBar);

        const uploadTask = storageRef.put(file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressBar.value = progress;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                console.error("Error uploading image:", error);
                alert(`Error uploading image: ${error.message}`);
                progressBar.style.display = 'none';
            },
            async () => {
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                const newImageKey = firebase.database().ref().child('gallery').push().key;
                const imageData = {
                    url: downloadURL,
                    category: category,
                    name: file.name,
                    timestamp: Date.now()
                };

                await firebase.database().ref(`gallery/${newImageKey}`).set(imageData);
                alert(`Image ${file.name} uploaded and data saved successfully!`);
                progressBar.style.display = 'none';
                displayImagesFromDatabase();
            }
        );
    });
});









// Function to fetch and display images from the database
function displayImagesFromDatabase() {
    const galleryDisplay = document.querySelector('.GalleryImageDisplay');

    // Clear existing images before fetching new ones
    galleryDisplay.innerHTML = '';

    // Reference to the 'gallery' node in the database
    const galleryRef = firebase.database().ref('gallery');

    // Fetch data from the 'gallery' node
    galleryRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const imageData = childSnapshot.val();

            // Create image element
            const imgElement = document.createElement('img');
            imgElement.src = imageData.url;
            imgElement.alt = imageData.name;

            // Append image to the grid
            galleryDisplay.appendChild(imgElement);
        });
    });
}
// Call the function to display images from the database when the page loads
window.addEventListener('load', displayImagesFromDatabase);




// Display the modal when an image is clicked
document.querySelector('.GalleryImageDisplay').addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const deleteButton = document.getElementById('deleteImageButton');

        modal.style.display = "block";
        modalImage.src = event.target.src;
        modalImage.setAttribute('data-key', event.target.getAttribute('data-key'));

        // Delete button functionality
        deleteButton.onclick = async () => {

            const confirmation = confirm("Are you sure you want to delete this image?");
            if (confirmation) {
                const imageUrl = modalImage.src;
                const imageName = event.target.alt;

                // Delete from Firebase Storage
                const storageRef = firebase.storage().ref().child(`gallery/${imageName}`);
                await storageRef.delete();

                // Fetch all objects from Firebase Realtime Database
                const snapshot = await firebase.database().ref('gallery').once('value');
                const galleryData = snapshot.val();

                // Find the key of the object with the matching URL
                let imageKeyToDelete = null;
                for (let key in galleryData) {
                    if (galleryData[key].url === imageUrl) {
                        imageKeyToDelete = key;
                        break;
                    }
                }

                // If an object with the matching URL is found, delete it
                if (imageKeyToDelete) {
                    await firebase.database().ref(`gallery/${imageKeyToDelete}`).remove();
                }

                // Hide the modal
                modal.style.display = "none";

                // Refresh the gallery
                displayImagesFromDatabase();
            }
        };
    }
});


// Close the modal
document.querySelector('.close').onclick = () => {
    document.getElementById('imageModal').style.display = "none";
};

// Close the modal when clicking outside of the modal content
window.onclick = (event) => {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// // Function to fetch and display images from the database
// function displayImagesFromDatabase() {
//     const galleryDisplay = document.querySelector('.GalleryImageDisplay');

//     // Clear existing images before fetching new ones
//     galleryDisplay.innerHTML = '';

//     // Reference to the 'gallery' node in the database
//     const galleryRef = firebase.database().ref('gallery');

//     // Fetch data from the 'gallery' node
//     galleryRef.once('value', (snapshot) => {
//         snapshot.forEach((childSnapshot) => {
//             const imageData = childSnapshot.val();

//             // Create image element
//             const imgElement = document.createElement('img');
//             imgElement.src = imageData.url;
//             imgElement.alt = imageData.name;
//             imgElement.setAttribute('data-key', childSnapshot.key); // Store the key in the data attribute

//             // Append image to the grid
//             galleryDisplay.appendChild(imgElement);
//         });
//     });
// }


























// ********************************************************************************************
// Download Backup
// ********************************************************************************************
function downloadEncryptedJSON() {
    const databaseURL = 'https://plyofit-3798c-default-rtdb.firebaseio.com/';
    const jsonDataURL = databaseURL + '.json';

    fetch(jsonDataURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(jsonData => {
            // Convert JSON object to a string
            const jsonString = JSON.stringify(jsonData, null, 2);

            // Encrypt the JSON string using AES encryption
            const encryptedData = CryptoJS.AES.encrypt(jsonString, 'Aubdgh6SDkuihS756db867astgsm').toString();

            // Create a Blob object with the encrypted data
            const blob = new Blob([encryptedData], { type: 'application/octet-stream' });

            // Create a temporary anchor element
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = 'backup.json';

            // Programmatically trigger a click event on the anchor element
            // to initiate the download
            a.click();

            // Remove the temporary anchor element
            window.URL.revokeObjectURL(a.href);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
};




// ********************************************************************************************
// Function to logout user after 1 hour of inactivity since last user activity
// ********************************************************************************************

window.onload = function () {
    // Function to handle user logout
    function logoutUser() {
        console.log("Logging out user due to inactivity or tab/window close");
        auth.signOut().then(() => {
            // Clear any user session data
            localStorage.clear();
            sessionStorage.clear();

            // Redirect to login page after logout
            window.location.href = 'index.html';
        });
    }

    // Function to set login time
    function setLoginTime() {
        var loginTime = new Date().getTime();
        localStorage.setItem('loginTime', loginTime);
        console.log("Login time set at: " + new Date(loginTime));
    }

    // Function to check inactivity based on login time
    function checkInactivity() {
        var loginTime = localStorage.getItem('loginTime');
        if (loginTime) {
            var currentTime = new Date().getTime();
            var timeSinceLogin = currentTime - loginTime;

            if (timeSinceLogin > 30 * 60 * 1000) { // 1 hour
                logoutUser();
            } else {
                // Reset the inactivity timeout to check again after the remaining time
                var remainingTime = 30 * 60 * 1000 - timeSinceLogin;
                clearTimeout(inactivityTimeout);
                inactivityTimeout = setTimeout(logoutUser, remainingTime);
            }
        }
    }

    // Set login time on load if not already set
    if (!localStorage.getItem('loginTime')) {
        setLoginTime();
    }

    // Check inactivity on page load/reload
    checkInactivity();

    // Event listeners for user activity to reset login time
    document.addEventListener("mousemove", function () {
        setLoginTime();
        checkInactivity();
    });

    document.addEventListener("keypress", function () {
        setLoginTime();
        checkInactivity();
    });

    // Variable to store the inactivity timeout
    var inactivityTimeout;

    // Log out the user when closing the tab or browser
    window.addEventListener("beforeunload", function () {
        logoutUser();
    });


    window.addEventListener('unload', function () {
        logoutUser();
    });

};
































async function displayImagesFromDatabase(filter = "all") {
    const galleryDisplay = document.querySelector('.GalleryImageDisplay');
    galleryDisplay.innerHTML = ''; // Clear existing images

    const galleryRef = firebase.database().ref('gallery');
    const snapshot = await galleryRef.once('value');

    snapshot.forEach((childSnapshot) => {
        const imageData = childSnapshot.val();
        if (filter === "all" || imageData.category === filter) {
            const imgElement = document.createElement('img');
            imgElement.src = imageData.url;
            imgElement.alt = imageData.name;
            imgElement.setAttribute('data-category', imageData.category);
            galleryDisplay.appendChild(imgElement);
        }
    });
}

// Initial display of all images
displayImagesFromDatabase();

// Filter images based on category
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', (event) => {
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        const filter = event.target.getAttribute('data-filter');
        displayImagesFromDatabase(filter);
    });
});

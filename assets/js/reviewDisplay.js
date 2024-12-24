        document.addEventListener("DOMContentLoaded", function () {
        // Function to fetch and display the latest 5 approved reviews
        function displayLatestApprovedReviews() {
            var approvedReviewsRef = firebase.database().ref("approvedReviews").limitToLast(5);
            approvedReviewsRef.once("value", function (snapshot) {
                var reviewsArray = [];
                snapshot.forEach(function (childSnapshot) {
                    reviewsArray.push(childSnapshot.val());
                });

                // reviewsArray.reverse(); // Reverse to get the latest reviews first
                console.log(reviewsArray); // Log the reviews array to check the fetched data

                var messageElements = document.querySelectorAll(".msg");
                var nameElements = document.querySelectorAll(".nme");

                for (var i = 0; i < 5; i++) {
                    if (i < reviewsArray.length) {
                        messageElements[i].innerText = reviewsArray[i].message;
                        nameElements[i].innerText = reviewsArray[i].name;
                    } else {
                        messageElements[i].innerText = "";
                        nameElements[i].innerText = "";
                    }
                }
            });
        }

        // Call the function to display the latest approved reviews when the page is loaded
        displayLatestApprovedReviews();
    });

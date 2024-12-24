document.addEventListener("DOMContentLoaded", function () {
    const careersBarMobile = document.querySelector(".admin_sidebar_mobile_careers_bar");
    const certificationsBarMobile = document.querySelector(".admin_sidebar_mobile_Certifications_bar");
    const testimonialsBarMobile = document.querySelector(".admin_sidebar_mobile_Testimonials_bar");
    const adminSidebarMobileGalleryBar = document.querySelector(".admin_sidebar_mobile_Gallery_bar");
    const careersBar = document.querySelector(".admin_sidebar_careers_bar");
    const certificationsBar = document.querySelector(".admin_sidebar_Certifications_bar");
    const testimonialsBar = document.querySelector(".admin_sidebar_Testimonials_bar");
    const careersAdminBoard = document.querySelector(".careers_admin_board");
    const certificationsAdminBoard = document.querySelector(".certifications_admin_board");
    const testimonialsAdminBoard = document.querySelector(".reviews_admin_board");
    const adminSidebarGalleryBar = document.querySelector(".admin_sidebar_Gallery_bar");
    const galleryAdminboard = document.querySelector(".gallery_admin_board");


    function setActiveSection(section) {
        // Remove active class from all sections
        [careersBarMobile, certificationsBarMobile, testimonialsBarMobile, adminSidebarMobileGalleryBar, careersBar, certificationsBar, testimonialsBar, adminSidebarGalleryBar].forEach(bar => {
            bar.classList.remove("active");
        });

        // Add active class to the clicked section
        section.classList.add("active");
    }

    careersBarMobile.addEventListener("click", function () {
        setActiveSection(careersBarMobile);
        careersAdminBoard.style.display = "block";
        certificationsAdminBoard.style.display = "none";
        testimonialsAdminBoard.style.display = "none";
        galleryAdminboard.style.display = "none";

        var vacancyRef = firebase.database().ref("vacancies");
        vacancyRef.once("value", function (snapshot) {
            createVacanciesTable(snapshot);
        });
    });

    certificationsBarMobile.addEventListener("click", function () {
        setActiveSection(certificationsBarMobile);
        certificationsAdminBoard.style.display = "block";
        careersAdminBoard.style.display = "none";
        testimonialsAdminBoard.style.display = "none";
        galleryAdminboard.style.display = "none";

        var certificationsRef = firebase.database().ref("certificates");
        certificationsRef.once("value", function (snapshot) {
            createCertificationsTable(snapshot);
        });
    });

    testimonialsBarMobile.addEventListener("click", function () {
        setActiveSection(testimonialsBarMobile);
        testimonialsAdminBoard.style.display = "block";
        careersAdminBoard.style.display = "none";
        certificationsAdminBoard.style.display = "none";
        galleryAdminboard.style.display = "none";

        var PendingTestimonialsRef = firebase.database().ref("PendingReviews");
        PendingTestimonialsRef.once("value", function (snapshot) {
            createReviewsTable(snapshot);
        })
    });

    adminSidebarMobileGalleryBar.addEventListener("click", function () {
        setActiveSection(adminSidebarMobileGalleryBar);
        galleryAdminboard.style.display = "block";
        testimonialsAdminBoard.style.display = "none";
        careersAdminBoard.style.display = "none";
        certificationsAdminBoard.style.display = "none";

        ///////////////
    });

    careersBar.addEventListener("click", function () {
        setActiveSection(careersBar);
        careersAdminBoard.style.display = "block";
        certificationsAdminBoard.style.display = "none";
        testimonialsAdminBoard.style.display = "none";
        galleryAdminboard.style.display = "none";

        var vacancyRef = firebase.database().ref("vacancies");
        vacancyRef.once("value", function (snapshot) {
            createVacanciesTable(snapshot);
        });
    });

    certificationsBar.addEventListener("click", function () {
        setActiveSection(certificationsBar);
        certificationsAdminBoard.style.display = "block";
        careersAdminBoard.style.display = "none";
        testimonialsAdminBoard.style.display = "none";
        galleryAdminboard.style.display = "none";

        var certificationsRef = firebase.database().ref("certificates");
        certificationsRef.once("value", function (snapshot) {
            createCertificationsTable(snapshot);
        });
    });

    testimonialsBar.addEventListener("click", function () {
        setActiveSection(testimonialsBar);
        testimonialsAdminBoard.style.display = "block";
        careersAdminBoard.style.display = "none";
        certificationsAdminBoard.style.display = "none";
        galleryAdminboard.style.display = "none";

        var PendingTestimonialsRef = firebase.database().ref("PendingReviews");
        PendingTestimonialsRef.once("value", function (snapshot) {
            createReviewsTable(snapshot);
        })

    });

    adminSidebarGalleryBar.addEventListener("click", function () {
        setActiveSection(adminSidebarGalleryBar);
        galleryAdminboard.style.display = "block";
        testimonialsAdminBoard.style.display = "none";
        careersAdminBoard.style.display = "none";
        certificationsAdminBoard.style.display = "none";

        ///////////////
    });
});

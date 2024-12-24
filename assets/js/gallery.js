//fireConfig 
var firebaseConfig = {
    apiKey: "AIzaSyCvctj0GbvamxFo3F0jtSNROxaNbMHTQyo",
    authDomain: "plyofit-3798c.firebaseapp.com",
    databaseURL: "https://plyofit-3798c-default-rtdb.firebaseio.com",
    projectId: "plyofit-3798c",
    storageBucket: "plyofit-3798c.appspot.com",
    messagingSenderId: "170636040021",
    appId: "1:170636040021:web:a167a444d8471a7c9201dc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




// Function to fetch gallery data from Firebase
function fetchGalleryData() {
    const dbRef = firebase.database().ref('gallery');
    dbRef.once('value', (snapshot) => {
        const data = snapshot.val();
        updateGallery(data);
    });
}

// Function to update gallery with images from Firebase
function updateGallery(data) {
    const imagesContainer = document.querySelector('.images_container');
    imagesContainer.innerHTML = ''; // Clear existing images

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            const imgData = data[key];
            const imgElement = document.createElement('img');
            imgElement.src = imgData.url;
            imgElement.classList.add(imgData.category.toUpperCase());
            imgElement.alt = imgData.name;
            imagesContainer.appendChild(imgElement);
        }
    }
}

// Fetch and update gallery on page load
document.addEventListener('DOMContentLoaded', fetchGalleryData);





function showAll() {
    // Show all images
    document.querySelectorAll('.images_container img').forEach(img => {
        img.style.display = 'block';
    });

    // Highlight "SHOW ALL" filter
    document.querySelectorAll('.gallery_container h4').forEach(category => {
        category.classList.remove('active-category');
    });
    document.querySelector('.gallery_container h4:first-child').classList.add('active-category');
}

function filterByCategory(category) {
    // Hide all images
    document.querySelectorAll('.images_container img').forEach(img => {
        img.style.display = 'none';
    });

    // Show images of the selected category
    document.querySelectorAll('.images_container img.' + category).forEach(img => {
        img.style.display = 'block';
    });

    // Remove active class from all categories
    document.querySelectorAll('.gallery_container h4').forEach(cat => {
        cat.classList.remove('active-category');
    });

    // Add active class to the clicked category
    document.querySelector('.gallery_container h4[onclick="filterByCategory(\'' + category + '\')"]').classList.add('active-category');
}


document.addEventListener("DOMContentLoaded", function () {

    // VBS SCREENSHOTS
    const galleries = {
        vbs: [
            {
                src: "images/vbs/DriverPage.png",
                title: "Driver Page"
            },
            {
                src: "images/vbs/LoginPage.png",
                title: "Login Page"
            },
            {
                src: "images/vbs/ManageDrivers.png",
                title: "Manage Drivers"
            },
            {
                src: "images/vbs/ManageFinishedTickets.png",
                title: "Manage Finished Tickets"
            },
            {
                src: "images/vbs/ManageRequests.png",
                title: "Manage Requests"
            },
            {
                src: "images/vbs/ManageVehicles.png",
                title: "Manage Vehicles"
            }
        ],

        // DMS SCREENSHOTS
        dms: [
            {
                src: "images/dms/dashboard.png",
                title: "Dashboard"
            },
            {
                src: "images/dms/activity_logs.png",
                title: "Activity Logs"
            },
            {
                src: "images/dms/archives.png",
                title: "Archives"
            },
            {
                src: "images/dms/Documents.png",
                title: "Documents"
            },
            {
                src: "images/dms/edit_request.png",
                title: "Edit Request"
            },
            {
                src: "images/dms/login.png",
                title: "Login"
            },
            {
                src: "images/dms/messages.png",
                title: "Messages"
            },
            {
                src: "images/dms/roles.png",
                title: "Roles"
            },
            {
                src: "images/dms/shared_with_me.png",
                title: "Shared With Me"
            },
            {
                src: "images/dms/users.png",
                title: "Users"
            }
        ]
    };


    // MODAL ELEMENTS
    const viewer = document.getElementById("imageViewer");
    const viewerImage = document.getElementById("viewerImage");
    const viewerCaption = document.getElementById("viewerCaption");
    const viewerCounter = document.getElementById("viewerCounter");

    const closeButton = document.getElementById("viewerClose");
    const previousButton = document.getElementById("viewerPrev");
    const nextButton = document.getElementById("viewerNext");

    const galleryButtons = document.querySelectorAll(".gallery-card");


    // CURRENT VIEWER STATE
    let currentGallery = [];
    let currentIndex = 0;
    let lastClickedElement = null;


    // OPEN IMAGE VIEWER
    function openViewer(galleryName, index, clickedElement) {

        currentGallery = galleries[galleryName];

        if (!currentGallery || !currentGallery.length) {
            return;
        }

        currentIndex = index;
        lastClickedElement = clickedElement;

        showImage();

        viewer.classList.add("active");
        document.body.classList.add("viewer-open");

        closeButton.focus();
    }


    // DISPLAY CURRENT IMAGE
    function showImage() {

        const image = currentGallery[currentIndex];

        viewerImage.src = image.src;
        viewerImage.alt = image.title;

        viewerCaption.textContent = image.title;

        viewerCounter.textContent =
            `${currentIndex + 1} / ${currentGallery.length}`;

        // Hide previous/next buttons if there is only one image
        previousButton.disabled = currentGallery.length <= 1;
        nextButton.disabled = currentGallery.length <= 1;
    }


    // NEXT IMAGE
    function nextImage() {

        if (!currentGallery.length) return;

        currentIndex++;

        if (currentIndex >= currentGallery.length) {
            currentIndex = 0;
        }

        showImage();
    }


    // PREVIOUS IMAGE
    function previousImage() {

        if (!currentGallery.length) return;

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = currentGallery.length - 1;
        }

        showImage();
    }


    // CLOSE VIEWER
    function closeViewer() {

        viewer.classList.remove("active");
        document.body.classList.remove("viewer-open");

        viewerImage.src = "";

        currentGallery = [];
        currentIndex = 0;

        if (lastClickedElement) {
            lastClickedElement.focus();
            lastClickedElement = null;
        }
    }


    // CLICK GALLERY SCREENSHOTS
    galleryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const galleryName = this.dataset.gallery;
            const imageIndex = Number(this.dataset.index);

            openViewer(galleryName, imageIndex, this);

        });

    });


    // BUTTON EVENTS
    nextButton.addEventListener("click", nextImage);

    previousButton.addEventListener("click", previousImage);

    closeButton.addEventListener("click", closeViewer);


    // CLICK OUTSIDE IMAGE TO CLOSE
    viewer.addEventListener("click", function (event) {

        if (event.target === viewer) {
            closeViewer();
        }

    });


    // KEYBOARD CONTROLS
    document.addEventListener("keydown", function (event) {

        if (!viewer.classList.contains("active")) {
            return;
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            nextImage();
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            previousImage();
        }

        if (event.key === "Escape") {
            closeViewer();
        }

    });

});

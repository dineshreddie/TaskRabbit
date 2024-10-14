document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('uploadForm').addEventListener('submit', handleUpload);
    loadImageFromLocalStorage();
});

function handleUpload(e) {
    e.preventDefault();
    const fileInput = document.getElementById('imageFile');
    const file = fileInput.files[0];


    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type) || file.size > 2 * 1024 * 1024) {
        document.getElementById('message').textContent = 'Invalid file type or size exceeds 2 MB.';
        document.getElementById('message').className = 'error';
        return;
    }


    const reader = new FileReader();
    reader.onload = function (event) {
        const imageData = event.target.result;

        localStorage.setItem('uploadedImage', imageData);
        document.getElementById('message').textContent = 'Image uploaded successfully!';
        document.getElementById('message').className = 'success';

        previewImage(imageData);
    };

    reader.readAsDataURL(file);
}

function loadImageFromLocalStorage() {
    const uploadedImage = localStorage.getItem('uploadedImage');
    if (uploadedImage) {
        previewImage(uploadedImage);
    }
}

function previewImage(imageData) {
    const imagePreviewDiv = document.getElementById('imagePreview');
    imagePreviewDiv.innerHTML = `<img src="${imageData}" alt="Uploaded Image">`;
}

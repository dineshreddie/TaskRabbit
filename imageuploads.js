document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('uploadForm').addEventListener('submit', handleUpload);
});

async function handleUpload(e) {
    e.preventDefault();
    const file = document.getElementById('imageFile').files[0];

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type) || file.size > 2 * 1024 * 1024) {
        document.getElementById('message').textContent = 'Invalid file type or size exceeds 2 MB.';
        document.getElementById('message').className = 'error';
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
    });

    const result = await response.json();
    document.getElementById('message').textContent = result.message;
    document.getElementById('message').className = result.success ? 'success' : 'error';
}

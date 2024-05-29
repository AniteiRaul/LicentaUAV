document.getElementById('save').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('http://localhost:3000/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, message })
        });

        const result = await response.json();
        location.reload()
        // alert(result.message);
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving item');
    }
});
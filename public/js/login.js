function checkLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Replace 'your_fixed_username' and 'your_fixed_password' with your desired fixed values
    const fixedUsername = 'admin';
    const fixedPassword = 'Admin#10';

    if (username === fixedUsername && password === fixedPassword) {
        // If the login is successful, redirect to the next page (replace 'next_page.html' with your desired URL)
        window.location.href = 'next_page.html';
        return false; // Prevent form submission to keep the user on the current page during redirection
    } else {
        // If the login is unsuccessful, show an error message and prevent form submission
        document.getElementById('error-message').style.display = 'block';
        return false;
    }
}
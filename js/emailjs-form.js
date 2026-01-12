/* 

EmailJS Contact Form Functionality

*/

function initContactForm()
{
	const contactForm = document.getElementById('contact_form');
	const formStatus = document.querySelector('.form-status');
	
	if (contactForm)
	{
		contactForm.addEventListener('submit', function(e)
		{
			e.preventDefault();
			
			const submitButton = document.getElementById('contact_button');
			const originalText = submitButton.textContent;
			
			// Show loading state
			submitButton.textContent = 'Sending...';
			submitButton.disabled = true;
			
			// Get form data
			const formData = {
				from_name: document.getElementById('contact_input_name').value,
				from_email: document.getElementById('contact_input_email').value,
				message: document.getElementById('contact_textarea').value
			};
			
			// Send email using EmailJS
			emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
				.then(function(response)
				{
					console.log('SUCCESS!', response.status, response.text);
					formStatus.textContent = 'Message sent successfully! We\'ll get back to you soon.';
					formStatus.style.color = '#28a745';
					contactForm.reset();
				}, function(error)
				{
					console.log('FAILED...', error);
					formStatus.textContent = 'Oops! Something went wrong. Please try again.';
					formStatus.style.color = '#dc3545';
				})
				.finally(function()
				{
					// Reset button state
					submitButton.textContent = originalText;
					submitButton.disabled = false;
					
					// Clear status message after 5 seconds
					setTimeout(function()
					{
						formStatus.textContent = '';
					}, 5000);
				});
		});
	}
}

// Initialize contact form when DOM is ready
document.addEventListener('DOMContentLoaded', function()
{
	initContactForm();
});

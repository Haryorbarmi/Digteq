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
			
			// Check if EmailJS is properly initialized
			if (typeof emailjs === 'undefined')
			{
				formStatus.textContent = 'EmailJS not loaded. Please check your connection.';
				formStatus.style.color = '#dc3545';
				return;
			}
			
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
			emailjs.send('service_51pcckj', 'service_osznhav', formData)
				.then(function(response)
				{
					console.log('SUCCESS!', response.status, response.text);
					formStatus.textContent = 'Message sent successfully! We\'ll get back to you soon.';
					formStatus.style.color = '#28a745';
					contactForm.reset();
				}, function(error)
				{
					console.log('FAILED...', error);
					formStatus.textContent = 'EmailJS configuration error: Please set your Public Key and Template ID.';
					formStatus.style.color = '#dc3545';
				})
				.finally(function()
				{
					// Reset button state
					submitButton.textContent = originalText;
					submitButton.disabled = false;
					
					// Clear status message after 8 seconds
					setTimeout(function()
					{
						formStatus.textContent = '';
					}, 8000);
				});
		});
	}
}

// Initialize contact form when DOM is ready
document.addEventListener('DOMContentLoaded', function()
{
	initContactForm();
});

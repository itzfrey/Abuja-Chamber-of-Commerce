const memberInfo = new URLSearchParams(window.location.search)

document.querySelector('#submission-details').innerHTML = `
<h3>Your Submission Details</h3>
<p><strong>First Name: </strong> <span id="firstName">${memberInfo.get('first')}</span></p>
<p><strong> Last Name: </strong> <span id="lastName">${memberInfo.get('last')}</span></p>
<p><strong>Email: </strong><span id="email">${memberInfo.get('email')}</span></p>
<p><strong>Mobile: </strong><span id="mobile">${memberInfo.get('phone')}</span></p>
<p><strong>Business Name: </strong> <span id="organization">${memberInfo.get('organization')}</span></p>
<p><strong>Timestamp: </strong><span id="timestamp">${memberInfo.get('timestamp')}</span></p>`
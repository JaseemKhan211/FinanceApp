    
    //signup
    function signup() 
{
        const email = document.getElementById('email_id').value
        const password = document.getElementById('password_id').value
        const Username = document.getElementById('user_id').value

    firebase.auth().createUserWithEmailAndPassword(email, password)
        
        .then(function(userResponse) 
    {
        const userId = userResponse.user.uid
        
        firebase.firestore().collection('users')
        
        .doc(userId)
        
        .set
        
        ({
            Username,
            email
        })
        
        .then(function() 
        {
            
            alert("Successfully Registered!")
            
            //link login
		    window.location = '../Login/index.html';
        
        })
        
        .catch(function(error) {
            var errorMessage = error.message;
            alert(errorMessage)
        })
    })
    
        .catch(function(error) 
    {
        
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        
        alert(errorMessage)
    
    });
        
    //form reaset method 
    document.getElementById('signUpform').reset();

}
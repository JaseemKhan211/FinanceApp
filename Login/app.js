    // console.log('firebase' , firebase.firestore);
    
//logIn 
    function login() 
    
{
    
        const email = document.getElementById('email_id').value
        const password = document.getElementById('password_id').value
    
        firebase.auth().signInWithEmailAndPassword(email, password)
        
        .then(function(userResponse) 
        {
            
            const userId = userResponse.user.uid
            localStorage.setItem('userId', userId)
            
            alert('Successfully Logged In')
            
            //link transation
		    window.location = '../Transactions/index.html';
        
        })
        
        .catch(function(error) 
        {
            
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            
            // console.log('error --->', error)
            alert(errorMessage)
        
        });
}
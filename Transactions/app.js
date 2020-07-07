
getUser()
getMonthAndYear()
getTtransactions()

  function getUser() 
{
  // const user = JSON.parse(localStorage.getItem('user'))
  // const userElement = document.getElementById('user_id')
  // userElement.innerHTML = user.Username
}

  function getMonthAndYear() 
{
  const date = new Date()
  const currentMonth = date.getMonth()
  const currentYear = date.getFullYear()
  const monthElement = document.getElementById('month')
  const yearElement = document.getElementById('year')
  monthElement.value = currentMonth
  yearElement.value = currentYear
}
 
  //Sava-Income
  function saveIncome()
{
  const userId = localStorage.getItem('userId');
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').valueAsDate
  const description = document.getElementById('description').value;  
  // console.log(amount , category , date , description);

  firebase.firestore().collection('transactions')
    .add
  ({
    amount , category , date , description , userId , type: 'income'
  })
  
  .then(function()
  {
    alert('Transaction Successful')
    getTtransactions()
    clearIncomeForm()
    
    //jquery use hide
    $('#incomeModal').modal('hide')
  
  })

}
  
//Clear form Income/Expense
  function clearIncomeForm()
{
  document.getElementById('amount').value = ""
  document.getElementById('category').value  = ""
  document.getElementById('date').value  = ""
  document.getElementById('description').value  = ""  
}
  
  //Sava-Expense
  function saveExpense()
{
  const userId = localStorage.getItem('userId');
  const amount = document.getElementById('amount-expense').value;
  const category = document.getElementById('category-expense').value;
  const date = document.getElementById('date-expense').valueAsDate
  const description = document.getElementById('description-expense').value;  

  firebase.firestore().collection('transactions')
  
    .add
  ({
    amount , category , date , description , userId , type: 'expense'
  })
  
    .then(function()
  {
    alert('Transaction Successful')
    getTtransactions()
    clearIncomeForm()
    
    //jquery use hide
    $('#expenseModal').modal('hide')
  
  })
}

  //Firebase data get getTtransactions()
  function getTtransactions()
{
  //userId localStorage
  const userId = localStorage.getItem('userId');
  
  //tbody ary return [0]
  const table = document.getElementsByTagName('tbody')[0]
  table.innerHTML = ""
  
  firebase.firestore().collection('transactions')

  //userId localStorage
  .where('userId' , '==' , userId)
  
  // .orderBy("date", "desc")
  
  .get()
  
  .then(function(snapeshote)
  {
      snapeshote.forEach(function(doc)
    {
      // console.log('doc.data()---->' , doc.data())
      const data = doc.data()
      const row = document.createElement('tr')
      const type = document.createElement('td')
      const amount = document.createElement('td')
      const category = document.createElement('td')
      const date = document.createElement('td')

      type.innerHTML = data.type
      amount.innerHTML = data.amount
      category.innerHTML = data.category
      date.innerHTML = data.date.toDate()

      row.appendChild(type)
      row.appendChild(amount)
      row.appendChild(category)
      row.appendChild(date)
 
      table.appendChild(row)
    
    })
  })
}

//filter
  function filter()
{
  //userId localStorage
  const userId = localStorage.getItem('userId');
  const type = document.getElementById('type-filter').value
  
  if(type === "all")
  {
    return getTtransactions()
  }

  const table = document.getElementsByTagName('tbody')[0]
  table.innerHTML = ""
  
  firebase.firestore().collection('transactions')
  
  //firestore me jaye ka woh seleck kare ka jo ap de rehe ho filter me
  .where('type' , '==' , type)
  
  //userId localStorage
  .where('userId' , '==' , userId)

  // .orderBy("date", "desc")
  
  .get()
  
  .then(function(snapeshote)
  {
      snapeshote.forEach(function(doc)
    {
      // console.log('doc.data()---->' , doc.data())
      const data = doc.data()
      const row = document.createElement('tr')
      const type = document.createElement('td')
      const amount = document.createElement('td')
      const category = document.createElement('td')
      const date = document.createElement('td')

      type.innerHTML = data.type
      amount.innerHTML = data.amount
      category.innerHTML = data.category
      date.innerHTML = data.date.toDate()

      row.appendChild(type)
      row.appendChild(amount)
      row.appendChild(category)
      row.appendChild(date)
 
      table.appendChild(row)
    })
  })
}
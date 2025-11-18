const express = require('express')
const users = require('./MOCK_DATA.json')
const app = express();
const fs = require('fs');


//middleware to parse json data
app.use(express.urlencoded({ extended: false }));


app.get('/users', (req, res) => {
   const html = `
     <ul>
        ${users.map((user)=> `<li>${user.first_name}</li>` ).join("")}
     </ul>
   `;

   res.send(html);
});

app.get('/api/users', (req, res) => {
  return res.json(users);
});

app.get('/', (req, res)=>{
 res.send('Hello')
})





//dynamic route parameters
app.get('/api/users/:id', (req, res)=>{
   const id = Number(req.params.id);
   const user = users.find(user => user.id === id);  // Implicit return

  return res.json(user);
})

//now we are gonna perform post, patch delete
//we can also do individual routes for these also
//this is called grouping of routes
app.route('/api/users/:id')
  .patch((req, res)=>{
     res.send('This is a patch request');
  })
  .delete((req, res)=>{
     res.send('This is a delete request');
  })  



  //TASK 1: - when new request come write the details in mock_data.json file
 app.post('/api/users', (req, res)=>{
   const body = req.body;
   
   fs.writeFile('MOCK_DATA.json', JSON.stringify(body) , (err, data)=>{
     if (err) {
         console.error('Error writing file:', err);
         return res.status(500).json({message: 'Failed to save data'});
      }
    
      return res.json({message:'success'});  
   });
});




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});      
const express = require('express');
const bodyPraser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


const app = express();
app.use(bodyPraser.json());
app.use(cors());


const database = {
	users :  [
		{
			id : '123',
			name: 'Ahmed',
			email: 'ahmed@gmail.com',
			password: 'amo',
			entries:0,
			joined : new Date()
		},
		{
			id : '124',
			name: 'hend',
			email: 'lolo@gmail.com',
			password: '21521',
			entries:0,
			joined : new Date()
		}
	]
}
app.get('/' , (req, res) =>  {
	res.send(database.users
		);
})

app.post('/signin', (req, res)=>{
	if (req.body.email=== database.users[0].email && 
		req.body.password=== database.users[0].password){
			res.json('success!');
		}else{
			res.status(404).json('erorr loged in');
		}
})

app.post('/register', (req, res)=>{
	const {email , name , password} = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
		console.log(hash);
	});
	database.users.push({
		
			id : 123,
			name: name,
			email: email,
			password: password,
			entries:0,
			joined : new Date()
		
	})
	res.json(database.users[database.users.length-1]);
})
app.get('/profile/:id' , (req, res) =>{
	const {id} = req.params;
	let found = false;
	database.users.forEach(user=> {
		if (user.id=== id){
			found=true;
			res.json(user);
		}
	})
	if (!found){
		res.json('not fount ')
	}
})
app.put('/imagee' , (req, res) =>{
	const {id} = req.body;
	let found = false;
	database.users.forEach(user=> {
		if (user.id === id){
			found=true;
			user.entries++
			 res.json(user.entries);
		}
	})
	if (!found){
		res.status(404).json('not fount ')
	}
})
app.put('/image', (req, res) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
	  res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
  })
  



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
app.listen(3000, ()=> {
	console.log('app is working sucsussfully !!');
})
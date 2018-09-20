const Router = require('express').Router();
const {User} = require('./../modals/users');
const _ = require('lodash');
const {authenticate} = require('./../middleware/authenticate');

//Signup request
Router.post('/create', (req, res) => {
	var body = req.body;
	var user = new User(body);
	user.save().then(()=>{
		return user.generateAuthToken();
	}).then((token)=>{
		res.header('x-auth', token).send(user);
	}).catch((e)=>{
		res.send(e);
	});
});

//Get user request
Router.get('/user', authenticate , (req, res) => {
	res.send(req.user);
});

//Get user request
Router.get('/profile/:_id', authenticate , (req, res) => {
	User.findOne({_id: req.params._id}).then((user) => {
			res.send(user);
	}).catch((e) => {
			res.status(400).send(e);
	})
});

//Login request
Router.post('/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});
	}).catch((e) => {
		res.status(400).send(e);
	});
});

//logout request
Router.delete('/logout', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(()=>{
		res.status(200).send("user logged out");
	}, () => {
		res.status(400).send();
	})
});

module.exports = Router;

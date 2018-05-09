
const usersController = require('./../controllers/usersController');
const authUser = usersController.authenticateUser;




module.exports = function(app) {
    app.get('/ping', (req,res) => res.send('Poing'));
    app.get('/api/session', (req,res) => res.json({session: req.session}));
    app.get('/api/user',  usersController.getAuthenticateUserName);
    app.get('/api/logout', usersController.logout);
    app.post('/api/register', usersController.validateRegister(), usersController.createUser);
    app.get('/api/users/',authUser, usersController.getAllUsers);
    app.post('/api/login', usersController.validateLogin(), usersController.loginUser);
    app.post('/api/createTechTalk', usersController.validateCreatePost(), usersController.createTechTalk);
    app.get('/api/getAllTechTalk/', usersController.getAllTechTalks);
    app.get('/api/showOneTechTalk/:id', usersController.showOneTechTalk);
    app.delete('/api/deletePost/:id', usersController.deletePost);
    app.put('/api/updatingPost/:id',  usersController.updatingPost);
    app.post('/api/likePost/:id', usersController.likePost);
    app.post('/api/disLikePost/:id', usersController.disLikePost);

    
    
    app.post('/api/*', (req,res) => res.json({error :true, message:'ABBOUD! API"s ERROR PLEASE CHECK THE URL'}));
    
}


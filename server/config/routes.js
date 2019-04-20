
const usersController = require('./../controllers/usersController');
const authUser = usersController.authenticateUser;
const authAdmin= usersController.authenticateAdmin;




module.exports = function(app) {
    app.get('/ping', (req,res) => res.send('Poing'));
    app.get('/api/session', (req,res) => res.json({session: req.session.user}));
    app.get('/api/sessionAdmin', (req,res) => res.json({session: req.session.admin}));
    app.get('/api/user',  usersController.getAuthenticateUserName);
    app.get('/api/logout', usersController.logout);
    app.post('/api/register', usersController.validateRegister(), usersController.createUser);
    app.get('/api/users/',authAdmin, usersController.getAllUsers);
    app.post('/api/login', usersController.validateLogin(), usersController.loginUser);
    app.post('/api/createTechTalk', usersController.validateCreatePost(), usersController.createTechTalk);
    app.get('/api/getAllTechTalk/', usersController.getAllTechTalks);
    app.get('/api/showOneTechTalk/:id', usersController.showOneTechTalk);
    app.delete('/api/deletePost/:id', usersController.deletePost);
    app.delete('/api/deleteUser/:id', usersController.deleteUser);
    app.put('/api/updatingPost/:id',  usersController.validateCreatePost(), usersController.updatingPost);
    app.post('/api/likePost/:id', usersController.likePost);
    app.post('/api/disLikePost/:id', usersController.disLikePost);
    app.put('/api/updateUser/:id', usersController.validateUpdateUser(), usersController.updatingUser);
    app.get('/api/showOneUser/:id', usersController.showOneUser);
    app.post('/api/registerAdmin',  usersController.createAdmin);
    app.post('/api/loginAdmin',  usersController.loginAdmin);

    

    
    
    app.post('/api/*', (req,res) => res.json({error :true, message:'ABBOUD! API"s ERROR PLEASE CHECK THE URL'}));
    
}


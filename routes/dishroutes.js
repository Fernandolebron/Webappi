
// call the packages we need
var express    = require('express');                        // call express
var router = express.Router();              // get an instance of the express Router
var Dish = require('../models/dish');
var jwt = require('jsonwebtoken');

//	Lista de todos los Platos.
router.get('/dishes', function(req, res){
		Dish.models.dish.find(function(err, dishes){
			if(err) 
				return res.send(err);

			res.json(dishes);
		});
	});

// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'SecretKey', function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

//	Creacion de un Plato
router.post('/create', function(req, res){
		var dish = new Dish.models.dish();

		dish.name = req.body.name;
		dish.type = req.body.type;
		dish.description = req.body.description;
		dish.ingredients = req.body.ingredients;
		dish.speciality = req.body.speciality;
		dish.favoriteChef = req.body.favoriteChef;
		dish.price = req.body.price;
		dish.image = req.body.image;
		
		dish.save(function(err){
			if (err)
				return res.send(err);

			res.json({message: '¡Plato creado!'});
		});
	});
	
//	Edicion de un Plato
router.post('/edit', function(req, res){
		Dish.models.dish.get(req.body.id, function (err, dish) {
            dish.name = req.body.name;
    		dish.type = req.body.type;
    		dish.description = req.body.description;
    		dish.ingredients = req.body.ingredients;
    		dish.speciality = req.body.speciality;
    		dish.favoriteChef = req.body.favoriteChef;
    		dish.price = req.body.price;
    		dish.image = req.body.image;
    		
    		dish.save(function(err){
    			if (err)
    				return res.send(err);
    
    			res.json({message: '¡Plato editado!'});
    		});
        });
	});
	
	
router.post('/remove', function(req, res){
		Dish.models.dish.get(req.body.id, function (err, dish) {
    		dish.remove(function(err){
    			if (err)
    				return res.send(err);
    
    			res.json({message: '¡Plato eliminado!'});
    		});
        });
	});
	
	
module.exports = router;
var mongoose = require('mongoose');
var People = require('./models/people.model');
var Card = require('./models/card.model');
var LangVars = require('./models/langVars.model');
var Dropdown = require('./models/dropdown.model');
var Article = require('./models/article.model');


var Schema = mongoose.Schema;

mongoose.Promise = require('q').Promise;

var options = {
    useMongoClient: true
};

var mongodbUri = 'mongodb://scitechuser:scitech2017@ds151024.mlab.com:51024/heroku_8x24w9z4';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

conn.on('error', function(err) {
  console.log('noup', err)
});

conn.once('open', function() {
  console.log('horaay... I`m connected')
});


var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
var port = process.env.PORT || 8083;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {

    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});



//Card
router.route('/cards')
    .get(function(req, res) {
        Card
          .find()
          .sort({"creationDate": -1})
          .populate("_author",  ['name', 'description', 'contacts'])
          .exec(function(err, cards) {
              if (err){
                  res.send(err);
              }
              console.log(err);
              cards.map((item)=> {
                if(item.customAuthor != undefined && item.customAuthor.length != 0) {
                  item.customAuthor.map(function(cardItem) {
                    item._author.push(cardItem);
                  });

                  delete item.customAuthor;
                }
              })
              res.json(cards);
          })
    });
    // Attention! GOVNOKOD
    router.route('/cards/latest')
        .get(function(req, res) {
          let latestItems = [];
            Card
              .find({ "type": "Tender"})
              .sort({"creationDate": -1})
              .limit(2)
              .populate("_author",  ['name', 'description', 'contacts'])
              .exec(function(err, cards) {
                  if (err){
                      res.send(err);
                  }

                  cards.map((item)=> {
                    if(item.customAuthor != undefined && item.customAuthor != null && item.customAuthor.length != 0) {

                      item.customAuthor.map(function(cardItem) {
                        item._author.push(cardItem);
                      });

                      delete item.customAuthor;
                    }
                  })

                  latestItems = [...latestItems, ...cards];

                  Card
                    .find({ "type": "Research"})
                    .sort({"creationDate": -1})
                    .limit(4)
                    .populate("_author",  ['name', 'description', 'contacts'])
                    .exec(function(err, cards) {
                        if (err){
                            res.send(err);
                        }

                        cards.map((item)=> {
                          if(item.customAuthor != undefined && item.customAuthor != null && item.customAuthor.length != 0) {

                            item.customAuthor.map(function(cardItem) {
                              item._author.push(cardItem);
                            });

                            delete item.customAuthor;
                          }
                        })
                        latestItems = [...latestItems, ...cards];

                        Card
                          .find({ "type": "Startup"})
                          .sort({"creationDate": -1})
                          .limit(4)
                          .populate("_author",  ['name', 'description', 'contacts'])
                          .exec(function(err, cards) {
                              if (err){
                                  res.send(err);
                              }

                              cards.map((item)=> {
                                if(item.customAuthor != undefined && item.customAuthor != null && item.customAuthor.length != 0) {

                                  item.customAuthor.map(function(cardItem) {
                                    item._author.push(cardItem);
                                  });

                                  delete item.customAuthor;
                                }
                              })
                              latestItems = [...latestItems, ...cards];

                              Card
                                .find({ "type": "Meetup"})
                                .sort({"creationDate": -1})
                                .limit(2)
                                .populate("_author",  ['name', 'description', 'contacts'])
                                .exec(function(err, cards) {
                                    if (err){
                                        res.send(err);
                                    }

                                    cards.map((item)=> {
                                      if(item.customAuthor != undefined && item.customAuthor != null && item.customAuthor.length != 0) {

                                        item.customAuthor.map(function(cardItem) {
                                          item._author.push(cardItem);
                                        });

                                        delete item.customAuthor;
                                      }
                                    })
                                    latestItems = [...latestItems, ...cards];


                                  res.json(latestItems)
                                })



                          })

                    }) ;

              });

        });


        // END
    router.route('/cards/type/:type')
        .get(function(req, res) {
            Card
              .find({ "type": req.params.type})
              .sort({"creationDate": -1})
              .populate("_author",  ['name', 'description', 'contacts'])
              .exec(function(err, cards) {
                  if (err){
                      res.send(err);
                  }

                  console.log(cards);
                  cards.map((item)=> {
                    if(item.customAuthor != undefined && item.customAuthor != null && item.customAuthor.length != 0) {
                      console.log(item.customAuthor);
                      item.customAuthor.map(function(cardItem) {
                        item._author.push(cardItem);
                      });

                      delete item.customAuthor;
                    }
                  })
                  res.json(cards);
              })
        });
        router.route('/cards/filter/:type/:name/:filter')
        .get(function(req, res) {

          function handleFind() {
            
            if(!req.params.filter) {
              return {"type":req.params.type}
            }

            return { "type":req.params.type, [req.params.name]: { $in: req.params.filter.split(',')}}
          }

            Card
              .find(handleFind())
              .sort({"creationDate": -1})
              .populate("_author",  ['name', 'description', 'contacts'])
              .exec(function(err, cards) {
                  if (err){
                      res.send(err);
                  }

                  if(cards){
                    cards.map((item)=> {
                      if(item.customAuthor != undefined && item.customAuthor != null && item.customAuthor.length != 0) {
                        console.log(item.customAuthor);
                        item.customAuthor.map(function(cardItem) {
                          item._author.push(cardItem);
                        });

                        delete item.customAuthor;
                      }
                    })
                    res.json(cards);
                  }
              })
        });

router.route('/card/:id')
    .get(function(req, res) {
        var query = {"_id": req.params.id };

        Card.find(query)
            .populate("_author", ['name', 'description', 'contacts'])
            .exec(function(err, card) {
                if (err){
                    res.send(err);
                }
                card.map((item)=> {
                  if(item.customAuthor != undefined && item.customAuthor.length != 0) {
                    item.customAuthor.map(function(cardItem) {
                      item._author.push(cardItem);
                    });

                    delete item.customAuthor;
                  }
                })

                res.json(card);
            })
    });
router.route('/article/:id')
    .get(function(req, res) {
        var query = {"_id": req.params.id };

        Article.find(query)
            .exec(function(err, article) {
                if (err){
                    res.send(err);
                }

                res.json(article);
            })
    });
    router.route('/card/add')
        .post(function(req, res) {
            let item = req.body;
            if(item._author != undefined && item._author.length != 0 && item._author[0].trim() != ""){
              let authors = [];
              item._author.map(function(item) {
                if(item.trim() != ''){
                  authors.push(mongoose.Types.ObjectId(item.trim()));
                }
              });

              item._author = authors;
            }

            item.creationDate = new Date;
            let card = new Card(item);

            card.save(function(err) {
              console.log('saved')
              res.json({message: "item saved"});

            });
        });
//Dropdown

router.route('/dropdowns')
    .get(function(req, res) {

        Dropdown.find({},
            function(err, dropdowns) {
                if (err){
                    res.send(err);
                }
                // res.send(Person);
                res.json(dropdowns);
            });
    });

//Persons
router.route('/persons')
    .get(function(req, res) {

        People.find({},
            function(err, person) {
                if (err){
                    res.send(err);
                }
                // res.send(Person);
                res.json(person);
            })
            .sort({"creationDate": 1});
    });
router.route('/persons/add')
        .post(function(req, res) {
          let item = req.body;
          item.creationDate = new Date;
          let person = new People(item);

          person.save(function(err) {
            console.log('saved', person)
            res.json({message: "item saved"});

          });
        });
router.route('/person/:id')
    .get(function(req, res) {
        console.log('lets find smth',  req.params.id);

        People.find({ "_id": req.params.id })
        .exec(
            function(err, person) {
                if (err){
                    res.send(err);
                }
                // res.send(Person);
                res.json(person);
            });
    });

    router.route('/search/:word')
        .get(function(req, res) {


            Card.find({ $or: [ { "name": { $elemMatch: {"ru": { '$regex' : req.params.word, '$options': 'i' } } } } , { "name": { $elemMatch: {"en": { '$regex' : req.params.word, '$options': 'i' } } } } ] })
            .populate("_author", ['name'])
            .exec(
                function(err, cards) {
                    if (err){
                        res.send(err);
                    }
                    cards.map((item)=> {
                      if(item.customAuthor != undefined && item.customAuthor.length != 0) {
                        item.customAuthor.map(function(cardItem) {
                          item._author.push(cardItem);
                        });

                        delete item.customAuthor;
                      }
                    })
                    res.json(cards);
                });
        });

router.route('/langvars/:lang')
    .get(function(req, res) {


        LangVars.find({"lang": req.params.lang })
        .exec(
            function(err, lang) {
                if (err){
                    res.send(err);
                }
                let langVars = {};
                lang.map((item)=>{
                  langVars[item.key] = item.value;
                });
                res.json(langVars);
            });
    });


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);

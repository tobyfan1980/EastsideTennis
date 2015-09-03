var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users');
var Event = require('../models/events');

/* GET events listing. */
router.get('/', function(req, res, next) {
  console.log(req.query);
  var filter = {};

  var now = new Date();
  var date_month_begin = new Date(now.year, now.month);
  var date_next_month_begin = new Date(now.year, now.month + 1)

  if ('month' in req.query){
     var str_month = req.query.month;
     date_month_begin = new Date(str_month);
     date_next_month_begin = new Date(date_month_begin.year, date_month_begin.month+1);
  }


  console.log("finding event by ID:");
  console.log(filter);

  Event
  .find({"datetime": {"$gte": date_month, "$lt": date_next_month_begin}})
  .populate('organizer players')
  .exec(function(err, events){
    if (err) {
      console.log(err);
      next(err);
    }
    else {
      console.log(events);
      res.json(events);
    }
  });
});

router.post('/', function(req, res, next){
  console.log(req.body);
  if(req.body.action == "create"){
    var eventData = req.body.event;
    console.log(eventData);

    Event.create(eventData, function(err, event){
      if (err) next(err);
      else{
        console.log(event);
        res.json(event);
      }
    });
  }
  else if(req.body.action=="update"){
    console.log("update event");
    console.log(req.body);
    Event.update({_id:req.body.event.id}, {status: req.body.event.status}, {upsert:false}, function(err, event){
      if(err){
        console.log(err);
        next(err);
      }
      else{
        res.json(event);
      }
    });
  }
  else{
    console.log("unknown event post action: " + req.body.action);

    next(new Error("unknown event post action:"+req.body.action));
  }


});


module.exports = router;

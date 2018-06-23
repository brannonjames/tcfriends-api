const db = require('../config/database');





exports.getAllShelters = async function(req, res, next){
    try {
      let shelters = await db.Shelter.find()
        .skip(Number(req.query.skip) || null)
        .limit(Number(req.query.limit) || null)
      res.status(200).json(shelters);
    } catch(err){
      next(err);
    }
  }


exports.getShelter = async function(req, res, next){
  try {
    let shelter = await db.Shelter.findById(req.params.shelter_id)
      .populate('friends')  
    res.status(200).json(shelter);  
  } catch(err){
    next(err);
  }
}


exports.addShelter = async function(req, res, next){
  try {
    let user = res.locals.user;
    let shelter;
    if(!user.shelter){
      shelter = await db.Shelter.create({
        creator: user._id,
        ...req.body
      });
      user.sheltersModerating.push(shelter._id);
      user.shelter = shelter._id;
      shelter.moderators.push(user._id);
      shelter = await shelter.save();
      user = await user.save();
    } else {
      throw Error('You can not add more than one shelter at this time');
    }
    res.status(200).json(shelter);
  } catch(err){
    next(err);
  }
}

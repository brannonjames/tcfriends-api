const db = require("../config/database");

exports.addFriend = async function(req, res, next){
  try {
    let {shelter, user} = res.locals;
    let friend = await db.Friend.create({
      creator: user._id,
      shelter: shelter._id,
      ...req.body
    });
    let photo = await db.Photo.create({
      creator: user._id,
      friend: friend._id,
      path: req.body.photo
    })
    await friend.media.photos.push(photo._id);
    await friend.save();
    shelter.friends.push(friend);
    await shelter.save();
    res.status(200).json(friend);
  } catch(err){
    next(err);
  }
}

exports.getFriends = async function(req, res, next){
  try {
    let {limit=20, skip=0} = req.query;
    let friends = await db.Friend.find()
      .limit(Number(limit))
      .skip(Number(skip))
      .populate('shelter', 'name')
      .populate('media.photos', 'url')
    res.status(200).json(friends);
  } catch(err){
    next(err)
  }
}

exports.getFriend = async function(req, res, next){
  try {
    let friend = await db.Friend.findById(req.params.friend_id)
      .populate('shelter', 'name')
      .populate('media.photos', 'url');
    res.status(200).json(friend);
  } catch(err){
    next(err);
  }
}

exports.updateFriend = async function(req, res, next){
  try {
    let friend = await db.Friend.findByIdAndUpdate(req.params.friend_id, req.body, {new: true})
      .populate('shelter', 'name')
      .populate('media.photos', 'url')
    if(req.query.heart){
      let {user} = res.locals;
      isHearted = user.favorites.some(f => (
        f.equals(friend._id)
      ));
      if(isHearted){
        friend.ups--;
        user.favorites = user.favorites.filter(f => (
          !f.equals(friend._id)
        ))
      } else {
        friend.ups++;
        user.favorites.push(friend._id);
      }
      await user.save();
      await friend.save();
    }
    res.status(200).json(friend);
  } catch(err){
    next(err);
  }
}

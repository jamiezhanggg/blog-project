const HttpException = require("../exceptions/http.exceptions");
const User = require("../model/user");


module.exports.follow = async(req, res, next) => {
    try {
        const username = req.params.username;
        console.log(username);
        const userFollowed = await User.findOne({
            where: {username}
        });
        if(!userFollowed)
            throw new HttpException(401, 'user not found', 'user not found');
        const userFollower = await User.findByPk(req.user.email);
        if(!userFollower)
            throw new HttpException(401, 'follower not found', 'follower not found');
        await userFollowed.addFollowers(userFollower);
        const profile = {
            username: userFollowed.username,
            bio: userFollowed.bio,
            avatar: userFollowed.avatar,
            following: true
        }
        res.status(200).json({
            status:1,
            message: 'following succeed',
            data: profile
        })

    } catch (error){
        next(error);
    }
}
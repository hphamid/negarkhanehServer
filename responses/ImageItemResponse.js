/**
 * Created by hamid on 7/24/16.
 */
module.exports = function (imageItem, likeItem){
    return {
        getImage: function() {
            return imageItem;
        },
        getLike: function(){
            return likeItem
        },
        toJSON: function(){
            return {image: imageItem||undefined, like: likeItem||undefined};
        }
    }
}
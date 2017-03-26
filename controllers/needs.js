const mongodbCollection = require('../config/mongodbCollection');
const needsList = mongodbCollection.sharesList;

module.exports = needsListControllers = {

    // return all the active shares in the needsListControllers
    getAllActiveShares: () => {
        return needsList().then((needsListCollection) => {
            return needsListCollection.find({ activeStatus: true }, { _id: 1, title: 1 }).toArray();
        });
    },


    // return shares of specific id
    getShareById: (id) => {
        return needsList().then((needsListCollection) => {
            return needsListCollection.findOne({ _id: id })
                .then((searchedItem) => {

                    if (!searchedItem) {               // checking share id
                        return Promise.reject(`No share of id ${id} is found in records.`);
                    }

                    return searchedItem;
                });
        });
    },

    // return shares of specific category
    getShareByCategory: (searchCategory) => {
        return needsList().then((needsListCollection) => {
            return needsListCollection.find({ itemCategory: searchCategory }, { title:1, cuisine:1 }).toArray()
                .then((searchedItemList) => {

                    if (!searchedItemList) {               // checking share category
                        return Promise.reject(`No share of  ${searchCategory} category is found in records.`);
                    }

                    return searchedItemList;
                });
        });
    },

    // return shares of specific category
    getShareByZip: (zipCode) => {
        return needsList().then((needsListCollection) => {
            return needsListCollection.find({ "dropAddress.zipCode": zipCode }, { _id:1, title:1, dropAddress:1 }).toArray()
                .then((searchedItemsList) => {

                    let mapMarkers = [];

                    for(var i = 0; i < searchedItemsList.length; i++) {
                        var shareURL = "http://localhost:3000/needs/id/" + searchedItemsList[i]._id;
                        var shareLocStr = searchedItemsList[i].dropAddress.street + ",+" + searchedItemsList[i].dropAddress.city + ",+" + searchedItemsList[i].dropAddress.state;
                        var shareLoc = shareLocStr.split(' ').join('+');
                        
                        mapMarkers[i] = {
                            title: searchedItemsList[i].title,
                            loc: shareLoc,
                            url : shareURL
                        }
                    }

                    if (!searchedItemsList) {               // checking share zip code
                        return Promise.reject(`No share of ${zipCode} category is found in records.`);
                    }

                    return mapMarkers;
                });
        });
    },

    // create a new comment with specified parameters for share item
    createComment: (shareId, newComment) => {
        return needsList().then((needsListCollection) => {
            return needsListCollection.findOne({ _id: shareId }).then((shareItem) => {

                if (!shareItem) {                              // checking recipe
                    return Promise.reject(`No share item of id ${shareId} found in records.`);
                }

                // new comment object
                let addComment = { 
                    date: new Date()
                };

                if (newComment.email)
                    addComment['email'] = newComment.email;

                if (newComment.comment)
                    addComment['comment'] = newComment.comment;

                    console.log(addComment);

                return needsListCollection.update({ _id: shareId }, { $push: { comments: addComment } }).then(() => {
                    return shareItem;
                });
            });
        });
    },   
};


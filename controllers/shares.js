const uuid = require('uuid');
const mongodbCollection = require('../config/mongodbCollection');
const sharesList = mongodbCollection.sharesList;

module.exports = sharesListControllers = {

    // return shares of specific id
    getShareById: (id) => {
        return sharesList().then((sharesListCollection) => {
            return sharesListCollection.findOne({ _id: id })
                .then((searchedItem) => {

                    if (!searchedItem) {               // checking share id
                        return Promise.reject(`No share of id ${id} is found in records.`);
                    }

                    return searchedItem;
                });
        });
    },

    // create a new share with specified parameters
    createShare: (title, description, images, itemStatus, dropStatus, dropStreet, dropApt, dropCity, dropState, dropZip, itemCategory, foodCuisine, foodCookDate, foodBestBeforeDate, foodIngredients, clothSize, clothGender, comments) => {
        return sharesList().then((sharesListCollection) => {

            // new share object
            let newShare = {
                _id: uuid.v4(),
                activeStatus: true,
                title: title,
                description: description,
                images: images, 
                itemStatus: itemStatus, 
                dropStatus: dropStatus,
                dropAddress: {
                        street: dropStreet,
                        apt: dropApt,
                        city: dropCity,
                        state: dropState, 
                        zipCode: dropZip
                    },
                itemCategory: itemCategory,
                foodCuisine: foodCuisine,
                foodCookDate: foodCookDate,
                foodBestBeforeDate: foodBestBeforeDate,
                foodIngredients: foodIngredients,
                clothSize: clothSize,
                clothGender: clothGender,
                comments: comments,
                shareDate: new Date()
            };

            return sharesListCollection.insertOne(newShare)
                .then((newShareInformation) => {
                    return newShareInformation.insertedId;
                })
                .then((newShareId) => {
                    return sharesListControllers.getShareById(newShareId);
                });
        });
    },

    // update a share with supplied parameters
    updateShare: (id, shareUpdates) => {

        return sharesList().then((sharesListCollection) => {
            let shareChanges = {} ;                    // new empty object

            if (shareUpdates.title) {                  // checking and updating title
                shareChanges['title'] = shareUpdates.title;
            }

            if (shareUpdates.description) {             // checking and updating description
                shareChanges['description'] = shareUpdates.description;
            }

            if (shareUpdates.images) {                  // checking and updating images
                shareChanges['images'] = shareUpdates.images;
            }

            if (shareUpdates.itemStatus) {                  // checking and updating item status
                shareChanges['itemStatus'] = shareUpdates.itemStatus;
            }

            if (shareUpdates.dropStatus) {                  // checking and updating drop status
                shareChanges['dropStatus'] = shareUpdates.dropStatus;
            }

            if (shareUpdates.dropAddress.dropStreet) {          // checking and updating drop street
                shareChanges['dropAddress.dropStreet'] = shareUpdates.dropAddress.dropStreet;
            }

            if (shareUpdates.dropAddress.dropApt) {             // checking and updating drop apt
                shareChanges['dropAddress.dropStreet'] = shareUpdates.dropAddress.dropApt;
            }

            if (shareUpdates.dropAddress.dropCity) {            // checking and updating drop city
                shareChanges['dropAddress.dropStreet'] = shareUpdates.dropAddress.dropCity;
            }

            if (shareUpdates.dropAddress.dropState) {           // checking and updating drop state
                shareChanges['dropAddress.dropStreet'] = shareUpdates.dropAddress.dropState;
            }

            if (shareUpdates.dropAddress.dropZip) {             // checking and updating drop zipcode
                shareChanges['dropAddress.dropStreet'] = shareUpdates.dropAddress.dropStreet;
            }

            if (shareUpdates.itemCategory) {                    // checking and updating item category
                shareChanges['itemCategory'] = shareUpdates.itemCategory;
            }

            if (shareUpdates.foodCuisine) {                     // checking and updating food cuisine
                shareChanges['foodCuisine'] = shareUpdates.foodCuisine;
            }

            if (shareUpdates.foodCookDate) {                    // checking and updating food cook date
                shareChanges['foodCookDate'] = shareUpdates.foodCookDate;
            }

            if (shareUpdates.foodBestBeforeDate) {              // checking and updating food best before date
                shareChanges['foodBestBeforeDate'] = shareUpdates.foodBestBeforeDate;
            }

            if (shareUpdates.foodIngredients) {                 // checking and updating food ingredients
                shareChanges['foodIngredients'] = shareUpdates.foodIngredients;
            }

            if (shareUpdates.clothSize) {                       // checking and updating cloth size
                shareChanges['clothSize'] = shareUpdates.clothSize;
            }

            if (shareUpdates.clothGender) {                     // checking and updating cloth gender
                shareChanges['clothGender'] = shareUpdates.clothGender;
            }

            if (shareUpdates.comments) {                        // checking and updating comments
                shareChanges['comments'] = shareUpdates.comments;
            }

            return sharesListCollection.updateOne({ _id: id }, { $set: shareChanges })
                .then(() => {
                    return sharesListControllers.getShareById(id);
                });
        });
    },

    // disable a share with supplied parameters
    disableShare: (id) => {
        return sharesList().then((sharesListCollection) => {

            let shareChanges = {};                    // new empty object
            shareChanges['activeStatus'] = false;

            return sharesListCollection.updateOne({ _id: id }, { $set: shareChanges })
                .then(() => {
                    return sharesListControllers.getShareById(id);
                });
        });
    },

    // delete a share of specified id
    deleteShare: (id) => {
        return sharesList().then((sharesListCollection) => {
            return sharesListCollection.removeOne({ _id: id })
                .then((deletedShareInformation) => {
                    if (deletedShareInformation.deletedCount === 0) {               // validating delete
                        return Promise.reject(`No share deleted having id ${id}`);
                    }
                });
        });
    }        
};
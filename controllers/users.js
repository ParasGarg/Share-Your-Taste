const uuid = require('uuid');
const mongodbCollection = require('../config/mongodbCollection');
const usersList = mongodbCollection.users;

module.exports = usersListControllers = {

    // return users of specific id
    getUserById: (id) => {
        return usersList().then((usersListCollection) => {
            return usersListCollection.findOne({ _id: id })
                .then((searchedUser) => {

                    if (!searchedUser) {               // checking user id
                        return Promise.reject(`No user of id ${id} is found in records.`);
                    }

                    return searchedUser;
                });
        });
    },

    getUserValidStatus: (email) => {
        return usersList().then((usersListCollection) => {
            return usersListCollection.findOne({ email:email })
                .then((userDetails) => {

                    if (userDetails == null) {
                        return false;
                    } else {
                        return true;
                    }
                    
                }, () => {
                    return Promise.reject(`You are a registered user`);
                });
        });
    },

    // create a new user with specified parameters
    createUser: (name, email, mobile, image, bio, street, apt, city, state, zip, privacyStatus) => {
        return usersList().then((usersListCollection) => {

            // new user object
            let newUser = {
                _id: uuid.v4(),
                name: name,
                email: email,
                mobile: mobile,
                image: image,
                bio: bio,
                address: {
                        street: street,
                        apt: apt,
                        city: city,
                        state: state, 
                        zipCode: zip
                    },
                registerStatus: true,
                privacyStatus: privacyStatus,
                rating: 0,
                rateCount: 0,
                rateTotal: 0, 
                regDate: new Date()
            };

            return usersListCollection.insertOne(newUser)
                .then((newUserInformation) => {
                    return newUserInformation.insertedId;
                })
                .then((newUserId) => {
                    return usersListControllers.getUserById(newUserId);
                });
        });
    },

    // update a user with supplied parameters
    updateUser: (id, userUpdates) => {
        return usersList().then((usersListCollection) => {
            let userChanges = {} ;                              // new empty object

            if (userUpdates.name) {                             // checking and updating name
                userChanges['name'] = userUpdates.name;
            }

            if (userUpdates.mobile) {                           // checking and updating mobile
                userChanges['mobile'] = userUpdates.mobile;
            }

            if (userUpdates.image) {                           // checking and updating images
                userChanges['image'] = userUpdates.images;
            }

            if (userUpdates.bio) {                              // checking and updating item bio
                userChanges['bio'] = userUpdates.bio;
            }

            if (userUpdates.street) {                           // checking and updating home street
                userChanges['address.street'] = userUpdates.street;
            }

            if (userUpdates.apt) {                              // checking and updating home apt
                userChanges['address.apt'] = userUpdates.apt;
            }

            if (userUpdates.city) {                             // checking and updating home city
                userChanges['address.city'] = userUpdates.city;
            }

            if (userUpdates.state) {                            // checking and updating home state
                userChanges['address.state'] = userUpdates.state;
            }

            if (userUpdates.zipCode) {                          // checking and updating home zipcode
                userChanges['address.zipCode'] = userUpdates.zipCode;
            }

            if (userUpdates.registerStatus) {                   // checking and updating register status
                userChanges['registerStatus'] = userUpdates.registerStatus;
            }

            if (userUpdates.privacyStatus) {                     // checking and updating privacy status
                userChanges['privacyStatus'] = userUpdates.privacyStatus;
            }

            return usersListCollection.updateOne({ _id: id }, { $set: userChanges })
                .then(() => {
                    return usersListControllers.getUserById(id);
                });
        });
    },

    // disable a user with supplied parameters
    disableUser: (id) => {

        return usersList().then((usersListCollection) => {
            
            let userChanges = { } ;                             // new empty object
            userChanges['registerStatus'] = false;
            
            return usersListCollection.updateOne({ _id: id }, { $set: userChanges })
                .then(() => {
                    return usersListControllers.getUserById(id);
                });
        });
    }
};




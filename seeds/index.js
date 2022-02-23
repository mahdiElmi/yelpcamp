const mongoose = require('mongoose');
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");

// import mongoose from 'mongoose';
// import Campground from "../models/campground.js";
// import cities from "./cities.js";
// import { places, descriptors } from "./seedHelper.js";

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 214; i++) {
        const random415 = Math.floor(Math.random() * 415);
        const price = Math.floor(Math.random() * 20 + 12);
        const camp = new Campground({
            location: `${cities[random415].city}, ${cities[random415].admin_name}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dicfw8ec0/image/upload/v1644855422/YelpCamp/atr4bepe8gfd7q9ktuaf.jpg',
                    filename: 'YelpCamp/atr4bepe8gfd7q9ktuaf'
                },
                {
                    url: 'https://res.cloudinary.com/dicfw8ec0/image/upload/v1644855424/YelpCamp/qfepom6zc7iipi6kgoak.jpg',
                    filename: 'YelpCamp/qfepom6zc7iipi6kgoak'
                }
            ],
            geometry: {
                type: "Point",
                coordinates: [cities[random415].lng, cities[random415].lat]
            },
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos quia quidem numquam totam laborum non consequuntur ad doloremque mollitia possimus nemo, a accusamus. Est molestias delectus explicabo reiciendis ducimus corrupti.Optio minus, placeat repellat consequatur voluptate quidem facere delectus quibusdam.Nisi, id nam.Nulla voluptatibus consectetur optio rerum laudantium magni, est iste, veniam expedita, atque nam mollitia ipsam quasi eum!Vel voluptatem atque fugiat minima aliquid qui odit nisi, rem accusantium numquam iste quidem quod ea debitis error a? Nam doloribus enim quod distinctio saepe exercitationem harum eos fugit soluta.",
            price,
            author: "61f269925acdeac809a96bb7"
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
}) 

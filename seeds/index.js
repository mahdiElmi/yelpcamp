if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log(
    "Database connected",
    process.env.CLOUDINARY_SECRET,
    "process.env"
  );
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const randomNum = Math.floor(Math.random() * cities.length);
    const price = Math.floor(Math.random() * 20 + 12);
    const camp = new Campground({
      location: `${cities[randomNum].city}, ${cities[randomNum].admin_name}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dicfw8ec0/image/upload/c_crop,h_1280,w_1920/v1644855422/YelpCamp/atr4bepe8gfd7q9ktuaf.jpg",
          filename: "YelpCamp/atr4bepe8gfd7q9ktuaf",
        },
        {
          url: "https://res.cloudinary.com/dicfw8ec0/image/upload/v1644855424/YelpCamp/qfepom6zc7iipi6kgoak.jpg",
          filename: "YelpCamp/qfepom6zc7iipi6kgoak",
        },
      ],
      geometry: {
        type: "Point",
        coordinates: [cities[randomNum].lng, cities[randomNum].lat],
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos quia quidem numquam totam laborum non consequuntur ad doloremque mollitia possimus nemo, a accusamus. Est molestias delectus explicabo reiciendis ducimus corrupti.Optio minus, placeat repellat consequatur voluptate quidem facere delectus quibusdam.",
      price,
      author: "6214c33029e62865b15a69b5",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

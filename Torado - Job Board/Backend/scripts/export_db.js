const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
// Adjust path to point to .env in parent directory relative to scripts folder
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const exportData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    console.log("Connecting to DB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const dumpDir = path.join(__dirname, "../data_dump");

    if (!fs.existsSync(dumpDir)) {
      fs.mkdirSync(dumpDir, { recursive: true });
    }

    console.log(
      `Found ${collections.length} collections. Exporting to ${dumpDir}...`,
    );

    for (const collection of collections) {
      const name = collection.name;
      const data = await mongoose.connection.db
        .collection(name)
        .find({})
        .toArray();
      fs.writeFileSync(
        path.join(dumpDir, `${name}.json`),
        JSON.stringify(data, null, 2),
      );
      console.log(`Exported ${name}: ${data.length} records`);
    }

    console.log("Export complete successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Export failed:", err);
    process.exit(1);
  }
};

exportData();

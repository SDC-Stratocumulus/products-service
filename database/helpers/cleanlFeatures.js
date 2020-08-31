const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require("fs");
const Transform = require("stream").Transform;

const csvStringifier = createCsvStringifier({
  header: [
    { id: "id", title: "id" },
    { id: "productId", title: "product_id" },
    { id: "feature_name", title: "feature_name" },
    { id: "feature_value", title: "feature_value" },
  ],
});

let readStream = fs.createReadStream("../../pgdata/seed_data/features.csv");
let writeStream = fs.createWriteStream(
  "../../pgdata/seed_data/cleanedFeatures.csv"
);

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    if (chunk.feature_value.includes(",")) {
      let newString = chunk.feature_value.replace(',','');
      chunk.feature_value = newString;
    }

    //uses our csvStringifier to turn our chunk into a csv string
    chunk = csvStringifier.stringifyRecords([chunk]);
    this.push(chunk);
    next();
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });

//write header
writeStream.write(csvStringifier.getHeaderString());

readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("finished");
  });

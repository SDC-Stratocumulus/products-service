const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require("fs");
const Transform = require("stream").Transform;

const csvStringifier = createCsvStringifier({
  header: [
    { id: "1", title: "style_id" },
    { id: "2", title: "full_size_url" },
    { id: "3", title: "thumbnail_url" },
  ],
});

let readStream = fs.createReadStream("../../pgdata/seed_data/photos.csv");
let writeStream = fs.createWriteStream(
  "../../pgdata/seed_data/cleanedPhotos.csv"
);

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {

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
  })
  .on("error", (err) => {
    console.log(err);
  });

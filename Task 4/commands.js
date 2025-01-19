

// classification
db.information.find().forEach(function(doc) {
  const ip_address = doc.ip_address.split('.');
  const firstOctet = parseInt(ip_address[0]);

  if (firstOctet >= 1 && firstOctet <= 126) {
    db.classA.insertOne(doc);
  } else if (firstOctet >= 128 && firstOctet <= 191) {
    db.classB.insertOne(doc);
  } else if (firstOctet >= 192 && firstOctet <= 223) {
    db.classC.insertOne(doc);
  } else if (firstOctet >= 224 && firstOctet <= 239) {
    db.classD.insertOne(doc);
  } else if (firstOctet >= 240 && firstOctet <= 255) {
    db.classE.insertOne(doc);
  }
});


//ratio:
function calculateRatio(collectionName) {
  const result = db[collectionName].aggregate([
    { $group: { _id: "$gender", count: { $sum: 1 } } }
  ]).toArray();

  const males = result.find(r => r._id === "Male")?.count || 0;
  const females = result.find(r => r._id === "Female")?.count || 0;

  print(`${collectionName} - Male:Female = ${males}:${females}`);
}

["information", "classA", "classB", "classC", "classD", "classE"].forEach(calculateRatio);

// prime number:
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function deletePrimeIds(collectionName) {
  db[collectionName].find().forEach(function(doc) {
    if (isPrime(doc._id.valueOf())) {
      db[collectionName].deleteOne({ _id: doc._id });
    }
  });
}

["information", "classA", "classB", "classC", "classD", "classE"].forEach(deletePrimeIds);

// update

function updateGovEmails(collectionName) {
  db[collectionName].updateMany(
    { email: { $regex: /\.gov$/ } },
    { $set: { organization: "QAU" } }
  );
}

["information", "classA", "classB", "classC", "classD", "classE"].forEach(updateGovEmails);
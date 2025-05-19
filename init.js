// Import MongoDB client
import { MongoClient } from "mongodb";

// Connection URI
const uri = "mongodb://admin:admin@localhost:27017";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Switch to "db" database
    const db = client.db("db");

    // Your database operations go here
    await db.command({ ping: 1 });
    console.log("Connected successfully to MongoDB");

    // Create user
    // Check if the user already exists
    // const existingUsers = await db.command({ usersInfo: "db" });

    // if (existingUsers.users.length === 0) {
    //   // Create the user if it doesn't exist
    //   await db.command({
    //     createUser: "db",
    //     pwd: "db",
    //     roles: [{ role: "readWrite", db: "db" }],
    //   });
    //   console.log("User created successfully");
    // } else {
    //   console.log('User "db" already exists');
    // }

    // Drop existing collections to ensure a clean state
    const collections = [
      "Kurs",
      "Teilnehmer",
      "Angebot",
      "Kursleiter",
      "Vorauss",
      "Nimmt_teil",
      "Fuehrt_durch",
      "Gebuehren",
      "KursLit",
    ];

    await Promise.all(
      collections.map((name) => db
          .collection(name)
          .drop()
          .catch(() => {})
      )
    );

    // Insert data into collections
    await db.collection("Kurs").insertMany([
      { KursNr: "G08", Titel: "Grundlagen I" },
      { KursNr: "G10", Titel: "Grundlagen II" },
      { KursNr: "P13", Titel: "C-Programmierung" },
      { KursNr: "I09", Titel: "Datenbanken" },
    ]);

    // Teilnehmer
    await db.collection("Teilnehmer").insertMany([
      { TnNr: 143, Name: "Schmidt, M.", Ort: "Wedel" },
      { TnNr: 145, Name: "Huber, Chr.", Ort: "Augsburg" },
      { TnNr: 146, Name: "Abele, I.", Ort: "Ulm" },
      { TnNr: 149, Name: "Kircher, B.", Ort: "Augsburg" },
      { TnNr: 155, Name: "Meier, W.", Ort: "Muenchen" },
      { TnNr: 171, Name: "Moeller, H.", Ort: "Neusaess" },
      { TnNr: 173, Name: "Schulze, B.", Ort: "Krumbach" },
      { TnNr: 177, Name: "Mons, F.", Ort: "Donauwoerth" },
      { TnNr: 185, Name: "Meier, K.", Ort: "Landsberg" },
      { TnNr: 187, Name: "Karstens, L.", Ort: "Augsburg" },
      { TnNr: 194, Name: "Gerstner, M.", Ort: "Mindelheim" },
    ]);

    // Angebot
    await db.collection("Angebot").insertMany([
      { AngNr: 1, KursNr: "G08", Datum: new Date("2023-10-13"), Ort: "Wedel" },
      { AngNr: 2, KursNr: "G08", Datum: new Date("2023-11-24"), Ort: "Ulm" },
      {
        AngNr: 1,
        KursNr: "G10",
        Datum: new Date("2023-12-01"),
        Ort: "Augsburg",
      },
      {
        AngNr: 2,
        KursNr: "G10",
        Datum: new Date("2023-02-15"),
        Ort: "Muenchen",
      },
      {
        AngNr: 1,
        KursNr: "P13",
        Datum: new Date("2023-05-28"),
        Ort: "Augsburg",
      },
      {
        AngNr: 2,
        KursNr: "P13",
        Datum: new Date("2023-07-01"),
        Ort: "Augsburg",
      },
      {
        AngNr: 1,
        KursNr: "I09",
        Datum: new Date("2023-03-27"),
        Ort: "Mindelheim",
      },
      {
        AngNr: 2,
        KursNr: "I09",
        Datum: new Date("2023-04-23"),
        Ort: "Muenchen",
      },
      { AngNr: 3, KursNr: "I09", Datum: new Date("2023-05-29"), Ort: "Ulm" },
    ]);

    // Kursleiter
    await db.collection("Kursleiter").insertMany([
      { PersNr: 27183, Name: "Meier, I.", Gehalt: 4300.5 },
      { PersNr: 29594, Name: "Schulze, H.", Gehalt: 3890.2 },
      { PersNr: 38197, Name: "Huber, L.", Gehalt: 4200.1 },
      { PersNr: 43325, Name: "Mueller, K.", Gehalt: 3400.8 },
    ]);

    // Vorauss
    await db.collection("Vorauss").insertMany([
      { VorNr: "G08", KursNr: "P13" },
      { VorNr: "G10", KursNr: "P13" },
      { VorNr: "G08", KursNr: "I09" },
      { VorNr: "G10", KursNr: "I09" },
      { VorNr: "P13", KursNr: "I09" },
    ]);

    // Nimmt_teil
    await db.collection("Nimmt_teil").insertMany([
      { AngNr: 2, KursNr: "G08", TnNr: 143 },
      { AngNr: 2, KursNr: "P13", TnNr: 143 },
      { AngNr: 1, KursNr: "G08", TnNr: 145 },
      { AngNr: 1, KursNr: "P13", TnNr: 146 },
      { AngNr: 1, KursNr: "I09", TnNr: 146 },
      { AngNr: 2, KursNr: "P13", TnNr: 149 },
      { AngNr: 1, KursNr: "I09", TnNr: 155 },
      { AngNr: 1, KursNr: "I09", TnNr: 171 },
      { AngNr: 1, KursNr: "I09", TnNr: 173 },
      { AngNr: 2, KursNr: "P13", TnNr: 177 },
      { AngNr: 1, KursNr: "I09", TnNr: 185 },
      { AngNr: 2, KursNr: "I09", TnNr: 187 },
      { AngNr: 1, KursNr: "P13", TnNr: 194 },
    ]);

    // Fuehrt_durch
    await db.collection("Fuehrt_durch").insertMany([
      { AngNr: 1, KursNr: "G08", PersNr: 38197 },
      { AngNr: 2, KursNr: "G08", PersNr: 38197 },
      { AngNr: 1, KursNr: "G10", PersNr: 43325 },
      { AngNr: 2, KursNr: "G10", PersNr: 29594 },
      { AngNr: 1, KursNr: "P13", PersNr: 27183 },
      { AngNr: 2, KursNr: "P13", PersNr: 27183 },
      { AngNr: 1, KursNr: "I09", PersNr: 29594 },
      { AngNr: 2, KursNr: "I09", PersNr: 29594 },
      { AngNr: 3, KursNr: "I09", PersNr: 29594 },
    ]);

    // Gebuehren
    await db.collection("Gebuehren").insertMany([
      { AngNr: 2, KursNr: "G08", TnNr: 143, Gebuehr: 500 },
      { AngNr: 2, KursNr: "P13", TnNr: 143, Gebuehr: 400 },
      { AngNr: 1, KursNr: "G08", TnNr: 145, Gebuehr: null },
      { AngNr: 1, KursNr: "P13", TnNr: 146, Gebuehr: 300 },
      { AngNr: 1, KursNr: "I09", TnNr: 146, Gebuehr: null },
      { AngNr: 2, KursNr: "P13", TnNr: 149, Gebuehr: 350 },
      { AngNr: 1, KursNr: "I09", TnNr: 155, Gebuehr: null },
      { AngNr: 1, KursNr: "I09", TnNr: 171, Gebuehr: null },
      { AngNr: 1, KursNr: "I09", TnNr: 173, Gebuehr: 400 },
      { AngNr: 2, KursNr: "P13", TnNr: 177, Gebuehr: null },
      { AngNr: 1, KursNr: "I09", TnNr: 185, Gebuehr: 450 },
      { AngNr: 2, KursNr: "I09", TnNr: 187, Gebuehr: null },
      { AngNr: 1, KursNr: "P13", TnNr: 194, Gebuehr: null },
    ]);

    // KursLit
    await db.collection("KursLit").insertMany([
      { KursNr: "G08", Bestand: 4, Bedarf: 2, Preis: 10.5 },
      { KursNr: "I09", Bestand: 2, Bedarf: 6, Preis: 8.0 },
      { KursNr: "P13", Bestand: 3, Bedarf: 5, Preis: 15.2 },
    ]);

    console.log("Data entered");
  } finally {
    // Close the connection
    await client.close();
  }
}

run().catch(console.dir);

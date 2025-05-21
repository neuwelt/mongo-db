import { MongoClient } from "mongodb";

const uri = "mongodb://admin:admin@localhost:27017/admin";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("KursDB");

    // Create collections
    await db.createCollection("kursleiter");
    await db.createCollection("teilnehmer");
    await db.createCollection("kurse");
    await db.createCollection("angebote");

    console.log("db (KursDB) & collections created");

    // Get collections
    const kursleiterCollection = db.collection("kursleiter");
    const teilnehmerCollection = db.collection("teilnehmer");
    const kurseCollection = db.collection("kurse");
    const angeboteCollection = db.collection("angebote");

    // 1. Insert Kursleiter
    await kursleiterCollection.insertMany([
      { PersNr: 27183, Name: "Meier, I.", Gehalt: 4300.5 },
      { PersNr: 29594, Name: "Schulze, H.", Gehalt: 3890.2 },
      { PersNr: 38197, Name: "Huber, L.", Gehalt: 4200.1 },
      { PersNr: 43325, Name: "Mueller, K.", Gehalt: 3400.8 },
    ]);

    // 2. Insert Teilnehmer
    await teilnehmerCollection.insertMany([
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

    // 3. Insert Kurse
    await kurseCollection.insertMany([
      {
        KursNr: "G08",
        Titel: "Grundlagen I",
        Voraussetzungen: [],
        Kursliteratur: [{ Bestand: 4, Bedarf: 2, Preis: 10.5 }],
      },
      {
        KursNr: "G10",
        Titel: "Grundlagen II",
        Voraussetzungen: [],
        Kursliteratur: [],
      },
      {
        KursNr: "P13",
        Titel: "C-Programmierung",
        Voraussetzungen: ["G08", "G10"],
        Kursliteratur: [{ Bestand: 3, Bedarf: 5, Preis: 15.2 }],
      },
      {
        KursNr: "I09",
        Titel: "Datenbanken",
        Voraussetzungen: ["G08", "G10", "P13"],
        Kursliteratur: [{ Bestand: 2, Bedarf: 6, Preis: 8.0 }],
      },
    ]);

    // 4. Insert Angebote with Teilnehmer and Kursleiter
    await angeboteCollection.insertMany([
      {
        AngebotNr: 1,
        KursNr: "G08",
        Datum: new Date("2023-10-13"),
        Ort: "Wedel",
        KursleiterId: 38197,
        Teilnehmer: [{ TnNr: 145, Gebühr: null }],
      },
      {
        AngebotNr: 2,
        KursNr: "G08",
        Datum: new Date("2023-11-24"),
        Ort: "Ulm",
        KursleiterId: 38197,
        Teilnehmer: [{ TnNr: 143, Gebühr: 500 }],
      },
      {
        AngebotNr: 1,
        KursNr: "G10",
        Datum: new Date("2023-12-01"),
        Ort: "Augsburg",
        KursleiterId: 43325,
        Teilnehmer: [],
      },
      {
        AngebotNr: 2,
        KursNr: "G10",
        Datum: new Date("2023-02-15"),
        Ort: "Muenchen",
        KursleiterId: 29594,
        Teilnehmer: [],
      },
      {
        AngebotNr: 1,
        KursNr: "P13",
        Datum: new Date("2023-05-28"),
        Ort: "Augsburg",
        KursleiterId: 27183,
        Teilnehmer: [
          { TnNr: 146, Gebühr: 300 },
          { TnNr: 194, Gebühr: null },
        ],
      },
      {
        AngebotNr: 2,
        KursNr: "P13",
        Datum: new Date("2023-07-01"),
        Ort: "Augsburg",
        KursleiterId: 27183,
        Teilnehmer: [
          { TnNr: 143, Gebühr: 400 },
          { TnNr: 149, Gebühr: 350 },
          { TnNr: 177, Gebühr: null },
        ],
      },
      {
        AngebotNr: 1,
        KursNr: "I09",
        Datum: new Date("2023-03-27"),
        Ort: "Mindelheim",
        KursleiterId: 29594,
        Teilnehmer: [
          { TnNr: 146, Gebühr: null },
          { TnNr: 155, Gebühr: null },
          { TnNr: 171, Gebühr: null },
          { TnNr: 173, Gebühr: 400 },
          { TnNr: 185, Gebühr: 450 },
        ],
      },
      {
        AngebotNr: 2,
        KursNr: "I09",
        Datum: new Date("2023-04-23"),
        Ort: "Muenchen",
        KursleiterId: 29594,
        Teilnehmer: [{ TnNr: 187, Gebühr: null }],
      },
      {
        AngebotNr: 3,
        KursNr: "I09",
        Datum: new Date("2023-05-29"),
        Ort: "Ulm",
        KursleiterId: 29594,
        Teilnehmer: [],
      },
    ]);

    console.log("Data inserted into collections");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

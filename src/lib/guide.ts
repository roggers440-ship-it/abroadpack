export type GuideItem = { id: string; text: string; note?: string };
export type GuideGroup = { title: string; note?: string; items: GuideItem[] };
export type GuideSection = {
  id: string;
  title: string;
  subtitle: string;
  intro?: string;
  groups: GuideGroup[];
  warning?: { title: string; items: string[]; footer?: string };
};

export const SECTIONS: GuideSection[] = [
  {
    id: "documents",
    title: "Documents",
    subtitle: "Get this wrong and nothing else matters",
    intro:
      "All of this goes in your cabin bag, never checked luggage. Keep a second set of photocopies in your suitcase and a scanned copy in your email.",
    groups: [
      {
        title: "Carry in hand",
        items: [
          { id: "doc-passport", text: "Passport with visa", note: "Check the expiry date covers your whole course" },
          { id: "doc-offer", text: "University offer letter / admission letter" },
          { id: "doc-visa", text: "Visa approval papers and appointment letter" },
          { id: "doc-insurance", text: "Health insurance papers" },
          { id: "doc-blocked", text: "Blocked account confirmation", note: "Germany — immigration may ask at the border" },
          { id: "doc-accom", text: "Accommodation proof or hostel booking" },
          { id: "doc-flight", text: "Return or onward ticket if your visa requires it" },
        ],
      },
      {
        title: "Academic papers — originals",
        note: "Universities abroad often ask for originals at enrolment. Don't leave them in Nepal.",
        items: [
          { id: "doc-slc", text: "SEE / SLC certificate and marksheet" },
          { id: "doc-plus2", text: "+2 certificate, transcript and migration certificate" },
          { id: "doc-bachelor", text: "Bachelor's degree, transcript and character certificate" },
          { id: "doc-provisional", text: "Provisional certificate if your degree isn't issued yet" },
          { id: "doc-ielts", text: "IELTS / TOEFL / language certificate" },
          { id: "doc-attested", text: "Attested and translated copies where your university asked for them" },
        ],
      },
      {
        title: "Personal documents",
        items: [
          { id: "doc-birth", text: "Birth certificate with English translation" },
          { id: "doc-citizen", text: "Citizenship certificate + photocopies" },
          { id: "doc-police", text: "Police clearance certificate if required" },
          { id: "doc-bank", text: "Bank statements and sponsor documents" },
          { id: "doc-photos", text: "10–15 passport photos", note: "Cheap here, expensive there, and you'll need them for registration" },
          { id: "doc-vaccine", text: "Vaccination card and medical records" },
          { id: "doc-driving", text: "Driving licence + international permit if you have one" },
        ],
      },
      {
        title: "Digital backup",
        items: [
          { id: "doc-scan", text: "Scan everything and email it to yourself" },
          { id: "doc-cloud", text: "Same files in Google Drive, accessible without your phone" },
          { id: "doc-folder", text: "One document folder or envelope so nothing is loose" },
        ],
      },
    ],
  },

  {
    id: "food",
    title: "Food and spices",
    subtitle: "What's worth the weight, what gets seized",
    intro:
      "Buy this yourself from Bhatbhateni or your local shop — it's cheaper and you know the brands. Keep everything sealed and labelled, and declare food if you're asked at customs.",
    warning: {
      title: "Banned entering the EU — these will be seized",
      items: [
        "Meat of any kind — sukuti, dried meat, meat pickle",
        "Dairy — chhurpi, ghee, milk powder, paneer",
        "Masala mixes containing milk powder — check the label",
        "Fresh fruit, vegetables, seeds and plants",
        "Honey",
      ],
      footer:
        "This is Germany and the whole EU. Australia is even stricter and fines you for not declaring. Check your destination's rules before you pack any food.",
    },
    groups: [
      {
        title: "Spices — the ones actually worth carrying",
        note: "Roughly 2–3 kg total is enough for months.",
        items: [
          { id: "food-turmeric", text: "Turmeric, cumin, coriander, chilli powder" },
          { id: "food-garam", text: "Garam masala, meat masala", note: "Check no milk powder in the ingredients" },
          { id: "food-timur", text: "Timur, jimbu, tejpat", note: "Genuinely hard to find abroad" },
          { id: "food-whole", text: "Whole cumin, mustard seed, fenugreek" },
          { id: "food-tea", text: "Tea — Ilam or your usual brand" },
        ],
      },
      {
        title: "Dry goods",
        items: [
          { id: "food-dal", text: "Dal — masoor, mung, rahar", note: "2–3 kg; heavy, so don't overdo it" },
          { id: "food-gundruk", text: "Gundruk and dried vegetables", note: "Allowed — it's dried plant matter, not fresh" },
          { id: "food-noodles", text: "Wai Wai / Rara", note: "Bulky for the weight — take a few packets, not a carton" },
          { id: "food-pickle", text: "Sealed jar pickle", note: "Under 100ml rules don't apply in checked luggage" },
        ],
      },
      {
        title: "Not worth carrying",
        note: "Available abroad, or too heavy for what you get.",
        items: [
          { id: "food-rice", text: "Rice — every Asian shop abroad has it" },
          { id: "food-oil", text: "Cooking oil — heavy and it leaks" },
          { id: "food-salt", text: "Salt and sugar" },
          { id: "food-atta", text: "Flour — bulky, and easy to buy there" },
        ],
      },
    ],
  },

  {
    id: "winter",
    title: "Winter clothing",
    subtitle: "What actually works at -10°C",
    intro:
      "Kathmandu winter is not European winter. The mistake most students make is buying one very thick jacket and nothing underneath — layers matter more than thickness.",
    groups: [
      {
        title: "The layers that matter",
        items: [
          { id: "win-thermal", text: "Thermal top and bottom — 2 sets", note: "The single most useful thing you'll pack" },
          { id: "win-fleece", text: "Fleece or wool mid-layer — 2" },
          { id: "win-jacket", text: "One proper winter jacket", note: "Waterproof outer matters more than thickness" },
          { id: "win-socks", text: "Thermal socks — 3–4 pairs" },
          { id: "win-gloves", text: "Gloves — touchscreen ones save real frustration" },
          { id: "win-beanie", text: "Woollen topi and muffler" },
        ],
      },
      {
        title: "Footwear",
        items: [
          { id: "win-boots", text: "Waterproof boots with anti-slip sole", note: "Icy pavement is the real risk, not cold" },
          { id: "win-sneakers", text: "One pair of everyday walking shoes", note: "You'll walk far more than you do here" },
          { id: "win-slippers", text: "Bathroom slippers", note: "Shared bathrooms make these essential" },
        ],
      },
      {
        title: "What students overbuy",
        note: "Every year someone lands with 15 t-shirts and no thermals.",
        items: [
          { id: "win-over1", text: "Too many t-shirts and casual clothes — 5–6 is plenty" },
          { id: "win-over2", text: "Formal wear you'll wear twice a year" },
          { id: "win-over3", text: "Heavy woollen sweaters — bulky, and fleece does more" },
        ],
      },
    ],
  },

    {
    id: "money",
    title: "Money",
    subtitle: "Cash, cards, and the blocked account",
    intro:
      "Two things go wrong here: students carry cash they can't declare, and they land with no way to pay for anything on day one.",
    warning: {
      title: "Declare cash over the limit",
      items: [
        "EU: €10,000 or equivalent must be declared at customs",
        "Nepal: check NRB rules for how much foreign currency you may carry out",
        "Undeclared cash can be seized, even when it's legitimately yours",
      ],
      footer:
        "Nobody carries this much anyway. Mentioned because the fine for not declaring is worse than the paperwork.",
    },
    groups: [
      {
        title: "Before you fly",
        items: [
          { id: "mon-blocked", text: "Blocked account funded and confirmation letter printed", note: "Germany — required for the visa and often checked at the border" },
          { id: "mon-cash", text: "€300–500 cash in hand", note: "For the first week: transport, SIM, groceries, deposit" },
          { id: "mon-small", text: "Ask for small notes", note: "Nobody wants to break a €200 note for a bus ticket" },
          { id: "mon-card", text: "Check your Nepali card works abroad", note: "Most don't — don't assume" },
          { id: "mon-inform", text: "Tell your bank you're travelling" },
        ],
      },
      {
        title: "First week there",
        items: [
          { id: "mon-bank", text: "Open a local bank account", note: "Germany: N26 or Deutsche Bank are common for students" },
          { id: "mon-iban", text: "Get your IBAN — rent and insurance need it" },
          { id: "mon-transfer", text: "Set up a transfer service for money from home", note: "Wise or Remitly usually beat bank rates" },
        ],
      },
      {
        title: "Budget reality",
        note: "Rough monthly figures for a student in a mid-size German city.",
        items: [
          { id: "mon-rent", text: "Rent: €300–500 for a shared flat or hostel" },
          { id: "mon-food", text: "Groceries: €150–200 if you cook" },
          { id: "mon-insurance", text: "Health insurance: €110–130, not optional" },
          { id: "mon-transport", text: "Transport: often covered by your semester fee" },
        ],
      },
    ],
  },

  {
    id: "airport",
    title: "Airport day",
    subtitle: "Cabin vs checked, and what not to get caught with",
    intro:
      "Weigh everything at home the night before. Excess baggage at the counter costs more than the item is worth.",
    groups: [
      {
        title: "Cabin bag — must go here",
        note: "If your checked luggage is delayed, this is everything you have for two days.",
        items: [
          { id: "air-docs", text: "All documents and photocopies" },
          { id: "air-power", text: "Power bank", note: "Banned in checked luggage — it will be removed" },
          { id: "air-laptop", text: "Laptop, charger, phone" },
          { id: "air-meds", text: "Medicines in original packaging with prescription copy" },
          { id: "air-clothes", text: "One change of clothes and basic toiletries" },
          { id: "air-cash", text: "Cash and cards" },
          { id: "air-pen", text: "A pen", note: "For the immigration forms — sounds trivial, isn't" },
        ],
      },
      {
        title: "Checked luggage only",
        items: [
          { id: "air-liquid", text: "Any liquid over 100ml" },
          { id: "air-sharp", text: "Nail cutter, scissors, knife, razor blades" },
          { id: "air-spice", text: "Spices and food, sealed and labelled" },
          { id: "air-lighter", text: "Lighters and matches — check your airline's rule" },
        ],
      },
      {
        title: "The night before",
        items: [
          { id: "air-weigh", text: "Weigh each bag", note: "An empty hard-shell suitcase is already 4–5 kg" },
          { id: "air-lock", text: "Lock the bags, keep the keys in your pocket" },
          { id: "air-tag", text: "Name and phone number on a tag inside and outside each bag" },
          { id: "air-photo", text: "Photograph your packed bags", note: "Useful if anything goes missing" },
          { id: "air-checkin", text: "Web check-in and seat selection" },
          { id: "air-arrive", text: "Reach TIA 4 hours before an international flight" },
        ],
      },
    ],
  },

  {
    id: "firstweek",
    title: "Your first week",
    subtitle: "Germany — in the order things must happen",
    intro:
      "This order matters. You can't open a bank account without an address registration, and you can't enrol without insurance. Doing it out of sequence wastes weeks.",
    groups: [
      {
        title: "Week one, in order",
        items: [
          { id: "fw-sim", text: "1. Get a SIM card at the airport or a phone shop", note: "You need a number for every appointment below" },
          { id: "fw-anmeldung", text: "2. Anmeldung — register your address at the Bürgeramt", note: "Book the appointment before you fly, slots fill up weeks ahead" },
          { id: "fw-bank", text: "3. Open a bank account", note: "Needs the Anmeldung confirmation" },
          { id: "fw-insurance", text: "4. Activate public health insurance (TK, AOK, Barmer)", note: "Needs your bank details" },
          { id: "fw-enrol", text: "5. Enrol at the university", note: "Needs insurance confirmation" },
          { id: "fw-permit", text: "6. Apply for the residence permit at the Ausländerbehörde", note: "Start this early — it takes weeks" },
        ],
      },
      {
        title: "Practical things nobody tells you",
        items: [
          { id: "fw-sunday", text: "Shops close on Sunday", note: "Buy groceries on Saturday or go hungry" },
          { id: "fw-cash", text: "Many small places are cash only" },
          { id: "fw-pfand", text: "Bottle deposit (Pfand) — return bottles to get money back" },
          { id: "fw-trash", text: "Rubbish separation is taken seriously and neighbours will tell you" },
          { id: "fw-quiet", text: "Quiet hours after 10pm and all day Sunday" },
          { id: "fw-ticket", text: "Always validate your transport ticket — fines are steep" },
        ],
      },
      {
        title: "Other destinations",
        note: "The sequence above is Germany-specific. Elsewhere, the shape is similar but the names differ.",
        items: [
          { id: "fw-au", text: "Australia: TFN, Medicare or OSHC, bank account, CoE enrolment" },
          { id: "fw-us", text: "USA: SSN, university check-in, SEVIS, campus health insurance" },
          { id: "fw-generic", text: "Check your university's international office page — most publish a first-week checklist" },
        ],
      },
    ],
  },

  {
    id: "toiletries",
    title: "Toiletries and daily use",
    subtitle: "Take a month, then buy locally",
    intro:
      "It's not worth filling a suitcase with shampoo. Take enough for the first few weeks and buy the rest there.",
    groups: [
      {
        title: "Worth carrying",
        items: [
          { id: "toi-basics", text: "Toothbrush, toothpaste, soap, shampoo — travel sizes" },
          { id: "toi-nail", text: "Nail cutter, comb, shaving kit, small mirror" },
          { id: "toi-sew", text: "Sewing kit and safety pins", note: "Small, and you will need it" },
          { id: "toi-oil", text: "Hair oil if you use it", note: "Genuinely hard to find abroad" },
          { id: "toi-towel", text: "Quick-dry towel — 2" },
        ],
      },
      {
        title: "Medicines",
        note: "Carry in original packaging with a prescription copy. Getting a doctor's appointment abroad takes weeks.",
        items: [
          { id: "toi-pain", text: "Paracetamol / Cetamol, cold and flu tablets" },
          { id: "toi-stomach", text: "Jeevan Jal, Digene, diarrhoea medicine" },
          { id: "toi-wound", text: "Betadine, bandages, antiseptic cream" },
          { id: "toi-personal", text: "Three months of any regular prescription medicine", note: "Plus the prescription itself" },
          { id: "toi-glasses", text: "Spare glasses or contact lenses and your prescription" },
        ],
      },
    ],
  },

  {
    id: "dontbring",
    title: "What not to bring",
    subtitle: "Weight you'll regret",
    groups: [
      {
        title: "Leave it",
        items: [
          { id: "dnb-books", text: "Books — heavy, and libraries exist" },
          { id: "dnb-bedding", text: "Bedsheets and pillows if accommodation provides them", note: "Check first — some hostels give nothing" },
          { id: "dnb-appliance", text: "Rice cooker or kettle", note: "Wrong voltage and plug; buy there" },
          { id: "dnb-clothes", text: "Half the clothes you packed", note: "Seriously — lay it out and remove a third" },
          { id: "dnb-gifts", text: "Bulky decorative gifts" },
          { id: "dnb-tv", text: "Anything electrical rated for 220V Nepali sockets other than a laptop and phone" },
        ],
      },
      {
        title: "Check before packing",
        items: [
          { id: "dnb-cooker", text: "Pressure cooker — some student housing bans them" },
          { id: "dnb-khukuri", text: "Khukuri or any blade — checked luggage only, and some countries restrict it" },
          { id: "dnb-drone", text: "Drone — restricted or requires registration in many countries" },
        ],
      },
    ],
  },
];
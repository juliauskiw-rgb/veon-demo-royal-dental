// Every fact on the page comes from veon/client.json (ids in comments) or, for reviews, FAQ and photo captions,
// from the client's own site royaldental.com.ua (texts kept as published). Nothing here is invented.
import images from "./images.json";

export type ImageSet = { file: string; width: number; height: number }[];
export const img = images as Record<string, ImageSet>;

export const NOTE_FUTURE = "Розділ у розробці";

// company.contacts
export const contacts = {
  phoneMain: { href: "tel:+380963136788", label: "(096) 313 67 88" },
  phoneSecond: { href: "tel:+380632522113", label: "(063) 252 21 13" },
  email: "RoyalDentalCentr@gmail.com",
  city: "м. Львів",
  street: "вул. Героїв Крут, 11б",
  mapHref: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Львів, вулиця Героїв Крут, 11б"),
  license: "Ліцензія МОЗ №09/0706-М від 07.06.2017", // W-F001
};

// socials[0] confirmed, socials[2] confirmed. Facebook (probable) and @royaldentalcentr (not found) are not used.
export const socials = {
  instagram: { href: "https://www.instagram.com/royaldentaldigitalclinic/", label: "Instagram", handle: "@royaldentaldigitalclinic" },
  youtube: { href: "https://www.youtube.com/channel/UC6B12t42zicZYRMKRfHBJ5A", label: "YouTube" },
};

// ux/demo-home.md §6: six anchors
export const nav = [
  { href: "#directions", label: "Послуги" },
  { href: "#works", label: "Роботи" },
  { href: "#method", label: "Як ми лікуємо" },
  { href: "#prices", label: "Ціни" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#contacts", label: "Контакти" },
];

export type Service = { name: string; price?: string };
export type Direction = {
  id: string;
  title: string;
  text: string;
  services: Service[];
  photo?: { set: string; alt: string };
  future: string;
};

// company.business_lines[0..4] + company.products_services; prices with the currency of the client's price list
export const directions: Direction[] = [
  {
    id: "aesthetic",
    title: "Естетична стоматологія",
    text: "Вініри, коронки, художня реставрація, відбілювання і професійна гігієна.",
    services: [
      { name: "Вініри", price: "від 450 €" },
      { name: "Цифрова безметалева коронка", price: "від 200 €" },
      { name: "Відбілювання Beyond Polus з гігієною, 2 щелепи", price: "8000 грн" },
      { name: "Професійна гігієна ротової порожнини", price: "2000 грн" },
    ],
    photo: { set: "dir-aesthetic", alt: "Посмішка пацієнтки з керамічними реставраціями клініки Royal Dental" },
    future: "Сторінки вінірів, коронок і відбілювання",
  },
  {
    id: "ortho",
    title: "Ортодонтія",
    text: "Брекети, елайнери і корекція прикусу.",
    services: [
      { name: "Фіксація брекет-системи, 1 щелепа", price: "від 500 €" },
      { name: "Консультація лікаря-ортодонта", price: "800 грн" },
    ],
    photo: { set: "dir-ortho", alt: "Брекет-система на зубах пацієнта" },
    future: "Сторінки брекетів і елайнерів",
  },
  {
    id: "surgery",
    title: "Хірургія та імплантація",
    text: "Імплантація, протезування і видалення зубів.",
    services: [
      { name: "Імплантація зубів", price: "від 450 €" },
      { name: "Видалення зуба", price: "3000 грн" },
      { name: "Атипове видалення", price: "5000 грн" },
    ],
    photo: { set: "dir-surgery", alt: "Моделі щелеп, коронки і протези на столі зубного техніка" },
    future: "Сторінка хірургії та імплантації",
  },
  {
    id: "treatment",
    title: "Лікування під мікроскопом",
    text: "Лікування зубів, зокрема кореневих каналів під мікроскопом.",
    services: [{ name: "Лікування кореневих каналів під мікроскопом", price: "від 5000 грн" }],
    photo: { set: "dir-treatment", alt: "Лікар клініки лікує зуби пацієнтки у кабінеті" },
    future: "Сторінка лікування зубів",
  },
  {
    id: "kids",
    title: "Дитяча стоматологія",
    text: "Дбайливе ставлення до маленьких пацієнтів: комфортні та безстрашні візити до стоматолога.",
    services: [{ name: "Вартість лікування дитини назве адміністратор за телефоном" }],
    future: "Сторінка дитячої стоматології",
  },
];

// Captions, two lines: service and volume / colour, detail or patient origin, only where the client's site gives them.
// Source: titles of the client's case pages and the veneer page (royaldental.com.ua/nashi-roboty/, /estetic/)
export const works = [
  { set: "work-bleach", title: "12 керамічних реставрацій", note: "Колір Bleach, пацієнтка з Німеччини" },
  { set: "work-veneers10", title: "10 керамічних вінірів", note: "З індивідуалізацією" },
  { set: "work-occlusion", title: "Відновлення естетики і оклюзії", note: "" },
  { set: "work-implant", title: "Імплантація", note: "Лікування суглобів" },
  { set: "work-rehab", title: "Реабілітація керамічними реставраціями", note: "" },
  { set: "work-complex", title: "Комплексне лікування", note: "" },
];

// W-F007, W-F010, products_services[0]; texts follow the client's own wording on the home page
export const steps = [
  {
    title: "Консультація і фотопротокол",
    text: "Огляд зубів і ясен, фото початкової ситуації та кожного етапу.",
  },
  {
    title: "Цифрове моделювання",
    text: "Digital Smile Design показує результат ще до початку лікування.",
  },
  {
    title: "План і вартість",
    text: "Детальний план і кошторис. Остаточна вартість — після консультації.",
  },
  {
    title: "Лікування",
    text: "Під мікроскопом, з кофердамом, інструменти після багаторівневої стерилізації.",
  },
];

// company.products_services, split by the currency of the price list (W-F010). «Карієс — від 1800» has no currency: not shown.
export const pricesUah: Service[] = [
  { name: "Консультація стоматолога і фотопротокол", price: "від 500 грн" },
  { name: "Онлайн-консультація лікаря", price: "безкоштовно" },
  { name: "Консультація лікаря-ортодонта", price: "800 грн" },
  { name: "Професійна гігієна ротової порожнини", price: "2000 грн" },
  { name: "Відбілювання Beyond Polus з гігієною, 2 щелепи", price: "8000 грн" },
  { name: "Лікування кореневих каналів під мікроскопом", price: "від 5000 грн" },
  { name: "Видалення зуба", price: "3000 грн" },
  { name: "Атипове видалення зуба", price: "5000 грн" },
];
export const pricesEur: Service[] = [
  { name: "Цифрова безметалева коронка", price: "від 200 €" },
  { name: "Вініри", price: "від 450 €" },
  { name: "Імплантація зубів", price: "від 450 €" },
  { name: "Фіксація брекет-системи, 1 щелепа", price: "від 500 €" },
];

// Reviews as published on royaldental.com.ua (home page and /vidguky/), W-F009. Only spacing and obvious keyboard typos fixed;
// a long review shows its opening sentences first, the rest opens on request (order kept, except Гальків Маряна: lead is her 2nd sentence).
export type Review = { city: string; name: string; lang?: string; lead: string; rest?: string[] };
export const reviews: Review[] = [
  {
    city: "Лондон",
    name: "Лілія Данилків",
    lead: "Royal Dental, велике спасибі Вам, за професійний підхід, відданість своїй справі та високу якість роботи, приходити до Вас на прийом, це одне задоволення, завжди привітні, дружні та усміхнені.",
    rest: [
      "Результат бездоганний. Я задоволена голлівудською посмішкою на всі 32!!! Результат перевершив мої сподівання… красива посмішка та ще й за такий короткий час, спасибі.",
      "Сучасне обладнання на вищому рівні, яке абсолютно не поступається закордонним клінікам. Ви професіонали своєї справи! Залюбки буду Вас рекомендувати, та чекаю зустрічі з Вами! Бажаю Вам хороших, та вдячних пацієнтів!!!",
    ],
  },
  {
    city: "Мюнхен",
    name: "Zeidler Irina",
    lang: "en",
    lead: "I’m being very grateful for an amazing job that has been done in a very short period of time. …",
    rest: [
      "Finally I have a smile I dreamt of for a long time! … The work has been done according to high european standards. The whole time i had a feeling of being in good hands and having made a right decision with dental clinic. So based on personal experience can only recommend Royal Dental, I have no regrets at all.",
    ],
  },
  {
    city: "Royal Tunbridge Wells",
    name: "Viktoriya Matthews",
    lang: "en",
    lead: "Wanted to say a huge thank you to the Royal Dental for the beautiful work they did for me. Can’t believe how much was done just in one week!",
    rest: [
      "So glad a friend has introduced me to this team of dedicated, talented professionals. These guys are really passionate about what they do.",
      "And it’s not just the attitude. The equipment in the clinic is simply unbelievable! State of the art! Much better than what I have seen here in the UK.",
      "If anyone want to see my beautiful city Lviv and do something useful at the same time, I can’t recommend these guys strong enough!",
    ],
  },
  {
    city: "Рим",
    name: "Куч Юлія",
    lead: "Довго не могла наважитись зробити вініри, хоча з дитинства комплексувала за проблемної посмішки. Здавалось, що це надто кардинальний крок.",
    rest: [
      "Неодноразово зверталась до ортодонтів із своєю проблемою, однак ті відмовлялись від лікування, аргументуючи це тим, що брекети мою ситуацію не виправлять.",
      "Після першої консультації в клініці Royal Dental всі сумніви відпали. Професіонали клініки детально роз’яснили мені усі аспекти роботи, допомогли підібрати колір.",
      "Хочу написати, що дана клініка була не першою до якої я зверталась із вказаним питанням, однак лише тут я отримала відповіді на всі питання.",
      "До того я думала, що вініри зроблять мою посмішку сяючою, а зуби рівні, та не враховувала всю складність роботи, таку як форму зубів (яка б личила саме до мого обличчя) і колір.",
      "Робота була зроблена швидко, жодних незручностей не відчула. І якщо чесно можу сказати, що саме тут я відчула, що для команди Royal Dental важливо, щоб пацієнт був задоволений роботою. Більше того, лікарі ще довгий час цікавились як я себе почуваю після змін. І найголовнішим для мене є те, що кожен помічає мою посмішку і робить мені компліменти, однак ніхто не помітив, що ця посмішка не подарована мені природою.",
      "Рекомендую таку роботу довіряти лише професіоналам клініки Royal Dental.",
    ],
  },
  {
    city: "Тернопіль",
    name: "Федорюк Аліна",
    lead: "Тільки приємні враження від роботи команди Royal Dental. Дуже хороше відношення, сучасне обладнання, висока якість роботи!!",
    rest: [
      "Щиро дякую за чудову нову посмішку!) Задоволена якісною та вчасною роботою і в подальшому буду звертатися тільки до вас.",
      "Рекомендую всім! З стоматологією Royal Dental дійсно отримаєте високопрофесійну роботу, чуйне відношення та хороший настрій!",
    ],
  },
  {
    city: "Львів",
    name: "Гальків Маряна",
    lead: "Довго не наважувалася поставити вініри через суперечливі погляди та відгуки в інтернеті та побачивши сайт цієї клініки, одразу зрозуміла, що мені туди і не помилилася.",
    rest: [
      "Довгі роки посмішки, яка прикриває усі зуби позаду завдяки команді професіоналів в стоматології Royal Dental.",
      "Не бійтеся міняти свої зубки, адже міняється не лише вигляд але і стиль життя! Дякую за щиру та білосніжну посмішку!",
    ],
  },
];

// FAQ: questions and answers from the client's home page and veneer page; «Хто мене лікуватиме?» — honest answer (R-007, W-F006)
export const faq = [
  {
    q: "Хто мене лікуватиме?",
    a: [
      "З лікуючим лікарем ви познайомитеся на першій консультації: він проведе огляд і фотопротокол, пояснить план і вартість лікування.",
      "Якщо хочете дізнатися про лікаря заздалегідь, запитайте адміністратора за телефоном (096) 313 67 88.",
    ],
  },
  {
    q: "Як подолати страх перед візитом до стоматолога?",
    a: [
      "Пацієнту важливо довіряти своєму лікарю, тоді лікування проходить легше. Ми створюємо усі умови комфорту в клініці, а стоматолог пояснює лікування до дрібниць, щоб вам було зрозуміло і зовсім не страшно.",
    ],
  },
  {
    q: "Чи можна побачити, як виглядатиме посмішка до лікування?",
    a: ["Так. За допомогою програми Digital Smile Design пацієнт може побачити свій кінцевий результат перед початком лікування."],
  },
  {
    q: "Чи правда, що вініри шкодять природному зубу?",
    a: [
      "Ні. Вінір відтворює структуру і зовнішній вигляд натурального зуба і завдяки своїй герметичності довгі роки захищає від шкідливих факторів, що руйнують емаль.",
    ],
  },
  {
    q: "Як обрати стоматологічну клініку для себе?",
    a: [
      "Оцініть чистоту та стерильність медичного закладу, познайомтеся зі своїм лікуючим лікарем, погодьте план лікування і дізнайтеся ціни на послуги наперед.",
    ],
  },
];

export const futureFooter = ["Про клініку", "Блог", "Курси", "Політика конфіденційності"];

// Ukrainian typography: keep one- and two-letter words and short prepositions with the next word (no hanging «у», «і»).
export const nb = (s: string): string => {
  const re = /(^|[\s («])(у|і|в|з|й|а|о|та|на|до|від|за|під|по|не|як|що|із|зі|ще|це|Ви|ви|й|до)\s+/giu;
  return s.replace(re, "$1$2 ").replace(re, "$1$2 ");
};

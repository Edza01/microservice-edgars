# Mikroserviss produkta meklēšanai

### Apraksts

Šis mikroserviss tiks izstrādāts, lai integrētu trešās puses API un veiktu datu transformāciju, nodrošinot rezultātu sagatavošanu atbilstoši ieejas parametriem. Serviss ir jāizstrādā, izmantojot [ExpressJs](https://expressjs.com/) framework un Node.js serveri.

### Ieejas Parametri

```json
{
  "query": "string",
  "page": 1
}
```

| Parametrs | Tips   | Min garums | Min vērtība | Obligāts |
| --------- | ------ | ---------- | ----------- | -------- |
| `query`   | string | 1          | -           | Jā       |
| `page`    | number | 1          | 1           | Jā       |

### Izejošie dati

```json
[
  {
    "title": "string",
    "description": "string",
    "final_price": "number"
  }
]
```

| Parametrs     | Tips   | Apraksts           |
| ------------- | ------ | ------------------ |
| `title`       | string | Produkta nosaukums |
| `description` | string | Produkta apraksts  |
| `final_price` | number | Produkta gala cena |

### Trešās Puses API

API URL: https://dummyjson.com/products/search?q=phone&limit=1&skip=0

- Nodrošināt, ka katrā lapā ir ne vairāk kā divi produkta ieraksti;

### Datu Transformācija

Veicot datu transformāciju, ir jāievēro šādi nosacījumi:

- Pievienot lauku `final_price`, kas tiek veidots, izmantojot vērtību no online API atbildes lauka `price`, no kura tiek noņemti `discountPercentage` procenti.

- Lauka `final_price` vērtībai ir jābūt vienmēr ar diviem cipariem aiz komata.

### Validācija

Veicot ienākošo parametru validāciju, ir nepieciešams pārbaudīt to atbilstību noteikumiem. Gadījumā, ja tiek saņemti neatbilstoši vai nepareizi dati, atgriezt kļūdu ar attiecīgu HTTP statusu (piemēram, 400 - "Bad Request").

## Kļūdu Apstrāde

Ja mikroserviss sastop kļūdu, tas nodrošina atbilstošu kļūdas ziņojumu, kura HTTP status atbilst kļudas būtibai, kā arī atbildes saturā atgriest divus informatīvus parametrus.

## Kļūdas Izejošie dati

```json
{
  "code": "number",
  "message": "string"
}
```

| Parametrs | Tips   | Apraksts                                      |
| --------- | ------ | --------------------------------------------- |
| `code`    | string | HTTP kļūdas kods                              |
| `message` | number | Kļūdas ziņojums bez detalizēta satura (stack) |

## \* PAPILDUZDEVUMS \* Logging

Ieviest logging mehānismu, izmantojot express.js middleware, kas reģistrē ienākošos un izejošos pieprasījumus konsolē, ieskaitot kļūdu gadījumus.

Logging mehānismam ir jādarbojas asinhroni, un tas nedrīkst ietekmēt servisa stabilitāti vai ātrdarbību (pieņemot, ka nākotnē log ieraksti tiku sūtīti uz API nevis izvadīti ar `console.log()`).

**Ienākošais ziņojuma log saturs:**

```json
{
  "type": "messageIn",
  "body": "string",
  "method": "string",
  "path": "url",
  "dateTime": "dateTime"
}
```

**Izejošā ziņojuma log saturs:**

```json
{
  "type": "messageOut",
  "body": "string",
  "dateTime": "dateTime",
  "fault": "string"
}
```

Kļūdas gadījumā laukam `fault` ir jāsatur detalizēta kļūdas informācija (stack) tekstuālā formātā.

## \* 1. PAPILDUZDEVUMS \* Datu ievades un izvades formāti

Papildināt servisu, lai spētu apstrādāt ienākošos datus vairākos formātos, vadoties pēc HTTP header `Content-Type` parametra.

| Derīgās parametru vērtības |
| -------------------------- |
| `application/xml`          |
| `application/json`         |
| `multipart/form-data`      |

Papildināt servisu, lai tas spētu izvadīt datus vairākos formātos, vadoties pēc HTTP header `Accept` parametra (ieskaitot kļūdu ziņojumus). Pēc noklusējuma serviss atgriež datus JSON formātā.

| Derīgās parametru vērtības |
| -------------------------- |
| `application/xml`          |
| `application/json`         |

## \* 2. PAPILDUZDEVUMS \* Automatizēto testu pievienošana

Papildināt servisu ar JEST automatizētiem testiem

- Pārbaudīt, vai serviss izpildās korekti.
- Pārvaidīt, vai serviss korekti atbild visos kļūdas gadījumos.
- Pārbaudīt, vai serviss atbild korektā datu formātā.

Testus jāspēj izpildīt ar konsoles komandu `"npm run test"`.

## \* 3. PAPILDUZDEVUMS \* ESLint statisko koda analīzes rīka pievinošana

Pievienot projektam ESLint statisko k

oda analīzes rīku un noformatēt kodu, lai tas atbilstu `airbnb-base` formatējumam.

Koda formatējumu jāspēj pārbaudīt ar konsoles komandu `"npm run lint"`.

## \* 4. PAPILDUZDEVUMS \* WEB formas vizualizācija

Izstrādāt neatkarīgu WEB aplikāciju meklēšanas formas vizualizācijai izmantojot kādu no reaktīviem JS framework - [vue](https://vuejs.org/) / [react](https://react.dev/) / [angular](https://angularjs.org/).

Aplikācijai ir jāspēj veikt kļūdas apstrādes vizualizāciju.

## Darba nodošanas kārtība

Papilduzdevumus var pilnīgi vai dalēji pildīt ne rindas kārtībā.

Projekti ir jānodod izmantojot publisku git repozitorijas [GitHub](https://github.com/) vai [GitLab](https://gitlab.com/) lietotnē. Papildino `readme.md` failu ar informāciju par:

- minimālu informāciju projekta startēšanai;
- jānorāda, kuri papilduzdevumi ir pilnīgi vai ir daļēji izpildīti;

Veicot commit, lūdzu, ievērot [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) stilu.

---

**Veiksmi uzdevuma izstrādē!**

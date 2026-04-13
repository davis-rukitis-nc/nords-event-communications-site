export interface JournalArticle {
  id: string
  date: string
  category: string
  title: string
  tags: string[]
  image: string
  excerpt: string
  content: string
}

function dedent(str: string) {
  const lines = str.replace(/\r\n/g, "\n").split("\n");

  while (lines.length && lines[0].trim() === "") lines.shift();
  while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();

  const indents = lines
    .filter((l) => l.trim().length)
    .map((l) => (l.match(/^\s*/)?.[0].length ?? 0));

  const minIndent = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(minIndent)).join("\n");
}

export const journalArticles: JournalArticle[] = [
  {
  id: "rimi-riga-marathon-top-10-running-destinations-europe",
  title:
    "Rimi Riga Marathon Targets Europe’s Top 10 Most Desirable Running Destinations Within Four Years",
  excerpt:
    "Ahead of the 2026 race weekend on May 16–17, the Rimi Riga Marathon has announced an ambitious goal: to become one of Europe’s ten most desirable running destinations by 2030, building on a unique blend of sport, culture, and the Riga city experience.",
  date: "2026-04-09",
  category: "Sports",
  tags: [
    "Rimi Riga Marathon",
    "Running",
    "Riga",
    "World Athletics",
    "Medals",
    "Latvian National Museum of Art",
  ],
  image:
    "https://rimirigamarathon.com/wp-content/uploads/2026/04/IMG_8662-1-aspect-ratio-1920-1011-1440x756.jpg",
  content: `
Ahead of the 2026 race weekend on **May 16–17**, the **Rimi Riga Marathon**—which plans to welcome a record-breaking field of **40,000+ runners from at least 110 countries**—has officially announced a bold goal: within the next four years, Riga aims to become **one of the ten most desirable running destinations in Europe**. The plan is built on a rare synergy of **sport, culture, and city atmosphere**—something difficult to replicate elsewhere.

## A city investment with an impressive return

Riga Mayor **Viesturs Kleinbergs** emphasized that the city’s co-financing—raised this year to **EUR 300,000**—is a targeted investment in the city’s international visibility and public health.

> “From the City Council’s perspective, the Rimi Riga Marathon has two decisive trump cards: social impact and economic contribution. Calculations show that in the last three years alone, the total economic impact of the marathon is estimated at **EUR 41 million**, of which **EUR 33.5 million** entered Latvia’s and Riga’s economy from foreign funds. Every euro invested by the city has returned **EUR 117** to the economy. That is a phenomenal return…”
>
> “One third of participants are young people under 18. By investing in the marathon, we invest in a healthier tomorrow.”

Thanks to the city’s support, **public transport will be free for all participants** during marathon weekend upon showing a bib number.

## Riga as a European running destination

Marathon founder and team lead **Aigars Nords** said that after the 35th anniversary year, the event is entering a new phase—focused on experience and quality points that major metropolises often can’t deliver.

> “By the marathon’s 40th anniversary in 2030, Riga must become one of the **TOP 10** most desirable running destinations in Europe. We won’t surprise the world with 50,000-crowd waves in a single race—but we *can* with a special experience.”

Nords highlighted that Riga offers **four World Athletics-level races in one weekend**, on courses where **three world records** have been set, combined with a distinctly Latvian mix of culture, art, and community—plus the region’s standout kids programme and one of the most numerous foreign runner delegations.

## Four-year medal cycle: collect your “RĪGA”

One of the most anticipated new initiatives is a unique **four-year medal cycle**, created in cooperation with the **Latvian National Museum of Art (LNMM)** and design studio **KID Design**. Over the next four years, each year’s medal will form one letter of the word **“RĪGA”**:

- **2026:** R (art by **Boriss Bērziņš**)  
- **2027:** I  
- **2028:** G  
- **2029:** A  

Director of Latvian National Museum of Art **Māra Lāce** explained the 2026 choice:

> “Boriss Bērziņš was a master of form whose art celebrates the human body in its many expressions. It fits perfectly with the spirit of mass participation sport—at the marathon, everyone runs, not only elite athletes.”

<div style="background-color: #cc2128; padding: 1rem; margin: 0 auto;">
<div style="margin: 0 auto;">
<table style="width: 100%; height: 100%;">
<tbody>
<tr>
<td style="vertical-align: middle;">
<table style="margin: 0 auto; text-align: left;">
<tbody>
<tr>
<td><img decoding="async" style="max-width: 900px; width: 100%; display: block;" src="https://rimirigamarathon.com/wp-content/uploads/2026/03/Boriss-Berzins-In-the-Waves-LNMM-scaled.jpg" alt="Boriss Bērziņš "></td>
</tr>
<tr>
<td>
<h2 style="font-weight: normal; color: #ffffff; margin: 1rem 0 0; text-align: left; line-height: 1.5; font-size: 1.25rem;">Boriss Bērziņš “In Waves” (1970-2001)</h2>
<p style="font-weight: normal; color: #ffffff; margin: 0.5rem 0 0; text-align: left; line-height: 1.5;">© Latvian National Museum of Art collection</p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</div>

The chosen artwork will appear not only on all finishers’ medals, but also on official **Nike** and special **Art Series** shirts (produced in Latvia).

## Partner highlights and new features

### Rimi: focus on youth and team power
Rimi leaders pointed to the scale of youth participation: **Kids’ Day** has a **10,000 participant limit** and is filling fast. This year also brings the largest-ever **Schools Cup** (7,000+ students from 100 schools) and the **Rimi Team Cup**, with 600+ companies expected.

### Elektrum: energy and professional support
The marathon is supported year-round with training plans (with **Jelena Prokopčuka** and **Anita Siliņa**), Sunday community runs in Mežaparks, and a major focus on delivering an **European-level finish** at 11. novembra krastmala.

### Spice: choir-powered atmosphere
“Spice Choir Alley” returns with hundreds of singers, and runners can also submit a favourite song they’d like to hear on course on **May 17**.

### Signet Bank: relay format
A new relay option will be available in both the marathon and half-marathon distances. The **21 km relay** will feature Latvian beach volleyball stars **Tīna Graudiņa** and **Anastasija Samoilova**, while the **42 km relay** will include the **Prokopčuks family**. A special mini city concert on the route is also planned as a gift from Signet Bank together with **Carnival Youth**.

## Race weekend programme

- **Saturday, May 16:** Kids’ Day races at 11. novembra krastmala, **DPD Mile** (Latvian Championship), baby crawling tracks, Toyota WESS sprint, and the “Inclusive Marathon” programme (with Mēness aptieka) for participants with special needs.  
- **Sunday, May 17:** Marathon, half-marathon, **Signet Bank relays**, 10 km and 6 km races, plus “Inclusive Marathon” activities.

<div style="background-color: #f9eacd50; padding: 16px; border-radius: 8px; margin-bottom: 50px;">
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px; border: none;" title="YouTube video player" src="https://www.youtube-nocookie.com/embed/BBisIHm_jWg?si=5yOOsYHnDlFakofC" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div>
</div>

## Registration

Registration is available for the marathon, half-marathon, Signet Bank **42 km relay**, Signet Bank **21 km relay**, 10 km, 5.7 km, and DPD Mile distances via the Rimi Riga Marathon website. Registration is also open for **Kids’ Day** and the **Inclusive Marathon** programme.

## Media contact

**Inese Ķīkule**  
inese.kikule@necom.lv
`.trim(),
},
{
  id: "pink-noise-riga-spring-session-2026-standing-ovations",
  title:
    "Pink Noise Riga Spring Session Ends with Standing Ovations and Three Sold-Out Days",
  excerpt:
    "With three completely sold-out festival days, standing ovations, and world-class virtuosity, Pink Noise Riga has concluded its spring session—confirming its place as a major fixture in Riga and the Baltic music scene.",
  date: "2026-04-13",
  category: "Music",
  tags: ["Pink Noise Riga", "Nubya Garcia", "Lush Life", "Jazz", "Wynton Marsalis"],
  image:
    "https://rimirigamarathon.com/wp-content/uploads/2026/04/LushLife_foto_RenarsKoris2-1.jpg",
  content: `
With **three completely sold-out festival days**, standing ovations, and world-class virtuosity, **Pink Noise Riga** has concluded its spring session. In its third year, the capital’s music festival once again proved it is no longer just an ambitious newcomer—it has become an integral part of Riga’s and the Baltic region’s musical life.

From the energy of emerging talents to the sparkle of jazz icons, the festival brought Riga a special “gloss” and emotional charge that left local and international audiences moved.

## London’s saxophone sensation in Riga

London saxophone sensation **Nubya Garcia** delivered a performance at **Palladium Riga** on **April 11** that confirmed her place among today’s jazz elite. The nearly two-hour set was spontaneous, vibrant, and uplifting—taking the audience to a true emotional peak. Performing music from albums *Odyssey* and *Source*, Garcia showcased exceptional interplay with her quartet—**Sam Jones**, **Lyle Barton**, and **Max Luthert**.

<div style="background-color: #f9eacd50; padding: 16px; border-radius: 8px; margin-bottom: 50px;">
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px; border: none;" title="YouTube video player" src="https://www.youtube-nocookie.com/embed/u93XMZpIQOI?si=gRmkgBOjUOMLpTGr" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div>
</div>

## Lush Life quintet: emotional reunion and a premiere

The festival’s culmination—and its most emotional moment—was the premiere of **Intars Busulis’ “Lush Life”** quintet programme. Two standout personalities reunited on stage: **Intars Busulis** and saxophonist **Gints Pabērzs**, creating a sensual and powerful dialogue between voice and tenor saxophone.

Together with **Toms Poišs**, **Rūdolfs Dankfelds**, and **Matīss Žilinskis**, the musicians masterfully “restored” jazz classics—from Coltrane and Porter to Paul—into a fresh, intimate experience.

A particularly moving moment came with Paul Simon’s **“Still Crazy After All These Years”**, featuring a Gints Pabērzs solo as a tribute to the legendary **Michael Brecker**. In the concert finale, during Ray Charles’ **“Hallelujah I Love Her So”**, the musicians were joined by **Dāvis Jurka** (director of the Latvian Radio Big Band) and festival founder **Aigars Nords**.

## New energy and standout debuts

At **M/House of Jazz**, the festival revealed another side: a showcase of young talent in the **Three Voices Session**. The late-night **Jam Session** became a unique platform where powerful Latvian musicians met members of Nubya Garcia’s quartet—creating yet another unforgettable Riga night.

<div style="background-color: #f9eacd50; padding: 16px; border-radius: 8px; margin-bottom: 50px;">
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px; border: none;" title="YouTube video player" src="https://www.youtube-nocookie.com/embed/lC-0Sta4Z7Y?si=QhREoBd7qwcHGVUM" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div>
</div>

## Looking ahead: Wynton Marsalis this autumn

Organizers remind audiences that **Pink Noise Riga** returns in autumn from **November 27–29**. The biggest event is expected on the **First Sunday of Advent**, when jazz living legend **Wynton Marsalis** arrives in Riga together with the **Jazz at Lincoln Center Orchestra**. The festival team stresses: don’t delay—most tickets are already sold out.

> “The success of the spring session shows that Riga is ready for a high-quality, emotional, and bold jazz adventure. See you in November!” says festival founder **Aigars Nords**.

## Media contacts

**Valda Petrova** (Festival Director)  
valda.petrova@necom.lv

**Dāvis Jurka** (Artistic Director)  

**Aigars Nords** (Founder)  

## About Pink Noise Riga

Pink Noise Riga was created by **Aigars Nords** and **Dāvis Jurka** with the idea of placing Riga on the European music tourism map by presenting brilliant, internationally recognized artists in jazz (including electric-jazz, soul-jazz, fusion, and mainstream), improvised music, and other non-academic genres.

In 2026, the festival replaces its summer format with **two sessions**—spring (**April 10–12**) and autumn (**November 27–29**)—and is co-financed by the **State Culture Capital Foundation** and the **Riga City Municipality**.
`.trim(),
},  
  {
    id: "riga-wine-champagne-festival-concludes-15-countries-2026",
    title:
      "With gourmets from 15 countries, the region’s largest champagne and gastronomy festival “Riga Wine & Champagne” concludes in Riga",
    excerpt:
      "The 14th edition of the Riga Wine & Champagne festival has successfully wrapped up in Riga, marking another milestone year for the event. Over five vibrant days, Riga symbolically became the European capital of Champagne, elevating wine culture and gastronomy in the region to an entirely new level. The festival brought together sparkling wine enthusiasts, gourmets, and industry professionals from around the world, while determining the finest Champagne and Latvian gastronomy pairings.",
    date: "2026-03-12",
    category: "Food & Drink",
    tags: ["Bubble Parade"],
    image: "https://rimirigamarathon.com/wp-content/uploads/2026/03/rwch-2026-1.jpg",
content: dedent(`
  The 14th edition of the Riga Wine & Champagne festival has successfully wrapped up in Riga, marking another milestone year for the event. Over five vibrant days, Riga symbolically became the European capital of Champagne, elevating wine culture and gastronomy in the region to an entirely new level. The festival brought together sparkling wine enthusiasts, gourmets, and industry professionals from around the world, while determining the finest Champagne and Latvian gastronomy pairings.

  ## An Ambitious Program

  Across five days, the program featured refined dinners, masterclasses, and public tastings that united top-tier Champagnes with outstanding gastronomy. The highlight of the festival was the region’s grandest “Bubble Parade,” held at Hanzas Perons. The festival also hosted the world-unique and the moving commemorative luncheon “Kind of Blue,” held in tribute to Ruinart legend and esteemed winemaker Frédéric Panaïotis.

  ## World-Class Winemakers and International Recognition

  This year, the festival attracted gastronomic tourists and gourmets from 15 countries – primarily from the Baltics, as well as from the Nordic countries, the United Kingdom, Germany, and the United States. Guests had a rare opportunity to experience exceptional beverage quality firsthand and meet industry legends face-to-face. 

  Among the distinguished guests and masterclass hosts were Champagne stars such as cult winemaker Pascal Agrapart, rising-generation talent Étienne Calsac, President of Champagne de Venoge Gilles de la Bassetière, and the world’s most respected Champagne critic and author Peter Liem.

  ## The Unique “Chefs + Champagne” competition and its winners

  One of the festival’s central highlights was the globally unique Champagne and gastronomy pairing symposium and competition “Chefs + Champagne.” The best chef–sommelier duos, known as “The Bubbly Dozen,” demonstrated their mastery before an international jury, showcasing the exceptional standard of Latvian gastronomy.

  - Grand Prix – Best Pairing: Wine Collectors (Chef Edmondo Vingris & Sommelier Alex Kravčuks | McDuck in the Forest & Champagne Egly-Ouriet Les Vignes de Vrigny Premier Cru)
  - Excellence Award – Top 3 Pairing: Harper Woolf (Chef Ivans Šmigarevs & Sommelier Yunus Emre Colak | Potato pavé with “Riga Gold” sprats and duck liver mi-cuit & Champagne Roses de Jeanne Côte de Val Vilaine Blanc de Noirs VV/R23)
  - Excellence Award – Top 3 Pairing: Kest (Chef Māris Jansons & Sommelier Zane Ķiģele | Hot-smoked Latvian eel & Champagne Bollinger Special Cuvée Brut)
  - Grand Prix – Best Champagne Selection: Harper Woolf (Chef Ivans Šmigarevs & Sommelier Yunus Emre Colak | Potato pavé with “Riga Gold” sprats and duck liver mi-cuit & Champagne Roses de Jeanne Côte de Val Vilaine Blanc de Noirs VV/R23)
  - Excellence Award – Top 3 Champagne Selection: Pavāru Māja Līgatnē (Chef Juris Dukaļskis & Sommelier Juris Semjonovs | Black salsify with “Soira” hard cheese & Champagne Chartogne-Taillet Cuvée Orizeaux Blanc de Noirs Extra Brut)
  - Excellence Award – Top 3 Champagne Selection: Wine Collectors (Chef Edmondo Vingris & Sommelier Alex Kravčuks | McDuck in the Forest & Champagne Egly-Ouriet Les Vignes de Vrigny Premier Cru)
  - Audience Award: Riviera (Chef Jevgēnijs Liskins & Sommelier Ritvars Blūms | Tiger prawn ravioli & Champagne Palmer & Co Rosé Solera)
  - Presentation & Story Award: Wine Collectors (Chef Edmondo Vingris & Sommelier Alex Kravčuks | McDuck in the Forest & Champagne Egly-Ouriet Les Vignes de Vrigny Premier Cru).

  ## Industry Unity and the Growth of Beverage Culture

  The festival, founded by Aigars Nords and organized by the team at Nords Event Communications, is unique in its ability to unite Latvia’s leading wine and Champagne importers. Together, Riga Wine & Champagne not only delivers a world-class event but continues to fulfill its mission of educating the public and elevating wine appreciation culture to unprecedented heights.

  ## Additional Information:

  Inese Ķīkule, +371 29666110, inese.kikule@necom.lv  
  Baiba Bože, +371 29865238, baiba.boze@necom.lv

  ## About Riga Wine & Champagne

  Since its launch in 2012 with a Champagne masterclass led by Peter Liem, the festival has undertaken the mission of shaping wine culture in Latvia and the Baltic states. The festival program includes Latvia’s most anticipated gourmet events:

  - “Top 100 Wines + Chefs,” a parade of the best wines and chefs
  - The “Wine of the Year” competition, now a trusted guide for Latvian wine lovers
  - The “Bubble Parade,” which each spring gathers Champagne and sparkling wine enthusiasts
  - The “Baltic Wine & Drinks Awards,” organized in cooperation with Liebherr, recognizing the most wine-friendly restaurants, bars, and retailers
  - The festival umbrella has also fostered the “Whisky & Friends” festival, which premiered in 2024 at the Riga Circus.

  The festival is organized by Nords Event Communications, also known for producing the “Pink Noise Riga” music festival, the Rimi Riga Marathon, the World Athletics Road Running Championships, and other large-scale projects.

  Key supporters of Riga Wine & Champagne and the Bubble Parade include Liebherr, LEXUS Riga Airport, and Akvile water.
`),
    },
    {
    id: "riga-wine-champagne-bubble-parade-2026-program",
    title:
      "Riga Wine & Champagne Festival Announces the Baltics' Most Ambitious Champagne Program",
    excerpt:
      "The annual Riga Wine & Champagne festival has unveiled the program for its 14th Bubble Parade. From February 25 to March 1, the festival will offer a world-class celebration for champagne and gastronomy enthusiasts, and Riga will once again become an international gourmet destination, bringing together Champagne’s chef de caves, Latvia’s top chefs, and champagne and sparkling wine lovers from around the globe.",
    date: "2026-02-17",
    category: "Food & Drink",
    tags: ["Bubble Parade", "Champagne", "Festival"],
    image: "https://rimirigamarathon.com/wp-content/uploads/2026/02/top100-wineschefs-2024.webp",
    content: `

  The annual "Riga Wine & Champagne" festival has unveiled the program for its 14th "Bubble Parade." From February 25 to March 1, the festival will offer a world-class celebration for champagne and gastronomy enthusiasts, and Riga will once again become an international gourmet destination, bringing together Champagne’s chef de caves, Latvia’s top chefs, and champagne and sparkling wine lovers from around the globe.
  
  The festival’s highlights include the popular "Bubble Parade," which will gather over a thousand guests at "Hanzas Perons," as well as a series of champagne-themed dinners, masterclasses, and tastings. In collaboration with Liebherr, the festival will also host the second "Chefs + Champagne" competition. This event features top Latvian chefs and an international jury to publicly determine the best pairings of champagne and gastronomy.
  
  > "When we started the 'Bubble Parade' tradition in the spring of 2013, we had no idea it would become one of the first events of its kind globally to honor champagne culture, chefs, and sommelier arts at such a high level outside of Champagne and France. Over the years, the number of international visitors from the Baltics, Europe, and the USA has grown significantly. It is symbolic, but it simply means that at the end of February, Riga becomes the 'Champagne Capital,'" comments Aigars Nords, founder of Riga Wine & Champagne.
  
  ---
  
  ## The Main Event: The Bubble Parade
  
  The festival's central event offers a unique opportunity to taste and discover favorites from a selection of nearly 200 champagnes and sparkling wines. Attendees can seek advice from top sommeliers and importers while enjoying delicacies created by Latvia’s finest chefs.
  
  In addition to tastings, the program features in-depth masterclasses led by the festival’s guest of honor—world-renowned Champagne expert Peter Liem—and founder Aigars Nords. This year’s educational opportunities feature owners and Chefs de Cave from prestigious houses and growers, including:
  
  - Gilles de la Bassetière (President of Champagne De Venoge)
  - Étienne Calsac (Champagne Calsac)
  - Mickaël Rodez (Champagne Eric Rodez)
  - Jean-Pierre Vazart (Champagne Vazart-Coquart)
  - Francis Orban (Champagne Francis Orban)
  - Pierre Gheusi (Moët & Chandon)
  - Juliena Lardy (AR Lenoble)
  
  Representatives from  Champagne Gallimard, and other historic families.
  
  ---
  
  ## Festival’s Program
  
  - **Wednesday, February 25 | "Size Matters! It's Magnum Apéro!"** Opening night at "Wine Collectors" dedicated exclusively to Magnum bottles. Led by Peter Liem, Aigars Nords, and Raimonds Tomsons.
  - **Thursday, February 26 | "The Magic of Blanc de Blancs. Spectacular, Spectacular!"** A parade of 100% Chardonnay champagnes at "Truffle Pig" bar. Features over 30 selections, ranging from mature vintages to high-energy "single vineyard" grower champagnes.
  - **Friday, February 27 | "Champagne Gala Dinner: Bring me Champagne when I’m Thirsty"** The annual Grand Dinner at "SMOR" bistro. Hosted by Kaspars Barsukovs and featuring all visiting winemakers. Guests are also invited to bring their own favorite bottles to share.
  - **Saturday, February 28 | "Chefs + Champagne 2026"** A unique symposium demonstrating the art of pairing champagne with food. A jury and the public will vote to crown the best gastronomic pairing of the year.
  - **Saturday, February 28 | "Great Bubble Parade 2026"** The Baltics' largest bubbly tasting event at "Hanzas Perons." Over 200 champagnes, masterclasses, and direct interaction with winemakers.
  - **Sunday, March 1 | "Kind of Blue: Tribute to Frédéric Panaïotis"** A closing lunch-dinner dedicated to the late Ruinart cellar master and friend of the festival, Frédéric Panaïotis. Featuring legendary Dom Ruinart magnums (from 1964 up to 2013) and 1960s jazz from the "Blue Note" label.
  
  ---
  
  ## Tickets & Information
  
  Organizers advise purchasing tickets early as demand is high.
  
  Tickets: www.rigawinechampagne.lv and fienta.com
  
  Media Contacts: Inese Ķīkule: +371 29666110, inese.kikule@necom.lv, Baiba Bože: +371 29865238, baiba.boze@necom.lv
  
  ---
  
  ## About the Festival
  
  About the Festival: Since 2012, Riga Wine & Champagne has been a leader in developing wine & champagne culture in the Baltics. Beyond the Bubble Parade, the organizers have introduced new concepts as the "Top 100 Wines + Chefs" parade, the "Wine of the Year" competition, and the "Baltic Wine & Drinks Awards." The festival is organized by SIA Nords Event Communications, the team behind the "Rimi Riga Marathon" and the "Pink Noise Riga" music festival.
  
  ---
  
  ## Major Supporters
  
  Major Supporters: LEXUS Riga Airport and Liebherr, as well as Akvile water.
  `,
  },
  {
  id: "pink-noise-riga-2026-season-wynton-marsalis-nubya-garcia",
  title:
    "Pink Noise Riga Announces First 2026 Season Highlights: Wynton Marsalis and Nubya Garcia to Perform in Riga",
  excerpt:
    "Riga’s Pink Noise Riga music festival has announced the first highlights of its 2026 season and launched ticket sales: British jazz star Nubya Garcia will perform at Palladium on 11 April, while Wynton Marsalis and the Jazz at Lincoln Center Orchestra will make their Baltic debut at Dailes Theatre on 29 November as the festival shifts to spring and autumn sessions.",
  date: "2025-12-12",
  category: "Music",
  tags: [
    "Jazz",
    "Nubya Garcia",
    "Wynton Marsalis",
    "Festivals",
  ],
  image: "https://rimirigamarathon.com/wp-content/uploads/2025/12/1RK2880.jpg",
  content: `

Riga’s city music festival **Pink Noise Riga** has announced its 2026 festival dates and the first glimpse of a star-studded programme. From today, tickets are available for two major concerts: British jazz star and saxophonist **Nubya Garcia** at *Palladium* on **11 April**, and the **Baltic debut** of legendary American musician **Wynton Marsalis** together with the world-famous **Jazz at Lincoln Center Orchestra (JLCO)** at **Dailes Theatre** on **29 November 2026**.

In 2026, the festival will replace its traditional summer format with **two off-season sessions** – in spring (**10–12 April**) and in autumn (**27–29 November**) – with the aim of attracting cultural tourism to Latvia’s capital also during the quieter months of the year.

Riga’s city music festival **Pink Noise Riga**, which in previous seasons has delighted music lovers with performances by Branford Marsalis and Kamasi Washington, has now opened ticket sales for the key concerts of the 2026 season. The spring session (10–12 April) will culminate on **11 April**, when Riga welcomes British jazz star **Nubya Garcia**. In the autumn session (27–29 November), Riga will, for the first time in Baltic history, host legendary American jazz trumpeter and composer **Wynton Marsalis** together with the world-renowned **Jazz at Lincoln Center Orchestra**.

---

## Nubya Garcia in Riga – 11 April

**Nubya Garcia** is one of the leading icons of the new generation of jazz worldwide. Her success, including **Mercury Prize** nominations, **Jazz Act of the Year** awards, and critically acclaimed albums such as *Odyssey* (2024) and *Source* (2020), is just part of the reason why she will appear in Riga with her quartet on **11 April**.

> “A simple tradition has already become part of Pink Noise: we ask artists to recommend the next music stars that Riga simply cannot miss. Branford Marsalis once ‘insisted’ we invite Kamasi Washington, and Kamasi – without a moment’s hesitation – named Nubya Garcia,” comments **Aigars Nords**, founder of Pink Noise Riga. “We are proud that both Nubya Garcia’s concert and the performances by Marsalis and his orchestra will be **Baltic premieres**, further strengthening Pink Noise Riga as one of the region’s key music events.”

Born in London, the saxophonist and composer blends elements of **jazz, classical music, dub, R&B, broken beat and more**, creating a unique, nuanced and contemporary sound rooted in an expressive groove.

Nubya Garcia has appeared at many of the world’s leading festivals and sold-out venues, including **Glastonbury**, **Newport Jazz Festival**, **Jazz à Vienne**, **Radio City Music Hall** in New York, and others.

The concert by Nubya Garcia’s quartet on **11 April**, for which tickets are already available via **fienta.com** and the festival website, will not be the only highlight of the spring session. The organisers are also planning performances by other international artists and leading Latvian musicians, including the **Latvian Radio Big Band**, on stages such as **Palladium**, **M/Darbnīca** and **Kongresu nams**. The full spring programme will be announced at the beginning of 2026.

---

## Wynton Marsalis and the Jazz at Lincoln Center Orchestra – 29 November

**Wynton Marsalis** is a legend and one of the most influential musical personalities in the world – an outstanding trumpeter, composer and ambassador of American culture, whose achievements span far beyond the boundaries of jazz and classical music. His output includes symphonies, ballet music, oratorios, musicals, jazz works, classical compositions and big band music.

In **1997**, Marsalis became the first jazz musician in history to receive the prestigious **Pulitzer Prize for Music**, awarded for his large-scale oratorio *Blood on the Fields*.

He is a **nine-time Grammy Award** winner and remains the only artist ever to win in both the jazz and classical categories in the same year, which he achieved in **1983** and **1984**.

Marsalis’s contribution to music has been recognised with numerous honours, including the **Praemium Imperiale** (2023 – one of the world’s highest art awards, presented by the Japan Art Association), the title **Chevalier of the Legion of Honor** (2009 – France’s highest distinction), his appointment as a **UN Messenger of Peace** (2001), and more than **40 honorary doctorates** from leading universities such as **Harvard, Yale and Princeton**.

### Big Band Holidays in Riga – for the first time outside the USA

The orchestra founded by Marsalis – the **Jazz at Lincoln Center Orchestra** – is widely regarded as one of the finest jazz orchestras in the world. Together with Marsalis, who also serves as its artistic director, JLCO has toured extensively across the globe, but on **29 November 2026** the famous big band will arrive in Riga – and the Baltics – for the very first time.

Their visit to Riga is made even more special by the fact that the orchestra will perform its **“Big Band Holidays”** programme – a Christmas-themed concert with arrangements written specifically for this big band. The programme features original arrangements of well-known festive melodies created by members of the orchestra, including Marsalis himself, performed in swinging big-band style and joined by outstanding guest vocalists. In previous seasons, these have included artists such as **Kurt Elling** and **Samara Joy**.

> “The Jazz at Lincoln Center Orchestra is the benchmark of jazz classics and academic excellence. I believe their performance in Riga on the first Sunday of Advent, 29 November, will not only offer a rare chance to experience world-class big band artistry live, but will also bring a unique, previously unseen festive atmosphere to the capital,” says **Dāvis Jurka**, artistic director of Pink Noise Riga and director of the Latvian Radio Big Band.

Marsalis and JLCO will perform at **Dailes Theatre** on **29 November 2026**, closing the festival’s autumn session. The remaining autumn events, which will be announced in full in spring 2026, will take place from **27 to 29 November** at Dailes Theatre and other concert venues across the city.

---

## Latvian Radio Big Band and educational programme

The organisers emphasise that both in spring and in autumn, the **Pink Noise Riga** programme will devote a prominent place to the **Latvian Radio Big Band**, which will celebrate its **60th anniversary** in 2026, as well as to a range of **educational activities**.

---

## Tickets

Tickets for Nubya Garcia’s concert on **11 April** and for **Wynton Marsalis & Jazz at Lincoln Center Orchestra** on **29 November 2026** are already available via **fienta.com** and on the festival’s official website.

Further events in the spring and autumn sessions, along with ticket information, will be announced at a later date.
`,
},
  {
    id: "rimi-riga-marathon-signet-bank-2025-2026-season",
    title: "Signet Bank Partnership Brings New Highlights to Rimi Riga Marathon",
    excerpt:
      "Thanks to a new partnership with Signet Bank, the Rimi Riga Marathon 2025–2026 season will feature a Christmas charity run in support of 'Angels over Latvia' and new relay formats over Riga’s longest distances in 2026.",
    date: "2025-12-05",
    category: "Sports",
    tags: ["Marathon", "Signet Bank", "Christmas Run", "Charity", "Relay"],
    image: "https://rimirigamarathon.com/wp-content/uploads/2025/12/1-160.webp",
    content: `

Thanks to a new partnership with **Signet Bank**, the **Rimi Riga Marathon** 2025–2026 running season will bring a series of events in brand-new formats.

At the end of this year, Signet Bank will help the traditional **Rimi Riga Marathon Christmas Run** gain new momentum by joining forces to support the charity campaign **“Angels over Latvia”**, organised annually by **TV3 Group Latvia** in cooperation with the **Children’s Hospital Foundation** and other supporters.

On **17 May 2026**, Signet Bank will also give Rimi Riga Marathon participants the chance to take on **Riga’s longest distances in a team relay format**.

---

## Christmas Charity Run in partnership with Signet Bank

To mark the beginning of the new cooperation, the traditional **Rimi Riga Marathon Christmas Run** on the morning of **24 December** will become a **charity run** and will be organised together with Signet Bank.

### Start and route

- **Date & time:** 24 December, 9:00  
- **Start location:** By the **big Christmas tree at the Latvian National Opera** (Aspazijas bulvāris 3)

From the Opera:

1. Along the route past the **Freedom Monument**
2. Further along **Brīvības Street** to **Tērbatas Street**
3. Continuing to **Miera Street**
4. Turning towards the traditional Christmas Run destination – **Mežaparks**
5. Turnaround point in Mežaparks and run back to the finish

**Finish location:**  
For the second year in a row, the finish will be at **Buono Buono pizzeria**, Miera iela 10.

- **Total course length:** ~**13 km**
- Runners can **choose their own distance** by turning back towards the finish at any point on the way to Mežaparks.

### Festive atmosphere at the finish

At the finish, runners will be greeted by:

- A **festive Christmas atmosphere**
- **Delicious pizza** – free for the first finishers, courtesy of the organisers
- A **glass of good Bordeaux red wine**, served from a double magnum bottle

The early Christmas morning run has become a **beloved tradition** for Riga residents, bringing together several hundred runners every year who are the first to wake up the city ahead of the festive celebrations.

---

## Donation to “Angels over Latvia”

The organisers are delighted that this year, in cooperation with **Signet Bank**, the run will not only get snowy Riga moving but also contribute to the **“Angels over Latvia”** charity campaign.

- For **every participant**, the **Rimi Riga Marathon** will donate **EUR 10** to “Angels over Latvia”.
- During the run, organisers will also invite participants to **make their own donations**.

Everyone is warmly encouraged to join in full festive spirit:

- Christmas-themed outfits  
- Elf hats  
- Reindeer antlers  
- Or any other fun, thematic costume found at home

### Important practical information

- **Traffic will not be closed.**  
  Participants will move along the **pavements** and must **follow all traffic rules**.
- In case of **high participant numbers**, several **start groups (waves)** will be created to reduce potential congestion.
- The **Christmas Run is free of charge** and **no advance registration is required**.

---

## Rimi Riga Marathon relays in partnership with Signet Bank

Next year, joining forces once again, the **Rimi Riga Marathon organisers** and **Signet Bank** will bring back the relay concept that was first introduced at the **World Road Running Championships 2023**:

- **Relay format** in both the **marathon** and **half-marathon** distances  
- Teams of **2** or **4** runners  
- A chance to experience **Riga’s streets in an even more unique and exciting way**

Detailed information and **registration** for the **half-marathon and marathon relays**, made possible thanks to the support of Signet Bank, will follow **very soon – by the end of this year**.

`,
  },
  {
    id: "baltic-wine-drinks-awards-2025-best-restaurants",
    title: "International Jury Names Best Baltic Restaurants",
    excerpt:
      "An international jury for the 2025 Baltic Wine & Drinks Awards has named the best restaurants, wine bars, cocktail bars, and retailers for wine lovers across the Baltics, while also unveiling the Top 50 Baltic Sommeliers.",
    date: "2025-11-24",
    category: "Food & Drink",
    tags: ["Wine", "Restaurants", "Baltics", "Awards", "Sommeliers"],
    image: "https://rimirigamarathon.com/wp-content/uploads/2025/12/1-209-1.webp",
    content: `

As part of the **Baltic Wine & Drinks Awards**, an international jury has selected the top restaurants for wine lovers across the Baltic states. Organized in association with **Liebherr**, the competition is now in its sixth year and is led by a team of Baltic and internationally recognized professionals. Its mission is to highlight restaurants, bars, and hotels with good, great, and exceptional wine lists, while supporting the development of Baltic wine culture.

To further elevate the sommelier profession, the organizers have, for the second year in a row, announced the **Top 50 Baltic Sommeliers Award**.

---

## About the Competition

The competition judged the wine & drinks offer of **82 leading Baltic restaurants, wine bars and hotel restaurants**, as well as wine retailers and cocktail bars.

During the awards ceremony, held on **November 22** as part of the **Riga Wine & Champagne** festival, a total of **24 restaurants, wine bars, and retailers** from across the Baltics received the highest distinction of **three stars**.

The judges rated each restaurant’s wine selection by:

- analysing the contents of the wine list  
  - wines represented  
  - vintages  
  - suitability for the restaurant’s cuisine and characteristics  
  - focus on specific country or wine region  
- pricing policy  
- presentation and clarity  
- the element of surprise  

Restaurants were awarded either a **one-, two-, or three-star** Baltic Wine & Drinks Awards rating, as well as a **Recommended** status.

---

## International Jury

The brightest star of the international jury was **Stefan Kletner** (one of Austria’s top sommeliers and head sommelier of the five-star restaurant Burg Vital Resort in Oberlech).

The Baltic region was represented by:

- **Arūnas Starkus** – considered the founding figure of Lithuanian wine culture  
- **Edgars Razminas** – one of the most prominent new-generation sommeliers, named *Michelin Sommelier of the Year* in the Netherlands in 2021  
- **Jānis Volkinšteins** – from wine bar *Vieta*, a three-time winner of the “Best Wine List in the Baltics” title  
- **Lauris Grass** – master of *Mākoņi* and *Dzērienu Meistarklases*  
- **Mārtiņš Pīlēns** – founder of *My Wine Design* and presenter of the special award for “Best Wine List Design”  
- **Aleksei Pogrebnoi** – sommelier at Tallinn’s Michelin-starred *Noa Chef’s Hall*  
- **Juris Ķēniņš** – one of Latvia’s most experienced bartenders, former bartender at *The Savoy American Bar* (twice crowned the World’s Best Bar) and founder of *Kolekcija Spirits*  
- **Linda Karpenko** – sommelier at Copenhagen’s *Alchemist*, a Michelin restaurant ranked 5th in the world  
- **Aigars Nords** (jury chairman) – founder of *Riga Wine & Champagne*, the competitions *Latvian Wine of the Year* and *Baltic Wine & Drinks Awards*, and author of the book **“Vīns un Nords”**

---

## Top 24 Best Restaurants, Wine Bars and Retailers  
### Three-Star Winners in 2025 (by country)

### 🇱🇻 Latvia

- **Riviera (Riga)** – The best casual restaurant wine list in the Baltics; a special mention for **Italy & Champagne**; a special mention for **maturity & breadth of vintages**.  
- **Barents (Riga)** – The best fine-dining restaurant wine list in Latvia; a special mention for **Austria & Champagne**; the **best wine list presentation** among fine-dining restaurants in Latvia.  
- **Truff le Pig (Riga)** – The **best wine-bar wine list in the Baltics**; a special mention for **Grower Champagne, Burgundy & Jura**; the **best wine-bar wine list presentation** in the Baltics.  
- **Noble Wine (Riga)** – The **best wine-bar-shop wine list in the Baltics**; a special mention for **Champagne, Piedmont & Burgundy**; a special mention for **great value-for-money**.  
- **Max Cekot Kitchen (Riga)** – The **most ambitious fine-dining restaurant list in the Baltics**; a special mention for **Champagne, Bordeaux & Burgundy**; a special mention for **ambitious wine & food pairings** and the **breadth of back vintages**.  
- **B7 (Riga)** – The **best bistro wine list in the Baltics**; a special award – **the best short wine list in the Baltics**; a special mention for **wine list presentation**.  
- **Snatch restaurant (Riga)** – The best casual restaurant wine list in Latvia; a special mention for **Italy**.  
- **Mākonis Cocktails & Design (Riga)** – The **best cocktail list in Latvia**.  
- **The Benjamin House Bar (Riga)** – The **best newcomer** at the Baltic Drink List Awards.  
- **Gongu Restaurant (Riga)** – A special mention for a **great cocktail list**.  
- **Wine Collectors (Riga)** – The **best fine wine & premium retailer in the Baltics**; a special mention for an outstanding **Grower Champagne & Burgundy** portfolio.  
- **Noble Wine (Riga)** – The **best overall wine & drinks retailer in Latvia**; a special mention for **Piedmont, Burgundy, Champagne, sake & an outstanding New World portfolio**; a special mention for **value-for-money**.  

---

### 🇱🇹 Lithuania

- **HeJi (Vilnius)** – The **best fine-dining restaurant wine list in the Baltics**; a special mention for the **breadth of by-the-glass and sake selection**; the **best wine list presentation in Lithuania**; the **best overall drinks selection in the Baltics**; a special mention for the **cocktail offer**.  
- **Monte Pacis (Kaunas)** – The **best regional casual restaurant wine list in the Baltics**; a special mention for the **originality of the presentation & the unique concept**.  
- **DEMO Restoranas (Vilnius)** – A special mention for **Champagne & classic Old World wines**.  
- **Nineteen18 (Vilnius)** – The **best short fine-dining restaurant wine list in Lithuania**.  
- **Whisky Bar "King & Mouse" (Vilnius)** – The **best whisky selection in the Baltics**.  
- **PACAI Bar (Vilnius)** – A special mention for an **impressive spirits selection**.  
- **Vyno klubas (Lithuania)** – The **best overall wine & drinks retailer in the Baltics**; a special mention for the **breadth of selection across regions, countries, continents**; the **best value-for-money in the Baltics**.  

---

### 🇪🇪 Estonia

- **Time To Wine Kopli (Tallinn)** – The **best wine-bar-shop wine list in Estonia**; a special mention for **Champagne & by-the-glass selection**.  
- **Lee Brasserie (Tallinn)** – The **best casual restaurant wine list in Estonia**; a special mention for the **by-the-glass selection and overall depth**; the **best restaurant wine list presentation and layout in Estonia**.  
- **Time To Wine Rotermanni (Tallinn)** – A special mention for the **breadth of selection, by-the-glass wines, Champagne & sparkling wines**; the **best value-for-money in Estonia**.  
- **Mnemonic Bar (Tallinn)** – The **best bar in Estonia**.  
- **Time To Wine Bar & Shop Rotermanni (Estonia)** – The **best sparkling wine collection in the Baltics**; the **best wine retailer in Estonia**; a special mention for **Italy & sweet wines**; a special mention for **value-for-money**.  

> All competition results and ratings for restaurants and wine bars in the Baltics are available at  
> 👉 [balticwinelists.com](http://balticwinelists.com/)

---

## TOP 50 Baltic Sommeliers

In an effort to promote the understanding and prestige of the sommelier profession, the **Baltic Wine & Drinks Awards**, in association with **LIEBHERR**, is for the second year in a row awarding the **“Top 50 Baltic Sommeliers”**.

### How the Top 50 Were Selected

1. **First stage:**  
   All applicants of the Baltic Wine & Drinks Awards participants were asked to nominate **five sommeliers** deserving recognition for their outstanding service.

2. **Second stage:**  
   A **public vote** determined the **Top 50 Baltic Sommeliers**.

---

### TOP 10 Baltic Sommeliers

1. **Juris Semjonovs** (Latvia)  
2. **Ingūna Majore** (Latvia)  
3. **Ivars Kalniņš** (Latvia)  
4. **Marts Augusts** (Estonia)  
5. **Arnis Kalvišķis** (Latvia)  
6. **Laura Maria Puju** (Estonia)  
7. **Kristijonas Valančiūnas** (Lithuania)  
8. **Laura Griščenko** (Latvia)  
9. **Katrīna Svilāne** (Latvia)  
10. **Ritvars Blūms** (Latvia)  

The full **Top 50 sommeliers** list can be found here:  
👉 [balticwinelists.com](http://balticwinelists.com/)

---

## About the Baltic Wine & Drinks Awards

The **Baltic Wine & Drinks Awards**, organized in collaboration with **Liebherr**, is hosted for the sixth year by the popular wine and gastronomy festival **Riga Wine & Champagne**, with a jury of internationally recognized wine professionals.

Since its founding in **2018**, the competition’s aim has been to:

- draw public attention to restaurants and bars with **thoughtful, customer-focused wine programs**, and  
- encourage the **development of wine culture** across the Baltic states.`,
  },
  {
    id: "rimi-riga-marathon-2026-registration",
    title: "Registration Now Open for the 2026 Rimi Riga Marathon",
    excerpt:
      "Registration for the 2026 Rimi Riga Marathon is officially open! The event returns on May 16–17, 2026, welcoming runners from around the globe to the streets of Riga.",
    date: "2025-06-18",
    category: "Sports",
    tags: ["Marathon", "Riga", "Running", "Charity"],
    image:
      "https://rimirigamarathon.com/wp-content/uploads/2025/06/Lauris_Viksne_DPD_Judze-34-scaled-aspect-ratio-1920-1011-1440x756.jpg",
    content: `Registration for the 2026 Rimi Riga Marathon—the most significant mass sports event in the Baltics—has officially opened today, 11 months ahead of next year's event.

The annual marathon will take place on May 16–17, 2026, when Riga will once again welcome thousands of running enthusiasts for whom running is both a lifestyle and a celebration, as well as world-class elite athletes competing for top results and prize money in a World Athletics Road Race Label event.

> Over the years, the Rimi Riga Marathon has become a signature event for both Riga and Latvia, uniting thousands of joggers, families, children, marathon tourists, and elite runners from around the world on the streets of the capital. In 2026, we'll keep the existing Rimi Riga Marathon race courses, praised during both the World Road Running Championships in Riga and our 35th anniversary event, while expanding our running and healthy lifestyle promotion campaigns both in Latvia and abroad!
>
> **— Aigars Nords, Head of the Rimi Riga Marathon organizing team**

Since the first starting shot at the Freedom Monument on July 27, 1991, the 2026 edition will mark the 36th Rimi Riga Marathon. Organizers expect tens of thousands of running fans to take part once again.

## Why wait? Register today!

Starting June 18, registration is open for the Marathon, Half Marathon, 10 km, 5.7 km, and DPD Mile. Registration for the Kids' Day events will open in spring 2026, closer to the event. Organizers remind participants that entry fees are lowest at launch, so it's a great time to register now.

![Runners at the Rimi Riga Marathon](https://rimirigamarathon.com/wp-content/uploads/2025/06/0RK_8855-1440x960.jpg)

## Don't forget to support the "Movement for Movement" charity campaign!

To help children who are unable to enjoy the joy of movement, the Rimi Riga Marathon—together with Rimi, the Children's Hospital Foundation, and Latvian Television—is launching the 6th edition of the charity initiative "Movement for Movement."

You can donate to children with mobility impairments in donation boxes at all Rimi stores, via the Children's Hospital Foundation website, or—starting June 18—directly in your marathon profile when registering.

All funds raised will go toward co-financing orthotics and orthopedic shoes, as well as other needs for children with mobility challenges. The initiative runs until July 31.

See you soon at the Rimi Riga Marathon!`,
  },
  {
    id: "baltic-wine-drinks-awards-2025",
    title: "Welcome to the Baltic Wine & Drinks Awards 2025!",
    excerpt:
      "The most prestigious celebration of wine, drinks, and sommeliers in the Baltics returns – highlighting the top venues, retailers, and hospitality talent of 2025. Early bird registration is open from July 15 to August 15!",
    date: "2025-07-15",
    category: "Food & Drinks",
    tags: ["Awards"],
    image: "https://rimirigamarathon.com/wp-content/uploads/2025/07/DSC9993-1-1.jpg",
    content: `The **Baltic Wine & Drinks Awards 2025**, in partnership with **LIEBHERR**, are now open! This annual celebration honors the best in Baltic wine and drinks culture — from top sommeliers and wine lists to standout bars, restaurants, and retailers.

**Early Bird Registration:** July 15 – August 15  
**Regular Registration:** August 16 – September 15  
[Apply Now](https://bwda.webflow.io)

### Award Categories

**#1 Baltic Wine List Awards**  
Open to all venues with notable wine programs — restaurants, bars, cafes, hotels, and clubs.

**#2 Baltic Drinks List Awards**  
Recognizes exceptional beverage programs including cocktails, spirits, and non-alcoholic innovation.

**#3 Baltic Wine & Drinks Retailer Awards**  
Retailers and distributors with outstanding wine & drinks selections are invited to apply.

### Who Will Make the "Top 50 Baltic Sommeliers" of 2025?

This year's edition also includes the **Top 50 Baltic Sommeliers Award**. All applicants are invited to nominate 5 outstanding sommeliers. Finalists will be selected through an industry-wide vote and honored during the main award ceremony.

**The Grand Finale:** November 22, 2025, at **Hanzas Perons**, Riga – right before the *Top 100 Wines + Chefs* show!

![Top 50 Baltic Sommeliers 2024 winners](https://rimirigamarathon.com/wp-content/uploads/2025/07/rwch-top50-image-1-scaled.png)

### Meet the Judges

- **Aigars Nords** (Riga, LV)
- **Linda Karpenko** (Copenhagen, DK)
- **Edgaras Razminas** (Netherlands)
- **Stefan Klettner** (Austria)
- **Jānis Volkinšteins** (Riga, LV)
- **Arūnas Starkus** (Vilnius, LT)
- **Aleksei Pogrebnoi** (Tallinn, EE)
- **Lauris Grass** (Riga, LV)
- **Mārtiņš Pīlēns** (Vienna, AT)

### What's New in 2025?

- **July 25–26**: Bubble Lounge powered by Dongfeng at [Pink Noise Riga](https://www.pinknoiseriga.com)
- **Sept 13**: 2nd edition of [Riga Whisky & Friends](https://www.rigawhiskyfriends.com)
- **Nov 22**: Top 100 Wines + Chefs show
- **Feb 28, 2026**: The Grand Bubble Parade

### Useful Links

- [Sign up for the Awards](https://bwda.webflow.io)
- [2024 Best Wine Lists](https://www.instagram.com/balticwinedrinksawards/reel/DCt2NCOCgmN)
- [2024 Best Drinks Lists](https://www.instagram.com/balticwinedrinksawards/reel/DCtxfnZi76V)
- [2024 Best Retailers](https://www.instagram.com/balticwinedrinksawards/reel/DCtwwZECB61)

Join the celebration of the best wine & drinks minds in the Baltics. Apply, nominate, and taste your way into the top!`,
  },
  {
    id: "dongfeng-partners-pink-noise-2025",
    title: "Dongfeng Auto Joins Pink Noise Riga Festival to Support Kamasi Washington's Concert",
    excerpt:
      "Dongfeng Auto joins Pink Noise Riga 2025 as an official partner, supporting Kamasi Washington's 'Fearless Movement' concert on July 26 and all key festival events in Riga.",
    date: "2025-06-21",
    category: "Partnerships",
    tags: ["Pink Noise Riga", "Partner"],
    image: "https://rimirigamarathon.com/wp-content/uploads/2025/11/dongfeng-2.webp",
    content: `**Dongfeng Auto** has officially joined the **Pink Noise Riga 2025** music festival as a strategic partner and will support one of its biggest highlights: the **Kamasi Washington "Fearless Movement" concert** on **July 26** at **Palladium Riga**.

The concert is part of Kamasi Washington's latest European tour, promoting his new album *Fearless Movement*, which celebrates rhythm, dance, and embodiment through spiritual jazz and electronic fusion.

### Jazz Meets Bubbles: "Bubble Lounge | powered by Dongfeng"

For the first time ever, Pink Noise Riga joins forces with **Riga Wine & Champagne Festival** to launch the **"Bubble Lounge"** – a new luxury experience combining world-class jazz with premium champagne and wine tastings on July 25–26 at Palladium Riga.

The Bubble Lounge will feature:

- Premium champagne and wine selections
- Exclusive DJ sets and live performances
- Networking opportunities for industry professionals
- VIP access to festival events

### Kamasi Washington's Return to Riga

As Pink Noise Riga's headliner, Kamasi Washington brings his full band:

- Rickey Washington (sax, flute)
- Igmar Thomas (trumpet)
- Brandon Coleman (keys)
- Tony Austin (drums)
- DJ Battlecat (turntables)
- Miles Mosley (bass)
- Patrice Quinn (vocals)

This performance marks Washington's return to Riga following his acclaimed 2023 appearance at the Palladium.`,
  },
  {
    id: "kamasi-washington-pink-noise-riga-2025",
    title: "Kamasi Washington Brings 'Fearless Movement' to Riga's Pink Noise Festival",
    excerpt:
      "On July 25–26, the Pink Noise Riga festival will light up the capital with global jazz, fusion, and experimental stars – headlined by Kamasi Washington and his stellar band as part of the 'Fearless Movement' European tour.",
    date: "2025-06-20",
    category: "Music",
    tags: ["Pink Noise Riga", "Festival"],
    image: "https://rimirigamarathon.com/wp-content/uploads/2025/07/KW_VincentHaycock_1-1.jpg",
    content: `The Pink Noise Riga music festival returns on **July 25–26** to the **Palladium Riga concert hall**, bringing together world-class jazz, experimental fusion, and electronic music talents from across the globe.

### Kamasi Washington Headlines the Festival

The legendary saxophonist and composer Kamasi Washington will perform with his full ensemble as part of his *Fearless Movement* European tour:

- Rickey Washington (sax, flute)
- Igmar Thomas (trumpet)
- Brandon Coleman (keys)
- Tony Austin (drums)
- DJ Battlecat (turntables)
- Miles Mosley (bass)
- Patrice Quinn (vocals)

Washington's newest album celebrates rhythm, movement, and the spiritual connection between music and dance, blending jazz traditions with contemporary electronic production.

### Latvian Talent in the Spotlight

The festival will also showcase some of Latvia's finest musical acts:

- **Instrumenti** – Latvia's beloved indie rock pioneers
- **LUPA** – Electronic and experimental soundscapes
- **Kārlis Auziņš Double Trio** – Contemporary jazz excellence
And more to be announced

### Side Events and Extras

Beyond the main stage performances, Pink Noise Riga will host:

- Afterparties at M/Darbnīca and other Riga venues
- Exclusive DJ sets from international guests
- Pop-up performances throughout the city

### Get Your Tickets

Two-day passes are now available on [Fienta](https://www.pinknoiseriga.com/) with a special **15% early bird discount** for those who purchase before July 1st.

Join us for an unforgettable weekend of music, culture, and community in the heart of Riga!`,
  },
]

export function getSortedArticles(limit?: number): JournalArticle[] {
  const sorted = [...journalArticles].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
  return limit ? sorted.slice(0, limit) : sorted
}

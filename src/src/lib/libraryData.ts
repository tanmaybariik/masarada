export interface ReadingSection {
  headingBn: string;
  headingEn: string;
  textBn: string;
  textEn: string;
}

export interface ReadingItem {
  id: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  authorBn: string;
  authorEn: string;
  category: "biography" | "teachings" | "scripture" | "articles";
  categoryBn: string;
  categoryEn: string;
  readTimeBn: string;
  readTimeEn: string;
  image: string;
  featured?: boolean;
  highlightQuoteBn: string;
  highlightQuoteEn: string;
  sections: ReadingSection[];
  wikiSource?: string;
}

export const LIBRARY_ARTICLES: ReadingItem[] = [
  {
    id: "sarada-devi",
    titleBn: "শ্রীশ্রীমা সারদা দেবীর পবিত্র জীবনগাথা ও উপদেশ",
    titleEn: "Life and Divine Teachings of Holy Mother Sarada Devi",
    subtitleBn: "শ্রীরামকৃষ্ণের সহধর্মিণী ও বিশ্বজননী মাতৃমূর্তি",
    subtitleEn: "Spiritual counterpart of Sri Ramakrishna & Universal Mother",
    authorBn: "উইকিপিডিয়া ও রামকৃষ্ণ মিশন আর্কাইভ",
    authorEn: "Wikipedia & Ramakrishna Mission Archives",
    category: "biography",
    categoryBn: "জীবনী ও মাতৃসাধনা",
    categoryEn: "Biography & Motherhood",
    readTimeBn: "৮ মিনিট",
    readTimeEn: "8 min",
    image: "/maa-sarada-hero.jpg",
    featured: true,
    highlightQuoteBn: "যদি শান্তি চাও মা, তবে কারও দোষ দেখো না। দোষ দেখবে নিজের। জগতকে আপন করে নিতে শেখো। কেউ পর নয় মা, জগৎ তোমার।",
    highlightQuoteEn: "If you want peace of mind, do not find fault with others. Rather learn to see your own faults. Learn to make the whole world your own. No one is a stranger, my child: the whole world is yours!",
    wikiSource: "https://en.wikipedia.org/wiki/Sarada_Devi",
    sections: [
      {
        headingBn: "১. জয়রামবাটীতে শৈশব ও শুভ আবির্ভাব (১৮৫৩)",
        headingEn: "1. Early Life & Advent in Jayrambati (1853)",
        textBn: "শ্রীমা সারদা দেবী ১৮৫৩ সালের ২২শে ডিসেম্বর পশ্চিমবঙ্গের বাঁকুড়া জেলার জয়রামবাটী গ্রামে এক নিষ্কলঙ্ক ও ধার্মিক ব্রাহ্মণ পরিবারে জন্মগ্রহণ করেন। তাঁর পিতা রামচন্দ্র মুখোপাধ্যায় ও মাতা শ্যামাসুন্দরী দেবী ছিলেন অত্যন্ত সরল ও পরম ঈশ্বরভক্ত। শৈশবেই সারদা দেবীর মধ্যে অপরিসীম সেবাভাব, মমতা ও ঈশ্বরানুরাগ প্রস্ফুটিত হয়। সংসারের কঠিনতম কাজ, পশুপালন, এবং গরিবের সেবায় তিনি সর্বদা আনন্দ পেতেন।",
        textEn: "Sarada Devi was born on December 22, 1853, in the quiet village of Jayrambati in Bankura district, West Bengal, into a pious and devoted Brahmin family. Her parents, Ramchandra Mukhopadhyay and Shyamasundari Devi, were pure-hearted and devoted souls. From her earliest childhood, Sarada displayed natural compassion, unselfishness, and deep devotion to God."
      },
      {
        headingBn: "২. শ্রীরামকৃষ্ণের সঙ্গে শুভ পরিণয় ও দক্ষিণেশ্বরে আগমন",
        headingEn: "2. Marriage to Sri Ramakrishna & Dakshineswar",
        textBn: "১৮৫৯ সালে বালিকা বয়সে শ্রীরামকৃষ্ণের সঙ্গে তাঁর বিবাহ সম্পন্ন হয়। ১৮৭২ সালে আঠারো বছর বয়সে তিনি দক্ষিণেশ্বর কালীবাড়িতে আসেন। শ্রীরামকৃষ্ণ তাঁকে ষোড়শী পূজায় সাক্ষাৎ জগজ্জননী ত্রিপুরসুন্দরী রূপে পূজা করে আত্মনিবেদন করেন। দক্ষিণেশ্বরের নহবতের ক্ষুদ্র কক্ষে শ্রীমা দিনের পর দিন ঠাকুর ও অগণিত ভক্তদের জন্য রান্না ও সেবাকার্য করতেন, যা ইতিহাসে তপস্যার এক অনুপম নিদর্শন।",
        textEn: "In 1859, her marriage with Sri Ramakrishna took place. In 1872, at the age of eighteen, she arrived at Dakshineswar. There, Sri Ramakrishna worshipped her as the living embodiment of the Divine Mother Tripurasundari in the sacred Shodashi Puja. For years in the tiny Nahabat room, she silently cooked and served Thakur and his disciples with tireless devotion."
      },
      {
        headingBn: "৩. শ্রীরামকৃষ্ণ মহাপ্রয়াণোত্তর সঙ্ঘজননী রূপে পথপ্রদর্শন",
        headingEn: "3. Spiritual Head & Guiding Light of the Movement",
        textBn: "১৮৮৬ সালে শ্রীরামকৃষ্ণের মহাসমাধির পর শ্রীমা সারদা দেবী রামকৃষ্ণ সঙ্ঘ ও নবীন সন্ন্যাসী শিষ্যদের (যাঁদের মধ্যে স্বামী বিবেকানন্দ অন্যতম) প্রধান আশ্রয় ও আধ্যাত্মিক পথপ্রদর্শকে পরিণত হন। স্বামীজী শিকাগো যাওয়ার আগে শ্রীমায়ের পরম আশীর্বাদ গ্রহণ করেছিলেন। শ্রীমা ছিলেন সর্বত্যাগী সন্ন্যাসী ও গৃহী ভক্ত—সকলের পরম করুণাময়ী মা।",
        textEn: "Following Sri Ramakrishna's passing in 1886, Holy Mother became the central spiritual guide and guiding mother of the Ramakrishna Order and young disciples, led by Swami Vivekananda. Swamiji sought her divine blessing before departing for the historic 1893 Chicago Parliament of Religions."
      },
      {
        headingBn: "৪. শ্রীমায়ের চিরন্তন উপদেশ ও অমৃতবাণী",
        headingEn: "4. Eternal Teachings & Universal Love",
        textBn: "শ্রীমায়ের মহাবাণী: 'যার কেউ নেই, তারও আমি মা। সৎ-অসৎ, ভালো-মন্দ নির্বিশেষে সবাই আমার সন্তান।' তিনি শিখিয়েছেন কর্মের সাথে ঈশ্বরের নাম জপ করা, ধৈর্য ধারণ করা এবং সকল সৃষ্টির মাঝে ঈশ্বরকে দর্শন করা। ১৯২০ সালের ২০শে জুলাই এই পরম জ্যোতির্ময়ী মা দেহত্যাগ করেন।",
        textEn: "Mother's universal declaration remains immortal: 'I am the Mother of the virtuous, I am the Mother of the wicked. Whenever you are in distress, say to yourself, I have a mother.' She taught the path of silent japa, selfless work, and universal acceptance."
      }
    ]
  },
  {
    id: "ramakrishna",
    titleBn: "শ্রীশ্রীরামকৃষ্ণ পরমহংসদেবের জীবন ও সর্বধর্ম সমন্বয়",
    titleEn: "Sri Ramakrishna: Life, Sadhana & Harmony of Religions",
    subtitleBn: "দক্ষিণেশ্বরের যুগাবতার ও আধ্যাত্মিক সমন্বয়ের প্রবক্তা",
    subtitleEn: "Yugavatara of Dakshineswar and Prophet of Universal Harmony",
    authorBn: "উইকিপিডিয়া ও শ্রীশ্রীরামকৃষ্ণ কথামৃত",
    authorEn: "Wikipedia & Sri Sri Ramakrishna Kathamrita",
    category: "biography",
    categoryBn: "যুগাবতার জীবনী",
    categoryEn: "Divine Biography",
    readTimeBn: "১০ মিনিট",
    readTimeEn: "10 min",
    image: "/ramakrishna.png",
    highlightQuoteBn: "যত মত, তত পথ। সব ধর্মই সত্য—আন্তরিক ব্যাকুলতা নিয়ে ডাকলে এক ঈশ্বরকেই লাভ করা যায়।",
    highlightQuoteEn: "As many faiths, so many paths. All religions are true—God can be realized through every sincere spiritual pursuit.",
    wikiSource: "https://en.wikipedia.org/wiki/Ramakrishna",
    sections: [
      {
        headingBn: "১. কামারপুকুরে জন্ম ও অলৌকিক বালক গদাধর (১৮৩৬)",
        headingEn: "1. Early Childhood in Kamarpukur (1836)",
        textBn: "১৮৩৬ সালের ১৮ই ফেব্রুয়ারি হুগলি জেলার কামারপুকুর গ্রামে ক্ষুদিরাম চট্টোপাধ্যায় ও চন্দ্রমণি দেবীর ঘরে জন্মগ্রহণ করেন গদাধর চট্টোপাধ্যায় (পরবর্তীকালে শ্রীরামকৃষ্ণ পরমহংস)। বাল্যকাল থেকেই তিনি ছিলেন ভাবপ্রবণ ও দেবদেবীর পূজায় মগ্ন। মাঠে মেঘের কোলে উড়ন্ত বকের সারি দেখে শৈশবেই তাঁর প্রথম ভাবসমাধি লাভ হয়।",
        textEn: "Gadadhar Chattopadhyay (later known as Sri Ramakrishna Paramahamsa) was born on February 18, 1836, in Kamarpukur village, Hooghly district, Bengal. From early childhood, he showed deep devotional inclinations and experienced his first ecstasy while watching a flight of white cranes against dark monsoon clouds."
      },
      {
        headingBn: "২. দক্ষিণেশ্বর ভবতারিণী মন্দিরে তীব্র সাধনা",
        headingEn: "2. Intense Sadhana at Dakshineswar Kali Temple",
        textBn: "১৮৫৫ সালে রানী রাসমণি প্রতিষ্ঠিত দক্ষিণেশ্বর মা ভবতারিণী মন্দিরে তিনি পূজারী হিসেবে নিযুক্ত হন। মায়ের চাক্ষুষ দর্শনের জন্য তাঁর ব্যাকুলতা চরম রূপ নেয়। তিনি ভৈরবী ব্রাহ্মণীর কাছে তন্ত্র সাধনা, তোতাপুরী মহারাজের নিকট অদ্বৈত বেদান্ত নির্বিকল্প সমাধি এবং পরবর্তীতে ইসলাম ও খ্রিস্টধর্মের সাধনা করে সকল পথেই এক অদ্বিতীয় পরব্রহ্মকে উপলব্ধি করেন।",
        textEn: "In 1855, he was appointed priest at Dakshineswar Kali Temple built by Rani Rashmoni. Experiencing an intense longing for Mother Kali, he practiced diverse spiritual paths — Tantra under Bhairavi Brahmani, Advaita Vedanta under Totapuri, as well as Islam and Christianity — realizing that all lead to the same Supreme Reality."
      },
      {
        headingBn: "৩. সর্বধর্ম সমন্বয় ও 'যত মত, তত পথ'",
        headingEn: "3. Harmony of Religions: 'Joto Mat, Toto Path'",
        textBn: "শ্রীরামকৃষ্ণ জগতের ইতিহাসে প্রথম ঘোষণা করেন যে বিভিন্ন ধর্ম কোনো বিরোধের বিষয় নয়, বরং একই পর্বতের শিখরে ওঠার বিভিন্ন পথ। নদী যেমন নানা দিক থেকে বয়ে এসে এক সাগরে মেশে, ঠিক তেমনি সব ধর্মমত এক পরমপুরুষেই লীন হয়।",
        textEn: "Sri Ramakrishna established the supreme truth of the Harmony of Religions. Just as different streams originate from various sources and merge into the same ocean, all spiritual paths lead sincere seekers to the one Infinite Divine."
      },
      {
        headingBn: "৪. তরুণ শিষ্যবর্গ ও শ্রীশ্রীরামকৃষ্ণ কথামৃত",
        headingEn: "4. Disciples & Sri Sri Ramakrishna Kathamrita",
        textBn: "শ্রীরামকৃষ্ণের সান্নিধ্যে আসেন নরেন্দ্রনাথ (স্বামী বিবেকানন্দ), রাখাল (স্বামী ব্রহ্মানন্দ), বাবুরাম (স্বামী প্রেমানন্দ) সহ একদল তেজস্বী যুবক। মহেন্দ্রনাথ গুপ্ত (শ্রীম) তাঁর অমূল্য কথামৃত লিপিবদ্ধ করে বিশ্ববাসীকে অমৃত দান করেন। ১৮৮৬ সালের ১৬ই আগস্ট কাশীপুর বাগানবাড়িতে ঠাকুর মহাসমাধিতে বিলীন হন।",
        textEn: "Around him gathered young intellectual seekers who would transform world spiritual history, spearheaded by Narendranath (Swami Vivekananda). Mahendranath Gupta ('M.') recorded his everyday dialogues into the immortal scripture, The Gospel of Sri Ramakrishna."
      }
    ]
  },
  {
    id: "swami-vivekananda",
    titleBn: "স্বামী বিবেকানন্দের দিগ্বিজয়, আদর্শ ও কর্মযোগ",
    titleEn: "Swami Vivekananda: Chicago Parliament, Vision & Karma Yoga",
    subtitleBn: "আধুনিক ভারতের আধ্যাত্মিক দূত ও যুবসমাজের প্রেরণা",
    subtitleEn: "Spiritual Ambassador of India & Eternal Inspiration for Youth",
    authorBn: "উইকিপিডিয়া ও স্বামীজীর বাণী সংকলন",
    authorEn: "Wikipedia & Complete Works of Swami Vivekananda",
    category: "biography",
    categoryBn: "মহান মনীষী",
    categoryEn: "Visionary Biography",
    readTimeBn: "১২ মিনিট",
    readTimeEn: "12 min",
    image: "/swami-vivekananda.jpg",
    highlightQuoteBn: "উত্তিষ্ঠত জাগ্রত প্রাপ্য বরান নিবোধত — ওঠো, জাগো এবং লক্ষ্যে না পৌঁছানো পর্যন্ত থেমো না!",
    highlightQuoteEn: "Arise, awake, and stop not till the goal is reached! You have to grow from the inside out.",
    wikiSource: "https://en.wikipedia.org/wiki/Swami_Vivekananda",
    sections: [
      {
        headingBn: "১. নরেন্দ্রনাথ থেকে বিবেকানন্দ",
        headingEn: "1. Journey from Narendranath to Vivekananda",
        textBn: "১৮৬৩ সালের ১২ই জানুয়ারি কলকাতার সিমুলিয়ায় জন্মগ্রহণ করেন নরেন্দ্রনাথ দত্ত। তীক্ষ্ণ মেধা, সংগীত ও দর্শনে পারদর্শী তরুণ নরেন ঈশ্বর দর্শনের ব্যাকুলতায় বিভিন্ন মহলে ঘোরেন। অবশেষে দক্ষিণেশ্বরে শ্রীরামকৃষ্ণকে প্রশ্ন করেন—'আপনি কি ঈশ্বর দেখেছেন?' ঠাকুরের উত্তর ছিল: 'হ্যাঁ, দেখেছি। তোকে যেমন দেখছি, তার চেয়েও স্পষ্টতর ভাবে।' এই উত্তর তাঁর জীবন আমূল বদলে দেয়।",
        textEn: "Born on January 12, 1863, in Kolkata, Narendranath Datta was gifted with towering intellect and deep thirst for truth. He met Sri Ramakrishna with the bold question: 'Sir, have you seen God?' Thakur replied: 'Yes, I see Him just as I see you here, only in a sense much more intense.' This encounter transformed his destiny."
      },
      {
        headingBn: "২. শিকাগো ধর্ম মহাসভা ও বিশ্বজয় (১৮৯৩)",
        headingEn: "2. Historic Chicago Address (1893)",
        textBn: "১৮৯৩ সালের ১১ই সেপ্টেম্বর শিকাগোর বিশ্ব ধর্মমহাসভায় স্বামী বিবেকানন্দ তাঁর অমর ভাষণ শুরু করেন—'আমেরিকার ভগিনী ও ভ্রাতাগণ' (Sisters and Brothers of America)। উপস্থিত সাত হাজার শ্রোতা মন্ত্রমুগ্ধের মতো উঠে দাঁড়িয়ে দীর্ঘ করতালিতে তাঁকে অভিবাদন জানায়। তিনি বিশ্বকে ভারতীয় সনাতন বেদান্তের সার্বজনীন সত্য ও পরমতসহিষ্ণুতার বার্তা দেন।",
        textEn: "On September 11, 1893, at the World's Parliament of Religions in Chicago, Vivekananda addressed the audience as 'Sisters and Brothers of America', receiving a two-minute standing ovation from seven thousand people. He presented Hinduism as a religion of universal tolerance and acceptance."
      },
      {
        headingBn: "৩. রামকৃষ্ণ মঠ ও মিশনের প্রতিষ্ঠা ও শিবজ্ঞানে জীবসেবা",
        headingEn: "3. Founding of Ramakrishna Math and Mission",
        textBn: "১৮৯৭ সালের ১লা মে স্বামীজী প্রতিষ্ঠা করেন রামকৃষ্ণ মিশন। তাঁর মূল মন্ত্র ছিল—'আত্মনো মোক্ষার্থং জগদ্ধিতায় চ' (নিজের মুক্তির জন্য এবং জগতের হিতসাধনের জন্য)। বেলুড়ে গঙ্গার তীরে তিনি প্রতিষ্ঠা করেন বেলুড় মঠ, যা আজ সমগ্র বিশ্বের আধ্যাত্মিক ও সেবাকেন্দ্র।",
        textEn: "On May 1, 1897, Swamiji founded the Ramakrishna Mission, with the motto: 'Atmano mokshartham jagad hitaya cha' (For one's own salvation and for the welfare of the world). He established Belur Math as the headquarters of worldwide spiritual and humanitarian service."
      },
      {
        headingBn: "৪. যুবসমাজ ও কর্মযোগের বাণী",
        headingEn: "4. Message of Karma Yoga and Fearlessness",
        textBn: "স্বামীজী বিশ্বাস করতেন নির্ভীকতা ও আত্মবিশ্বাসে। তিনি বলতেন: 'যতক্ষণ বাঁচবে ততক্ষণ শিখবে।' ১৯০২ সালের ৪ঠা জুলাই মাত্র ৩৯ বছর বয়সে এই সিংহহৃদয় সন্ন্যাসী ধ্যানে মগ্ন অবস্থায় মহাসমাধি লাভ করেন।",
        textEn: "Vivekananda preached strength, self-confidence, and active service to the poor and suffering. On July 4, 1902, at age 39, the great monk entered Mahasamadhi, leaving behind a legacy that continues to inspire millions."
      }
    ]
  },
  {
    id: "kathamrita-teachings",
    titleBn: "শ্রীশ্রীরামকৃষ্ণ কথামৃতের অমৃত উপদেশ ও নীতিকথা",
    titleEn: "Essence of Sri Sri Ramakrishna Kathamrita: Parables & Teachings",
    subtitleBn: "দৈনন্দিন জীবনে ঈশ্বরলাভ ও শান্তির সরল পথ",
    subtitleEn: "Simple practical spirituality for daily life and peace",
    authorBn: "শ্রীম (মহেন্দ্রনাথ গুপ্ত)",
    authorEn: "Mahendranath Gupta ('M.')",
    category: "scripture",
    categoryBn: "পবিত্র কথামৃত",
    categoryEn: "Sacred Gospel",
    readTimeBn: "৬ মিনিট",
    readTimeEn: "6 min",
    image: "/kathamrita-cover.jpg",
    highlightQuoteBn: "সংসারে থাকবে পাঁকাল মাছের মতো। পাঁকে থাকে কিন্তু গায়ে একটুও পাঁক লাগে না।",
    highlightQuoteEn: "Live in the world like a mudfish. It lives in deep mud, yet not a speck of mud sticks to its skin.",
    sections: [
      {
        headingBn: "১. আন্তরিক ব্যাকুলতা ও প্রার্থনা",
        headingEn: "1. Sincere Yearning & Devotional Prayer",
        textBn: "ঠাকুর বলেছেন: 'মাছ ধরার জন্য যেমন ফাতনার দিকে একদৃষ্টিতে তাকিয়ে থাকতে হয়, তেমনি মনকে ঈশ্বরের চরণে যুক্ত রাখতে হবে। দুধ আর জল একসঙ্গে রাখলে মিশে যায়, কিন্তু দুধ থেকে মাখন তুলে জলে রাখলে ভাসে। সাধনা করে অন্তরে ঈশ্বররূপ মাখন তৈরি করো, তাহলে সংসারে থেকেও ডুবে যাবে না।' ",
        textEn: "Sri Ramakrishna said: 'Hold on to God with one hand and attend to your duties with the other. Once your mind is anchored in devotion, you will remain untouched by the worldly distractions.'"
      },
      {
        headingBn: "২. কাম-কাঞ্চন ত্যাগ ও সরল বিশ্বাস",
        headingEn: "2. Purity of Mind and Simple Faith",
        textBn: "সরল বিশ্বাসই ঈশ্বরলাভের চাবিকাঠি। হিসেবী বুদ্ধিতে ঈশ্বরকে বাঁধা যায় না। শিশুর মতো সরল মনে ডাকলে মা ভবতারিণী কৃপা করেন।",
        textEn: "Simple child-like faith is the royal gate to spiritual illumination. Calculation and cleverness cannot fathom the Divine."
      }
    ]
  },
  {
    id: "mayer-katha",
    titleBn: "শ্রীশ্রীমায়ের আশীর্বাদ ও অমৃতবাণী সংকলন",
    titleEn: "Words of Mother: Blessings and Counsels of Sri Sarada Devi",
    subtitleBn: "মা সারদার স্নেহপূর্ণ মাতৃউপদেশ ও শান্তিলাভের পথ",
    subtitleEn: "Loving maternal advice and the eternal path of peace",
    authorBn: "শ্রীমা সারদা দেবী",
    authorEn: "Holy Mother Sri Sarada Devi",
    category: "teachings",
    categoryBn: "উপদেশ ও অমৃতবাণী",
    categoryEn: "Divine Words",
    readTimeBn: "৫ মিনিট",
    readTimeEn: "5 min",
    image: "/mayer-katha-cover.jpg",
    highlightQuoteBn: "মনই সব। মন যদি শুদ্ধ হয়, জগৎ শুদ্ধ হবে। জপ করবে নিয়মিত, জপ করতে করতে মন শান্ত হবে।",
    highlightQuoteEn: "Everything depends on the mind. When the mind is purified, the whole world becomes pure.",
    sections: [
      {
        headingBn: "১. জপ ও নিয়মিত সাধনা",
        headingEn: "1. Repetition of Divine Name & Daily Japa",
        textBn: "শ্রীমা বলেছেন: 'নিয়মিত জপ-ধ্যান করবে। বাতাস তো বয়েই চলেছে, কিন্তু যে নৌকার পাল তোলে সেই দ্রুত তীরে পৌঁছায়। জপ করতে করতে মনের মলিনতা দূর হয়ে শান্তি লাভ হয়।' ",
        textEn: "Mother always advised regular spiritual practice: 'The breeze of divine grace is always blowing. Unfurl your sails through steady prayer and japa.'"
      },
      {
        headingBn: "২. ক্ষমা ও সহনশীলতার আদর্শ",
        headingEn: "2. The Virtue of Forgiveness and Patience",
        textBn: "শ্রীমা জীবনের শেষ মুহূর্তে মানবজাতিকে অমর অমৃত উপহার দিয়ে গিয়েছিলেন: 'কাউকে পর ভেবো না, সবাইকে ভালোবাসতে শেখো।' ",
        textEn: "In her final hours, Mother gave her sublime benediction: 'Never look upon anyone as a stranger; learn to love everyone without distinction.'"
      }
    ]
  }
];

const LIBRARY_STORAGE_KEY = "kms_custom_library_v2";

export function getStoredLibraryArticles(): ReadingItem[] {
  if (typeof window === "undefined") return LIBRARY_ARTICLES;
  try {
    const raw = localStorage.getItem(LIBRARY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(LIBRARY_ARTICLES));
      return LIBRARY_ARTICLES;
    }
    return JSON.parse(raw);
  } catch {
    return LIBRARY_ARTICLES;
  }
}

export function saveStoredLibraryArticles(articles: ReadingItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(articles));
    window.dispatchEvent(new Event("library_updated"));
  } catch (e) {
    console.error("Failed to save library articles", e);
  }
}


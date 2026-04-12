module.exports = [
  {
    lang: 'en',
    greeting: "👋 Welcome to the National Museum! I'm your virtual assistant. How can I help you today?",
    languageSelected: "Great! I'll communicate with you in English. 🇬🇧",
    mainMenu: "What would you like to do?\n\n🎫 Book Tickets\nℹ️ Museum Information\n❓ FAQs\n📞 Contact Us",
    booking: {
      start: "🎫 Let's book your tickets! Please select a visit date:",
      selectDate: "📅 Please enter your preferred visit date (e.g., 2026-03-15):",
      selectTimeSlot: "⏰ Available time slots:\n1️⃣ 10:00 AM - 11:30 AM\n2️⃣ 11:30 AM - 1:00 PM\n3️⃣ 1:00 PM - 2:30 PM\n4️⃣ 2:30 PM - 4:00 PM\n5️⃣ 4:00 PM - 5:30 PM\n6️⃣ 5:30 PM - 7:00 PM",
      selectCategory: "🎟️ Ticket Categories:\n1️⃣ Adult - ₹300\n2️⃣ Child - ₹100\n3️⃣ Senior Citizen - ₹150\n4️⃣ Student - ₹150\n5️⃣ Foreign National - ₹650",
      selectQuantity: "🔢 Enter the number of tickets (1-10):",
      paymentRedirect: "💳 Redirecting you to payment... Please click the 'Proceed to Payment' button below.",
      success: "🎉 Booking confirmed! Your ticket has been generated. Enjoy your visit!",
      cancelled: "❌ Booking cancelled. Feel free to start again anytime!",
      slotFull: "⚠️ Sorry, this time slot is fully booked. Please select another slot."
    },
    info: {
      menu: "ℹ️ What would you like to know about?\n\n1️⃣ Museum History\n2️⃣ Galleries & Exhibits\n3️⃣ Visiting Hours\n4️⃣ Rules & Guidelines\n5️⃣ Upcoming Events\n6️⃣ Location & Contact",
      history: "🏛️ The National Museum was founded in 1949. It is one of the largest museums in the country, housing over 200,000 artifacts spanning 5,000 years of cultural heritage.",
      hours: "🕐 Visiting Hours:\n\n• Tuesday to Friday: 10:00 AM - 6:00 PM\n• Saturday & Sunday: 9:00 AM - 7:00 PM\n• Closed: Monday\n• Last Entry: 30 minutes before closing\n• National Holidays: 9:00 AM - 8:00 PM",
      rules: "📋 Museum Rules:\n\n• Photography allowed in designated areas only (no flash)\n• No food or beverages inside galleries\n• Maintain silence in exhibition areas\n• Children under 12 must be accompanied by adults\n• Large bags must be deposited at cloakroom\n• Do not touch exhibits",
      location: "📍 Address: Janpath Road, Central Delhi, New Delhi - 110011\n📞 Phone: +91-11-2301-9272\n📧 Email: info@nationalmuseum.gov.in\n🌐 Website: www.nationalmuseum.gov.in"
    },
    faq: {
      menu: "❓ Frequently Asked Questions:\n\n1️⃣ Can I cancel my booking?\n2️⃣ Is parking available?\n3️⃣ Are wheelchairs available?\n4️⃣ Is there a cafe inside?\n5️⃣ Can I get a guided tour?",
      cancel: "Yes! You can cancel your booking up to 24 hours before the visit for a full refund. Cancellations within 24 hours will incur a 20% fee.",
      parking: "Yes, the museum has a parking facility for both cars and two-wheelers. Parking is ₹50 for cars and ₹20 for two-wheelers.",
      wheelchair: "Absolutely! Wheelchairs are available free of charge at the entrance. The museum is fully accessible with ramps and elevators.",
      cafe: "Yes, we have a museum cafe on the ground floor offering snacks, beverages, and light meals. Open during museum hours.",
      guidedTour: "Yes! Guided tours are available in English, Hindi, and Arabic. Tours start every 2 hours from 10:00 AM. Cost: ₹200 per person."
    },
    fallback: "🤔 I'm not sure I understand. Could you please rephrase? You can also choose from the options below:",
    thanks: "Thank you for visiting the National Museum! Have a wonderful day! 🌟",
    backToMenu: "🔙 Returning to main menu..."
  },
  {
    lang: 'hi',
    greeting: "👋 राष्ट्रीय संग्रहालय में आपका स्वागत है! मैं आपका वर्चुअल सहायक हूँ। मैं आपकी कैसे मदद कर सकता हूँ?",
    languageSelected: "बहुत अच्छा! मैं आपसे हिंदी में बात करूंगा। 🇮🇳",
    mainMenu: "आप क्या करना चाहेंगे?\n\n🎫 टिकट बुक करें\nℹ️ संग्रहालय जानकारी\n❓ अक्सर पूछे जाने वाले प्रश्न\n📞 संपर्क करें",
    booking: {
      start: "🎫 चलिए टिकट बुक करते हैं! कृपया यात्रा की तारीख चुनें:",
      selectDate: "📅 कृपया अपनी पसंदीदा तारीख दर्ज करें (जैसे, 2026-03-15):",
      selectTimeSlot: "⏰ उपलब्ध समय स्लॉट:\n1️⃣ सुबह 10:00 - 11:30\n2️⃣ सुबह 11:30 - दोपहर 1:00\n3️⃣ दोपहर 1:00 - 2:30\n4️⃣ दोपहर 2:30 - शाम 4:00\n5️⃣ शाम 4:00 - 5:30\n6️⃣ शाम 5:30 - 7:00",
      selectCategory: "🎟️ टिकट श्रेणियाँ:\n1️⃣ वयस्क - ₹300\n2️⃣ बच्चा - ₹100\n3️⃣ वरिष्ठ नागरिक - ₹150\n4️⃣ छात्र - ₹150\n5️⃣ विदेशी नागरिक - ₹650",
      selectQuantity: "🔢 टिकटों की संख्या दर्ज करें (1-10):",
      paymentRedirect: "💳 भुगतान पर रीडायरेक्ट करना... कृपया नीचे 'भुगतान करें' बटन पर क्लिक करें।",
      success: "🎉 बुकिंग की पुष्टि! आपका टिकट तैयार हो गया है। अपनी यात्रा का आनंद लें!",
      cancelled: "❌ बुकिंग रद्द। कभी भी दोबारा शुरू कर सकते हैं!",
      slotFull: "⚠️ क्षमा करें, यह समय स्लॉट पूरी तरह से बुक है। कृपया कोई अन्य स्लॉट चुनें।"
    },
    info: {
      menu: "ℹ️ आप किस बारे में जानना चाहेंगे?\n\n1️⃣ संग्रहालय का इतिहास\n2️⃣ गैलरी और प्रदर्शनी\n3️⃣ खुलने का समय\n4️⃣ नियम और दिशानिर्देश\n5️⃣ आगामी कार्यक्रम\n6️⃣ स्थान और संपर्क",
      history: "🏛️ राष्ट्रीय संग्रहालय 1949 में स्थापित किया गया था। यह देश के सबसे बड़े संग्रहालयों में से एक है।",
      hours: "🕐 खुलने का समय:\n\n• मंगलवार से शुक्रवार: सुबह 10:00 - शाम 6:00\n• शनिवार और रविवार: सुबह 9:00 - शाम 7:00\n• बंद: सोमवार\n• अंतिम प्रवेश: बंद होने से 30 मिनट पहले",
      rules: "📋 संग्रहालय के नियम:\n\n• केवल निर्धारित क्षेत्रों में फोटोग्राफी (फ्लैश नहीं)\n• गैलरी में खाना-पीना मना है\n• प्रदर्शनी क्षेत्रों में शांति बनाए रखें\n• 12 साल से कम उम्र के बच्चे वयस्कों के साथ आएं",
      location: "📍 पता: जनपथ रोड, मध्य दिल्ली, नई दिल्ली - 110011\n📞 फोन: +91-11-2301-9272\n📧 ईमेल: info@nationalmuseum.gov.in"
    },
    faq: {
      menu: "❓ अक्सर पूछे जाने वाले प्रश्न:\n\n1️⃣ क्या मैं बुकिंग रद्द कर सकता हूँ?\n2️⃣ क्या पार्किंग उपलब्ध है?\n3️⃣ क्या व्हीलचेयर उपलब्ध हैं?\n4️⃣ क्या अंदर कैफे है?\n5️⃣ क्या गाइडेड टूर मिल सकता है?",
      cancel: "हाँ! आप यात्रा से 24 घंटे पहले तक पुरे रिफंड के लिए बुकिंग रद्द कर सकते हैं।",
      parking: "हाँ, संग्रहालय में कारों और दोपहिया वाहनों दोनों के लिए पार्किंग है।",
      wheelchair: "बिल्कुल! प्रवेश द्वार पर मुफ्त व्हीलचेयर उपलब्ध हैं। संग्रहालय पूरी तरह सुलभ है।",
      cafe: "हाँ, भूतल पर एक कैफे है जहाँ स्नैक्स और पेय उपलब्ध हैं।",
      guidedTour: "हाँ! गाइडेड टूर हिंदी, अंग्रेजी और अरबी में उपलब्ध हैं। लागत: ₹200 प्रति व्यक्ति।"
    },
    fallback: "🤔 मैं समझ नहीं पाया। कृपया दोबारा कहें या नीचे दिए विकल्पों में से चुनें:",
    thanks: "राष्ट्रीय संग्रहालय में आने के लिए धन्यवाद! आपका दिन शुभ हो! 🌟",
    backToMenu: "🔙 मुख्य मेनू पर वापस..."
  },
  {
    lang: 'bn',
    greeting: "👋 জাতীয় জাদুঘরে স্বাগতম! আমি আপনার ভার্চুয়াল সহকারী। আমি কীভাবে সাহায্য করতে পারি?",
    languageSelected: "চমৎকার! আমি আপনার সাথে বাংলায় কথা বলব। 🇮🇳",
    mainMenu: "আপনি কী করতে চান?\n\n🎫 টিকিট বুক করুন\nℹ️ জাদুঘরের তথ্য\n❓ প্রায়শই জিজ্ঞাসিত প্রশ্ন\n📞 যোগাযোগ করুন",
    booking: { start: "🎫 চলুন টিকিট বুক করি!", selectDate: "📅 দয়া করে আপনার পছন্দের তারিখ লিখুন:", selectTimeSlot: "⏰ উপলব্ধ সময় স্লট", selectCategory: "🎟️ টিকিটের শ্রেণী", selectQuantity: "🔢 টিকিটের সংখ্যা লিখুন (১-১০):", paymentRedirect: "💳 পেমেন্টে রিডাইরেক্ট করা হচ্ছে...", success: "🎉 বুকিং নিশ্চিত!", cancelled: "❌ বুকিং বাতিল।", slotFull: "⚠️ দুঃখিত, এই সময় স্লটটি পূর্ণ।" },
    info: { menu: "ℹ️ আপনি কী জানতে চান?", history: "🏛️ জাতীয় জাদুঘর ১৯৪৯ সালে প্রতিষ্ঠিত।", hours: "🕐 খোলার সময়: মঙ্গলবার-শুক্রবার ১০-৬, শনি-রবি ৯-৭, সোমবার বন্ধ", rules: "📋 নিয়ম: নির্ধারিত এলাকায় ফটোগ্রাফি, খাবার নিষিদ্ধ", location: "📍 জনপথ রোড, নতুন দিল্লি" },
    faq: { menu: "❓ FAQ", cancel: "হ্যাঁ! ২৪ ঘণ্টা আগে বাতিল করতে পারেন।", parking: "হ্যাঁ, পার্কিং আছে।", wheelchair: "বিনামূল্যে হুইলচেয়ার আছে।", cafe: "হ্যাঁ, ক্যাফে আছে।", guidedTour: "হ্যাঁ! ₹২০০ প্রতি জন।" },
    fallback: "🤔 বুঝতে পারিনি। আবার বলুন:", thanks: "ধন্যবাদ! 🌟", backToMenu: "🔙 মেনু..."
  },
  {
    lang: 'ta',
    greeting: "👋 தேசிய அருங்காட்சியகத்திற்கு வரவேற்கிறோம்!",
    languageSelected: "அருமை! நான் உங்களுடன் தமிழில் உரையாடுவேன்। 🇮🇳",
    mainMenu: "நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?\n\n🎫 டிக்கெட் முன்பதிவு\nℹ️ தகவல்\n❓ FAQ\n📞 தொடர்பு",
    booking: { start: "🎫 டிக்கெட் முன்பதிவு செய்வோம்!", selectDate: "📅 தேதியை உள்ளிடவும்:", selectTimeSlot: "⏰ நேர இடைவெளிகள்", selectCategory: "🎟️ டிக்கெட் வகைகள்", selectQuantity: "🔢 எண்ணிக்கை (1-10):", paymentRedirect: "💳 பணம் செலுத்துதலுக்கு...", success: "🎉 முன்பதிவு உறுதி!", cancelled: "❌ ரத்து.", slotFull: "⚠️ நிரம்பிவிட்டது." },
    info: { menu: "ℹ️ என்ன தெரிந்துகொள்ள விரும்புகிறீர்கள்?", history: "🏛️ 1949 இல் நிறுவப்பட்டது.", hours: "🕐 செவ்வாய்-வெள்ளி: 10-6, சனி-ஞாயிறு: 9-7, திங்கள் மூடப்பட்டது", rules: "📋 நிய‌ம‌ங்கள்", location: "📍 ஜன்பத் ரோடு, புதுடெல்லி" },
    faq: { menu: "❓ FAQ", cancel: "ஆம்! 24 மணி நேரத்திற்கு முன் ரத்து செய்யலாம்.", parking: "ஆம், பார்க்கிங் உள்ளது.", wheelchair: "இலவச சக்கர நாற்காலி.", cafe: "ஆம், காஃபே உள்ளது.", guidedTour: "ஆம்! ₹200 நபருக்கு." },
    fallback: "🤔 புரியவில்லை. மீண்டும் சொல்லுங்கள்:", thanks: "நன்றி! 🌟", backToMenu: "🔙 மெனு..."
  },
  {
    lang: 'te',
    greeting: "👋 జాతీయ మ్యూజియంకి స్వాగతం!",
    languageSelected: "బాగుంది! నేను మీతో తెలుగులో మాట్లాడతాను। 🇮🇳",
    mainMenu: "మీరు ఏమి చేయాలనుకుంటున్నారు?\n\n🎫 టిక్కెట్లు బుక్\nℹ️ సమాచారం\n❓ FAQ\n📞 సంప్రదించండి",
    booking: { start: "🎫 టిక్కెట్లు బుక్ చేద్దాం!", selectDate: "📅 తేదీ నమోదు చేయండి:", selectTimeSlot: "⏰ సమయ స్లాట్లు", selectCategory: "🎟️ టిక్కెట్ వర్గాలు", selectQuantity: "🔢 సంఖ్య (1-10):", paymentRedirect: "💳 చెల్లింపుకు...", success: "🎉 బుకింగ్ నిర్ధారించబడింది!", cancelled: "❌ రద్దు.", slotFull: "⚠️ స్లాట్ నిండింది." },
    info: { menu: "ℹ️ ఏమి తెలుసుకోవాలి?", history: "🏛️ 1949 లో స్థాపించబడింది.", hours: "🕐 మంగళ-శుక్ర: 10-6, శని-ఆది: 9-7, సోమవారం బంద్", rules: "📋 నియమాలు", location: "📍 జన్‌పథ్ రోడ్, న్యూఢిల్లీ" },
    faq: { menu: "❓ FAQ", cancel: "అవును! 24 గంటల ముందు రద్దు చేయవచ్చు.", parking: "అవును, పార్కింగ్ ఉంది.", wheelchair: "ఉచిత వీల్‌చెయిర్.", cafe: "అవును, కేఫ్ ఉంది.", guidedTour: "అవును! ₹200." },
    fallback: "🤔 అర్థం కాలేదు. మళ్ళీ చెప్పండి:", thanks: "ధన్యవాదాలు! 🌟", backToMenu: "🔙 మెనూ..."
  },
  {
    lang: 'mr',
    greeting: "👋 राष्ट्रीय संग्रहालयात आपले स्वागत आहे!",
    languageSelected: "छान! मी तुमच्याशी मराठीत बोलेन। 🇮🇳",
    mainMenu: "तुम्हाला काय करायचे आहे?\n\n🎫 तिकीट बुक करा\nℹ️ माहिती\n❓ FAQ\n📞 संपर्क",
    booking: { start: "🎫 तिकीट बुक करूया!", selectDate: "📅 तारीख प्रविष्ट करा:", selectTimeSlot: "⏰ उपलब्ध वेळा", selectCategory: "🎟️ तिकीट प्रकार", selectQuantity: "🔢 संख्या (1-10):", paymentRedirect: "💳 पेमेंटकडे...", success: "🎉 बुकिंग पुष्टी!", cancelled: "❌ रद्द.", slotFull: "⚠️ स्लॉट भरला." },
    info: { menu: "ℹ️ काय जाणून घ्यायचे?", history: "🏛️ 1949 मध्ये स्थापित.", hours: "🕐 मंगळ-शुक्र: 10-6, शनि-रवि: 9-7, सोमवार बंद", rules: "📋 नियम", location: "📍 जनपथ रोड, नवी दिल्ली" },
    faq: { menu: "❓ FAQ", cancel: "होय! 24 तासांपूर्वी रद्द करता येते.", parking: "होय, पार्किंग उपलब्ध.", wheelchair: "मोफत व्हीलचेअर.", cafe: "होय, कॅफे आहे.", guidedTour: "होय! ₹200." },
    fallback: "🤔 समजले नाही. पुन्हा सांगा:", thanks: "धन्यवाद! 🌟", backToMenu: "🔙 मेनू..."
  },
  {
    lang: 'gu',
    greeting: "👋 રાષ્ટ્રીય સંગ્રહાલયમાં આપનું સ્વાગત છે!",
    languageSelected: "સરસ! હું તમારી સાથે ગુજરાતીમાં વાત કરીશ। 🇮🇳",
    mainMenu: "તમે શું કરવા માંગો છો?\n\n🎫 ટિકિટ બુક\nℹ️ માહિતી\n❓ FAQ\n📞 સંપર્ક",
    booking: { start: "🎫 ટિકિટ બુક કરીએ!", selectDate: "📅 તારીખ દાખલ કરો:", selectTimeSlot: "⏰ ઉપલબ્ધ સમય", selectCategory: "🎟️ ટિકિટ પ્રકાર", selectQuantity: "🔢 સંખ્યા (1-10):", paymentRedirect: "💳 ચુકવણી...", success: "🎉 બુકિંગ પુષ્ટિ!", cancelled: "❌ રદ.", slotFull: "⚠️ ભરાઈ ગયો." },
    info: { menu: "ℹ️ શું જાણવું છે?", history: "🏛️ 1949 માં સ્થાપિત.", hours: "🕐 મંગળ-શુક્ર: 10-6, શનિ-રવિ: 9-7, સોમવાર બંધ", rules: "📋 નિયમો", location: "📍 જનપથ રોડ, નવી દિલ્હી" },
    faq: { menu: "❓ FAQ", cancel: "હા! 24 કલાક પહેલાં રદ.", parking: "હા, ઉપલબ્ધ.", wheelchair: "મફત વ્હીલચેર.", cafe: "હા, કેફે છે.", guidedTour: "હા! ₹200." },
    fallback: "🤔 સમજાયું નહીં. ફરીથી કહો:", thanks: "આભાર! 🌟", backToMenu: "🔙 મેનૂ..."
  },
  {
    lang: 'kn',
    greeting: "👋 ರಾಷ್ಟ್ರೀಯ ವಸ್ತುಸಂಗ್ರಹಾಲಯಕ್ಕೆ ಸ್ವಾಗತ!",
    languageSelected: "ಅದ್ಭುತ! ನಾನು ನಿಮ್ಮೊಂದಿಗೆ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುತ್ತೇನೆ। 🇮🇳",
    mainMenu: "ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?\n\n🎫 ಟಿಕೆಟ್ ಬುಕ್\nℹ️ ಮಾಹಿತಿ\n❓ FAQ\n📞 ಸಂಪರ್ಕ",
    booking: { start: "🎫 ಟಿಕೆಟ್ ಬುಕ್ ಮಾಡೋಣ!", selectDate: "📅 ದಿನಾಂಕ ನಮೂದಿಸಿ:", selectTimeSlot: "⏰ ಲಭ್ಯ ಸಮಯ", selectCategory: "🎟️ ಟಿಕೆಟ್ ವರ್ಗ", selectQuantity: "🔢 ಸಂಖ್ಯೆ (1-10):", paymentRedirect: "💳 ಪಾವತಿಗೆ...", success: "🎉 ಬುಕಿಂಗ್ ದೃಢೀಕೃತ!", cancelled: "❌ ರದ್ದು.", slotFull: "⚠️ ಸ್ಲಾಟ್ ತುಂಬಿದೆ." },
    info: { menu: "ℹ️ ಏನು ತಿಳಿಯಬೇಕು?", history: "🏛️ 1949 ರಲ್ಲಿ ಸ್ಥಾಪಿತ.", hours: "🕐 ಮಂ-ಶು: 10-6, ಶ-ಭಾ: 9-7, ಸೋಮವಾರ ರಜೆ", rules: "📋 ನಿಯಮ", location: "📍 ಜನಪಥ ರಸ್ತೆ, ನವದೆಹಲಿ" },
    faq: { menu: "❓ FAQ", cancel: "ಹೌದು! 24 ಗಂಟೆ ಮೊದಲು ರದ್ದು.", parking: "ಹೌದು, ಲಭ್ಯ.", wheelchair: "ಉಚಿತ ವೀಲ್‌ಚೇರ್.", cafe: "ಹೌದು, ಕೆಫೆ ಇದೆ.", guidedTour: "ಹೌದು! ₹200." },
    fallback: "🤔 ಅರ್ಥವಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಹೇಳಿ:", thanks: "ಧನ್ಯವಾದ! 🌟", backToMenu: "🔙 ಮೆನು..."
  },
  {
    lang: 'ml',
    greeting: "👋 ദേശീയ മ്യൂസിയത്തിലേക്ക് സ്വാഗതം!",
    languageSelected: "കൊള്ളാം! ഞാൻ നിങ്ങളോട് മലയാളത്തിൽ സംസാരിക്കാം। 🇮🇳",
    mainMenu: "എന്താണ് ചെയ്യേണ്ടത്?\n\n🎫 ടിക്കറ്റ് ബുക്ക്\nℹ️ വിവരങ്ങൾ\n❓ FAQ\n📞 ബന്ധപ്പെടുക",
    booking: { start: "🎫 ടിക്കറ്റ് ബുക്ക് ചെയ്യാം!", selectDate: "📅 തീയതി നൽകുക:", selectTimeSlot: "⏰ ലഭ്യമായ സമയം", selectCategory: "🎟️ ടിക്കറ്റ് വിഭാഗം", selectQuantity: "🔢 എണ്ണം (1-10):", paymentRedirect: "💳 പേയ്‌മെന്റ്...", success: "🎉 ബുക്കിംഗ് സ്ഥിരീകരിച്ചു!", cancelled: "❌ റദ്ദാക്കി.", slotFull: "⚠️ സ്ലോട്ട് നിറഞ്ഞു." },
    info: { menu: "ℹ️ എന്താണ് അറിയേണ്ടത്?", history: "🏛️ 1949-ൽ സ്ഥാപിതം.", hours: "🕐 ചൊ-വെ: 10-6, ശ-ഞാ: 9-7, തിങ്കൾ അവധി", rules: "📋 നിയമങ്ങൾ", location: "📍 ജൻപഥ് റോഡ്, ന്യൂഡൽഹി" },
    faq: { menu: "❓ FAQ", cancel: "അതേ! 24 മണിക്കൂർ മുൻപ് റദ്ദാക്കാം.", parking: "അതേ, ലഭ്യം.", wheelchair: "സൗജന്യ വീൽചെയർ.", cafe: "അതേ, കഫേ ഉണ്ട്.", guidedTour: "അതേ! ₹200." },
    fallback: "🤔 മനസ്സിലായില്ല. വീണ്ടും പറയുക:", thanks: "നന്ദി! 🌟", backToMenu: "🔙 മെനു..."
  },
  {
    lang: 'pa',
    greeting: "👋 ਰਾਸ਼ਟਰੀ ਅਜਾਇਬ ਘਰ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ!",
    languageSelected: "ਬਹੁਤ ਵਧੀਆ! ਮੈਂ ਤੁਹਾਡੇ ਨਾਲ ਪੰਜਾਬੀ ਵਿੱਚ ਗੱਲ ਕਰਾਂਗਾ। 🇮🇳",
    mainMenu: "ਤੁਸੀਂ ਕੀ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?\n\n🎫 ਟਿਕਟ ਬੁੱਕ\nℹ️ ਜਾਣਕਾਰੀ\n❓ FAQ\n📞 ਸੰਪਰਕ",
    booking: { start: "🎫 ਟਿਕਟ ਬੁੱਕ ਕਰੀਏ!", selectDate: "📅 ਤਾਰੀਖ ਦਰਜ ਕਰੋ:", selectTimeSlot: "⏰ ਉਪਲਬਧ ਸਮੇਂ", selectCategory: "🎟️ ਟਿਕਟ ਕਿਸਮ", selectQuantity: "🔢 ਗਿਣਤੀ (1-10):", paymentRedirect: "💳 ਭੁਗਤਾਨ...", success: "🎉 ਬੁਕਿੰਗ ਪੱਕੀ!", cancelled: "❌ ਰੱਦ.", slotFull: "⚠️ ਭਰਿਆ ਹੋਇਆ." },
    info: { menu: "ℹ️ ਕੀ ਜਾਣਨਾ?", history: "🏛️ 1949 ਵਿੱਚ ਸਥਾਪਿਤ.", hours: "🕐 ਮੰ-ਸ਼ੁ: 10-6, ਸ਼-ਐ: 9-7, ਸੋਮਵਾਰ ਬੰਦ", rules: "📋 ਨਿਯਮ", location: "📍 ਜਨਪਥ ਰੋਡ, ਨਵੀਂ ਦਿੱਲੀ" },
    faq: { menu: "❓ FAQ", cancel: "ਹਾਂ! 24 ਘੰਟੇ ਪਹਿਲਾਂ ਰੱਦ.", parking: "ਹਾਂ, ਉਪਲਬਧ.", wheelchair: "ਮੁਫ਼ਤ ਵੀਲਚੇਅਰ.", cafe: "ਹਾਂ, ਕੈਫੇ ਹੈ.", guidedTour: "ਹਾਂ! ₹200." },
    fallback: "🤔 ਸਮਝ ਨਹੀਂ ਆਈ. ਦੁਬਾਰਾ ਦੱਸੋ:", thanks: "ਧੰਨਵਾਦ! 🌟", backToMenu: "🔙 ਮੈਨੂ..."
  },
  {
    lang: 'or',
    greeting: "👋 ଜାତୀୟ ସଂଗ୍ରହାଳୟକୁ ସ୍ୱାଗତ!",
    languageSelected: "ବହୁତ ଭଲ! ମୁଁ ଆପଣଙ୍କ ସହ ଓଡ଼ିଆରେ କଥା ହେବି। 🇮🇳",
    mainMenu: "ଆପଣ କ'ଣ କରିବାକୁ ଚାହୁଁଛନ୍ତି?\n\n🎫 ଟିକେଟ ବୁକ\nℹ️ ସୂଚନା\n❓ FAQ\n📞 ଯୋଗାଯୋଗ",
    booking: { start: "🎫 ଟିକେଟ ବୁକ କରିବା!", selectDate: "📅 ତାରିଖ ଲେଖନ୍ତୁ:", selectTimeSlot: "⏰ ଉପଲବ୍ଧ ସମୟ", selectCategory: "🎟️ ଟିକେଟ ପ୍ରକାର", selectQuantity: "🔢 ସଂଖ୍ୟା (1-10):", paymentRedirect: "💳 ଦେୟ...", success: "🎉 ବୁକିଂ ନିଶ୍ଚିତ!", cancelled: "❌ ରଦ୍ଦ.", slotFull: "⚠️ ସ୍ଲଟ ପୂର୍ଣ." },
    info: { menu: "ℹ️ କ'ଣ ଜାଣିବେ?", history: "🏛️ 1949 ରେ ସ୍ଥାପିତ.", hours: "🕐 ମଂ-ଶୁ: 10-6, ଶ-ର: 9-7, ସୋମବାର ବନ୍ଦ", rules: "📋 ନିୟମ", location: "📍 ଜନପଥ ରୋଡ, ନୂଆଦିଲ୍ଲୀ" },
    faq: { menu: "❓ FAQ", cancel: "ହଁ! 24 ଘଣ୍ଟା ଆଗରୁ ରଦ୍ଦ.", parking: "ହଁ, ଉପಲବ୍ଧ.", wheelchair: "ମାଗଣା ହ୍ୱିଲଚେୟାର.", cafe: "ହଁ, କାଫେ ଅଛି.", guidedTour: "ହଁ! ₹200." },
    fallback: "🤔 ବୁଝିଲି ନାହିଁ. ପୁଣି କୁହନ୍ତୁ:", thanks: "ଧନ୍ୟବାଦ! 🌟", backToMenu: "🔙 ମେନୁ..."
  },
  {
    lang: 'as',
    greeting: "👋 ৰাষ্ট্ৰীয় সংগ্ৰহালয়লৈ স্বাগতম!",
    languageSelected: "বৰ ভাল! মই আপোনাৰ লগত অসমীয়াত কথা পাতিম। 🇮🇳",
    mainMenu: "আপুনি কি কৰিব বিচাৰে?\n\n🎫 টিকট বুক\nℹ️ তথ্য\n❓ FAQ\n📞 যোগাযোগ",
    booking: { start: "🎫 টিকট বুক কৰোঁ!", selectDate: "📅 তাৰিখ দিয়ক:", selectTimeSlot: "⏰ উপলব্ধ সময়", selectCategory: "🎟️ টিকট প্ৰকাৰ", selectQuantity: "🔢 সংখ্যা (১-১০):", paymentRedirect: "💳 পেমেণ্ট...", success: "🎉 বুকিং নিশ্চিত!", cancelled: "❌ বাতিল.", slotFull: "⚠️ স্লট পূৰ্ণ." },
    info: { menu: "ℹ️ কি জানিব?", history: "🏛️ ১৯৪৯ চনত স্থাপিত.", hours: "🕐 মং-শু: ১০-৬, শ-দে: ৯-৭, সোমবাৰ বন্ধ", rules: "📋 নিয়ম", location: "📍 জনপথ ৰোড, নতুন দিল্লী" },
    faq: { menu: "❓ FAQ", cancel: "হয়! ২৪ ঘণ্টা আগতে বাতিল.", parking: "হয়, উপলব্ধ.", wheelchair: "বিনামূলীয়া হুইলচেয়াৰ.", cafe: "হয়, কেফে আছে.", guidedTour: "হয়! ₹২০০." },
    fallback: "🤔 বুজা নাই. আকৌ কওক:", thanks: "ধন্যবাদ! 🌟", backToMenu: "🔙 মেনু..."
  },
  {
    lang: 'ur',
    greeting: "👋 قومی عجائب گھر میں خوش آمدید!",
    languageSelected: "بہت اچھا! میں آپ سے اردو میں بات کروں گا۔ 🇮🇳",
    mainMenu: "آپ کیا کرنا چاہتے ہیں؟\n\n🎫 ٹکٹ بک کریں\nℹ️ معلومات\n❓ FAQ\n📞 رابطہ",
    booking: { start: "🎫 ٹکٹ بک کرتے ہیں!", selectDate: "📅 تاریخ درج کریں:", selectTimeSlot: "⏰ دستیاب اوقات", selectCategory: "🎟️ ٹکٹ کی قسم", selectQuantity: "🔢 تعداد (1-10):", paymentRedirect: "💳 ادائیگی...", success: "🎉 بکنگ کی تصدیق!", cancelled: "❌ منسوخ.", slotFull: "⚠️ سلاٹ بھرا ہوا." },
    info: { menu: "ℹ️ کیا جاننا ہے?", history: "🏛️ 1949 میں قائم.", hours: "🕐 منگل-جمعہ: 10-6, ہفتہ-اتوار: 9-7, پیر بند", rules: "📋 قواعد", location: "📍 جن پتھ روڈ، نئی دہلی" },
    faq: { menu: "❓ FAQ", cancel: "ہاں! 24 گھنٹے پہلے منسوخ.", parking: "ہاں، دستیاب.", wheelchair: "مفت وہیل چیئر.", cafe: "ہاں، کیفے ہے.", guidedTour: "ہاں! ₹200." },
    fallback: "🤔 سمجھ نہیں آیا۔ دوبارہ کہیں:", thanks: "شکریہ! 🌟", backToMenu: "🔙 مینو..."
  }
];

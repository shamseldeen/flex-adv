import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ar" | "en";

interface Translations {
  // Nav
  home: string;
  about: string;
  portfolio: string;
  services: string;
  gallery: string;
  contact: string;
  startProject: string;
  // Hero
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  exploreWork: string;
  contactUs: string;
  heroBadge1: string;
  heroBadge2: string;
  heroBadge3: string;
  // Stats
  statsProjects: string;
  statsClients: string;
  statsYears: string;
  statsTeam: string;
  // Services section
  servicesTitle: string;
  servicesSubtitle: string;
  viewAll: string;
  // Portfolio section
  portfolioTitle: string;
  portfolioSubtitle: string;
  viewGallery: string;
  // Why us
  whyUsTitle: string;
  whyUsSubtitle: string;
  competitiveBadge: string;
  whyFeature1Title: string; whyFeature1Desc: string;
  whyFeature2Title: string; whyFeature2Desc: string;
  whyFeature3Title: string; whyFeature3Desc: string;
  whyFeature4Title: string; whyFeature4Desc: string;
  whyFeature5Title: string; whyFeature5Desc: string;
  whyFeature6Title: string; whyFeature6Desc: string;
  // CTA
  ctaTitle: string;
  ctaSubtitle: string;
  startNow: string;
  // About page
  aboutBadge: string;
  aboutHero1: string;
  aboutHero2: string;
  aboutHeroDesc: string;
  storyTitle: string;
  storyHighlight: string;
  storyP1: string;
  storyP2: string;
  storyP3: string;
  statFounded: string;
  statProjects: string;
  statClients: string;
  statRegions: string;
  visionLabel: string;
  visionTitle: string;
  visionText: string;
  missionLabel: string;
  missionTitle: string;
  missionText: string;
  valuesTitle: string;
  valuesHighlight: string;
  valuesSubtitle: string;
  value1Title: string; value1Desc: string;
  value2Title: string; value2Desc: string;
  value3Title: string; value3Desc: string;
  value4Title: string; value4Desc: string;
  value5Title: string; value5Desc: string;
  value6Title: string; value6Desc: string;
  officesTitle: string;
  officesHighlight: string;
  office1City: string; office1Desc: string; office1Badge: string;
  office2City: string; office2Desc: string; office2Badge: string;
  aboutCtaTitle: string;
  aboutCtaDesc: string;
  aboutCtaBtn: string;
  // Services page
  servicesBadge: string;
  servicesPageTitle: string;
  servicesPageHighlight: string;
  servicesPageDesc: string;
  workshopTitle: string;
  workshopHighlight: string;
  workshopDesc: string;
  workshopBtn: string;
  workshop1: string; workshop2: string; workshop3: string;
  workshop4: string; workshop5: string; workshop6: string;
  servicesCtaTitle: string;
  servicesCtaDesc: string;
  servicesCtaBtn: string;
  // Contact page
  contactBadge: string;
  contactHero1: string;
  contactHero2: string;
  contactHeroDesc: string;
  contactInfoTitle: string;
  contactOfficesTitle: string;
  contactPhoneTitle: string;
  contactEmailTitle: string;
  contactWhatsappTitle: string;
  contactHoursTitle: string;
  contactHoursDays: string;
  contactHoursTime: string;
  contactDammam: string;
  contactDammamRegion: string;
  contactRiyadh: string;
  contactRiyadhRegion: string;
  formTitle: string;
  formName: string;
  formPhone: string;
  formEmail: string;
  formEmailOptional: string;
  formMessage: string;
  formNamePlaceholder: string;
  formMessagePlaceholder: string;
  formSubmit: string;
  formSubmitting: string;
  formSuccessTitle: string;
  formSuccessDesc: string;
  formErrorTitle: string;
  formErrorDesc: string;
  formConnError: string;
  formNameError: string;
  formPhoneError: string;
  formEmailError: string;
  formMessageError: string;
  // Footer
  footerBio: string;
  footerQuickLinks: string;
  footerServicesTitle: string;
  footerContactTitle: string;
  footerCopyright: string;
  footerService1: string; footerService2: string; footerService3: string;
  footerService4: string; footerService5: string; footerService6: string;
  // Gallery page
  galleryBadgeSuffix: string;
  galleryPageTitle: string;
  galleryPageHighlight: string;
  galleryPageDesc: string;
  filterAll: string;
  noImages: string;
  galleryCTATitle: string;
  galleryCTADesc: string;
  galleryCTABtn: string;
  // Portfolio page
  portfolioBadge: string;
  portfolioPageTitle: string;
  portfolioPageHighlight: string;
  portfolioPageDesc: string;
  noProjects: string;
  noProjectsDesc: string;
  clientLabel: string;
}

const ar: Translations = {
  // Nav
  home: "الرئيسية",
  about: "من نحن",
  portfolio: "أعمالنا",
  services: "خدماتنا",
  gallery: "ألبوم الصور",
  contact: "تواصل معنا",
  startProject: "ابدأ مشروعك",
  // Hero
  heroTitle1: "نصنع المستحيل",
  heroTitle2: "ونترك أثراً لا يُنسى",
  heroSubtitle: "فلكس للدعاية والإعلان تحوّل رؤيتك إلى واقع ملموس. حملات إعلانية جريئة ومبتكرة تأسر العقول وتسيطر على السوق.",
  exploreWork: "استكشف أعمالنا",
  contactUs: "تواصل معنا",
  heroBadge1: "وكالة إعلانية إبداعية",
  heroBadge2: "إنتاج مرئي احترافي",
  heroBadge3: "هوية بصرية مميزة",
  // Stats
  statsProjects: "مشروع ناجح",
  statsClients: "عميل راضٍ",
  statsYears: "سنوات خبرة",
  statsTeam: "براند يثق بنا",
  // Services section
  servicesTitle: "ماذا نقدم؟",
  servicesSubtitle: "مجموعة متكاملة من الخدمات الإعلانية والإبداعية مصممة لرفع قيمة علامتك التجارية وجعلها تتصدر المنافسة.",
  viewAll: "عرض كل الخدمات",
  // Portfolio section
  portfolioTitle: "أعمالنا البارزة",
  portfolioSubtitle: "بعض من المشاريع التي نفتخر بها. نضع لمستنا السحرية في كل تفصيل.",
  viewGallery: "تصفح المعرض الكامل",
  // Why us
  whyUsTitle: "لماذا تختار فلكس؟",
  whyUsSubtitle: "نجمع بين الإبداع اللامحدود والخبرة العميقة في السوق السعودي لنقدم نتائج تتجاوز التوقعات.",
  competitiveBadge: "ميزتنا التنافسية",
  whyFeature1Title: "خبرة أكثر من 11 عاماً",
  whyFeature1Desc: "منذ 2015م ونحن نعمل مع شركات من المنطقة الشرقية والرياض وعموم المملكة.",
  whyFeature2Title: "أفكار خارج الصندوق",
  whyFeature2Desc: "نتحدى القوالب التقليدية ونبتكر حلولاً إعلانية لم يسبق تصورها.",
  whyFeature3Title: "التسليم في الموعد دائماً",
  whyFeature3Desc: "نلتزم بالمواعيد النهائية دون التنازل عن الجودة أو الدقة في التفاصيل.",
  whyFeature4Title: "جودة المواد لا تُساوَم",
  whyFeature4Desc: "نختار أجود خامات الطباعة واللافتات والتشطيبات — لأن كل تفصيل يعكس علامتك التجارية.",
  whyFeature5Title: "تصميم وتصنيع وتركيب",
  whyFeature5Desc: "كل مراحل المشروع تحت سقف واحد — من أول رسم تصميمي حتى آخر مسمار في الموقع.",
  whyFeature6Title: "حضور ميداني فعلي",
  whyFeature6Desc: "فريقنا يصل إليك في موقع المشروع — نقيس ونخطط ونشرف على التركيب بأنفسنا.",
  // CTA
  ctaTitle: "مستعد لإحداث ضجة؟",
  ctaSubtitle: "لنتحدث عن مشروعك القادم وكيف يمكننا تحويله إلى قصة نجاح.",
  startNow: "ابدأ الآن",
  // About page
  aboutBadge: "قصة فلكس",
  aboutHero1: "من نحن؟",
  aboutHero2: "وكالة تصنع الفارق",
  aboutHeroDesc: "تأسست وكالة فلكس عام 2015م في مدينة الدمام، وحققت الوكالة خلال السنوات الأخيرة نمواً وتطوراً كبيراً في أعمالها ونشاطاتها وخدماتها في جميع المجالات الإعلانية.",
  storyTitle: "حكاية نجاح",
  storyHighlight: "حقيقية",
  storyP1: "تأسست وكالة فلكس للدعاية والإعلان عام 2015م في مدينة الدمام بالمملكة العربية السعودية، وتغطي أعمال الوكالة حالياً جميع مناطق المملكة العربية السعودية.",
  storyP2: "وقد نفذت الوكالة عدداً من المشاريع والحملات الإعلانية، كما قامت بتنظيم العديد من المهرجانات والحفلات في المنطقة الشرقية وخارجها، وبفضل الله أولاً ثم بمجهودات جبارة من الطاقم الفني والإداري تمكنت الوكالة في وقت قياسي من تحقيق العديد من النجاحات والإنجازات الهامة.",
  storyP3: "وتركت بصمة مميزة لدى عملائها وذلك من خلال القيم العالية التي تقوم عليها سياسة الوكالة في خدمة عملائها، عن طريق الالتزام بالمصداقية والأمانة في جميع تعاملاتها وباعتماد أعلى معايير الجودة في جميع الأعمال.",
  statFounded: "سنة التأسيس",
  statProjects: "مشروع منجز",
  statClients: "عميل راضٍ",
  statRegions: "مناطق مغطاة",
  visionLabel: "OUR VISION",
  visionTitle: "رؤيتنا",
  visionText: "رؤيتنا في وكالة فلكس أن نكون أحد الوكالات الرائدة في تقديم الحلول التسويقية والخدمات الإعلانية المبتكرة، وأن نكون سباقين في تقديم جميع خدمات الطباعة الحديثة بتقنيات متطورة وفائقة الجودة، وأن نقدم أرقى الخدمات لعملائنا داخل المملكة العربية السعودية وخارجها.",
  missionLabel: "OUR MISSION",
  missionTitle: "رسالتنا",
  missionText: "نسعى دائماً في فلكس لتقديم أفضل جودة في الخدمات والإعلانات للوصول إلى أعلى مستويات رضا العملاء. لتحقيق أهدافنا، نستخدم أحدث وأكثر التقنيات ابتكاراً في معدات الطباعة، ونختار أجود المواد، ونؤكد على المعايير والمواصفات المعتمدة في المملكة العربية السعودية.",
  valuesTitle: "قيمنا",
  valuesHighlight: "الجوهرية",
  valuesSubtitle: "هذه القيم هي الأساس الذي تقوم عليه سياستنا في خدمة عملائنا.",
  value1Title: "المصداقية والأمانة", value1Desc: "نلتزم بالصدق الكامل في جميع تعاملاتنا مع عملائنا وشركائنا.",
  value2Title: "أعلى معايير الجودة", value2Desc: "نعتمد أعلى معايير الجودة في جميع الأعمال دون أي تنازل.",
  value3Title: "الالتزام بالمواعيد", value3Desc: "نلتزم بالمواعيد المتفق عليها ونسعى دائماً للتسليم في الوقت المحدد.",
  value4Title: "رضا العملاء أولاً", value4Desc: "نضع رضا عملائنا في مقدمة أولوياتنا ونسعى لتجاوز توقعاتهم.",
  value5Title: "الابتكار المستمر", value5Desc: "نواكب أحدث التقنيات والتوجهات العالمية في صناعة الإعلان.",
  value6Title: "التغطية الشاملة", value6Desc: "نغطي جميع مناطق المملكة العربية السعودية لخدمة كل عملائنا.",
  officesTitle: "مكاتبنا",
  officesHighlight: "في المملكة",
  office1City: "الدمام", office1Desc: "المقر الرئيسي — المنطقة الشرقية، المملكة العربية السعودية", office1Badge: "المقر الرئيسي",
  office2City: "الرياض", office2Desc: "مكتب الرياض — المنطقة الوسطى، المملكة العربية السعودية", office2Badge: "فرع الرياض",
  aboutCtaTitle: "جاهز للعمل معنا؟",
  aboutCtaDesc: "دعنا نتحدث عن مشروعك القادم ونقدم لك حلاً إعلانياً يحقق أهدافك.",
  aboutCtaBtn: "تواصل معنا",
  // Services page
  servicesBadge: "ما نقدمه",
  servicesPageTitle: "خدماتنا",
  servicesPageHighlight: "الإبداعية",
  servicesPageDesc: "نقدم في فلكس حزمة شاملة من خدمات الدعاية والإعلان والطباعة والتصنيع، نستخدم أحدث التقنيات وأجود المواد وفق المعايير المعتمدة في المملكة العربية السعودية.",
  workshopTitle: "ورشة التصنيع",
  workshopHighlight: "المتكاملة",
  workshopDesc: "نصنع جميع أنواع اللوحات الإعلانية بأعلى جودة وأحدث تقنيات التصنيع.",
  workshopBtn: "اطلب عرض سعر",
  workshop1: "لوحات فلكس فيس",
  workshop2: "لوحات اليونيبول",
  workshop3: "لوحات الأحرف المجسمة",
  workshop4: "وجهات الكلادينج",
  workshop5: "لوحات البنر",
  workshop6: "استيكر السيارات",
  servicesCtaTitle: "جاهز للخطوة القادمة؟",
  servicesCtaDesc: "دعنا نعمل معاً لتحويل أفكارك إلى حملة إعلانية تتحدث عنها السوق.",
  servicesCtaBtn: "اطلب عرض سعر",
  // Contact page
  contactBadge: "نحن هنا للاستماع",
  contactHero1: "تواصل",
  contactHero2: "معنا",
  contactHeroDesc: "شاركنا رؤيتك وسنقوم بتحويلها إلى واقع يفوق توقعاتك. فريقنا جاهز للرد على استفساراتك.",
  contactInfoTitle: "معلومات التواصل",
  contactOfficesTitle: "مكاتبنا",
  contactPhoneTitle: "الهاتف",
  contactEmailTitle: "البريد الإلكتروني",
  contactWhatsappTitle: "واتساب",
  contactHoursTitle: "ساعات العمل",
  contactHoursDays: "الأحد — الخميس",
  contactHoursTime: "9:00 صباحاً — 6:00 مساءً",
  contactDammam: "الدمام — المقر الرئيسي",
  contactDammamRegion: "المنطقة الشرقية، المملكة العربية السعودية",
  contactRiyadh: "الرياض — فرع",
  contactRiyadhRegion: "المنطقة الوسطى، المملكة العربية السعودية",
  formTitle: "أرسل لنا رسالة",
  formName: "الاسم الكامل",
  formPhone: "رقم الهاتف",
  formEmail: "البريد الإلكتروني",
  formEmailOptional: "(اختياري)",
  formMessage: "تفاصيل المشروع أو الاستفسار",
  formNamePlaceholder: "أدخل اسمك",
  formMessagePlaceholder: "أخبرنا عن مشروعك أو ما تحتاجه...",
  formSubmit: "إرسال الرسالة",
  formSubmitting: "جاري الإرسال...",
  formSuccessTitle: "تم الإرسال بنجاح",
  formSuccessDesc: "سنتواصل معك في أقرب وقت ممكن.",
  formErrorTitle: "حدث خطأ",
  formErrorDesc: "يرجى المحاولة مرة أخرى.",
  formConnError: "تعذر إرسال رسالتك. يرجى المحاولة لاحقاً.",
  formNameError: "الاسم يجب أن يكون حرفين على الأقل",
  formPhoneError: "رقم الهاتف غير صحيح",
  formEmailError: "البريد الإلكتروني غير صحيح",
  formMessageError: "الرسالة قصيرة جداً",
  // Footer
  footerBio: "تأسست وكالة فلكس للدعاية والإعلان عام 2015م في مدينة الدمام. وتغطي أعمال الوكالة جميع مناطق المملكة العربية السعودية بأعلى معايير الجودة والاحترافية.",
  footerQuickLinks: "روابط سريعة",
  footerServicesTitle: "خدماتنا",
  footerContactTitle: "تواصل معنا",
  footerCopyright: "فلكس للدعاية والإعلان — جميع الحقوق محفوظة.",
  footerService1: "الطباعة الرقمية",
  footerService2: "الهوية المؤسسية",
  footerService3: "إدارة الفعاليات",
  footerService4: "التصميم 3D",
  footerService5: "استيكر السيارات",
  footerService6: "ورشة التصنيع",
  // Gallery page
  galleryBadgeSuffix: "+ صورة حقيقية من مشاريعنا",
  galleryPageTitle: "ألبوم",
  galleryPageHighlight: "المشاريع",
  galleryPageDesc: "صور حقيقية من أعمالنا المنفذة — طباعة، تصنيع، فعاليات، هويات مؤسسية وأكثر.",
  filterAll: "الكل",
  noImages: "لا توجد صور في هذه الفئة",
  galleryCTATitle: "أريد مشروعاً مثل هذا",
  galleryCTADesc: "تواصل معنا الآن وسنقدم لك عرض سعر مجاني في نفس اليوم.",
  galleryCTABtn: "اطلب عرض سعر مجاني",
  // Portfolio page
  portfolioBadge: "معرض أعمالنا",
  portfolioPageTitle: "مشاريع",
  portfolioPageHighlight: "مميزة",
  portfolioPageDesc: "تصفح أرشيفنا المليء بالحملات الإعلانية الناجحة والمشاريع الإبداعية التي ساهمت في تغيير مسار علامات تجارية كبرى.",
  noProjects: "لا توجد مشاريع",
  noProjectsDesc: "لم يتم العثور على مشاريع في هذا القسم بعد.",
  clientLabel: "العميل:",
};

const en: Translations = {
  // Nav
  home: "Home",
  about: "About",
  portfolio: "Portfolio",
  services: "Services",
  gallery: "Gallery",
  contact: "Contact",
  startProject: "Start Project",
  // Hero
  heroTitle1: "We Create the Impossible",
  heroTitle2: "and Leave a Lasting Impact",
  heroSubtitle: "Flex for Advertising transforms your vision into reality. Bold, innovative campaigns that capture minds and dominate the market.",
  exploreWork: "Explore Our Work",
  contactUs: "Contact Us",
  heroBadge1: "Creative Advertising Agency",
  heroBadge2: "Professional Visual Production",
  heroBadge3: "Distinctive Brand Identity",
  // Stats
  statsProjects: "Successful Projects",
  statsClients: "Satisfied Clients",
  statsYears: "Years Experience",
  statsTeam: "Trusted Brands",
  // Services section
  servicesTitle: "What We Offer",
  servicesSubtitle: "A comprehensive suite of advertising and creative services designed to elevate your brand and lead the competition.",
  viewAll: "View All Services",
  // Portfolio section
  portfolioTitle: "Featured Work",
  portfolioSubtitle: "Some of the projects we're proud of. We put our magic touch into every detail.",
  viewGallery: "Browse Full Gallery",
  // Why us
  whyUsTitle: "Why Choose Flex?",
  whyUsSubtitle: "We combine unlimited creativity with deep expertise in the Saudi market to deliver results that exceed expectations.",
  competitiveBadge: "Our Competitive Edge",
  whyFeature1Title: "11+ Years of Experience",
  whyFeature1Desc: "Since 2015, working with companies across the Eastern Region, Riyadh, and all of Saudi Arabia.",
  whyFeature2Title: "Out-of-the-Box Ideas",
  whyFeature2Desc: "We challenge conventional templates and invent advertising solutions never seen before.",
  whyFeature3Title: "Always On Time",
  whyFeature3Desc: "We commit to deadlines without compromising quality or attention to detail.",
  whyFeature4Title: "Material Quality is Non-Negotiable",
  whyFeature4Desc: "We select the finest printing materials, sign substrates, and finishes — every detail reflects your brand.",
  whyFeature5Title: "Design, Manufacture & Install",
  whyFeature5Desc: "Every project phase under one roof — from the first design sketch to the final bolt on-site.",
  whyFeature6Title: "Real On-Site Presence",
  whyFeature6Desc: "Our team comes to you — we measure, plan, and personally supervise every installation.",
  // CTA
  ctaTitle: "Ready to Make Noise?",
  ctaSubtitle: "Let's talk about your next project and how we can turn it into a success story.",
  startNow: "Get Started",
  // About page
  aboutBadge: "Flex Story",
  aboutHero1: "Who Are We?",
  aboutHero2: "An Agency That Makes a Difference",
  aboutHeroDesc: "Flex Agency was founded in 2015 in Dammam. Over the years, the agency has achieved significant growth in its work, activities, and services across all advertising sectors.",
  storyTitle: "A Success Story",
  storyHighlight: "Real",
  storyP1: "Flex Advertising Agency was founded in 2015 in Dammam, Saudi Arabia. The agency currently covers all regions of the Kingdom.",
  storyP2: "The agency has executed numerous projects and advertising campaigns, organized festivals and events in the Eastern Region and beyond. Thanks to tireless efforts from its creative and administrative team, Flex achieved significant milestones in record time.",
  storyP3: "It has left a distinctive mark with its clients through the high values that govern its service policy — honesty, integrity, and the highest quality standards in all projects.",
  statFounded: "Year Founded",
  statProjects: "Completed Projects",
  statClients: "Satisfied Clients",
  statRegions: "Covered Regions",
  visionLabel: "OUR VISION",
  visionTitle: "Our Vision",
  visionText: "Our vision at Flex is to be one of the leading agencies in providing innovative marketing solutions and advertising services, pioneering modern printing services with advanced, high-quality technologies, and delivering premium services to clients inside and outside Saudi Arabia.",
  missionLabel: "OUR MISSION",
  missionTitle: "Our Mission",
  missionText: "We always strive at Flex to deliver the best quality in services and advertising to achieve the highest levels of client satisfaction. We use the latest and most innovative printing equipment, select the finest materials, and uphold the standards approved in Saudi Arabia.",
  valuesTitle: "Our Values",
  valuesHighlight: "Core",
  valuesSubtitle: "These values are the foundation of our policy in serving our clients.",
  value1Title: "Integrity & Honesty", value1Desc: "We commit to full transparency in all our dealings with clients and partners.",
  value2Title: "Highest Quality Standards", value2Desc: "We uphold the highest quality standards in all work without compromise.",
  value3Title: "On-Time Delivery", value3Desc: "We honor agreed timelines and always strive to deliver on schedule.",
  value4Title: "Client Satisfaction First", value4Desc: "We place our clients' satisfaction at the top of our priorities and strive to exceed their expectations.",
  value5Title: "Continuous Innovation", value5Desc: "We keep pace with the latest technologies and global trends in the advertising industry.",
  value6Title: "Full Coverage", value6Desc: "We cover all regions of Saudi Arabia to serve every client.",
  officesTitle: "Our Offices",
  officesHighlight: "in Saudi Arabia",
  office1City: "Dammam", office1Desc: "Headquarters — Eastern Region, Saudi Arabia", office1Badge: "Headquarters",
  office2City: "Riyadh", office2Desc: "Riyadh Office — Central Region, Saudi Arabia", office2Badge: "Branch",
  aboutCtaTitle: "Ready to Work With Us?",
  aboutCtaDesc: "Let's discuss your next project and provide you with an advertising solution that achieves your goals.",
  aboutCtaBtn: "Contact Us",
  // Services page
  servicesBadge: "What We Offer",
  servicesPageTitle: "Our Services",
  servicesPageHighlight: "Creative",
  servicesPageDesc: "Flex offers a comprehensive suite of advertising, printing, and manufacturing services. We use the latest technologies and finest materials in compliance with Saudi standards.",
  workshopTitle: "Manufacturing Workshop",
  workshopHighlight: "Integrated",
  workshopDesc: "We manufacture all types of advertising signs with the highest quality and latest production technologies.",
  workshopBtn: "Request a Quote",
  workshop1: "Flex Face Signs",
  workshop2: "Unipole Signs",
  workshop3: "3D Letter Signs",
  workshop4: "Cladding Facades",
  workshop5: "Banner Signs",
  workshop6: "Vehicle Stickers",
  servicesCtaTitle: "Ready for the Next Step?",
  servicesCtaDesc: "Let's work together to turn your ideas into a campaign the market talks about.",
  servicesCtaBtn: "Request a Quote",
  // Contact page
  contactBadge: "We're Here to Listen",
  contactHero1: "Contact",
  contactHero2: "Us",
  contactHeroDesc: "Share your vision with us and we'll turn it into a reality that exceeds your expectations. Our team is ready to answer your inquiries.",
  contactInfoTitle: "Contact Information",
  contactOfficesTitle: "Our Offices",
  contactPhoneTitle: "Phone",
  contactEmailTitle: "Email",
  contactWhatsappTitle: "WhatsApp",
  contactHoursTitle: "Working Hours",
  contactHoursDays: "Sunday — Thursday",
  contactHoursTime: "9:00 AM — 6:00 PM",
  contactDammam: "Dammam — HQ",
  contactDammamRegion: "Eastern Region, Saudi Arabia",
  contactRiyadh: "Riyadh — Branch",
  contactRiyadhRegion: "Central Region, Saudi Arabia",
  formTitle: "Send Us a Message",
  formName: "Full Name",
  formPhone: "Phone Number",
  formEmail: "Email",
  formEmailOptional: "(optional)",
  formMessage: "Project Details or Inquiry",
  formNamePlaceholder: "Enter your name",
  formMessagePlaceholder: "Tell us about your project or what you need...",
  formSubmit: "Send Message",
  formSubmitting: "Sending...",
  formSuccessTitle: "Sent Successfully",
  formSuccessDesc: "We'll get back to you as soon as possible.",
  formErrorTitle: "An Error Occurred",
  formErrorDesc: "Please try again.",
  formConnError: "Could not send your message. Please try again later.",
  formNameError: "Name must be at least 2 characters",
  formPhoneError: "Invalid phone number",
  formEmailError: "Invalid email address",
  formMessageError: "Message is too short",
  // Footer
  footerBio: "Flex Advertising Agency was founded in 2015 in Dammam. The agency covers all regions of Saudi Arabia with the highest standards of quality and professionalism.",
  footerQuickLinks: "Quick Links",
  footerServicesTitle: "Our Services",
  footerContactTitle: "Contact Us",
  footerCopyright: "Flex for Advertising — All Rights Reserved.",
  footerService1: "Digital Printing",
  footerService2: "Corporate Identity",
  footerService3: "Event Management",
  footerService4: "3D Design",
  footerService5: "Vehicle Stickers",
  footerService6: "Manufacturing Workshop",
  // Gallery page
  galleryBadgeSuffix: "+ real photos from our projects",
  galleryPageTitle: "Project",
  galleryPageHighlight: "Gallery",
  galleryPageDesc: "Real photos from our executed projects — printing, manufacturing, events, corporate identities, and more.",
  filterAll: "All",
  noImages: "No images in this category",
  galleryCTATitle: "I Want a Project Like This",
  galleryCTADesc: "Contact us now and we'll provide a free quote the same day.",
  galleryCTABtn: "Request a Free Quote",
  // Portfolio page
  portfolioBadge: "Our Portfolio",
  portfolioPageTitle: "Outstanding",
  portfolioPageHighlight: "Projects",
  portfolioPageDesc: "Browse our archive filled with successful advertising campaigns and creative projects that have transformed major brands.",
  noProjects: "No Projects",
  noProjectsDesc: "No projects found in this category yet.",
  clientLabel: "Client:",
};

interface LanguageContextType {
  lang: Language;
  t: Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar",
  t: ar,
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("ar");

  const toggleLang = () => setLang((prev) => (prev === "ar" ? "en" : "ar"));

  return (
    <LanguageContext.Provider value={{ lang, t: lang === "ar" ? ar : en, toggleLang }}>
      <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);

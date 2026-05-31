import { db } from "@workspace/db";
  import { galleryTable, servicesTable, clientsTable, portfolioTable } from "@workspace/db";
  import { sql } from "drizzle-orm";
  import { logger } from "./logger";

  const GALLERY_SEED = [
  {
    "imageUrl": "/images/portfolio/p13_2.jpeg",
    "title": "طباعة رقمية — لافتات كبيرة",
    "category": "طباعة رقمية",
    "service": "الطباعة الرقمية",
    "year": 2022,
    "sortOrder": 1
  },
  {
    "imageUrl": "/images/portfolio/p13_1.jpeg",
    "title": "طباعة رقمية — بنرات ترويجية",
    "category": "طباعة رقمية",
    "service": "الطباعة الرقمية",
    "year": 2023,
    "sortOrder": 2
  },
  {
    "imageUrl": "/images/portfolio/p9_4.jpeg",
    "title": "طباعة ديجيتال — واجهات محلات",
    "category": "طباعة رقمية",
    "service": "الطباعة الرقمية",
    "year": 2022,
    "sortOrder": 3
  },
  {
    "imageUrl": "/images/portfolio/p6_1.jpeg",
    "title": "طباعة إعلانية متنوعة",
    "category": "طباعة رقمية",
    "service": "الطباعة الرقمية",
    "year": 2021,
    "sortOrder": 4
  },
  {
    "imageUrl": "/images/portfolio/p6_3.jpeg",
    "title": "لافتة إعلانية مطبوعة",
    "category": "طباعة رقمية",
    "service": "الطباعة الرقمية",
    "year": 2021,
    "sortOrder": 5
  },
  {
    "imageUrl": "/images/portfolio/p8_1.jpeg",
    "title": "بنرات دعائية رقمية",
    "category": "طباعة رقمية",
    "service": "الطباعة الرقمية",
    "year": 2022,
    "sortOrder": 6
  },
  {
    "imageUrl": "/images/portfolio/p14_3.jpeg",
    "title": "استيكر لصق ترويجي",
    "category": "استيكر وتلمينيش",
    "service": "الاستيكر والتلمينيشن",
    "year": 2023,
    "sortOrder": 10
  },
  {
    "imageUrl": "/images/portfolio/p14_4.jpeg",
    "title": "تلمينيشن واجهة تجارية",
    "category": "استيكر وتلمينيش",
    "service": "الاستيكر والتلمينيشن",
    "year": 2023,
    "sortOrder": 11
  },
  {
    "imageUrl": "/images/portfolio/p15_1.jpeg",
    "title": "استيكر إعلاني متعدد الألوان",
    "category": "استيكر وتلمينيش",
    "service": "الاستيكر والتلمينيشن",
    "year": 2022,
    "sortOrder": 12
  },
  {
    "imageUrl": "/images/portfolio/p18_1.jpeg",
    "title": "هوية بصرية متكاملة — علامة تجارية",
    "category": "هوية مؤسسية",
    "service": "الهوية المؤسسية",
    "year": 2023,
    "sortOrder": 20
  },
  {
    "imageUrl": "/images/portfolio/p19_3.jpeg",
    "title": "هوية شركة — تصاميم مطبوعة",
    "category": "هوية مؤسسية",
    "service": "الهوية المؤسسية",
    "year": 2022,
    "sortOrder": 21
  },
  {
    "imageUrl": "/images/portfolio/p19_22.jpeg",
    "title": "هوية مؤسسية احترافية",
    "category": "هوية مؤسسية",
    "service": "الهوية المؤسسية",
    "year": 2023,
    "sortOrder": 22
  },
  {
    "imageUrl": "/images/portfolio/p21_1.jpeg",
    "title": "قص ليزر — أحرف معدنية مجسمة",
    "category": "ماكينات ليزر",
    "service": "ماكينات الليزر",
    "year": 2023,
    "sortOrder": 30
  },
  {
    "imageUrl": "/images/portfolio/p20_1.jpeg",
    "title": "تشكيل إكريليك بالليزر",
    "category": "ماكينات ليزر",
    "service": "ماكينات الليزر",
    "year": 2022,
    "sortOrder": 31
  },
  {
    "imageUrl": "/images/portfolio/p20_6.jpeg",
    "title": "لوحة ليزر مضيئة",
    "category": "ماكينات ليزر",
    "service": "ماكينات الليزر",
    "year": 2023,
    "sortOrder": 32
  },
  {
    "imageUrl": "/images/portfolio/p24_1.jpeg",
    "title": "تصور معماري ثلاثي الأبعاد",
    "category": "تصميم ثلاثي الأبعاد",
    "service": "التصميم ثلاثي الأبعاد",
    "year": 2023,
    "sortOrder": 40
  },
  {
    "imageUrl": "/images/portfolio/p22_1.jpeg",
    "title": "نموذج 3D لمشروع تجاري",
    "category": "تصميم ثلاثي الأبعاد",
    "service": "التصميم ثلاثي الأبعاد",
    "year": 2022,
    "sortOrder": 41
  },
  {
    "imageUrl": "/images/portfolio/p25_5.jpeg",
    "title": "تصميم ثلاثي الأبعاد متكامل",
    "category": "تصميم ثلاثي الأبعاد",
    "service": "التصميم ثلاثي الأبعاد",
    "year": 2023,
    "sortOrder": 42
  },
  {
    "imageUrl": "/images/portfolio/p25_6.jpeg",
    "title": "مجسم إعلاني ثلاثي الأبعاد",
    "category": "تصميم ثلاثي الأبعاد",
    "service": "التصميم ثلاثي الأبعاد",
    "year": 2022,
    "sortOrder": 43
  },
  {
    "imageUrl": "/images/portfolio/p26_1.jpeg",
    "title": "تنظيم معرض تجاري متكامل",
    "category": "فعاليات ومعارض",
    "service": "إدارة الفعاليات والمعارض",
    "year": 2023,
    "sortOrder": 50
  },
  {
    "imageUrl": "/images/portfolio/p26_2.jpeg",
    "title": "حفل ترفيهي كبير",
    "category": "فعاليات ومعارض",
    "service": "إدارة الفعاليات والمعارض",
    "year": 2022,
    "sortOrder": 51
  },
  {
    "imageUrl": "/images/portfolio/p27_5.jpeg",
    "title": "مؤتمر شركات في المنطقة الشرقية",
    "category": "فعاليات ومعارض",
    "service": "إدارة الفعاليات والمعارض",
    "year": 2023,
    "sortOrder": 52
  },
  {
    "imageUrl": "/images/portfolio/p28_1.jpeg",
    "title": "فعالية ترويجية ضخمة",
    "category": "فعاليات ومعارض",
    "service": "إدارة الفعاليات والمعارض",
    "year": 2023,
    "sortOrder": 53
  },
  {
    "imageUrl": "/images/portfolio/p20_1.jpeg",
    "title": "مشروع طباعة",
    "category": "مشاريع",
    "service": null,
    "year": 2024,
    "sortOrder": 54
  },
  {
    "imageUrl": "/images/portfolio/p29_2.jpeg",
    "title": "ستاندات عرض للفعاليات",
    "category": "فعاليات ومعارض",
    "service": "إدارة الفعاليات والمعارض",
    "year": 2022,
    "sortOrder": 54
  },
  {
    "imageUrl": "/images/portfolio/p29_5.jpeg",
    "title": "إدارة احتفالية مميزة",
    "category": "فعاليات ومعارض",
    "service": "إدارة الفعاليات والمعارض",
    "year": 2021,
    "sortOrder": 55
  },
  {
    "imageUrl": "/images/portfolio/p20_2.jpeg",
    "title": "مشروع طباعة 2",
    "category": "مشاريع",
    "service": null,
    "year": 2024,
    "sortOrder": 55
  },
  {
    "imageUrl": "/images/portfolio/p20_3.jpeg",
    "title": "مشروع تصميم",
    "category": "مشاريع",
    "service": null,
    "year": 2024,
    "sortOrder": 56
  },
  {
    "imageUrl": "/images/portfolio/p20_4.jpeg",
    "title": "مشروع إعلاني",
    "category": "مشاريع",
    "service": null,
    "year": 2024,
    "sortOrder": 57
  },
  {
    "imageUrl": "/images/portfolio/p20_6.jpeg",
    "title": "لافتة تجارية",
    "category": "مشاريع",
    "service": null,
    "year": 2024,
    "sortOrder": 58
  },
  {
    "imageUrl": "/images/portfolio/p20_7.jpeg",
    "title": "تصميم داخلي",
    "category": "مشاريع",
    "service": null,
    "year": 2024,
    "sortOrder": 59
  },
  {
    "imageUrl": "/images/portfolio/p30_1.jpeg",
    "title": "هدايا ترويجية راقية",
    "category": "هدايا ترويجية",
    "service": "الهدايا الترويجية",
    "year": 2023,
    "sortOrder": 60
  },
  {
    "imageUrl": "/images/portfolio/p20_8.jpeg",
    "title": "مشروع برندنج",
    "category": "مشاريع",
    "service": null,
    "year": 2024,
    "sortOrder": 60
  },
  {
    "imageUrl": "/images/portfolio/p20_9.jpeg",
    "title": "إعلان خارجي",
    "category": "مشاريع",
    "service": null,
    "year": 2024,
    "sortOrder": 61
  },
  {
    "imageUrl": "/images/portfolio/p32_1.jpeg",
    "title": "مجموعة هدايا مطبوعة مخصصة",
    "category": "هدايا ترويجية",
    "service": "الهدايا الترويجية",
    "year": 2022,
    "sortOrder": 61
  },
  {
    "imageUrl": "/images/portfolio/p34_2.jpeg",
    "title": "هدايا مؤسسية احترافية",
    "category": "هدايا ترويجية",
    "service": "الهدايا الترويجية",
    "year": 2023,
    "sortOrder": 62
  },
  {
    "imageUrl": "/images/portfolio/p21_1.jpeg",
    "title": "مشروع فلكس 21",
    "category": "مشاريع",
    "service": null,
    "year": 2024,
    "sortOrder": 62
  },
  {
    "imageUrl": "/images/portfolio/p35_2.jpeg",
    "title": "أطقم هدايا فاخرة مطبوعة",
    "category": "هدايا ترويجية",
    "service": "الهدايا الترويجية",
    "year": 2022,
    "sortOrder": 63
  },
  {
    "imageUrl": "/images/portfolio/p22_1.jpeg",
    "title": "لوحة تجارية",
    "category": "مشاريع",
    "service": null,
    "year": 2024,
    "sortOrder": 63
  },
  {
    "imageUrl": "/images/portfolio/p22_2.jpeg",
    "title": "تصميم متجر",
    "category": "مشاريع",
    "service": null,
    "year": 2024,
    "sortOrder": 64
  },
  {
    "imageUrl": "/images/portfolio/p22_3.jpeg",
    "title": "برندنج متكامل",
    "category": "مشاريع",
    "service": null,
    "year": 2024,
    "sortOrder": 65
  },
  {
    "imageUrl": "/images/portfolio/p22_4.jpeg",
    "title": "مشروع إعلاني 2",
    "category": "مشاريع",
    "service": null,
    "year": 2024,
    "sortOrder": 66
  },
  {
    "imageUrl": "/images/portfolio/p24_1.jpeg",
    "title": "طباعة كبيرة",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 67
  },
  {
    "imageUrl": "/images/portfolio/p24_2.jpeg",
    "title": "طباعة فاخرة",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 68
  },
  {
    "imageUrl": "/images/portfolio/p25_1.jpeg",
    "title": "طباعة رقمية 1",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 69
  },
  {
    "imageUrl": "/images/portfolio/p37_1.jpeg",
    "title": "برندينج سيارة تجارية",
    "category": "استيكر سيارات",
    "service": "استيكر السيارات",
    "year": 2023,
    "sortOrder": 70
  },
  {
    "imageUrl": "/images/portfolio/p25_2.jpeg",
    "title": "طباعة رقمية 2",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 70
  },
  {
    "imageUrl": "/images/portfolio/p25_3.jpeg",
    "title": "طباعة رقمية 3",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 71
  },
  {
    "imageUrl": "/images/portfolio/p36_7.jpeg",
    "title": "دعاية كاملة لأسطول سيارات",
    "category": "استيكر سيارات",
    "service": "استيكر السيارات",
    "year": 2022,
    "sortOrder": 71
  },
  {
    "imageUrl": "/images/portfolio/p36_1.jpeg",
    "title": "استيكر سيارة توصيل",
    "category": "استيكر سيارات",
    "service": "استيكر السيارات",
    "year": 2023,
    "sortOrder": 72
  },
  {
    "imageUrl": "/images/portfolio/p25_4.jpeg",
    "title": "طباعة رقمية 4",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 72
  },
  {
    "imageUrl": "/images/portfolio/p25_5.jpeg",
    "title": "مطبوعات ترويجية",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 73
  },
  {
    "imageUrl": "/images/portfolio/p36_5.jpeg",
    "title": "تصميم لصق سيارة احترافي",
    "category": "استيكر سيارات",
    "service": "استيكر السيارات",
    "year": 2021,
    "sortOrder": 73
  },
  {
    "imageUrl": "/images/portfolio/p25_6.jpeg",
    "title": "طباعة UV",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 74
  },
  {
    "imageUrl": "/images/portfolio/p26_1.jpeg",
    "title": "طباعة بانر",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 75
  },
  {
    "imageUrl": "/images/portfolio/p26_2.jpeg",
    "title": "بوستر فعالية",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 76
  },
  {
    "imageUrl": "/images/portfolio/p26_3.jpeg",
    "title": "طباعة ستيكر",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 77
  },
  {
    "imageUrl": "/images/portfolio/p26_4.jpeg",
    "title": "طباعة مواد",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 78
  },
  {
    "imageUrl": "/images/portfolio/p26_5.jpeg",
    "title": "طباعة ضخمة",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 79
  },
  {
    "imageUrl": "/images/portfolio/p38_8.jpeg",
    "title": "لافتة فلكس فيس ضخمة",
    "category": "ورشة تصنيع",
    "service": "ورشة التصنيع الإعلاني",
    "year": 2023,
    "sortOrder": 80
  },
  {
    "imageUrl": "/images/portfolio/p27_1.jpeg",
    "title": "طباعة فعاليات",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 80
  },
  {
    "imageUrl": "/images/portfolio/p27_2.jpeg",
    "title": "طباعة مميزة",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 81
  },
  {
    "imageUrl": "/images/portfolio/p39_7.jpeg",
    "title": "يونيبول إعلاني خارجي",
    "category": "ورشة تصنيع",
    "service": "ورشة التصنيع الإعلاني",
    "year": 2022,
    "sortOrder": 81
  },
  {
    "imageUrl": "/images/portfolio/p27_3.jpeg",
    "title": "طباعة تسويقية",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 82
  },
  {
    "imageUrl": "/images/portfolio/p39_8.jpeg",
    "title": "لوحة بنر كبيرة الحجم",
    "category": "ورشة تصنيع",
    "service": "ورشة التصنيع الإعلاني",
    "year": 2023,
    "sortOrder": 82
  },
  {
    "imageUrl": "/images/portfolio/p27_5.jpeg",
    "title": "مواد مطبوعة",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 83
  },
  {
    "imageUrl": "/images/portfolio/p27_6.jpeg",
    "title": "طباعة متخصصة",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 84
  },
  {
    "imageUrl": "/images/portfolio/p27_7.jpeg",
    "title": "طباعة رقمية متقدمة",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 85
  },
  {
    "imageUrl": "/images/portfolio/p28_1.jpeg",
    "title": "بانر كبير",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 86
  },
  {
    "imageUrl": "/images/portfolio/p28_2.jpeg",
    "title": "مطبوعة مكتبية",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 87
  },
  {
    "imageUrl": "/images/portfolio/p28_3.jpeg",
    "title": "مطبوعة فاخرة",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 88
  },
  {
    "imageUrl": "/images/portfolio/p28_4.jpeg",
    "title": "كتالوج",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 89
  },
  {
    "imageUrl": "/images/portfolio/p29_1.jpeg",
    "title": "بوستر إعلاني",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 90
  },
  {
    "imageUrl": "/images/portfolio/p40_1.jpeg",
    "title": "مشروع طباعة كبير",
    "category": "مشاريع",
    "service": "الطباعة الرقمية",
    "year": 2022,
    "sortOrder": 90
  },
  {
    "imageUrl": "/images/portfolio/p29_2.jpeg",
    "title": "طباعة خاصة",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 91
  },
  {
    "imageUrl": "/images/portfolio/p41_7.jpeg",
    "title": "مشروع هوية مؤسسية",
    "category": "مشاريع",
    "service": "الهوية المؤسسية",
    "year": 2023,
    "sortOrder": 91
  },
  {
    "imageUrl": "/images/portfolio/p63_1.jpeg",
    "title": "لافتات إعلانية خارجية",
    "category": "مشاريع",
    "service": "ورشة التصنيع الإعلاني",
    "year": 2022,
    "sortOrder": 92
  },
  {
    "imageUrl": "/images/portfolio/p29_3.jpeg",
    "title": "مواد دعائية",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 92
  },
  {
    "imageUrl": "/images/portfolio/p29_4.jpeg",
    "title": "طباعة لافتة",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 93
  },
  {
    "imageUrl": "/images/portfolio/p64_3.jpeg",
    "title": "مشروع تصنيع لوحات إعلانية",
    "category": "مشاريع",
    "service": "ورشة التصنيع الإعلاني",
    "year": 2023,
    "sortOrder": 93
  },
  {
    "imageUrl": "/images/portfolio/p65_1.jpeg",
    "title": "فعالية خارجية ضخمة",
    "category": "مشاريع",
    "service": "إدارة الفعاليات والمعارض",
    "year": 2022,
    "sortOrder": 94
  },
  {
    "imageUrl": "/images/portfolio/p29_5.jpeg",
    "title": "بانر تسويقي",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 94
  },
  {
    "imageUrl": "/images/portfolio/p30_1.jpeg",
    "title": "طباعة كبيرة 2",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 95
  },
  {
    "imageUrl": "/images/portfolio/p66_1.jpeg",
    "title": "مشروع كلادينج واجهة",
    "category": "مشاريع",
    "service": "ورشة التصنيع الإعلاني",
    "year": 2023,
    "sortOrder": 95
  },
  {
    "imageUrl": "/images/portfolio/p30_2.jpeg",
    "title": "مطبوع داخلي",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 96
  },
  {
    "imageUrl": "/images/portfolio/p69_1.jpeg",
    "title": "تصاميم إعلانية متنوعة",
    "category": "مشاريع",
    "service": "الطباعة الرقمية",
    "year": 2022,
    "sortOrder": 96
  },
  {
    "imageUrl": "/images/portfolio/p70_1.jpeg",
    "title": "مشروع إعلاني شامل",
    "category": "مشاريع",
    "service": "الهوية المؤسسية",
    "year": 2021,
    "sortOrder": 97
  },
  {
    "imageUrl": "/images/portfolio/p30_3.jpeg",
    "title": "بانر رأسي",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 97
  },
  {
    "imageUrl": "/images/portfolio/p30_4.jpeg",
    "title": "مواد تسويق",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 98
  },
  {
    "imageUrl": "/images/portfolio/p75_1.jpeg",
    "title": "تنفيذ لوحات إعلانية",
    "category": "مشاريع",
    "service": "ورشة التصنيع الإعلاني",
    "year": 2022,
    "sortOrder": 98
  },
  {
    "imageUrl": "/images/portfolio/p76_1.jpeg",
    "title": "مشروع برندينج متكامل",
    "category": "مشاريع",
    "service": "الهوية المؤسسية",
    "year": 2023,
    "sortOrder": 99
  },
  {
    "imageUrl": "/images/portfolio/p30_5.jpeg",
    "title": "طباعة شاشة",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 99
  },
  {
    "imageUrl": "/images/portfolio/p30_6.jpeg",
    "title": "مطبوع إبداعي",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 100
  },
  {
    "imageUrl": "/images/portfolio/p83_1.jpeg",
    "title": "مشروع تصنيع إعلاني",
    "category": "مشاريع",
    "service": "ورشة التصنيع الإعلاني",
    "year": 2022,
    "sortOrder": 100
  },
  {
    "imageUrl": "/images/portfolio/p30_7.jpeg",
    "title": "إعلان طباعة",
    "category": "طباعة رقمية",
    "service": null,
    "year": 2024,
    "sortOrder": 101
  },
  {
    "imageUrl": "/images/portfolio/p84_1.jpeg",
    "title": "حملة إعلانية خارجية",
    "category": "مشاريع",
    "service": "الطباعة الرقمية",
    "year": 2023,
    "sortOrder": 101
  },
  {
    "imageUrl": "/images/portfolio/p31_1.jpeg",
    "title": "معرض تجاري",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 102
  },
  {
    "imageUrl": "/images/portfolio/p84_2.jpeg",
    "title": "مشروع فعاليات ومعارض",
    "category": "مشاريع",
    "service": "إدارة الفعاليات والمعارض",
    "year": 2022,
    "sortOrder": 102
  },
  {
    "imageUrl": "/images/portfolio/p31_2.jpeg",
    "title": "فعالية ترويجية",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 103
  },
  {
    "imageUrl": "/images/portfolio/p85_2.jpeg",
    "title": "تصنيع لوحات مضيئة",
    "category": "مشاريع",
    "service": "ورشة التصنيع الإعلاني",
    "year": 2023,
    "sortOrder": 103
  },
  {
    "imageUrl": "/images/portfolio/p86_1.jpeg",
    "title": "مشروع لافتات تجارية",
    "category": "مشاريع",
    "service": "ورشة التصنيع الإعلاني",
    "year": 2021,
    "sortOrder": 104
  },
  {
    "imageUrl": "/images/portfolio/p31_3.jpeg",
    "title": "ديكور معرض",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 104
  },
  {
    "imageUrl": "/images/portfolio/p31_4.jpeg",
    "title": "جناح احترافي",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 105
  },
  {
    "imageUrl": "/images/portfolio/p90_1.jpeg",
    "title": "تنفيذ مشروع إعلاني كبير",
    "category": "مشاريع",
    "service": "الطباعة الرقمية",
    "year": 2022,
    "sortOrder": 105
  },
  {
    "imageUrl": "/images/portfolio/p90_2.jpeg",
    "title": "نتائج مشروع طباعة رقمية",
    "category": "مشاريع",
    "service": "الطباعة الرقمية",
    "year": 2023,
    "sortOrder": 106
  },
  {
    "imageUrl": "/images/portfolio/p31_5.jpeg",
    "title": "فعالية مميزة",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 106
  },
  {
    "imageUrl": "/images/portfolio/p31_6.jpeg",
    "title": "إعداد معرض",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 107
  },
  {
    "imageUrl": "/images/portfolio/p32_1.jpeg",
    "title": "ستاند معرض 1",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 108
  },
  {
    "imageUrl": "/images/portfolio/p32_3.jpeg",
    "title": "ستاند معرض 2",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 109
  },
  {
    "imageUrl": "/images/portfolio/p32_4.jpeg",
    "title": "ستاند معرض 3",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 110
  },
  {
    "imageUrl": "/images/portfolio/p33_1.jpeg",
    "title": "جناح كبير",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 111
  },
  {
    "imageUrl": "/images/portfolio/p33_2.jpeg",
    "title": "تجهيز فعالية",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 112
  },
  {
    "imageUrl": "/images/portfolio/p33_3.jpeg",
    "title": "معرض تقني",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 113
  },
  {
    "imageUrl": "/images/portfolio/p33_8.jpeg",
    "title": "فعالية كبرى",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 114
  },
  {
    "imageUrl": "/images/portfolio/p33_10.jpeg",
    "title": "جناح مميز",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 115
  },
  {
    "imageUrl": "/images/portfolio/p33_11.jpeg",
    "title": "ديكور فعالية",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 116
  },
  {
    "imageUrl": "/images/portfolio/p33_12.jpeg",
    "title": "إضاءة معرض",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 117
  },
  {
    "imageUrl": "/images/portfolio/p33_13.jpeg",
    "title": "مسرح حفل",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 118
  },
  {
    "imageUrl": "/images/portfolio/p33_15.jpeg",
    "title": "فعالية رياضية",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 119
  },
  {
    "imageUrl": "/images/portfolio/p33_16.jpeg",
    "title": "جناح عرض",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 120
  },
  {
    "imageUrl": "/images/portfolio/p34_1.jpeg",
    "title": "تصميم جناح",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 121
  },
  {
    "imageUrl": "/images/portfolio/p34_2.jpeg",
    "title": "إعداد حفل",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 122
  },
  {
    "imageUrl": "/images/portfolio/p34_3.jpeg",
    "title": "فعالية تسويقية",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 123
  },
  {
    "imageUrl": "/images/portfolio/p35_1.jpeg",
    "title": "معرض منتجات",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 124
  },
  {
    "imageUrl": "/images/portfolio/p35_2.jpeg",
    "title": "فعالية شركة",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 125
  },
  {
    "imageUrl": "/images/portfolio/p35_3.jpeg",
    "title": "جناح تقني",
    "category": "فعاليات ومعارض",
    "service": null,
    "year": 2024,
    "sortOrder": 126
  },
  {
    "imageUrl": "/images/portfolio/p36_1.jpeg",
    "title": "هوية بصرية 1",
    "category": "هوية مؤسسية",
    "service": null,
    "year": 2024,
    "sortOrder": 127
  },
  {
    "imageUrl": "/images/portfolio/p36_2.jpeg",
    "title": "شعار احترافي",
    "category": "هوية مؤسسية",
    "service": null,
    "year": 2024,
    "sortOrder": 128
  },
  {
    "imageUrl": "/images/portfolio/p36_3.jpeg",
    "title": "هوية شركة",
    "category": "هوية مؤسسية",
    "service": null,
    "year": 2024,
    "sortOrder": 129
  },
  {
    "imageUrl": "/images/portfolio/p37_1.jpeg",
    "title": "تصميم بطاقة",
    "category": "هوية مؤسسية",
    "service": null,
    "year": 2024,
    "sortOrder": 130
  },
  {
    "imageUrl": "/images/portfolio/p37_2.jpeg",
    "title": "كتيب الشركة",
    "category": "هوية مؤسسية",
    "service": null,
    "year": 2024,
    "sortOrder": 131
  },
  {
    "imageUrl": "/images/portfolio/p38_1.jpeg",
    "title": "هوية كاملة",
    "category": "هوية مؤسسية",
    "service": null,
    "year": 2024,
    "sortOrder": 132
  },
  {
    "imageUrl": "/images/portfolio/p38_2.jpeg",
    "title": "تصميم مظروف",
    "category": "هوية مؤسسية",
    "service": null,
    "year": 2024,
    "sortOrder": 133
  },
  {
    "imageUrl": "/images/portfolio/p39_1.jpeg",
    "title": "هوية ذهبية",
    "category": "هوية مؤسسية",
    "service": null,
    "year": 2024,
    "sortOrder": 134
  },
  {
    "imageUrl": "/images/portfolio/p40_1.jpeg",
    "title": "شعار مميز",
    "category": "هوية مؤسسية",
    "service": null,
    "year": 2024,
    "sortOrder": 135
  },
  {
    "imageUrl": "/images/portfolio/p41_1.jpeg",
    "title": "هوية مميزة",
    "category": "هوية مؤسسية",
    "service": null,
    "year": 2024,
    "sortOrder": 136
  },
  {
    "imageUrl": "/images/portfolio/p42_12.jpeg",
    "title": "تصميم واجهة",
    "category": "هوية مؤسسية",
    "service": null,
    "year": 2024,
    "sortOrder": 137
  },
  {
    "imageUrl": "/images/portfolio/p43_1.jpeg",
    "title": "برندنج شامل",
    "category": "هوية مؤسسية",
    "service": null,
    "year": 2024,
    "sortOrder": 138
  },
  {
    "imageUrl": "/images/portfolio/p44_1.jpeg",
    "title": "هوية رقمية",
    "category": "هوية مؤسسية",
    "service": null,
    "year": 2024,
    "sortOrder": 139
  },
  {
    "imageUrl": "/images/portfolio/p45_1.jpeg",
    "title": "تصميم غلاف",
    "category": "هوية مؤسسية",
    "service": null,
    "year": 2024,
    "sortOrder": 140
  },
  {
    "imageUrl": "/images/portfolio/p46_1.jpeg",
    "title": "تلمينيش سيارة",
    "category": "استيكر وتلمينيش",
    "service": null,
    "year": 2024,
    "sortOrder": 141
  },
  {
    "imageUrl": "/images/portfolio/p47_1.jpeg",
    "title": "استيكر مركبة",
    "category": "استيكر وتلمينيش",
    "service": null,
    "year": 2024,
    "sortOrder": 142
  },
  {
    "imageUrl": "/images/portfolio/p48_1.jpeg",
    "title": "ريت على سيارة",
    "category": "استيكر وتلمينيش",
    "service": null,
    "year": 2024,
    "sortOrder": 143
  },
  {
    "imageUrl": "/images/portfolio/p48_10.jpeg",
    "title": "استيكر شاحنة",
    "category": "استيكر وتلمينيش",
    "service": null,
    "year": 2024,
    "sortOrder": 144
  },
  {
    "imageUrl": "/images/portfolio/p48_11.jpeg",
    "title": "تلمينيش باص",
    "category": "استيكر وتلمينيش",
    "service": null,
    "year": 2024,
    "sortOrder": 145
  },
  {
    "imageUrl": "/images/portfolio/p50_1.jpeg",
    "title": "استيكر تجاري",
    "category": "استيكر وتلمينيش",
    "service": null,
    "year": 2024,
    "sortOrder": 146
  },
  {
    "imageUrl": "/images/portfolio/p51_1.jpeg",
    "title": "تلمينيش متجر",
    "category": "استيكر وتلمينيش",
    "service": null,
    "year": 2024,
    "sortOrder": 147
  },
  {
    "imageUrl": "/images/portfolio/p52_1.jpeg",
    "title": "استيكر زجاج",
    "category": "استيكر وتلمينيش",
    "service": null,
    "year": 2024,
    "sortOrder": 148
  },
  {
    "imageUrl": "/images/portfolio/p53_1.jpeg",
    "title": "تلمينيش خاص",
    "category": "استيكر وتلمينيش",
    "service": null,
    "year": 2024,
    "sortOrder": 149
  },
  {
    "imageUrl": "/images/portfolio/p55_1.jpeg",
    "title": "استيكر ضخم",
    "category": "استيكر وتلمينيش",
    "service": null,
    "year": 2024,
    "sortOrder": 150
  },
  {
    "imageUrl": "/images/portfolio/p56_1.jpeg",
    "title": "هدايا مميزة",
    "category": "هدايا ترويجية",
    "service": null,
    "year": 2024,
    "sortOrder": 151
  },
  {
    "imageUrl": "/images/portfolio/p56_2.jpeg",
    "title": "هدايا شركات",
    "category": "هدايا ترويجية",
    "service": null,
    "year": 2024,
    "sortOrder": 152
  },
  {
    "imageUrl": "/images/portfolio/p57_1.jpeg",
    "title": "مستلزمات دعائية",
    "category": "هدايا ترويجية",
    "service": null,
    "year": 2024,
    "sortOrder": 153
  },
  {
    "imageUrl": "/images/portfolio/p57_2.jpeg",
    "title": "هدايا احترافية",
    "category": "هدايا ترويجية",
    "service": null,
    "year": 2024,
    "sortOrder": 154
  },
  {
    "imageUrl": "/images/portfolio/p58_1.jpeg",
    "title": "طقم هدايا",
    "category": "هدايا ترويجية",
    "service": null,
    "year": 2024,
    "sortOrder": 155
  },
  {
    "imageUrl": "/images/portfolio/p59_1.jpeg",
    "title": "هدايا تقنية",
    "category": "هدايا ترويجية",
    "service": null,
    "year": 2024,
    "sortOrder": 156
  },
  {
    "imageUrl": "/images/portfolio/p60_1.jpeg",
    "title": "هدية مميزة",
    "category": "هدايا ترويجية",
    "service": null,
    "year": 2024,
    "sortOrder": 157
  },
  {
    "imageUrl": "/images/portfolio/p61_1.jpeg",
    "title": "حفر ليزر",
    "category": "ماكينات ليزر",
    "service": null,
    "year": 2024,
    "sortOrder": 158
  },
  {
    "imageUrl": "/images/portfolio/p61_2.jpeg",
    "title": "قطع ليزر",
    "category": "ماكينات ليزر",
    "service": null,
    "year": 2024,
    "sortOrder": 159
  },
  {
    "imageUrl": "/images/portfolio/p62_1.jpeg",
    "title": "نقش ليزر",
    "category": "ماكينات ليزر",
    "service": null,
    "year": 2024,
    "sortOrder": 160
  },
  {
    "imageUrl": "/images/portfolio/p63_1.jpeg",
    "title": "ليزر إبداعي",
    "category": "ماكينات ليزر",
    "service": null,
    "year": 2024,
    "sortOrder": 161
  },
  {
    "imageUrl": "/images/portfolio/p64_1.jpeg",
    "title": "ليزر أكريليك",
    "category": "ماكينات ليزر",
    "service": null,
    "year": 2024,
    "sortOrder": 162
  },
  {
    "imageUrl": "/images/portfolio/p65_1.jpeg",
    "title": "نقش معدن",
    "category": "ماكينات ليزر",
    "service": null,
    "year": 2024,
    "sortOrder": 163
  },
  {
    "imageUrl": "/images/portfolio/p66_1.jpeg",
    "title": "ليزر تفصيل",
    "category": "ماكينات ليزر",
    "service": null,
    "year": 2024,
    "sortOrder": 164
  },
  {
    "imageUrl": "/images/portfolio/p67_1.jpeg",
    "title": "أعمال ليزر",
    "category": "ماكينات ليزر",
    "service": null,
    "year": 2024,
    "sortOrder": 165
  },
  {
    "imageUrl": "/images/portfolio/p68_1.jpeg",
    "title": "ليزر فني",
    "category": "ماكينات ليزر",
    "service": null,
    "year": 2024,
    "sortOrder": 166
  },
  {
    "imageUrl": "/images/portfolio/p70_1.jpeg",
    "title": "نقش ليزر 2",
    "category": "ماكينات ليزر",
    "service": null,
    "year": 2024,
    "sortOrder": 167
  },
  {
    "imageUrl": "/images/portfolio/p71_1.jpeg",
    "title": "تلمينيش سيارة فاخرة",
    "category": "استيكر سيارات",
    "service": null,
    "year": 2024,
    "sortOrder": 168
  },
  {
    "imageUrl": "/images/portfolio/p71_2.jpeg",
    "title": "تغليف سيارة",
    "category": "استيكر سيارات",
    "service": null,
    "year": 2024,
    "sortOrder": 169
  },
  {
    "imageUrl": "/images/portfolio/p72_1.jpeg",
    "title": "تلمينيش رياضي",
    "category": "استيكر سيارات",
    "service": null,
    "year": 2024,
    "sortOrder": 170
  },
  {
    "imageUrl": "/images/portfolio/p73_1.jpeg",
    "title": "استيكر سيارة",
    "category": "استيكر سيارات",
    "service": null,
    "year": 2024,
    "sortOrder": 171
  },
  {
    "imageUrl": "/images/portfolio/p74_1.jpeg",
    "title": "تغليف تجاري",
    "category": "استيكر سيارات",
    "service": null,
    "year": 2024,
    "sortOrder": 172
  },
  {
    "imageUrl": "/images/portfolio/p75_1.jpeg",
    "title": "تلمينيش جيب",
    "category": "استيكر سيارات",
    "service": null,
    "year": 2024,
    "sortOrder": 173
  },
  {
    "imageUrl": "/images/portfolio/p76_1.jpeg",
    "title": "استيكر راقي",
    "category": "استيكر سيارات",
    "service": null,
    "year": 2024,
    "sortOrder": 174
  },
  {
    "imageUrl": "/images/portfolio/p77_1.jpeg",
    "title": "تلمينيش فان",
    "category": "استيكر سيارات",
    "service": null,
    "year": 2024,
    "sortOrder": 175
  },
  {
    "imageUrl": "/images/portfolio/p78_1.jpeg",
    "title": "تغليف فاخر",
    "category": "استيكر سيارات",
    "service": null,
    "year": 2024,
    "sortOrder": 176
  },
  {
    "imageUrl": "/images/portfolio/p79_1.jpeg",
    "title": "تصميم 3D 1",
    "category": "تصميم ثلاثي الأبعاد",
    "service": null,
    "year": 2024,
    "sortOrder": 177
  },
  {
    "imageUrl": "/images/portfolio/p79_2.jpeg",
    "title": "موديل 3D",
    "category": "تصميم ثلاثي الأبعاد",
    "service": null,
    "year": 2024,
    "sortOrder": 178
  },
  {
    "imageUrl": "/images/portfolio/p80_1.jpeg",
    "title": "واجهة 3D",
    "category": "تصميم ثلاثي الأبعاد",
    "service": null,
    "year": 2024,
    "sortOrder": 179
  },
  {
    "imageUrl": "/images/portfolio/p81_1.jpeg",
    "title": "ديكور 3D",
    "category": "تصميم ثلاثي الأبعاد",
    "service": null,
    "year": 2024,
    "sortOrder": 180
  },
  {
    "imageUrl": "/images/portfolio/p82_10.jpeg",
    "title": "لافتة 3D",
    "category": "تصميم ثلاثي الأبعاد",
    "service": null,
    "year": 2024,
    "sortOrder": 181
  },
  {
    "imageUrl": "/images/portfolio/p82_11.jpeg",
    "title": "حروف 3D",
    "category": "تصميم ثلاثي الأبعاد",
    "service": null,
    "year": 2024,
    "sortOrder": 182
  },
  {
    "imageUrl": "/images/portfolio/p83_1.jpeg",
    "title": "تصنيع لافتة",
    "category": "ورشة تصنيع",
    "service": null,
    "year": 2024,
    "sortOrder": 183
  },
  {
    "imageUrl": "/images/portfolio/p84_1.jpeg",
    "title": "تصنيع حديدي",
    "category": "ورشة تصنيع",
    "service": null,
    "year": 2024,
    "sortOrder": 184
  },
  {
    "imageUrl": "/images/portfolio/p85_1.jpeg",
    "title": "تصنيع ألمنيوم",
    "category": "ورشة تصنيع",
    "service": null,
    "year": 2024,
    "sortOrder": 185
  },
  {
    "imageUrl": "/images/portfolio/p87_1.jpeg",
    "title": "تصنيع خشبي",
    "category": "ورشة تصنيع",
    "service": null,
    "year": 2024,
    "sortOrder": 186
  },
  {
    "imageUrl": "/images/portfolio/p88_1.jpeg",
    "title": "تصنيع إعلاني",
    "category": "ورشة تصنيع",
    "service": null,
    "year": 2024,
    "sortOrder": 187
  },
  {
    "imageUrl": "/images/portfolio/p89_1.jpeg",
    "title": "ورشة تصنيع 1",
    "category": "ورشة تصنيع",
    "service": null,
    "year": 2024,
    "sortOrder": 188
  },
  {
    "imageUrl": "/images/portfolio/p91_1.jpeg",
    "title": "تصنيع لوحة",
    "category": "ورشة تصنيع",
    "service": null,
    "year": 2024,
    "sortOrder": 189
  },
  {
    "imageUrl": "/images/portfolio/p92_1.jpeg",
    "title": "تصنيع داخلي",
    "category": "ورشة تصنيع",
    "service": null,
    "year": 2024,
    "sortOrder": 190
  },
  {
    "imageUrl": "/images/portfolio/p93_10.jpeg",
    "title": "تصنيع نهائي",
    "category": "ورشة تصنيع",
    "service": null,
    "year": 2024,
    "sortOrder": 191
  },
  {
    "imageUrl": "/images/portfolio/p94_1.jpeg",
    "title": "تصنيع متكامل",
    "category": "ورشة تصنيع",
    "service": null,
    "year": 2024,
    "sortOrder": 192
  },
  {
    "imageUrl": "/images/portfolio/p96_1.jpeg",
    "title": "منتج نهائي",
    "category": "ورشة تصنيع",
    "service": null,
    "year": 2024,
    "sortOrder": 193
  },
  {
    "imageUrl": "/images/portfolio/express_motors_1.jpeg",
    "title": "إكسبرس موتورز | واجهة خارجية",
    "category": "ورشة تصنيع",
    "service": "لافتات وإعلانات",
    "year": 2024,
    "sortOrder": 194
  },
  {
    "imageUrl": "/images/portfolio/express_motors_2.jpeg",
    "title": "إكسبرس موتورز | إضاءة LED",
    "category": "ورشة تصنيع",
    "service": "لافتات وإعلانات",
    "year": 2024,
    "sortOrder": 195
  },
  {
    "imageUrl": "/images/portfolio/express_motors_3.jpeg",
    "title": "إكسبرس موتورز | برندينج المكتب",
    "category": "هوية مؤسسية",
    "service": "هوية بصرية",
    "year": 2024,
    "sortOrder": 196
  },
  {
    "imageUrl": "/images/portfolio/express_motors_4.jpeg",
    "title": "إكسبرس موتورز | صالة العرض",
    "category": "هوية مؤسسية",
    "service": "هوية بصرية",
    "year": 2024,
    "sortOrder": 197
  },
  {
    "imageUrl": "/images/portfolio/express_motors_5.jpeg",
    "title": "إكسبرس موتورز | جدارية الشعار",
    "category": "هوية مؤسسية",
    "service": "هوية بصرية",
    "year": 2024,
    "sortOrder": 198
  },
  {
    "imageUrl": "/images/portfolio/express_motors_6.jpeg",
    "title": "إكسبرس موتورز | حروف بارزة",
    "category": "ورشة تصنيع",
    "service": "لافتات وإعلانات",
    "year": 2024,
    "sortOrder": 199
  },
  {
    "imageUrl": "/images/portfolio/pepsi_music_1.jpeg",
    "title": "Pepsi Music | تركيب النيون",
    "category": "تصميم ثلاثي الأبعاد",
    "service": "نيون وإضاءة",
    "year": 2024,
    "sortOrder": 200
  },
  {
    "imageUrl": "/images/portfolio/pepsi_music_2.jpeg",
    "title": "Pepsi Music | فن النيون",
    "category": "تصميم ثلاثي الأبعاد",
    "service": "نيون وإضاءة",
    "year": 2024,
    "sortOrder": 201
  },
  {
    "imageUrl": "/images/portfolio/pepsi_music_3.jpeg",
    "title": "Pepsi Music | شعار النيون",
    "category": "تصميم ثلاثي الأبعاد",
    "service": "نيون وإضاءة",
    "year": 2024,
    "sortOrder": 202
  },
  {
    "imageUrl": "/images/portfolio/business_yard_1.jpeg",
    "title": "Business Yard | لافتة المواقف",
    "category": "ورشة تصنيع",
    "service": "لافتات توجيهية",
    "year": 2024,
    "sortOrder": 203
  },
  {
    "imageUrl": "/images/portfolio/business_yard_2.jpeg",
    "title": "Business Yard | لافتة المخرج",
    "category": "ورشة تصنيع",
    "service": "لافتات توجيهية",
    "year": 2024,
    "sortOrder": 204
  },
  {
    "imageUrl": "/images/portfolio/protein_up_1.jpeg",
    "title": "Protein Up | واجهة المتجر",
    "category": "ورشة تصنيع",
    "service": "لافتات وإعلانات",
    "year": 2024,
    "sortOrder": 205
  },
  {
    "imageUrl": "/images/portfolio/ice_creamaa_1.jpeg",
    "title": "آيس كريما | حروف بارزة",
    "category": "ورشة تصنيع",
    "service": "لافتات وإعلانات",
    "year": 2024,
    "sortOrder": 206
  },
  {
    "imageUrl": "/images/portfolio/savvy_dental_1.jpeg",
    "title": "سافي للأسنان | بروشور العيادة",
    "category": "طباعة رقمية",
    "service": "مطبوعات",
    "year": 2024,
    "sortOrder": 207
  },
  {
    "imageUrl": "/images/portfolio/savvy_dental_2.jpeg",
    "title": "سافي للأسنان | البروشور الداخلي",
    "category": "طباعة رقمية",
    "service": "مطبوعات",
    "year": 2024,
    "sortOrder": 208
  },
  {
    "imageUrl": "/images/portfolio/savvy_dental_3.jpeg",
    "title": "سافي للأسنان | رول أب بانر",
    "category": "طباعة رقمية",
    "service": "مطبوعات",
    "year": 2024,
    "sortOrder": 209
  },
  {
    "imageUrl": "/images/portfolio/savvy_dental_4.jpeg",
    "title": "سافي للأسنان | غلاف البروشور",
    "category": "طباعة رقمية",
    "service": "مطبوعات",
    "year": 2024,
    "sortOrder": 210
  },
  {
    "imageUrl": "/images/portfolio/medical_center_1.jpeg",
    "title": "المركز الصحي | الواجهة المكتملة",
    "category": "ورشة تصنيع",
    "service": "لافتات وإعلانات",
    "year": 2024,
    "sortOrder": 211
  },
  {
    "imageUrl": "/images/portfolio/medical_center_2.jpeg",
    "title": "المركز الصحي | مرحلة التركيب",
    "category": "ورشة تصنيع",
    "service": "لافتات وإعلانات",
    "year": 2024,
    "sortOrder": 212
  },
  {
    "imageUrl": "/images/portfolio/express_motors_7.jpeg",
    "title": "إكسبرس موتورز | جدارية الشعار",
    "category": "هوية مؤسسية",
    "service": "هوية بصرية",
    "year": 2024,
    "sortOrder": 213
  },
  {
    "imageUrl": "/images/portfolio/express_motors_8.jpeg",
    "title": "إكسبرس موتورز | لافتة مضيئة",
    "category": "هوية مؤسسية",
    "service": "هوية بصرية",
    "year": 2024,
    "sortOrder": 214
  },
  {
    "imageUrl": "/images/portfolio/express_motors_9.jpeg",
    "title": "إكسبرس موتورز | تفاصيل الشعار",
    "category": "هوية مؤسسية",
    "service": "هوية بصرية",
    "year": 2024,
    "sortOrder": 215
  },
  {
    "imageUrl": "/images/portfolio/express_motors_10.jpeg",
    "title": "إكسبرس موتورز | شعار جانبي",
    "category": "هوية مؤسسية",
    "service": "هوية بصرية",
    "year": 2024,
    "sortOrder": 216
  },
  {
    "imageUrl": "/images/portfolio/express_motors_11.jpeg",
    "title": "إكسبرس موتورز | قبل الافتتاح",
    "category": "هوية مؤسسية",
    "service": "هوية بصرية",
    "year": 2024,
    "sortOrder": 217
  },
  {
    "imageUrl": "/images/portfolio/clinic_signs_1.jpeg",
    "title": "لافتة عيادة أكريليك | المنسق الطبي",
    "category": "ورشة تصنيع",
    "service": "لافتات داخلية",
    "year": 2024,
    "sortOrder": 218
  },
  {
    "imageUrl": "/images/portfolio/clinic_signs_2.jpeg",
    "title": "لافتة عيادة | غرفة الإفاقة",
    "category": "ورشة تصنيع",
    "service": "لافتات داخلية",
    "year": 2024,
    "sortOrder": 219
  },
  {
    "imageUrl": "/images/portfolio/clinic_signs_3.jpeg",
    "title": "لافتة عيادة | Clinic 2",
    "category": "ورشة تصنيع",
    "service": "لافتات داخلية",
    "year": 2024,
    "sortOrder": 220
  },
  {
    "imageUrl": "/images/portfolio/clinic_signs_4.jpeg",
    "title": "لافتة عيادة | دورة مياه",
    "category": "ورشة تصنيع",
    "service": "لافتات داخلية",
    "year": 2024,
    "sortOrder": 221
  },
  {
    "imageUrl": "/images/portfolio/clinic_signs_5.jpeg",
    "title": "لافتة عيادة | ذوي الاحتياجات",
    "category": "ورشة تصنيع",
    "service": "لافتات داخلية",
    "year": 2024,
    "sortOrder": 222
  },
  {
    "imageUrl": "/images/portfolio/image_restaurant_1.jpeg",
    "title": "IMAGE | تركيب شعار ذهبي",
    "category": "هوية مؤسسية",
    "service": "هوية بصرية",
    "year": 2024,
    "sortOrder": 223
  },
  {
    "imageUrl": "/images/portfolio/image_restaurant_2.jpeg",
    "title": "IMAGE | شعار ذهبي مكتمل",
    "category": "هوية مؤسسية",
    "service": "هوية بصرية",
    "year": 2024,
    "sortOrder": 224
  },
  {
    "imageUrl": "/images/portfolio/khayallah_1.jpeg",
    "title": "خيالة | تركيب واجهة",
    "category": "ورشة تصنيع",
    "service": "لافتات وإعلانات",
    "year": 2024,
    "sortOrder": 225
  },
  {
    "imageUrl": "/images/portfolio/khayallah_2.jpeg",
    "title": "خيالة | إضاءة ليلية ذهبية",
    "category": "ورشة تصنيع",
    "service": "لافتات وإعلانات",
    "year": 2024,
    "sortOrder": 226
  },
  {
    "imageUrl": "/images/portfolio/khayallah_3.jpeg",
    "title": "خيالة | مبنى ليلي مضاء",
    "category": "ورشة تصنيع",
    "service": "لافتات وإعلانات",
    "year": 2024,
    "sortOrder": 227
  }
] as const;

  const SERVICES_SEED = [
  {
    "title": "الطباعة الرقمية",
    "title_en": "Digital Printing",
    "description": "نسعى دائماً في فلكس لتقديم أفضل جودة في الخدمات والإعلانات للوصول إلى أعلى مستويات رضا العملاء. نستخدم أحدث التقنيات في معدات الطباعة ونختار أجود المواد وفق المعايير والمواصفات المعتمدة في المملكة العربية السعودية.",
    "description_en": "At Flex, we strive to deliver the highest quality in advertising and printing services to achieve maximum customer satisfaction. We use the latest printing equipment and select premium materials according to Saudi standards.",
    "icon": "Printer"
  },
  {
    "title": "الاستيكر والتلمينيشن",
    "title_en": "Sticker & Lamination",
    "description": "نوفر خدمات الطباعة الرقمية على جميع أنواع الاستيكر والتلمينيشن بأعلى جودة وأدق تفاصيل، مع ضمان متانة المواد وثباتها لفترات طويلة في جميع الظروف الجوية.",
    "description_en": "We provide high-quality digital printing on all types of stickers and lamination films with exceptional detail, ensuring material durability and longevity in all weather conditions.",
    "icon": "Layers"
  },
  {
    "title": "الطباعة الأوفست",
    "title_en": "Offset Printing",
    "description": "نتميز في فلكس بخدمات الطباعة الأوفست الاحترافية للمطبوعات التجارية والإعلانية بكميات كبيرة بأعلى جودة وأسعار تنافسية، مع الالتزام بمعايير الجودة العالمية.",
    "description_en": "Flex excels in professional offset printing for commercial and advertising materials in large quantities, delivering the highest quality at competitive prices while adhering to global quality standards.",
    "icon": "BookOpen"
  },
  {
    "title": "الهوية المؤسسية",
    "title_en": "Corporate Identity",
    "description": "في فلكس نولي أدق التفاصيل لنصمم لك أفكارك التي تحقق أهدافك وانعكاس احترافية عملك. نبني هويات بصرية متكاملة من الشعار والألوان والخطوط حتى التطبيقات الكاملة على جميع مواد الشركة.",
    "description_en": "At Flex, we pay attention to every detail to design ideas that achieve your goals and reflect your professionalism. We build complete visual identities — from logo and colors to full application across all company materials.",
    "icon": "Building2"
  },
  {
    "title": "ماكينات الليزر",
    "title_en": "Laser Cutting",
    "description": "نستخدم في فلكس أحدث ماكينات الليزر في قص المعادن والأخشاب والإكريلك من أجل الحفاظ على أفضل النتائج وأعلى جودة في صناعة الإعلان.",
    "description_en": "Flex uses the latest laser machines for cutting metals, wood, and acrylic to ensure the best results and highest quality in advertising manufacturing.",
    "icon": "Zap"
  },
  {
    "title": "التصميم ثلاثي الأبعاد",
    "title_en": "3D Design",
    "description": "نقدم خدمات التصميم والتصور ثلاثي الأبعاد للمشاريع الإعلانية والمعمارية، مما يتيح لعملائنا رؤية واضحة ومجسمة لمشاريعهم قبل التنفيذ الفعلي.",
    "description_en": "We provide 3D design and visualization services for advertising and architectural projects, giving our clients a clear and tangible view of their projects before actual implementation.",
    "icon": "Box"
  },
  {
    "title": "إدارة الفعاليات والمعارض",
    "title_en": "Events & Exhibitions",
    "description": "نستخدم في وكالة فلكس أحدث التقنيات لإدارة الحفلات والمؤتمرات وتنظيم المعارض. كما نستخدم أعلى جودة من استندات العرض الخاصة بجميع المناسبات التي تضمن لك مظهراً لائقاً ومميزاً.",
    "description_en": "Flex Agency uses the latest technologies to manage concerts, conferences, and exhibitions. We use the highest quality display stands for all occasions, ensuring a distinguished and professional appearance.",
    "icon": "CalendarDays"
  },
  {
    "title": "الهدايا الترويجية",
    "title_en": "Promotional Gifts",
    "description": "نقدر قيمة وقتك ومواعيدك الترويجية الضيقة. نوفر مجموعة متنوعة من الهدايا الترويجية المميزة، وبمجرد الموافقة على التصميم نضمن طباعة منتجاتك وتسليمها في الوقت المحدد.",
    "description_en": "We value your time and tight promotional deadlines. We offer a wide range of distinctive promotional gifts — once the design is approved, we guarantee printing and delivery on time.",
    "icon": "Gift"
  },
  {
    "title": "استيكر السيارات",
    "title_en": "Vehicle Wrapping",
    "description": "نقوم في وكالة فلكس للخدمات الإعلانية بطباعة وتنفيذ جميع أنواع الدعاية الخاصة بالسيارات الصغيرة ووسائل النقل المتوسطة والكبيرة بأعلى دقة وجودة في التنفيذ.",
    "description_en": "Flex Advertising Agency prints and installs all types of vehicle advertising for cars, medium, and large transport vehicles with the highest accuracy and quality.",
    "icon": "Car"
  },
  {
    "title": "ورشة التصنيع الإعلاني",
    "title_en": "Manufacturing Workshop",
    "description": "نقوم في وكالة فلكس للخدمات الإعلانية بصناعة جميع أنواع اللوحات الدعائية والإعلانية بجميع أنواعها: لوحات فلكس فيس، لوحات اليونيبول، لوحات الأحرف المجسمة، وجهات الكلادينج، لوحات البنر.",
    "description_en": "Flex Advertising Agency manufactures all types of advertising and promotional signage: flex face boards, unipole signs, 3D letter boards, cladding facades, and banner signs.",
    "icon": "Factory"
  }
];

  const CLIENTS_SEED = [
  { "name": "Saudi Aramco", "sector": "Energy", "logoUrl": "/images/logos/aramco.png", "website": null },
  { "name": "Al Rajhi Bank", "sector": "Finance", "logoUrl": "/images/logos/alrajhi_bank.png", "website": null },
  { "name": "SABIC", "sector": "Petrochemicals", "logoUrl": "/images/logos/sabic.png", "website": null },
  { "name": "Almarai", "sector": "Food & Beverage", "logoUrl": "/images/logos/almarai.png", "website": null },
  { "name": "Pepsi", "sector": "FMCG", "logoUrl": "/images/logos/pepsi.png", "website": null },
  { "name": "Coca-Cola", "sector": "FMCG", "logoUrl": "/images/logos/coca_cola.png", "website": null },
  { "name": "IKEA", "sector": "Retail", "logoUrl": "/images/logos/ikea.png", "website": null },
  { "name": "Panda", "sector": "Retail", "logoUrl": "/images/logos/panda.png", "website": null },
  { "name": "Riyad Bank", "sector": "Finance", "logoUrl": "/images/logos/riyad_bank.png", "website": null },
  { "name": "Alinma Bank", "sector": "Finance", "logoUrl": "/images/logos/alinma_bank.png", "website": null },
  { "name": "Al Baik", "sector": "Food & Beverage", "logoUrl": "/images/logos/albaik.png", "website": null },
  { "name": "Domino's", "sector": "Food & Beverage", "logoUrl": "/images/logos/dominos.png", "website": null },
  { "name": "Indomie", "sector": "Food & Beverage", "logoUrl": "/images/logos/indomie.png", "website": null },
  { "name": "Petromin", "sector": "Energy", "logoUrl": "/images/logos/petromin.png", "website": null },
  { "name": "Sipchem", "sector": "Petrochemicals", "logoUrl": "/images/logos/sipchem.png", "website": null },
  { "name": "Maaden", "sector": "Mining", "logoUrl": "/images/logos/maaden.png", "website": null },
  { "name": "Riyadh Season", "sector": "Events", "logoUrl": "/images/logos/riyadh_season.png", "website": null },
  { "name": "General Entertainment Authority", "sector": "Government", "logoUrl": "/images/logos/gea.png", "website": null },
  { "name": "Sela", "sector": "Events", "logoUrl": "/images/logos/sela.png", "website": null },
  { "name": "Cenomi", "sector": "Retail", "logoUrl": "/images/logos/cenomi.png", "website": null },
  { "name": "Othaim", "sector": "Retail", "logoUrl": "/images/logos/othaim.png", "website": null },
  { "name": "Extra", "sector": "Retail", "logoUrl": "/images/logos/extra.png", "website": null },
  { "name": "Dunkin", "sector": "Food & Beverage", "logoUrl": "/images/logos/dunkin.png", "website": null },
  { "name": "Hardee's", "sector": "Food & Beverage", "logoUrl": "/images/logos/hardees.png", "website": null },
  { "name": "Little Caesars", "sector": "Food & Beverage", "logoUrl": "/images/logos/little_caesars.png", "website": null },
  { "name": "KUDU", "sector": "Food & Beverage", "logoUrl": "/images/logos/kudu.png", "website": null },
  { "name": "Al Tazaj", "sector": "Food & Beverage", "logoUrl": "/images/logos/altazaj.png", "website": null },
  { "name": "Barn's", "sector": "Food & Beverage", "logoUrl": "/images/logos/barns.png", "website": null },
  { "name": "Lipton", "sector": "FMCG", "logoUrl": "/images/logos/lipton.png", "website": null },
  { "name": "Aquafina", "sector": "FMCG", "logoUrl": "/images/logos/aquafina.png", "website": null },
  { "name": "Nadec", "sector": "Food & Beverage", "logoUrl": "/images/logos/nadec.png", "website": null },
  { "name": "الرومانسية", "sector": "Food & Beverage", "logoUrl": "/images/logos/alromansiah.png", "website": null },
  { "name": "Nova Water", "sector": "FMCG", "logoUrl": "/images/logos/nova_water.png", "website": null },
  { "name": "Etaam", "sector": "Food & Beverage", "logoUrl": "/images/logos/etaam.png", "website": null },
  { "name": "Baja", "sector": "Food & Beverage", "logoUrl": "/images/logos/baja.png", "website": null },
  { "name": "Safa", "sector": "Food & Beverage", "logoUrl": "/images/logos/safa.png", "website": null },
  { "name": "Tania", "sector": "Food & Beverage", "logoUrl": "/images/logos/tania.png", "website": null },
  { "name": "Louzin", "sector": "Food & Beverage", "logoUrl": "/images/logos/louzin.png", "website": null },
  { "name": "Al Watania Poultry", "sector": "Food & Beverage", "logoUrl": "/images/logos/alwatania_poultry.png", "website": null },
  { "name": "Nahdi Pharmacy", "sector": "Healthcare", "logoUrl": "/images/logos/nahdi_pharmacy.png", "website": null },
  { "name": "Aramex", "sector": "Logistics", "logoUrl": "/images/logos/aramex.png", "website": null },
  { "name": "SASCO", "sector": "Energy", "logoUrl": "/images/logos/sasco.png", "website": null },
  { "name": "Mada", "sector": "Finance", "logoUrl": "/images/logos/mada.png", "website": null },
  { "name": "Maestro", "sector": "Finance", "logoUrl": "/images/logos/maestro.png", "website": null },
  { "name": "Yelo", "sector": "Finance", "logoUrl": "/images/logos/yelo.png", "website": null },
  { "name": "Urpay", "sector": "Finance", "logoUrl": "/images/logos/urpay.png", "website": null },
  { "name": "Bidaya Finance", "sector": "Finance", "logoUrl": "/images/logos/bidaya_finance.png", "website": null },
  { "name": "Emkan Finance", "sector": "Finance", "logoUrl": "/images/logos/emkan_finance.png", "website": null },
  { "name": "AlJazeera Capital", "sector": "Finance", "logoUrl": "/images/logos/aljazeera_capital.png", "website": null },
  { "name": "BSF", "sector": "Finance", "logoUrl": "/images/logos/bsf.png", "website": null },
  { "name": "Al Ramz", "sector": "Finance", "logoUrl": "/images/logos/alramz.png", "website": null },
  { "name": "SAR Railway", "sector": "Transport", "logoUrl": "/images/logos/sar_railway.png", "website": null },
  { "name": "Theeb", "sector": "Automotive", "logoUrl": "/images/logos/theeb.png", "website": null },
  { "name": "Modon", "sector": "Real Estate", "logoUrl": "/images/logos/modon.png", "website": null },
  { "name": "Retal", "sector": "Real Estate", "logoUrl": "/images/logos/retal.png", "website": null },
  { "name": "Al Majdiah Residence", "sector": "Real Estate", "logoUrl": "/images/logos/almajdiah.png", "website": null },
  { "name": "Wukkan", "sector": "Real Estate", "logoUrl": "/images/logos/wukkan.png", "website": null },
  { "name": "Al Jumeih", "sector": "Automotive", "logoUrl": "/images/logos/aljumeih.png", "website": null },
  { "name": "Hankook", "sector": "Automotive", "logoUrl": "/images/logos/hankook.png", "website": null },
  { "name": "Saudi Ceramics", "sector": "Manufacturing", "logoUrl": "/images/logos/saudi_ceramics.png", "website": null },
  { "name": "Ithra", "sector": "Culture", "logoUrl": "/images/logos/ithra.png", "website": null },
  { "name": "Salam Mobile", "sector": "Telecom", "logoUrl": "/images/logos/salam_mobile.png", "website": null },
  { "name": "KABI", "sector": "Technology", "logoUrl": "/images/logos/kabi.png", "website": null },
  { "name": "Al Asala", "sector": "Retail", "logoUrl": "/images/logos/alasala.png", "website": null },
  { "name": "Deemah", "sector": "Retail", "logoUrl": "/images/logos/deemah.png", "website": null },
  { "name": "Kinza", "sector": "Retail", "logoUrl": "/images/logos/kinza.png", "website": null },
  { "name": "Masdar", "sector": "Technology", "logoUrl": "/images/logos/masdar_tech.png", "website": null },
  { "name": "Ades", "sector": "FMCG", "logoUrl": "/images/logos/ades.png", "website": null },
  { "name": "Al Majdawi", "sector": "Retail", "logoUrl": "/images/logos/almajdawi.png", "website": null },
  { "name": "Daraa", "sector": "Retail", "logoUrl": "/images/logos/daraa.png", "website": null },
  { "name": "Arabiya Oud", "sector": "Retail", "logoUrl": "/images/logos/arabiya_oud.png", "website": null },
  { "name": "Basamat Dental", "sector": "Healthcare", "logoUrl": "/images/logos/basamat_dental.png", "website": null },
  {
    "name": "Eni",
    "sector": "طاقة ونفط",
    "logoUrl": "/images/clients/logo_01.png",
    "website": "https://www.eni.com"
  },
  {
    "name": "Shell",
    "sector": "طاقة ونفط",
    "logoUrl": "/images/clients/logo_02.png",
    "website": "https://www.shell.com"
  },
  {
    "name": "Dresser-Rand",
    "sector": "صناعة ومعدات",
    "logoUrl": "/images/clients/logo_03.png",
    "website": "https://www.dresser-rand.com"
  },
  {
    "name": "Castrol",
    "sector": "طاقة ومواد تشحيم",
    "logoUrl": "/images/clients/logo_04.png",
    "website": "https://www.castrol.com"
  },
  {
    "name": "Goodyear",
    "sector": "سيارات وإطارات",
    "logoUrl": "/images/clients/logo_05.png",
    "website": "https://www.goodyear.com"
  },
  {
    "name": "Cham Dental & Derma Clinics",
    "sector": "رعاية صحية",
    "logoUrl": "/images/clients/logo_06.png",
    "website": null
  },
  {
    "name": "Gama Hospital - مستشفى جاما",
    "sector": "رعاية صحية",
    "logoUrl": "/images/clients/logo_07.png",
    "website": null
  },
  {
    "name": "Domino's Pizza",
    "sector": "أغذية ومطاعم",
    "logoUrl": "/images/clients/logo_08.png",
    "website": "https://www.dominos.com.sa"
  },
  {
    "name": "Rabia Café",
    "sector": "أغذية ومطاعم",
    "logoUrl": "/images/clients/logo_09.png",
    "website": null
  },
  {
    "name": "McVitie's",
    "sector": "أغذية ومشروبات",
    "logoUrl": "/images/clients/logo_10.png",
    "website": "https://www.mcvities.co.uk"
  },
  {
    "name": "Indomie",
    "sector": "أغذية ومشروبات",
    "logoUrl": "/images/clients/logo_11.png",
    "website": "https://www.indomie.com"
  },
  {
    "name": "Saudi Aramco - أرامكو السعودية",
    "sector": "نفط وغاز",
    "logoUrl": "/images/clients/logo_13.png",
    "website": "https://www.aramco.com"
  },
  {
    "name": "Sadara Chemical Company",
    "sector": "بتروكيماويات",
    "logoUrl": "/images/clients/logo_14.png",
    "website": "https://www.sadara.com"
  },
  {
    "name": "Sipchem - سيبكيم",
    "sector": "بتروكيماويات",
    "logoUrl": "/images/clients/logo_15.png",
    "website": "https://www.sipchem.com"
  },
  {
    "name": "AMIRI Power & Industrial Group",
    "sector": "صناعة وطاقة",
    "logoUrl": "/images/clients/logo_16.png",
    "website": null
  },
  {
    "name": "Coca-Cola",
    "sector": "أغذية ومشروبات",
    "logoUrl": "/images/clients/logo_17.png",
    "website": "https://www.coca-cola.com"
  },
  {
    "name": "PepsiCo - بيبسيكو",
    "sector": "أغذية ومشروبات",
    "logoUrl": "/images/clients/logo_19.png",
    "website": "https://www.pepsico.com"
  },
  {
    "name": "KUDU - كودو",
    "sector": "أغذية ومطاعم",
    "logoUrl": "/images/clients/logo_21.png",
    "website": "https://www.kudurest.com"
  },
  {
    "name": "Petrokemya - بترو كيميا",
    "sector": "بتروكيماويات",
    "logoUrl": "/images/clients/logo_23.png",
    "website": "https://www.petrokemya.sabic.com"
  },
  {
    "name": "Extra - إكسترا",
    "sector": "تجزئة إلكترونيات",
    "logoUrl": "/images/clients/logo_24.png",
    "website": "https://www.extra.com"
  },
  {
    "name": "Huawei - هواوي",
    "sector": "تقنية واتصالات",
    "logoUrl": "/images/clients/logo_25.png",
    "website": "https://www.huawei.com"
  },
  {
    "name": "Samsung",
    "sector": "تقنية إلكترونيات",
    "logoUrl": "/images/clients/logo_26.png",
    "website": "https://www.samsung.com"
  },
  {
    "name": "LG",
    "sector": "تقنية إلكترونيات",
    "logoUrl": "/images/clients/logo_27.png",
    "website": "https://www.lg.com"
  },
  {
    "name": "SACO - ساكو",
    "sector": "تجزئة ومنزل",
    "logoUrl": "/images/clients/logo_28.png",
    "website": "https://www.sacogroup.com"
  },
  {
    "name": "IKEA",
    "sector": "أثاث وتجزئة",
    "logoUrl": "/images/clients/logo_29.png",
    "website": "https://www.ikea.com/sa"
  },
  {
    "name": "SAPTCO - سابتكو",
    "sector": "نقل ومواصلات",
    "logoUrl": "/images/clients/logo_30.png",
    "website": "https://www.saptco.com.sa"
  },
  {
    "name": "Al Rajhi Takaful - تكافل الراجحي",
    "sector": "تأمين ومالية",
    "logoUrl": "/images/clients/logo_31.png",
    "website": "https://www.alrajhitakaful.com"
  },
  {
    "name": "Electro - إلكترو",
    "sector": "تجزئة إلكترونيات",
    "logoUrl": "/images/clients/logo_32.png",
    "website": null
  }
] as const;

  const PORTFOLIO_SEED = [
  { "title": "خيالة | الواجهة الليلية المضيئة", "title_en": "Khayallah | Illuminated Night Facade", "category": "لافتات وواجهات", "category_en": "Signage & Facades", "description": "تصميم وتنفيذ الواجهة الإعلانية الكاملة مع إضاءة ليلية احترافية بارزة", "description_en": "Full advertising facade design and installation with premium night lighting", "imageUrl": "/images/portfolio/khayallah_facade_night_1.jpeg", "client": "خيالة", "year": 2024 },
  { "title": "خيالة | توتيم المدخل الإعلاني", "title_en": "Khayallah | Entrance Advertising Totem", "category": "لافتات وواجهات", "category_en": "Signage & Facades", "description": "تصنيع وتركيب توتيم مضيء عند مدخل المجمع بألوان العلامة التجارية", "description_en": "Manufacturing and installation of illuminated entrance totem matching brand colors", "imageUrl": "/images/portfolio/khayallah_totem_lit_1.jpeg", "client": "خيالة", "year": 2024 },
  { "title": "خيالة | إشارات مواقف السيارات", "title_en": "Khayallah | Parking Directional Signage", "category": "لافتات وواجهات", "category_en": "Signage & Facades", "description": "تصميم وتركيب منظومة إشارات مواقف السيارات المتكاملة", "description_en": "Design and installation of complete parking directional signage system", "imageUrl": "/images/portfolio/khayallah_parking_sign_1.jpeg", "client": "خيالة", "year": 2024 },
  { "title": "إكسبرس موتورز | شعار ثلاثي الأبعاد", "title_en": "Express Motors | 3D Brand Logo", "category": "هوية بصرية", "category_en": "Visual Identity", "description": "تصنيع شعار ثلاثي الأبعاد بالأحرف المجسمة السوداء والحمراء لصالة السيارات", "description_en": "Manufacturing 3D dimensional letters logo in black and red for the automotive showroom", "imageUrl": "/images/portfolio/express_motors_5.jpeg", "client": "إكسبرس موتورز", "year": 2024 },
  { "title": "إكسبرس موتورز | واجهة صالة العرض", "title_en": "Express Motors | Showroom Facade", "category": "هوية بصرية", "category_en": "Visual Identity", "description": "تصميم وتنفيذ واجهة صالة عرض السيارات بالهوية البصرية الكاملة", "description_en": "Full visual identity design and implementation for the car showroom facade", "imageUrl": "/images/portfolio/express_motors_1.jpeg", "client": "إكسبرس موتورز", "year": 2024 },
  { "title": "إكسبرس موتورز | جدارية الشعار الأيقوني", "title_en": "Express Motors | Iconic Brand Mural", "category": "هوية بصرية", "category_en": "Visual Identity", "description": "جدارية ضخمة بالتصميم الهندسي المميز داخل صالة العرض مع الإضاءة الجوية", "description_en": "Large geometric brand mural inside the showroom with atmospheric lighting", "imageUrl": "/images/portfolio/express_motors_7.jpeg", "client": "إكسبرس موتورز", "year": 2024 },
  { "title": "IMAGE Restaurant | الشعار الذهبي ثلاثي الأبعاد", "title_en": "IMAGE Restaurant | 3D Gold Signature Logo", "category": "هوية بصرية", "category_en": "Visual Identity", "description": "تصنيع وتركيب شعار ذهبي ثلاثي الأبعاد بارز على واجهة رخامية فاخرة", "description_en": "Manufacturing and mounting raised 3D gold logo on premium marble facade", "imageUrl": "/images/portfolio/image_restaurant_gold_1.jpeg", "client": "IMAGE Restaurant", "year": 2024 },
  { "title": "Drive7 | هوية صالة العرض", "title_en": "Drive7 | Showroom Visual Identity", "category": "هوية بصرية", "category_en": "Visual Identity", "description": "هوية بصرية متكاملة لصالة عرض السيارات مع تنفيذ الواجهة الداخلية والخارجية", "description_en": "Complete visual identity for the car showroom including interior and exterior implementation", "imageUrl": "/images/portfolio/drive7_1.jpeg", "client": "Drive7", "year": 2024 },
  { "title": "The Roof | هوية المطعم الراقي", "title_en": "The Roof | Fine Dining Brand Identity", "category": "هوية بصرية", "category_en": "Visual Identity", "description": "هوية بصرية متكاملة للمطعم الراقي تشمل الشعار واللافتات والمطبوعات", "description_en": "Complete visual identity for the fine dining restaurant covering logo, signage, and prints", "imageUrl": "/images/portfolio/theroof_1.jpeg", "client": "The Roof", "year": 2024 },
  { "title": "سافي للأسنان | الهوية البصرية", "title_en": "Savvy Dental | Brand Identity Package", "category": "مطبوعات", "category_en": "Print Media", "description": "حزمة هوية بصرية كاملة تضم بروشورات ورول آب وتصاميم طبية احترافية", "description_en": "Complete brand identity package including brochures, roll-ups, and professional medical designs", "imageUrl": "/images/portfolio/savvy_dental_1.jpeg", "client": "Savvy Dental", "year": 2024 },
  { "title": "Fuchsia | تغليف الشاحنة التجارية", "title_en": "Fuchsia | Commercial Truck Wrap", "category": "استيكر وتغليف", "category_en": "Wrap & Sticker", "description": "تغليف إعلاني كامل للشاحنة التجارية بهوية العلامة التجارية الكاملة", "description_en": "Full advertising wrap for commercial truck with complete brand identity", "imageUrl": "/images/portfolio/fuchsia_truck_1.jpeg", "client": "Fuchsia", "year": 2024 },
  { "title": "PepsiCo | الفعالية الموسيقية", "title_en": "PepsiCo | Music Event Production", "category": "فعاليات ومعارض", "category_en": "Events & Exhibitions", "description": "تصميم وتنفيذ لافتات النيون والإضاءة الجوية للفعالية الموسيقية الكبرى", "description_en": "Design and installation of neon signs and atmospheric lighting for the major music event", "imageUrl": "/images/portfolio/pepsi_music_2.jpeg", "client": "PepsiCo", "year": 2024 },
  { "title": "Enterprise | معرض تجاري متكامل", "title_en": "Enterprise | Full Trade Exhibition", "category": "فعاليات ومعارض", "category_en": "Events & Exhibitions", "description": "إدارة وتجهيز المعرض التجاري بالكامل من الستاندات واللافتات والمواد الترويجية", "description_en": "Full trade exhibition management including stands, signage, and promotional materials", "imageUrl": "/images/portfolio/enterprise_1.jpeg", "client": "Enterprise", "year": 2024 },
  { "title": "الوعد | لافتة واجهة المبنى", "title_en": "Al Awad | Building Facade Signage", "category": "لافتات وواجهات", "category_en": "Signage & Facades", "description": "تصنيع وتركيب لافتة الواجهة الرئيسية للمبنى بالأحرف المجسمة المضيئة", "description_en": "Manufacturing and installation of main building facade with illuminated dimensional letters", "imageUrl": "/images/portfolio/alawad_facade.jpeg", "client": "الوعد", "year": 2024 },
  { "title": "Life Spirit | واجهة العلامة التجارية", "title_en": "Life Spirit | Brand Facade Installation", "category": "لافتات وواجهات", "category_en": "Signage & Facades", "description": "تصميم وتنفيذ واجهة العلامة التجارية بالهوية الكاملة والإضاءة الداخلية", "description_en": "Design and implementation of brand facade with complete identity and internal lighting", "imageUrl": "/images/portfolio/life_spirit_facade.jpeg", "client": "Life Spirit", "year": 2024 },
  { "title": "Papillon | واجهة المطعم الفاخر", "title_en": "Papillon | Luxury Restaurant Facade", "category": "لافتات وواجهات", "category_en": "Signage & Facades", "description": "تنفيذ واجهة مطعم Papillon الفاخر بالتصميم الأنيق والإضاءة الجوية", "description_en": "Implementation of Papillon luxury restaurant facade with elegant design and atmospheric lighting", "imageUrl": "/images/portfolio/papillon_facade.jpeg", "client": "Papillon", "year": 2024 },
  { "title": "إنمار | تركيب اللافتة الخارجية", "title_en": "Inmar | External Signage Installation", "category": "لافتات وواجهات", "category_en": "Signage & Facades", "description": "تصنيع وتركيب اللافتة الخارجية المضيئة للمقر الرئيسي", "description_en": "Manufacturing and installation of illuminated external signage for the main headquarters", "imageUrl": "/images/portfolio/inmar_facade.jpeg", "client": "إنمار", "year": 2024 },
  { "title": "المركز الصحي الأولي | واجهة مكتملة", "title_en": "Primary Health Center | Complete Facade", "category": "لافتات وواجهات", "category_en": "Signage & Facades", "description": "تصميم وتنفيذ واجهة المركز الصحي الكاملة مع الألواح الخارجية الثلاثية الأبعاد", "description_en": "Full design and implementation of health center facade with 3D exterior panels", "imageUrl": "/images/portfolio/medical_center_1.jpeg", "client": "مركز الجودة الصحية", "year": 2024 },
  { "title": "عيادة طبية | لافتات أكريليك داخلية", "title_en": "Medical Clinic | Interior Acrylic Signage", "category": "لافتات وواجهات", "category_en": "Signage & Facades", "description": "تصنيع وتركيب لافتات أكريليك شفافة بإطارات ستانلس ستيل لجميع أقسام العيادة", "description_en": "Manufacturing and installation of transparent acrylic signs with stainless steel frames for all clinic departments", "imageUrl": "/images/portfolio/clinic_signs_1.jpeg", "client": "مركز طبي", "year": 2024 },
  { "title": "لافتة رخامية | حروف ذهبية فاخرة", "title_en": "Marble Signage | Premium Gold Letters", "category": "لافتات وواجهات", "category_en": "Signage & Facades", "description": "تصنيع حروف ذهبية فاخرة مجسمة على واجهة رخامية بيضاء لمدخل مبنى تجاري", "description_en": "Manufacturing premium 3D gold letters on white marble facade for commercial building entrance", "imageUrl": "/images/portfolio/facade_sign_marble.jpeg", "client": "مشروع خاص", "year": 2024 },
  { "title": "Business Yard | لافتات المجمع التجاري", "title_en": "Business Yard | Commercial Complex Signage", "category": "لافتات وواجهات", "category_en": "Signage & Facades", "description": "تصنيع وتركيب منظومة لافتات المجمع التجاري التوجيهية والإعلانية", "description_en": "Manufacturing and installation of commercial complex directional and advertising signage system", "imageUrl": "/images/portfolio/business_yard_1.jpeg", "client": "Business Yard", "year": 2024 },
  { "title": "Protein Up | تصميم واجهة المتجر", "title_en": "Protein Up | Store Facade Design", "category": "لافتات وواجهات", "category_en": "Signage & Facades", "description": "تصميم وتنفيذ واجهة متجر المكملات الغذائية بهوية الماركة الكاملة", "description_en": "Design and implementation of supplement store facade with complete brand identity", "imageUrl": "/images/portfolio/protein_up_1.jpeg", "client": "Protein Up", "year": 2024 },
  { "title": "آيس كريما | لافتة المحل التجاري", "title_en": "Ice Creamaa | Store Commercial Signage", "category": "لافتات وواجهات", "category_en": "Signage & Facades", "description": "تصميم لافتة جذابة بألوان مميزة تعكس هوية الماركة وتجذب العملاء", "description_en": "Eye-catching sign design with distinctive colors reflecting brand identity and attracting customers", "imageUrl": "/images/portfolio/ice_creamaa_1.jpeg", "client": "آيس كريما", "year": 2024 }
];

  export async function seedIfEmpty(): Promise<void> {
    try {
      const galleryRows = await db.execute(sql`SELECT COUNT(*) AS cnt FROM gallery`);
      const galleryCnt = Number(((galleryRows as unknown as Record<string, unknown>[])[0] ?? (galleryRows as any).rows?.[0] ?? {cnt:0}).cnt);
      if (galleryCnt === 0) {
        logger.info("Seeding gallery table…");
        for (let i = 0; i < GALLERY_SEED.length; i += 50) {
          await db.insert(galleryTable).values(GALLERY_SEED.slice(i, i + 50) as any[]);
        }
        logger.info({ count: GALLERY_SEED.length }, "Gallery seeded");
      } else {
        logger.info({ galleryCnt }, "Gallery already populated, skipping seed");
      }

      const servicesRows = await db.execute(sql`SELECT COUNT(*) AS cnt FROM services`);
      const servicesCnt = Number(((servicesRows as unknown as Record<string, unknown>[])[0] ?? (servicesRows as any).rows?.[0] ?? {cnt:0}).cnt);
      if (servicesCnt === 0) {
        logger.info("Seeding services table…");
        await db.insert(servicesTable).values(SERVICES_SEED as any[]);
        logger.info({ count: SERVICES_SEED.length }, "Services seeded");
      } else {
        // Patch any services missing English translations
        await db.execute(sql`UPDATE services SET title_en='Advertising & Promotions', description_en='We craft innovative advertising campaigns that leave a lasting impression on your audience and achieve your marketing goals with excellence.' WHERE title='الدعاية والإعلان' AND (title_en IS NULL OR title_en='')`);
        await db.execute(sql`UPDATE services SET title_en='Visual Identity Design', description_en='We build comprehensive visual identities that reflect your brand values and distinguish you in the market with a professional, creative approach.' WHERE title='تصميم الهوية البصرية' AND (title_en IS NULL OR title_en='')`);
        await db.execute(sql`UPDATE services SET title_en='Video & Motion Graphics', description_en='We produce premium visual content — TV commercials and motion graphics videos that capture attention and tell your brand story.' WHERE title='إنتاج الفيديو والموشن جرافيك' AND (title_en IS NULL OR title_en='')`);
        await db.execute(sql`UPDATE services SET title_en='Digital Marketing', description_en='We manage your digital presence across all platforms with targeted strategies that grow your audience and increase your sales.' WHERE title='التسويق الرقمي' AND (title_en IS NULL OR title_en='')`);
        await db.execute(sql`UPDATE services SET title_en='Print Design', description_en='From brochures to catalogs and banners — we design and print all your marketing materials with the highest quality and precision.' WHERE title='تصميم المطبوعات' AND (title_en IS NULL OR title_en='')`);
        await db.execute(sql`UPDATE services SET title_en='Marketing Consultancy', description_en='We provide comprehensive marketing consultancy to help you build the right strategy, understand your market, and achieve your business goals.' WHERE title='الاستشارات التسويقية' AND (title_en IS NULL OR title_en='')`);
        logger.info("Services translations patched");
      }

      const clientsRows = await db.execute(sql`SELECT COUNT(*) AS cnt FROM clients`);
      const clientsCnt = Number(((clientsRows as unknown as Record<string, unknown>[])[0] ?? (clientsRows as any).rows?.[0] ?? {cnt:0}).cnt);
      if (clientsCnt === 0) {
        logger.info("Seeding clients table…");
        await db.insert(clientsTable).values(CLIENTS_SEED as any[]);
        logger.info({ count: CLIENTS_SEED.length }, "Clients seeded");
      } else {
        // Detect old placeholder logos (from /images/clients/) and replace with new real logos
        const oldLogoRows = await db.execute(sql`SELECT COUNT(*) AS cnt FROM clients WHERE logo_url LIKE '%/images/clients/%'`);
        const oldLogoCnt = Number(((oldLogoRows as unknown as Record<string, unknown>[])[0] ?? (oldLogoRows as any).rows?.[0] ?? {cnt:0}).cnt);
        if (oldLogoCnt > 0) {
          logger.info({ oldLogoCnt }, "Detected old client logos — replacing with real brand logos");
          await db.execute(sql`DELETE FROM clients`);
          await db.insert(clientsTable).values(CLIENTS_SEED as any[]);
          logger.info({ count: CLIENTS_SEED.length }, "Clients replaced with real brand logos");
        }
      }

      const portfolioRows = await db.execute(sql`SELECT COUNT(*) AS cnt FROM portfolio`);
      const portfolioCnt = Number(((portfolioRows as unknown as Record<string, unknown>[])[0] ?? (portfolioRows as any).rows?.[0] ?? {cnt:0}).cnt);
      if (portfolioCnt === 0) {
        logger.info("Seeding portfolio table…");
        await db.insert(portfolioTable).values(PORTFOLIO_SEED as any[]);
        logger.info({ count: PORTFOLIO_SEED.length }, "Portfolio seeded");
      } else {
        // Detect fake placeholder data (Unsplash URLs) and replace with real project images
        const fakeRows = await db.execute(sql`SELECT COUNT(*) AS cnt FROM portfolio WHERE image_url LIKE '%unsplash%'`);
        const fakeCnt = Number(((fakeRows as unknown as Record<string, unknown>[])[0] ?? (fakeRows as any).rows?.[0] ?? {cnt:0}).cnt);
        if (fakeCnt > 0) {
          logger.info({ fakeCnt }, "Detected placeholder portfolio images — replacing with real project photos");
          await db.execute(sql`DELETE FROM portfolio`);
          await db.insert(portfolioTable).values(PORTFOLIO_SEED as any[]);
          logger.info({ count: PORTFOLIO_SEED.length }, "Portfolio replaced with real project photos");
        }
      }
    } catch (err) {
      logger.error({ err }, "Error during database seed");
    }
  }
  
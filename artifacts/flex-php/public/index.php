<?php
$currentPage = 'home';
$pageTitle   = 'فلكس للدعاية والإعلان | Flex for Advertising';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../config.php';
// LCP preload: first hero background image
$heroPreloadSrc = imgUrl('/images/landmarks/alula_ancient.jpg', 1400, 0, 72);
require_once __DIR__ . '/../includes/header.php';

$heroSlides = [
  ['img'=>'images/landmarks/alula_ancient.jpg',   'badge'=>['ar'=>'من عمق التاريخ إلى ذروة الإبداع','en'=>'From Ancient Roots to Modern Impact'],     't1'=>['ar'=>'جذورنا في التراث','en'=>'Rooted in Heritage'],         't2'=>['ar'=>'وأثرنا في الغد','en'=>'Defining Tomorrow'],              'sub'=>['ar'=>'كما نقشت حضارات الجزيرة العربية اسمها في الصخر، نحن ننقش علامتك في ذاكرة جمهورك إلى الأبد.','en'=>'Just as Arabian civilizations carved their names into stone, we carve your brand into the memory of your audience — forever.']],
  ['img'=>'images/landmarks/kingdom_tower.jpg',   'badge'=>['ar'=>'طموح بلا سقف','en'=>'Ambition Without Limits'],                                       't1'=>['ar'=>'نبني علامتك','en'=>'We Build Your Brand'],               't2'=>['ar'=>'حتى تلامس السحاب','en'=>'Until It Touches the Sky'],    'sub'=>['ar'=>'ليس كل من ارتفع وصل — لكن من يملك الرؤية والشريك الصح يصل دائماً. نحن شريكك نحو القمة.','en'=>'Not everyone who rises, reaches — but those with the right vision and the right partner always do. We are that partner.']],
  ['img'=>'images/landmarks/king_fahad_road.jpg', 'badge'=>['ar'=>'في قلب الحركة التجارية','en'=>'At the Heart of Commerce'],                           't1'=>['ar'=>'علامتك في كل مكان','en'=>'Your Brand Everywhere'],       't2'=>['ar'=>'ولا مكان تختفي فيه','en'=>'Impossible to Ignore'],       'sub'=>['ar'=>'السوق لا يرحم الغائبين — نجعل علامتك حاضرة بقوة في كل منعطف، كل شاشة، وكل قرار شراء.','en'=>'The market is merciless to the absent — we make your brand impossible to miss at every turn, every screen, every buying decision.']],
  ['img'=>'images/landmarks/kaaba_aerial.jpg',    'badge'=>['ar'=>'قوة تتجاوز الحدود','en'=>'Power Beyond Borders'],                                     't1'=>['ar'=>'نصنع الحضور','en'=>'We Build Presence'],                 't2'=>['ar'=>'الذي يجمع القلوب','en'=>'That Moves People'],             'sub'=>['ar'=>'العلامات العظيمة لا تبيع فقط — تُلهم وتجمع. نبني لك هوية تتجاوز المنتج وتصبح جزءاً من حياة الناس.','en'=>"Great brands don't just sell — they inspire and unite. We build you an identity that transcends the product."]],
  ['img'=>'images/landmarks/alula.jpg',           'badge'=>['ar'=>'حيث الجمال يصبح علامة','en'=>'Where Beauty Becomes Brand'],                           't1'=>['ar'=>'الإعلان فن','en'=>'Advertising Is an Art'],              't2'=>['ar'=>'ونحن نتقن هذا الفن','en'=>"And We've Mastered It"],      'sub'=>['ar'=>'كما أن العلا تسحر كل من يراها، إعلاناتنا تأسر الجمهور قبل أن ينطق بكلمة.','en'=>'Just as AlUla captivates all who see it, our campaigns capture audiences before a word is spoken.']],
  ['img'=>'images/landmarks/diriyah.jpg',         'badge'=>['ar'=>'عراقة التاريخ وحداثة اليوم','en'=>'Heritage Meets Modernity'],                         't1'=>['ar'=>'هويتك التجارية','en'=>'Your Brand Identity'],            't2'=>['ar'=>'حكاية عبر الزمن','en'=>'A Timeless Story'],              'sub'=>['ar'=>'الدرعية علّمتنا أن الأصالة تدوم. نبني لك هوية راسخة تحمل قيمك وتواكب المستقبل.','en'=>"Diriyah taught us that authenticity endures. We build you a grounded identity that carries your values into the future."]],
  ['img'=>'images/landmarks/riyadh_sunset.jpg',   'badge'=>['ar'=>'نحو آفاق لا تنتهي','en'=>'Toward Endless Horizons'],                                  't1'=>['ar'=>'مستقبلك يبدأ','en'=>'Your Future Starts'],               't2'=>['ar'=>'من هنا','en'=>'Right Here'],                              'sub'=>['ar'=>'مع كل غروب شمس تنتهي جولة وتبدأ أخرى. نحن هنا لنجعل كل جولة أقوى وأبرز من سابقتها.','en'=>'With every sunset a chapter ends and a new one begins. We are here to make every chapter stronger and bolder.']],
  ['img'=>'images/landmarks/neom_line.jpg',       'badge'=>['ar'=>'من رؤية 2030 إلى رؤيتك','en'=>'From Vision 2030 to Your Vision'],                     't1'=>['ar'=>'نبني المستقبل','en'=>'We Build the Future'],             't2'=>['ar'=>'معاً','en'=>'Together'],                                   'sub'=>['ar'=>'كما ترسم المملكة ملامح مستقبل جديد، نساعدك على رسم ملامح علامتك التجارية في ذلك المستقبل.','en'=>"As Saudi Arabia shapes a new future, we help you shape your brand within that future."]],
];

// ─── Load from PostgreSQL DB ───
$dbServices  = dbQuery("SELECT id, title, title_en, description, description_en, icon FROM services ORDER BY CASE id WHEN 17 THEN 0 WHEN 18 THEN 1 ELSE id END LIMIT 12");
$dbPortfolio = dbQuery("SELECT id, title, title_en, category, category_en, image_url FROM portfolio ORDER BY id LIMIT 6");
$dbClients   = dbQuery("SELECT id, name, logo_url FROM clients WHERE logo_url IS NOT NULL ORDER BY id");

// Fallback icon map for DB service icons (lucide → heroicons SVG path)
function getIconPath(string $name): string {
    $icons = [
        'Printer'    => '<path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.75 19.5m.44-5.671a42.35 42.35 0 015.12-.668m0 0 3 3.375M6.75 19.5h10.5M12 15.375l3-3.375m0 0a2.625 2.625 0 100-5.25 2.625 2.625 0 000 5.25z"/>',
        'Layers'     => '<path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142-8.25L12 9.75"/>',
        'BookOpen'   => '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>',
        'Building2'  => '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/>',
        'Zap'        => '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
        'Camera'     => '<path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"/>',
        'Palette'    => '<path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/>',
        'Globe'      => '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M12 10.5c2.998 0 5.74 1.1 7.843 2.918"/>',
        'Wrench'     => '<path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/>',
        'SignBoard'   => '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"/>',
        'DisplayStand'=> '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 3h16.5M12 16.5v4.5m-3 0h6"/>',
        'Star'       => '<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>',
    ];
    $default = '<path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>';
    return $icons[$name] ?? $default;
}

// ── Fallback للخدمات عند غياب قاعدة البيانات ──────────────
if (empty($dbServices)) {
    $dbServices = [
        ['id'=>17,'title'=>'تصنيع اللوحات الإعلانية','title_en'=>'Sign Board Manufacturing','description'=>'لوحتك الإعلانية هي أول ما يراه العميل — نصنعها بمواد فاخرة وحرفية عالية تصمد أمام الزمن والطقس. لوحات فلكس فيس، أحرف مجسمة بإضاءة LED، واجهات كلادينج، يونيبول، وبنرات مشدودة.','description_en'=>'Your sign is the first thing your customer sees — we craft it with premium materials and high precision that withstands time and weather. Flex face boards, illuminated 3D letters, cladding facades, unipole signs, and stretched banners.','icon'=>'SignBoard'],
        ['id'=>18,'title'=>'استاندات العرض الاحترافية','title_en'=>'Professional Display Stands','description'=>'استاندات العرض الاحترافية هي سلاحك السري في المعارض والفعاليات — نصممها ونصنعها خصيصاً لتعكس هوية علامتك وتستقطب الزوار كالمغناطيس.','description_en'=>'Professional display stands are your secret weapon at exhibitions and events — we design and manufacture them specifically to reflect your brand identity and attract visitors like a magnet.','icon'=>'DisplayStand'],
        ['id'=>7, 'title'=>'الطباعة الرقمية','title_en'=>'Digital Printing','description'=>'نسعى دائماً في فلكس لتقديم أفضل جودة في الخدمات والإعلانات للوصول إلى أعلى مستويات رضا العملاء. نستخدم أحدث التقنيات في معدات الطباعة.','description_en'=>'At Flex, we strive to deliver the highest quality in advertising and printing services. We use the latest printing equipment and select premium materials according to Saudi standards.','icon'=>'Printer'],
        ['id'=>8, 'title'=>'الاستيكر والتلمينيشن','title_en'=>'Sticker & Lamination','description'=>'نوفر خدمات الطباعة الرقمية على جميع أنواع الاستيكر والتلمينيشن بأعلى جودة وأدق تفاصيل، مع ضمان متانة المواد وثباتها لفترات طويلة في جميع الظروف الجوية.','description_en'=>'We provide high-quality digital printing on all types of stickers and lamination films with exceptional detail, ensuring material durability in all weather conditions.','icon'=>'Layers'],
        ['id'=>9, 'title'=>'الطباعة الأوفست','title_en'=>'Offset Printing','description'=>'نتميز في فلكس بخدمات الطباعة الأوفست الاحترافية للمطبوعات التجارية والإعلانية بكميات كبيرة بأعلى جودة وأسعار تنافسية.','description_en'=>'Flex excels in professional offset printing for commercial and advertising materials in large quantities, delivering the highest quality at competitive prices.','icon'=>'BookOpen'],
        ['id'=>10,'title'=>'الهوية المؤسسية','title_en'=>'Corporate Identity','description'=>'في فلكس نولي أدق التفاصيل لنصمم لك أفكارك التي تحقق أهدافك. نبني هويات بصرية متكاملة من الشعار والألوان والخطوط حتى التطبيقات الكاملة.','description_en'=>'At Flex, we pay attention to every detail to design ideas that achieve your goals. We build complete visual identities — from logo and colors to full application across all company materials.','icon'=>'Building2'],
        ['id'=>11,'title'=>'ماكينات الليزر','title_en'=>'Laser Cutting','description'=>'نستخدم في فلكس أحدث ماكينات الليزر في قص المعادن والأخشاب والإكريلك من أجل الحفاظ على أفضل النتائج وأعلى جودة في صناعة الإعلان.','description_en'=>'Flex uses the latest laser machines for cutting metals, wood, and acrylic to ensure the best results and highest quality in advertising manufacturing.','icon'=>'Zap'],
        ['id'=>12,'title'=>'التصميم ثلاثي الأبعاد','title_en'=>'3D Design','description'=>'نقدم خدمات التصميم والتصور ثلاثي الأبعاد للمشاريع الإعلانية والمعمارية، مما يتيح لعملائنا رؤية واضحة ومجسمة لمشاريعهم قبل التنفيذ الفعلي.','description_en'=>'We provide 3D design and visualization services for advertising and architectural projects, giving our clients a clear view of their projects before actual implementation.','icon'=>'Box'],
        ['id'=>13,'title'=>'إدارة الفعاليات والمعارض','title_en'=>'Events & Exhibitions','description'=>'نستخدم في وكالة فلكس أحدث التقنيات لإدارة الحفلات والمؤتمرات وتنظيم المعارض. كما نستخدم أعلى جودة من استندات العرض لجميع المناسبات.','description_en'=>'Flex Agency uses the latest technologies to manage concerts, conferences, and exhibitions with the highest quality display stands for all occasions.','icon'=>'CalendarDays'],
        ['id'=>14,'title'=>'الهدايا الترويجية','title_en'=>'Promotional Gifts','description'=>'نقدر قيمة وقتك ومواعيدك الترويجية الضيقة. نوفر مجموعة متنوعة من الهدايا الترويجية المميزة، وبمجرد الموافقة على التصميم نضمن التسليم في الوقت المحدد.','description_en'=>'We value your time and tight promotional deadlines. We offer a wide range of distinctive promotional gifts — once the design is approved, we guarantee delivery on time.','icon'=>'Gift'],
        ['id'=>15,'title'=>'استيكر السيارات','title_en'=>'Vehicle Wrapping','description'=>'نقوم في وكالة فلكس للخدمات الإعلانية بطباعة وتنفيذ جميع أنواع الدعاية الخاصة بالسيارات الصغيرة ووسائل النقل المتوسطة والكبيرة.','description_en'=>'Flex Advertising Agency prints and installs all types of vehicle advertising for cars, medium, and large transport vehicles with the highest accuracy and quality.','icon'=>'Car'],
        ['id'=>16,'title'=>'ورشة التصنيع الإعلاني','title_en'=>'Manufacturing Workshop','description'=>'نقوم في وكالة فلكس للخدمات الإعلانية بصناعة جميع أنواع اللوحات الدعائية: لوحات فلكس فيس، لوحات اليونيبول، الأحرف المجسمة، واجهات الكلادينج، البنر.','description_en'=>'Flex Advertising Agency manufactures all types of advertising and promotional signage: flex face boards, unipole signs, 3D letter boards, cladding facades, and banner signs.','icon'=>'Factory'],
    ];
}

// ── Fallback للأعمال المميزة عند غياب قاعدة البيانات ────────
if (empty($dbPortfolio)) {
    $dbPortfolio = [
        ['id'=>42,'title'=>'خيالة | هوية الواجهة الكاملة','title_en'=>'Khayallah | Complete Brand Facade','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/khayallah_facade_night_1.jpeg'],
        ['id'=>45,'title'=>'إكسبرس موتورز | هوية صالة العرض','title_en'=>'Express Motors | Showroom Identity','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/express_motors_1.jpeg'],
        ['id'=>48,'title'=>'IMAGE Restaurant | الشعار الذهبي ثلاثي الأبعاد','title_en'=>'IMAGE Restaurant | 3D Gold Signature Logo','category'=>'هوية بصرية','category_en'=>'Visual Identity','image_url'=>'/images/portfolio/image_restaurant_gold_1.jpeg'],
        ['id'=>53,'title'=>'PepsiCo | الفعالية الموسيقية','title_en'=>'PepsiCo | Music Event Production','category'=>'فعاليات ومعارض','category_en'=>'Events & Exhibitions','image_url'=>'/images/portfolio/pepsi_music_2.jpeg'],
        ['id'=>54,'title'=>'Enterprise | معرض تجاري متكامل','title_en'=>'Enterprise | Full Trade Exhibition','category'=>'فعاليات ومعارض','category_en'=>'Events & Exhibitions','image_url'=>'/images/portfolio/enterprise_1.jpeg'],
        ['id'=>57,'title'=>'Papillon | واجهة المطعم الفاخر','title_en'=>'Papillon | Luxury Restaurant Facade','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/papillon_facade.jpeg'],
    ];
}

// Fallback client logos from filesystem if DB empty
if (empty($dbClients)) {
    $clientDir = __DIR__ . '/images/clients/';
    $clientLogos = [];
    if (is_dir($clientDir)) {
        $files = glob($clientDir . 'client_*.png');
        sort($files);
        foreach ($files as $f) $clientLogos[] = '/images/clients/' . basename($f);
    }
} else {
    $clientLogos = array_column($dbClients, 'logo_url');
}
?>

<!-- Hero -->
<section class="hero" id="hero">
  <?php foreach ($heroSlides as $i => $s): ?>
  <?php $bgUrl = imgUrl('/'.$s['img'], 1400, 0, 72); ?>
  <div class="hero-slide <?= $i===0?'active':'' ?>">
    <?php if ($i === 0): ?>
    <div class="hero-slide-inner" style="background-image:url('<?= $bgUrl ?>')"></div>
    <?php else: ?>
    <div class="hero-slide-inner" data-bg="url('<?= $bgUrl ?>')"></div>
    <?php endif; ?>
  </div>
  <?php endforeach; ?>
  <div class="hero-overlay"></div>
  <div class="hero-overlay-2"></div>

  <div class="container" style="position:relative;z-index:2;width:100%">
    <div class="hero-content">
      <div class="hero-badge"><span class="dot"></span><span id="hero-badge"><?= htmlspecialchars($heroSlides[0]['badge'][$lang]) ?></span></div>
      <h1 id="hero-title">
        <span id="hero-t1"><?= htmlspecialchars($heroSlides[0]['t1'][$lang]) ?></span><br>
        <span class="brand-gradient-text" id="hero-t2"><?= htmlspecialchars($heroSlides[0]['t2'][$lang]) ?></span>
      </h1>
      <p id="hero-sub"><?= htmlspecialchars($heroSlides[0]['sub'][$lang]) ?></p>
      <div class="hero-btns">
        <a href="/portfolio<?= $langSuffix ?>" class="btn-primary btn-primary-lg btn-icon">
          <?= t('exploreWork') ?>
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" class="btn-arrow">
            <?= $isAr ? '<polyline points="15 18 9 12 15 6"/>' : '<polyline points="9 18 15 12 9 6"/>' ?>
          </svg>
        </a>
        <a href="/contact<?= $langSuffix ?>" class="btn-glass btn-icon">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style="opacity:.8"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <?= t('contactUs') ?>
        </a>
      </div>
    </div>
  </div>

  <button class="hero-arrow hero-arrow-prev" id="hero-prev" aria-label="Previous">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <?= $isAr ? '<polyline points="9 18 15 12 9 6"/>' : '<polyline points="15 18 9 12 15 6"/>' ?>
    </svg>
  </button>
  <button class="hero-arrow hero-arrow-next" id="hero-next" aria-label="Next">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <?= $isAr ? '<polyline points="15 18 9 12 15 6"/>' : '<polyline points="9 18 15 12 9 6"/>' ?>
    </svg>
  </button>

  <div class="hero-controls">
    <div class="hero-dots">
      <?php foreach ($heroSlides as $i => $s): ?>
        <button class="hero-dot <?= $i===0?'active':'' ?>" data-index="<?= $i ?>" aria-label="Slide <?= $i+1 ?>"></button>
      <?php endforeach; ?>
    </div>
    <div class="hero-progress-bar"><div id="hero-progress-fill"></div></div>
  </div>
</section>

<script>
window.HERO_SLIDES = <?= json_encode(array_map(fn($s) => [
  'badge' => $s['badge'][$lang],
  't1'    => $s['t1'][$lang],
  't2'    => $s['t2'][$lang],
  'sub'   => $s['sub'][$lang],
], $heroSlides), JSON_UNESCAPED_UNICODE) ?>;
window.onHeroSlideChange = function(i) {
  var s = window.HERO_SLIDES[i];
  var badge = document.getElementById('hero-badge');
  var t1    = document.getElementById('hero-t1');
  var t2    = document.getElementById('hero-t2');
  var sub   = document.getElementById('hero-sub');
  if (badge) badge.textContent = s.badge;
  if (t1)    t1.textContent    = s.t1;
  if (t2)    t2.textContent    = s.t2;
  if (sub)   sub.textContent   = s.sub;
};
</script>

<!-- ─── WorkPreviewSection — Pro ─── -->
<section class="work-preview-section" id="work-preview">
  <div class="work-preview-divider"></div>

  <div class="container">

    <!-- ── Header ── -->
    <div class="wps-header">
      <div>
        <div class="section-badge" style="margin-bottom:1rem;display:inline-flex;align-items:center;gap:.45rem">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          <?= $isAr ? 'مشاريع منفذة حقيقية' : 'Real Executed Projects' ?>
        </div>
        <h2 class="wps-title">
          <?= $isAr ? 'بعض ' : 'Some of ' ?><span class="brand-gradient-text"><?= $isAr ? 'أعمالنا' : 'Our Work' ?></span>
        </h2>
      </div>
      <a href="/gallery<?= $langSuffix ?>" class="wps-browse">
        <?= $isAr ? 'استعرض كل الأعمال' : 'Browse Full Gallery' ?>
        <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <?= $isAr ? '<polyline points="15 18 9 12 15 6"/>' : '<polyline points="9 18 15 12 9 6"/>' ?>
        </svg>
      </a>
    </div>

    <!-- ── Main Slider ── -->
    <?php
    $wpImages = [
      'images/portfolio/wa_002.jpg',
      'images/portfolio/wa_005.jpg',
      'images/portfolio/wa_007.jpg',
      'images/portfolio/wa_010.jpg',
      'images/portfolio/wa_020.jpg',
      'images/portfolio/wa_035.jpg',
      'images/portfolio/wa_050.jpg',
      'images/portfolio/wa_070.jpg',
      'images/portfolio/wa_100.jpg',
      'images/portfolio/wa_120.jpg',
      'images/portfolio/wa_160.jpg',
      'images/portfolio/wa_176.jpg',
      'images/portfolio/wa_180.jpg',
      'images/portfolio/wa_216.jpg',
      'images/portfolio/wa_220.jpg',
      'images/portfolio/khayallah_facade_night_1.jpeg',
      'images/portfolio/khayallah_facade_night_2.jpeg',
      'images/portfolio/papillon_facade.jpeg',
      'images/portfolio/image_restaurant_gold_1.jpeg',
      'images/portfolio/express_motors_1.jpeg',
      'images/portfolio/express_motors_8.jpeg',
      'images/portfolio/pepsi_music_1.jpeg',
      'images/portfolio/life_spirit_facade.jpeg',
      'images/portfolio/alawad_facade.jpeg',
      'images/portfolio/medical_center_1.jpeg',
      'images/portfolio/business_yard_1.jpeg',
      'images/portfolio/inmar_facade.jpeg',
      'images/portfolio/drive7_1.jpeg',
      'images/portfolio/enterprise_1.jpeg',
      'images/portfolio/clinic_signs_1.jpeg',
      'images/portfolio/khayallah_totem_lit_1.jpeg',
    ];
    shuffle($wpImages);
    $wpTotal = count($wpImages);
    $kbClasses = ['kb-zoom-in','kb-zoom-out','kb-pan-r','kb-pan-l'];
    ?>

    <div class="work-preview-slider" id="wp-slider" onclick="window.location.href='/gallery'">

      <!-- Progress bar — top -->
      <div class="wps-progress-track"><div class="wps-progress-bar" id="wp-bar"></div></div>

      <!-- Slides -->
      <div class="work-preview-slides" id="wp-slides">
        <?php foreach ($wpImages as $i => $img):
          $kb = $kbClasses[$i % 4]; ?>
        <div class="wp-slide <?= $i===0?'active':'' ?>" data-idx="<?= $i ?>">
          <img class="wp-img <?= $kb ?>"
               src="<?= imgUrl('/'.$img, 1280, 0, 78) ?>"
               alt="<?= $isAr?'مشروع':'Project' ?> <?= $i+1 ?>"
               loading="<?= $i<2?'eager':'lazy' ?>" draggable="false"
               onerror="this.closest('.wp-slide').style.display='none'" />
        </div>
        <?php endforeach; ?>
      </div>

      <!-- Gradient overlays -->
      <div class="wp-gradient-overlay"></div>
      <div class="wp-gradient-sides"></div>

      <!-- Side arrows (circular, inside slider) -->
      <button class="wps-side-arrow wps-side-arrow--prev" id="wp-prev" aria-label="<?= $isAr?'السابق':'Previous' ?>">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="wps-side-arrow wps-side-arrow--next" id="wp-next" aria-label="<?= $isAr?'التالي':'Next' ?>">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <!-- Counter -->
      <div class="wps-counter" dir="ltr">
        <span class="wps-cur" id="wp-cur">01</span>
        <span class="wps-counter-sep"></span>
        <span class="wps-counter-total"><?= str_pad($wpTotal,2,'0',STR_PAD_LEFT) ?></span>
      </div>

      <!-- Hover hint -->
      <div class="wp-hover-hint">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        <?= $isAr ? 'استعرض الألبوم كاملاً' : 'View Full Gallery' ?>
      </div>
    </div>

    <!-- ── Thumbnail Filmstrip ── -->
    <div class="wps-filmstrip">
      <div class="wps-filmstrip-track" id="wp-thumbs">
        <?php foreach ($wpImages as $i => $img): ?>
        <button class="wps-thumb <?= $i===0?'wps-thumb--active':'' ?>" data-idx="<?= $i ?>"
                aria-label="<?= $isAr?'صورة':'Slide' ?> <?= $i+1 ?>">
          <img src="<?= imgUrl('/'.$img, 180, 110, 62) ?>" alt="" loading="lazy" />
          <div class="wps-thumb-overlay"></div>
        </button>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- ── Bottom bar ── -->
    <div class="wps-bottom">
      <p class="wps-hint"><?= $isAr ? 'مرر أو اسحب لاستعراض الصور' : 'Scroll or drag to browse' ?></p>
      <a href="/gallery<?= $langSuffix ?>" class="btn-primary btn-icon" onclick="event.stopPropagation()">
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        <?= $isAr ? 'ألبوم الصور' : 'Full Gallery' ?>
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <?= $isAr ? '<polyline points="15 18 9 12 15 6"/>' : '<polyline points="9 18 15 12 9 6"/>' ?>
        </svg>
      </a>
    </div>

  </div>
  <div class="work-preview-divider"></div>
</section>

<script>
(function(){
  var slides  = document.querySelectorAll('.wp-slide');
  var wpCur   = document.getElementById('wp-cur');
  var wpBar   = document.getElementById('wp-bar');
  var wpTotal = slides.length;
  var wpIdx   = 0;
  var wpTimer = null;
  var wpBusy  = false;
  var DUR     = 900;
  var HOLD    = 4500;

  /* ── Progress bar ── */
  function barStart() {
    if (!wpBar) return;
    wpBar.style.transition = 'none';
    wpBar.style.width = '0%';
    void wpBar.offsetWidth;
    wpBar.style.transition = 'width ' + HOLD + 'ms linear';
    wpBar.style.width = '100%';
  }

  /* ── Sync filmstrip thumbnail ── */
  function updateThumbs(n) {
    var thumbs = document.querySelectorAll('.wps-thumb');
    thumbs.forEach(function(t, i) {
      t.classList.toggle('wps-thumb--active', i === n);
    });
    // Scroll ONLY the filmstrip strip horizontally to center the active thumb.
    // Never use scrollIntoView() here — it would scroll the entire PAGE vertically
    // whenever the filmstrip is off-screen, causing the unwanted auto-scroll bug.
    var active = document.querySelector('.wps-thumb--active');
    if (active) {
      var strip = active.closest('.wps-filmstrip') || active.parentElement;
      if (strip) {
        var center = active.offsetLeft - (strip.offsetWidth - active.offsetWidth) / 2;
        strip.scrollTo({ left: center, behavior: 'smooth' });
      }
    }
  }

  /* ── Go to slide n ── */
  function wpGoTo(n) {
    if (wpBusy) return;
    n = (n + wpTotal) % wpTotal;
    if (n === wpIdx) return;
    wpBusy = true;

    slides[wpIdx].classList.remove('active');
    wpIdx = n;
    slides[wpIdx].classList.add('active');

    var img = slides[wpIdx].querySelector('.wp-img');
    if (img) { img.style.animation = 'none'; void img.offsetWidth; img.style.animation = ''; }

    if (wpCur) wpCur.textContent = String(wpIdx + 1).padStart(2, '0');
    updateThumbs(wpIdx);
    barStart();

    setTimeout(function(){ wpBusy = false; }, DUR);
  }

  function wpStart() {
    clearInterval(wpTimer);
    barStart();
    wpTimer = setInterval(function(){ wpGoTo(wpIdx + 1); }, HOLD);
  }

  /* Thumbnail clicks */
  document.querySelectorAll('.wps-thumb').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var n = parseInt(this.dataset.idx, 10);
      clearInterval(wpTimer);
      wpGoTo(n);
      wpStart();
    });
  });

  document.getElementById('wp-prev')?.addEventListener('click', function(e){
    e.stopPropagation(); clearInterval(wpTimer); wpGoTo(wpIdx - 1); wpStart();
  });
  document.getElementById('wp-next')?.addEventListener('click', function(e){
    e.stopPropagation(); clearInterval(wpTimer); wpGoTo(wpIdx + 1); wpStart();
  });

  /* ── Swipe / drag ── */
  var slider = document.getElementById('wp-slider');
  var dragX = 0, dragging = false;
  if (slider) {
    slider.addEventListener('pointerdown', function(e){ dragging = true; dragX = e.clientX; });
    slider.addEventListener('pointerup', function(e){
      if (!dragging) return; dragging = false;
      var dx = e.clientX - dragX;
      if (Math.abs(dx) > 50) {
        e.stopPropagation();
        clearInterval(wpTimer);
        wpGoTo(dx < 0 ? wpIdx + 1 : wpIdx - 1);
        wpStart();
      }
    });
    slider.addEventListener('pointerleave', function(){ dragging = false; });
    var wheelLock = false;
    slider.addEventListener('wheel', function(e){
      if (wheelLock) return; wheelLock = true;
      setTimeout(function(){ wheelLock = false; }, 900);
      if (e.deltaX > 30 || e.deltaY > 30) { clearInterval(wpTimer); wpGoTo(wpIdx + 1); wpStart(); }
      if (e.deltaX < -30 || e.deltaY < -30) { clearInterval(wpTimer); wpGoTo(wpIdx - 1); wpStart(); }
    }, { passive: true });
  }

  wpStart();
})();
</script>

<!-- ─── Gallery Preview — احترافي ─── -->
<section class="gpv-section" id="gallery-preview">
  <div class="gpv-bg-glow"></div>

  <div class="container">

    <!-- ── Header ── -->
    <div class="gpv-header">
      <div class="gpv-header-text">
        <div class="section-badge" style="border-radius:9999px;margin-bottom:1.25rem;display:inline-flex;align-items:center;gap:.5rem">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
          <?= $isAr ? 'ألبوم المشاريع' : 'Project Gallery' ?>
        </div>
        <h2 class="gpv-title">
          <?= $isAr ? 'صور حقيقية من ' : 'Real Photos from ' ?><span class="brand-gradient-text"><?= $isAr ? 'أعمالنا' : 'Our Work' ?></span>
        </h2>
        <p class="gpv-desc">
          <?= $isAr
            ? 'أكثر من 460 صورة حقيقية من مشاريعنا المنفذة — طباعة، تصنيع، فعاليات، هويات وأكثر.'
            : 'Over 460 real photos from our executed projects — printing, manufacturing, events, identities, and more.' ?>
        </p>
        <div class="gpv-stats-row">
          <span class="gpv-stat"><b>460+</b> <?= $isAr?'صورة':'Photos' ?></span>
          <span class="gpv-stat-sep">·</span>
          <span class="gpv-stat"><b>9</b> <?= $isAr?'فئات':'Categories' ?></span>
          <span class="gpv-stat-sep">·</span>
          <span class="gpv-live-dot"></span>
          <span class="gpv-live-text"><?= $isAr?'يُحدَّث باستمرار':'Always Updated' ?></span>
        </div>
      </div>
      <a href="/gallery<?= $langSuffix ?>" class="gpv-browse-btn">
        <?= $isAr ? 'استكشف الألبوم الكامل' : 'Explore Full Gallery' ?>
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <?= $isAr ? '<polyline points="15 18 9 12 15 6"/>' : '<polyline points="9 18 15 12 9 6"/>' ?>
        </svg>
      </a>
    </div>

    <!-- ── Bento Grid ── -->
    <?php
    $gpv_items = [
      ['src'=>'images/portfolio/wa_005.jpg',                    'cat'=>$isAr?'لافتات':'Signage'],
      ['src'=>'images/portfolio/express_motors_5.jpeg',         'cat'=>$isAr?'هوية بصرية':'Identity'],
      ['src'=>'images/portfolio/pepsi_music_2.jpeg',            'cat'=>$isAr?'فعاليات':'Events'],
      ['src'=>'images/portfolio/protein_up_1.jpeg',             'cat'=>$isAr?'لافتات':'Signage'],
      ['src'=>'images/portfolio/savvy_dental_1.jpeg',           'cat'=>$isAr?'مطبوعات':'Print'],
      ['src'=>'images/portfolio/wa_120.jpg',                    'cat'=>$isAr?'مشاريع كبرى':'Large-Scale'],
      ['src'=>'images/portfolio/khayallah_facade_night_1.jpeg', 'cat'=>$isAr?'لافتات':'Signage'],
    ];
    ?>
    <div class="gpv-grid">
      <?php foreach ($gpv_items as $i => $item): ?>
      <a href="/gallery<?= $langSuffix ?>" class="gpv-card fade-in" style="--i:<?= $i ?>">
        <div class="gpv-card-img">
          <img src="<?= imgUrl('/'.$item['src'], $i===5?1000:520, $i===0||$i===2?700:340, 78) ?>"
               alt="<?= htmlspecialchars($item['cat']) ?>"
               loading="<?= $i<3?'eager':'lazy' ?>" />
        </div>
        <div class="gpv-card-overlay"></div>
        <div class="gpv-card-info">
          <span class="gpv-card-cat"><?= htmlspecialchars($item['cat']) ?></span>
        </div>
        <div class="gpv-card-hover-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
          </svg>
        </div>
      </a>
      <?php endforeach; ?>
    </div>

    <!-- ── Category Marquee ── -->
    <div class="gpv-marquee" aria-hidden="true">
      <div class="gpv-marquee-track">
        <?php
        $gpCats = $isAr
          ? ['لافتات وواجهات','هوية بصرية','مطبوعات','فعاليات ومعارض','ديكور داخلي','استيكر وتغليف','مشاريع كبرى','ستاندات وتوتيم','واجهات مباني']
          : ['Signage & Facades','Visual Identity','Print Media','Events & Exhibitions','Interior Decor','Wrap & Sticker','Large-Scale','Stands & Totems','Building Facades'];
        for ($r=0;$r<3;$r++): foreach($gpCats as $c): ?>
        <span class="gpv-mq-item"><?= htmlspecialchars($c) ?></span><span class="gpv-mq-sep">✦</span>
        <?php endforeach; endfor; ?>
      </div>
    </div>

    <!-- ── CTA ── -->
    <div class="gpv-cta">
      <a href="/gallery<?= $langSuffix ?>" class="gpv-cta-btn" data-testid="link-open-gallery">
        <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
        <?= $isAr ? 'شاهد الألبوم الكامل' : 'View Full Gallery' ?>
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <?= $isAr ? '<polyline points="15 18 9 12 15 6"/>' : '<polyline points="9 18 15 12 9 6"/>' ?>
        </svg>
      </a>
    </div>

  </div>
</section>

<!-- Stats -->
<section id="stats" class="stats-section">
  <div class="container">
    <div class="stats-row">
      <?php
      $statIcons = [
        '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>',
        '<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>',
        '<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"/>',
        '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
      ];
      $statData = [
        ['target'=>STAT_PROJECTS,'label'=>t('statsProjects'),'icon'=>$statIcons[0]],
        ['target'=>STAT_CLIENTS, 'label'=>t('statsClients'), 'icon'=>$statIcons[1]],
        ['target'=>STAT_YEARS,   'label'=>t('statsYears'),   'icon'=>$statIcons[2]],
        ['target'=>STAT_BRANDS,  'label'=>t('statsTeam'),    'icon'=>$statIcons[3]],
      ];
      ?>
      <?php foreach ($statData as $i => $stat): ?>
      <div class="stat-item fade-in" data-testid="stat-item-<?= $i ?>">
        <div class="stat-icon-circle">
          <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
            <?= $stat['icon'] ?>
          </svg>
        </div>
        <h3 class="stat-counter" data-target="<?= $stat['target'] ?>" dir="ltr">+0</h3>
        <p class="stat-item-label"><?= htmlspecialchars($stat['label']) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Services -->
<section id="services" class="section-lg">
  <div class="container">
    <div class="section-header-row">
      <div style="max-width:580px">
        <h2 class="section-title-xl"><?= t('servicesTitle') ?></h2>
        <p class="section-subtitle"><?= t('servicesSubtitle') ?></p>
      </div>
      <button id="btn-view-all-svc" class="text-link-arrow" style="background:none;border:none;cursor:pointer;font-family:inherit;font-size:inherit;padding:0">
        <span id="btn-svc-label"><?= t('viewAll') ?></span>
        <svg id="btn-svc-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="transition:transform .3s">
          <?= $isAr ? '<polyline points="15 18 9 12 15 6"/>' : '<polyline points="9 18 15 12 9 6"/>' ?>
        </svg>
      </button>
    </div>
    <div class="services-grid-new">
      <?php foreach ($dbServices as $i => $svc): ?>
      <div class="service-card-new fade-in<?= $i >= 6 ? ' svc-extra' : '' ?>" data-testid="card-service-<?= $i ?>">
        <div class="service-icon-new">
          <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
            <?= getIconPath($svc['icon'] ?? '') ?>
          </svg>
        </div>
        <h3 class="service-title-new"><?= htmlspecialchars($isAr ? $svc['title'] : $svc['title_en']) ?></h3>
        <p class="service-desc-new"><?= htmlspecialchars($isAr ? $svc['description'] : $svc['description_en']) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<script>
(function(){
  var btn = document.getElementById('btn-view-all-svc');
  if (!btn) return;
  var extras = document.querySelectorAll('.svc-extra');
  var label  = document.getElementById('btn-svc-label');
  var icon   = document.getElementById('btn-svc-icon');
  var open   = false;
  var labelShow = <?= json_encode(t('viewAll')) ?>;
  var labelHide = <?= json_encode($isAr ? 'عرض أقل' : 'Show Less') ?>;
  btn.addEventListener('click', function(){
    open = !open;
    extras.forEach(function(el){
      if(open){ el.classList.remove('svc-extra-hidden'); el.classList.add('svc-extra-visible'); }
      else    { el.classList.remove('svc-extra-visible'); el.classList.add('svc-extra-hidden'); }
    });
    label.textContent = open ? labelHide : labelShow;
    icon.style.transform = open ? 'rotate(90deg)' : '';
  });
})();
</script>

<?php if (!empty($clientLogos)): ?>
<!-- Clients Showcase -->
<section id="clients" class="clients-showcase-section" style="position:relative;overflow:hidden">
  <div aria-hidden="true" style="position:absolute;inset:0;background:url('<?= imgUrl('/images/landmarks/kingdom_tower.jpg', 1200, 0, 70) ?>') center/cover no-repeat;opacity:.1;pointer-events:none"></div>
  <div class="container" style="position:relative;z-index:1">
    <div class="section-badge" style="margin:0 auto 1.5rem"><span></span><?= $isAr ? 'عملاؤنا' : 'Our Clients' ?></div>
    <h2 class="section-title-xl" style="text-align:center;margin-bottom:.5rem"><?= $isAr ? 'شركاء النجاح' : 'Partners in Success' ?></h2>
    <p class="section-subtitle" style="text-align:center;margin-bottom:3rem"><?= $isAr ? 'علامات تجارية كبرى وثقت بنا لتحقيق رؤيتها' : 'Leading brands that trusted us to bring their vision to life' ?></p>

    <div class="cl-stage-wrap">
      <button class="cl-arrow cl-arrow-prev" id="cl-prev" aria-label="<?= $isAr?'السابق':'Previous' ?>">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <?= $isAr ? '<polyline points="9 18 15 12 9 6"/>' : '<polyline points="15 18 9 12 15 6"/>' ?>
        </svg>
      </button>
      <div class="cl-logo-stage">
        <div class="cl-logo-track" id="cl-track">
          <?php foreach ($clientLogos as $i => $logo): ?>
          <?php
            $isLocalLogo = str_starts_with($logo, '/images/') || str_starts_with($logo, '/assets/images/');
            $logoImgSrc  = $isLocalLogo ? imgUrl($logo, 400, 0, 85) : htmlspecialchars($logo);

            /* تكبير الشعارات الأفقية جداً (ratio > 2.6) بنسبة 50% */
            $enlarge = '';
            if ($isLocalLogo) {
              $localPath = __DIR__ . $logo;
              if (!file_exists($localPath)) $localPath = __DIR__ . '/../../artifacts/flex-php/public' . $logo;
              $ii = @getimagesize($localPath);
              if ($ii && $ii[1] > 0 && ($ii[0]/$ii[1]) > 2.6) $enlarge = ' cl-logo--enlarge';
            }
          ?>
          <div class="cl-logo-card<?= $enlarge ?><?= $i===0?' active':'' ?>" data-idx="<?= $i ?>">
            <img src="<?= $logoImgSrc ?>"
                 alt="Client <?= $i+1 ?>"
                 loading="<?= $i < 3 ? 'eager' : 'lazy' ?>"
                 decoding="async"
                 onerror="this.closest('.cl-logo-card').style.opacity='.1'" />
          </div>
          <?php endforeach; ?>
        </div>
      </div>
      <button class="cl-arrow cl-arrow-next" id="cl-next" aria-label="<?= $isAr?'التالي':'Next' ?>">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <?= $isAr ? '<polyline points="15 18 9 12 15 6"/>' : '<polyline points="9 18 15 12 9 6"/>' ?>
        </svg>
      </button>
    </div>

    <div class="cl-counter-disp" id="cl-counter">
      <span id="cl-cur">1</span><span class="cl-sep">/</span><span id="cl-tot"><?= count($clientLogos) ?></span>
    </div>

    <div class="clients-stats-strip">
      <div class="clients-stat-item"><span class="clients-stat-num">+<?= STAT_BRANDS ?></span><span class="clients-stat-label"><?= $isAr?'علامة تجارية':'Brands' ?></span></div>
      <div class="clients-stat-item"><span class="clients-stat-num">+<?= STAT_YEARS ?></span><span class="clients-stat-label"><?= $isAr?'سنة خبرة':'Years' ?></span></div>
      <div class="clients-stat-item"><span class="clients-stat-num">+<?= STAT_PROJECTS ?></span><span class="clients-stat-label"><?= $isAr?'مشروع':'Projects' ?></span></div>
      <div class="clients-stat-item"><span class="clients-stat-num">+<?= STAT_CLIENTS ?></span><span class="clients-stat-label"><?= $isAr?'عميل راضٍ':'Happy Clients' ?></span></div>
    </div>
  </div>
</section>

<script>
(function(){
  var cards = document.querySelectorAll('.cl-logo-card');
  var cur   = document.getElementById('cl-cur');
  var tot   = document.getElementById('cl-tot');
  var prev  = document.getElementById('cl-prev');
  var next  = document.getElementById('cl-next');
  if (!cards.length) return;
  var idx = 0;
  function go(n) {
    cards[idx].classList.remove('active');
    idx = (n + cards.length) % cards.length;
    cards[idx].classList.add('active');
    if (cur) cur.textContent = idx + 1;
  }
  if (prev) prev.addEventListener('click', function(){ go(idx - 1); });
  if (next) next.addEventListener('click', function(){ go(idx + 1); });
  setInterval(function(){ go(idx + 1); }, 2000);
})();
</script>
<?php endif; ?>


<!-- Why Us -->
<section id="why-us" class="section-lg">
  <div class="container">
    <div class="why-header">
      <div class="section-badge" style="margin:0 auto 1.5rem"><span></span><?= t('competitiveBadge') ?></div>
      <h2 class="section-title-xl"><?= t('whyUsTitle') ?></h2>
      <p class="section-subtitle" style="max-width:560px;margin:1rem auto 0"><?= t('whyUsSubtitle') ?></p>
    </div>
    <?php
    $whyIcons = [
      '<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>',
      '<path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>',
      '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>',
      '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
      '<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>',
      '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>',
    ];
    ?>
    <div class="why-grid-new">
      <?php for ($i=1; $i<=6; $i++): ?>
      <div class="why-card-new fade-in" data-testid="card-why-us-<?= $i-1 ?>">
        <div class="why-icon-new">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
            <?= $whyIcons[$i-1] ?>
          </svg>
        </div>
        <div>
          <h3 class="why-title-new"><?= t('whyF'.$i.'T') ?></h3>
          <p class="why-desc-new"><?= t('whyF'.$i.'D') ?></p>
        </div>
      </div>
      <?php endfor; ?>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section-new" id="cta">
  <div class="cta-noise"></div>
  <div class="container" style="position:relative;z-index:10;text-align:center">
    <h2 class="cta-title-new"><?= t('ctaTitle') ?></h2>
    <p class="cta-sub-new"><?= t('ctaSubtitle') ?></p>
    <a href="/contact<?= $langSuffix ?>" class="cta-btn-new" data-testid="link-cta-start"><?= t('startNow') ?></a>
  </div>
</section>

<!-- ─── SectionDots — Fixed Sidebar Navigation ─── -->
<?php
$sdSections = [
  ['id'=>'hero',          'label'=>$isAr?'الرئيسية':'Home'],
  ['id'=>'work-preview',  'label'=>$isAr?'أعمالنا':'Our Work'],
  ['id'=>'gallery-preview','label'=>$isAr?'معرض الصور':'Gallery'],
  ['id'=>'stats',         'label'=>$isAr?'الإنجازات':'Stats'],
  ['id'=>'services',      'label'=>$isAr?'الخدمات':'Services'],
  ['id'=>'clients',       'label'=>$isAr?'العملاء':'Clients'],
  ['id'=>'cta',           'label'=>$isAr?'ابدأ الآن':'Start Now'],
];
?>
<nav class="section-dots" id="section-dots" aria-label="<?= $isAr?'التنقل بين الأقسام':'Section Navigation' ?>">
  <?php foreach ($sdSections as $s): ?>
  <button class="sd-btn" data-sd="<?= $s['id'] ?>" title="<?= htmlspecialchars($s['label']) ?>" onclick="document.getElementById('<?= $s['id'] ?>')?.scrollIntoView({behavior:'smooth'})">
    <span class="sd-label"><?= htmlspecialchars($s['label']) ?></span>
    <span class="sd-circle"></span>
  </button>
  <?php endforeach; ?>
</nav>
<script>
(function(){
  var btns = document.querySelectorAll('.sd-btn');
  if (!btns.length) return;
  var ids = Array.from(btns).map(function(b){ return b.dataset.sd; });
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        btns.forEach(function(b){ b.classList.toggle('sd-active', b.dataset.sd === e.target.id); });
      }
    });
  }, { threshold: 0.3 });
  ids.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) obs.observe(el);
  });
})();
</script>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>

"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "hi" | "es" | "fr" | "de" | "ja" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    home: "Home",
    categories: "Categories",
    about: "About",
    contact: "Contact",
    dashboard: "Dashboard",
    profile: "Profile",
    orders: "Orders",
    signIn: "Sign In",
    signUp: "Sign Up",
    signOut: "Sign Out",

    // Auth
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    welcomeBack: "Welcome Back",
    createAccount: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    forgotPassword: "Forgot Password?",

    // Dashboard
    welcomeToDashboard: "Welcome to Dashboard",
    myOrders: "My Orders",
    myProfile: "My Profile",
    plantCollection: "My Plant Collection",
    careReminders: "Care Reminders",

    // Hero Section
    heroTitle: "Bring Nature Home",
    heroSubtitle: "Curated collection of premium plants to transform your space into a green paradise",
    shopNow: "Shop Now",
    exploreCategories: "Explore Categories",

    // Categories
    indoorPlants: "Indoor Plants",
    rarePlants: "Rare Plants",
    gifts: "Plant Gifts",
    accessories: "Accessories",

    // Products
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    viewDetails: "View Details",

    // Testimonials
    testimonialTitle: "What Our Customers Say",

    // Newsletter
    newsletterTitle: "Stay Connected with Nature",
    newsletterSubtitle: "Get plant care tips, exclusive offers, and new arrivals delivered to your inbox",
    emailPlaceholder: "Enter your email",
    subscribe: "Subscribe",

    // Footer
    quickLinks: "Quick Links",
    customerService: "Customer Service",
    followUs: "Follow Us",

    // Chat
    chatPlaceholder: "Ask about plant care, products, or anything else...",
    send: "Send",
  },
  hi: {
    // Navigation
    home: "होम",
    categories: "श्रेणियां",
    about: "हमारे बारे में",
    contact: "संपर्क",
    dashboard: "डैशबोर्ड",
    profile: "प्रोफाइल",
    orders: "ऑर्डर",
    signIn: "साइन इन",
    signUp: "साइन अप",
    signOut: "साइन आउट",

    // Auth
    email: "ईमेल",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    fullName: "पूरा नाम",
    welcomeBack: "वापस स्वागत है",
    createAccount: "खाता बनाएं",
    alreadyHaveAccount: "क्या आपका पहले से खाता है?",
    dontHaveAccount: "क्या आपका खाता नहीं है?",
    forgotPassword: "पासवर्ड भूल गए?",

    // Dashboard
    welcomeToDashboard: "डैशबोर्ड में आपका स्वागत है",
    myOrders: "मेरे ऑर्डर",
    myProfile: "मेरी प्रोफाइल",
    plantCollection: "मेरा पौधों का संग्रह",
    careReminders: "देखभाल अनुस्मारक",

    // Hero Section
    heroTitle: "प्रकृति को घर लाएं",
    heroSubtitle: "आपके स्थान को हरे स्वर्ग में बदलने के लिए प्रीमियम पौधों का चुनिंदा संग्रह",
    shopNow: "अभी खरीदें",
    exploreCategories: "श्रेणियां देखें",

    // Categories
    indoorPlants: "इनडोर प्लांट्स",
    rarePlants: "दुर्लभ पौधे",
    gifts: "पौधे उपहार",
    accessories: "सहायक उपकरण",

    // Products
    addToCart: "कार्ट में जोड़ें",
    buyNow: "अभी खरीदें",
    viewDetails: "विवरण देखें",

    // Testimonials
    testimonialTitle: "हमारे ग्राहक क्या कहते हैं",

    // Newsletter
    newsletterTitle: "प्रकृति से जुड़े रहें",
    newsletterSubtitle: "पौधों की देखभाल की युक्तियां, विशेष ऑफर और नए आगमन प्राप्त करें",
    emailPlaceholder: "अपना ईमेल दर्ज करें",
    subscribe: "सब्सक्राइब करें",

    // Footer
    quickLinks: "त्वरित लिंक",
    customerService: "ग्राहक सेवा",
    followUs: "हमें फॉलो करें",

    // Chat
    chatPlaceholder: "पौधों की देखभाल, उत्पादों या कुछ और के बारे में पूछें...",
    send: "भेजें",
  },
  es: {
    // Navigation
    home: "Inicio",
    categories: "Categorías",
    about: "Acerca de",
    contact: "Contacto",
    dashboard: "Panel",
    profile: "Perfil",
    orders: "Pedidos",
    signIn: "Iniciar Sesión",
    signUp: "Registrarse",
    signOut: "Cerrar Sesión",

    // Auth
    email: "Correo Electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar Contraseña",
    fullName: "Nombre Completo",
    welcomeBack: "Bienvenido de Nuevo",
    createAccount: "Crear Cuenta",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    dontHaveAccount: "¿No tienes una cuenta?",
    forgotPassword: "¿Olvidaste tu contraseña?",

    // Dashboard
    welcomeToDashboard: "Bienvenido al Panel",
    myOrders: "Mis Pedidos",
    myProfile: "Mi Perfil",
    plantCollection: "Mi Colección de Plantas",
    careReminders: "Recordatorios de Cuidado",

    // Hero Section
    heroTitle: "Trae la Naturaleza a Casa",
    heroSubtitle: "Colección curada de plantas premium para transformar tu espacio en un paraíso verde",
    shopNow: "Comprar Ahora",
    exploreCategories: "Explorar Categorías",

    // Categories
    indoorPlants: "Plantas de Interior",
    rarePlants: "Plantas Raras",
    gifts: "Regalos de Plantas",
    accessories: "Accesorios",

    // Products
    addToCart: "Añadir al Carrito",
    buyNow: "Comprar Ahora",
    viewDetails: "Ver Detalles",

    // Testimonials
    testimonialTitle: "Lo que Dicen Nuestros Clientes",

    // Newsletter
    newsletterTitle: "Mantente Conectado con la Naturaleza",
    newsletterSubtitle: "Recibe consejos de cuidado de plantas, ofertas exclusivas y nuevas llegadas",
    emailPlaceholder: "Ingresa tu email",
    subscribe: "Suscribirse",

    // Footer
    quickLinks: "Enlaces Rápidos",
    customerService: "Servicio al Cliente",
    followUs: "Síguenos",

    // Chat
    chatPlaceholder: "Pregunta sobre cuidado de plantas, productos o cualquier cosa...",
    send: "Enviar",
  },
  fr: {
    // Navigation
    home: "Accueil",
    categories: "Catégories",
    about: "À Propos",
    contact: "Contact",
    dashboard: "Tableau de Bord",
    profile: "Profil",
    orders: "Commandes",
    signIn: "Se Connecter",
    signUp: "S'inscrire",
    signOut: "Se Déconnecter",

    // Auth
    email: "Email",
    password: "Mot de Passe",
    confirmPassword: "Confirmer le Mot de Passe",
    fullName: "Nom Complet",
    welcomeBack: "Bon Retour",
    createAccount: "Créer un Compte",
    alreadyHaveAccount: "Vous avez déjà un compte?",
    dontHaveAccount: "Vous n'avez pas de compte?",
    forgotPassword: "Mot de passe oublié?",

    // Dashboard
    welcomeToDashboard: "Bienvenue au Tableau de Bord",
    myOrders: "Mes Commandes",
    myProfile: "Mon Profil",
    plantCollection: "Ma Collection de Plantes",
    careReminders: "Rappels de Soins",

    // Hero Section
    heroTitle: "Apportez la Nature à la Maison",
    heroSubtitle: "Collection curatée de plantes premium pour transformer votre espace en paradis vert",
    shopNow: "Acheter Maintenant",
    exploreCategories: "Explorer les Catégories",

    // Categories
    indoorPlants: "Plantes d'Intérieur",
    rarePlants: "Plantes Rares",
    gifts: "Cadeaux de Plantes",
    accessories: "Accessoires",

    // Products
    addToCart: "Ajouter au Panier",
    buyNow: "Acheter Maintenant",
    viewDetails: "Voir les Détails",

    // Testimonials
    testimonialTitle: "Ce que Disent Nos Clients",

    // Newsletter
    newsletterTitle: "Restez Connecté avec la Nature",
    newsletterSubtitle: "Recevez des conseils de soins, des offres exclusives et les nouveautés",
    emailPlaceholder: "Entrez votre email",
    subscribe: "S'abonner",

    // Footer
    quickLinks: "Liens Rapides",
    customerService: "Service Client",
    followUs: "Suivez-nous",

    // Chat
    chatPlaceholder: "Demandez sur les soins des plantes, produits ou autre chose...",
    send: "Envoyer",
  },
  de: {
    // Navigation
    home: "Startseite",
    categories: "Kategorien",
    about: "Über Uns",
    contact: "Kontakt",
    dashboard: "Dashboard",
    profile: "Profil",
    orders: "Bestellungen",
    signIn: "Anmelden",
    signUp: "Registrieren",
    signOut: "Abmelden",

    // Auth
    email: "E-Mail",
    password: "Passwort",
    confirmPassword: "Passwort Bestätigen",
    fullName: "Vollständiger Name",
    welcomeBack: "Willkommen Zurück",
    createAccount: "Konto Erstellen",
    alreadyHaveAccount: "Haben Sie bereits ein Konto?",
    dontHaveAccount: "Haben Sie kein Konto?",
    forgotPassword: "Passwort vergessen?",

    // Dashboard
    welcomeToDashboard: "Willkommen im Dashboard",
    myOrders: "Meine Bestellungen",
    myProfile: "Mein Profil",
    plantCollection: "Meine Pflanzensammlung",
    careReminders: "Pflege-Erinnerungen",

    // Hero Section
    heroTitle: "Bringen Sie die Natur nach Hause",
    heroSubtitle: "Kuratierte Sammlung von Premium-Pflanzen, um Ihren Raum in ein grünes Paradies zu verwandeln",
    shopNow: "Jetzt Kaufen",
    exploreCategories: "Kategorien Erkunden",

    // Categories
    indoorPlants: "Zimmerpflanzen",
    rarePlants: "Seltene Pflanzen",
    gifts: "Pflanzengeschenke",
    accessories: "Zubehör",

    // Products
    addToCart: "In den Warenkorb",
    buyNow: "Jetzt Kaufen",
    viewDetails: "Details Anzeigen",

    // Testimonials
    testimonialTitle: "Was Unsere Kunden Sagen",

    // Newsletter
    newsletterTitle: "Bleiben Sie mit der Natur Verbunden",
    newsletterSubtitle: "Erhalten Sie Pflegetipps, exklusive Angebote und Neuankömmlinge",
    emailPlaceholder: "E-Mail eingeben",
    subscribe: "Abonnieren",

    // Footer
    quickLinks: "Schnelle Links",
    customerService: "Kundendienst",
    followUs: "Folgen Sie Uns",

    // Chat
    chatPlaceholder: "Fragen Sie nach Pflanzenpflege, Produkten oder anderem...",
    send: "Senden",
  },
  ja: {
    // Navigation
    home: "ホーム",
    categories: "カテゴリー",
    about: "私たちについて",
    contact: "お問い合わせ",
    dashboard: "ダッシュボード",
    profile: "プロフィール",
    orders: "注文",
    signIn: "サインイン",
    signUp: "サインアップ",
    signOut: "サインアウト",

    // Auth
    email: "メール",
    password: "パスワード",
    confirmPassword: "パスワード確認",
    fullName: "フルネーム",
    welcomeBack: "おかえりなさい",
    createAccount: "アカウント作成",
    alreadyHaveAccount: "すでにアカウントをお持ちですか？",
    dontHaveAccount: "アカウントをお持ちでないですか？",
    forgotPassword: "パスワードを忘れましたか？",

    // Dashboard
    welcomeToDashboard: "ダッシュボードへようこそ",
    myOrders: "私の注文",
    myProfile: "私のプロフィール",
    plantCollection: "私の植物コレクション",
    careReminders: "ケアリマインダー",

    // Hero Section
    heroTitle: "自然を家に持ち帰る",
    heroSubtitle: "あなたの空間を緑の楽園に変える厳選されたプレミアム植物のコレクション",
    shopNow: "今すぐ購入",
    exploreCategories: "カテゴリーを探索",

    // Categories
    indoorPlants: "観葉植物",
    rarePlants: "珍しい植物",
    gifts: "植物ギフト",
    accessories: "アクセサリー",

    // Products
    addToCart: "カートに追加",
    buyNow: "今すぐ購入",
    viewDetails: "詳細を見る",

    // Testimonials
    testimonialTitle: "お客様の声",

    // Newsletter
    newsletterTitle: "自然とつながり続ける",
    newsletterSubtitle: "植物ケアのヒント、限定オファー、新着商品をお届けします",
    emailPlaceholder: "メールアドレスを入力",
    subscribe: "購読する",

    // Footer
    quickLinks: "クイックリンク",
    customerService: "カスタマーサービス",
    followUs: "フォローする",

    // Chat
    chatPlaceholder: "植物ケア、製品、その他について質問してください...",
    send: "送信",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    categories: "الفئات",
    about: "حولنا",
    contact: "اتصل بنا",
    dashboard: "لوحة التحكم",
    profile: "الملف الشخصي",
    orders: "الطلبات",
    signIn: "تسجيل الدخول",
    signUp: "إنشاء حساب",
    signOut: "تسجيل الخروج",

    // Auth
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    fullName: "الاسم الكامل",
    welcomeBack: "مرحباً بعودتك",
    createAccount: "إنشاء حساب",
    alreadyHaveAccount: "هل لديك حساب بالفعل؟",
    dontHaveAccount: "ليس لديك حساب؟",
    forgotPassword: "نسيت كلمة المرور؟",

    // Dashboard
    welcomeToDashboard: "مرحباً بك في لوحة التحكم",
    myOrders: "طلباتي",
    myProfile: "ملفي الشخصي",
    plantCollection: "مجموعة النباتات الخاصة بي",
    careReminders: "تذكيرات العناية",

    // Hero Section
    heroTitle: "أحضر الطبيعة إلى المنزل",
    heroSubtitle: "مجموعة منتقاة من النباتات المميزة لتحويل مساحتك إلى جنة خضراء",
    shopNow: "تسوق الآن",
    exploreCategories: "استكشف الفئات",

    // Categories
    indoorPlants: "النباتات الداخلية",
    rarePlants: "النباتات النادرة",
    gifts: "هدايا النباتات",
    accessories: "الإكسسوارات",

    // Products
    addToCart: "أضف إلى السلة",
    buyNow: "اشتر الآن",
    viewDetails: "عرض التفاصيل",

    // Testimonials
    testimonialTitle: "ماذا يقول عملاؤنا",

    // Newsletter
    newsletterTitle: "ابق متصلاً مع الطبيعة",
    newsletterSubtitle: "احصل على نصائح العناية بالنباتات والعروض الحصرية والوافدين الجدد",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    subscribe: "اشترك",

    // Footer
    quickLinks: "روابط سريعة",
    customerService: "خدمة العملاء",
    followUs: "تابعنا",

    // Chat
    chatPlaceholder: "اسأل عن العناية بالنباتات أو المنتجات أو أي شيء آخر...",
    send: "إرسال",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

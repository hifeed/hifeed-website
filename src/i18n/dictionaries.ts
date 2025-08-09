export type Locale = 'en' | 'id';

export interface NavDict {
  challenges: string;
  solution: string;
  benefits: string;
  palatability: string;
  stories: string;
  careers: string;
  consultationCta: string;
  language: string;
}

export interface HeroDict {
  badge: string;
  title: string; // contains placeholder {highlight}
  highlight: string;
  subtitle: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface BenefitItem { emoji: string; title: string; description: string }
export interface BenefitsDict {
  badge: string;
  titleA: string;
  titleB: string;
  subtitle: string;
  items: BenefitItem[];
}

export interface PalatabilityDict {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ConsultationDict {
  title: string;
  contact: string;
  farmName: string;
  location: string;
  herdSize: string;
  feedType: string;
  dailyFeed: string;
  submit: string;
  requiredAlert: string;
}

export interface FooterDict {
  about: string;
  addressTitle: string;
  company: string;
  address: string;
  email: string;
  copyright: string;
  solutionsMenu: string;
  feedTech: string;
  costReduction: string;
  carbonImpact: string;
  successStories: string;
  supportMenu: string;
  privacyPolicy: string;
  termsOfService: string;
  contact: string;
}

export interface StoriesDict {
  badge: string;
  titleA: string;
  titleB: string;
  subtitle: string;
  quote: string;
  farmerName: string;
  farmerDesc: string;
}

export interface SolutionDict {
  badge: string;
  titleA: string;
  titleB: string;
  card1Title: string;
  card1Desc: string;
  card2Title: string;
  card2Desc: string;
  card3Title: string;
  card3Desc: string;
  svgLabel1: string;
  svgLabel2: string;
  svgLabel3: string;
  svgLabel4: string;
  svgLabel5: string;
  svgLabel6: string;
}

export interface ImpactDict {
  badge: string;
  titleA: string;
  titleB: string;
  subtitle: string;
  missionTitle: string;
  missionDesc: string;
  visionTitle: string;
  visionDesc: string;
  emissionReduction: string;
  costSavings: string;
}

export interface ChallengesDict {
  badge: string;
  titleA: string;
  titleB: string;
  subtitle: string;
  card1Title: string;
  card1Desc: string;
  card2Title: string;
  card2Desc: string;
  card3Title: string;
  card3Desc: string;
  card4Title: string;
  card4Desc: string;
}

export interface Dictionary {
  nav: NavDict;
  hero: HeroDict;
  benefits: BenefitsDict;
  palatability: PalatabilityDict;
  consultation: ConsultationDict;
  footer: FooterDict;
  stories: StoriesDict;
  solution: SolutionDict;
  impact: ImpactDict;
  challenges: ChallengesDict;
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      challenges: 'Challenges',
      solution: 'Solution',
      benefits: "Benefits",
      palatability: 'Palatability',
      stories: 'Stories',
      careers: 'Careers',
      consultationCta: 'Free Consultation',
      language: 'Language',
    },
    hero: {
      badge: 'Revolutionary Farming Technology',
      title: 'Future of {highlight} Farming',
      highlight: 'Cattle',
      subtitle: 'Net-Zero. Profitable. Sustainable.',
      description: "Transform your cattle operation with HiFeed's revolutionary complete feed pellets. Reduce emissions by 50%, cut costs by 30%, and lead the sustainable farming revolution.",
      primaryCta: 'Start Your Transformation →',
      secondaryCta: 'Discover How',
    },
    benefits: {
      badge: 'Transformative Benefits',
      titleA: "Unlock Your Farm's",
      titleB: 'Potential',
      subtitle: 'Experience revolutionary improvements across every aspect of your cattle operation',
      items: [
        { emoji: '⚡', title: 'Effortless Operations', description: 'Eliminate 4-6 hours of daily manual feed preparation. Ready-to-use pellets streamline your entire feeding process.' },
        { emoji: '😋', title: 'Superior Palatability', description: 'Soft, aromatic pellets increase feed intake by 25%, improving cattle satisfaction and overall health outcomes.' },
        { emoji: '💰', title: 'Dramatic Cost Reduction', description: 'Cut feed costs by 30% through optimized nutrition density and elimination of expensive supplements.' },
        { emoji: '🚚', title: 'Logistics Optimization', description: 'Reduce transport and storage costs by 40% with compact, lightweight pellet format.' },
        { emoji: '📊', title: 'Data-Driven Insights', description: 'Real-time monitoring and analytics for optimized feeding schedules and health tracking.' },
        { emoji: '🌱', title: 'Net-Zero Achievement', description: 'Produce fully traceable, carbon-neutral cattle that meet future sustainability standards and premium market demands.' }
      ]
    },
    palatability: {
      badge: 'Cattle Love It',
      title: 'They Love HiFeed Pellets',
      subtitle: 'See how our feed boosts appetite and consistency',
      description: 'Our pellets are crafted for taste and nutrition. Watch how cattle enjoy HiFeed and finish their feed with enthusiasm.',
    },
    consultation: {
      title: 'Free Consultation',
      name: 'Name*',
      whatsapp: 'WhatsApp Number*',
      farmName: 'Farm Name*',
      location: 'Location*',
      herdSize: 'Herd Size (number of cattle) (optional)',
      feedType: 'Current Feed Type (optional)',
      dailyFeed: 'Daily Feed Intake per Cow (kg) (optional)',
      submit: 'Contact Sales via WhatsApp',
      requiredAlert: 'Please fill in all required fields.'
    },
    footer: {
      about: 'Pioneering the future of sustainable cattle farming through revolutionary feed technology. Transforming agriculture for a net-zero world.',
      addressTitle: 'HiFeed',
      company: 'PT HiFeed Climate Tech Ventures',
      address: 'Jl. K.H. Ahmad Dahlan No. 20, Malabar, Lengkong, Bandung, Jawa Barat 40262',
      email: 'hello@hifeed.co',
      copyright: 'All rights reserved.',
      solutionsMenu: 'Solutions',
      feedTech: 'Feed Technology',
      costReduction: 'Cost Reduction',
      carbonImpact: 'Carbon Impact',
      successStories: 'Success Stories',
      supportMenu: 'Support',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      contact: 'Contact',
    },
    impact: {
      badge: 'Global Impact',
      titleA: 'Transforming Agriculture',
      titleB: 'Worldwide',
      subtitle: 'Leading the global transition to net-zero agriculture, empowering farmers to thrive in a sustainable future.',
      missionTitle: 'Our Mission',
      missionDesc: 'Revolutionizing cattle farming through carbon-negative feed solutions that deliver superior profitability while healing our planet.',
      visionTitle: 'Our Vision',
      visionDesc: 'Leading the global transition to net-zero agriculture, empowering farmers to thrive in a sustainable future.',
      emissionReduction: 'Emission Reduction',
      costSavings: 'Cost Savings',
    },
    challenges: {
      badge: 'Industry Challenges',
      titleA: 'Breaking Through',
      titleB: 'Barriers',
      subtitle: 'Understand the biggest hurdles in modern cattle farming',
      card1Title: 'Escalating Feed Costs',
      card1Desc: 'Feed expenses consuming 60-70% of operational costs, with prices rising 15-20% annually, crushing profit margins.',
      card2Title: 'Labor-Intensive Operations',
      card2Desc: 'Manual feed preparation consuming 4-6 hours daily, increasing labor costs and reducing operational efficiency.',
      card3Title: 'Supply Chain Disruptions',
      card3Desc: 'Seasonal feed shortages and supply chain volatility causing 20-30% production losses during critical periods.',
      card4Title: 'Environmental Pressure',
      card4Desc: 'Increasing regulations on methane emissions and carbon footprint threatening long-term viability.',
    },
    stories: {
      badge: 'Success Stories',
      titleA: 'Real Farmers,',
      titleB: 'Real Results',
      subtitle: 'Discover how HiFeed is transforming cattle operations across Indonesia',
      quote: 'HiFeed has completely transformed my operation. My cattle are healthier, feed costs dropped by 35%, and the convenience is incredible. The animals clearly prefer these pellets, and I’m saving 5 hours daily on feed preparation. This is the future of farming.',
      farmerName: 'Arif Irawan',
      farmerDesc: 'Progressive Cattle Farmer, West Java',
    },
    solution: {
      badge: 'Revolutionary Solution',
      titleA: 'The',
      titleB: 'HiFeed Revolution',
      card1Title: 'Carbon-Negative Innovation',
      card1Desc: 'Revolutionary complete feed pellets engineered to reduce enteric fermentation by 50% while actively capturing carbon through our cultivation process.',
      card2Title: 'Smart Nutrition Technology',
      card2Desc: 'AI-optimized nutrient profiles delivering superior palatability and health outcomes while enabling traceable net-zero cattle production.',
      card3Title: 'Seamless Integration',
      card3Desc: 'Plug-and-play solution that transforms your existing operation into a sustainable, profitable, and future-ready farming enterprise.',
      svgLabel1: 'Carbon Insetting',
      svgLabel2: 'Smart Cultivation',
      svgLabel3: 'Nutrient Optimization',
      svgLabel4: '50% Less Emissions',
      svgLabel5: '30% Cost Reduction',
      svgLabel6: 'Net-Zero Cattle',
    },
  },
  id: {
    nav: {
      challenges: 'Tantangan',
      solution: 'Solusi',
      benefits: 'Manfaat',
      palatability: 'Kecocokan Pakan',
      stories: 'Kisah',
      careers: 'Karir',
      consultationCta: 'Konsultasi Gratis',
      language: 'Bahasa',
    },
    hero: {
      badge: 'Teknologi Peternakan Revolusioner',
      title: 'Masa Depan {highlight} Modern',
      highlight: 'Peternakan Sapi',
      subtitle: 'Net-Zero. Menguntungkan. Berkelanjutan.',
      description: 'Ubah operasional peternakan Anda dengan pelet pakan lengkap HiFeed. Kurangi emisi hingga 50%, hemat biaya 30%, dan pimpin revolusi pertanian berkelanjutan.',
      primaryCta: 'Mulai Transformasi Anda →',
      secondaryCta: 'Pelajari Caranya',
    },
    benefits: {
      badge: 'Manfaat Transformasional',
      titleA: 'Maksimalkan',
      titleB: 'Potensi Peternakan Anda',
      subtitle: 'Rasakan peningkatan revolusioner di setiap aspek operasional ternak Anda',
      items: [
        { emoji: '⚡', title: 'Operasional Efisien', description: 'Hilangkan 4–6 jam persiapan pakan manual harian. Pelet siap pakai menyederhanakan proses pemberian pakan.' },
        { emoji: '😋', title: 'Sangat Disukai Ternak', description: 'Pelet lembut dan aromatik meningkatkan konsumsi pakan hingga 25%.' },
        { emoji: '💰', title: 'Hemat Biaya', description: 'Hemat biaya pakan hingga 30% lewat kepadatan nutrisi optimal dan tanpa suplemen mahal.' },
        { emoji: '🚚', title: 'Logistik Optimal', description: 'Kurangi biaya transportasi dan penyimpanan hingga 40% dengan format pelet yang ringkas.' },
        { emoji: '📊', title: 'Berbasis Data', description: 'Pemantauan dan analitik untuk jadwal pakan dan kesehatan yang optimal.' },
        { emoji: '🌱', title: 'Menuju Net-Zero', description: 'Hasilkan ternak netral karbon yang dapat ditelusuri dan memenuhi standar keberlanjutan.' }
      ]
    },
    palatability: {
      badge: 'Ternak Suka!',
      title: 'Ternak Doyan Pakan HiFeed',
      subtitle: 'Lihat bagaimana pakan kami meningkatkan nafsu makan dan konsistensi',
      description: 'Pelet kami dibuat untuk rasa dan nutrisi. Saksikan bagaimana ternak menikmati HiFeed dan menghabiskan pakannya dengan lahap.',
    },
    consultation: {
      title: 'Konsultasi Gratis',
      name: 'Nama*',
      whatsapp: 'Nomor WA*',
      farmName: 'Nama Peternakan*',
      location: 'Lokasi*',
      herdSize: 'Populasi Ternak (opsional)',
      feedType: 'Jenis Pakan yang Digunakan (opsional)',
      dailyFeed: 'Konsumsi Pakan per Hari per Sapi (kg) (opsional)',
      submit: 'Hubungi Sales via WhatsApp',
      requiredAlert: 'Mohon lengkapi semua field yang wajib.'
    },
    footer: {
      about: 'Pelopor masa depan peternakan sapi berkelanjutan melalui teknologi pakan revolusioner. Mengubah pertanian menuju net-zero.',
      addressTitle: 'HiFeed',
      company: 'PT HiFeed Climate Tech Ventures',
      address: 'Jl. K.H. Ahmad Dahlan No. 20, Malabar, Lengkong, Bandung, Jawa Barat 40262',
      email: 'hello@hifeed.co',
      copyright: 'Hak cipta dilindungi.',
      solutionsMenu: 'Solusi',
      feedTech: 'Teknologi Pakan',
      costReduction: 'Hemat Biaya',
      carbonImpact: 'Dampak Karbon',
      successStories: 'Kisah Sukses',
      supportMenu: 'Dukungan',
      privacyPolicy: 'Kebijakan Privasi',
      termsOfService: 'Syarat Layanan',
      contact: 'Kontak',
    },
    impact: {
      badge: 'Dampak Global',
      titleA: 'Transformasi Pertanian',
      titleB: 'Global',
      subtitle: 'Memimpin transisi global menuju pertanian net-zero, memberdayakan peternak untuk masa depan berkelanjutan.',
      missionTitle: 'Misi Kami',
      missionDesc: 'Merevolusi peternakan sapi melalui solusi pakan karbon-negatif yang memberikan profitabilitas unggul sekaligus memulihkan bumi.',
      visionTitle: 'Visi Kami',
      visionDesc: 'Memimpin transisi global menuju pertanian net-zero, memberdayakan peternak untuk masa depan berkelanjutan.',
      emissionReduction: 'Pengurangan Emisi',
      costSavings: 'Penghematan Biaya',
    },
    challenges: {
      badge: 'Tantangan Industri',
      titleA: 'Menembus',
      titleB: 'Batasan',
      subtitle: 'Pahami tantangan terbesar dalam peternakan sapi modern',
      card1Title: 'Biaya Pakan Meningkat',
      card1Desc: 'Biaya pakan menghabiskan 60-70% dari operasional, dengan harga naik 15-20% per tahun, menekan margin keuntungan.',
      card2Title: 'Operasi Padat Karya',
      card2Desc: 'Persiapan pakan manual memakan waktu 4-6 jam per hari, meningkatkan biaya tenaga kerja dan menurunkan efisiensi.',
      card3Title: 'Gangguan Rantai Pasok',
      card3Desc: 'Kelangkaan pakan musiman dan volatilitas rantai pasok menyebabkan kerugian produksi 20-30% di periode kritis.',
      card4Title: 'Tekanan Lingkungan',
      card4Desc: 'Regulasi emisi metana dan jejak karbon yang meningkat mengancam keberlanjutan jangka panjang.',
    },
    stories: {
      badge: 'Kisah Sukses',
      titleA: 'Peternak Asli,',
      titleB: 'Hasil Nyata',
      subtitle: 'Temukan bagaimana HiFeed mengubah operasional peternakan di Indonesia',
      quote: 'HiFeed benar-benar mengubah usaha saya. Sapi lebih sehat, biaya pakan turun 35%, dan sangat praktis. Ternak jelas lebih suka pelet ini, dan saya hemat 5 jam kerja harian. Inilah masa depan peternakan.',
      farmerName: 'Arif Irawan',
      farmerDesc: 'Peternak Sapi Modern, Jawa Barat',
    },
    solution: {
      badge: 'Solusi Revolusioner',
      titleA: 'Revolusi',
      titleB: 'HiFeed',
      card1Title: 'Inovasi Karbon-Negatif',
      card1Desc: 'Pelet pakan revolusioner yang dirancang untuk mengurangi fermentasi enterik hingga 50% dan aktif menyerap karbon melalui proses budidaya kami.',
      card2Title: 'Teknologi Nutrisi Cerdas',
      card2Desc: 'Profil nutrisi dioptimalkan AI, meningkatkan nafsu makan dan kesehatan, serta memungkinkan produksi ternak net-zero yang dapat ditelusuri.',
      card3Title: 'Integrasi Mudah',
      card3Desc: 'Solusi plug-and-play yang mengubah operasional Anda menjadi usaha berkelanjutan, menguntungkan, dan siap masa depan.',
      svgLabel1: 'Karbon Insetting',
      svgLabel2: 'Budidaya Cerdas',
      svgLabel3: 'Optimasi Nutrisi',
      svgLabel4: 'Emisi 50% Lebih Rendah',
      svgLabel5: 'Hemat Biaya 30%',
      svgLabel6: 'Ternak Net-Zero',
    },
  }
};

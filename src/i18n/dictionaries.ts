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
}

export interface Dictionary {
  nav: NavDict;
  hero: HeroDict;
  benefits: BenefitsDict;
  palatability: PalatabilityDict;
  consultation: ConsultationDict;
  footer: FooterDict;
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
      contact: 'Contact Name*',
      farmName: 'Farm Name*',
      location: 'Location*',
      herdSize: 'Herd Size (number of cattle)*',
      feedType: 'Current Feed Type',
      dailyFeed: 'Daily Feed Intake per Cow (kg)',
      submit: 'Contact Sales via WhatsApp',
      requiredAlert: 'Please fill in all required fields.'
    },
    footer: {
      about: 'Pioneering the future of sustainable cattle farming through revolutionary feed technology. Transforming agriculture for a net-zero world.',
      addressTitle: 'HiFeed',
      company: 'PT HiFeed Climate Tech Ventures',
      address: 'Jl. K.H. Ahmad Dahlan No. 20, Malabar, Lengkong, Bandung, Jawa Barat 40262',
      email: 'hello@hifeed.co',
      copyright: 'All rights reserved.'
    }
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
      contact: 'Kontak*',
      farmName: 'Nama Peternakan*',
      location: 'Lokasi*',
      herdSize: 'Populasi Ternak*',
      feedType: 'Pakan Ternak yang Digunakan',
      dailyFeed: 'Konsumsi Pakan per Hari per Sapi (kg)',
      submit: 'Hubungi Sales via WhatsApp',
      requiredAlert: 'Mohon lengkapi semua field yang wajib.'
    },
    footer: {
      about: 'Pelopor masa depan peternakan sapi berkelanjutan melalui teknologi pakan revolusioner. Mengubah pertanian menuju net-zero.',
      addressTitle: 'HiFeed',
      company: 'PT HiFeed Climate Tech Ventures',
      address: 'Jl. K.H. Ahmad Dahlan No. 20, Malabar, Lengkong, Bandung, Jawa Barat 40262',
      email: 'hello@hifeed.co',
      copyright: 'Hak cipta dilindungi.'
    }
  }
};

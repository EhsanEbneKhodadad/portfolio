import { projects } from './projects';
import { skills } from './skills';
import type { experience } from './experience';

export const tr = {
  name: 'Ehsan EbneKhodadad',
  role: 'Full Stack Mühendisi',
  bio: 'React, Next.js, TypeScript, ASP.NET Core ve PostgreSQL ile üretim ortamında kullanılan web uygulamaları geliştiriyorum.',
  intro: 'Bir full stack mühendisiyim. Kullanıcıların kullandığı ekranlardan onların arkasındaki sistemlere kadar her alanda çalışıyorum.',
  nav: ['Ana sayfa', 'Hakkımda', 'Projeler', 'Yetenekler', 'Deneyim', 'İletişim'],
};

export const turkishPages = {
  "/": { title: "Ehsan EbneKhodadad · Full Stack Mühendisi", description: "React, Next.js ve ASP.NET Core ile web uygulamaları geliştiren, Tebriz merkezli full stack mühendisi Ehsan EbneKhodadad. Projeleri, becerileri ve deneyimini keşfedin." },
  "/about": { title: "Ehsan EbneKhodadad Hakkında", description: "Arama, REST API’leri, veritabanları ve asenkron işleme üzerinde çalışan, Tebriz merkezli full stack mühendisi Ehsan EbneKhodadad ile tanışın." },
  "/projects": { title: "Full Stack Mühendislik Projeleri · Ehsan EbneKhodadad", description: "mozayedegar.com’un Elasticsearch aramasını, Synaps AI’ın AWS çalışan hattını ve TickCar’ın araç ekspertiz platformunu keşfedin." },
  "/skills": { title: "Full Stack Mühendislik Becerileri · Ehsan EbneKhodadad", description: "Ehsan’ın React, Next.js, TypeScript, ASP.NET Core, PostgreSQL, Elasticsearch, AWS, Docker ve CI/CD becerilerini keşfedin." },
  "/experience": { title: "Yazılım Mühendisliği Deneyimi · Ehsan EbneKhodadad", description: "Açık artırma araması optimizasyonundan çok dilli uygulamalara ve AWS iş işlemeye kadar Ehsan’ın Mozayedegar ve Synaps AI’daki mühendislik çalışmalarını inceleyin." },
  "/contact": { title: "Ehsan EbneKhodadad ile İletişim · Ehsan EbneKhodadad", description: "Ehsan EbneKhodadad ile e-posta yoluyla iletişime geçin veya LinkedIn ve GitHub üzerinden bağlantı kurun." },
};

const projectTranslations = [
  {
    name: 'mozayedegar.com', summary: 'Gelişmiş arama ve abonelik erişimiyle açık artırmaların bir araya getirilmesi.',
    capabilities: [['İlan keşfi', 'Yaklaşık eşleşmeli arama'], ['Özel ilanlar', 'Abonelikler'], ['Teslimat', 'Otomatik dağıtımlar']],
    problem: 'Yaklaşık 1–2 milyon açık artırma kaydı üzerinde esnek eşleştirme ve gelişmiş filtreleme gerekiyordu.',
    role: 'Mozayedegar’da Full Stack Mühendisi',
    solution: 'Elasticsearch ile yaklaşık eşleşmeli arama ve gelişmiş filtreler geliştirdim. Abonelik ve ödeme süreçlerini oluşturdum, Docker ve GitLab CI/CD ile dağıtımları otomatikleştirdim.',
    impact: 'Elasticsearch aramasının sorgu yanıt süreleri 3 saniyenin üzerinden 1 saniyenin altına düştü. Arama, yaklaşık 1–2 milyon ilan üzerinde yaklaşık eşleştirme ve gelişmiş filtreleri destekliyordu.',
  },
  {
    name: 'Synaps AI', summary: 'Özgeçmiş analizi ve mülakat hazırlığı için yapay zekâ destekli bir kariyer platformu.',
    capabilities: [['Değerlendirme', 'Kuyruk tabanlı çalışanlar'], ['Video ve belgeler', 'AWS Lambda'], ['Yerelleştirme', '10 dil']],
    problem: 'Yapay zekâ değerlendirmesinin değişken iş yükünü web isteklerinden bağımsız olarak işlemesi gerekiyordu.',
    role: 'Synaps AI’da Full Stack Mühendisi',
    solution: 'AWS SQS ve otomatik ölçeklenen EC2 çalışanlarıyla asenkron işleme hatları tasarladım. Bağımsız Lambda servisleri, yapılandırılabilir yeniden denemeler ve başarısız işler için yönetici bildirimleriyle transkripsiyon ve PDF çıkarımını yürütüyordu. Kuyruklama, değerlendirmeyi web isteğinden ayırıyor ve çalışan kapasitesinin bağımsız olarak ölçeklenmesini sağlıyordu. Bu aynı zamanda tamamlanma ve hataların ilk isteğin dışında ele alınmasını gerektiriyordu.',
    impact: 'React ve .NET platformu 10 dili destekliyordu.',
  },
  {
    name: 'TickCar', summary: 'Paylaşılabilir PDF raporları sunan çok dilli bir araç ekspertiz platformu.',
    capabilities: [['Ekspertiz', 'SVG hasar şemaları'], ['Belgeleme', 'Görsel yükleme'], ['Raporlama', 'Paylaşılabilir PDF']],
    problem: 'Araç ekspertizi için hasar kaydı, fotoğraf ekleme, erişim yönetimi ve tamamlanan raporların paylaşılması gerekiyordu.',
    solution: 'Platform JWT ve rol tabanlı yetkilendirme kullanıyor. Ekspertiz akışları, SVG hasar şemaları, görsel yükleme, ödeme ve PDF raporlamayı bir araya getiriyor.',
  },
] satisfies Partial<(typeof projects)[number]>[];

export const projectsTr = projects.map((project, index) => ({ ...project, ...projectTranslations[index] }));
const skillTranslations = [
  ['Frontend', 'Duyarlı arayüzler ve yeniden kullanılabilir bileşenler'],
  ['Backend', 'Uygulama servisleri ve API tasarımı'],
  ['Veri', 'Veritabanı tasarımı ve arama'],
  ['Bulut ve DevOps', 'Asenkron işleme ve otomatik dağıtımlar'],
  ['Test ve araçlar', 'Uçtan uca testler, izleme ve sürüm kontrolü'],
];
export const skillsTr = skills.map((skill, index) => ({ ...skill, title: skillTranslations[index][0], description: skillTranslations[index][1] }));
export const experienceTr = [
  {
    company: 'Mozayedegar', role: 'Full Stack Mühendisi', location: 'Tebriz, İran', dates: 'Haziran 2024 – Günümüz',
    achievements: [
      'Next.js, React, TypeScript, ASP.NET Core ve PostgreSQL ile uygulamalar, REST API’leri ve veritabanı şemaları geliştirdim.',
      'Yaklaşık 1–2 milyon açık artırma kaydı üzerinde yaklaşık eşleştirme ve gelişmiş filtrelerle Elasticsearch araması geliştirdim. Sorgu yanıt sürelerini 3 saniyenin üzerinden 1 saniyenin altına indirdim.',
      'Özel açık artırma ilanları için abonelik erişim kontrolleri ve ödemeleri uyguladım.',
      'Docker, GitLab CI/CD ve GitLab Runner ile farklı ortamlardaki dağıtımları otomatikleştirdim.',
      'Kod incelemeleri, mimari kararlar ve teknik rehberlikle 3–4 geliştiriciye mentorluk yaptım.',
    ],
  },
  {
    company: 'Synaps AI', role: 'Full Stack Mühendisi', location: 'Uzaktan', dates: 'Haziran 2023 – Haziran 2024',
    achievements: [
      '10 dili destekleyen çok dilli bir React ve .NET platformu geliştirdim.',
      'Yapay zekâ değerlendirmesini web isteklerinden ayırmak için AWS SQS ve otomatik ölçeklenen EC2 çalışanları kullandım.',
      'Video transkripsiyonu ve özgeçmiş PDF’lerinden metin çıkarımı için AWS Lambda servisleri geliştirdim.',
      'Asenkron işler için yapılandırılabilir yeniden denemeler, hata yönetimi ve yönetici bildirimleri ekledim.',
    ],
  },
  {
    company: 'Mozayedegar', role: 'Frontend Geliştirici', location: 'Tebriz, İran', dates: 'Haziran 2022 – Haziran 2023',
    achievements: [
      'Mevcut MVP yeniden geliştirilirken Next.js ve Tailwind CSS kullanımına geçişe öncülük ettim.',
      'React ve TypeScript ile yeniden kullanılabilir bileşenler geliştirdim.',
      'Kritik akışlar için Cypress uçtan uca testleri ile Jest birim ve entegrasyon testleri oluşturdum.',
    ],
  },
] satisfies typeof experience;

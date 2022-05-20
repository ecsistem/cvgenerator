import { Cv } from '~/types/cvgenerator';

export const cvSettingTemplate: Cv = {
  jobTitle: 'Desenvolvedor Front-End',
  name: 'Edson',
  lastName: 'Costa',
  email: 'edson.13.10.2004@gmail.com',
  location: 'Capanema, Pará, Brasil',
  phoneNumber: '+55(91)9000-0000',
  aboutme:
    'Atualmente trabalho com desenvolvimento full-stack e gestão de projetos. Possuo amplos conhecimentos em desenvolvimento front-end, back-end e mobile no desenvolvimento de sistemas web, aplicativos, sites e integração de sistemas.\nSou uma pessoa completamente apaixonado por tecnologia. Tenho como foco contribuir e influenciar no crescimento de pessoas e empresas e procurando sempre viver novas experiencias e desafios.',
  jobSkills: ['Vue', 'React', 'Laravel', 'Tailwind', 'Bootstrap'],
  softSkills: ['Liderança', 'Produtividade', 'Metodologia Srum'],
  languages: [
    {
      lang: 'Inglês',
      level: '40%',
    },
    {
      lang: 'Português',
      level: '100%',
    },
  ],
  linkedin: 'edsoncostadev',
  twitter: '',
  github: 'ecsistem',
  website: 'https://edsoncosta.vercel.app',
  education: [
    {
      title: 'Bacharelado em Sistema de Informação',
      location: 'Universidade Federal do Pará, Castanhal-PA, Brasil',
      from: '2022-06-01',
      to: '1993-05-01T03:00:00.000Z',
      current: true,
      summary: '',
      summaryArr: [''],
    },
  ],
  work: [
    {
      title: 'Técnico em redes de telecomunicação',
      location: 'Lannet - Capanema, Pará, Brasil',
      from: '2019-01-05',
      to: '2020-03-05',
      current: false,
      summary:
        'Principais atividades:\nAtendimento helpdesk abertura e acompanhamento de chamados; Instalações de redes a Residências e Organizações Comerciais; Suporte técnico a clientes varejos e corporativos, nas soluções ofertadas pela organização; Gerenciamento de link de dados e ativos de rede utilizando Mikrotik, Zabbix e Cacti; Gerenciamento de Rede utilizando a API do Mikrotik; Troubleshooting em Switchs e roteadores(Intelbrás, Mikrotik e Datacom);',
      summaryArr: [
        'Principais atividades:',
        'Atendimento helpdesk abertura e acompanhamento de chamados; Instalações de redes a Residências e Organizações Comerciais; Suporte técnico a clientes varejos e corporativos, nas soluções ofertadas pela organização; Gerenciamento de link de dados e ativos de rede utilizando Mikrotik, Zabbix e Cacti; Gerenciamento de Rede utilizando a API do Mikrotik; Troubleshooting em Switchs e roteadores(Intelbrás, Mikrotik e Datacom);',
      ],
    },
    {
      title: 'Estagiário de Nível Médio',
      location: 'Ministério Público do Estado do Pará - Capanema, Pará, Brasil',
      from: '2020-02-02',
      to: '2022-02-02',
      current: false,
      summary:
        'Principais atividades:\nAtendimento ao Público; Recebimento de documentos externos e internos; Classificação – Com base no assunto a se tratar o fato; Agendamento de reuniões; Confecção de documentos, como: Ofícios, Memorando, Termo de Declaração, Habilitações e Manifestações; Registro (Sistema de Protocolo);Distribuição – Entre PJ’s, Gati, Apoio Técnico, etc; Expedição – Cadernos de Protocolo;Arquivamento;',
      summaryArr: [
        'Principais atividades:',
        'Atendimento ao Público; Recebimento de documentos externos e internos; Classificação – Com base no assunto a se tratar o fato; Agendamento de reuniões; Confecção de documentos, como: Ofícios, Memorando, Termo de Declaração, Habilitações e Manifestações; Registro (Sistema de Protocolo);Distribuição – Entre PJ’s, Gati, Apoio Técnico, etc; Expedição – Cadernos de Protocolo;Arquivamento;',
      ],
    },
    {
      title: 'Desenvolvedor Full-stack (Freelancer)',
      location: 'Capanema, Pará, Brasil',
      from: '2020-04-01',
      to: '2022-05-20T18:48:20.934Z',
      current: true,
      summary:
        'Principais atividades:\nDesenvolvimento de Aplicações WEB; Desenvolvimento de Softwares; Desenvolvimento de Aplicativos; Desenvolvimento de Jogos; Criação de sites;',
      summaryArr: [
        'Principais atividades:',
        '•Desenvolvimento de Aplicações WEB; Desenvolvimento de Softwares; Desenvolvimento de Aplicativos; Desenvolvimento de Jogos; Criação de sites;',
      ],
    },
  ],
  projects: [
    {
      title: 'Levanta Jovem',
      location: 'Capanema, Pará, Brasil',
      from: '2022-04-05',
      to: '2012-02-01T02:00:00.000Z',
      current: true,
      summary: '',
      summaryArr: [''],
    },
  ],
  displayEducation: true,
  displayProjects: false,
  activeColor: '#5B21B6',
};

export const cvSettingsEmptyTemplate: Cv = {
  jobTitle: '',
  name: '',
  lastName: '',
  email: '',
  location: '',
  phoneNumber: '',
  aboutme: '',
  jobSkills: [],
  softSkills: [],
  languages: [],
  linkedin: '',
  twitter: '',
  github: '',
  website: '',
  education: [
    {
      title: '',
      location: '',
      from: new Date(),
      to: new Date(),
      current: true,
      summary: '',
    },
  ],
  work: [
    {
      title: '',
      location: '',
      from: new Date(),
      to: new Date(),
      current: true,
      summary: '',
    },
  ],
  projects: [
    {
      title: '',
      location: '',
      from: new Date(),
      to: new Date(),
      current: true,
      summary: '',
    },
  ],
  displayEducation: true,
  displayProjects: false,
  activeColor: '#5B21B6',
};

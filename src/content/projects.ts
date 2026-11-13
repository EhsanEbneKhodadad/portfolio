type Project = {
  slug: string;
  name: string;
  summary: string;
  url: string;
  stack: string[];
  capabilities: [string, string][];
  problem: string;
  solution: string;
  role?: string;
  impact?: string;
};

export const projects: readonly Project[] = [
  {
    slug: 'den-auction', name: 'DEN Auction', url: 'https://den.auction',
    summary: 'Auction aggregation with advanced search and subscription access.',
    stack: ['Next.js', '.NET', 'Elasticsearch', 'Docker'],
    capabilities: [['Auction discovery', 'Fuzzy search'], ['Premium listings', 'Subscriptions'], ['Delivery', 'Automated deployments']],
    problem: 'Auction search needed to support flexible matching and advanced filtering across approximately 1–2 million records.',
    role: 'Full Stack Engineer at Mozayedegar',
    solution: 'I implemented Elasticsearch search with fuzzy matching and advanced filters, built subscription and payment workflows, and automated deployments with Docker and GitLab CI/CD.',
    impact: 'Query response times dropped from over 3 seconds to under 1 second.',
  },
  {
    slug: 'synaps-ai', name: 'Synaps AI', url: 'https://www.synapsai.ai/',
    summary: 'An AI-powered career platform for résumé analysis and interview preparation.',
    stack: ['React', '.NET', 'AWS', 'SQS'],
    capabilities: [['Evaluation', 'Queue-based workers'], ['Video and documents', 'AWS Lambda'], ['Localization', '10 languages']],
    problem: 'AI evaluation had to handle variable workloads independently of web requests.',
    role: 'Full Stack Engineer at Synaps AI',
    solution: 'I designed asynchronous pipelines using AWS SQS and autoscaling EC2 workers. Independent Lambda services handled transcription and PDF extraction, with configurable retries and administrator alerts for failed jobs.',
    impact: 'The React and .NET platform supported 10 languages.',
  },
  {
    slug: 'tickcar', name: 'TickCar', url: 'https://tickcar.com',
    summary: 'A multilingual vehicle inspection platform with shareable PDF reports.',
    stack: ['Next.js', '.NET'],
    capabilities: [['Inspections', 'SVG damage diagrams'], ['Documentation', 'Image uploads'], ['Reporting', 'Shareable PDFs']],
    problem: 'Vehicle inspections require a way to capture damage, attach photos, manage access, and share completed reports.',
    solution: 'The platform uses JWT role-based authorization and combines inspection workflows, SVG damage diagrams, image uploads, payments, and PDF reporting.',
  },
];

const slugs = new Set<string>();
for (const project of projects) {
  const required = [project.name, project.summary, project.problem, project.solution];
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) || slugs.has(project.slug) ||
      required.some((field) => !field.trim()) || !project.stack.length ||
      !/^https?:\/\//.test(project.url)) {
    throw new Error('Invalid or duplicate project: ' + project.slug);
  }
  slugs.add(project.slug);
}

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

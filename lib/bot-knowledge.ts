import { products } from './products';
import { technologyGroups } from './technologies';
export const botServices = [
    { title: 'AI & Automation', category: 'AI & Automation', description: 'AI applications, retrieval, useful agents, and workflow automation.' },
    { title: 'Application Development', category: 'Build a product', description: 'Web, mobile, and backend applications from design to launch.' },
    { title: 'Cloud & DevOps', category: 'Cloud / DevOps', description: 'Reliable infrastructure, automated releases, and cloud operations.' },
    { title: 'Data & Governance', category: 'Data / governance', description: 'Data platforms, governance, and analytics foundations.' },
    { title: 'Managed Engineering', category: 'Managed engineering', description: 'Ongoing development, production support, and improvements.' },
    { title: 'Technology Consulting', category: 'Technology consulting', description: 'Architecture, modernization, and technical decisions.' },
] as const;
export const botKnowledge = {
    name: 'TinkrLabz',
    positioning: 'AI products and software engineering, from idea to reliable operation.',
    services: botServices,
    technologies: technologyGroups,
    products,
    contact: 'hello@tinkrlabz.com',
    process: ['Discover', 'Design', 'Build', 'Support'],
    evidence: 'No approved public case studies, prices, delivery dates, or customer metrics are available.',
};

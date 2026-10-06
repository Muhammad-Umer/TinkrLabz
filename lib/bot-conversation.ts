import type { ContactData } from './contact';
import { categories } from './contact';
import { technologyGroups } from './technologies';
export type ChatTurn = {
    role: 'user' | 'assistant';
    content: string;
};
export type BotPanel = 'none' | 'ai' | 'products' | 'services' | 'technologies' | 'review';
export type BotReply = {
    reply: string;
    suggestions: string[];
    panel: BotPanel;
    group: string | null;
    topic: string | null;
    goal: string | null;
};
export type ChatMessage = ChatTurn & {
    id: number;
    panel?: BotPanel;
    group?: string | null;
    suggestions?: string[];
    private?: boolean;
};
export const welcome: ChatMessage = { id: 0, role: 'assistant', content: 'Hi, I am TinkrBot. Tell me what you want to build or explore.', suggestions: ['Automate a workflow', 'Build an AI app', 'Explore products', 'Help choose a stack'] };
export function nextInquiryField(data: ContactData): 'category' | 'message' | 'name' | 'email' | 'review' {
    if (!(categories as readonly string[]).includes(data.category))
        return 'category';
    if (!data.message.trim() || data.message.length > 5000)
        return 'message';
    if (!data.name.trim() || data.name.length > 120)
        return 'name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254)
        return 'email';
    return 'review';
}
export function guidedReply(history: ChatTurn[], currentGoal = ''): BotReply {
    const text = history.at(-1)?.content || '';
    const lower = text.toLowerCase();
    const previous = history.slice(0, -1).slice(-4).map(turn => turn.content).join(' ').toLowerCase();
    const base: BotReply = { reply: '', suggestions: [], panel: 'none', group: null, topic: null, goal: null };
    const clearGoal = /\b(need|build|create|automate|improve|develop)\b/i.test(text) && !/^(what|which|show|explore|help choose|tell)/i.test(text);
    const lastQuestion = history.slice(0, -1).filter(turn => turn.role === 'assistant').at(-1)?.content || '';
    const isDetail = !!currentGoal && !/^(show|explore|help choose|what|which|how|prepare|keep|use internal)/i.test(text);
    const goal = isDetail && !clearGoal ? `${currentGoal}\n${text}`.slice(0, 5000) : clearGoal ? text : currentGoal;
    const mentions = (pattern: RegExp) => pattern.test(lower);
    if (mentions(/pricing|price|cost|budget|how much/))
        return { ...base, reply: 'Pricing depends on scope. I can turn your goal into an inquiry so you can get a specific answer. What would you like to build?', suggestions: ['Prepare my inquiry', 'Keep exploring'] };
    if (mentions(/case stud|client|proven|metric/))
        return { ...base, reply: 'There are no approved public case studies listed yet. I can help you ask about relevant experience for your project.', suggestions: ['Prepare my inquiry', 'Show services'] };
    if (mentions(/product/) && !clearGoal)
        return { ...base, reply: 'No public TinkrLabz products are listed yet. Are you looking for a product update or help building your own?', panel: 'products', suggestions: ['Ask about product updates', 'I want to build a product'], topic: 'Ask about a TinkrLabz product' };
    const group = technologyGroups.find(item => item.items.some(tech => new RegExp('(?:^|[^a-z0-9])' + tech.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:$|[^a-z0-9])').test(lower)) || lower.includes(item.title.toLowerCase()));
    if (group || mentions(/stack|technolog|framework|\baws\b|\bgcp\b|\bazure\b/))
        return { ...base, reply: group ? `${group.title} could be relevant. The right fit depends on your workload and constraints. What are you trying to build?` : 'We can work across cloud, AI, applications, data, and operations. Which part would you like to explore?', panel: 'technologies', group: group?.title || null, suggestions: ['AI & machine learning', 'Cloud platforms', 'Prepare my inquiry'], topic: 'Technology consulting' };
    if (mentions(/services|what do you do|capabilities|about tinkr/))
        return { ...base, reply: 'We create AI applications and software, then help operate and improve them. Which outcome matters most to you?', panel: 'services', suggestions: ['Automate a workflow', 'Build a product', 'Improve cloud operations'] };
    if (mentions(/\bai\b|agent|automat|document|knowledge|search|model|llm/) || (!mentions(/cloud|deploy|infrastructure|devops|data quality|analytics|database/) && /ai|automat|document|source references|reviewed by a person|starting source|outcome.*data/i.test(lastQuestion))) {
        const internal = mentions(/internal|private|sensitive|confidential/) || /internal|private|sensitive/.test(previous);
        const reply = /reviewed by a person|should answers include/i.test(lastQuestion) && isDetail ? 'That preference is saved in your brief. You can prepare an inquiry now or explore the technology fit.' : /which documents or systems/i.test(lastQuestion) && isDetail ? 'That gives us a starting source. Should answers include references, or should the workflow also take an action?' : /what comes in/i.test(lastQuestion) && isDetail ? 'I have added that workflow to your brief. Should the result be reviewed by a person before anything happens?' : /what should it help/i.test(lastQuestion) && isDetail ? 'I have added that outcome. What data or system would it need to work with?' : internal ? 'For internal knowledge, start with access controlled retrieval and source references. Which documents or systems should the answer come from?' : mentions(/workflow|automat/) ? 'Let us find the repetitive step worth automating. What comes in, what should happen, and what should the result be?' : 'That points toward an AI application grounded in useful data. What should it help someone do?';
        return { ...base, reply, panel: 'ai', topic: 'AI & Automation', goal: goal || null, suggestions: goal ? ['Prepare my inquiry', 'Use internal documents', 'Help choose a stack'] : ['Search internal knowledge', 'Automate document processing', 'Prepare my inquiry'] };
    }
    if (mentions(/cloud|deploy|infrastructure|devops/))
        return { ...base, reply: 'We can shape the cloud platform and delivery workflow around that. What is the main issue: releases, reliability, or infrastructure?', topic: 'Cloud / DevOps', goal: goal || null, suggestions: ['Improve releases', 'Improve reliability', 'Prepare my inquiry'] };
    if (mentions(/data|analytic|database/))
        return { ...base, reply: 'Let us narrow the data problem. Is it getting reliable data, governing access, or making it useful for decisions?', topic: 'Data / governance', goal: goal || null, suggestions: ['Data quality', 'Analytics foundations', 'Prepare my inquiry'] };
    if (clearGoal || currentGoal)
        return { ...base, reply: /who will use/i.test(lastQuestion) && isDetail ? 'That outcome is in your brief. Do you have an existing application, or is this a new build?' : /existing application/i.test(lastQuestion) && isDetail ? 'Your brief now has the goal, audience, and starting point. Ready to prepare an inquiry, or would you like to explore the stack?' : 'I have the starting point. Who will use it, and what would a useful result look like?', topic: /improv/.test(lower) ? 'Improve an application or platform' : 'Build a product', goal: goal || null, suggestions: ['Prepare my inquiry', 'Show services'] };
    return { ...base, reply: 'I can help with AI, products, applications, cloud, and data. Tell me your goal, or choose a starting point.', suggestions: ['Automate a workflow', 'Build a product', 'Show services'] };
}

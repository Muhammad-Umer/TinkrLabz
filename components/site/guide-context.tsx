'use client';
import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { categories, validateContact, type ContactData } from '@/lib/contact';
import { emptyContact } from '@/lib/tinkrbot';
import { welcome, nextInquiryField, guidedReply, type ChatMessage } from '@/lib/bot-conversation';
export type GuideView = 'home' | 'ai' | 'products' | 'platform' | 'services' | 'technologies' | 'contact';
type Stage = 'none' | ReturnType<typeof nextInquiryField>;
type Value = {
    show: (view?: GuideView, category?: string) => void;
    data: ContactData;
    update: (field: keyof ContactData, value: string) => void;
    errors: Record<string, string>;
    error: string;
    sent: boolean;
    pending: boolean;
    send: () => Promise<void>;
    reset: () => void;
    messages: ChatMessage[];
    ask: (text: string) => Promise<void>;
    mode: string;
    stage: Stage;
    prepare: (category?: string) => void;
    restart: () => void;
};
const Context = createContext<Value | null>(null);
const questions = { category: 'What is your inquiry about?', message: 'What would you like to build or improve?', name: 'What name should we use?', email: 'What email should we reply to?', review: 'Your inquiry is ready. Review it below and send when you are happy with it.' };
export function GuideProvider({ children }: {
    children: ReactNode;
}) {
    const router = useRouter(), pathname = usePathname();
    const [data, setData] = useState<ContactData>({ ...emptyContact }), draft = useRef(data);
    const [messages, setMessages] = useState<ChatMessage[]>([welcome]), turns = useRef(messages), seq = useRef(0);
    const [stage, setStage] = useState<Stage>('none'), step = useRef<Stage>('none');
    const [errors, setErrors] = useState<Record<string, string>>({}), [error, setError] = useState(''), [sent, setSent] = useState(false), [pending, setPending] = useState(false);
    const mode = 'Guided conversation';
    const busy = useRef(false);
    function add(message: Omit<ChatMessage, 'id'>) { const next = [...turns.current, { ...message, id: ++seq.current }]; turns.current = next; setMessages(next); }
    function update(field: keyof ContactData, value: string) { draft.current = { ...draft.current, [field]: value }; setData(draft.current); setErrors(current => { const next = { ...current }; delete next[field]; return next; }); }
    function focus() { if (pathname !== '/')
        router.push('/#tinkrbot');
    else
        document.getElementById('bot-input')?.focus({ preventScroll: true }); }
    function question() { const next = nextInquiryField(draft.current); step.current = next; setStage(next); add({ role: 'assistant', content: questions[next], private: true, panel: next === 'review' ? 'review' : 'none', suggestions: next === 'category' ? [...categories] : ['Keep exploring'] }); }
    function prepare(category?: string) { if (busy.current)
        return; if (sent) {
        add({ role: 'assistant', content: 'Your inquiry has already been sent. Start a new conversation to prepare another.' });
        return;
    } if (category)
        update('category', category); question(); focus(); }
    function respond() {
        const history = turns.current.filter(turn => !turn.private).slice(-12).map(({ role, content }) => ({ role, content }));
        const answer = guidedReply(history, draft.current.message);
        if (answer.topic && (answer.panel !== 'technologies' || !draft.current.category))
            update('category', answer.topic);
        if (answer.goal)
            update('message', answer.goal);
        add({ role: 'assistant', content: answer.reply, panel: answer.panel, group: answer.group, suggestions: answer.suggestions });
    }
    async function ask(raw: string) {
        const text = raw.trim().slice(0, 2000);
        if (!text || busy.current)
            return;
        if (/^keep exploring$/i.test(text)) {
            step.current = 'none';
            setStage('none');
            add({ role: 'assistant', content: 'Your brief is saved. What else would you like to explore?', suggestions: ['Show services', 'Help choose a stack', 'Prepare my inquiry'] });
            return;
        }
        if (/^(prepare my inquiry|start an inquiry|contact|send inquiry|ask about product updates)$/i.test(text)) {
            add({ role: 'user', content: text });
            prepare();
            return;
        }
        if (step.current !== 'none' && step.current !== 'review') {
            add({ role: 'user', content: text, private: true });
            const field = step.current;
            if (field === 'category' && !(categories as readonly string[]).includes(text)) {
                add({ role: 'assistant', content: 'Choose a topic so your inquiry reaches the right place.', private: true, suggestions: [...categories] });
                return;
            }
            update(field, text);
            question();
            return;
        }
        // Inquiry details stay outside browsing context. Visitors must explicitly send the reviewed inquiry.
        if (step.current === 'review') {
            add({ role: 'assistant', content: 'Use Edit details to update your inquiry, Send inquiry to submit it, or Keep exploring to continue.', private: true, suggestions: ['Keep exploring'], panel: 'review' });
            return;
        }
        add({ role: 'user', content: text });
        respond();
    }
    function show(view: GuideView = 'home', category?: string) { focus(); if (view === 'home')
        return; if (view === 'contact') {
        prepare(category);
        return;
    } step.current = 'none'; setStage('none'); const prompts = { ai: 'I want to explore AI for my business', products: 'Which products are available?', platform: 'I want to build a product', services: 'What services do you offer?', technologies: 'Help choose a stack' }; void ask(prompts[view]); }
    async function send() {
        if (busy.current || sent)
            return;
        const validation = validateContact(draft.current);
        setErrors(validation);
        setError('');
        if (Object.keys(validation).length) {
            setError('Please check your details before sending.');
            return;
        }
        busy.current = true;
        setPending(true);
        try {
            const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft.current) });
            const result = await response.json();
            if (!response.ok || !result.success) {
                setErrors(result.errors || {});
                setError(result.error || 'Please check your details and try again.');
                return;
            }
            setSent(true);
        }
        catch {
            setError('Unable to send. Try again or email hello@tinkrlabz.com.');
        }
        finally {
            busy.current = false;
            setPending(false);
        }
    }
    function reset() { if (busy.current)
        return; draft.current = { ...emptyContact }; setData(draft.current); setErrors({}); setError(''); setSent(false); step.current = 'none'; setStage('none'); }
    function restart() { if (busy.current)
        return; reset(); turns.current = [welcome]; setMessages([welcome]); }
    return <Context.Provider value={{ show, data, update, errors, error, sent, pending, send, reset, messages, ask, mode, stage, prepare, restart }}>{children}</Context.Provider>;
}
export function useGuide() { const context = useContext(Context); if (!context)
    throw new Error('TinkrBot requires GuideProvider'); return context; }

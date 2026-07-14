'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface AboutProps {
    content: string;
    title?: string;
}

export default function About({ content, title = 'About' }: AboutProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className="mb-7">
                <h2 className="font-serif text-[1.75rem] leading-tight tracking-tight font-bold text-primary mb-3">{title}</h2>
                <div className="rule-double" />
            </div>
            <div className="lede text-[0.9375rem] text-neutral-700 leading-[1.85]">
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => <h1 className="font-serif text-3xl font-bold text-primary mt-8 mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">{children}</h2>,
                        h3: ({ children }) => <h3 className="font-serif text-xl font-semibold text-primary mt-6 mb-3">{children}</h3>,
                        p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 ml-4">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 ml-4">{children}</ol>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        a: ({ ...props }) => (
                            <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary font-medium underline decoration-neutral-300 underline-offset-4 hover:text-accent hover:decoration-accent transition-colors duration-200"
                            />
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-2 border-primary pl-4 font-serif italic my-4 text-neutral-600">
                                {children}
                            </blockquote>
                        ),
                        strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                        em: ({ children }) => <em className="italic text-neutral-600">{children}</em>,
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </motion.section>
    );
}

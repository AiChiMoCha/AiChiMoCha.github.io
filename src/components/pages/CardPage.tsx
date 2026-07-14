'use client';

import { motion } from 'framer-motion';
import { CardPageConfig } from '@/types/page';

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className={embedded ? "mb-2" : "mb-4"}>
                <h1 className={`${embedded ? "text-[2rem]" : "text-[2.75rem]"} font-serif font-bold tracking-tight leading-tight text-primary mb-2`}>{config.title}</h1>
                {config.description && (
                    <p className="font-serif italic text-base text-neutral-500 max-w-2xl mb-4">
                        {config.description}
                    </p>
                )}
                <div className="rule-double" />
            </div>

            <div>
                {config.items.map((item, index) => (
                    <motion.article
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="py-6 border-b border-neutral-200 last:border-b-0"
                    >
                        <div className="flex justify-between items-baseline gap-4 mb-1.5">
                            <h3 className={`${embedded ? "text-lg" : "text-xl"} font-serif font-semibold text-primary leading-snug`}>{item.title}</h3>
                            {item.date && (
                                <span className="eyebrow text-neutral-400 flex-shrink-0">
                                    {item.date}
                                </span>
                            )}
                        </div>
                        {item.subtitle && (
                            <p className="eyebrow text-accent mb-2">{item.subtitle}</p>
                        )}
                        {item.content && (
                            <p className="text-sm text-neutral-600 leading-relaxed">
                                {item.content}
                            </p>
                        )}
                        {item.tags && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {item.tags.map(tag => (
                                    <span key={tag} className="inline-block text-[0.6875rem] tracking-wide uppercase px-2.5 py-1 rounded-md border border-neutral-300 text-neutral-500">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.article>
                ))}
            </div>
        </motion.div>
    );
}

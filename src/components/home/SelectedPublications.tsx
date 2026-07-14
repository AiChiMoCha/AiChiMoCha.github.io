'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Publication } from '@/types/publication';
import { formatVenue } from '@/lib/utils';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title = 'Selected Publications', enableOnePageMode = false }: SelectedPublicationsProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="mb-3">
                <div className="flex items-baseline justify-between mb-3">
                    <h2 className="font-serif text-[1.75rem] leading-tight tracking-tight font-bold text-primary">{title}</h2>
                    <Link
                        href={enableOnePageMode ? "/#publications" : "/publications"}
                        prefetch={true}
                        className="eyebrow text-neutral-500 hover:text-accent transition-colors duration-200"
                    >
                        View All →
                    </Link>
                </div>
                <div className="rule-double" />
            </div>
            <div>
                {publications.map((pub, index) => (
                    <motion.article
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="group flex gap-5 py-6 border-b border-neutral-200 last:border-b-0"
                    >
                        <span className="hidden sm:block w-8 flex-shrink-0 font-serif italic text-xl text-neutral-300 leading-none pt-0.5">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                            <p className="eyebrow text-neutral-400 mb-1.5">
                                {formatVenue(pub.journal || pub.conference)}{(pub.journal || pub.conference) && pub.year ? ' · ' : ''}{pub.year}
                            </p>
                            <h3 className="font-serif text-xl font-semibold text-primary leading-snug mb-1.5 group-hover:text-accent transition-colors duration-200">
                                {pub.title}
                            </h3>
                            <p className="text-sm text-neutral-500 mb-1">
                                {pub.authors.map((author, idx) => (
                                    <span key={idx}>
                                        <span className={author.isHighlighted ? 'font-semibold text-primary' : ''}>
                                            {author.name}
                                        </span>
                                        {author.isCorresponding && (
                                            <sup className="ml-0 text-neutral-500">†</sup>
                                        )}
                                        {idx < pub.authors.length - 1 && ', '}
                                    </span>
                                ))}
                            </p>
                            {pub.description && (
                                <p className="text-sm text-neutral-500 italic line-clamp-2">
                                    {pub.description}
                                </p>
                            )}
                        </div>
                    </motion.article>
                ))}
            </div>
        </motion.section>
    );
}

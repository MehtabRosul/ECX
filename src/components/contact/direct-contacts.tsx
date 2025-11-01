'use client';

import { motion } from 'framer-motion';
import { Mail, Copy, Check } from 'lucide-react';
import { useState, useCallback, useMemo, memo } from 'react';

interface ContactItem {
  label: string;
  email: string;
  description: string;
  gradient: string;
  iconBg: string;
}

const contacts: ContactItem[] = [
  {
    label: 'Sales',
    email: 'sales@encryptarx.com',
    description: 'Inquiries about our products and services',
    gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
    iconBg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    label: 'Services',
    email: 'services@encryptarx.com',
    description: 'Professional services and implementation support',
    gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    label: 'Consultancy',
    email: 'consultancy@encryptarx.com',
    description: 'Expert consultation and advisory services',
    gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
    iconBg: 'bg-green-500/10 border-green-500/20',
  },
  {
    label: 'R&D',
    email: 'rnd@encryptarx.com',
    description: 'Research and development collaborations',
    gradient: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
    iconBg: 'bg-orange-500/10 border-orange-500/20',
  },
];

const ContactCard = memo(({ contact, index, copied, onCopy }: { contact: ContactItem; index: number; copied: string | null; onCopy: (email: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative"
  >
    <div className="relative h-full rounded-2xl border border-white/10 bg-surface-2/50 backdrop-blur-xl overflow-hidden p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20">
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:via-primary/10 group-hover:to-primary/20 blur-2xl transition-all duration-500" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-6">
          <div className={`inline-flex p-4 rounded-xl ${contact.iconBg} border group-hover:scale-110 transition-transform duration-300`}>
            <Mail className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Label */}
        <h3 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {contact.label}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6">
          {contact.description}
        </p>

        {/* Email */}
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-surface-1/50 border border-white/10 group-hover:border-primary/30 transition-colors duration-300">
          <a
            href={`mailto:${contact.email}`}
            className="flex-1 text-sm font-medium text-foreground hover:text-primary transition-colors duration-300 truncate"
          >
            {contact.email}
          </a>
          <button
            onClick={() => onCopy(contact.email)}
            className="p-2 rounded-lg bg-surface-2/50 hover:bg-primary/10 border border-white/10 hover:border-primary/30 transition-all duration-300 group/btn"
            aria-label={`Copy ${contact.email} to clipboard`}
          >
            {copied === contact.email ? (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="text-green-400"
              >
                <Check className="w-4 h-4" />
              </motion.div>
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary transition-colors duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        animate={{
          background: [
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          ],
        }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
        style={{ x: '-100%' }}
      />
    </div>
  </motion.div>
));
ContactCard.displayName = 'ContactCard';

function DirectContactsComponent() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(email);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  const memoizedContacts = useMemo(() => contacts, []);

  return (
    <section id="direct" className="relative w-full py-20 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Direct <span className="text-primary">Contacts</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Reach out to our specialized teams directly
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {memoizedContacts.map((contact, index) => (
            <ContactCard
              key={contact.label}
              contact={contact}
              index={index}
              copied={copied}
              onCopy={copyToClipboard}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export const DirectContacts = memo(DirectContactsComponent);


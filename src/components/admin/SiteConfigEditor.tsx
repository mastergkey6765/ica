import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { Loader2, Save } from 'lucide-react';

const SITE_SECTIONS = [
  {
    id: "home_hero",
    title: "Home Page Hero",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "titlePart1", label: "Title First Part", type: "text" },
      { key: "titleHighlight", label: "Title Highlight (Gold)", type: "text" },
      { key: "titlePart2", label: "Title Last Part", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "primaryCtaText", label: "Primary CTA Button", type: "text" },
      { key: "secondaryCtaText", label: "Secondary CTA Button", type: "text" },
    ]
  },
  {
    id: "about_hero",
    title: "About Page Hero",
    fields: [
      { key: "title", label: "Title", type: "textarea" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
    ]
  },
  {
    id: "training_hero",
    title: "Training Page Hero",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "titlePart1", label: "Title First Part", type: "text" },
      { key: "titleHighlight", label: "Title Highlight (Gold)", type: "text" },
      { key: "titlePart2", label: "Title Last Part", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
    ]
  },
  {
    id: "academy_hero",
    title: "ICA Academy Hero",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "titlePart1", label: "Title First Part", type: "text" },
      { key: "titleHighlight", label: "Title Highlight (Gold)", type: "text" },
      { key: "titlePart2", label: "Title Last Part", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
    ]
  },
  {
    id: "leadership_hero",
    title: "Leadership Page Hero",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
    ]
  },
  {
    id: "advisory_hero",
    title: "Advisory Board Hero",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
    ]
  },
  {
    id: "consultants_hero",
    title: "ICA Consultants Hero",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
    ]
  },
  {
    id: "join_ica_hero",
    title: "Join ICA Hero",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
    ]
  },
  {
    id: "contact_hero",
    title: "Contact Page Hero",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
    ]
  }
];

export default function SiteConfigEditor() {
  const [content, setContent] = useState<any>({
    home_hero: {
      badge: "International Caregivers Association LLC",
      titlePart1: "Setting the New Best Practice in ",
      titleHighlight: "Dementia & Alzheimer's",
      titlePart2: " Care.",
      subtitle: "We're reshaping dementia care across the board with the Transactional Dementia Intelligence™ (TDI) Model. Practical communication strategies for families, professionals, and organizations.",
      primaryCtaText: "Explore Training Programs",
      secondaryCtaText: "Book a free 30 Min call"
    },
    home_stats: {
      stats: [
        { id: '1', value: 5, suffix: '', label: 'Continents We Touch', description: 'ICA brings a global vision that is embraced by caregiving partners around the world' },
        { id: '2', value: 20, suffix: '+', label: 'Years Experience', description: 'ICA was founded based on more than 20 years of in-depth caregiver experience by Dr. Ethelle Lord.' },
        { id: '3', value: 1, suffix: '', label: 'Fastest Growing', description: 'ICA is the fastest-growing association by introducing "Dementia Intelligence™" communication training that improves dementia care at all levels.' }
      ]
    },
    about_hero: {
      title: "About the International\nCaregivers Association",
      subtitle: "Transforming Dementia Care Through the TDI Model"
    },
    training_hero: {
      badge: "The TDI Model",
      titlePart1: "A Complete Dementia Care System That ",
      titleHighlight: "Transforms Organizations",
      titlePart2: " and Restores Dignity",
      subtitle: "Turnover, burnout, and behavioral challenges aren't inevitable. They are symptoms of a communication gap. The TDI Model bridges that gap, creating a supportive environment where both caregivers and those living with dementia can thrive."
    },
    academy_hero: {
      badge: "ICA Academy",
      titlePart1: "The Premium Standard in ",
      titleHighlight: "Dementia Care Training",
      titlePart2: "",
      subtitle: "Transactional Dementia Intelligence™ (TDI) certification that reduces caregiver burnout, transforms communication, and elevates your entire care culture."
    },
    leadership_hero: {
      badge: "Our Leadership",
      title: "Guiding the Future of Dementia Care",
      subtitle: "Meet the dedicated professionals leading the International Caregivers Association LLC and driving global change."
    },
    advisory_hero: {
      badge: "Expert Guidance",
      title: "Global Advisory Board",
      subtitle: "A diverse council of medical professionals, researchers, and caregiving experts who ensure the TDI Model remains at the forefront of dementia care."
    },
    consultants_hero: {
      badge: "Certified Consultants",
      title: "Find a TDI™ Certified Consultant",
      subtitle: "Our global network of certified consultants is ready to bring the Transactional Dementia Intelligence™ Model to your organization."
    },
    join_ica_hero: {
      badge: "Membership",
      title: "Join the Global Movement",
      subtitle: "Become part of the fastest-growing association dedicated to elevating dementia care standards worldwide."
    },
    contact_hero: {
      badge: "Get in Touch",
      title: "How Can We Support You?",
      subtitle: "Whether you're looking for training for your staff, need personal caregiving advice, or want to join the association, we're here to help."
    }
  });

  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const sectionsToFetch = ['home_stats', ...SITE_SECTIONS.map(s => s.id)];
        const docs = await Promise.all(
          sectionsToFetch.map(section => getDoc(doc(db, 'site_content', section)))
        );
        
        setContent((prev: any) => {
          const newContent = { ...prev };
          docs.forEach((docSnap, index) => {
            if (docSnap.exists()) {
              newContent[sectionsToFetch[index]] = { ...newContent[sectionsToFetch[index]], ...docSnap.data() };
            }
          });
          return newContent;
        });
      } catch (error) {
        console.error('Error fetching site config:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleChange = (section: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async (section: string) => {
    setSavingSection(section);
    try {
      if (!content[section]) return;
      await setDoc(doc(db, 'site_content', section), content[section], { merge: true });
      alert('Content saved successfully.');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'site_content');
    } finally {
      setSavingSection(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 size={40} className="animate-spin text-brand-deep-teal" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-sage-200">
      <div className="mb-6">
         <h2 className="text-2xl font-bold font-heading text-brand-navy">Site Content Management</h2>
         <p className="text-gray-600 mt-2">Update textual content displayed on various sections of the website. These changes reflect immediately on the specific pages.</p>
      </div>

      <div className="space-y-12">
        {SITE_SECTIONS.map((section) => (
          <section key={section.id} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <h3 className="text-xl font-bold text-gray-900 border-b-2 border-brand-soft-teal pb-1 inline-block">{section.title}</h3>
              <button
                onClick={() => handleSave(section.id)}
                disabled={savingSection === section.id}
                className="px-4 py-2 bg-brand-deep-teal text-white rounded-lg font-medium flex items-center gap-2 hover:bg-brand-deep-teal/90 transition-colors disabled:opacity-50"
              >
                {savingSection === section.id ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save Changes
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
               {section.fields.map((field) => (
                 <div key={field.key}>
                   <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                   {field.type === 'textarea' ? (
                     <textarea
                       value={content[section.id]?.[field.key] || ''}
                       onChange={(e) => handleChange(section.id, field.key, e.target.value)}
                       rows={3}
                       className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal bg-white resize-none"
                     />
                   ) : (
                     <input
                       type="text"
                       value={content[section.id]?.[field.key] || ''}
                       onChange={(e) => handleChange(section.id, field.key, e.target.value)}
                       className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal bg-white"
                     />
                   )}
                 </div>
               ))}
            </div>
          </section>
        ))}

        {/* Stats Section */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 border-b-2 border-brand-soft-teal pb-1 inline-block">Home Page Stats Data</h3>
            <button
              onClick={() => handleSave('home_stats')}
              disabled={savingSection === 'home_stats'}
              className="px-4 py-2 bg-brand-deep-teal text-white rounded-lg font-medium flex items-center gap-2 hover:bg-brand-deep-teal/90 transition-colors disabled:opacity-50"
            >
              {savingSection === 'home_stats' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save Changes
            </button>
          </div>
          <div className="space-y-6">
             {content.home_stats?.stats?.map((stat: any, index: number) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg border border-gray-200">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Value (Number)</label>
                      <input
                        type="number"
                        value={stat.value}
                        onChange={(e) => {
                           const newStats = [...content.home_stats.stats];
                           newStats[index].value = Number(e.target.value);
                           handleChange('home_stats', 'stats', newStats as any);
                        }}
                        className="w-full px-3 py-1.5 border border-brand-sage-200 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Suffix (e.g., +, %)</label>
                      <input
                        type="text"
                        value={stat.suffix}
                        onChange={(e) => {
                           const newStats = [...content.home_stats.stats];
                           newStats[index].suffix = e.target.value;
                           handleChange('home_stats', 'stats', newStats as any);
                        }}
                        className="w-full px-3 py-1.5 border border-brand-sage-200 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                           const newStats = [...content.home_stats.stats];
                           newStats[index].label = e.target.value;
                           handleChange('home_stats', 'stats', newStats as any);
                        }}
                        className="w-full px-3 py-1.5 border border-brand-sage-200 rounded-md text-sm"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={stat.description}
                        onChange={(e) => {
                           const newStats = [...content.home_stats.stats];
                           newStats[index].description = e.target.value;
                           handleChange('home_stats', 'stats', newStats as any);
                        }}
                        className="w-full px-3 py-1.5 border border-brand-sage-200 rounded-md text-sm"
                      />
                    </div>
                </div>
             ))}
          </div>
        </section>
      </div>
    </div>
  );
}

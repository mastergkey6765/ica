import { useState } from 'react';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { Loader2, ArrowLeft, Plus, Trash2, GripVertical } from 'lucide-react';

interface ModuleItem {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz' | 'pdf';
  contentPreview?: string;
  videoUrl?: string;
  pdfUrl?: string;
  textContent?: string;
}

export interface CourseData {
  id?: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  certified: boolean;
  image: string;
  outcomes: string[];
  modules?: ModuleItem[];
  cost?: string;
  highlighted?: boolean;
  tags?: string[];
}

interface CourseEditorProps {
  initialData?: CourseData;
  onClose: () => void;
}

export default function CourseEditor({ initialData, onClose }: CourseEditorProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState(initialData?.category || 'For Professionals');
  const [description, setDescription] = useState(initialData?.description || '');
  const [duration, setDuration] = useState(initialData?.duration || '12 Weeks');
  const [certified, setCertified] = useState(initialData?.certified || false);
  const [image, setImage] = useState(initialData?.image || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop');
  const [cost, setCost] = useState(initialData?.cost || '');
  const [highlighted, setHighlighted] = useState(initialData?.highlighted || false);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  
  const [outcomes, setOutcomes] = useState<string[]>(initialData?.outcomes || ['']);
  const [modules, setModules] = useState<ModuleItem[]>(initialData?.modules || []);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // split by comma
    const val = e.target.value;
    const items = val.split(',').map(t => t.trim()).filter(Boolean);
    setTags(items);
  };

  const handleOutcomeChange = (index: number, value: string) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = value;
    setOutcomes(newOutcomes);
  };

  const addOutcome = () => {
    setOutcomes([...outcomes, '']);
  };

  const removeOutcome = (index: number) => {
    if (outcomes.length <= 1) return;
    setOutcomes(outcomes.filter((_, i) => i !== index));
  };

  const addModule = () => {
    setModules([...modules, { id: Date.now().toString(), title: 'New Module', duration: '15 mins', type: 'video' }]);
  };

  const updateModule = (index: number, key: keyof ModuleItem, value: any) => {
    const newModules = [...modules];
    newModules[index] = { ...newModules[index], [key]: value };
    setModules(newModules);
  };

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please provide title and description.');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = {
        title,
        category,
        description,
        duration,
        certified,
        image,
        cost,
        highlighted,
        tags,
        outcomes: outcomes.filter(o => o.trim() !== ''),
        modules,
        updatedAt: serverTimestamp()
      };

      if (initialData?.id) {
        await updateDoc(doc(db, 'courses', initialData.id), data);
      } else {
        await addDoc(collection(db, 'courses'), {
          ...data,
          createdAt: serverTimestamp()
        });
      }
      onClose();
    } catch (error) {
      handleFirestoreError(error, initialData?.id ? OperationType.UPDATE : OperationType.CREATE, 'courses');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-sage-200">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-brand-deep-teal transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold font-heading text-brand-navy">
            {initialData?.id ? 'Edit Course' : 'Create Course'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal bg-brand-warm-white/50 text-lg font-medium"
              placeholder="Course Title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal"
              placeholder="e.g. For Families"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal"
              placeholder="e.g. 12 Weeks or Self-paced"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Cost / Price</label>
            <input
              type="text"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal"
              placeholder="e.g. $199 or Free"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tags.join(', ')}
              onChange={(e) => {
                const val = e.target.value;
                setTags(val.split(',').map(tag => tag.trim()).filter(t => t.length > 0) || val === '' ? val.split(',').map(tag => tag.trim()) : []);
                // This is a bit simplistic, we can just split and trim
              }}
              onBlur={(e) => {
                  const val = e.target.value;
                  setTags(val.split(',').map(tag => tag.trim()).filter(Boolean));
              }}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal"
              placeholder="e.g. Caregiving, Professional, Certificate"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal resize-none h-32"
              placeholder="Detailed course description..."
              required
            />
          </div>
          
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex items-center gap-3 bg-brand-light-gray p-4 rounded-lg">
               <input 
                 type="checkbox" 
                 id="certifiedToggle"
                 checked={certified}
                 onChange={(e) => setCertified(e.target.checked)}
                 className="w-5 h-5 text-brand-deep-teal rounded focus:ring-brand-deep-teal"
               />
               <label htmlFor="certifiedToggle" className="font-semibold text-brand-navy">
                 Official Certification program
               </label>
            </div>
            
            <div className="flex-1 flex items-center gap-3 bg-brand-light-gray p-4 rounded-lg">
               <input 
                 type="checkbox" 
                 id="highlightedToggle"
                 checked={highlighted}
                 onChange={(e) => setHighlighted(e.target.checked)}
                 className="w-5 h-5 text-brand-deep-teal rounded focus:ring-brand-deep-teal"
               />
               <label htmlFor="highlightedToggle" className="font-semibold text-brand-navy">
                 Highlight/Feature this course
               </label>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Learning Outcomes</h3>
            <button 
              type="button" 
              onClick={addOutcome}
              className="text-brand-deep-teal text-sm font-semibold flex items-center gap-1 hover:text-brand-navy"
            >
              <Plus size={16} /> Add Outcome
            </button>
          </div>
          <div className="space-y-3">
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={outcome}
                  onChange={(e) => handleOutcomeChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal"
                  placeholder="e.g. Mastery of TDI Framework"
                />
                <button
                  type="button"
                  onClick={() => removeOutcome(index)}
                  className="p-2 text-red-400 hover:text-red-600 transition-colors disabled:opacity-30"
                  disabled={outcomes.length <= 1}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Course Content (Modules)</h3>
            <button 
              type="button" 
              onClick={addModule}
              className="text-brand-deep-teal text-sm font-semibold flex items-center gap-1 hover:text-brand-navy"
            >
              <Plus size={16} /> Add Module
            </button>
          </div>
          <div className="space-y-4">
            {modules.length === 0 && (
               <p className="text-sm text-gray-500 italic">No modules added yet. Add modules to show in the course player.</p>
            )}
            {modules.map((mod, index) => (
              <div key={mod.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col gap-3 relative group">
                <div className="flex items-start gap-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Module Title</label>
                      <input
                        type="text"
                        value={mod.title}
                        onChange={(e) => updateModule(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Duration</label>
                      <input
                        type="text"
                        value={mod.duration}
                        onChange={(e) => updateModule(index, 'duration', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Content Type</label>
                      <select
                        value={mod.type}
                        onChange={(e) => updateModule(index, 'type', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal bg-white"
                      >
                        <option value="video">Video</option>
                        <option value="text">Text Article</option>
                        <option value="quiz">Quiz</option>
                        <option value="pdf">PDF Document</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeModule(index)}
                    className="p-2 text-red-400 hover:text-red-600 bg-white rounded-lg border border-gray-200 shadow-sm shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Dynamic Content Fields Based on Type */}
                <div className="w-full pt-2 border-t border-gray-200 mt-2">
                  {mod.type === 'video' && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Video URL (YouTube/Vimeo/MP4)</label>
                      <input
                        type="text"
                        value={mod.videoUrl || ''}
                        onChange={(e) => updateModule(index, 'videoUrl', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal"
                        placeholder="https://..."
                      />
                    </div>
                  )}
                  {mod.type === 'pdf' && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">PDF File URL</label>
                      <input
                        type="text"
                        value={mod.pdfUrl || ''}
                        onChange={(e) => updateModule(index, 'pdfUrl', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal"
                        placeholder="https://..."
                      />
                    </div>
                  )}
                  {mod.type === 'text' && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Text Content</label>
                      <textarea
                        value={mod.textContent || ''}
                        onChange={(e) => updateModule(index, 'textContent', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal resize-y h-24"
                        placeholder="Type or paste the article content here..."
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-brand-deep-teal hover:bg-brand-deep-teal/90 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : null}
            Save Course
          </button>
        </div>
      </form>
    </div>
  );
}

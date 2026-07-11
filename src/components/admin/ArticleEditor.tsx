import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { Loader2, ArrowLeft, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface ArticleItem {
  id?: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'scheduled';
  scheduledFor?: number | null;
}

interface ArticleEditorProps {
  initialData?: ArticleItem;
  onClose: () => void;
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

export default function ArticleEditor({ initialData, onClose }: ArticleEditorProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>(initialData?.status || 'draft');
  const [scheduledForDate, setScheduledForDate] = useState<string>(
    initialData?.scheduledFor ? format(new Date(initialData.scheduledFor), "yyyy-MM-dd'T'HH:mm") : ''
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (saveStatus: 'draft' | 'published' | 'scheduled') => {
    if (!title.trim() || !content.trim()) {
      alert('Please provide both title and content.');
      return;
    }

    if (saveStatus === 'scheduled' && !scheduledForDate) {
      alert('Please provide a scheduled date.');
      setStatus('scheduled');
      return;
    }

    setIsSubmitting(true);
    try {
      const scheduledTimestamp = saveStatus === 'scheduled' && scheduledForDate
        ? new Date(scheduledForDate).getTime()
        : null;

      const data = {
        title,
        content,
        status: saveStatus,
        scheduledFor: scheduledTimestamp,
        updatedAt: serverTimestamp()
      };

      if (initialData?.id) {
        await updateDoc(doc(db, 'articles', initialData.id), data);
      } else {
        await addDoc(collection(db, 'articles'), {
          ...data,
          createdAt: serverTimestamp()
        });
      }
      onClose();
    } catch (error) {
      handleFirestoreError(error, initialData?.id ? OperationType.UPDATE : OperationType.CREATE, 'articles');
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
            {initialData?.id ? 'Edit Article' : 'Create Article'}
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal bg-brand-warm-white/50 text-xl font-medium"
            placeholder="Article Title"
            required
          />
        </div>

        <div>
           <label className="block text-sm font-semibold text-gray-700 mb-1">Content</label>
           <div className="bg-white rounded-lg">
             <ReactQuill 
               theme="snow" 
               value={content} 
               onChange={setContent} 
               modules={modules}
               formats={formats}
               className="h-64 mb-16"
             />
           </div>
        </div>

        {status === 'scheduled' && (
          <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
             <Calendar className="text-brand-muted-sage" size={20} />
             <div>
               <label className="block text-xs font-semibold text-gray-700 mb-1">Publish Date & Time</label>
               <input
                 type="datetime-local"
                 value={scheduledForDate}
                 onChange={(e) => {
                   setScheduledForDate(e.target.value);
                   setStatus('scheduled');
                 }}
                 className="px-3 py-2 border border-brand-sage-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-deep-teal text-sm"
               />
             </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100 justify-end">
          <button
            onClick={() => handleSave('draft')}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-semibold transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => {
              if (status !== 'scheduled' && !scheduledForDate) {
                 setStatus('scheduled');
              } else {
                 handleSave('scheduled');
              }
            }}
            disabled={isSubmitting}
            className="px-6 py-2 border-2 border-brand-blue rounded-lg text-brand-navy hover:bg-brand-blue/10 font-semibold transition-colors disabled:opacity-50"
          >
            Schedule
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={isSubmitting}
            className="px-6 py-2 bg-brand-deep-teal hover:bg-brand-deep-teal/90 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : null}
            Publish Now
          </button>
        </div>
      </div>
    </div>
  );
}

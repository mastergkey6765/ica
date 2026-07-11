import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { Loader2, ArrowLeft } from 'lucide-react';

interface PageItem {
  id?: string;
  title: string;
  slug: string;
  content: string;
}

interface PageEditorProps {
  initialData?: PageItem;
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

export default function PageEditor({ initialData, onClose }: PageEditorProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (!initialData?.id) {
      setSlug(generateSlug(e.target.value));
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim() || !content.trim()) {
      alert('Please provide title, slug, and content.');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = {
        title,
        slug,
        content,
        updatedAt: serverTimestamp()
      };

      if (initialData?.id) {
        await updateDoc(doc(db, 'pages', initialData.id), data);
      } else {
        await addDoc(collection(db, 'pages'), {
          ...data,
          createdAt: serverTimestamp()
        });
      }
      onClose();
    } catch (error) {
      handleFirestoreError(error, initialData?.id ? OperationType.UPDATE : OperationType.CREATE, 'pages');
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
            {initialData?.id ? 'Edit Page' : 'Create Page'}
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Page Title</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal bg-brand-warm-white/50 text-xl font-medium"
              placeholder="E.g., About Us"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">URL Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal bg-gray-50 font-mono text-sm"
              placeholder="e.g., about-us"
              required
            />
          </div>
        </div>

        <div>
           <label className="block text-sm font-semibold text-gray-700 mb-1">Page Content</label>
           <div className="bg-white rounded-lg">
             <ReactQuill 
               theme="snow" 
               value={content} 
               onChange={setContent} 
               modules={modules}
               formats={formats}
               className="h-[400px] mb-16"
             />
           </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-6 py-2 bg-brand-deep-teal hover:bg-brand-deep-teal/90 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : null}
            {initialData?.id ? 'Update Page' : 'Publish Page'}
          </button>
        </div>
      </div>
    </div>
  );
}

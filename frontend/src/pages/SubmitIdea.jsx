import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Rocket, Bold, Italic, List, Link as LinkIcon, Image as ImageIcon, ChevronDown, Upload, X, CheckCircle } from 'lucide-react';
import { IdeasContext } from '../context/IdeasContext';
import { AuthContext } from '../context/AuthContext';

const CATEGORIES = ['AI', 'SaaS', 'FinTech', 'EdTech', 'HealthTech', 'Sustainability', 'Web3'];
const PRICE_OPTIONS = ['cheap', 'expensive'];

export default function SubmitIdea() {
  const { addIdea } = useContext(IdeasContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('cheap');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [published, setPublished] = useState(false);
  const [errors, setErrors] = useState({});

  // ---- Formatting helpers ----
  const descRef = useRef(null);
  const applyFormat = (tag) => {
    const el = descRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = description.slice(start, end);

    let insert = '';
    if (tag === 'bold') insert = `**${selected || 'bold text'}**`;
    else if (tag === 'italic') insert = `_${selected || 'italic text'}_`;
    else if (tag === 'list') insert = `\n• ${selected || 'list item'}`;
    else if (tag === 'link') insert = `[${selected || 'link text'}](https://)`;
    else if (tag === 'heading') insert = `\n## ${selected || 'Heading'}`;

    const newVal = description.slice(0, start) + insert + description.slice(end);
    setDescription(newVal);
    setTimeout(() => {
      el.selectionStart = el.selectionEnd = start + insert.length;
      el.focus();
    }, 0);
  };

  // ---- Thumbnail upload ----
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  // ---- Publish ----
  const handlePublish = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    const categoryTag = category ? category.toUpperCase().replace(/\s/g, '') : 'GENERAL';

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('summary', summary.trim() || description.trim().slice(0, 120));
    formData.append('price', price);
    formData.append('tags', JSON.stringify([categoryTag]));
    formData.append('category', categoryTag);

    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {
      await addIdea(formData);
      setPublished(true);
      setTimeout(() => navigate('/discover'), 2000);
    } catch (err) {
      setErrors({ description: 'Failed to publish idea. Please try again.' });
    }
  };

  if (published) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">Spark Published! 🎉</h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Redirecting you to the Discover page...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 shadow-sm transition-colors">
        <Zap className="w-4 h-4" /> Draft auto-saved
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-center text-gray-900 dark:text-white">
        Ignite a New Idea
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-lg mb-12">
        Fill in the details below to share your spark with the community and start validating your vision.
      </p>

      <form onSubmit={handlePublish} className="w-full bg-white/90 dark:bg-[#0f172a]/80 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl transition-colors">
        {/* Title + Category */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Idea Title *</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              type="text"
              placeholder="e.g. Neural-Recruiter"
              className={`w-full bg-gray-50 dark:bg-[#020617] border rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all font-medium ${errors.title ? 'border-red-400' : 'border-gray-200 dark:border-white/10'}`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Category</label>
            <div className="relative">
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all cursor-pointer font-medium"
              >
                <option value="">Select Category</option>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Short Summary */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Short Summary</label>
          <input
            value={summary}
            onChange={e => setSummary(e.target.value)}
            type="text"
            maxLength={120}
            placeholder="A brief one-sentence hook for your idea..."
            className="w-full bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all mb-1.5 font-medium"
          />
          <p className="text-xs text-gray-500">{summary.length}/120 characters</p>
        </div>

        {/* Price */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Pricing Tier</label>
          <div className="flex gap-4">
            {PRICE_OPTIONS.map(p => (
              <button
                type="button"
                key={p}
                onClick={() => setPrice(p)}
                className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold capitalize transition-all
                  ${price === p ? 'bg-purple-500 border-purple-500 text-white shadow-lg' : 'bg-gray-50 dark:bg-[#020617] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-purple-400'}`}
              >
                {p === 'cheap' ? '💚 Cheap / Free' : '💎 Premium / Expensive'}
              </button>
            ))}
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">Thumbnail / Logo</label>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

          {thumbnailPreview ? (
            <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 group w-48 h-32">
              <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => { setThumbnail(null); setThumbnailPreview(null); }}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-gray-300 dark:border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-purple-500/50 hover:bg-gray-50 dark:hover:bg-white/5 transition-all cursor-pointer"
            >
              <div className="bg-gray-100 dark:bg-white/5 p-3 rounded-full mb-4">
                <Upload className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Click to upload from device</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, or SVG (Max 2MB)</p>
            </div>
          )}
        </div>

        {/* Full Description */}
        <div className="mb-10">
          <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Full Description *</label>
          <div className={`bg-gray-50 dark:bg-[#020617] border rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-purple-500/50 transition-all ${errors.description ? 'border-red-400' : 'border-gray-200 dark:border-white/10'}`}>
            {/* Formatting Toolbar */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#0f172a] border-b border-gray-200 dark:border-white/10 px-3 py-2 flex-wrap">
              <button type="button" onClick={() => applyFormat('bold')} title="Bold" className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors font-bold text-sm">B</button>
              <button type="button" onClick={() => applyFormat('italic')} title="Italic" className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors italic text-sm">I</button>
              <button type="button" onClick={() => applyFormat('heading')} title="Heading" className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-xs font-bold">H2</button>
              <div className="w-px h-5 bg-gray-300 dark:bg-white/20 mx-1" />
              <button type="button" onClick={() => applyFormat('list')} title="Bullet List" className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                <List className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => applyFormat('link')} title="Link" className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                <LinkIcon className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => fileInputRef.current?.click()} title="Insert Image" className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                <ImageIcon className="w-4 h-4" />
              </button>
              <div className="ml-auto text-xs text-gray-400 font-medium pr-1">{description.length} chars</div>
            </div>
            <textarea
              ref={descRef}
              rows={8}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the problem, your solution, and who this is for..."
              className="w-full bg-transparent p-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none resize-none font-medium font-mono text-sm"
            />
          </div>
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div className="flex items-center justify-end gap-6 pt-4 border-t border-gray-100 dark:border-white/5">
          <button type="button" className="text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            Save as Draft
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] text-white text-sm font-semibold px-8 py-3 rounded-full flex items-center gap-2 transition-all hover:scale-105"
          >
            Publish Spark <Rocket className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

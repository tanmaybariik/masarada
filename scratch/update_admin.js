const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/admin/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add ImageUploader import
if (!content.includes('import ImageUploader')) {
    content = content.replace(
        'import { DEFAULT_GALLERY_PHOTOS, GalleryPhoto, getStoredGallery, saveStoredGallery } from "@/lib/galleryStore";',
        'import { DEFAULT_GALLERY_PHOTOS, GalleryPhoto, getStoredGallery, saveStoredGallery } from "@/lib/galleryStore";\nimport ImageUploader from "@/components/admin/ImageUploader";'
    );
}

// 2. Add 'slider' to activeTab state
content = content.replace(
    'const [activeTab, setActiveTab] = useState<"analytics" | "revenue" | "products" | "events" | "staff" | "videos" | "library" | "gallery" | "orders" | "users" | "settings">("analytics");',
    'const [activeTab, setActiveTab] = useState<"analytics" | "slider" | "revenue" | "products" | "events" | "staff" | "videos" | "library" | "gallery" | "orders" | "users" | "settings">("analytics");'
);

// 3. Add slider state and methods
const sliderState = `  // Slider State
  const [slides, setSlides] = useState<any[]>([]);
  const [slidesLoading, setSlidesLoading] = useState(false);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [slideForm, setSlideForm] = useState({
    title: "",
    subtitle: "",
    image: "",
    order: 0,
    isActive: true
  });

  const loadSlides = async () => {
    setSlidesLoading(true);
    try {
      const res = await fetch("/api/admin/hero-slides");
      const data = await res.json();
      if (data.success) setSlides(data.slides);
    } catch (error) {}
    setSlidesLoading(false);
  };

  useEffect(() => {
    if (isAuthorizedAdmin && activeTab === "slider" && slides.length === 0) {
      loadSlides();
    }
  }, [isAuthorizedAdmin, activeTab]);

  const handleOpenAddSlide = () => {
    setEditingSlideId(null);
    setSlideForm({ title: "", subtitle: "", image: "", order: slides.length, isActive: true });
    setIsSlideModalOpen(true);
  };

  const handleOpenEditSlide = (slide: any) => {
    setEditingSlideId(slide.id);
    setSlideForm({
      title: slide.title,
      subtitle: slide.subtitle,
      image: slide.image,
      order: slide.order,
      isActive: slide.isActive
    });
    setIsSlideModalOpen(true);
  };

  const handleDeleteSlide = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;
    try {
      const res = await fetch(\`/api/admin/hero-slides?id=\${id}\`, { method: "DELETE" });
      if (res.ok) {
        setSlides(slides.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingSlideId ? "PUT" : "POST";
      const body = JSON.stringify(editingSlideId ? { id: editingSlideId, ...slideForm } : slideForm);
      const res = await fetch("/api/admin/hero-slides", {
        method,
        headers: { "Content-Type": "application/json" },
        body
      });
      if (res.ok) {
        setIsSlideModalOpen(false);
        loadSlides();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Product Modal State`;

content = content.replace('  // Product Modal State', sliderState);

// 4. Add slider to navigation pills
const navPills = `        {[
          { id: "analytics", label: "Analytics", icon: TrendingUp },
          { id: "slider", label: "Home Slider", icon: Sparkles },`;

content = content.replace('        {[\n          { id: "analytics", label: "Analytics", icon: TrendingUp },', navPills);

// 5. Add slider tab content
const sliderTab = `      {/* ========================================================= */}
      {/* TAB 1.5: SLIDER */}
      {/* ========================================================= */}
      {activeTab === "slider" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-sm text-foreground">Home Page Slider</h2>
              <p className="text-[11px] text-foreground/60">Manage images shown on the landing page</p>
            </div>
            <button
              onClick={handleOpenAddSlide}
              className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-primary/90 transition-all"
            >
              <Plus size={15} />
              <span>Add Slide</span>
            </button>
          </div>

          {slidesLoading ? (
            <div className="py-8 flex justify-center items-center">
              <Loader2 size={24} className="animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-2.5">
              {slides.map(slide => (
                <div key={slide.id} className="bg-white p-3.5 rounded-2xl border border-secondary/20 shadow-sm flex items-center gap-3">
                  <div className="w-24 h-16 rounded-xl overflow-hidden relative border border-secondary/20 flex-shrink-0">
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-foreground truncate block">{slide.title || "Untitled Slide"}</span>
                    <span className="text-[11px] text-foreground/60 truncate block">{slide.subtitle}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={\`text-[9px] font-bold px-1.5 rounded \${slide.isActive ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}\`}>
                        {slide.isActive ? "Active" : "Hidden"}
                      </span>
                      <span className="text-[9px] bg-secondary/10 text-foreground/60 px-1.5 rounded">
                        Order: {slide.order}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleOpenEditSlide(slide)}
                      className="p-1.5 bg-secondary/10 hover:bg-secondary/20 text-foreground/70 rounded-lg transition-colors"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteSlide(slide.id)}
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: REVENUE, SALES & ACCOUNTING */}`;

content = content.replace('      {/* ========================================================= */}\n      {/* TAB 2: REVENUE, SALES & ACCOUNTING */}', sliderTab);

// 6. Add Slider Modal
const sliderModal = `      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT SLIDE */}
      {/* ========================================================= */}
      {isSlideModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background max-w-sm w-full rounded-3xl p-5 border border-secondary/30 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-secondary/20 pb-3">
              <h3 className="font-extrabold text-sm text-foreground">
                {editingSlideId ? "Edit Slide" : "Add New Slide"}
              </h3>
              <button onClick={() => setIsSlideModalOpen(false)} className="p-1 text-foreground/60 hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-foreground/80 block mb-1">Main Title</label>
                <input
                  type="text"
                  required
                  value={slideForm.title}
                  onChange={e => setSlideForm({ ...slideForm, title: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground/80 block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={slideForm.subtitle}
                  onChange={e => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                  className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <ImageUploader 
                label="Slide Image" 
                value={slideForm.image} 
                onChange={(val) => setSlideForm({ ...slideForm, image: val })} 
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Display Order</label>
                  <input
                    type="number"
                    value={slideForm.order}
                    onChange={e => setSlideForm({ ...slideForm, order: Number(e.target.value) })}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-foreground/80 block mb-1">Visibility</label>
                  <select
                    value={slideForm.isActive ? "true" : "false"}
                    onChange={e => setSlideForm({ ...slideForm, isActive: e.target.value === "true" })}
                    className="w-full bg-white border border-secondary/20 rounded-xl p-2.5 focus:outline-none focus:border-primary font-bold"
                  >
                    <option value="true">Visible</option>
                    <option value="false">Hidden</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-2xl font-bold shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Save size={15} />
                <span>Save Slide</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT LIBRARY ARTICLE (TEXT & IMAGE) */}`;

content = content.replace('      {/* ========================================================= */}\n      {/* MODAL: ADD / EDIT LIBRARY ARTICLE (TEXT & IMAGE) */}', sliderModal);

// 7. Replace inputs with ImageUploader
content = content.replace(
    /<div>\s*<label className="font-bold text-foreground\/80 block mb-1">Cover Image Path \/ Asset<\/label>\s*<input[^>]+value=\{articleForm\.image\}[^>]+onChange=\{e => setArticleForm\(\{ \.\.\.articleForm, image: e\.target\.value \}\)\}[^>]+\/>\s*<\/div>/g,
    '<ImageUploader label="Cover Image Path / Asset" value={articleForm.image} onChange={(val) => setArticleForm({ ...articleForm, image: val })} />'
);

content = content.replace(
    /<div>\s*<label className="font-bold text-foreground\/80 block mb-1">Image URL \/ File Path<\/label>\s*<input[^>]+value=\{galleryForm\.url\}[^>]+onChange=\{e => setGalleryForm\(\{ \.\.\.galleryForm, url: e\.target\.value \}\)\}[^>]+\/>\s*<\/div>/g,
    '<ImageUploader label="Image URL / File Path" value={galleryForm.url} onChange={(val) => setGalleryForm({ ...galleryForm, url: val })} />'
);

content = content.replace(
    /<div>\s*<label className="font-bold text-foreground\/80 block mb-1">Image Asset Path \/ URL<\/label>\s*<input[^>]+value=\{productForm\.image\}[^>]+onChange=\{e => setProductForm\(\{ \.\.\.productForm, image: e\.target\.value \}\)\}[^>]+\/>\s*<\/div>/g,
    '<ImageUploader label="Image Asset Path / URL" value={productForm.image} onChange={(val) => setProductForm({ ...productForm, image: val })} />'
);

// And add image uploader to events too (before Venue)
const eventVenue = `              <div>
                <label className="font-bold text-foreground/80 block mb-1">Venue / Location</label>`;
const eventImage = `              <ImageUploader label="Event Image" value={eventForm.image} onChange={(val) => setEventForm({ ...eventForm, image: val })} />

              <div>
                <label className="font-bold text-foreground/80 block mb-1">Venue / Location</label>`;
content = content.replace(eventVenue, eventImage);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Admin page updated successfully");

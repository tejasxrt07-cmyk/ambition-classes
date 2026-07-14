import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  useGetAdminSession, 
  useAdminLogout, 
  useListNotes, 
  useCreateNote, 
  useUpdateNote, 
  useDeleteNote,
  useRequestUploadUrl,
  getListNotesQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Note, NoteClass, NoteSubject } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { 
  LogOut, Plus, FileText, Trash2, Edit2, ShieldCheck, 
  X, Upload, Loader2, Search, FileUp, AlertTriangle
} from "lucide-react";
import { format } from "date-fns";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    class: NoteClass;
    subject: NoteSubject;
    pdfObjectPath: string | null;
  }>({
    title: "",
    class: NoteClass.NUMBER_10,
    subject: NoteSubject.Mathematics,
    pdfObjectPath: null
  });

  // Queries
  const { data: session, isLoading: sessionLoading } = useGetAdminSession();
  const { data: notes, isLoading: notesLoading } = useListNotes();
  const requestUploadUrl = useRequestUploadUrl();

  // Mutations
  const logout = useAdminLogout({
    mutation: {
      onSuccess: () => {
        queryClient.clear();
        setLocation("/admin/login");
      }
    }
  });

  const createNote = useCreateNote({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListNotesQueryKey() });
        setIsFormOpen(false);
        resetForm();
        toast({ title: "Success", description: "Note created successfully." });
      },
      onError: (err) => {
        toast({ title: "Error", description: err.data?.error || "Failed to create note.", variant: "destructive" });
      }
    }
  });

  const updateNote = useUpdateNote({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListNotesQueryKey() });
        setIsFormOpen(false);
        resetForm();
        toast({ title: "Success", description: "Note updated successfully." });
      },
      onError: (err) => {
        toast({ title: "Error", description: err.data?.error || "Failed to update note.", variant: "destructive" });
      }
    }
  });

  const deleteNote = useDeleteNote({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListNotesQueryKey() });
        setDeleteConfirmId(null);
        toast({ title: "Success", description: "Note deleted successfully." });
      },
      onError: (err) => {
        toast({ title: "Error", description: err.data?.error || "Failed to delete note.", variant: "destructive" });
        setDeleteConfirmId(null);
      }
    }
  });

  // Handlers
  const handleLogout = () => logout.mutate();
  
  const resetForm = () => {
    setFormData({
      title: "",
      class: NoteClass.NUMBER_10,
      subject: NoteSubject.Mathematics,
      pdfObjectPath: null
    });
    setEditingNote(null);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      class: note.class,
      subject: note.subject,
      pdfObjectPath: note.pdfObjectPath
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingNote) {
      updateNote.mutate({ 
        id: editingNote.id, 
        data: formData 
      });
    } else {
      createNote.mutate({ data: formData });
    }
  };

  const handlePdfSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setIsUploading(true);
    try {
      const { uploadURL, objectPath } = await requestUploadUrl.mutateAsync({
        data: { name: file.name, size: file.size, contentType: file.type },
      });

      const putRes = await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!putRes.ok) throw new Error("Upload failed");

      setFormData((prev) => ({ ...prev, pdfObjectPath: objectPath }));
      toast({ title: "Success", description: "PDF uploaded successfully." });
    } catch (err) {
      toast({ title: "Error", description: "Upload failed. Please try again.", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  // Auth Guard
  useEffect(() => {
    if (!sessionLoading && !session?.authenticated) {
      setLocation("/admin/login");
    }
  }, [sessionLoading, session, setLocation]);

  if (sessionLoading || !session?.authenticated) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const filteredNotes = notes?.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase())) || [];

  return (
    <div className="min-h-screen bg-[#050505] text-foreground font-sans">
      {/* Top Navbar */}
      <header className="h-16 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-white tracking-tight">Admin Dashboard</span>
        </div>
        
        <button 
          onClick={handleLogout}
          className="text-sm font-medium text-white/60 hover:text-white flex items-center gap-2 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Study Notes</h1>
            <p className="text-white/50 text-sm">Manage class materials and PDFs.</p>
          </div>
          
          <button
            onClick={() => { resetForm(); setIsFormOpen(true); }}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-emerald-400 glow-emerald-hover transition-all"
          >
            <Plus className="w-5 h-5" />
            Add New Note
          </button>
        </div>

        {/* Content Area */}
        <div className="glass rounded-2xl border-white/5 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-xs uppercase tracking-wider text-white/50">
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium">Class & Subject</th>
                  <th className="px-6 py-4 font-medium">File</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {notesLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/50">
                      <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
                      Loading notes...
                    </td>
                  </tr>
                ) : filteredNotes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/50">
                      <FileText className="w-8 h-8 text-white/20 mx-auto mb-2" />
                      No notes found. Create one to get started.
                    </td>
                  </tr>
                ) : (
                  filteredNotes.map((note) => (
                    <tr key={note.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-medium text-white">{note.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <span className="px-2 py-0.5 rounded bg-white/5 text-xs text-white/70 border border-white/10">
                            Class {note.class}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-primary/10 text-xs text-primary border border-primary/20">
                            {note.subject}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {note.pdfObjectPath ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
                            <FileUp className="w-3.5 h-3.5" />
                            PDF Uploaded
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs text-white/40 bg-white/5 px-2 py-1 rounded border border-white/5">
                            Coming Soon
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-white/50">
                          {format(new Date(note.uploadDate), 'MMM d, yyyy')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(note)}
                            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(note.id)}
                            className="p-2 text-destructive/80 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Form Dialog/Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
          <div className="glass w-full max-w-lg rounded-3xl border-primary/20 relative z-10 animate-in zoom-in-95 duration-200 shadow-2xl flex flex-col max-h-full">
            
            <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
              <h2 className="text-xl font-bold text-white">
                {editingNote ? "Edit Note" : "Create New Note"}
              </h2>
              <button onClick={() => setIsFormOpen(false)} className="p-2 text-white/50 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="note-form" onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="e.g. Quadratic Equations - Chapter 4"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Class</label>
                    <select
                      value={formData.class}
                      onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value as NoteClass }))}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-colors"
                    >
                      <option value={NoteClass.NUMBER_8}>Class 8</option>
                      <option value={NoteClass.NUMBER_9}>Class 9</option>
                      <option value={NoteClass.NUMBER_10}>Class 10</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value as NoteSubject }))}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-colors"
                    >
                      {Object.values(NoteSubject).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">PDF Attachment</label>
                  <div className="border border-white/10 rounded-xl p-4 bg-black/30">
                    {formData.pdfObjectPath ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileUp className="w-8 h-8 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-white">Document Attached</p>
                            <p className="text-xs text-white/50 font-mono truncate max-w-[200px]">{formData.pdfObjectPath}</p>
                          </div>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => setFormData(prev => ({ ...prev, pdfObjectPath: null }))}
                          className="text-xs text-destructive hover:text-destructive/80 px-2 py-1 rounded bg-destructive/10"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <label
                          htmlFor="pdf-upload-input"
                          className={cn(
                            "w-full py-8 rounded-lg border border-dashed border-white/20 hover:border-primary hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-2 text-white/50 hover:text-primary cursor-pointer",
                            isUploading && "pointer-events-none opacity-60",
                          )}
                        >
                          {isUploading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                          ) : (
                            <Upload className="w-6 h-6" />
                          )}
                          <span className="text-sm font-medium">
                            {isUploading ? "Uploading..." : "Click to upload PDF"}
                          </span>
                        </label>
                        <input
                          id="pdf-upload-input"
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          disabled={isUploading}
                          onChange={handlePdfSelected}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-white/10 flex items-center justify-end gap-3 shrink-0 bg-black/20">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-5 py-2.5 rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                form="note-form"
                type="submit"
                disabled={createNote.isPending || updateNote.isPending || !formData.title.trim()}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-emerald-400 glow-emerald-hover transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {(createNote.isPending || updateNote.isPending) && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingNote ? "Save Changes" : "Create Note"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setDeleteConfirmId(null)} />
          <div className="glass w-full max-w-sm rounded-3xl border-destructive/20 relative z-10 animate-in zoom-in-95 duration-200 p-8 text-center">
            
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-2">Delete Note?</h2>
            <p className="text-white/60 mb-8 text-sm">
              This action cannot be undone. This will permanently remove the note and its PDF attachment.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-3 rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors border border-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteNote.mutate({ id: deleteConfirmId })}
                disabled={deleteNote.isPending}
                className="flex-1 py-3 rounded-xl bg-destructive text-destructive-foreground font-semibold hover:bg-red-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {deleteNote.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
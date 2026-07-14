import { PublicLayout } from "@/components/public-layout";
import { useListNotes } from "@workspace/api-client-react";
import { FileText, Download, Calendar, Filter, Loader2, BookX } from "lucide-react";
import { useState } from "react";
import { NoteClass, NoteSubject } from "@workspace/api-client-react";
import { format } from "date-fns";

export default function Notes() {
  const [selectedClass, setSelectedClass] = useState<string>("ALL");
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");

  const { data: notes, isLoading } = useListNotes({
    class: selectedClass !== "ALL" ? selectedClass as NoteClass : undefined,
    subject: selectedSubject !== "ALL" ? selectedSubject as NoteSubject : undefined,
  });

  const getDownloadUrl = (path: string) => {
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
    const pathWithoutObjects = path.replace(/^\/objects\//, '');
    return `${basePath}/api/storage/objects/${pathWithoutObjects}`;
  };

  const classes = ["ALL", NoteClass.NUMBER_8, NoteClass.NUMBER_9, NoteClass.NUMBER_10];
  const subjects = ["ALL", ...Object.values(NoteSubject)];

  return (
    <PublicLayout>
      <div className="bg-black/50 py-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-1/3 h-full bg-primary/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Study Notes</h1>
          <p className="text-lg text-primary font-medium">Access study materials and resources.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="glass p-4 rounded-2xl mb-12 flex flex-col sm:flex-row items-center gap-4 max-w-3xl border-primary/20">
          <div className="flex items-center gap-2 text-white/70 px-2 shrink-0">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters:</span>
          </div>
          
          <div className="flex-1 w-full sm:w-auto">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-colors"
            >
              {classes.map(c => (
                <option key={c} value={c}>
                  {c === "ALL" ? "All Classes" : `Class ${c}`}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 w-full sm:w-auto">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-colors"
            >
              {subjects.map(s => (
                <option key={s} value={s}>
                  {s === "ALL" ? "All Subjects" : s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-white/50">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p>Loading study materials...</p>
          </div>
        ) : !notes || notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-white/50 glass rounded-3xl border-dashed">
            <BookX className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-xl font-medium text-white mb-2">No notes found</p>
            <p>Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note, idx) => (
              <div 
                key={note.id} 
                className="glass rounded-2xl p-6 border-white/5 hover:border-primary/30 transition-all duration-300 group flex flex-col h-full animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-white/70">
                      Class {note.class}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                      {note.subject}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{note.title}</h3>
                
                <div className="flex items-center gap-2 text-sm text-white/50 mb-8 mt-auto">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={note.uploadDate}>
                    {format(new Date(note.uploadDate), 'MMM d, yyyy')}
                  </time>
                </div>

                {note.pdfObjectPath ? (
                  <a
                    href={getDownloadUrl(note.pdfObjectPath)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 text-white font-medium hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2 border border-white/10 hover:border-primary"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full px-4 py-3 rounded-xl bg-white/5 text-white/40 font-medium cursor-not-allowed flex items-center justify-center gap-2 border border-white/5"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
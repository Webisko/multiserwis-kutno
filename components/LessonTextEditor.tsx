import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import { 
  Bold, Italic, List, ListOrdered, Quote, Code, Trash2,
  Link as LinkIcon, Image as ImageIcon, Table as TableIcon,
  AlertCircle, CheckCircle, Info
} from 'lucide-react';

interface LessonTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const LessonTextEditor: React.FC<LessonTextEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content,
    autofocus: 'end',
    editable: true,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addAlert = (type: 'warning' | 'success' | 'info') => {
    const colors = {
      warning: 'bg-red-50 border-red-500 text-red-700',
      success: 'bg-green-50 border-green-500 text-green-700',
      info: 'bg-blue-50 border-blue-500 text-blue-700',
    };
    const icons = {
      warning: '⛔',
      success: '✅',
      info: '💡',
    };

    const html = `
      <div class="my-4 p-4 rounded border-l-4 ${colors[type]}">
        <span class="font-bold">${icons[type]} Wyróżniony tekst</span>
        <p>Edytuj ten tekst...</p>
      </div>
    `;
    editor.chain().focus().insertContent(html).run();
  };

  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const toggleLink = () => {
    const url = window.prompt('Wpisz URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  return (
    <div className="w-full border border-slate-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b border-slate-200 bg-slate-50 p-4 space-y-3">
        {/* Row 1: Text formatting */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleBold().run();
            }}
            className={`p-2 rounded transition-colors ${
              editor.isActive('bold')
                ? 'bg-brand-accent text-white'
                : 'bg-white border border-slate-300 hover:bg-slate-100'
            }`}
            title="Pogrubienie (Ctrl+B)"
          >
            <Bold size={18} />
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleItalic().run();
            }}
            className={`p-2 rounded transition-colors ${
              editor.isActive('italic')
                ? 'bg-brand-accent text-white'
                : 'bg-white border border-slate-300 hover:bg-slate-100'
            }`}
            title="Kursywa (Ctrl+I)"
          >
            <Italic size={18} />
          </button>

          <div className="w-px h-6 bg-slate-300"></div>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            className={`px-3 py-2 rounded text-sm font-bold transition-colors ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-brand-accent text-white'
                : 'bg-white border border-slate-300 hover:bg-slate-100'
            }`}
            title="Nagłówek 2"
          >
            H2
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            className={`px-3 py-2 rounded text-sm font-bold transition-colors ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-brand-accent text-white'
                : 'bg-white border border-slate-300 hover:bg-slate-100'
            }`}
            title="Nagłówek 3"
          >
            H3
          </button>

          <div className="w-px h-6 bg-slate-300"></div>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleBulletList().run();
            }}
            className={`p-2 rounded transition-colors ${
              editor.isActive('bulletList')
                ? 'bg-brand-accent text-white'
                : 'bg-white border border-slate-300 hover:bg-slate-100'
            }`}
            title="Lista punktowa"
          >
            <List size={18} />
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleOrderedList().run();
            }}
            className={`p-2 rounded transition-colors ${
              editor.isActive('orderedList')
                ? 'bg-brand-accent text-white'
                : 'bg-white border border-slate-300 hover:bg-slate-100'
            }`}
            title="Lista numerowana"
          >
            <ListOrdered size={18} />
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleBlockquote().run();
            }}
            className={`p-2 rounded transition-colors ${
              editor.isActive('blockquote')
                ? 'bg-brand-accent text-white'
                : 'bg-white border border-slate-300 hover:bg-slate-100'
            }`}
            title="Cytat"
          >
            <Quote size={18} />
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().toggleCodeBlock().run();
            }}
            className={`p-2 rounded transition-colors ${
              editor.isActive('codeBlock')
                ? 'bg-brand-accent text-white'
                : 'bg-white border border-slate-300 hover:bg-slate-100'
            }`}
            title="Blok kodu"
          >
            <Code size={18} />
          </button>
        </div>

        {/* Row 2: Links, images, tables */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleLink();
            }}
            className="p-2 rounded bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
            title="Dodaj link"
          >
            <LinkIcon size={18} />
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const url = window.prompt('Wpisz URL zdjęcia:');
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }}
            className="p-2 rounded bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
            title="Dodaj zdjęcie"
          >
            <ImageIcon size={18} />
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addTable();
            }}
            className="p-2 rounded bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
            title="Dodaj tabelę"
          >
            <TableIcon size={18} />
          </button>

          <div className="w-px h-6 bg-slate-300"></div>

          {/* Alert boxes */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addAlert('warning');
            }}
            className="p-2 rounded bg-white border border-slate-300 hover:bg-red-50 text-red-600 transition-colors"
            title="Dodaj czerwone wyróżnienie"
          >
            <AlertCircle size={18} />
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addAlert('success');
            }}
            className="p-2 rounded bg-white border border-slate-300 hover:bg-green-50 text-green-600 transition-colors"
            title="Dodaj zielone wyróżnienie"
          >
            <CheckCircle size={18} />
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addAlert('info');
            }}
            className="p-2 rounded bg-white border border-slate-300 hover:bg-blue-50 text-blue-600 transition-colors"
            title="Dodaj niebieskie wyróżnienie"
          >
            <Info size={18} />
          </button>

          <div className="w-px h-6 bg-slate-300"></div>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editor.chain().focus().clearNodes().run();
            }}
            className="p-2 rounded bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
            title="Wyczyść formatowanie"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="prose prose-sm max-w-none p-4 min-h-96">
        <EditorContent editor={editor} />
      </div>

      {/* Help text */}
      <div className="border-t border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Wskazówka:</strong> Możesz używać standardowych skrótów klawiszowych (Ctrl+B = pogrubienie, Ctrl+I = kursywa, Ctrl+Z = cofnij)
      </div>
    </div>
  );
};

export default LessonTextEditor;

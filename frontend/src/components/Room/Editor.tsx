import './editor.css';
import { useEditor, EditorContent } from '@tiptap/react';
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { useDocumentStore } from '../../store/useDocumentStore';
import { useEffect } from 'react';

// define your extension array

const extensions = [StarterKit];

const editorProps = {
  attributes: {
    class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
  },
};

const content = `
    <ul>
        <li>Item one</li>
        <li>Item two</li>
    </ul>
    <h1>
      Hi there,
    </h1>
    <h2>
      Hi there,
    </h2>
    <p>
      this is a basic <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <pre><code class="language-css">body {
    display: none;
    }</code></pre>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote>
`;

const Editor = () => {
  const { currentDoc, handleOnSave } = useDocumentStore();

  const editor = useEditor({
    extensions,
    editorProps,
    content,
  });
  useEffect(() => {
    if (currentDoc && currentDoc.content) {
      editor.commands.setContent(currentDoc.content);
    }
  }, [currentDoc]);

  useEffect(() => {
    if (editor) {
      useDocumentStore.setState({ editorInstance: editor });
    }
  }, [editor]);


  return (
    editor && (
      <div>
        <button
          className="btn items-center gap-2 px-3 py-2"
          onClick={handleOnSave}
        >
          📁Save
        </button>
        <EditorContent editor={editor} />
        <FloatingMenu editor={editor} shouldShow={null}></FloatingMenu>
        <BubbleMenu editor={editor} shouldShow={null}>
          This is the bubble menu
        </BubbleMenu>
      </div>
    )
  );
};

export default Editor;

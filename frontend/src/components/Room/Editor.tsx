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

const content = `New Document`;

const Editor = () => {
  const { currentDoc } = useDocumentStore();

  const editor = useEditor({
    extensions,
    editorProps,
    content,
  });
  useEffect(() => {
    if (currentDoc && currentDoc.content) {
      editor.commands.setContent(currentDoc.content);
    }
  }, [currentDoc, editor.commands]);

  useEffect(() => {
    if (editor) {
      useDocumentStore.setState({ editorInstance: editor });
    }
  }, [editor]);

  if (!currentDoc) {
    return (
      <div className={'flex items-center justify-center h-full font-nunito'}>
        <h2>
          Create a new document or choose an existing document
        </h2>
      </div>
    );
  }

  return (
    editor && (
      <div className={"text-black"}>
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

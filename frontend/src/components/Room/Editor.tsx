import './editor.css';
import { useEditor, EditorContent } from '@tiptap/react';
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { useDocumentStore } from '../../store/useDocumentStore';
import { useRoomStore } from '../../store/useRoomStore';


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
  const editor = useEditor({
    extensions,
    editorProps,
    content,
    // editable: false,
  });

  const handleSaveDoc = (e: React.MouseEvent<HTMLButtonElement>, jsonDoc: any) => {
    // call backend API with jsonDoc to pass in
    console.log(jsonDoc);
    const docId = '';
    useDocumentStore.getState().saveDoc(docId, jsonDoc);
  };

  const handleCreateDoc = (e: React.MouseEvent<HTMLButtonElement>) => {
    // docName: string, docType: string, roomId: string
    e.stopPropagation();
    e.preventDefault();
    const docName = 'testing';
    const docType = 'text';
    const currentRoom = useRoomStore.getState().currentRoom;
    if (currentRoom) {
      useDocumentStore.getState().createDoc(docName, docType, currentRoom.roomId);
    }
  };

  return editor && (
    <div>
      <button
        className="btn items-center gap-2 px-3 py-2"
        onClick={(e) => handleSaveDoc(e, editor.getJSON())}
      >
        send json to server
      </button>
      <button className="btn items-center gap-2 px-3 py-2" onClick={(e) => handleCreateDoc(e)}>
        Create new doc
      </button>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor} shouldShow={null}></FloatingMenu>
      <BubbleMenu editor={editor} shouldShow={null}>
        This is the bubble menu
      </BubbleMenu>
    </div>
  );
};

export default Editor;

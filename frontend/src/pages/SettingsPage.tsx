const SettingsPage = () => {
  // // uncomment this below AND add 'import { useTemplateRoomStore } from '../store/useTemplateRoomStore.ts';'
  // const { createTemplate } = useTemplateRoomStore();

  return (
    <div className={'w-full max-w-[1006px] h-[442px] px-6 py-8 space-y-8 mx-auto'}>
      <h2 className={'font-nunito font-black text-gray-500 text-xl mb-4'}>Settings Page</h2>

      {/* uncomment below to insert a new doc */}
      {/*<button className={'btn btn-primary'} onClick={() => createTemplate()}>*/}
      {/*  create template*/}
      {/*</button>*/}
    </div>
  );
};

export default SettingsPage;
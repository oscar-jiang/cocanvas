import {useAuthStore} from "../store/useAuthStore.ts";

const ProfilePage = () => {
  const { authUser } = useAuthStore();

  return (
    <div>
      ProfilePage

      <p>
        {
          authUser ? authUser.fullName : null
        }
      </p>
      <p>
        {
          authUser ? authUser.username : null
        }
      </p>
    </div>
  );
};

export default ProfilePage;
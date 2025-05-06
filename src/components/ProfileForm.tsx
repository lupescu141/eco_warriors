type profileFormProps = {
  email: string;
  username: string;
};

const ProfileForm = ({ email, username }: profileFormProps) => {
  return (
    <>
      <div>
        <h2>Profile settings</h2>
        <form className="profile_form">
          <label>{email ? email : "New email adress"}</label>
          <input
            type="email"
            name="email"
            placeholder="New email adress"
            /*onChange={handleInputChange} */
          />
          <label>{username ? username : "New username"}</label>
          <input
            type="text"
            name="username"
            placeholder="new Username"
            /*onChange={handleInputChange} */
          />
          <label>Change password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            /*onChange={handleInputChange} */
          />
          <label>Confirm new password</label>
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm new Password"
            /*onChange={handleInputChange} */
          />
          <label>Type in current password</label>
          <input
            type="password"
            name="currentPassword"
            placeholder="Enter current Password"
            required
            /*onChange={handleInputChange} */
          />
          <button type="submit" className="submit-btn">
            Save changes
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileForm;

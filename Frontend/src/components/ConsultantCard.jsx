import FounderAvatar from "./FounderAvatar.jsx";

export default function ConsultantCard({ name, description, avatar, initials, placeholder = false }) {
  return (
    <div className="feat-card">
      {avatar ? (
        <FounderAvatar style={{ width: 52, height: 52, fontSize: 18, marginBottom: 16 }} alt={name} />
      ) : (
        <div className="test-avatar" style={{ width: 52, height: 52, fontSize: 18, marginBottom: 16 }}>
          {initials}
        </div>
      )}
      <h4 style={{ fontSize: 16 }}>{name}</h4>
      {placeholder ? (
        <p className="profile-placeholder" style={{ marginTop: 6 }}>
          {description}
        </p>
      ) : (
        <p style={{ marginTop: 6 }}>{description}</p>
      )}
    </div>
  );
}
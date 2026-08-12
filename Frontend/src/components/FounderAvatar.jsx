const FounderAvatar = ({ className = "", style, alt = "Mr. Abhishek Agarwal" }) => {
  return <img className={`founder-avatar ${className}`} style={style} src="/FounderVertex.png" alt={alt} />;
};

export default FounderAvatar;
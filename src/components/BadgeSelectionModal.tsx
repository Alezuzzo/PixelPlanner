import React from 'react';

interface BadgeSelectionModalProps {
  badges: string[];
  onSelectBadge: (badge: string) => void;
  onClose: () => void;
}

const BadgeSelectionModal: React.FC<BadgeSelectionModalProps> = ({ badges, onSelectBadge, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select a Badge</h2>
        <div className="badge-list">
          {badges.map((badge, index) => (
            <img
              key={index}
              src={badge}
              alt={`Badge ${index + 1}`}
              className="badge-image"
              onClick={() => {
                onSelectBadge(badge);
                onClose();
              }}
            />
          ))}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BadgeSelectionModal;
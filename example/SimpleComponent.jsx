import React from 'react';
import PropTypes from 'prop-types';

const SimpleComponent = ({
  title,
  count,
  isActive,
  onButtonClick,
  user,
  tags
}) => {
  return (
    <div className="simple-component">
      <h2>{title}</h2>
      <p>Compteur: {count}</p>
      <p>Statut: {isActive ? 'Actif' : 'Inactif'}</p>
      
      {user && (
        <div className="user-info">
          <p>Nom: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      
      {tags && tags.length > 0 && (
        <div className="tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      )}
      
      <button onClick={onButtonClick}>
        Cliquer ici
      </button>
    </div>
  );
};

export default SimpleComponent;

// Définition des types avec jsx-typify
SimpleComponent.type({
  title: String,
  count: Number,
  isActive: Boolean,
  onButtonClick: Event('ClickEvent'),
  user: {
    name: String,
    email: String
  },
  tags: [String]
});

// Valeurs par défaut
SimpleComponent.defaults({
  title: 'Mon Composant',
  count: 0,
  isActive: true,
  tags: ['default']
}); 
// Confetti.js
import React, { useEffect } from 'react';
import styles from '../styles/Confetti.module.css';

const Confetti = ({ active }) => {
  useEffect(() => {
    if (active) {
      const confettiContainer = document.getElementById('confetti-container');

      const createConfetti = () => {
        const confetti = document.createElement('div');
        confetti.className = `${styles.confetti} ${styles.animate}`;
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;

        confettiContainer.appendChild(confetti);

        // Eliminar el confeti después de la animación
        confetti.addEventListener('animationend', () => {
          confetti.remove();
        });
      };

      // Lanzar confeti cada 200 ms mientras esté activo
      const intervalId = setInterval(createConfetti, 100);

      // Detener la lluvia de confeti después de 5 segundos
      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
      }, 5000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [active]);

  const getRandomColor = () => {
    const numberOfColor = Math.floor(Math.random() * 6);
    let color = "#3cbbd6";

    switch(numberOfColor){
        case 0:{
            color = "#3cbbd6"
            break;
        }
        case 1:{
            color = "#33bb99"
            break;
        }
        case 2:{
            color = "#8438ff"
            break;
        }
        case 3:{
            color = "#e73b3c"
            break;
        }
        case 4:{
            color = "#ff7438"
            break;
        }
        case 5:{
            color = "#fcc235"
            break;
        }

        default:{
            color = "#3cbbd6"
            break;
        }
    }
    
    return color;
  };

  return <div id="confetti-container" className={styles.container}></div>;
};

export default Confetti;
